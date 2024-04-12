import { listThemes } from "./listThemes.js";

const btnTheme = document.querySelector(".btn-theme");
const modalTheme = document.querySelector(".app__modal-theme");
const btnTab = document.querySelectorAll(".sidebar-tab__items");
const btnsTabNav = document.querySelectorAll('.content-navbar__item');
const themeContent = document.querySelector(".modal-box__content");
const KEY_THEME = "KEY_THEME";
const eldoc = document.documentElement.style;

if (localStorage.getItem(KEY_THEME) !== null) {
  let themeLocal = JSON.parse(localStorage.getItem(KEY_THEME))
  changeThemes(themeLocal)
}else{
  document.querySelector('#app').style.backgroundImage ='url(./images/themes/large/theme1.jpg)';
  document.querySelector('.player__full').style.backgroundImage ='url(./images/themes/large/theme1.jpg)';
  eldoc.setProperty("--primary-color-modal",'#061d50' )
  eldoc.setProperty("--primary-color",'#061d50' )
  eldoc.setProperty("--primary-color-tab",'#3460f5' )
  eldoc.setProperty("--primary-color-tab-active",'#ffffff1a' )
  eldoc.setProperty("--primary-purple",'#3d4b75' )
  eldoc.setProperty("--primary-color-scrollbar",'#3460f5' )
  eldoc.setProperty("--primary-text-color-w",'#fff' )
  eldoc.setProperty("--btn-apply-color",'#3460f5' )

}

//handles modal themes(togge themes)
btnTheme.addEventListener("click", (e) => {
  modalTheme.classList.remove("hide-item");
});
modalTheme.addEventListener("click", (e) => {
  const el = e.target;
  if (
    el.classList.contains("app__modal-theme") ||
    el.classList.contains("modal-box__close") ||
    el.classList.contains("modal-box__close-icon")
  ) {
    modalTheme.classList.add("hide-item");
  }
});
//handle tab
btnTab.forEach(function (btn) {
  btn.addEventListener("click", (e) => {
    let el = e.target.closest(".sidebar-tab__items");
    let idtab = el.dataset.tab;
    if (el && idtab) {
      const itemTab = document.querySelector(".container-content.show-item");
      if (idtab !== itemTab.dataset.itemstab) {
        document
          .querySelector(".sidebar-tab__items.sidebar-tab__items--active")
          .classList.remove("sidebar-tab__items--active");
        el.classList.add("sidebar-tab__items--active");

        itemTab.classList.remove("show-item");
        document
          .querySelector(`.container-content[data-itemstab='${idtab}']`)
          .classList.add("show-item");
      }
    }
  });
});
//handle themes(render and handle events)
//handle views themes
listThemes.forEach((theme, id) => {
  let rowThemes = document.createElement("div");
  rowThemes.classList.add("box-content__list", "row");
  let toppics = `<div class="content-title">
  <h2>${theme.type}</h2>
</div>`;
  let arrThemes = theme.themes;
  toppics += arrThemes
    .map(
      (theme, index) => `<div class="box-content__item col l-2">
  <div class="box-item">
    <div style="background-image:${theme.image};" class="box-item__img">
      <div class="over__lay">
        <div class="box-item_btn">
          <button data-idToppics="${id}" data-idThemes="${index}" class="box-item__apply box-btn">ÁP DỤNG</button>
          <button data-idToppics="${id}" data-idThemes="${index}" class="box-item__view box-btn">
            XEM TRƯỚC
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="box-item__info">
    <h1>${theme.name}</h1>
  </div>
</div>`
    )
    .join("");
  rowThemes.innerHTML = toppics;
  themeContent.appendChild(rowThemes);
});
//handle events (btnview and btn apllyView)
const btnViews = document.querySelectorAll(".box-item__view");
const btnApplys = document.querySelectorAll(".box-item__apply");

