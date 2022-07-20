import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import ArtAndMusic from "../pages/ArtAndMusicPage.vue";
import Collection from "../pages/CollectionPage.vue";
import SignIn from "../pages/SignIn.vue";
import SignUp from "../pages/SignUp.vue";

const routes = [
  { path: "/", component: HomePage, name: "HomePage", meta: {title: "Xiaohan's Home",}},
  { path: "/art-music", component: ArtAndMusic, name: "ArtAndMusicPage" },
  { path: "/my-collection", component: Collection, name: "Collection" },
  { path: "/sign-in", component: SignIn, name: "SignIn" },
  { path: "/sign-up", component: SignUp, name: "SignUp" },
];

const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

router.beforeEach((to, from, next)=>{
  document.title=`${to.meta.title}`;
  next();
});

export default router;
