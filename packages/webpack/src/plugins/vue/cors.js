import HTMLPlugin from 'html-webpack-plugin'

export default class CorsPlugin {
  constructor ({ crossorigin }) {
    this.crossorigin = crossorigin
  }

  apply (compiler) {
    const ID = 'vue-cors-plugin'
    compiler.hooks.compilation.tap(ID, (compilation) => {
      HTMLPlugin.getHooks(compilation).alterAssetTagGroups.tap(ID, (data) => {
        if (this.crossorigin != null) {
          [...data.headTags, ...data.bodyTags].forEach((tag) => {
            if (['script', 'link'].includes(tag.tagName)) {
              if (tag.attributes) {
                tag.attributes.crossorigin = this.crossorigin
              }
            }
          })
        }
        return data
      })
    })
  }
}
