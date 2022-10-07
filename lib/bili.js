const nunjucks = require('nunjucks');
const fetch = require('node-fetch')
const path = require('path');

nunjucks.configure({ autoescape: true });

function convert(num) {
    return (num >= 1E4) ? (num / 1E4).toFixed(1) + "万" : (num)
}

function toHHMMSS(second) {
    return [Math.floor(second / 3600),
    Math.floor(second / 60) % 60,
    second % 60].map(
        n => n.toString().padStart(2, 0)
    ).join(':')
}

async function getVideoMessage(id) {
    let vtype;
    if (id.substring(0, 2).toLowerCase() == "bv") {
        vtype = ["bvid", ""];
    } else {
        vtype = ["aid", "av"];
        id = id.toLowerCase().replace("av", "");
    }
    let data = (await (await fetch(`http://api.bilibili.com/x/web-interface/view?${vtype[0]}=${id}`)).json())['data'];
    let strings;
    if (data != undefined) {
        strings = {
            v_id: vtype[1] + id,
            v_title: data['title'],
            v_time: toHHMMSS(data['duration']),
            v_playview: convert(data['stat']['view']),
            v_danmaku: convert(data['stat']['danmaku']),
            v_type: "视频",
            v_upname: data['owner']['name'],
            v_cover: data['pic']
        };
    } else {
        strings = ({
            v_id: vtype[1] + id,
            v_title: "出错了！",
        });
    }
    return strings;
}

module.exports = async function createCard(id) {
    let card = nunjucks.render(
        path.resolve(__dirname, '../templates/' + 'bilicard.njk'), await getVideoMessage(id));
    return card;
}
