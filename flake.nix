{
  description = "flake for ogs-client";

  inputs = { nixpkgs = { url = "github:nixos/nixpkgs/nixos-unstable"; }; };

  outputs = inputs:
    let system = "x86_64-linux";
    in {
      devShell.${system} = (import ./shell.nix) {
        pkgs = inputs.nixpkgs.legacyPackages.${system};
      };
    };
}
