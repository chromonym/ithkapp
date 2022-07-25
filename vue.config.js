const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    // replace './' with '/ithkapp/' for building for the github sites
    // replace './' with '/<path>/' for hosting at https://example.com/<path>/, or just '/' if hosting at the root
    // alteratively, leave it as './' for building to local files
    ? './'
    : '/'
})
