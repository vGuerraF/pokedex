const pokemons = [];

async function getAllPokemon() {
  const resp = await fetch("https://pokeapi.co/api/v2/pokemon");

  const data = await resp.json();

  data.results.forEach(async function (pokeInfo) {
    const respInfo = await fetch(pokeInfo.url);

    const dataInfo = await respInfo.json();

    pokemons.push({
      id: dataInfo.id,
      name: `${dataInfo.name}`,
      image: `${dataInfo.sprites.front_default}`,
    });
  });
}

getAllPokemon();
console.log(pokemons);
setTimeout(() => {
  pokemons.forEach((pokemon) => printPoke(pokemon));
}, 500);

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

printPoke();