{ sources ? import ./nix/sources.nix }:
let
  pkgs = import sources.nixpkgs {
    overlays = [ (_: pkgs: { niv = import sources.niv { }; }) ];
    config = { };
  };
in pkgs.mkShell { buildInputs = [ pkgs.act ]; }
