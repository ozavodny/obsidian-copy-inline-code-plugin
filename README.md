# Copy Inline Code

Copy the contents of inline code in Obsidian with a single click. The plugin adds a configurable copy icon to inline code in Live Preview and Reading Mode.

[![Copy Inline Code demonstration](plugin-video.gif)](plugin-video.mp4)

## Features

- Copy inline code with one click.
- Choose a Lucide icon or the legacy clipboard icon.
- Show copy icons permanently or only while hovering.
- Position copy icons on the right or left of inline code.
- Exclude matching inline code with regular-expression filters.
- Apply setting changes immediately without restarting Obsidian.
- Keep hover icons overlaid without changing line length or line height.
- Hide copy icons when printing or exporting notes to PDF.
- Display a notice when copying succeeds or fails.

## Configuration

Open **Settings → Copy Inline Code** to configure:

- **Show on hover** — hide the copy icon until inline code is hovered.
- **Exclusion patterns** — prevent copy icons from appearing on matching inline code.
- **Icon position** — place the copy icon on the right or left.
- **Icon name** — select a Lucide icon by name.
- **Use legacy icon** — use the original clipboard emoji instead of a Lucide icon.

## Installation

### Community Plugins

1. Open **Settings → Community plugins** in Obsidian.
2. Select **Browse** and search for **Copy Inline Code**.
3. Select **Install**, and then select **Enable**.

### BRAT

To test a beta or pre-release version with [BRAT](https://obsidian.md/plugins?id=obsidian42-brat):

1. Open **Settings → BRAT**.
2. Select **Add Beta plugin**.
3. Enter `https://github.com/ozavodny/obsidian-copy-inline-code-plugin`.
4. Add and enable the plugin.

### Manual installation

1. Download `main.js`, `styles.css`, and `manifest.json` from the latest GitHub release.
2. Copy them to `[vault-folder]/.obsidian/plugins/copy-inline-code/`.
3. Reload Obsidian and enable **Copy Inline Code** under **Community plugins**.

## Development

- Install Node.js 20 LTS or newer. The minimum supported Node.js version is 18.18.
- Run `npm ci` to install the exact dependency versions from `package-lock.json`.
- Run `make dev` to compile continuously while developing.
- Run `make localbuild` to create a copy-ready plugin directory under `local-build/`.
- Run `make check` before committing to lint the source and manifest and produce a strict production build.

Additional dependency checks are available through `npm audit --audit-level=low` and `npm install-scripts ls`.

## Credits

Copy Inline Code was originally created by [Ondrej Zavodny](https://github.com/ozavodny).

The plugin is now maintained by [Vitovt](https://github.com/vitovt).

The original [GNU General Public License v3.0](LICENSE.md) remains intact.
