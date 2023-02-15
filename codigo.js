const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
const limit = 6;
let offset = 0;

function loadPokemon(offset) {
  const paginationContainer = document.getElementById('pagination-container');
  paginationContainer.innerHTML = '';

  fetch(`${apiUrl}?limit=${limit}&offset=${offset}`)
    .then(response => response.json())
    .then(data => {
      const pokemonContainer = document.getElementById('pokemon-container');
      pokemonContainer.innerHTML = '';

      data.results.forEach(pokemon => {
        const pokemonElement = document.createElement('div');
        pokemonElement.classList.add('pokemon-card');
        const nameElement = document.createElement('p');
        const imageElement = document.createElement('img');
        imageElement.classList.add('pokemon-image');

        nameElement.textContent = pokemon.name;
        pokemonElement.appendChild(nameElement);

        fetch(pokemon.url)
          .then(response => response.json())
          .then(data => {
            const imageUrl = data.sprites.front_default;
            imageElement.src = imageUrl;
          })
          .catch(error => console.log(error));

        pokemonElement.appendChild(imageElement);
        pokemonContainer.appendChild(pokemonElement);
      });

      const previousButton = document.createElement('button');
      previousButton.textContent = 'Previous';
      previousButton.addEventListener('click', () => loadPokemon(offset - limit));
      paginationContainer.appendChild(previousButton);

      const nextButton = document.createElement('button');
      nextButton.textContent = 'Next';
      nextButton.addEventListener('click', () => loadPokemon(offset + limit));
      paginationContainer.appendChild(nextButton);
    })
    .catch(error => console.log(error));
}

loadPokemon(offset);
