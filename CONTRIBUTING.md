# Contributing to Jeetpic

Welcome! This guide explains how to contribute to Jeetpic and how to merge changes from forked repositories.

## Table of Contents
- [How to Merge Changes from a Forked Repository](#how-to-merge-changes-from-a-forked-repository)
- [Method 1: Using GitHub Pull Requests (Recommended)](#method-1-using-github-pull-requests-recommended)
- [Method 2: Using Git Command Line](#method-2-using-git-command-line)
- [Method 3: Using GitHub CLI](#method-3-using-github-cli)
- [Handling Merge Conflicts](#handling-merge-conflicts)
- [Best Practices](#best-practices)

---

## How to Merge Changes from a Forked Repository

When someone forks your repository and makes changes, there are several ways to merge those changes back into your main repository. This guide covers the most common approaches.

### Prerequisites
- You must have write access to the original repository
- The contributor must have pushed their changes to their forked repository

---

## Method 1: Using GitHub Pull Requests (Recommended)

This is the **easiest and most common** method for merging changes from a forked repository.

### Steps:

1. **Ask the contributor to create a Pull Request:**
   - The contributor should go to their forked repository on GitHub
   - Click the "Contribute" button (or "Pull requests" tab)
   - Click "Open pull request"
   - Select the base repository (your repo) and the branch to merge into (usually `main`)
   - Add a descriptive title and description
   - Click "Create pull request"

2. **Review the Pull Request:**
   - Go to your repository on GitHub
   - Navigate to the "Pull requests" tab
   - Click on the pull request to review it
   - Review the changes in the "Files changed" tab
   - Leave comments or request changes if needed

3. **Merge the Pull Request:**
   - Once you're satisfied with the changes, click the "Merge pull request" button
   - Choose your merge strategy:
     - **Create a merge commit**: Preserves all commits and creates a merge commit
     - **Squash and merge**: Combines all commits into one (cleaner history)
     - **Rebase and merge**: Replays commits on top of the base branch
   - Click "Confirm merge"
   - Optionally, delete the contributor's branch

4. **Pull the changes locally:**
   ```bash
   git checkout main
   git pull origin main
   ```

### Advantages:
✅ Easy to use with GitHub's web interface  
✅ Built-in code review tools  
✅ Tracks discussion and review history  
✅ Automated conflict detection  
✅ Integration with CI/CD pipelines  

---

## Method 2: Using Git Command Line

If you prefer working directly with Git, you can merge changes using the command line.

### Option A: Add the Fork as a Remote and Merge

1. **Add the forked repository as a remote:**
   ```bash
   git remote add contributor-name https://github.com/contributor-username/Jeetpic.git
   ```

2. **Fetch the changes from the fork:**
   ```bash
   git fetch contributor-name
   ```

3. **View the branches from the fork:**
   ```bash
   git branch -r | grep contributor-name
   ```

4. **Checkout and test the changes locally:**
   ```bash
   git checkout -b test-contributor-changes contributor-name/their-branch-name
   # Test the changes
   npm install
   npm run dev
   npm run build
   ```

5. **Merge the changes into your main branch:**
   ```bash
   git checkout main
   git merge test-contributor-changes
   ```

6. **Push the merged changes:**
   ```bash
   git push origin main
   ```

7. **Clean up (optional):**
   ```bash
   git branch -d test-contributor-changes
   git remote remove contributor-name
   ```

### Option B: Cherry-pick Specific Commits

If you only want specific commits from the fork:

1. **Add the fork as a remote and fetch:**
   ```bash
   git remote add contributor-name https://github.com/contributor-username/Jeetpic.git
   git fetch contributor-name
   ```

2. **View the commit history:**
   ```bash
   git log contributor-name/their-branch-name --oneline
   ```

3. **Cherry-pick specific commits:**
   ```bash
   git checkout main
   git cherry-pick <commit-hash>
   ```

4. **Push the changes:**
   ```bash
   git push origin main
   ```

---

## Method 3: Using GitHub CLI

If you have [GitHub CLI](https://cli.github.com/) installed, you can manage pull requests from the command line.

### Steps:

1. **List open pull requests:**
   ```bash
   gh pr list
   ```

2. **View a specific pull request:**
   ```bash
   gh pr view <pr-number>
   ```

3. **Checkout a pull request locally:**
   ```bash
   gh pr checkout <pr-number>
   ```

4. **Review and test the changes:**
   ```bash
   npm install
   npm run dev
   npm run build
   npm run lint
   ```

5. **Merge the pull request:**
   ```bash
   gh pr merge <pr-number>
   ```
   
   You'll be prompted to choose a merge strategy:
   - `Create a merge commit`
   - `Squash and merge`
   - `Rebase and merge`

---

## Handling Merge Conflicts

Merge conflicts occur when changes in the fork overlap with changes in your repository.

### Resolving Conflicts via GitHub:

1. GitHub will indicate if there are conflicts in the pull request
2. Click "Resolve conflicts" button
3. Edit the files directly in GitHub's web editor
4. Remove conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
5. Click "Mark as resolved"
6. Click "Commit merge"

### Resolving Conflicts via Command Line:

1. **Fetch and merge the changes:**
   ```bash
   git fetch contributor-name
   git checkout main
   git merge contributor-name/their-branch-name
   ```

2. **Git will indicate conflicting files:**
   ```
   CONFLICT (content): Merge conflict in src/App.jsx
   ```

3. **Open the conflicting files and resolve:**
   ```jsx
   <<<<<<< HEAD
   // Your version
   const greeting = "Hello";
   =======
   // Their version
   const greeting = "Hi there";
   >>>>>>> contributor-name/their-branch-name
   ```

4. **Edit to keep desired changes:**
   ```jsx
   const greeting = "Hi there"; // or combine both changes
   ```

5. **Stage the resolved files:**
   ```bash
   git add src/App.jsx
   ```

6. **Complete the merge:**
   ```bash
   git commit -m "Merge changes from contributor-name"
   git push origin main
   ```

---

## Best Practices

### For Repository Owners:

1. **Always review changes carefully** before merging
2. **Test the changes locally** to ensure they work
3. **Run tests and linting:**
   ```bash
   npm run lint
   npm run build
   ```
4. **Communicate with contributors** about required changes
5. **Keep your main branch protected** using branch protection rules
6. **Use pull request templates** to standardize contributions
7. **Document your code review process** in this file

### For Contributors:

1. **Always fork the latest version** of the repository
2. **Create a descriptive branch name:**
   ```bash
   git checkout -b feature/add-new-hero-section
   ```
3. **Keep commits focused and atomic**
4. **Write clear commit messages**
5. **Test your changes thoroughly** before submitting
6. **Update documentation** if your changes affect it
7. **Keep your fork synced** with the upstream repository:
   ```bash
   git remote add upstream https://github.com/tensedLad/Jeetpic.git
   git fetch upstream
   git checkout main
   git merge upstream/main
   git push origin main
   ```

---

## Quick Reference Commands

### Sync Your Fork with Upstream:
```bash
git remote add upstream https://github.com/tensedLad/Jeetpic.git
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### Create a Pull Request Branch:
```bash
git checkout -b feature/my-new-feature
# Make your changes
git add .
git commit -m "Add my new feature"
git push origin feature/my-new-feature
```

### Test Before Merging:
```bash
npm install          # Install dependencies
npm run dev          # Test in development
npm run build        # Test production build
npm run lint         # Check for linting errors
```

---

## Need Help?

If you encounter issues or have questions:

1. Check existing [GitHub Issues](https://github.com/tensedLad/Jeetpic/issues)
2. Create a new issue with details about your problem
3. Tag the issue with appropriate labels (e.g., `help wanted`, `question`)

---

## Additional Resources

- [GitHub Docs: Creating a Pull Request from a Fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)
- [GitHub Docs: Syncing a Fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)
- [Git Documentation: git-merge](https://git-scm.com/docs/git-merge)
- [GitHub CLI Documentation](https://cli.github.com/manual/)

---

© 2025 Jeetpic. All rights reserved.
