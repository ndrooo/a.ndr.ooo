---
tags:
  - nix
---
Here's my setup for declarative [[SSH]] client configuration to generate my `~/.ssh/config` across different machines. This allows me to do things like `ssh myserver` and `scp file myserver:file` without specifying addresses, ports, proxies, options, etc. on every command. Doing it declaratively means not having to worry about keeping these configs in sync or individually writing them for new client machines.

I want to easily connect to my SSH server which is exposed to the internet but don't want to expose the address in my [public configuration repo](https://github.com/ndrooo/nix). I also want to have some less private configuration, such as [Github authorization via SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh), or general options that apply to all connections.

I use [agenix](https://github.com/ryantm/agenix) with [home-manager](https://github.com/nix-community/home-manager) to accomplish this. There are a few ways to set this up but I use home-manager's [`programs.ssh` options](https://home-manager-options.extranix.com/?query=programs.ssh&release=master) to populate `~/.ssh/config`. This gives me the flexibility to set my config differently across different hosts, as well as the option to have parts of my config in plaintext and parts of it encrypted by agenix.

For reference, most of this is defined in my [`home/base.nix`](https://github.com/ndrooo/nix/blob/f2819e740aeef9ad22aa10c06095b4fe65030784/home/base.nix#L35).
## Public configuration
Configuring the public options is pretty easy. Use `programs.ssh`, consult the [options](https://home-manager-options.extranix.com/?query=programs.ssh&release=master) and the `ssh_config` man page (`man ssh_config`). My configuration, for reference:
```nix
programs.ssh = {
  enable = true;
  extraConfig = ''
    IdentityFile ~/.ssh/id_ed25519
  '';
  matchBlocks.gh = {
    user = "git";
    hostname = "github.com";
  };
};
```
## Private configuration
To add private configuration to this I leverage the `programs.ssh.includes` option, which makes use of the `Include` keyword in the SSH config. This way I can point the generated SSH config to a separate file that can be controlled by agenix.

Setting up home-manager is complicated and I won't cover it here. Setting up the [agenix home-manager module](https://github.com/ryantm/agenix/blob/main/modules/age-home.nix) is not well documented but consists of the normal [agenix installation](https://github.com/ryantm/agenix?tab=readme-ov-file#installation) plus importing `agenix.homeManagerModules.default` somewhere in your home-manager module. Once that's done the [agenix tutorial](https://github.com/ryantm/agenix?tab=readme-ov-file#tutorial) should be generally applicable for setup. Create an `ssh.age` or something similarly named and fill it out with any configuration you want. Mine looks something like:
```
Host myserver
  Hostname example.com
  Port 22222
```

The public keys you use to encrypt this file are up to you, but my setup uses the same public keys I use to SSH, stored in `~/.ssh/`. These represent (and are accessible only to) my user on each machine I use. I copy the public keys for these into `secrets.nix`, and I key `ssh.age` with the public key of each machine I need to SSH from. This means if I want to have multiple encrypted files but have some of them [accessible only from the machines that need them](https://en.wikipedia.org/wiki/Principle_of_least_privilege), I can make additional `.age` files and easily configure which keys open which files.

Finally, home-manager needs to be configured to decrypt the file and `Include` it into the SSH configuration. Ideally, I would point the `Include` directly at the [`XDG_RUNTIME_DIR`](https://wiki.archlinux.org/title/XDG_Base_Directory#User_directories), which is where the agenix home-manager module places files by default. This is the safest place to put things since it's guaranteed to have the right permissions and it's usually temporary or periodically cleaned up. However, I haven't been able to figure out how to do this, since the path agenix outputs contains `${XDG_RUNTIME_DIR}`, and `Include` isn't capable of resolving the variable reference.

Instead, I set [`age.secrets.<name>.path`](https://github.com/ryantm/agenix?tab=readme-ov-file#agesecretsnamepath) to decrypt the file directly into `~/.ssh`:
```nix
age.secrets.ssh.file = ../secrets/ssh.age;
age.secrets.ssh.path = "$HOME/.ssh/hosts.config";
```
This isn't secure enough that I would trust it with private keys or anything on that level of secrecy, but it's definitely good enough to keep some domain names and port numbers off Github.

> [!warning] Be careful with age.secrets.\<name\>.file
> It's very easy to get this relative path wrong and the error produced by agenix is very confusing. I spent way too long trying to figure this out!

Finally, I set the include:
```nix
programs.ssh.includes = "hosts.config";
```