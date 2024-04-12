export async function handleGetUsers() {
  try {
    const users = await getAPI("users");
    return users;
  } catch (error) {
    console.error("Error:", error);
  }
}
export function getUrlApi(param) {
  return `https://music-api-2c07.onrender.com/${param}`;
}
const userAPI = getUrlApi("users");
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const imgSignUp = $("#image_url");
const userNameSingup = $(".su-username");
const passwordSingup = $(".su-password");
const emailSingup = $(".su-email");
const btnSignUp = $(".btn-signup");
const formSignUp = $("#formSignUp");
const formSignIn = $("#formSignIn");

const userNameSingIn = $(".si-username");
const passwordSingIn = $(".si-passworld");
const img = $(".content-user__img");
const name = $(".content-user__name");
const box_noUser = $(".content-no-user");
const box_User = $(".content-user");
const imgHeader = $(".header__nav-img-item");
const modalDowload = $(".app__modal-dowload");
const btnDowload = $(".btn-dowload");
const btnLogout = $(".btn-logout ");

const KEY_ACCOUNT = "user";

function handleSignUp() {
  formSignUp.addEventListener("submit", function (e) {
    e.preventDefault();
    if (
      userNameSingup !== "" &&
      imgSignUp !== "" &&
      emailSingup !== "" &&
      passwordSingup !== ""
    ) {
      const username = userNameSingup.value.trim();
      const img = imgSignUp.value.trim();
      const email = emailSingup.value.trim();
      const password = passwordSingup.value.trim();
      const dowload = [];
      const about = [];
      const active = true;
      const data = { username, img, email, password, dowload, about, active };
      handleAddUser(data, function (res) {
        showSuccsecToast();
        userNameSingup.value = "";
        imgSignUp.value = "";
        emailSingup.value = "";
        passwordSingup.value = "";

        const boxSignIn = $(".account-signIn");
        const boxSignUp = $(".account-signup");
        boxSignUp.classList.add("hide-item");
        boxSignIn.classList.remove("hide-item");
      });
    }
  });
}
async function handleAddUser(data, callback) {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(userAPI, options);
  const resData = await response.json();
  callback(resData);
}
function handleSignIn(data) {
  formSignIn.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = userNameSingIn.value.trim();
    const password = passwordSingIn.value.trim();
    const itemCheck = handleCheckLogin(data, username, password);
    if (username === "admin" && password === "123") {
      window.location.href = "../../admin/";
    } else {
      if (itemCheck.length > 0) {
        console.log(itemCheck);
        localStorage.setItem(KEY_ACCOUNT, JSON.stringify(itemCheck[0]));
        showSuccsecLoginToast();
        const modalSignIn = $(".app__modal-account");
        setTimeout(function () {
          modalSignIn.classList.add("hide-item");
          btnLogout.classList.remove("hide-item");
        }, 2200);
        setTimeout(function () {
          img.src = itemCheck[0].img;
          imgHeader.src = itemCheck[0].img;
          name.innerHTML = itemCheck[0].username;
          name.setAttribute("data-id", itemCheck[0].id);
          box_noUser.classList.add("hide-item");
          box_User.classList.remove("hide-item");
        }, 1500);
      } else {
        showErrorToast();
      }
    }
  });
}
function handleCheckLogin(data, username, password) {
  const item = data.filter((item) => {
    return item.username === username && item.password === password;
  });
  return item;
}
async function getData() {
  const data = await handleGetUsers();
  return data;
}
function init() {
  const user = JSON.parse(localStorage.getItem(KEY_ACCOUNT));
  if (user) {
    box_noUser.classList.add("hide-item");
    box_User.classList.remove("hide-item");
    img.src = user.img;
    imgHeader.src = user.img;
    name.innerHTML = user.username;
    name.setAttribute("data-id", user.id);
    btnLogout.classList.remove("hide-item");
  }
}
//handle click btnlogout
btnLogout.addEventListener("click", function (e) {
  const modalLogout = $(".app__modal-logout");
  setTimeout(function () {
    modalLogout.classList.remove("hide-item");
  }, 200);
  modalLogout.addEventListener("click", function (e) {
    if (e.target.classList.contains("app__modal-logout")) {
      modalLogout.classList.add("hide-item");
    }
  });
});

//handle logout
function handleLogout() {
  const btnConfirmLogout = $(".btn-confirm-logout");
  const btnCancelLogout = $(".btn-close-logout");
  const boxModalLogout = $(".app__modal-logout");
  btnConfirmLogout.addEventListener("click", function () {
    setTimeout(function () {
      box_noUser.classList.remove("hide-item");
      box_User.classList.add("hide-item");
      btnLogout.classList.add("hide-item");
    }, 3000);
    const user = JSON.parse(localStorage.getItem(KEY_ACCOUNT));
    if (user) {
      localStorage.removeItem(KEY_ACCOUNT);
    }
    setTimeout(function () {
      boxModalLogout.classList.add("hide-item");
      imgHeader.src =
        "https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg";
    }, 3000);
  });
  btnCancelLogout.addEventListener("click", function () {
    boxModalLogout.classList.add("hide-item");
  });
}

function handleSongDownload() {
  btnDowload.addEventListener("click", function (e) {
    modalDowload.classList.remove("hide-item");
    modalDowload.addEventListener("click", (e) => {
      if (e.target.classList.contains("app__modal-dowload")) {
        modalDowload.classList.add("hide-item");
      }
    });
  });
}
// //handle dowload song user
(async function start() {
  const data = await getData();
  handleSignUp();
  handleSignIn(data);
  handleLogout();
  handleSongDownload();
  init();
})();
