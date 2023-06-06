# Deck.gl Playground

## Overview

This app is a playground for playing with [deck.gl](https://deck.gl/). I intend to use it to play with layers I'm unfamiliar with, minus the complications that a real-world app would impose. I can also develop new custom layers in relative isolation.

## Get Started

1. Clone the repo
2. Install dependencies i.e. `yarn`
3. Get a mapbox [access token](https://docs.mapbox.com/help/getting-started/access-tokens/) and add to `map.constants.ts` file.
4. Start app i.e. `yarn dev`

## Playground

Most of the work so far is in the `src/map/map.component.tsx` file. In there, you can create as many layers as we are interested in to view.

### Investigations

I suggest creating new branches for specific bits of work, I've already done so for the combo layer, see branch `combined-mvt`, for some work on taking 2 separate mapbox vector tiled datasets, merging them together and displaying/filtering on them. This gives us the ability to fliter data by many dimensions.
