export const state = () => ({
  // Информация
  userInfo: null,
})

export const getters = {
  // Информация пользователя
  getUserInfo: state => state.userInfo || {},

  // Авторизован ли пользователь
  isAuth: state => !!state.userInfo,

  getUserAuth: state => ({username: state.userInfo?.username, password: state.userInfo?.password})
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  }
}

export const actions = {

  // Войти
  login({ commit }, {username, password}) {
    return new  Promise(resolve => {
      this.$api.$get("/api/person/auth", {auth: {username, password}, params: {locale: "ru"}})
        .then(response => {
          if (!response.err) {
            commit("set", ["userInfo", {...response, username, password}]);
          }
          resolve(!response.err);
        })
    })
  },

  // Регистрация
  registration({ commit, dispatch }, {iin, fio, email, password}) {
    const [lastname, firstname] = fio.split(" ");
    return new  Promise(resolve => {
      this.$api.$post("/api/filecabinet/user/save", new URLSearchParams({
        email,
        firstname: firstname || lastname,
        lastname,
        login: email,
        password,
        pointersCode: iin,
      }), {
        auth: {username: process.env.USERNAME, password: process.env.PASSWORD}
      })
        .then(async response => {
          const {errorCode, errorMessage} = response;
          const isSuccess = !response.err && errorCode === "0";
          if (isSuccess) await dispatch("sendEmailNotification", {organizationName: lastname, login: "user_1@gmail.com" || email, userId: "f488e3d6-ca6d-4e54-ba14-cfecc55e5b17" || response.userID})
          resolve({
            isSuccess,
            errorMessage,
          });
        })
    })
  },

  // Отправка уведомления о регистрации на почту
  sendEmailNotification({ }, {login, userId, organizationName}) {
    this.$api.$post("/api/notifications/send", {
      "header": "Регистрация контрагента",
      "message": `Контрагент ${organizationName} успешно зарегистрировался`,
      "users": [userId],
      "groups": [],
      "logins": [login],
      "emails": [process.env.NOTIFY_EMAIL]
    },{
      auth: {username: process.env.USERNAME, password: process.env.PASSWORD}
    })
      .then(response => {})
  },

  // Забыли пароль
  repassword({}, {login, password, passwordConfirm}) {
    return new Promise(resolve => {
      this.$api.$post("/api/filecabinet/user/changeCredentials", {
        actionCode: "CHANGE_PASSWORD",
        locale: "ru",
        login, password, passwordConfirm
      }, {
        auth: {username: process.env.USERNAME, password: process.env.PASSWORD}
      })
        .then(response => {
          let prepareResponse = response.err ? response.err.response.data : response;
          const {errorCode, errorMessage} = prepareResponse;
          const isSuccess = !response.err && errorCode.toString() === "0";
          resolve({
            isSuccess,
            errorMessage
          })
        })
    })
  },

}
