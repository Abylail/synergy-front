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
  registration({ commit }, {iin, fio, email, password="Art@2022"}) {
    const [lastname, firstname] = fio.split(" ");

    let formData = new FormData();
    formData.append("email", email);
    formData.append("firstname", firstname || lastname);
    formData.append("lastname", lastname);
    formData.append("login", email);
    formData.append("password", password);
    formData.append("pointersCode", iin);

    return new  Promise(resolve => {
      this.$api.$post("/api/filecabinet/user/save", formData, {
        params: {locale: "ru"},
        auth: {username: "AdminArta", password: "Adm1nArta!"}
      })
        .then(response => {
          resolve(!response.err);
        })
    })
  },

}
