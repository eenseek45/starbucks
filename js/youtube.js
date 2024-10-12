// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
    new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'An6LvWQuj_8', // 최초 재생할 유트브 영상 ID
        playerVars: {
            autoplay: true, /* 자동재생여부 */
            loop: true,     /* 반복재생여부 */
            playlist: 'An6LvWQuj_8' // 반복 재생할 유트브 영상 ID
        },
        events: {
            // 영상이 준비가 되면 음소거
            onReady: function (event) {
                event.target.mute() // 음소거
            }
        }
    });
}