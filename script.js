const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemonPromises = () =>
    Array(150)
        .fill()
        .map((_, index) =>
            fetch(getPokemonUrl(index + 1)).then((response) => response.json())
        );

const generateHTML = (pokemons) => {
    const ul = document.querySelector('[data-js="pokedex"]');
    ul.innerHTML = pokemons;
};

const insertPokemonsIntoPage = (pokemons) => {
    return pokemons.reduce((accumulator, {name, id, types}) => {
        const elementTypes = types.map((typeInfo) => typeInfo.type.name);

        accumulator += `
        <li class="card ${elementTypes[0]}">
            <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" />
            <h2 class="card-title">${id}. ${name} </h2>
            <p class="card-subtitle"> ${elementTypes.join("")}</p>
        </li>`;
        return accumulator;
    }, "");
};

const pokemonPromises = generatePokemonPromises();

// for (let i = 1; i <= 150; i++){
//     pokemonPromises.push(fetch(getPokemonUrl(i)).then( response => response.json()))
//     //push envia para o vetor
// }

Promise.all(pokemonPromises) // Quando todas as promisses estiverem resolvidas
    .then(insertPokemonsIntoPage)
    .then(generateHTML);

fetchPokemon();
