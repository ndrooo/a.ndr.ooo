---
title: Nix & Rust & VSCode
tags:
  - guide
---
Let’s go through setup for a modern Rust development environment using [Nix](https://nixos.org/) and [VSCode](https://code.visualstudio.com/). We’ll get a deterministic environment that should deploy more or less identically on any machine, and it will auto-initialize any time you open your project.

This guide is aimed at developers who already have installed Nix or NixOS and understand the basics. If not, start with [nix.dev](https://nix.dev). It also assumes basic knowledge of Rust, Cargo, and VSCode. The focus will be on how to smoothly combine those technologies.

An important note: this guide uses Nix Flakes and the `nix` command, which are experimental features. The [Flakes wiki page](https://nixos.wiki/wiki/Flakes) should have information on how to enable those.
# Install some tools globally

First, there are a few tools we’ll need to install into our Nix system. The first is [direnv](https://direnv.net/), which will load our execution environment from the repository we’re working in. Where you will install this depends on your Nix setup, but it will probably look something like this:

```nix
environment.systemPackages = with pkgs; {
  # ...
  direnv
  # ...
};
```

Secondly, we need to install VSCode — our editor. There are [two main ways](https://nixos.wiki/wiki/Visual_Studio_Code) to install VSCode on Nix, and the difference lies in how we install the extensions we’ll need. We can install it standalone and add extensions from the built-in marketplace, or we can install the `vscode-with-extensions` package and add our extensions from our nix configuration. The latter method has some annoying drawbacks: out-of-date/unavailable packages, having to rebuild your configuration to add or remove an extension, and added complications for [settings sync](https://code.visualstudio.com/docs/editor/settings-sync). We gain some added control over our development environment in exchange, but more importantly we gain some customizations to these extensions that make them work more smoothly with Nix.

```nix
environment.systemPackages = with pkgs; {
  # ...
  (vscode-with-extensions.override {
    vscodeExtensions = with vscode-extensions; [
      rust-lang.rust-analyzer
      tamasfe.even-better-toml
      bbenoist.nix
    ];
  })
  # ...
};
```

We’ll install the basic extensions we need for Nix and Rust right off the bat. Most important here is `rust-analyzer`, which does all the heavy lifting in code highlighting and analysis.
# Using flakes to make a Rust devshell

Next, we’ll start setting up our repository. To start with, we’ll need to actually make our repository. There are a few ways to do this, including just starting with a template, but I think it is usually safe to install Rust globally on your Nix machine (with the `rustc` and `cargo` packages) and then run something like `cargo new nameofproject`. After doing the rest of the setup you won’t actually need this global Rust install but it may be handy to keep around. Not to worry, our setup will automagically use the correct Rust toolchain!

In the root of your new repository, create a `flake.nix` with the following content to start:

```nix
{
  inputs = {
    fenix = {
      url = "github:nix-community/fenix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    nixpkgs.url = "nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, fenix, flake-utils, nixpkgs }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        rust-toolchain = with fenix.packages.${system}; fromToolchainFile {
          file = ./rust-toolchain.toml;
          sha256 = nixpkgs.lib.fakeSha256;
        };
      in {
        devShell = pkgs.mkShell rec {
          buildInputs = with pkgs; [
            lld
            rust-toolchain
            pkg-config
            rust-analyzer
          ];
          LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath buildInputs;
        };
      }
    );
}
```

Here, we’re using [fenix](https://github.com/nix-community/fenix) and [flake-utils](https://github.com/numtide/flake-utils) to build a Rust toolchain flexibly and for any supported platform. We install a few critical packages to the dev environment and point the linker in the right direction. We also add the `rust-analyzer` binary to this environment, which is critical to avoid

One thing is missing here — we’ll need a `rust-toolchain.toml` file to specify the exact toolchain we want to install. This file will also be useful to anyone developing in your repository without Nix! We’ll create it in the project root:

```toml
[toolchain]
channel = "stable"
components = [ "rust-analyzer", "rust-src" ]
```

Modify as needed, but this is a good starting point. Finally, run this shell for the first time with `nix develop` and you’ll get an error saying that the file has the wrong sha256 hash. Since this is a local file it is more or less safe to take the hash printed out and copy it into `flake.nix`:

```nix
sha256 = "sha256-L3tt3r54ndNumb3r5=";
```

Now with another `nix develop` you should eventually be taken into a configured development shell!

# Put it all together in vscode

Next, we’ll set up VSCode to use our new environment. First we’ll need a couple more extensions: [direnv](https://marketplace.visualstudio.com/items?itemName=mkhl.direnv) to deploy our environment and [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer) for Rust hints and errors. If you’re using `vscode-with-extensions` you’ll download these by adding two lines to the extension list:

```nix
mkhl.direnv
rust-lang.rust-analyzer
```

Once you’ve deployed your changed Nix configuration and restarted VSCode, there’s a little bit of configuration to do. First, we’ll need to create a `.envrc` file in our project root to tell `direnv` how to deploy the environment. That’s as simple as:

```bash
use flake
```

You’ll need to confirm `direnv` is allowed to use this environment, which you can do from the popup in VSCode or by running `direnv allow` from the project root.

By default, the rust-analyzer extension uses a version of the rust-analyzer tool which is packaged alongside it. This could be out of sync with the Rust toolchain we’re using for our project, so we’ll need to configure the extension to use the version of the tool that we built from our flake. Go to the VSCode settings and search for `rust-analyzer.server.path`. Edit this, and change the value to simply read `"rust-analyzer"`. It’s up to you whether you want to modify this setting [globally or just for this workspace](https://code.visualstudio.com/docs/getstarted/settings) (or both).

While you’re at it, changing `rust-analyzer.check.command` to `"clippy"` will give you lints from [Clippy](https://github.com/rust-lang/rust-clippy), which can help you improve your Rust code substantially.

## Addendum: debugging

To debug with VSCode you’ll need the [codelldb](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb) extension, which you can install in `vscode-with-extensions` by adding `vadimcn.vscode-lldb`. Due to the way Nix handles code linking, this only seems to work properly when using the `vscode-with-extensions` method. If there is a way to make this work when installing from the marketplace, [let me know](https://github.com/ndrooo/a.ndr.ooo/issues/new).