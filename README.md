# SpaceX API Demo

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

- Pre-load the images in the background after loading the Javascript - at the moment, it is quite janky when
you scroll. Can you preload hints or img tags with a lower priority.
- Create a continously deploying Github Action that caches the GraphQL pre-built and pre-rendered into the page to speed up
the demo.
