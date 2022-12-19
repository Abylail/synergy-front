export const state = () => ({

})

export const getters = {

}

export const mutation = {

}

export const actions = {
  fetchDocument({ rootGetters }, documentId) {
    return new Promise(resolve => {
      this.$api.$get("/api/asforms/template/print/form", {auth: rootGetters["user/getUserAuth"], params: {dataUUID: documentId, format: "pdf", locale: "ru"}})
        .then(response => {
          if (!response.err) {
            console.log(response);
          }
          resolve(!response.err);
        })
    })
  }
}
