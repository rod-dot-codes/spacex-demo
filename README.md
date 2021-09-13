# SpaceX API Demo

### Experiments with GraphQL, Cytoscape and Cloudflare Workers for rapid deployment thereafter

## Screenshots

<img width="1761" alt="Screenshot 2021-09-13 at 09 25 14" src="https://user-images.githubusercontent.com/1850318/133041456-3f883ff2-6b97-40e8-bcfd-bcd5340da765.png">
<img width="2002" alt="Screenshot 2021-09-13 at 09 25 29" src="https://user-images.githubusercontent.com/1850318/133041485-db8eaebe-c43a-491b-a773-c83e56edc493.png">


## Introduction

The brief was to use any language to create a timeline of SpaceX launches.

I liked the mission patches and decided to use that as the icons.

Furthermore, using a graph database allows you to show the reuse of the rockets and I think
that is the interesting aspect. Next potential improvements, would be to show which ships they used
and if any ships serviced the same core repeatedly.

This also supports AVIF, the new image format for the mission patches.

Open your network tab to see if you support AVIF or if it required to load the PNG.

## Demo

Please see the demo at [https://spacex.rod.codes](https://spacex.rod.codes)

## Next Todo

- ~Pre-load the images in the background after loading the Javascript - at the moment, it is quite janky when
you scroll. Can you preload hints or img tags with a lower priority.~ = *DONE!*
- Create a continously deploying Github Action that caches the GraphQL pre-built and pre-rendered into the page to speed up
the demo.
- Create a user controller that allows you to play at a adjustable speed, also add and remove edges for particular things - and turn on user definable scrolling and editable nodes and edges.

## Deployment

Simplfy install by modifying the `wrangler.template.toml` and renaming it to `wrangler.toml`.

Install `wrangler` from Cloudflare, then:

```
wrangler login
# If you cannot login via a Web URL, use = wrangler config
wrangler publish
```

That easy!
