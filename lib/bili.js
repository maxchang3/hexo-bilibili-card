const { cardTemplate } = require('./template')
const { fetch } = require('node-fetch-native')

const convert = (num) => (num >= 1E4) ? (num / 1E4).toFixed(1) + "万" : (num)

const toHHMMSS = (second) => [
    Math.floor(second / 3600),
    Math.floor(second / 60) % 60,
    second % 60
].map(n => n.toString().padStart(2, 0)).join(':')

const getVideoMessage = async (id) => {
    const type = id.slice(0, 2).toLowerCase()
    const vtype = { 'av': 'aid', 'bv': 'bvid' }[type]
    const url = `http://api.bilibili.com/x/web-interface/view?${vtype}=${type == 'bv' ? id : id.slice(2)}`
    const data = (await (await fetch(url)).json())['data']
    return data ? {
        v_id: id,
        v_title: data['title'],
        v_time: toHHMMSS(data['duration']),
        v_playview: convert(data['stat']['view']),
        v_danmaku: convert(data['stat']['danmaku']),
        v_type: "视频",
        v_upname: data['owner']['name'],
        v_cover: data['pic']
    } : {
        v_id: id,
        v_title: "出错了！",
    }
}

module.exports = {
    createCard: async (imageProxy, id) => cardTemplate(imageProxy, await getVideoMessage(id))
}
