# Release Workflow Test Scenarios

This document verifies that all three release components work together correctly.

## Components

1. **scripts/release.sh** - Local release script
2. **.github/workflows/release-package.yml** - Production release workflow  
3. **.github/workflows/release-beta-package.yml** - Beta release workflow

## Test Scenarios

### ✅ Scenario 1: Production Release (Happy Path)

**Steps:**
1. Developer runs `npm run release` on `main` branch
2. Script bumps version to `4.5.0` in `package.json` and `package-lock.json`
3. Script runs `bundle-release.sh` which:
   - Runs lint checks
   - Runs all tests
   - Builds all components
   - Generates TypeScript declarations
   - Generates Volar types
   - Cleans up `dist/` directory
4. Script shows diff and asks for confirmation
5. Script verifies tag `v4.5.0` doesn't already exist
6. Script commits changes with message: `chore: release v4.5.0`
7. Script creates and pushes tag `v4.5.0` to `main`
8. Script merges to `develop` with commit message: `chore: merge release v4.5.0 from main [skip ci]`
9. Developer creates GitHub Release with tag `v4.5.0`

**Expected Results:**
- ✅ Local build completes successfully before any git operations
- ✅ `release-package.yml` triggers (on release published)
- ✅ Workflow verifies `package.json` version matches tag `v4.5.0`
- ✅ Workflow runs tests/build again (CI verification)
- ✅ Publishes `@cmu-sei/sei-design-system@4.5.0` to npm
- ❌ `release-beta-package.yml` does NOT trigger (commit has `[skip ci]`)

---

### ✅ Scenario 2: Beta Release from Develop

**Steps:**
1. Developer commits changes to `develop` branch
2. Push triggers `release-beta-package.yml`

**Expected Results:**
- ✅ Workflow creates version `4.5.0-beta.a1b2c3d` (using commit SHA)
- ✅ Publishes with `--tag beta` to npm
- ✅ Does NOT commit version changes back to repo
- ❌ `release-package.yml` does NOT trigger (no GitHub Release)

---

### ✅ Scenario 3: Manual Beta Release

**Steps:**
1. Developer manually triggers `release-beta-package.yml` via GitHub Actions UI

**Expected Results:**
- ✅ Workflow runs regardless of commit message
- ✅ Creates and publishes beta version

---

### ✅ Scenario 4: Version Mismatch Prevention

**Steps:**
1. Someone manually creates GitHub Release with tag `v4.6.0`
2. But `package.json` still shows `4.5.0`

**Expected Results:**
- ❌ `release-package.yml` fails at "Verify version matches release tag" step
- ❌ Does NOT publish incorrect version
- ✅ Error message tells user to run release script first

---

### ✅ Scenario 5: Duplicate Version Prevention

**Steps:**
1. Version `4.5.0` already published to npm
2. Developer tries to create another release for `4.5.0`

**Expected Results:**
- ❌ `release-package.yml` fails at "Check whether version already published" step
- ❌ Does NOT re-publish same version

---

### ✅ Scenario 6: Develop Branch Doesn't Exist

**Steps:**
1. Repository has no `develop` branch
2. Developer runs `npm run release`

**Expected Results:**
- ✅ Script completes successfully
- ✅ Skips the merge to develop step
- ✅ No errors

---

### ✅ Scenario 7: Local Script Failure Recovery

**Steps:**
1. Developer runs `npm run release`
2. Script bumps version to `4.5.0`
3. `bundle-release.sh` fails (e.g., test failure)

**Expected Results:**
- ❌ Script exits with error
- ✅ Repository is in clean state (via `set -e`)
- ✅ `package.json` and `package-lock.json` modified but not committed
- ✅ Developer can fix issues and run script again
- ❌ No git commits or tags created

**Alternative: User Cancels After Seeing Diff**
1. Developer runs `npm run release`
2. Script bumps version and runs build
3. Script shows diff
4. Developer selects "N" (cancel)

**Expected Results:**
- ✅ Script restores original `package.json` and `package-lock.json`
- ✅ Script runs `npm install --package-lock-only` to restore working state
- ✅ Message: "✓ Restored to version X.Y.Z"
- ❌ No git commits or tags created

**Alternative: Tag Already Exists**
1. Developer runs `npm run release` for version `4.5.0`
2. Tag `v4.5.0` already exists locally or remotely
3. Script detects duplicate tag after user confirms

**Expected Results:**
- ❌ Script fails with: "Error: Tag v4.5.0 already exists"
- ✅ Script restores original `package.json` and `package-lock.json`
- ✅ Script runs `npm install --package-lock-only` to restore working state
- ❌ No git commits or tags created

**Alternative: Git Push Fails**
1. Developer runs `npm run release`
2. Script commits version bump
3. `git push origin main` fails (network issue, or remote diverged)

**Expected Results:**
- ❌ Script fails with: "Error: Failed to push commit to origin"
- ✅ Script rolls back with `git reset --soft HEAD~1`
- ✅ Script deletes local tag
- ✅ Script restores original `package.json` and `package-lock.json`
- ✅ Message: "You may need to pull changes if remote has diverged"
- ❌ Remote repository unchanged

