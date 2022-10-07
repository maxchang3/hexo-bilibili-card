'use strict';
const fs = require('hexo-fs');
const path = require('path');
const css = hexo.extend.helper.get('css').bind(hexo);
const bili = require('./lib/bili.js')

hexo.extend.generator.register('bili_asset', ()=>[{
      path: 'css/bilicard.css',
      data: () => fs.createReadStream(path.resolve(__dirname, "./source" ,"bilicard.css"))
    }
]);

hexo.extend.tag.register("bilicard",  async(args)=> {
    return await bili(args[0]);
},{async: true});

hexo.extend.injector.register('head_begin', ()=> {
  return css('/css/bilicard.css');
}, 'post')