function handleEvents(btns, actions, callback) {
  btns.forEach((btn) => {
    switch (actions) {
      case "view":
        btn.addEventListener("click", callback);
        break;
      case "apply":
        btn.addEventListener("click", callback);
        break;
    }
  });
}
function obt(
  bg,
  color_modal,
  color,
  color_tab,
  color_tab_active,
  purple,
  scrollbar,
  text_color,
  btn_color,
  shadow_color,
  bg_input,
  bg_player
) {
  return {
    bg,
    color_modal,
    color,
    color_tab,
    color_tab_active,
    purple,
    scrollbar,
    text_color,
    btn_color,
    shadow_color,
    bg_input,
    bg_player,
  };
}
function handleModalTheme(e,type){
  const idToppics = e.target.dataset.idtoppics;
  const idthemes = e.target.dataset.idthemes;
  let theme;
  let themeStore;
  if (idToppics == "0") {
    switch (idthemes) {
      case "0":
        theme=obt(
          "url(./images/themeBgs/listTheme1/theme1.svg)",
          "#6a39af",
          "#37075d",
          "#fff",
          "#ffffff1a",
          "#452a6f",
          "#fff",
          "#fff",
          "#ed2b91",
          "rgba(255,255,255,0.05)",
          "#ffffff1a",
          "url(./images/themeBgs/listTheme1/playerThemes/theme1.png)"
        )
        changeThemes(
          theme
        );
        themeStore=theme;
        console.log(theme);
        break;
      case "1":
        theme = obt(
          "url(./images/themeBgs/listTheme1/theme2.jpg)",
          "#3d3d3d",
          "#282828",
          "#fff",
          "#ffffff1a",
          "#313233",
          "#fff",
          "#fff",
          "#7200a1",
          "#282828",
          "#ffffff1a",
        )
        changeThemes(
          theme
        );
        themeStore=theme;
        console.log(theme);
        break;
    }
  } else if (idToppics == "1") {
    switch (idthemes) {
      case "0":
        theme = obt(
          "url(./images/themes/large/theme1.jpg)",
          "#061d50",
          "#061d50",
          "#fff",
          "#ffffff1a",
          "#3d4b75",
          "#fff",
          "#fff",
          "#3460f5",
          "#061d50",
          "hsla(0, 0%, 100%, 0.1)"
        )
        changeThemes(
          theme
        );
        themeStore=theme;
        break;
      case "1":
        theme = obt(
          "url(./images/themes/large/theme2.jpg)",
          "#fffffe",
          "#e7dfdd",
          "#409abc",
          "rgba(0,0,0,0.05)",
          "#ededed",
          "#409abc",
          "#32323d",
          "#409abc",
          "#E8E2D1",
          "rgba(0,0,0,0.05)"
        )
        changeThemes(
          theme
        );
        themeStore=theme;
        break;
      case "2":
        theme = obt(
          "url(./images/themes/large/theme3.jpg)",
          "#e1e8e8",
          "#b2d8db",
          "#409abc",
          "#ffffff1a",
          "#c4e5e7",
          "#239292",
          "#32323d",
          "#239292",
          "#B6DEDB",
          "#ffffff4d"
        )
        changeThemes(
          theme
        );
        themeStore=theme;
        break;
      case "3":
        theme = obt(
          "url(./images/themes/large/theme4.jpg)",
          "#fff8f8",
          "#f9dbdb",
          "#409abc",
          "rgba(0,0,0,0.05)",
          "#f6d0d7",
          "#ea7aa0",
          "#32323d",
          "#ea7aa0",
          "#fbd3d2",
          "rgba(0,0,0,0.05)"
        )
        changeThemes(
         theme
        );
        themeStore=theme;
        break;
      case "4":
        theme = obt(
          "url(./images/themes/large/theme5.jpg)",
          "#CFD7FA",
          "#bab8c3",
          "#346875",
          "#ffffff1a",
          "#cecece",
          "#346875",
          "#383A4F",
          "#383A4F",
          "#C6C1D9",
          "rgba(0,0,0,0.05)"
        )
        changeThemes(
          theme
        );
        themeStore=theme;
        break;
      case "5":
        theme =obt(
          "url(./images/themes/large/theme6.jpg)",
          "#fff",
          "#fff",
          "#6b3483",
          "rgba(0,0,0,0.05)",
          "#ededed",
          "#383A4F",
          "#32323d",
          "#409abc",
          "rgba(0,0,0,0.05)",
          "rgba(0,0,0,0.05)"
        )
        changeThemes(
          theme
        );
        themeStore=theme;
        break;
    }
  } else if (idToppics == "2") {
    switch (idthemes) {
      case "0":
        theme =obt(
          "#1e1e1e",
          "#282828",
          "#1e1e1e",
          "#fff",
          "#ffffff1a",
          "#383939",
          "#d9d9d9",
          "#fff",
          "#7200a1",
          "#1e1e1e"
        )
        changeThemes(
          theme
        );
        themeStore=theme;
        break;
      case "1":
        theme =obt(
          "#170F23",
          "#4B2682",
          "#170F23",
          "#fff",
          "#ffffff1a",
          "rgba(0,0,0,0.07)",
          "#383A4F",
          "#fff",
          "#7200a1",
          "#170F23"
        )
        changeThemes(
          theme
        );
        themeStore=theme;
        break;
      case "2":
        theme = obt(
          "#101f3f",
          "#1D366E",
          "#101f3f",
          "#fff",
          "#ffffff1a",
          "rgba(0,0,0,0.07)",
          "#383A4F",
          "#fff",
          "#7200a1",
          "#101f3f"
        )
        changeThemes(
          theme
        );
        themeStore=theme;
        break;
      case "3":
        theme =obt(
          "#1d375a",
          "#274A78",
          "#1d375a",
          "#fff",
          "#ffffff1a",
          "rgba(0,0,0,0.07)",
          "#5F7A87",
          "#fff",
          "#3460f5",
          "#1d375a"
        )
        changeThemes(
          theme
        );
        themeStore=theme;
        break;
      case "4":
        theme = obt(
          "#124534",
          "#126e54",
          "#124534",
          "#fff",
          "#ffffff1a",
          "rgba(0,0,0,0.07)",
          "#5F7A87",
          "#fff",
          "#309785",
          "#124534"
        )
        changeThemes(
          theme
        );
        themeStore=theme;
        break;
      case "5":
        theme = obt(
          "#57403b",
          "#6f514c",
          "#57403b",
          "#fff",
          "#ffffff1a",
          "rgba(0,0,0,0.07)",
          "#986d5c",
          "#fff",
          "#986d5c",
          "#57403b"
        )
        changeThemes(
         theme
        );
        themeStore=theme;
        break;
      case "6":
        theme = obt(
          "#800064",
          "#800064",
          "#800064",
          "#fff",
          "#ffffff1a",
          "rgba(0,0,0,0.07)",
          "#986d5c",
          "#fff",
          "#ed2b91",
          "#800064"
        )
        changeThemes(
         theme
        );
        themeStore=theme;
        break;
      case "7":
        theme = obt(
          "#731717",
          "#731717",
          "#731717",
          "#fff",
          "#ffffff1a",
          "#853b3b",
          "#986d5c",
          "#fff",
          "#DE2F2F",
          "#731717"
        )
        changeThemes(
          theme
        );
        themeStore=theme;
        break;
    }
  } else if (idToppics == "3") {
    switch (idthemes) {
      case "0":
        theme = obt(
          "#fff",
          "#fff",
          "#fff",
          "#6b3483",
          "#ffffff1a",
          "#e7e7e7",
          "#948675",
          "#32323d",
          "#837C7A",
          "#fff",
          "#F8F5F6"
        )
        changeThemes(
         theme
        );
        themeStore=theme;
        break;
      case "1":
        theme =obt(
          "#e5e3df",
          "#e5e3df",
          "#e5e3df",
          "#6b3483",
          "#ffffff1a",
          "rgb(216 216 216)",
          "#948675",
          "#32323d",
          "#837C7A",
          "#e5e3df",
          "#D1C7B8"
        )
        changeThemes(
          theme
        );
        themeStore=theme;
        break;
      case "2":
        theme = obt(
          "#e1e8e8",
          "#e1e8e8",
          "#e1e8e8",
          "#6b3483",
          "#ffffff1a",
          "#fff",
          "#948675",
          "#32323d",
          "#837C7A",
          "#e1e8e8",
          "#B8C0CF"
        )
        changeThemes(
          theme
        );
        themeStore=theme;
        break;
      case "3":
        theme = obt(
          "#fff8f8",
          "#fff8f8",
          "#fff8f8",
          "#EA7AA0",
          "#ffffff1a",
          "#e7e7e7",
          "#948675",
          "#32323d",
          "#837C7A",
          "#fff8f8",
          "#FFF4E8"
        )
        changeThemes(
         theme
        );
        themeStore=theme;
        break;
    }
  }
  if(type){
    localStorage.setItem(KEY_THEME,JSON.stringify(themeStore));
  }
}
function handleView(e) {
  handleModalTheme(e);
}
function handleApply(e) {
  modalTheme.classList.add("hide-item");
  handleModalTheme(e,"btnApply");
}
function changeThemes({
  bg,
  color_modal,
  color,
  color_tab,
  color_tab_active,
  purple,
  scrollbar,
  text_color,
  btn_color,
  shadow_color,
  bg_input,
  bg_player,
}) {
  const app = document.querySelector("#app");
  const playerfull = document.querySelector(".player__full");
  const player = document.querySelector(".player__container");
  const boxInput = document.querySelector(".box--input");
  const boxIcons = document.querySelectorAll(".header__nav-box");

  if (bg.length > 15) {
    app.style.backgroundImage = bg;
    playerfull.style.backgroundImage = bg;
  } else {
    app.style.backgroundImage = "none";
    app.style.backgroundColor = bg;

    playerfull.style.backgroundImage = "none";
    playerfull.style.backgroundColor = bg;
  }

  if (shadow_color) {
    const playerContainer = document.querySelector(".player__container");
    playerContainer.style.backgroundColor = shadow_color;
  }

  bg_player
    ? (player.style.backgroundImage = bg_player)
    : (player.style.backgroundImage = "none");

  if (bg_input) {
    boxInput.style.backgroundColor = bg_input;
    boxIcons.forEach((btn) => {
      btn.style.backgroundColor = bg_input;
    });
  } else {
    boxInput.style.backgroundColor = "none";
    boxIcons.forEach((btn) => {
      btn.style.backgroundColor = "hsla(0, 0%, 100%, 0.1)";
    });
  }
  eldoc.setProperty("--primary-color-modal", `${color_modal}`);
  eldoc.setProperty("--primary-color", `${color}`);
  eldoc.setProperty("--primary-color-tab", `${color_tab}`);
  eldoc.setProperty("--primary-color-tab-active", `${color_tab_active}`);
  eldoc.setProperty("--primary-purple", `${purple}`);
  eldoc.setProperty("--primary-color-scrollbar", `${scrollbar}`);
  eldoc.setProperty("--primary-text-color-w", `${text_color}`);
  eldoc.setProperty("--btn-apply-color", `${btn_color}`);
}
handleEvents(btnViews,"view", handleView);
handleEvents(btnApplys, "apply", handleApply);


btnsTabNav.forEach(btn=>{
  btn.addEventListener("click",function(e){
    let el = e.target.closest(".content-navbar__item");
    let idtab = el.dataset.nbtab;
    if (el && idtab) {
      const itemTab = document.querySelector(".content-body1.show-item");
      if (idtab !== itemTab.dataset.itemstab) {
        document
          .querySelector(".content-navbar__item.content-navbar__item--active")
          .classList.remove("content-navbar__item--active");
        el.classList.add("content-navbar__item--active");

        itemTab.classList.remove("show-item");
        document
          .querySelector(`.content-body1[data-bdtab='${idtab}']`)
          .classList.add("show-item");
      }
    }
  })
})




