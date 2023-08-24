'use strict'
const fs = require('hexo-fs')
const path = require('path')
const css = hexo.extend.helper.get('css').bind(hexo)
const { createCard } = require('./lib/bili.js')
const get = require('lodash.get')

const { config } = hexo

const imageProxy = get(config, 'hexo_bilibili_card.imageProxy', "https://images.weserv.nl/?url=")

hexo.extend.generator.register('bili_asset', () => [{
  path: 'css/bilicard.css',
  data: () => fs.createReadStream(path.resolve(__dirname, "./source", "bilicard.css"))
}
])

hexo.extend.tag.register("bilicard", async (args) => {
  return await createCard(imageProxy, args[0])
}, { async: true })

hexo.extend.injector.register('head_begin', () => {
  return css('/css/bilicard.css')
}, 'post')
