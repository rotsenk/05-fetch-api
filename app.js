//console.log("pruebassssss en la poke api");

const getRandomInt = ((min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
});

document.addEventListener('DOMContentLoaded', () => {
    const random = getRandomInt(1, 151)

    fetchData(random);
});


const fetchData = async (id) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();

        //crear una constante que se llame pokemon, y que sea de tipo objeto
        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            nombre: data.name,
            id: data.id,
            hitPoints: data.stats[0].base_stat,
            experiencia: data.base_experience,
            ataque: data.stats[1].base_stat,
            especial: data.stats[2].base_stat,
            defensa: data.stats[3].base_stat,
        }
        //fin del objeto

        console.log(pokemon);//se pasa el parametro del objeto
        pintarCard(pokemon);//se pasa el parametro del objeto
    } catch (error) {
        console.log(error);
    }
}

//pintando en el template
const pintarCard = (pokemon) => {
    console.log(pokemon);

    const flex = document.querySelector('.flex');

    const template = document.querySelector('#template-card').content;

    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img);

    clone.querySelector('.card-body-title').innerHTML = `${pokemon.nombre} <span>${pokemon.id} hp: ${pokemon.hitPoints}</span> `;

    clone.querySelector('.card-body-text').textContent = pokemon.experiencia + ' exp';

    //al querer cambiar la info de card-footer-social, esta clase se repite tres veces, no podemos usar querySelector porque sólo nos tomará una, pero sí querySelectorAll
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.ataque + 'K';
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.especial + 'K';
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.defensa + 'K';

    fragment.appendChild(clone);
    flex.appendChild(fragment);
}