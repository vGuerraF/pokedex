let pokemons = [];
let responseData;
let contador = 0;

async function getAllPokemon() {
  const resp = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${contador}&limit=20`
  );
  responseData = await resp.json();

  responseData.results.forEach(async function (pokeInfo) {
    const respInfo = await fetch(pokeInfo.url);

    const dataInfo = await respInfo.json();

    let types = []

    dataInfo.types.forEach((tipo) => {types.push(tipo.type.name)})

    pokemons.push({
      id: dataInfo.id,
      name: `${dataInfo.name}`,
      image: `${dataInfo.sprites.front_default}`,
      types
    });
  });
}


function printPoke(poke) {
  document.getElementById("pokeCards").insertAdjacentHTML(
    "beforeend",
    `
        <div class="Card">
            <p>Nº${poke.id}</p>
            <p class="PokeName">${poke.name}</p>
            <img src=${poke.image} alt="" />
            <p>${poke.types}</p>
          </div>
          
      `
  );
}

function nextPokemons() {
  contador += 20;

  getAllPokemon();

  setTimeout(() => {
    pokemons.sort(function(poke1, poke2){return poke1.id - poke2.id})
    pokemons.forEach((pokemon) => printPoke(pokemon));
  }, 1000);

  pokemons = [];
}

setTimeout(() => {
  pokemons.sort(function(poke1, poke2){return poke1.id - poke2.id})
  pokemons.forEach((pokemon) => printPoke(pokemon));
}, 1000);

getAllPokemon();
