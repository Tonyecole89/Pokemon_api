let url = "https://tyradex.vercel.app/api/v1/pokemon";
let poke_element;

function refresh() {
    fetch(url)
    .then(response => {
        return response.json();
    })
    .then(donnee => {
        console.log(donnee);
        localStorage.setItem("poke_all", JSON.stringify(donnee));
    })
    .catch(error => alert(error))
}

function remove(){
    localStorage.removeItem("pokemon_all");
    console.log("La mémoire a été vidée");
}

function displayPokemonName(poke_all) {
    poke_element = document.getElementById("grid_contenu");
    poke_element.innerHTML = "";

    if(poke_all && poke_all.length > 0) {
        for(let i in api) {
            if (i >= 1) {
                poke_element.insertAdjacentHTML("beforeend", 
                `<div class="grid">
                    <img class="image_pokemon_all" src= ${poke_all[i].sprites.regular} alt="photo de pokemon">
                    <h1 id="name">${poke_all[i].name.fr}</h1>
                    <img class="image_pokemon_type" src= ${poke_all[i].types[0].image} alt="photo de pokemon">
                    ${poke_all[i].types[1] ? `<img class="image_pokemon_type" src= ${poke_all[i].types[1].image} alt="photo de pokemon">` : ''}
                    <button onClick="stat_poke(${i})">En savoir plus</button>
                </div>`
                )}   
            }
    } else {
        console.log("Il n'y a pas de donnée");
    }
}

function pokemon_type(type) {
    poke_element = document.getElementById("grid_contenu");
    poke_element.innerHTML = "";
    let recup_type = type.textContent;
    if(api && api.length > 0) {
        for(let i in api) {
            if (i >= 1) {
                let nb_type = api[i].types.length;
                if (nb_type >= 2) {
                    nb_type = 1;
                } else {
                    nb_type = 0;
                }
                if (api[i].types[0].name == recup_type || api[i].types[nb_type].name == recup_type) {
                    poke_element.insertAdjacentHTML("beforeend", 
                    `<div class="grid">
                        <img class="image_pokemon_all" src= ${api[i].sprites.regular} alt="photo de pokemon">
                        <h1 id="name">${api[i].name.fr}</h1>
                        <img class="image_pokemon_type" src= ${api[i].types[0].image} alt="photo de pokemon">
                        ${api[i].types[1] ? `<img class="image_pokemon_type" src= ${api[i].types[1].image} alt="photo de pokemon">` : ''}
                        <button onClick="stat_poke(${i})">En savoir plus</button>
                    </div>`
                )}  
                } 
            }
    } else {
        console.log("Il n'y a pas de donnée");
    }
}

function pokemon_gen(gen) {
    poke_element = document.getElementById("grid_contenu");
    poke_element.innerHTML = "";
    let recup_gen = gen.textContent;
    if(api && api.length > 0) {
        for(let i in api) {
            if (i >= 1) {
                if (api[i].generation == recup_gen) {
                    poke_element.insertAdjacentHTML("beforeend", 
                    `<div class="grid">
                        <img class="image_pokemon_all" src= ${api[i].sprites.regular} alt="photo de pokemon">
                        <h1 id="name">${api[i].name.fr}</h1>
                        <img class="image_pokemon_type" src= ${api[i].types[0].image} alt="photo de pokemon">
                        ${api[i].types[1] ? `<img class="image_pokemon_type" src= ${api[i].types[1].image} alt="photo de pokemon">` : ''}
                        <button onClick="stat_poke(${i})">En savoir plus</button>
                    </div>`
                )}  
            }
        }
    } else {
        console.log("Il n'y a pas de donnée");
    }
}

function supp_poke_stat() {
    poke_element.innerHTML = '';
}