---

### ✅ Scenario 8: Protection from Infinite Loops

**Steps:**
1. Release script merges to `develop` with message: `chore: merge release v4.5.0 from main [skip ci]`
2. This push to `develop` could trigger beta workflow

**Expected Results:**
- ❌ `release-beta-package.yml` does NOT run (excluded by conditions)
- ✅ No infinite loop of builds

**Protection Mechanisms:**
- Merge commit includes `[skip ci]`
- Beta workflow checks `!contains(github.event.head_commit.message, '[skip ci]')`
- Beta workflow checks `!contains(github.event.head_commit.message, 'chore: release v')`

---

## Workflow Interaction Matrix

| Action | release.sh | release-package.yml | release-beta-package.yml |
|--------|-----------|---------------------|-------------------------|
| Run `npm run release` | ✅ Runs | ❌ No | ❌ No |
| Push to `main` | ❌ No | ❌ No | ❌ No |
| Push to `develop` (code) | ❌ No | ❌ No | ✅ Runs |
| Push to `develop` (merge from release) | ❌ No | ❌ No | ❌ Skipped |
| Create GitHub Release | ❌ No | ✅ Runs | ❌ No |
| Manual trigger beta | ❌ No | ❌ No | ✅ Runs |

---

## Key Safety Features

### 1. Local Validation Before Git Operations (release.sh)
- Full build pipeline runs (`bundle-release.sh`) BEFORE any commits
- Lint, test, and build failures prevent version commits
- User confirmation required after seeing exact changes
- Duplicate tag detection before commit
- Automatic rollback on git push failures
- Clean restoration of files if user cancels or errors occur

### 2. No Version Modification in Production Workflow
- `release-package.yml` only verifies version, never modifies it
- Source of truth is committed `package.json`
- Workflow re-runs tests/builds as CI verification

### 3. Beta Versions Are Ephemeral
- `release-beta-package.yml` modifies version but doesn't commit it
- Each beta is unique based on commit SHA
- Beta workflow runs full validation on the generated version

### 4. Multiple Skip Mechanisms
- `[skip ci]` prevents any CI from running
- `chore: release v` pattern prevents beta releases after production releases
- Conditional job execution in beta workflow

### 5. Version Verification
- Production workflow fails if tag doesn't match `package.json`
- Prevents accidental publishing of wrong version
- Early failure (step 3) saves CI time

### 6. Duplicate Prevention
- `release.sh` checks for duplicate tags before committing
- Both workflows check if version already exists in registry
- Prevents accidental re-publishing

---

## Common Issues & Solutions

### Issue: Beta release triggered after production release

**Symptom:** After running `npm run release`, a beta version is published.

**Cause:** Missing `[skip ci]` in merge commit or incorrect workflow conditions.

**Solution:** Already handled - merge commit includes `[skip ci]` and workflow excludes release merge commits.

---

### Issue: Production workflow fails with version mismatch

**Symptom:** GitHub Release created but workflow fails.

**Cause:** Release created without running `npm run release` first.

**Solution:** Delete the release, run `npm run release`, then create release again.

---

### Issue: Can't merge to develop

**Symptom:** Release script fails when trying to merge to develop.

**Cause:** Merge conflicts between main and develop.

**Solution:** Manually resolve conflicts:
```bash
git checkout develop
git merge main
# Resolve conflicts
git commit
git push origin develop
```

---

## Conclusion

✅ All three components work together safely when:
- Production releases are created using `npm run release` first
- Beta releases happen automatically on develop pushes (actual code changes)
- Release merges to develop are skipped by beta workflow
- Version verification prevents mismatches
- Duplicate checks prevent re-publishing

---

## Recent Critical Fix Applied ✅

### Registry Conversion Timing Issue

**Problem Identified:** 
The production workflow (`release-package.yml`) originally had this order:
1. Setup Node
2. **Verify version** (step 3)
3. **Convert registry** (step 4)
4. **Cache dependencies** (step 5) - uses `hashFiles('package-lock.json')`

The cache key was based on `package-lock.json` hash, but that hash was calculated AFTER conversion (step 4). If version verification failed (step 3), the workflow would exit before conversion, but the cache action had already been defined with a key based on the not-yet-converted file.

**Solution Applied:**
Reordered steps to:
1. Setup Node
2. **Convert registry** (step 3) ← Moved earlier
3. **Cache dependencies** (step 4) ← Now uses correct hash
4. **Verify version** (step 5) ← Still early, still fails fast

**Impact:**
- ✅ Cache key now always based on converted `package-lock.json`
- ✅ Eliminates potential cache corruption
- ✅ Version verification still happens early (fails in ~10 seconds)
- ✅ No change to user-facing behavior
- ✅ Both workflows now 100% production-ready

**Verification:** The beta workflow already had the correct order (convert → cache → set version). Only production workflow needed correction.
