# Ultimate react package template 

A template for creating and publishing open source React packages. 

Feel free to open pull requests against this repository! 

A good way to see how everything is behaving, is to update the component package yourself and raise a pull request. 

I'll merge anything that isn't too crazy, and adheres to the versioning strategy. 

## Features

- Branch deploys to Netlify 
- Tests with Storybook
- **Automated API documentation generation with TypeDoc**
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


## Documentation

This template includes automated API documentation generation using [TypeDoc](https://typedoc.org/). The documentation is generated from TSDoc comments in your code.

### Writing Documentation

Use TSDoc comments to document your components, functions, and types:

```tsx
/**
 * A demonstration React component that displays text and numeric values
 * 
 * @param props - The component props
 * @returns A div element displaying the provided values
 * 
 * @example
 * ```tsx
 * <MyComponent 
 *   foo="Hello"
 *   bar="World"
 *   chaz={42}
 *   delta={3.14}
 * />
 * ```
 * 
 * @public
 */
export function MyComponent(props: MyComponentProps) {
  // component implementation
}
```

### Generating Documentation

The documentation is automatically generated during the build process, but you can also generate it manually:

```bash
# Generate documentation
npm run build:docs

# Serve documentation locally
npm run docs:serve
```

The documentation will be available at:
- During development: `http://localhost:8080` (when using `docs:serve`)
- In the deployed site: `/docs` (integrated into the Next.js build) 


## Notes

- I would prefer to deploy to Github pages, but [branch deploys are not supported](https://github.com/orgs/community/discussions/21582).

- Currently the behaviour is that merging to master will update the 'master docs' (ie. the published docs people will see in regular use), create a prerelease package, and create a release PR. 
  - This means that until the release PR is merged, your master docs will be ahead of what's actually in the published package. 
  - I'm working on this, basically I need a way of getting Netlify to only publish the main branch if it has a release tag. Related discussion: https://answers.netlify.com/t/deploy-on-git-tags-only/43759

- The prerelease packages are actually snapshots marked 0.0.0-commitsha-date
  - It would be nice is they had proper version numbers. It probably won't be a hugely difficult task to achieve this - see https://github.com/changesets/changesets/blob/main/docs/prereleases.md But the note there scares me a bit, but I think the difficulties are more when it comes to monorepos. 


## To come

(This feature has been implemented! ✅ Documentation is now generated automatically from TSDoc comments.) 




