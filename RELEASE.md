# Release Procedure

## Overview

The SEI Design System follows **semantic versioning** and uses a two-step release process:

1. **Local version bump and commit** (using `npm run release`)
2. **GitHub Release creation** (triggers automated publishing)

This ensures that the source of truth for versions is always the committed `package.json` file, and the repository history accurately reflects all releases.

## Prerequisites

- You must have write access to the repository
- You must be on the `main` (or `master`) branch
- All changes must be committed and pushed
- All CI checks must be passing

## Release Steps

### 1. Run the Release Script

From the root of the repository, run:

```bash
npm run release
```

This interactive script will:

1. Verify you're on the correct branch (`main` or `master`) with no uncommitted changes
2. Pull the latest changes from origin
3. Prompt you to select the release type:
   - **Patch** (4.4.0 → 4.4.1): Bug fixes only
   - **Minor** (4.4.0 → 4.5.0): New features, backwards-compatible
   - **Major** (4.4.0 → 5.0.0): Breaking changes
   - **Custom**: Specify any version (e.g., for pre-releases like 5.0.0-beta.1)
4. Bump the version in `package.json` and `package-lock.json`
5. Show you the changes and ask for confirmation
6. Verify the git tag doesn't already exist
7. Commit the version bump with message `chore: release vX.Y.Z`
8. Create and push the git tag (e.g., `v4.5.0`)
9. Automatically merge the changes to the `develop` branch with message `chore: merge release vX.Y.Z from main [skip ci]` (if it exists)

**Note:** The script includes comprehensive error handling and will cleanly restore your repository to its original state if any step fails before the commit is pushed.

### 2. Create a GitHub Release

After the script completes successfully:

1. Go to https://github.com/cmu-sei/sei-design-system/releases/new
2. Select the tag that was just created (e.g., `v4.5.0`)
3. Click "Generate release notes" to auto-populate the changelog
4. Review and edit the release notes as needed
5. Click "Publish release"

This will trigger the GitHub Actions workflow that:
- Verifies the package.json version matches the release tag
- Converts registry references in package-lock.json
- Checks if the version is already published
- Runs linting and tests
- Builds the component library and generates TypeScript declarations
- Generates Volar types for global components
- Builds Storybook documentation
- Performs a dry-run publish
- Publishes to the npm registry

## What NOT to Do

❌ **Don't** manually edit version numbers in `package.json`  
❌ **Don't** modify versions in the GitHub Actions workflow  
❌ **Don't** create releases without first running the release script  
❌ **Don't** commit version bumps manually

## Troubleshooting

### Local Release Script Issues

#### "You must be on the main/master branch to create a release"
Switch to the main branch: `git checkout main`

#### "You have uncommitted changes"
Commit or stash your changes before running the release script:
```bash
git add .
git commit -m "your changes"
# OR
git stash
```

#### "Tag vX.Y.Z already exists"
This tag was already created. Either:
- You're trying to release the same version twice (bump to a higher version)
- A previous release failed partway through (delete the tag: `git tag -d vX.Y.Z` and `git push origin :refs/tags/vX.Y.Z`)

#### Script execution errors
If the script encounters any errors (git operations, network issues, etc.), it will attempt to restore your repository to its original state by reverting uncommitted changes to `package.json` and `package-lock.json`.

#### "Failed to push commit to origin"
This usually means:
- Remote has diverged (someone else pushed): Pull changes and try again
- Network issue: Check your connection and retry
- Insufficient permissions: Verify you have write access

The script will automatically roll back the commit and restore your files.

#### "Failed to push tag to origin"
The commit was successfully pushed but the tag wasn't. You can manually push the tag:
```bash
git push origin vX.Y.Z
```

#### Merge to develop failed
If the automatic merge to `develop` fails due to conflicts:
```bash
git checkout develop
git pull origin develop
git merge main
# Resolve conflicts in your editor
git add .
git commit
git push origin develop
```

The release to `main` was successful even if the develop merge failed.

### GitHub Actions Workflow Issues

#### "Version does not match package.json version"
You created a GitHub Release without running `npm run release` first. Delete the release and tag, then run the release script.

#### "Version already exists in registry"
This version was already published to npm. You need to bump to a higher version number and create a new release.

#### CI checks are failing
Fix the failing tests/lint errors, commit the fixes, and create a new patch release.

#### Workflow failed partway through
If the GitHub Actions workflow fails, you can re-run it from the Actions tab. The workflow is idempotent - it won't republish if the version already exists.

## Beta Releases

### Automated Beta Releases

Beta versions are automatically published when you push to the `develop` branch:

1. Push changes to `develop` branch
2. GitHub Actions automatically:
   - Generates version like `4.5.0-beta.a1b2c3d` (using commit SHA)
   - Runs full test suite on the beta version
   - Publishes to npm with `--tag beta`
   - Does NOT commit version changes back to repo

### Installing Beta Versions

Users can install beta versions with:
```bash
npm install @cmu-sei/sei-design-system@beta
```

Or a specific beta version:
```bash
npm install @cmu-sei/sei-design-system@4.5.0-beta.a1b2c3d
```

### Manual Beta Release

You can also manually trigger a beta release from the GitHub Actions UI:
1. Go to Actions tab
2. Select "Release Beta Package" workflow
3. Click "Run workflow"
4. Select `develop` branch
5. Click "Run workflow"

### Beta Release Protection

Beta releases are automatically skipped for:
- Commits with `[skip ci]` in the message
- Commits with `[no publish]` in the message  
- Release merge commits from main (e.g., `chore: release v4.5.0`)

This prevents infinite loops and unwanted beta publishes.

---

## Why This Approach?

This two-step process follows industry best practices:

1. **Version as source of truth**: The committed `package.json` is always the source of truth
2. **Git history accuracy**: Every release has a corresponding commit and tag in git
3. **Atomic releases**: Version bumps and code changes are separate concerns
4. **Branch synchronization**: `main` and `develop` branches stay in sync automatically
5. **CI/CD separation**: Local script handles versioning, CI handles publishing
6. **Fail-fast**: Problems are caught before creating releases, not during

This is the same pattern used by major frameworks like Vue.js, Nuxt, and many other popular open-source libraries.
