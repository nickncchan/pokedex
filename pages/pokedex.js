import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

const id = Math.floor(Math.random() * 905 + 1);

export default function Pokedex() {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

      const data = await response.json();

      setPokemonData(data);
    };

    fetchPokemon();
  }, [id]);

  const pokemonType = () => {
    let typesArr = [];

    for (let i = 0; i < pokemonData.types.length; i++) {
      let typeName =
        pokemonData.types[i].type.name.charAt(0).toUpperCase() +
        pokemonData.types[i].type.name.slice(1);
      typesArr.push(typeName);
    }

    if (typesArr.length > 1) {
      return (
        <p>
          <a href="https://bulbapedia.bulbagarden.net/wiki/Type">
            <u>Types:</u>
          </a>{" "}
          <a href={`https://bulbapedia.bulbagarden.net/wiki/${typesArr[0]}`}>
            {typesArr[0]}
          </a>{" "}
          &{" "}
          <a href={`https://bulbapedia.bulbagarden.net/wiki/${typesArr[1]}`}>
            {typesArr[1]}
          </a>
        </p>
      );
    } else {
      return (
        <p>
          <a href="https://bulbapedia.bulbagarden.net/wiki/Type">
            <u>Type:</u>
          </a>{" "}
          <a href={`https://bulbapedia.bulbagarden.net/wiki/${typesArr[0]}`}>
            {typesArr[0]}
          </a>
        </p>
      );
    }
  };

  const pokemonAbilities = () => {
    let abilitiesArr = [];

    for (let i = 0; i < pokemonData.abilities.length; i++) {
      let abilityName = pokemonData.abilities[i].ability.name;

      if (pokemonData.abilities[i].ability.name.indexOf("-") > -1) {
        const words = abilityName.replace("-", " ").split(" ");
        const word1 = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        const word2 = words[1].charAt(0).toUpperCase() + words[1].slice(1);
        abilityName = word1 + " " + word2;
        abilitiesArr.push(abilityName);
      } else {
        abilitiesArr.push(
          abilityName.charAt(0).toUpperCase() + abilityName.slice(1)
        );
      }
    }

    return abilitiesArr.map((ability) => (
      <li key={nanoid()}>
        <a href={`https://bulbapedia.bulbagarden.net/wiki/${ability}`}>
          {ability}
        </a>
      </li>
    ));
  };

  const pokemonName = () => {
    if (pokemonData.name.indexOf("-") > -1) {
      const words = pokemonData.name.split("-");

      if (words[1] === "incarnate") {
        return words[0].charAt(0).toUpperCase() + words[0].slice(1);
      }
    } else {
      return (
        pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)
      );
    }
  };

  return (
    pokemonData && (
      <div className="pokedex">
        <div className="pokedex-header">
          <h1>
            <u>Pokédex</u>
          </h1>
          <p>
            Click the links to go to the{" "}
            <a href="https://bulbapedia.bulbagarden.net/wiki/Main_Page">
              Bulbapedia Wiki
            </a>{" "}
            for more info!
          </p>
        </div>
        <div className="pokedex-img">
          <img
            src={pokemonData.sprites.front_default}
            width="200"
            alt="pokemon"
          />
          <p>
            <a
              href={`https://bulbapedia.bulbagarden.net/wiki/${pokemonName()}`}
            >
              #{pokemonData.id}
            </a>{" "}
            of{" "}
            <a
              href={`https://bulbapedia.bulbagarden.net/wiki/List_of_Pokémon_by_National_Pokédex_number`}
            >
              905
            </a>
          </p>
        </div>
        <div className="pokedex-info">
          <p>
            <u>Name:</u>{" "}
            <a
              href={`https://bulbapedia.bulbagarden.net/wiki/${pokemonName()}`}
            >
              {pokemonName()}
            </a>
          </p>
          <p>
            <a href="https://bulbapedia.bulbagarden.net/wiki/Height">
              <u>Height:</u>
            </a>{" "}
            {pokemonData.height / 10} m
          </p>
          <p>
            <a href="https://bulbapedia.bulbagarden.net/wiki/Weight">
              <u>Weight:</u>
            </a>{" "}
            {pokemonData.weight / 10} kg
          </p>
          {pokemonType()}
          <p>
            <a href="https://bulbapedia.bulbagarden.net/wiki/Ability">
              <u>Abilities</u>
            </a>
          </p>
          <ul>{pokemonAbilities()}</ul>
        </div>
      </div>
    )
  );
}
