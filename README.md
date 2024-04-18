# Discovery Project

## Getting Started

1. **Central Repository:**

   - We maintain a central repository at [Discovery Hospitality Revamp](https://bitbucket.org/halcyonlaravel/discovery-hospitality-revamp/src/master). This repository houses all components for the sites, including the Discovery Suite template.

2. **Templates:**

   - There are two templates within this project: Discovery Hospitality and Discovery Suites.

3. **Discovery Suite Template:**
   - The Discovery Suite Template is utilized for hotel/resort websites in this project. (Refer to the `.env` file)
   - To use the Discovery Suite template for a new project:
     - First, create your repository.
     - Remove the current remote origin by executing: `git remote remove origin`.
     - Add a remote by executing: `git remote add origin https://bitbucket.org/halcyonlaravel/discovery-hospitality-revamp/src/master`.
     - Execute: `git pull origin master`.
     - After pulling the files from the centralized repo, remove the origin repo (centralized repo) by executing: `git remote remove origin`, and replace it with your actual repository by executing: `git remote add https://the-link-of-your-repo-branch`.
     - Once the origin repo has been set, check the `.env` file if the configs are set correctly. After confirming functionality, push your updates to your branch as the initial commit.
     - If it's not working, check if the site has necessary contents to make it work. Verify the `prebuildUtilities` file if it's configured properly, including globals and menu.
     - To customize colors based on the current theme, modify `globals.css` in line 5.
     - Once confirmed working, push your updates to your repository. Create a remote by executing: `git remote add core https://bitbucket.org/halcyonlaravel/discovery-hospitality-revamp/src/master/` so that you can pull updates from the centralized repo.
     - Pull updates from the core/centralized repo by executing: `git pull core master`.

#### The websites are almost identical.
