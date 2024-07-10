#!/bin/bash

# Step 1: Ensure .git and .gitignore are in a safe location
mv build/.git /tmp/
mv build/.gitignore /tmp/  # Move .gitignore to preserve it

# Step 2: Build the project
npm run build

# Step 3: Move the .git and .gitignore directory back into the build folder
mv /tmp/.git build/
mv /tmp/.gitignore build/  # Move .gitignore back

# Step 4: Remove unwanted files before committing
cd build
find . -name '.DS_Store' -type f -delete  # Delete all .DS_Store files

# # Step 5: Add changes, commit, and push
# git add .
# git commit -m "Deploy updated site"
# git push origin gh-pages
