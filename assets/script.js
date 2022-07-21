let pokemons = [];

async function getAllPokemon() {
  const resp = await fetch("https://pokeapi.co/api/v2/pokemon");

  const data = await resp.json();

  data.results.forEach(async function (pokeInfo) {
    const respInfo = await fetch(pokeInfo.url);

    const dataInfo = await respInfo.json();

    pokemons.push(
      dataInfo
    );

    console.log(pokemons);
  });
}

getAllPokemon();


function printPoke() {
  pokemons.forEach((poke) => {
    console.log(poke)
    document.getElementById("pokeCards").insertAdjacentHTML(
      "beforeend",
      `
          <div class="cards">
            <p>numero</p>
            <p>${poke.name}</p>
            <img src="" alt="" />
            <p>info</p>
          </div>
          
      `
    );
  });
}

printPoke();
