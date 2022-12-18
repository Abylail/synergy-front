
const createCatcher = () => err => {
  console.log(err);
}

/** Создание options */
const createOptions = (options, store) => {
  return options;
}

/** GET */
const createGet = ({ axios, store }) => {
  return (url, options = {}) => new Promise(resolve => {
    const prepareOptions = createOptions(options, store);
    const catcher = createCatcher();
    axios.$get(url, prepareOptions)
      .then(resolve)
      .catch(err => {catcher(err);resolve({ err });})
  })
}

/** POST */
const createPost = ({ axios, store}) => {
  return (url, body = {}, options = {}) => new Promise(resolve => {
    const prepareOptions = createOptions(options, store);
    const catcher = createCatcher();
    axios.$post(url, body, prepareOptions)
      .then(resolve)
      .catch(err => {catcher(err);resolve({ err })})
  })
}

/** PUT */
const createPut = ({ axios, store}) => {
  return (url, body = {}, options = {}) => new Promise(resolve => {
    const prepareOptions = createOptions(options, store);
    const catcher = createCatcher();
    axios.$put(url, body, prepareOptions)
      .then(resolve)
      .catch(err => {catcher(err);resolve({ err })})
  })
}

/** DELETE */
const createDelete = ({ axios, store}) => {
  return (url, options = {}) => new Promise(resolve => {
    const prepareOptions = createOptions(options, store);
    const catcher = createCatcher();
    axios.$delete(url, prepareOptions)
      .then(resolve)
      .catch(err => {catcher(err);resolve({ err });})
  })
}

const createApiLayer = ({ axios, store}) => ({
  $get: createGet({ axios, store}),
  $post: createPost({ axios, store}),
  $put: createPut({ axios, store}),
  $delete: createDelete({ axios, store}),
})

export default function ({ $axios, store }, inject) {
  inject("api", createApiLayer({ axios: $axios, store }))
}
