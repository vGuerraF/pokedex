let pokemons = [];
let pokemonsInfo = [];
let responseData;
let contadorPagina = 0;
let contadorDescription = -1;

// const modalId = document.querySelector("#PokeId");
// const modalName = document.querySelector("#PokeName");
// const modalImg = document.querySelector("#PokeImg");
// const modalTypes = document.querySelector("#PokeTypes");

async function getAllPokemon() {
  const resp = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${contadorPagina}&limit=20`
  );
  responseData = await resp.json();

  responseData.results.forEach(async function (pokeInfo) {
    const respInfo = await fetch(pokeInfo.url);
    const dataInfo = await respInfo.json();

    const description = await fetch(dataInfo.game_indices[10].version.url);
    const descriptionJson = await description.json();

    const version = await fetch(descriptionJson.version_group.url);
    const versionJson = await version.json();

    const pokedexes = await fetch(versionJson.pokedexes[0].url);
    const pokedexesJson = await pokedexes.json();

    contadorDescription++;

    if (contadorDescription > 151) {
      contadorDescription = 0;
    }

    const species = await fetch(
      pokedexesJson.pokemon_entries[contadorDescription].pokemon_species.url
    );
    const speciesJson = await species.json();

    let types = [];

    dataInfo.types.forEach((tipo) => {
      types.push(tipo.type.name);
    });

    pokemons.push({
      id: dataInfo.id,
      name: `${dataInfo.name}`,
      image: `${dataInfo.sprites.front_default}`,
      types,
      description: speciesJson.flavor_text_entries[10].flavor_text,
    });
  });
}

function printPoke(poke) {
  document.getElementById("pokeCards").insertAdjacentHTML(
    "beforeend",
    `
        <div class="Card">
            <p>Nº${poke.id}</p>
            <p class="PokeName" >${poke.name}</p>
            <img src=${poke.image} alt="" />
            <p class="PokeName">${poke.types}</p>
            <p id="PokeDesc">${poke.description}</p>
          </div>
          
      `
  );

  pokemonsInfo.push(poke);

  // const cards = document.querySelectorAll(".Card");

  // cards.forEach((card) => {
  //   card.addEventListener("click", (event) => {
  //     const cardElement = event.composedPath(1).filter((item) => {
  //       item.className == "Card";
  //     });
  //     console.log(event);
  //     console.log(cardElement)
  //   });
  // });
}

function nextPokemons() {
  contadorPagina += 20;

  getAllPokemon();

  setTimeout(() => {
    pokemons.sort(function (poke1, poke2) {
      return poke1.id - poke2.id;
    });
    pokemons.forEach((pokemon) => printPoke(pokemon));
  }, 1000);

  pokemons = [];
}

setTimeout(() => {
  pokemons.sort(function (poke1, poke2) {
    return poke1.id - poke2.id;
  });
  pokemons.forEach((pokemon) => printPoke(pokemon));
}, 1000);

getAllPokemon();
