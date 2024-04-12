export async function getAPI(param) {
  try {
    const url = `https://music-api-2c07.onrender.com/${param}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function handleCatePlayList() {
  try {
    const cate = await getAPI("category");
    const playlist = await getAPI("playList");
    return {
      cate,
      playlist,
    };
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function handleGetSongs() {
  try {
    const songs = await getAPI("song");
    const singers = await getAPI("singer");
    const songSinger = await getAPI("songSinger");
    const songPlaylist = await getAPI("songPlaylist");
    return {
      songs,
      singers,
      songSinger,
      songPlaylist,
    };
  } catch (error) {
    console.error("Error:", error);
  }
}
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const apiUrlSong = "https://music-api-2c07.onrender.com/song";
const apiUrlSinger = "https://music-api-2c07.onrender.com/singer";
const apiUrlUser = "https://music-api-2c07.onrender.com/users";

async function getData(url) {
  const data = await fetch(url);
  return data.json();
}

const KEY_HEART = "hearts";
const KEY_ACTIONS_SONG = "actionSong";

const audios = $("#audio");
const range = $("#customRange");
const playListContent = $(".content-body_playlist");
const playListContentTab = $(".content-body_playlist--tab");
const singerContentTab = $(".content-body_singer--tab");
const singerContentTabAll = $(".content-body_singer--tab--all");
const listSongBox = $(".content-music__table");
const listSongAll = $(".content-music__table--all");
const listSongRecenly = $(".content-music__recently");
const boxName = $(".player-container__name");
const boxAnimate = $(".player-animate");
const itemAnimate = $(".player-animate__name");
const cd_thumb = $(".player-container__media");
const btnTogglePlay = $(".btn--pay--songs");
const tracktime = $(".tracktime");
const progressTrack = $(".progress__track");
const inputVolume = $("#customRangevolume");
const inputRange = $("#customRangeMain");
const trackVolume = $(".progress__track--isBig");
const btnPrev = $(".btn-prev");
const btnNext = $(".btn-next");
const explorePlaylist = $(".explore-playlist");
const exploreChart = $(".content-chart__table");
const btnTop100 = $(".content-chart__btnTop");
const tableAll = $(".content-music__table--all");

let isPlaying = false;
let isRepeat = false;
let isRandom = false;

const config = JSON.parse(localStorage.getItem(KEY_ACTIONS_SONG)) || {};
function setConfig(key, value) {
  config[key] = value;
  localStorage.setItem(KEY_ACTIONS_SONG, JSON.stringify(config));
}

//animation name
const itemWidth = itemAnimate.clientWidth;
boxName.style.width = itemWidth + "px";
const ani = boxAnimate.animate([{ transform: "translateX(-50%)" }], {
  duration: 3000,
  iterations: Infinity,
});
ani.pause();

//animation cd-thumra
const aniThumb = cd_thumb.animate([{ transform: "rotate(360deg)" }], {
  duration: 7000,
  iterations: Infinity,
});
aniThumb.pause();
//togge btn-player
const btnPlay = $(".btn-togge-pay");
btnPlay.onclick = function () {
  btnPlay.classList.toggle("playing");
};

const btnAvatar = $(".header__nav-img");
btnAvatar.addEventListener("click", function () {
  const modal = $(".app__modal-account");
  modal.classList.remove("hide-item");
  modal.addEventListener("click", function (e) {
    if (e.target.classList.contains("app__modal-account")) {
      modal.classList.add("hide-item");
    }
  });
});

// handle click links signup
const btnLink = $(".signup-link");
btnLink.addEventListener("click", function (e) {
  const boxSignIn = $(".account-signIn");
  const boxSignUp = $(".account-signup");
  boxSignIn.classList.add("hide-item");
  boxSignUp.classList.remove("hide-item");
});

//handle click links singIn
const btnSignInLink = $(".signin-link");
btnSignInLink.addEventListener("click", function (e) {
  const boxSignIn = $(".account-signIn");
  const boxSignUp = $(".account-signup");
  boxSignUp.classList.add("hide-item");
  boxSignIn.classList.remove("hide-item");
});

//handle click close playing
const btnClose = $(".player-full__action");
const modalBoxPlay = $(".player__full");
btnClose.addEventListener("click", () => {
  modalBoxPlay.style.height = 0;
  setTimeout(() => {
    $(".player-full__container").style.display = "none";
  }, 500);
});
function handleFullPlayer(box = undefined) {
  const overlayActive = $(".playlist-content__overlay.overlay--active");
  if (overlayActive) {
    overlayActive.classList.remove("overlay--active");
  }
  if (box) {
    box
      .querySelector(".playlist-content__overlay")
      .classList.add("overlay--active");
  }
  const modalBox = $(".player__full");
  document.querySelector(".player-full__container").style.display = "block";
  modalBox.style.height = 100 + "vh";
}
function handleEventBoxList(
  { cate, playlist },
  { songs, singers, songSinger, songPlaylist }
) {
  const boxPlaylist = $$(".playlist-content__item");
  boxPlaylist.forEach(function (box) {
    box.addEventListener("click", (e) => {
      if (!e.target.closest(".player__right-icon")) {
        handleFullPlayer(box);
        let cateId = box.dataset.cateid;
        const img = $(".playlist--content__img");
        const title = $(".playlist--content__name h3");
        const cateText = $(".cate-text");
        const dayUpdate = $(".day-text");
        const personLike = $(".persons-like");
        const music_table = $(".player-full__music");

        img.style.backgroundImage =
          "url(" +
          getPlayistbyId(playlist, parseInt(box.dataset.pllid), "img") +
          ")";
        title.innerHTML = getPlayistbyId(
          playlist,
          parseInt(box.dataset.pllid),
          "title"
        );
        dayUpdate.innerHTML = getPlayistbyId(
          playlist,
          parseInt(box.dataset.pllid),
          "updated"
        );
        personLike.innerHTML =
          getPlayistbyId(playlist, parseInt(box.dataset.pllid), "like") +
          " : " +
          " ";
        cateText.innerHTML = getCategoryById(cate, parseInt(cateId), "name");
        const arrsong = getAllsongByIdPlaylist(
          songPlaylist,
          parseInt(box.dataset.pllid)
        );
        let htmlSongFull = "";
        if (arrsong.length > 0) {
          arrsong.forEach((id, index) => {
            htmlSongFull += `<div data-idSong="${id}"data-index=${index} data-toppic="top5" data-idSinger="${songsWithSingerst(
              songSinger,
              id
            )}" data-idPlaylist="${getPlayistbyIdSong(
              songPlaylist,
              id,
              "id_playlist"
            )}" class="content-music__item">
                    <div class="music--item__left">
                      <div class="music--item__info">
                        <div style="background-image: url(${getSongById(
                          songs,
                          id,
                          "img"
                        )});" class="item--info__box">
                          <div class="item--info__overlay">
                            <div class="item--info__animate"></div>
                            <i class="item--info__animate-icon bi bi-play-fill icon-play btn-play"></i>
                          </div>
                        </div>
                        <div class="item--info__name">
                          <h4>${getSongById(songs, id, "name")}</h4>
                          <div class="item--info__singer">
                          ${getSingerById(
                            singers,
                            songsWithSingerst(songSinger, id),
                            "name"
                          )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="music--item__center player-full__right">
                      <span class="music--item__time">${getSongById(
                        songs,
                        id,
                        "time"
                      )}</span>
                    </div>
                    <div class="music--item__right">
                      <div class="music--item__actions">
                        <div class="player__options-btn option-btn hide-on-tablet-mobile">
                          <i class="btn--icon song__icon bi bi-mic-fill"></i>
                        </div>
                        <div class="player__options-btn option-btn box--heart box--heart-active">
                          <i class="btn--icon icon--heart bi bi-heart-fill i--active"></i>
                          <i class="btn--icon icon--heart bi-heart bi bi-heart-fill"></i> 
                        </div>
                        <div class="player__options-btn option-btn hide-on-tablet-mobile">
                          <i class="btn--icon bi bi-three-dots"></i>
                        </div>  
                      </div>
                    </div>
                  </div>`;
          });
        } else {
          htmlSongFull = `<div class="content-music__noitem">
          <div class="noitem__img"></div>
          <span class="noitem__messager">Hiện Chưa Có Bài Hát Nào Tải Lên</span>
          </div>`;
        }
        music_table.innerHTML = htmlSongFull;
      } else {
        if (e.target.classList.contains("btn--icon")) {
          e.target.parentElement.classList.toggle("box--heart-active");
          console.log(56546);
        } else {
          e.target.classList.toggle("box--heart-active");
        }
      }
      handlePlaySong({ songs, singers, songSinger, songPlaylist });
      handleActionsSong({ songs, singers, songSinger, songPlaylist });
    });
  });
}

function getSongById(songs, id, option) {
  const song = songs.find((song) => song.id === id);
  if (option === "all") {
    return song;
  } else {
    return song[option] || null;
  }
}
function getCategoryById(categorys, id, option) {
  const cate = categorys.find((ct) => ct.id === id);
  return cate[option] || null;
}
function getSingerById(singers, id, option) {
  let names;
  if (id.length > 1) {
    names = [];
    id.forEach((id) => {
      const singer = singers.find((singers) => singers.id === id);
      if (singer) {
        names.push(
          `<a onclick=handleInfoSinger(${id}) href="#">${singer[option]}</a> `
        );
      }
    });
  } else {
    const singer = singers.find((singers) => singers.id === id[0]);
    if (singer) {
      names = `<a onclick=handleInfoSinger(${id[0]}) href="#">${singer[option]}</a>`;
    }
  }
  return names;
}
function getPlayistbyId(songPlaylist, id, option) {
  const playlist = songPlaylist.find((playlisst) => playlisst.id === id);
  return playlist[option] || null;
}
function getPlayistbyIdSong(songPlaylist, idsong, option) {
  const playlist = songPlaylist.find(
    (playlisst) => playlisst.id_song === idsong
  );
  return playlist[option] || null;
}

function songsWithSingerst(songSinger, idSong) {
  let arrSinger = [];
  songSinger.forEach((song) => {
    if (song.id_song == idSong) {
      arrSinger.push(song.id_singer);
    }
  });
  return arrSinger;
}

function songsWithPlaylistt(songPlaylist, songSinger) {
  const items = [...songPlaylist, ...songSinger];
  const groupedData = {};
  items.forEach((item) => {
    const id_song = item.id_song;

    if (!groupedData[id_song]) {
      groupedData[id_song] = { id_song, id_singer: [], id_playlist: [] };
    }
    if (item.id_singer) {
      groupedData[id_song].id_singer.push(item.id_singer);
    }
    if (item.id_playlist) {
      groupedData[id_song].id_playlist.push(item.id_playlist);
    }
  });
}

function getSingerByIdSong(songSinger, id) {
  let arrSinger = [];
  songSinger.forEach((item) => {
    if (item.id_song === id) {
      arrSinger.push(item.id_singer);
    }
  });
  return arrSinger;
}

function getAllsongByIdPlaylist(songPlaylist, idPlaylist) {
  const arrSong = [];
  songPlaylist.forEach((playlist) => {
    if (playlist.id_playlist === idPlaylist) {
      arrSong.push(playlist.id_song);
    }
  });
  return arrSong;
}
function songTop5(songs) {
  const songSort = songs.sort((a, b) => b.view - a.view);
  const songTOP5 = songSort.slice(0, 5);
  return songTOP5;
}
function songRiminingAll(songs) {
  const songSort = songs.sort((a, b) => b.view - a.view);
  const songTOPRimining = songSort.slice(5);
  return songTOPRimining;
}
function songTopChart(songs) {
  const songSort = songs.sort((a, b) => b.view - a.view);
  return songSort;
}
function songActiveInToView(song) {
  setTimeout(() => {
    song.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, 400);
}

function handleRenderSongViews({ songs, singers, songSinger, songPlaylist }) {
  const songTOP5 = songTop5(songs);
  // const songChart = songTopChart(songs);

  let htmlSong = "";
  let htmlSongChart = "";
  let totalViews = 0;
  let topChart = 0;
  let htmlSongAll = "";
  htmlSong += songTOP5.map((song, index) => {
    if (index == 0) {
      let namef = getSongById(songTOP5, song.id, "name");
      let img = getSongById(songTOP5, song.id, "img");
      let time = getSongById(songTOP5, song.id, "time");
      let src = getSongById(songTOP5, song.id, "src");
      let singer = getSingerById(
        singers,
        songsWithSingerst(songSinger, song.id),
        "name"
      );
      rederPlayer(img, namef, singer, time, src, {
        idSong: song.id,
        idSinger: songsWithSingerst(songSinger, song.id),
        idPlaylist: getPlayistbyIdSong(songPlaylist, song.id, "id_playlist"),
        index: index,
        toppic: "top5",
      });
    }
    totalViews += song.view;
    return `
      <div data-idSong="${
        song.id
      }"data-index=${index} data-toppic="top5" data-idSinger="${songsWithSingerst(
      songSinger,
      song.id
    )}" data-idPlaylist="${getPlayistbyIdSong(
      songPlaylist,
      song.id,
      "id_playlist"
    )}" class="content-music__item">
              <div class="music--item__left">
                <div class="music--item__info">
                  <div style="background-image: url(${getSongById(
                    songs,
                    song.id,
                    "img"
                  )});" class="item--info__box">
                    <div class="item--info__overlay">
                      <div class="item--info__animate"></div>
                      <i class="item--info__animate-icon bi bi-play-fill icon-play btn-play"></i>
                    </div>
                  </div>
                  <div class="item--info__name">
                    <h4>${getSongById(songs, song.id, "name")}</h4>
                    <div class="item--info__singer">
                    ${getSingerById(
                      singers,
                      songsWithSingerst(songSinger, song.id),
                      "name"
                    )}
                    </div>
                  </div>
                </div>
              </div>
              <div class="music--item__center player-full__right">
                <span class="music--item__time">${getSongById(
                  songs,
                  song.id,
                  "time"
                )}</span>
              </div>
              <div class="music--item__right">
                <div class="music--item__actions">
                  <div class="player__options-btn option-btn hide-on-tablet-mobile">
                    <i class="btn--icon song__icon bi bi-mic-fill"></i>
                  </div>
                  <div data-id="${
                    song.id
                  }" class="player__options-btn option-btn box--heart ${getHeartByIdSong(
      song.id
    )}">
                    <i class="btn--icon icon--heart bi bi-heart-fill i--active"></i>
                    <i class="btn--icon icon--heart bi-heart bi bi-heart-fill"></i> 
                  </div>
                  <div class="player__options-btn option-btn hide-on-tablet-mobile">
                    <i class="btn--icon bi bi-three-dots"></i>
                  </div>  
                </div>
              </div>
            </div>
      `;
  });
  htmlSongChart += songTOP5.map((song, index) => {
    topChart++;
    return `
    <div data-idsong="${
      song.id
    }" data-index="${index}" data-toppic="topchart" data-idsinger="${songsWithSingerst(
      songSinger,
      song.id
    )}" data-idplaylist="${getPlayistbyIdSong(
      songPlaylist,
      song.id,
      "id_playlist"
    )}" class="content-music__item content-music__rank">
                <div class="music--item__left">
                  <div class="music--item__rank">
                    <div class="music--rank__number">${topChart}</div>
                    <div class="music--rank__iconbox">
                      <i class="music--rank__icon bi bi-dash-lg"></i>
                  </div>
                  </div>
                  
                  <div class="music--item__info">
                    <div style="background-image: url(${getSongById(
                      songs,
                      song.id,
                      "img"
                    )});" class="item--info__box">
                      <div class="item--info__overlay">
                        <div class="item--info__animate"></div>
                        <i class="item--info__animate-icon bi bi-play-fill icon-play btn-play"></i>
                      </div>
                    </div>
                    <div class="item--info__name">
                      <h4>${getSongById(songs, song.id, "name")}</h4>
                      <div class="item--info__singer">
                      ${getSingerById(
                        singers,
                        songsWithSingerst(songSinger, song.id),
                        "name"
                      )}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="music--item__center player-full__right">
                  <span class="music--item__time">${getSongById(
                    songs,
                    song.id,
                    "time"
                  )}</span>
                </div>
                <div class="music--item__right">
                  <div class="music--item__actions">
                    <div class="player__options-btn option-btn hide-on-tablet-mobile">
                      <i class="btn--icon song__icon bi bi-mic-fill"></i>
                    </div>
                    <div class="player__options-btn option-btn box--heart box--heart-active">
                      <i class="btn--icon icon--heart bi bi-heart-fill i--active"></i>
                      <i class="btn--icon icon--heart bi-heart bi bi-heart-fill"></i> 
                    </div>
                    <div class="player__options-btn option-btn hide-on-tablet-mobile">
                      <i class="btn--icon bi bi-three-dots"></i>
                    </div>  
                  </div>
                </div>
              </div>
    `;
  });

  htmlSongAll += songs.map((song, index) => {
    if (index == 0) {
      let namef = getSongById(songTOP5, song.id, "name");
      let img = getSongById(songTOP5, song.id, "img");
      let time = getSongById(songTOP5, song.id, "time");
      let src = getSongById(songTOP5, song.id, "src");
      let singer = getSingerById(
        singers,
        songsWithSingerst(songSinger, song.id),
        "name"
      );
      rederPlayer(img, namef, singer, time, src, {
        idSong: song.id,
        idSinger: songsWithSingerst(songSinger, song.id),
        idPlaylist: getPlayistbyIdSong(songPlaylist, song.id, "id_playlist"),
        index: index,
        toppic: "top5",
      });
    }
    totalViews += song.view;
    return `
      <div data-idSong="${
        song.id
      }"data-index=${index} data-toppic="top5" data-idSinger="${songsWithSingerst(
      songSinger,
      song.id
    )}" data-idPlaylist="${getPlayistbyIdSong(
      songPlaylist,
      song.id,
      "id_playlist"
    )}" class="content-music__item">
              <div class="music--item__left">
                <div class="music--item__info">
                  <div style="background-image: url(${getSongById(
                    songs,
                    song.id,
                    "img"
                  )});" class="item--info__box">
                    <div class="item--info__overlay">
                      <div class="item--info__animate"></div>
                      <i class="item--info__animate-icon bi bi-play-fill icon-play btn-play"></i>
                    </div>
                  </div>
                  <div class="item--info__name">
                    <h4>${getSongById(songs, song.id, "name")}</h4>
                    <div class="item--info__singer">
                    ${getSingerById(
                      singers,
                      songsWithSingerst(songSinger, song.id),
                      "name"
                    )}
                    </div>
                  </div>
                </div>
              </div>
              <div class="music--item__center player-full__right">
                <span class="music--item__time">${getSongById(
                  songs,
                  song.id,
                  "time"
                )}</span>
              </div>
              <div class="music--item__right">
                <div class="music--item__actions">
                  <div class="player__options-btn option-btn hide-on-tablet-mobile">
                    <i class="btn--icon song__icon bi bi-mic-fill"></i>
                  </div>
                  <div data-id="${
                    song.id
                  }" class="player__options-btn option-btn box--heart ${getHeartByIdSong(
      song.id
    )}">
                    <i class="btn--icon icon--heart bi bi-heart-fill i--active"></i>
                    <i class="btn--icon icon--heart bi-heart bi bi-heart-fill"></i> 
                  </div>
                  <div class="player__options-btn option-btn hide-on-tablet-mobile">
                    <i class="btn--icon bi bi-three-dots"></i>
                  </div>  
                </div>
              </div>
            </div>
      `;
  });

  listSongBox.innerHTML = htmlSong;
  exploreChart.innerHTML = htmlSongChart;
  tableAll.innerHTML = htmlSongAll;

  btnTop100.addEventListener("click", function (e) {
    const songRimining = songRiminingAll(songs);
    let htmlSongRemining = "";
    htmlSongRemining += songRimining.map((song, index) => {
      topChart++;
      return `
        <div data-idsong="${
          song.id
        }" data-index="${index}" data-toppic="topchart" data-idsinger="${songsWithSingerst(
        songSinger,
        song.id
      )}" data-idplaylist="${getPlayistbyIdSong(
        songPlaylist,
        song.id,
        "id_playlist"
      )}" class="content-music__item content-music__rank">
                    <div class="music--item__left">
                      <div class="music--item__rank">
                        <div class="music--rank__number">${topChart}</div>
                        <div class="music--rank__iconbox">
                          <i class="music--rank__icon bi bi-dash-lg"></i>
                      </div>
                      </div>
                      
                      <div class="music--item__info">
                        <div style="background-image: url(${getSongById(
                          songs,
                          song.id,
                          "img"
                        )});" class="item--info__box">
                          <div class="item--info__overlay">
                            <div class="item--info__animate"></div>
                            <i class="item--info__animate-icon bi bi-play-fill icon-play btn-play"></i>
                          </div>
                        </div>
                        <div class="item--info__name">
                          <h4>${getSongById(songs, song.id, "name")}</h4>
                          <div class="item--info__singer">
                          ${getSingerById(
                            singers,
                            songsWithSingerst(songSinger, song.id),
                            "name"
                          )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="music--item__center player-full__right">
                      <span class="music--item__time">${getSongById(
                        songs,
                        song.id,
                        "time"
                      )}</span>
                    </div>
                    <div class="music--item__right">
                      <div class="music--item__actions">
                        <div class="player__options-btn option-btn hide-on-tablet-mobile">
                          <i class="btn--icon song__icon bi bi-mic-fill"></i>
                        </div>
                        <div class="player__options-btn option-btn box--heart box--heart-active">
                          <i class="btn--icon icon--heart bi bi-heart-fill i--active"></i>
                          <i class="btn--icon icon--heart bi-heart bi bi-heart-fill"></i> 
                        </div>
                        <div class="player__options-btn option-btn hide-on-tablet-mobile">
                          <i class="btn--icon bi bi-three-dots"></i>
                        </div>  
                      </div>
                    </div>
                  </div>
        `;
    });
    exploreChart.innerHTML += htmlSongRemining;
    btnTop100.classList.add("content-chart__btnTop--active");
  });

  const totalTextViews = $(".view-listsen.song");
  totalTextViews.innerHTML = `${formatLike(totalViews)} + người khác đã nghe`;
}
function getHeartByIdSong(id) {
  const arrHeart = JSON.parse(localStorage.getItem(KEY_HEART));
  let result = "box--heart-active";
  if (arrHeart) {
    if (arrHeart.length > 0) {
      const idS = arrHeart.find((idSong) => idSong == id);
      if (idS) {
        result = "";
      }
    }
  }
  return result;
}

function formatLike(likes) {
  var likeConvert = likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return likeConvert;
}
function handleRenderPlaylist({ cate, playlist }) {
  const data = [];
  let total = 0;
  const topPlaylistNumber = 2;

  cate.forEach((element) => {
    let totalLike = 0;
    let playListAll = playlist.filter((playlist, incate) => {
      return playlist.id_category == element.id;
    });
    if (playListAll.length > 0) {
      totalLike = playListAll.reduce((acc, value) => {
        return acc + value.like;
      }, 0);
      total += totalLike;
      data.push({ index: element.id, playListAll, totalLike });
    }
  });
  const dataSort = data.sort((a, b) => b.totalLike - a.totalLike);
  const PlayListTop2 = dataSort.slice(0, topPlaylistNumber);
  const playListAll = dataSort.splice(topPlaylistNumber);
  const playlistAllTab = [...PlayListTop2, ...playListAll];

  //render top playlist
  PlayListTop2.forEach((playlists) => {
    let title = `<div class="body--playlist__title row">
      <h1 class="col c-12">${getCategoryById(
        cate,
        playlists.index,
        "name"
      )}</h1>
    </div>`;
    let rowPlayList = document.createElement("div");
    rowPlayList.classList.add("body--playlist__content", "row");
    let htmltplaylist = "";
    htmltplaylist += playlists.playListAll
      .map(
        (play) => `
    <div data-cateid="${getCategoryById(
      cate,
      playlists.index,
      "id"
    )}" data-pllid="${play.id}" class="playlist-content__item col c-2 ">
            <div class="playlist-content__box">
              <div style="background-image:url(${
                play.img
              });" class="playlist-content__img">
              </div>
              <div class="playlist-content__overlay">
              <div class="overlay-icon__box">
              <div class="player__right-icon box--heart box--heart-active">
                <i class="btn--icon icon--heart bi bi-heart-fill i--active"></i>
                <i class="btn--icon icon--heart bi-heart bi bi-heart-fill"></i>
              </div>
  
              <div class="controll-btn btn--big btn-togge-pay">
              <i style="color: #fff;" class="bi bi-play-fill icon-play btn-pause icon--hover"></i>
              <div class="animate--icon"></div>
              </div>
              <div class="player__right-icon">
                <i class="btn--icon option-btn bi bi-three-dots"></i>
              </div>
  
            </div>
              </div>
            </div>
            <div class="playlist-content__name">
              ${play.title}
            </div>
          </div>
    `
      )
      .join("");
    rowPlayList.innerHTML = htmltplaylist;
    playListContent.innerHTML += title;
    playListContent.appendChild(rowPlayList);
  });
  //render playlist all
  playListAll.forEach((playlists) => {
    let title = `<div class="body--playlist__title row">
      <h1 class="col c-12">${getCategoryById(
        cate,
        playlists.index,
        "name"
      )}</h1>
    </div>`;
    let rowPlayList = document.createElement("div");
    rowPlayList.classList.add("body--playlist__content", "row");
    let htmltplaylist = "";
    htmltplaylist += playlists.playListAll
      .map(
        (play) => `
    <div data-cateid="${getCategoryById(
      cate,
      playlists.index,
      "id"
    )}" data-pllid="${play.id}" class="playlist-content__item col c-2 ">
            <div class="playlist-content__box">
              <div style="background-image:url(${
                play.img
              });" class="playlist-content__img">
              </div>
              <div class="playlist-content__overlay">
              <div class="overlay-icon__box">
              <div class="player__right-icon box--heart box--heart-active">
                <i class="btn--icon icon--heart bi bi-heart-fill i--active"></i>
                <i class="btn--icon icon--heart bi-heart bi bi-heart-fill"></i>
              </div>
  
              <div class="controll-btn btn--big btn-togge-pay">
              <i style="color: #fff;" class="bi bi-play-fill icon-play btn-pause icon--hover"></i>
              <div class="animate--icon"></div>
              </div>
              <div class="player__right-icon">
                <i class="btn--icon option-btn bi bi-three-dots"></i>
              </div>
  
            </div>
              </div>
            </div>
            <div class="playlist-content__name">
              ${play.title}
            </div>
          </div>
    `
      )
      .join("");
    rowPlayList.innerHTML = htmltplaylist;
    explorePlaylist.innerHTML += title;
    explorePlaylist.appendChild(rowPlayList);
  });

  //render playlisst all tab
  playlistAllTab.forEach((playlists) => {
    let title = `<div class="body--playlist__title row">
      <h1 class="col c-12">${getCategoryById(
        cate,
        playlists.index,
        "name"
      )}</h1>
    </div>`;
    let rowPlayList = document.createElement("div");
    rowPlayList.classList.add("body--playlist__content", "row");
    let htmltplaylist = "";
    htmltplaylist += playlists.playListAll
      .map(
        (play) => `
    <div data-cateid="${getCategoryById(
      cate,
      playlists.index,
      "id"
    )}" data-pllid="${play.id}" class="playlist-content__item col c-2 ">
            <div class="playlist-content__box">
              <div style="background-image:url(${
                play.img
              });" class="playlist-content__img">
              </div>
              <div class="playlist-content__overlay">
              <div class="overlay-icon__box">
              <div class="player__right-icon box--heart box--heart-active">
                <i class="btn--icon icon--heart bi bi-heart-fill i--active"></i>
                <i class="btn--icon icon--heart bi-heart bi bi-heart-fill"></i>
              </div>
  
              <div class="controll-btn btn--big btn-togge-pay">
              <i style="color: #fff;" class="bi bi-play-fill icon-play btn-pause icon--hover"></i>
              <div class="animate--icon"></div>
              </div>
              <div class="player__right-icon">
                <i class="btn--icon option-btn bi bi-three-dots"></i>
              </div>
  
            </div>
              </div>
            </div>
            <div class="playlist-content__name">
              ${play.title}
            </div>
          </div>
    `
      )
      .join("");
    rowPlayList.innerHTML = htmltplaylist;
    playListContentTab.innerHTML += title;
    playListContentTab.appendChild(rowPlayList);
  });
  const likes = $(".view-listsen.playlist");
  likes.innerHTML = `${formatLike(total)}+ lượt thích`;
}
function rederPlayer(url, name, singer, time, audio, idAll) {
  const playerContainer = $(".player__container");
  if (idAll) {
    playerContainer.setAttribute("data-idsong", idAll.idSong);
    playerContainer.setAttribute("data-idsinger", idAll.idSinger);
    playerContainer.setAttribute("data-idplaylist", idAll.idPlaylist);
    playerContainer.setAttribute("data-index", idAll.index);
    playerContainer.setAttribute("data-toppic", idAll.toppic);
  }
  const img = $(".player-container__img");
  const names = $$(".player-animate__name");
  const singers = $(".player-singer");
  const times = $(".durationtime");
  img.style.backgroundImage = "url(" + url + ")";
  names[0].innerHTML = name;
  names[1].innerHTML = name;
  singers.innerHTML = singer;
  times.innerHTML = time;
  audios.src = `./music/${audio}`;
}

function getSingerTop5(singers) {
  const singerTop = singers.sort((a, b) => b.folow - a.folow);
  const singerTop5 = singerTop.slice(0, 5);
  const singerRimining = singerTop.slice(5);
  return {
    singerTop5,
    singerRimining,
  };
}
function getFolowbyIdSinger(dataUser, idSinger) {
  const idUser = document.querySelector(".content-user__name").dataset.id;
  if (idUser) {
    const userSeach = dataUser.find((user) => user.id == idUser);
    const arrArray = userSeach.about;
    const idSearch = arrArray.find((idUser) => idUser == idSinger);
    if (idSearch) {
      return `<button data-id ="${idSinger}" class="singer-follow__btn singer-follow__btn--active"><i class="bi bi-person-check-fill"></i> Đã Quan Tâm</button>`;
    } else {
      return `<button onclick=handleFolowerBtn(${idSinger}) data-id ="${idSinger}" class="singer-follow__btn"><QUAN class="bi bi-person-plus-fill"> QUAN TÂM</button>`;
    }
  } else {
    return `<button onclick=handleNoAccount() data-id ="${idSinger}" class="singer-follow__btn"><QUAN class="bi bi-person-plus-fill"> QUAN TÂM</button>`;
  }
}
//handle render singers all
async function handleRenderSinger(singers) {
  const { singerTop5, singerRimining } = getSingerTop5(singers);
  let totalFollower = 0;
  let htmlSingerTop5 = "";
  let htmlSinger = "";
  const dataUser = await getData(apiUrlUser);
  totalFollower = singerTop5.reduce(function (curr, item) {
    return curr + parseInt(item.folow);
  }, 0);
  document.querySelector(".view-follow__singer").innerHTML = `${formatFolow(
    totalFollower
  )}+ người quan tâm`;

  htmlSingerTop5 = singerTop5.map((item) => {
    return `<div class="singer--tab__item col c-2">
    <div class="singer-item__img">
      <div style="background-image:url(${
        item.img
      });" class="singer-img__item"></div>
      <div class="singer-img__overlay"></div>
    </div>
    <div class="singer-item__info">
      <a onclick=handleInfoSinger(${
        item.id
      }) class="singer-info__name" href="#">${
      item.name
    }<i class="bi bi-star-fill"></i> </a>
      <span class="singer-info__follow"><span class="people-flower" data-id="${
        item.id
      }">${formatFolow(parseInt(item.folow))}</span> người quan tâm</span>
    </div>
    <div class="singer-item__follow">
      ${getFolowbyIdSinger(dataUser, item.id)}
    </div>
  </div>`;
  });
  htmlSinger = singerRimining.map((item) => {
    return `<div class="singer--tab__item col c-2">
    <div class="singer-item__img">
      <div style="background-image:url(${
        item.img
      });" class="singer-img__item"></div>
      <div class="singer-img__overlay"></div>
    </div>
    <div class="singer-item__info">
      <a onclick=handleInfoSinger(${
        item.id
      }) class="singer-info__name" href="#">${
      item.name
    }<i class="bi bi-star-fill"></i> </a>
      <span class="singer-info__follow"><span class="people-flower" data-id="${
        item.id
      }">${formatFolow(parseInt(item.folow))}</span> người quan tâm</span>
    </div>
    <div class="singer-item__follow">
    ${getFolowbyIdSinger(dataUser, item.id)}
    </div>
  </div>`;
  });

  singerContentTab.innerHTML = htmlSingerTop5.join("");
  singerContentTabAll.innerHTML = htmlSinger.join("");
}
function formatFolow(folow) {
  const formattedNumber = folow.toLocaleString("en-US");
  const formattedNumberWithDot = formattedNumber.replace(/,/g, ".");
  return formattedNumberWithDot;
}

function aniPlayAll() {
  ani.play();
  aniThumb.play();
}
function anitPause() {
  aniThumb.pause();
}

function handlePlayingSong(songs, singers, song) {
  let singerList = [];
  let idSong = parseInt(song.dataset.idsong);
  let idSinger = parseInt(song.dataset.idsinger);
  let idPlaylist = parseInt(song.dataset.idplaylist);
  let index = parseInt(song.dataset.index);
  let toppic = song.dataset.toppic;
  const idAll = {
    idSong,
    idSinger,
    idPlaylist,
    index,
    toppic,
  };
  const songActive = $(".content-music__item.content-music__item--active");
  if (songActive) {
    songActive.classList.remove("content-music__item--active");
  }
  song.classList.add("content-music__item--active");
  songActiveInToView(song);
  if (song.dataset.idsinger.length > 1) {
    const stringArray = song.dataset.idsinger.split(",");
    let numberArray = stringArray.map((item) => parseFloat(item));
    singerList = numberArray;
  } else {
    singerList.push(parseInt(song.dataset.idsinger));
  }
  let name = getSongById(songs, idSong, "name");
  let img = getSongById(songs, idSong, "img");
  let src = getSongById(songs, idSong, "src");
  let time = getSongById(songs, idSong, "time");
  let singer = getSingerById(singers, singerList, "name");
  rederPlayer(img, name, singer, time, src, idAll);
  audios.play();
  btnTogglePlay.classList.add("playing");
  isPlaying = true;
  aniPlayAll();
}
function handlePlaySong({ songs, singers, songSinger }) {
  const songItems = $$(".content-music__item");
  songItems.forEach((song) => {
    song.addEventListener("click", function (e) {
      if (e.target.classList.contains("btn-play")) {
        handlePlayingSong(songs, singers, song);
      }
    });
  });
}

function convertSecondsToMinutes(seconds) {
  var minute = Math.floor(seconds / 60);
  var second = seconds % 60;
  minute = minute < 10 ? "0" + minute : minute;
  second = parseFloat(second).toFixed(0);
  second = second < 10 ? "0" + second : second;
  return minute + ":" + second;
}
function loadConfig() {
  isRandom = config.isRandom;
  isRepeat = config.isRepeat;
  $(".bi-shuffle").parentElement.classList.toggle(
    "controll-btn--active--random",
    isRandom
  );
  $(".bi-arrow-repeat").parentElement.classList.toggle(
    "controll-btn--active--repeating",
    isRepeat
  );
  $(".progress--main--isBig").value = config.isVolume;
  const preSentVolume = (config.isVolume * 100) / 1;
  trackVolume.style.width = preSentVolume + "%";
  console.log();
  progressTrack.style.width = config.timeSong + "%";
  inputRange.value = config.timeSong;
  tracktime.innerHTML = convertSecondsToMinutes(config.timeSong);
}

async function handleRender() {
  loadConfig();

  //lấy dữ liệu từ api(cate,playlist)
  const data = await handleCatePlayList();

  const songSinger = await handleGetSongs();
  //xử lý và render ra giao diện
  handleRenderPlaylist(data);

  //sử lý và render bài hát ra giao diện
  handleRenderSongViews(songSinger);
  //sử lý và render ca sỹ ra giao diện
  const singers = await getData(apiUrlSinger);
  handleRenderSinger(singers);

  handleEventBoxList(data, songSinger);
  //xử lý click nút play bài hát
  handleActionsSong(songSinger);
  handlePlaySong(songSinger);
  //xử lý sự kiện click
}

function handleTogglePaySong() {
  btnTogglePlay.onclick = () => {
    let activeSongs = $(".content-music__item.content-music__item--active");
    if (isPlaying) {
      audios.pause();
      anitPause();
      if (activeSongs) {
        activeSongs.classList.add("active--pause");
      }
    } else {
      audios.play();
      aniPlayAll();
      if (activeSongs) {
        activeSongs.classList.remove("active--pause");
      } else {
        const index = $(".player__container").dataset.index;
        let activeSongs = $(`.content-music__item[data-index='${index}']`);

        activeSongs.classList.add("content-music__item--active");
      }
    }
  };
}
function handleEvent() {
  //xử lý click nút play bài hát
  handleTogglePaySong();
  eventPlayerContainer();
}

function eventPlayerContainer() {
  const player = $(".player__container");
  player.addEventListener("click", (e) => {
    if (e.target.classList.contains("player__container")) {
      handleFullPlayer();
    }
  });
}

function playRandomSong(songs, songIndex) {
  let index;
  do {
    index = Math.floor(Math.random() * songs.length);
  } while (songIndex == index);
  return index;
}

let myVariable = 0;
let intervalId;
async function handleViewChange(songs, id) {
  const song = getSongById(songs, id, "all");
  const like = song.like;
  const name = song.name;
  const img = song.img;
  const src = song.src;
  const view = song.view + 1;
  const time = song.time;
  const data = { name, img, src, view, like, time };
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  await fetch(apiUrlSong + "/" + id, options);
}
function startSong(total, songs, id) {
  intervalId = setInterval(() => {
    myVariable++;
    if (myVariable == total) {
      clearInterval(intervalId);
      handleViewChange(songs, id);
    }
  }, 1000); //
}

function pauseSong() {
  clearInterval(intervalId);
}
function convertToSeconds(minutes, seconds) {
  const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
  return totalSeconds;
}
function handleActionsSong({ songs, singers, songSinger }) {
  //toggle heart
  const boxHeart = $$(".box--heart");
  boxHeart.forEach((btn) => {
    btn.addEventListener("click", async function (e) {
      if (e.target.closest(".box--heart")) {
        if (e.target.classList.contains("btn--icon")) {
          e.target.parentElement.classList.toggle("box--heart-active");
          const arrHeart = JSON.parse(localStorage.getItem(KEY_HEART)) || [];
          const id = parseInt(e.target.parentElement.dataset.id);

          if (!e.target.parentElement.classList.contains("box--heart-active")) {
            const song = getSongById(songs, id, "all");
            const like = song.like + 1;
            const name = song.name;
            const img = song.img;
            const src = song.src;
            const view = song.view;
            const time = song.time;
            const data = { name, img, src, view, like, time };
            const options = {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            };
            const responseSongPlayList = await fetch(
              apiUrlSong + "/" + id,
              options
            );
          }

          if (arrHeart.length > 0) {
            const idHeart = arrHeart.find((idSong) => idSong === id);
            if (!idHeart) {
              arrHeart.push(id);
            }
          } else {
            arrHeart.push(id);
          }
          localStorage.setItem(KEY_HEART, JSON.stringify(arrHeart));
        }
      }
    });
  });

  //when songs playing'
  audios.onplay = function () {
    isPlaying = true;
    btnTogglePlay.classList.add("playing");
    const timeString = $(".durationtime").innerHTML;
    const [minutes, seconds] = timeString.split(":");
    const totalSecondSong = convertToSeconds(minutes, seconds) / 2;
    const id = parseInt($(".player__container").dataset.idsong);
    startSong(totalSecondSong, songs, id);
  };
  //when songs paused
  audios.onpause = function () {
    isPlaying = false;
    btnTogglePlay.classList.remove("playing");
    pauseSong();
  };

  // handle input range
  inputRange.onchange = (e) => {
    const track = e.target.nextElementSibling;
    const persent = (e.target.value / 100) * 100;
    track.style.width = persent + "%";
    const seekTime = (audios.duration / 100) * e.target.value;
    audios.currentTime = seekTime;
  };
  //song onended
  audios.onended = () => {
    const btnRepeat = $(".controll-btn--active--repeating");
    if (btnRepeat) {
      let songIndex = $(".player__container").dataset.index;
      let song = $(`.content-music__item[data-index='${songIndex}']`);
      handlePlayingSong(songs, singers, song);
    } else {
      btnNext.click();
    }
  };

  //next songs
  btnNext.onclick = function () {
    let songToppic = $(".player__container").dataset.toppic;
    let songIndex = $(".player__container").dataset.index;
    const btnrandom1 = $(".controll-btn--active--random");
    if (songToppic == "top5") {
      let songTop51 = songTop5(songs);
      if (btnrandom1) {
        songIndex = playRandomSong(songTop51, songIndex);
      } else {
        songIndex++;
        if (songIndex > songTop51.length - 1) {
          songIndex = 0;
        }
      }
      let song = $(
        `.content-music__item[data-index='${songIndex}'][data-toppic='top5']`
      );
      handlePlayingSong(songTop51, singers, song);
    }
  };

  //pre songs
  btnPrev.onclick = function () {
    let songToppic = $(".player__container").dataset.toppic;
    let songIndex = $(".player__container").dataset.index;
    const btnrandom1 = $(".controll-btn--active--random");
    if (songToppic == "top5") {
      let songTop51 = songTop5(songs);
      if (btnrandom1) {
        songIndex = playRandomSong(songTop51, songIndex);
      } else {
        songIndex--;
        if (songIndex < 0) {
          songIndex = songTop51.length - 1;
        }
      }
      let song = $(
        `.content-music__item[data-index='${songIndex}'][data-toppic='top5']`
      );
      handlePlayingSong(songTop51, singers, song);
    }
  };

  //songs time change
  audios.ontimeupdate = function () {
    const persentTime = (audios.currentTime / audios.duration) * 100;
    if (persentTime) {
      console.log(persentTime.toFixed(0));
      setConfig("timeSong", persentTime.toFixed(0));
      progressTrack.style.width = persentTime.toFixed(0) + "%";
      inputRange.value = persentTime.toFixed(0);
      tracktime.innerHTML = convertSecondsToMinutes(audios.currentTime);
    }
  };

  // btn random songs
  const btnRandom = $(".bi.bi-shuffle");
  btnRandom.addEventListener("click", (e) => {
    if (e.target.classList.contains("bi")) {
      isRandom = !isRandom;
      setConfig("isRandom", isRandom);
      e.target.parentElement.classList.toggle(
        "controll-btn--active--random",
        isRandom
      );
    }
  });
  // btn repeat songs
  const btnRepeat = $(".bi.bi-arrow-repeat");
  btnRepeat.addEventListener("click", (e) => {
    if (e.target.classList.contains("bi")) {
      isRepeat = !isRepeat;
      setConfig("isRepeat", isRepeat);
      e.target.parentElement.classList.toggle(
        "controll-btn--active--repeating",
        isRepeat
      );
    }
  });
  // progress volume

  inputVolume.onchange = (e) => {
    const preSentVolume = (e.target.value * 100) / 1;
    trackVolume.style.width = preSentVolume + "%";
    audios.volume = e.target.value;
    setConfig("isVolume", e.target.value);
    if (preSentVolume == 0) {
      $(".bi.bi-volume-up.btn--icon").classList.replace(
        "bi-volume-up",
        "bi-volume-mute"
      );
    } else {
      if ($(".bi.bi-volume-mute.btn--icon")) {
        $(".bi.bi-volume-mute.btn--icon").classList.replace(
          "bi-volume-mute",
          "bi-volume-up"
        );
      }
    }
  };

  const btnVolume = $(".btn--volume");
  btnVolume.onclick = function (e) {
    if (e.target.classList.contains("bi-volume-up")) {
      e.target.classList.replace("bi-volume-up", "bi-volume-mute");
      trackVolume.style.width = 0 + "%";
      inputVolume.value = 0;
      audios.volume = 0;
    } else {
      e.target.classList.replace("bi-volume-mute", "bi-volume-up");
      trackVolume.style.width = 50 + "%";
      inputVolume.value = 0.5;
      audios.volume = 0.5;
    }
  };
}

const app = {
  renderUI() {
    handleRender();
  },
  handleEvent() {
    handleEvent();
  },
  init() {
    this.renderUI();
    this.handleEvent();
  },
  start() {
    this.init();
  },
};
app.start();
