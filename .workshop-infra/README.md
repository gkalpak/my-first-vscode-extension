# About the `.workshop` directory


## For workshop attendees

The workshop instructions are in [workshop.md](./workshop.md).<br />
All other files in this directory are intended for workshop instructors and maintainers of this repository.


## For workshop instructors/maintainers.

**File overview:**

- `README.md`: Basic information about the contents of this directory.
- `workshop.md`: Workshop instructions. (Intended for both instructors and attendees.)
- `srcipts/`
  - `update-tags.js`: Script for updating the Git tags based on the latest commits and optionally update origin as well.

**Updating tags:**

Git tags are automatically generated based on commit messages. In order for a commit to be recognized and tagged, it needs to start with `[lab-<LAB_NUMBER>(.<LOWER_LETTER>)]` (e.g. `[lab-1]` or `[lab-2.a]`).

When one or more commits have been modified locally, you need to regenerate the tags and update origin. To achieve this run the following command (from the root of the project directory):

```sh
node .workshop-infra/scripts/update-tags
```

The scripts will delete old, outdated tags, create new ones and offer to update origin (by force-pushing the changes). You can either let the script update origin automatically or do so yourself later.


<!--
## TODO

- Potential future labs (or topics without lab):
  - Running tests with jasmine (https://github.com/gkalpak/aio-docs-utils).
  - Setting up CI (https://code.visualstudio.com/api/working-with-extensions/continuous-integration).
    - Use `Xvfb` or similar.
    - Run e2e tests against multiple versions.
    - Auto-release and/or publish (e.g. on builds for tags).
  - Script for running on multiple versions (and remove obsolete ones (e.g. for CI)).
-->
