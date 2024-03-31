# [Ithkapp](https://thexxos.github.io/ithkapp/) (vil(p)!af(b)fus(f)vaf(t)san(t)ap(t)vig(t)sung(b)es(p)u(t)vom(b)e(f)grog(f)kay(f)point(f)ga(f))

Ithkapp is a web app to make translation into [kay(f)bop(t)](https://crazyninjageeks.wordpress.com/2015/11/28/introduction-to-kayfdanfsantaptvlirtsangbesputvombngagtvlimpkayfsnafkayfgaf-boptvegpdaffshofbompvlimpgafvlimpgaf/) easier.

It initially (from its creation to late December, 2022) was a school project.

## Code locations

Code for this project is mostly located in `/src/`, with `/src/App.vue/` being the main file and `/src/qkf` being the location of the code specific to kay(f)bop(t). Please ignore the code in folders starting with `/src/qit`, as it is irrelevant. `/src/components/optionbox.vue` is the code for the option boxes that make up most of the website.

`/dist/` is the location of the *built* files for Ithkapp, and is automatically replaced with `npm run build`. The branch `gh-pages` is where the website actually runs from, and files in `dist` can be moved there (after being committed to `main`) with `git subtree push --prefix dist origin gh-pages`.

The layout of this project is that of a normal Vue3 project, probably.

## Notes

<details>
<summary>Since kay(f)bop(t) is an infinitely more in-depth and intellectual conlang than Ithkuil, I have decided to fully pivot the focus of Ithkapp from Ithkuil to kay(f)bop(t), although I have not changed its name because I can't be bothered.</summary>

*(Everything above (in this notes section) is false, by the way - happy April fools'!)*
</details>

Do not add `?v=4` to the end of the address of Ithkapp.

## Commands

Install and set up necessary files: `npm install`

Compile and hot-reload for development: `npm run serve`

Compile and minify for production: `npm run build`

Lint and fix files: `npm run lint`
