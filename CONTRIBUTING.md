## Development (students can ignore)

### Building the Course Content (PDF Files)

1. Start with Linux, as macOS has incompatibility issues

1. Install the [Nix Package Manager](https://nixos.org/nix/)

1. Load into your shell: `  . /home/andrew/.nix-profile/etc/profile.d/nix.sh`

1. Open `nix-shell`

1. Run `edify_datadir=. edify build courses/javascript-intermediate.md`

The generated PDF files will be in the `build/courses` directory.

Helpful commands for transferring data to and fro for VM:

```
$ rsync -auv --exclude 'src/node_modules' --exclude 'sandbox/node_modules' ~/Projects/webdev webdev:/home/andrew/Projects
$ scp webdev:/home/andrew/Projects/webdev/build/courses/javascript-intermediate.slides.pdf slides
$ open slides/javascript-intermediate.slides.pdf
```
