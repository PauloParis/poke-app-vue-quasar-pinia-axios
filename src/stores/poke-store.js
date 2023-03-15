import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const usePokemonStore = defineStore("pokemon", () => {
  const pokemones = ref([]);
  const resultados = ref([]);
  const info = ref([]);
  const poke = ref({
    nombre: null,
    peso: null,
    altura: null,
    image: null,
    tipo: [],
    estadistica: [],
    sprites: [],
  });

  // obtener los 151 pokemones
  const getPokemons = async () => {
    try {
      //const res = await api.get("/pokemon?limit=150&offset=0");
      for (let i = 1; i <= 151; i++) {
        let poke = await api.get(`/pokemon/${i}`);
        pokemones.value.push(poke.data);
      }
      info.value = [...pokemones.value];
      pokemones.value = [];
    } catch (error) {
      console.log(error);
    }
  };

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

  const infoPokemon = async (id) => {
    const res = await api.get(`/pokemon/${id}`);

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
  };

  const dataGame = ref({
    id: null,
    name: null,
    img: null,
  });
  const randomName = ref([]);
  const estado = ref(false);

  const gamePokemon = async () => {
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
  };

  const favorite = ref([]);
  const fav = ref([]);

  const favoritePokemon = async (ids) => {
    for (let i = 0; i < ids.length; i++) {
      //console.log(ids[i]);
      const res = await api.get(`/pokemon/${ids[i]}`);
      fav.value.push(res.data);
    }
    favorite.value = [...fav.value];
    fav.value = [];
    //console.log(favorite.value);
  };

  return {
    getPokemons,
    resultados,
    info,
    poke,
    infoPokemon,
    pokemones,

    gamePokemon,
    dataGame,
    randomName,
    estado,

    favoritePokemon,
    favorite,
  };
});
