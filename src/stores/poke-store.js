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
  const favorite = ref([]);

  // obtener pokemones
  const getPokemons = async (inicio = 0, final = 150) => {
    Loading.show();

    try {
      const limit = final - inicio + 1;
      const res = await api.get(`/pokemon?limit=${limit}&offset=${inicio}`);
      pokemones.value = [res.data.results];
    } catch (error) {
      console.log(error);
    } finally {
      Loading.hide();
    }
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // traer información del pokemon seleccionado
  const infoPokemon = async (id) => {
    Loading.show();

    try {
      const res = await api.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const { types, stats, name, weight, height, sprites } = res.data;

      const tipo = types.map((item) => capitalize(item.type.name));
      const estadistica = stats.map((item) => [
        capitalize(item.stat.name),
        item.base_stat,
      ]);

      const color = tipo.map((item) => {
        const colorObject = bgColor.value.find(
          (type) => Object.keys(type)[0] === item
        );
        return colorObject ? Object.values(colorObject)[0] : undefined;
      });
      const typeColor = tipo.map((item, index) => ({
        type: item,
        color: color[index],
      }));

      poke.value = {
        id: id,
        nombre: capitalize(name),
        peso: weight / 10,
        altura: height / 10,
        image: sprites.other.dream_world.front_default,
        tipo: typeColor,
        estadistica,
        sprites,
      };
    } catch (error) {
      console.log(error);
    } finally {
      Loading.hide();
    }
  };

  // traer pokemones de favoritos
  const favoritePokemon = async (ids) => {
    if (!ids) return;
    Loading.show();

    try {
      const favoritePokemons = await Promise.all(
        ids.map(async (id) => {
          const res = await api.get(`/pokemon/${id}`);
          return res.data;
        })
      );

      favorite.value = [...favoritePokemons].reverse();
    } catch (error) {
      console.error(error);
    } finally {
      Loading.hide();
    }
  };

  return {
    getPokemons,
    poke,
    infoPokemon,
    pokemones,

    favoritePokemon,
    favorite,

    dark,
  };
});
