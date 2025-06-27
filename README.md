# Ultimate react package template 

A template for creating and publishing open source React packages. 

Feel free to open pull requests against this repository! 

A good way to see how everything is behaving, is to update the component package yourself and raise a pull request. 

I'll merge anything that isn't too crazy, and adheres to the versioning strategy. 

## Features

- Branch deploys to Netlify 
- Tests with Storybook
- Release management with changesets
    - PRs will be prompted to provide a changeset 
    - On successful merge to main, a prerelease package will be published
    - On successful merge to main, a release PR will automatically be created



## Instructions 

- Fork/clone the repo. 
- Update package.json: 
    - Change the author details
    - Change the package name
    - Change the repository details
- Update LICENSE: 
    - Change the copyright name
- Log in to Netlify, create new project and add your repository 
- In Github, set NETLIFY_SITE_ID as a repository variable, and NETLIFY_TOKEN as a repository secret. (Generate [PAT here](https://app.netlify.com/user/applications#oauth)) 
- In Github, set the NPM_TOKEN repository secret 
- Install the [changeset-bot](https://github.com/apps/changeset-bot) to your repository 


## Notes

- I would prefer to deploy to Github pages, but [branch deploys are not supported](https://github.com/orgs/community/discussions/21582).

- Currently the behaviour is that merging to master will update the 'master docs' (ie. the published docs people will see in regular use), create a prerelease package, and create a release PR. 
  - This means that until the release PR is merged, your master docs will be ahead of what's actually in the published package. 
  - I'm working on this, basically I need a way of getting Netlify to only publish the main branch if it has a release tag. Related discussion: https://answers.netlify.com/t/deploy-on-git-tags-only/43759

- The prerelease packages are actually snapshots marked 0.0.0-commitsha-date
  - It would be nice is they had proper version numbers. It probably won't be a hugely difficult task to achieve this - see https://github.com/changesets/changesets/blob/main/docs/prereleases.md But the note there scares me a bit, but I think the difficulties are more when it comes to monorepos. 


## To come

- Automated documentation generation 




