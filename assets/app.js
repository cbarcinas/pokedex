const input = document.querySelector('input');
const [search, randomSearch] = document.querySelectorAll('button');
const img = document.querySelector('img');
const content = document.querySelector('.content');
const [title, type, hp, attack, defense] = document.querySelectorAll('p');
const random = () => Math.round(Math.random() * 898);

const getPokemon = async (query) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
        const data = await res.json();
        return {
            name: data.name,
            type: data.types[0].type.name,
            imgUrl: data.sprites.front_default,
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat
        }
    } catch (error) {
        return {
            name: 'NOT FOUND',
            type: '???',
            imgUrl: '',
            hp: '???',
            attack: '???',
            defense: '???'
        }
    }
}

const setCard = async (query) => {
    const pokemon = await getPokemon(query);

    title.innerText = pokemon.name;
    type.innerText = `TYPE: ${pokemon.type}`;
    img.src = pokemon.imgUrl;
    hp.innerText = `HEA: ${pokemon.hp}`;
    attack.innerText = `ATK: ${pokemon.attack}`;
    defense.innerText = `DEF: ${pokemon.defense}`;
}

search.addEventListener('click', async () => {
    content.classList.toggle('fadeIn');
    await setCard(input.value.toLowerCase());
    setTimeout(() => {
        content.classList.toggle('fadeIn');
    }, 1000);
});

randomSearch.addEventListener('click', async () => {
    content.classList.toggle('fadeIn');
    await setCard(random());
    setTimeout(() => {
        content.classList.toggle('fadeIn');
    }, 1000);
});

// IMPORTANT!
// Since I used viewport height units, mobile keyboards shrink the content when the input is active.
// This function sets width & height correctly in mobile devices.
// For more info: https://stackoverflow.com/questions/32963400/android-keyboard-shrinking-the-viewport-and-elements-using-unit-vh-in-css 
const responsive = () => {
    const viewheight = window.visualViewport.height;
    const viewwidth = window.visualViewport.width;
    const viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute("content", `height=${viewheight}px, width=${viewwidth}px, initial-scale=1.0`);
}

responsive();