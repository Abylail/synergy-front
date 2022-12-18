export default async function ({ store, redirect, route }) {
  if (!store.getters["user/isAuth"] && !route.path.includes("login") && !route.path.includes("registration")) {
    redirect(`/login?redirect=${route.fullPath}`);
  }
}
