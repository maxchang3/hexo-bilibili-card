
const cardTemplate = (imageProxy, { v_id, v_cover, v_time, v_title, v_playview, v_danmaku, v_type, v_upname }) =>
    `<div class="bvideo"><a href="//www.bilibili.com/video/${v_id}" target="_blank">
        <div class="bvideo-box">
            <div class="bvideo-cover">
                <div class="cover-default"></div>
                <div class="bvideo-cover-layer" style="background-image:url(${imageProxy}${v_cover})">
                    <i class="icon-video"></i>
                </div>
                <span class="duration">${v_time}</span>
            </div>
            <div class="bvideo-info">
                <p class="title">${v_title}</p>
                <p class="card-status">
                    <span class="play-num">
                        <i class="fa fa-youtube-play"></i>
                        <span>${v_playview}</span></span>
                    <span>
                        <i class="fa fa-list-alt"></i>
                        <span>${v_danmaku}</span></span></p>
                <div class="partition">
                    <label class="card-label">${v_type}</label>
                    <label class="up-label"></label>
                    <label class="up-name">${v_upname}</label>
                </div>
                <div class="actions hide"></div>
            </div>
        </div>
    </a></div>`

module.exports = { cardTemplate }
