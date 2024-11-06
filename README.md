# packing

## Getting started
1. Install [bun](https://bun.sh/)
2. `bun install` - Install deps
3. `bun run dev` - Start dev server

## Structure
- Routes are added in /src/routes. Naming should reflect their intended subdirectory in resulting URL
- Components should have their own directory and be exported in an index file.
- Avoid directories with "subcomponents" to prevent an overly nested structure
- Prefer aliased imports. You alias in `tsconfig.json` and a plugin includes them automatically in `vite.config.ts`. The only exception is the css-file holding the global styles.

## The project

### About
- Runtime is [bun](https://bun.sh/)
- Uses vite
- Uses [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) for fast Refresh

## Terminology
| Term     | Description                                                                     |
| ---------| ------------------------------------------------------------------------------- |
| scene    | Everything visible on the screen, consists of geometry and stage                |
| stage    | Matters concerning visual representation. Lighting, camera, scene helpers, etc. |
| geometry | The physical bodies rendered in the scene                                       |
| bin      | A physical body that holds parcels                                              |
| parcel   | A physical body placed inside bins according to the bin packing algorithm       |

### Tech decisions

## Styling

### Vanilla CSS?
We're starting of with just using vanilla CSS, mostly to learn about its (often overlooked?) features. With CSS modules and CSS variables it looks like we might not even need a preprocessor, but we'll see. For now let's cross the dependency bridge if and when we get there

### Global styling
Located in `src/style.global.css`. We might want to split its contents into different files in the future. That file is aliased so to reference simply add `@import url('@globalStyle');` to the top of your `module.css`-file.

### Style global elements
We should strive to style html-elements (like h1, h2, p, etc.) globally to keep the JSX as clean as possible and promote the use of html-elements. Hopefully, this also forces us to think about the overall layout and styling, making the visuals more coherent.

### In components
The file containing styling for a component is a css file located as a sibling to the .tsx-file. Use the suffix "module" like `MyComponent.module.css` to prevent naming collisions between components.
It is then imported as `import style from './MyComponent.module.css`

### Why no styled components?
In essence, styled component makes components out of something that could simply be just an html-element with a class.
The downside to this is that it obfuscates which parts of the JSX contains "actual" components with logic as opposed to information about styling. Actually using the wide variety of html-elements add context to both other developers and screen readers, it therefore makes sense to opt for using html-elements front and center.

### Import order
[eslint-plugin-import-order](https://github.com/import-js/eslint-plugin-import/issues/2948) seems to be in a bit of a state and doesn't support eslint v9 yet. Thats why I use [eslint-plugin-simple-sort](https://github.com/lydell/eslint-plugin-simple-import-sort)


### Tests
Most 'normal' tests are co-located with the files that are tested except for performance testing

#### Performance tests
Performance testing is done in `src/problemSets`. The test sets found in `src/problemSets/BRSets` are derived from test sets by E.E. Bischoff and M.S.W. Ratcliff (1995). The only difference in my implementation is that information regarding allowed/disallowed rotations are omitted. The data was retrieved from the [Brunel OR-library](http://people.brunel.ac.uk/~mastjjb/jeb/orlib/thpackinfo.html), specifically [here](http://people.brunel.ac.uk/~mastjjb/jeb/orlib/thpackinfo.html).
