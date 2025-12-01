#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}SEI Design System Release Script${NC}"
echo "=================================="
echo ""

# Check if we're on the right branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ] && [ "$CURRENT_BRANCH" != "master" ]; then
  echo -e "${RED}Error: You must be on the main/master branch to create a release${NC}"
  echo "Current branch: $CURRENT_BRANCH"
  exit 1
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
  echo -e "${RED}Error: You have uncommitted changes${NC}"
  echo "Please commit or stash your changes before releasing"
  git status --short
  exit 1
fi

# Pull latest changes
echo -e "${YELLOW}Pulling latest changes from origin...${NC}"
git pull origin $CURRENT_BRANCH

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "Current version: $CURRENT_VERSION"
echo ""

# Ask for new version
echo "What type of release is this?"
echo "  1) Patch (bug fixes)       - $CURRENT_VERSION -> $(npm version patch --no-git-tag-version --dry-run 2>/dev/null | tail -1)"
echo "  2) Minor (new features)    - $CURRENT_VERSION -> $(npm version minor --no-git-tag-version --dry-run 2>/dev/null | tail -1)"
echo "  3) Major (breaking changes)- $CURRENT_VERSION -> $(npm version major --no-git-tag-version --dry-run 2>/dev/null | tail -1)"
echo "  4) Custom version"
echo ""
read -p "Enter choice [1-4]: " choice

case $choice in
  1)
    RELEASE_TYPE="patch"
    ;;
  2)
    RELEASE_TYPE="minor"
    ;;
  3)
    RELEASE_TYPE="major"
    ;;
  4)
    read -p "Enter custom version: " CUSTOM_VERSION
    RELEASE_TYPE="$CUSTOM_VERSION"
    ;;
  *)
    echo -e "${RED}Invalid choice${NC}"
    exit 1
    ;;
esac

# Bump version
echo ""
echo -e "${YELLOW}Bumping version...${NC}"
npm version $RELEASE_TYPE --no-git-tag-version
NEW_VERSION=$(node -p "require('./package.json').version")
echo -e "${GREEN}New version: $NEW_VERSION${NC}"

# Update package-lock.json
echo ""
echo -e "${YELLOW}Updating package-lock.json...${NC}"
npm install --package-lock-only

# Run bundle-release script (includes lint, test, and build)
echo ""
echo -e "${YELLOW}Running lint, tests, and build...${NC}"
if [ ! -x "./scripts/bundle-release.sh" ]; then
  chmod +x ./scripts/bundle-release.sh
fi
./scripts/bundle-release.sh

# Clean up build artifacts (don't want to commit dist/)
rm -rf dist/

# Show diff
echo ""
echo -e "${YELLOW}Changes to be committed:${NC}"
git diff package.json package-lock.json

# Confirm
echo ""
read -p "Do you want to commit and push version $NEW_VERSION? [y/N]: " confirm
if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
  echo -e "${RED}Release cancelled${NC}"
  echo -e "${YELLOW}Restoring original version...${NC}"
  git checkout package.json package-lock.json
  npm install --package-lock-only
  echo -e "${GREEN}✓ Restored to version $CURRENT_VERSION${NC}"
  exit 1
fi

# Check if tag already exists
if git rev-parse "v$NEW_VERSION" >/dev/null 2>&1; then
  echo -e "${RED}Error: Tag v$NEW_VERSION already exists${NC}"
  echo -e "${YELLOW}Restoring original version...${NC}"
  git checkout package.json package-lock.json
  npm install --package-lock-only
  exit 1
fi

# Commit changes
echo ""
echo -e "${YELLOW}Committing version bump...${NC}"
git add package.json package-lock.json
git commit -m "chore: release v$NEW_VERSION"

# Create and push tag
echo -e "${YELLOW}Creating and pushing tag v$NEW_VERSION...${NC}"
git tag -a "v$NEW_VERSION" -m "Release v$NEW_VERSION"

# Push commit first, then tag (if commit push fails, we can recover)
if ! git push origin $CURRENT_BRANCH; then
  echo -e "${RED}Error: Failed to push commit to origin${NC}"
  echo -e "${YELLOW}Rolling back commit and tag...${NC}"
  git tag -d "v$NEW_VERSION"
  git reset --soft HEAD~1
  git checkout package.json package-lock.json
  npm install --package-lock-only
  echo -e "${YELLOW}You may need to pull changes if remote has diverged${NC}"
  exit 1
fi

# Now push the tag
if ! git push origin "v$NEW_VERSION"; then
  echo -e "${RED}Error: Failed to push tag to origin${NC}"
  echo -e "${YELLOW}Note: Commit was pushed but tag was not.${NC}"
  echo -e "${YELLOW}You can manually push the tag with: git push origin v$NEW_VERSION${NC}"
  exit 1
fi

# Merge to develop if it exists
if git rev-parse --verify origin/develop >/dev/null 2>&1; then
  echo ""
  echo -e "${YELLOW}Merging changes to develop branch...${NC}"
  
  if ! git checkout develop; then
    echo -e "${RED}Error: Failed to checkout develop branch${NC}"
    echo -e "${YELLOW}Release was successful but merge to develop failed${NC}"
    echo -e "${YELLOW}You can manually merge with: git checkout develop && git merge $CURRENT_BRANCH${NC}"
    exit 1
  fi
  
  if ! git pull origin develop; then
    echo -e "${RED}Error: Failed to pull develop branch${NC}"
    git checkout $CURRENT_BRANCH
    echo -e "${YELLOW}Release was successful but merge to develop failed${NC}"
    echo -e "${YELLOW}You can manually merge with: git checkout develop && git pull && git merge $CURRENT_BRANCH${NC}"
    exit 1
  fi
  
  if ! git merge $CURRENT_BRANCH -m "chore: merge release v$NEW_VERSION from $CURRENT_BRANCH [skip ci]"; then
    echo -e "${RED}Error: Merge conflict detected${NC}"
    git merge --abort
    git checkout $CURRENT_BRANCH
    echo -e "${YELLOW}Release was successful but merge to develop has conflicts${NC}"
    echo -e "${YELLOW}You need to manually merge with: git checkout develop && git merge $CURRENT_BRANCH${NC}"
    exit 1
  fi
  
  if ! git push origin develop; then
    echo -e "${RED}Error: Failed to push develop branch${NC}"
    echo -e "${YELLOW}Merge completed locally but push failed${NC}"
    echo -e "${YELLOW}You can retry with: git push origin develop${NC}"
    git checkout $CURRENT_BRANCH
    exit 1
  fi
  
  git checkout $CURRENT_BRANCH
  echo -e "${GREEN}✓ Merged to develop${NC}"
fi

echo ""
echo -e "${GREEN}✓ Version $NEW_VERSION released successfully!${NC}"
echo ""
echo "Next steps:"
echo "  1. Create a GitHub Release at: https://github.com/cmu-sei/sei-design-system/releases/new?tag=v$NEW_VERSION"
echo "  2. Add release notes describing the changes"
echo "  3. Publish the release - this will trigger the CI workflow to publish to npm"
echo ""
