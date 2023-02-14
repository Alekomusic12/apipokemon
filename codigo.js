function pokemonApi(urlAPI = 'https://pokeapi.co/api/v2/pokemon/') {
    document.querySelector("#datosweb").innerHTML = ""
    let peticion = fetch(urlAPI)
    peticion.then(res => res.json())
        .then(data => {
            for (const picachu of data.results) {
                fetch(picachu.url)
                    .then(res2 => res2.json())
                    .then(lospokemon => {
                        lospokemon.stats.forEach((atributo, posicion) => {
                            if (posicion == 3) {


                                document.querySelector("#datosweb").innerHTML += `
                                        
                                        <div class="col">
                                        <div class="card mt-5 mb-0">
                                        <div class="card-body cartas">
                                        <img src="${lospokemon.sprites.other.home.front_default}" class="w-50 ms-5 "> 
                                        <h3 class="card-title justify-content-center align-content-center text-center" >${picachu.name}</h3>
                                        <h6 class="card-text justify-content-center align-content-center text-center">${atributo.stat.name}</h6>
                                        </div>
                                        </div>
                                        </div>
                                        `
                            };
                        });
                    })
            }
            siguienteAnterior(data.next, data.previous)
        })
}


function siguienteAnterior(data_next, data_previous) {
    let disabledBotonNext = (data_next == null) ? "disabled" : "";
    let disabledBotonPrev = (data_previous == null) ? "disabled" : "";
    document.querySelector("#anteSig").innerHTML = `
                            <button class="btn btn-dark  fs-1" ${disabledBotonPrev} onclick="pokemonApi('${data_previous}')">Anterior</button>
                            <button class="btn btn-dark  fs-1" ${disabledBotonNext} onclick="pokemonApi('${data_next}')">Siguiente</button>`
}

pokemonApi()