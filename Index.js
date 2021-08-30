
let form_data=document.getElementById('form-number')
form_data.addEventListener('change',(e)=>{
// console.log(e.target.value);

let val=e.target.value;

const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
    const promises = [];


// console.log()


    for (let i = 1; i <= val; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites.other.dream_world.front_default,
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
            
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card">
            <p class='pid'>id:${pokeman.id}</p>
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();

})