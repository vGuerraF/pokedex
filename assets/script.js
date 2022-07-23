let pokemons = [];
let responseData;

async function getAllPokemon(baseUrl) {
  const resp = await fetch(baseUrl);
  responseData = await resp.json();

  pokemons = data.results.map(async function (pokeInfo) {
    const respInfo = await fetch(pokeInfo.url);

    const dataInfo = await respInfo.json();

    return {
      id: dataInfo.id,
      name: `${dataInfo.name}`,
      image: `${dataInfo.sprites.front_default}`,
    };
  });
}

console.log(pokemons);
setTimeout(() => {
  pokemons.forEach((pokemon) => printPoke(pokemon));
}, 1000);

function printPoke(poke) {
  document.getElementById("pokeCards").insertAdjacentHTML(
    "beforeend",
    `
        <div class="Card">
          <p>${poke.id}</p>
          <p>${poke.name}</p>
          <img src=${poke.image} alt="" />
          <p>info</p>
        </div>
        
    `
  );
}

async function nextPokemons() {
  if (!responseData.next) {
    return;
  }
  await getAllPokemon(responseData.next);

  pokemons.forEach((pokemon) => printPoke(pokemon));
}

getAllPokemon("https://pokeapi.co/api/v2/pokemon");