let nb_evolution;
function stat_poke(the_id) {
    poke_element.innerHTML = '';
    poke_element = document.querySelector("body");
    console.log(api[the_id].evolution.pre);
    if (api[the_id].evolution["pre"] == null) {
        console.log("test1");
        nb_evolution = -1;
    } else {
        console.log("test2");
        nb_evolution = api[the_id].evolution["pre"].length;
        nb_evolution = nb_evolution - 1;
        console.log(nb_evolution);
    }
    poke_element.insertAdjacentHTML("beforeend",
    `<a href="normal.html"><button>recherche</button></a>
    <h1 id="name">${api[the_id].name.fr}</h1>

    <h1 id="name">Fait partie de la génération : ${api[the_id].generation}</h1>

    ${nb_evolution != -1 ? `<h1 id="name">Generation d'avant: ${api[the_id].evolution.pre[nb_evolution].name}</h1>` : ''}

    <img class="image_pokemon_stat" src= ${api[the_id].sprites.regular} alt="photo de pokemon">

    <div id="grid_contenu2">
        <div class="grid_pokemon_stat">
            <img class="image_pokemon_type_poke_stat" src= ${api[the_id].types[0].image} alt="photo de pokemon">
            <h1>${api[the_id].types[0].name}</h1>  

            ${api[the_id].types[1] ? `<img class="image_pokemon_type_poke_stat" src= ${api[the_id].types[1].image} alt="photo de pokemon">` : ''}
            ${api[the_id].types[1] ? `<h1>${api[the_id].types[1].name}</h1>` : ''}
        </div>
        <div class="grid_pokemon_stat">
            <h1 id="name">attaque: ${api[the_id].stats.atk}</h1>
            <h1 id="name">defense: ${api[the_id].stats.def}</h1>
            <h1 id="name">pv: ${api[the_id].stats.hp}</h1>
            <h1 id="name">attaque speciale: ${api[the_id].stats.spe_atk}</h1>
            <h1 id="name">defense speciale: ${api[the_id].stats.spe_def}</h1>
            <h1 id="name">vitesse: ${api[the_id].stats.vit}</h1>
        </div>
        <div class="grid_pokemon_stat">
            <h1 id="name">Resistance Normal: ${api[the_id].resistances[0].multiplier}</h1>
            <h1 id="name">Resistance Plante: ${api[the_id].resistances[1].multiplier}</h1>
            <h1 id="name">Resistance Feu: ${api[the_id].resistances[2].multiplier}</h1>
            <h1 id="name">Resistance Eau: ${api[the_id].resistances[3].multiplier}</h1>
            <h1 id="name">Resistance Electrik: ${api[the_id].resistances[4].multiplier}</h1>
            <h1 id="name">Resistance Glace: ${api[the_id].resistances[5].multiplier}</h1>
        </div>
        <div class="grid_pokemon_stat">
            <h1 id="name">Resistance contre le type Combat: ${api[the_id].resistances[6].multiplier}</h1>
            <h1 id="name">Resistance Poison: ${api[the_id].resistances[7].multiplier}</h1>
            <h1 id="name">Resistance Sol: ${api[the_id].resistances[8].multiplier}</h1>
            <h1 id="name">Resistance Vol: ${api[the_id].resistances[9].multiplier}</h1>
            <h1 id="name">Resistance Psy: ${api[the_id].resistances[10].multiplier}</h1>
            <h1 id="name">Resistance Insecte: ${api[the_id].resistances[11].multiplier}</h1>
        </div>
        <div class="grid_pokemon_stat">
            <h1 id="name">Resistance Roche: ${api[the_id].resistances[12].multiplier}</h1>
            <h1 id="name">Resistance Spectre: ${api[the_id].resistances[13].multiplier}</h1>
            <h1 id="name">Resistance Dragon: ${api[the_id].resistances[14].multiplier}</h1>
            <h1 id="name">Resistance Ténèbres: ${api[the_id].resistances[15].multiplier}</h1>
            <h1 id="name">Resistance Acier: ${api[the_id].resistances[16].multiplier}</h1>
            <h1 id="name">Resistance Fée: ${api[the_id].resistances[17].multiplier}</h1>
        </div>
    </div>`
    )
    console.log(the_id);
}

function searchPokemon(gen) {
    poke_element.innerHTML = "";
    var input = document.getElementById("recherche");
    var filter = input.value.toUpperCase();
    var len = api.length;
    var i;
    var name;
    var found = false;

    if (filter === "") {
        displayPokemonName(api);
    } else {
        for (i = 0; i < len; i++) {
            name = api[i].name.fr;
            if (typeof name === "string" && name.toUpperCase().includes(filter)) {
                found = true;
                poke_element = document.getElementById("grid_contenu");
                if(api && api.length > 0) {
                    if (found == true) {
                        poke_element.insertAdjacentHTML("beforeend", 
                        `<div class="grid">
                        <img class="image_pokemon_all" src= ${api[i].sprites.regular} alt="photo de pokemon">
                        <h1 id="name">${name}</h1>
                        <img class="image_pokemon_type" src= ${api[i].types[0].image} alt="photo de pokemon">
                        ${api[i].types[1] ? `<img class="image_pokemon_type" src= ${api[i].types[1].image} alt="photo de pokemon">` : ''}
                        <button onClick="stat_poke(${i})">En savoir plus</button>
                        </div>`
                    )}  
                } else {
                    console.log("Il n'y a pas de donnée");
                }
            }
        }
        if (!found) {
            console.log("Pokémon non trouvé");
        }   
    }
}

if (localStorage.getItem("poke_all")) {
    api = JSON.parse(localStorage.getItem("poke_all"));
    displayPokemonName(api);
} else {
    console.log("Il n'y a pas de donnée actuellement veuillez appuyer sur le bouton Refresh");
}

refresh();
