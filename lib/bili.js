const nunjucks = require('nunjucks');
const request = require('request');
const path = require('path');

nunjucks.configure({ autoescape: true });

var convert = (num) => {
    if (num >= 1E4) {
        num /= 1E4;
        return num.toFixed(1) + "万";
    } else {
        return num;
    }

}
var toHHMMSS = (secs) => {
    var sec_num = parseInt(secs, 10)
    var hours = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [hours, minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v, i) => v !== "00" || i > 0)
        .join(":")
}

var getVideoMessage = (id) => {
    var vtype;
    if (id.substring(0, 2).toLowerCase() == "bv") {
        vtype = ["bvid", ""];
    } else {
        vtype = ["aid", "av"];
        id = id.toLowerCase().replace("av", "");
    }
    return new Promise((resolve, reject) => {
        request('http://api.bilibili.com/x/web-interface/view?' + vtype[0] + '=' + id, function (error, response, body) {
            setTimeout(function () {
                if (!error && response.statusCode == 200) {
                    var data = JSON.parse(body)['data'];
                    if (data != undefined) {
                        var qwq = {
                            v_id: vtype[1] + id,
                            v_title: data['title'],
                            v_time: toHHMMSS(data['duration']),
                            v_playview: convert(data['stat']['view']),
                            v_danmaku: convert(data['stat']['danmaku']),
                            v_type: "视频",
                            v_upname: data['owner']['name'],
                            v_cover: data['pic']
                        };
                        //console.log(qwq);
                        resolve(qwq);
                    }else{
                        resolve({
                            v_id: vtype[1] + id,
                            v_title:"出错了！",
                        });
                    }

                } else {
                    console.log(error);
                }
            }, 2000)

        });
    });
}


module.exports = async function createCard(id) {
    var card = nunjucks.render(
        path.resolve(__dirname, '../templates/' + 'bilicard.njk'), await getVideoMessage(id));
    return card;
}