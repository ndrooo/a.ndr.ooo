---
title: Nix & Bevy & VSCode
tags:
  - guide
---
I’ve been enjoying game development in [Bevy Engine](https://bevyengine.org/) lately, but figuring out how to adapt the setup to Nix + VSCode took a little work. So let’s take [[nix-rust-vscode|our Rust setup]] and add what we need for Bevy! Hopefully this will also serve as a good example for how we might extend our environment more generally. This section mostly adapts the [Bevy setup instructions](https://bevyengine.org/learn/book/getting-started/setup/) to this environment.

Keep in mind that Bevy is in active development and much of this may change! This is the appropriate setup for Bevy 0.12, but generally speaking, fewer features and customizations have been necessary as Bevy matures.

First we’ll need to add some packages to our flake to enable some Bevy functionality. Adding to the `buildInputs` list, it becomes:

```nix
buildInputs = with pkgs; [
  lld
  rust-toolchain
  pkg-config
  rust-analyzer

  udev
  alsa-lib
  vulkan-loader
  xorg.libX11
  xorg.libXcursor
  xorg.libXi
  xorg.libXrandr
  libxkbcommon
  wayland
];
```

Next, we’ll need to make sure we’re using `nightly` Rust in our `rust-toolchain.toml`. Change the value of `channel` to `"nightly"`.

Now, let’s go ahead and actually add Bevy to our Cargo project by running `cargo add bevy` from the project root. We’ll want to run our development builds with the `bevy/dynamic_linking` feature, but we don’t want to deploy with it. To make this easier, we can write a custom run command in `.vscode/tasks.json`:

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "dev run",
            "type": "shell",
            "command": "cargo",
            "args": [
                "run",
                "--features",
                "bevy/dynamic_linking"
            ],
            "group": {
                "kind": "build",
                "isDefault": true
            }
        }
    ]
}
```

We can run this with `ctrl + shift + b` and skip typing it into our terminal every time we want to test. We also can and should follow the [performance optimization](https://bevyengine.org/learn/book/getting-started/setup/#compile-with-performance-optimizations) instructions as written, setting the opt-level variables in our `Cargo.toml`.

## Debugging

When running without Cargo, as we do when we are debugging in VSCode, we need to set the `CARGO_MANIFEST_DIR` environment variable, because Bevy uses that variable to locate assets. There are a few ways we could make sure that variable is set, but I add it to my `.vscode/launch.json` configurations like so:

```json
"env": {
  "CARGO_MANIFEST_DIR": "${workspaceFolder}",
}
```

This won’t work when clicking “Debug” in e.g. `main.rs` but will work from the “Run and Debug” panel. In the future I may look into a better solution for this but for now this works fine for me.