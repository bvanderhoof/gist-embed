# gist-embed

Lightning fast zero dependency library for embedding gists on your webpage.

# Usage

## Add script tag

```html
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/gist-embed@1.0.1/dist/gist-embed.min.js"
></script>
```

## Add code element to your webpage with data-gist-id attribute

```html
<code data-gist-id="5457595"></code>
```

## Modifiers

You can add attributes to your HTML Element that modify the gist embed.

- `data-gist-hide-line-numbers`
  - **type**: string `('true')`
  - Removes all of the line numbers in the left hand gutter of the gist
- `data-gist-hide-footer`
  - **type**: boolean `('true')`
  - Removes the gist footer
- `data-gist-caption`
  - **type**: string
  - Places a header above the gist with your chosen caption string
- `data-gist-file`
  - **type**: string
  - If the gist has multiple files, specify the filename you want to show
- `data-gist-line`
  - **type**: string
  - Line numbers you want to show. The rest are removed.
  - Examples:
    - `1,2,3` // Only shows lines 1, 2 and 3
    - `1-4` // Only shows lines 1, 2, 3, and 4
    - `1-4,8` // Only shows lines 1, 2, 3, 4, and 8

# Contributing

## Setup

- I recommend using VSCode to develop
- Install prettier VSCode extension
- `npm install`

## Development

- To start the dev server: `npm run dev`
- This starts webpack with a local web server and hot reloading
- navigate to http://localhost:8080/test.html
- webpack serves the compiled TypeScript `index.ts` to `/index.js` when in development mode

## Tests

- Please add unti tests for your new code.
- `npm test`
- Use `Rewire` methods to get access to private functions in `index.ts`. See `tests/index.test.js` for examples.
- Add an example to `test.html`

## Committing

- Update the README with the new jsdelivr script based on new version bump
- Husky, a git hook tool, will automatically lint and run prettier when you `git commit` as well as run jest tests and create the prod minified bundle.

# FAQ

## What happened to blairvanderhoof/gist-embed based on jQuery?

- My old github account couldn't be recovered, so starting with a new repo here.
- I always wanted to rewrite gist-embed to not use jQuery and simplify the code.
- Going forward, this will be where all gist-embed code will reside.

## Can I still use blairvanderhoof/gist-embed?

- That account will probably go away soon. If you really need to rely on it, I suggest forking it before it's removed.

## But I like using jQuery and using the \$.gist() global method!

- This will be a plain vanilla JS library from now on.
- The gists should load much faster now that we are removing jQuery as a dependency.

## What about X feature that was supported in blairvanderhoof/gist-embed?

- I will slowly add in the existing capabilities. For now, it will simply load a gist with attribute `data-gist-id` added to a HTML element.

## Why did you loose your old account?

- Lesson learned - always keep up to date 2FA recovery codes if you have 2FA enabled on your account and loose your authentication app :(
