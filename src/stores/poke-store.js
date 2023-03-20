import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { Loading } from "quasar";

export const usePokemonStore = defineStore("pokemon", () => {
  const dark = ref(true);
  const pokemones = ref([]);
  const poke = ref({
    nombre: null,
    peso: null,
    altura: null,
    image: null,
    tipo: [],
    estadistica: [],
    sprites: [],
  });
  const bgColor = ref([
    { Grass: "bg-positive" },
    { Poison: "bg-purple" },
    { Fire: "bg-red" },
    { Flying: "bg-teal" },
    { Water: "bg-blue" },
    { Bug: "bg-light-green" },
    { Normal: "bg-grey" },
    { Electric: "bg-yellow-14" },
    { Ground: "bg-brown" },
    { Fairy: "bg-cyan" }, //hada
    { Psychic: "bg-purple-14" },
    { Fighting: "bg-blue-grey" },
    { Dragon: "bg-deep-orange" },
    { Ice: "bg-light-blue" },
    { Rock: "bg-grey-9" },
  ]);
  const dataGame = ref({
    id: null,
    name: null,
    img: null,
  });
  const randomName = ref([]);
  const favorite = ref([]);
  const fav = ref([]);

  // obtener los 151 pokemones
  const getPokemons = async () => {
    Loading.show();
    try {
      const res = await api.get("/pokemon?limit=151&offset=0");
      pokemones.value.push(res.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      Loading.hide();
    }
  };

  const infoPokemon = async (id) => {
    Loading.show();
    try {
      const res = await api.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      let tipo = res.data.types.map(
        (item) => item.type.name[0].toUpperCase() + item.type.name.substring(1)
      );
      let estadistica = res.data.stats.map((item) => [
        item.stat.name.toUpperCase(),
        item.base_stat,
      ]);
      let color = [];
      bgColor.value.forEach((bg) => {
        tipo.forEach((type) => {
          if (type == Object.keys(bg)[0]) {
            color.push(Object.values(bg)[0]);
          }
        });
      });
      let typeColor = [];
      for (let x = 0; x < tipo.length; x++) {
        typeColor.push({ type: tipo[x], color: color[x] });
      }

      poke.value = {
        id: id,
        nombre: res.data.name[0].toUpperCase() + res.data.name.substring(1),
        peso: res.data.weight / 10,
        altura: res.data.height / 10,
        image: res.data.sprites.other.dream_world.front_default,
        tipo: typeColor,
        estadistica: estadistica,
        sprites: res.data.sprites,
      };
    } catch (error) {
      console.log(error);
    } finally {
      Loading.hide();
    }
  };

  const gamePokemon = async () => {
    Loading.show();
    try {
      let randomId = Math.round(Math.random() * (151 - 1) + parseInt(1));
      const res = await api.get(`/pokemon/${randomId}`);
      let i = 0;
      while (i < 3) {
        let random = Math.round(Math.random() * (151 - 1) + parseInt(1));
        const res = await api.get(`/pokemon/${random}`);
        randomName.value.push(res.data.name);
        i++;
      }

      dataGame.value = {
        id: res.data.id,
        name: res.data.name,
        img: res.data.sprites.other.dream_world.front_default,
      };
      randomName.value.push(dataGame.value.name);
      randomName.value.sort();
    } catch (error) {
      console.log(error);
    } finally {
      Loading.hide();
    }
  };

  const favoritePokemon = async (ids) => {
    Loading.show();
    try {
      if (ids != null) {
        ids = ids.reverse();
        for (let i = 0; i < ids.length; i++) {
          const res = await api.get(`/pokemon/${ids[i]}`);
          fav.value.push(res.data);
        }
        favorite.value = [...fav.value];
        fav.value = [];
      }
    } catch (error) {
      console.log(error);
    } finally {
      Loading.hide();
    }
  };

  return {
    getPokemons,
    poke,
    infoPokemon,
    pokemones,

    gamePokemon,
    dataGame,
    randomName,

    favoritePokemon,
    favorite,

    dark,
  };
});
