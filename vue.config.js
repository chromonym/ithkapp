const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    // replace '/ithkapp/' with './' for building to local files
    // replace '/ithkapp/' with '/<path>/' for hosting at https://example.com/<path>/, or just '/' if hosting at the root
    // alteratively, leave it as '/ithkapp/' for building for the github sites
    ? '/ithkapp/'
    : '/'
})
