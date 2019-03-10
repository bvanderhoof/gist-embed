# gist-embed

Lightning fast zero dependency library for embedding gists on your webpage.

## Usage

### Add script tag

```html
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/gist-embed@1.0.0/gist-embed.min.js"
></script>
```

### Add code element to your webpage with data-gist-id attribute

```html
<code data-gist-id="5457595"></code>
```

# Contributing

## Setup

- I recommend using VSCode to develop
- Install prettier VSCode extension
- If you don't yet have Typescript installed globally: `npm install -g typescript`
- `npm install`

## Development

- To start the dev server: `npm run dev`
- This starts webpack with a local web server and hot reloading
- navigate to http://localhost:8080/test.html
- webpack serves the compiled TypeScript `index.ts` to `/index.js` when in development mode

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
