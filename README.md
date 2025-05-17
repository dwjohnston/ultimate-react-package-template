# Ultimate react package template 

A template for creating and publishing open source React packages. 

## Features

- Branch deploys to Netlify 
- Tests with Storybook
- Release management with changesets


## Instructions 

- Fork/clone the repo. 
- Update package.json: 
    - Change the author details
    - Change the package name
    - Change the repository details
- Update LICENSE: 
    - Change the copyright name
- Log in to Netlify, create new project and add your repository 
- In Github, set NETLIFY_SITE_ID as a repository variable, and NETLIFY_TOKEN as a repository secret. 
- Install the [changeset-bot](https://github.com/apps/changeset-bot) to your repository 


## Notes

- I would prefer to deploy to Github pages, but [branch deploys are not supported](https://github.com/orgs/community/discussions/21582).

### To come

- Automated documentation generation 




