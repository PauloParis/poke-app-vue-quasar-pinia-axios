import Poke from "src/pages/PokemonPage.vue";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/pokemon/:id", component: Poke },
      { path: "/game", component: () => import("pages/GamePage.vue") },
      { path: "/favorite", component: () => import("pages/FavoritePage.vue") },
      { path: "/probando", component: () => import("pages/ProbandoView.vue") },
      {
        path: "/gameprobando",
        component: () => import("pages/GameProbando.vue"),
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
