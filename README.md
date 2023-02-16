# [Ithkapp](https://thexxos.github.io/ithkapp/) (hwirbuvie-ekţgyil)
Ithkapp is a web app to make translation into [New Ithkuil (Ithkuil IV)](http://www.ithkuil.net/) easier.

It initially (from its creation to late December, 2022) was a school project.

## Code locations
Code for this project is mostly located in `/src/`, with `/src/App.vue/` being the main file and `/src/qit*` being the locations of the code specific to each version of the app for Ithkuil * (Ithkuil III, Ithkuil IV). This does mean that a version of the app for [Ithkuil III](http://www.ithkuil.net/00_intro.html) is somewhat in progress. `/src/components/optionbox.vue` is the code for the option boxes that make up most of the website.

`/dist/` is the location of the *built* files for Ithkapp, and is automatically replaced with `npm run build`. The branch `gh-pages` is where the website actually runs from, and files in `dist` can be moved there (after being committed to `main`) with `git subtree push --prefix dist origin gh-pages`.

The layout of this project is similar to a normal Vue3 project, because it is.

## Notes
As I ([TheXXOs](https://github.com/TheXXOs)) originally made this project for school and was half-relearning VueJS in the process, the code quality is likely subpar and the code in `App.vue`, `optionbox.vue` and `qit4/4.vue` isn't very well explained. Sorry in advance for that. I likely will do a rewrite of the project some time in the future now that I know exactly what the functionality and layout of the website should be.

## Commands
Install and set up necessary files: `npm install`

Compile and hot-reload for development: `npm run serve`

Compile and minify for production: `npm run build`

Lint and fix files: `npm run lint`
