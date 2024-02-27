# 05-fetch-api
> Desafío: https://www.frontendmentor.io/challenges/profile-card-component-cfArpWshJ

> Descarga de plantilla: https://github.com/bluuweb/desafio-card

> Guía de Bluuweb: https://bluuweb.github.io/practicas/03-card/

# También consumiremos la PokeAPI
> Esta API nos va a traer la info de Pokémons, Ir a la url: https://pokeapi.co/

> Guía de bluuweb: https://bluuweb.github.io/practicas/04-card-poke/#objetivo

- Usaremos funciones como Math random: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/random, para traer números aleatorios, recordemos que lo que pasaremos es un id
- Async Await
- Fetch
- DOMContentLoaded
- Fragment

> asimismo, trabajaremos con los template, para trabajar de forma dinámica dentro de la card
- debemos pasar dentro de un template, toda la etiqueta de article, muy importante colocar siempre un id al template

- El script quedaría así:
```javascript
console.log("pruebassssss en la poke api");
//analizando el random, para generar un número hasta el 150, así lo solicita la API de poke, hay que leer documentación
const getRandomInt = ((min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
});
//llamaremos a la función, y le pasamos los parámetros, desde el 1 como mínimo, y el 151 como máximo ya que en este caso, el máximo lo excluirá la función
getRandomInt(1, 151);
console.log(getRandomInt(1, 151));
//una vez que conseguimos el número, nosotros necesitamos hacer una solicitud a la url de la API

//esta será async porque necesitamos que se espere, cuando nos traiga la info la pintaremos
const fetchData = async () => {
    try {
        //aquí usamos el await, de nuestro fetch que recibe una url
        //utilizamos async y await para decirle espérate que tenemos una solicitud, cuando tengas esa solicitud pasamos a la siguiente línea, y luego pintamos en el console
        const res = await fetch('https://pokeapi.co/api/v2/pokemon/150');
        //tenemos que transformar a JSON
        const data = await res.json();
        console.log(data);

    } catch (error) {
        console.log(error);
    }
}

fetchData();
```

## Pero, es mejor ser más ordenados, y podemos usar el evento que espera que se cargue nuestro HTML y luego comienza con todo el JS, lo que es addEventListener
- se debe modificar width y height en los estilos.scss, 200px . 200px
- quedaría el script así:
```javascript
//console.log("pruebassssss en la poke api");

const getRandomInt = ((min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
});

//este evento DOMContentLoad, es disparado cuando el documento HTML ha sido completamente cargado y parseado, sin esperar css, imagenes y subframes para finalizar la carga.
document.addEventListener('DOMContentLoaded', () => {
    //pasamos el número aleatorio
    const random = getRandomInt(1, 151)
    //pasamos el fetch data
    fetchData(random);
});


//le pasamos un id como parámetro
const fetchData = async (id) => {
    try {
        //const res = await fetch('https://pokeapi.co/api/v2/pokemon/150');
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        //tenemos que transformar a JSON
        const data = await res.json();
        console.log(data);
        //una vez que nosotros tenemos la información, se pinta la tarjeta con la data
        pintarCard(data);//no es necesario el await
    } catch (error) {
        console.log(error);
    }
}

//pintando en el template
const pintarCard = (pokemon) => {
    console.log(pokemon);
    //en el main flex va a ir la información
    const flex = document.querySelector('.flex');
    //en este caso, es menos complicado porque no tenemos que hacer un array del pokemon en el template
    const template = document.querySelector('#template-card').content;//no olvidar el content porque necesito lo que está dentro de la etiqueta
    //clonar
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();//con esto modificamos dinámicamente el DOM

    //acceder a la imagen
    //inspeccionar el json de los pokemons para encontrar la imagen
    clone.querySelector('.card-body-img').setAttribute('src', pokemon.sprites.other.dream_world.front_default);

    //modificar el nombre, en el h1, y el id en span
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.species.name} <span>${pokemon.id}</span>`;

    fragment.appendChild(clone);
    flex.appendChild(fragment);
}
```

# Esto incluso puede estar más ordenado
- el reto es que los estudiantes lo ordenen, convirtiendo en un objeto dentro del js, para obtener la info del pokemon
- el script nuevo sería:
```javascript
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
```