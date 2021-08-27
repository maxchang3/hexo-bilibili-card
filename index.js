'use strict';
const fs = require('hexo-fs');
const path = require('path');

const bili = require('./lib/bili.js')

hexo.extend.generator.register('bili_asset', ()=>[
    {
      path: 'css/bilicard.css',
      data: function(){
        return fs.createReadStream(
          path.resolve(path.resolve(__dirname, "./source"),"bilicard.css"))
      }
    }
]);

hexo.extend.tag.register("bilicard",  async(args)=> {
    return await bili(args[0]);
},{async: true});

hexo.extend.filter.register('after_post_render', (data) => {
    let my_css = '<link rel="stylesheet" href="/css/bilicard.css" type="text/css">';
    data.content += my_css;
    return data;
});