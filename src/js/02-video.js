import VimeoPlayer from "@vimeo/player";
import throttle from "lodash.throttle";

const iframe = document.querySelector('iframe');
const player = new VimeoPlayer(iframe);

const LOCALSTORAGE_KEY = "videoplayer-current-time";
const time = localStorage.getItem(LOCALSTORAGE_KEY);
const parsTime = JSON.parse(time) || { seconds: 0 };

console.log("time:", parsTime);
player.on('timeupdate', throttle(onTimeupdate, 1000));

function onTimeupdate(data) {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
}

player.setCurrentTime(parsTime.seconds).catch(function(error) {
  console.log('error',error);
});

