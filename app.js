const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar = document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicThumbnail = document.querySelector(".music-thumb");
const musicImage = document.querySelector(".music-thumb img");
const playRepeat = document.querySelector(".play-repeat");

let isPlaying = true;
let indexSong = 0;
let isRepeat = false;
// const musics = ["holo.mp3", "summer.mp3", "spark.mp3", "home.mp3"];
const musics = [
  {
    id: 1,
    title: "Holo",
    file: "holo.mp3",
    image:
      "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80",
  },
  {
    id: 2,
    title: "Monkey Dance",
    file: "MonkeyDance.mp3",
    image:
      "https://2img.net/h/i67.photobucket.com/albums/h307/saraxinh/31.jpg"  
  },
  {
    id: 3,
    title: "Home",
    file: "home.mp3",
    image:
      "https://msmobile.com.vn/upload_images/images/hinh-nen-dep-cho-may-tinh-full-hd-2.jpg",
  },
  {
    id: 4,
    title: "Rainy",
    file: "RAINY.mp3",
    image:
      "https://demoda.vn/wp-content/uploads/2022/02/background-mua-tren-phien-la-750x600.jpg",
  },
  {
    id: 5,
    title: "Soju Love",
    file: "Obito.mp3",
    image:
      "https://i1.sndcdn.com/artworks-A7Rs9wUuZszwGHyM-3zKDLA-t500x500.jpg",
  },
  {
    id: 6,
    title: "Đã Lỡ Yêu Em Rồi",
    file: "JS.mp3",
    image:
      "https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2020/09/hinh-nen-dien-thoai-dep-moi-nhat-23.jpg?fit=564%2C20000&quality=95&ssl=1",
  },
  {
    id: 7,
    title: "Flexin Trên CircleK",
    file: "LowG.mp3",
    image:
    "https://profiledata.net/file/img/media/14f2771bdd71dc20041a10c648d6fcc0.jpeg",
  },
  {
    id: 8,
    title: "DON'T BREAK MY HEART",
    file: "Binz.mp3",
    image:
    "https://i.ytimg.com/vi/Ob2NQwoHKTI/maxresdefault.jpg",
  },
  {
    id: 9,
    title: "DON'T BREAK MY HEART",
    file: "Binz.mp3",
    image:
    "https://i.ytimg.com/vi/Ob2NQwoHKTI/maxresdefault.jpg",
  },
  {
    id: 10,
    title: "TAM GIÁC",
    file: "Kink.mp3",
    image:
    "https://i.scdn.co/image/ab6761610000e5eb00ece52e50b41c7d6192cc26",
  },
  {
    id: 11,
    title: "THÁNG TƯ LÀ LỜI NÓI DỐI CỦA EM",
    file: "T4.mp3",
    image:
    "https://static.yeah1.com/uploads/editors/12/2021/10/31/RE76gmq8jy94yrSDZJszWeKmicrpiew1sG8iqwnb.jpg",
  },





];
/**
 * Music
 * id: 1
 * title: Holo
 * file: holo.mp3
 * image: unsplash
 */
let timer;
let repeatCount = 0;
playRepeat.addEventListener("click", function () {
  if (isRepeat) {
    isRepeat = false;
    playRepeat.removeAttribute("style");
  } else {
    isRepeat = true;
    playRepeat.style.color = "#ffb86c";
  }
});
nextBtn.addEventListener("click", function () {
  changeSong(1);
});
prevBtn.addEventListener("click", function () {
  changeSong(-1);
});
song.addEventListener("ended", handleEndedSong);
function handleEndedSong() {
  repeatCount++;
  if (isRepeat && repeatCount === 1) {
    // handle repeat song
    isPlaying = true;
    playPause();
  } else {
    changeSong(1);
  }
}
function changeSong(dir) {
  if (dir === 1) {
    // next song
    indexSong++;
    if (indexSong >= musics.length) {
      indexSong = 0;
    }
    isPlaying = true;
  } else if (dir === -1) {
    // prev song
    indexSong--;
    if (indexSong < 0) {
      indexSong = musics.length - 1;
    }
    isPlaying = true;
  }
  init(indexSong);
  // song.setAttribute("src", `./Music/${musics[indexSong].file}`);
  playPause();
}
playBtn.addEventListener("click", playPause);
function playPause() {
  if (isPlaying) {
    musicThumbnail.classList.add("is-playing");
    song.play();
    playBtn.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`;
    isPlaying = false;
    timer = setInterval(displayTimer, 500);
  } else {
    musicThumbnail.classList.remove("is-playing");
    song.pause();
    playBtn.innerHTML = `<ion-icon name="play"></ion-icon>`;
    isPlaying = true;
    clearInterval(timer);
  }
}
function displayTimer() {
  const { duration, currentTime } = song;
  rangeBar.max = duration;
  rangeBar.value = currentTime;
  remainingTime.textContent = formatTimer(currentTime);
  if (!duration) {
    durationTime.textContent = "00:00";
  } else {
    durationTime.textContent = formatTimer(duration);
  }
}
function formatTimer(number) {
  const minutes = Math.floor(number / 60);
  const seconds = Math.floor(number - minutes * 60);
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}
rangeBar.addEventListener("change", handleChangeBar);
function handleChangeBar() {
  song.currentTime = rangeBar.value;
}
function init(indexSong) {
  song.setAttribute("src", `./Music/${musics[indexSong].file}`);
  musicImage.setAttribute("src", musics[indexSong].image);
  musicName.textContent = musics[indexSong].title;
}
displayTimer();
init(indexSong);