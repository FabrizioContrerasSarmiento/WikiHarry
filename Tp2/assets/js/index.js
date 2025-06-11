
const myLocalData=new URL("https://hp-api.onrender.com/api/characters")
const myApi=fetch(myLocalData);

const spinner =document.getElementById("spinner");
const spinnerContainer =document.querySelector(".spinner-container");
document.getElementById("btn-ver-mas").addEventListener("click", cards15);

    myApi
    .then(response/*parametro*/ => {
        if (!response.ok) {
        throw new Error("Error al cargar la API. Estado: " + response.status);
        }
        return response.json();
    })
    .then(data=>{
        dataOriginal = data;
        dataOriginal2= data;
        createContent(data)

        document.getElementById("contenedor-error").style.display = "none";

    })
    .catch(err => { 
        console.log (err)
        showError("Ocurrió un error al cargar los personajes. Intenta nuevamente más tarde.");

    });

    let currentIndex = 0;
    let contenidoActual = [];

    function createContent(content) {
        const container = document.getElementById("mi-container");
        contenidoActual = content;
        currentIndex = 0;
        container.innerHTML = ""; 

        document.getElementById("btn-ver-mas").style.display = (content.length > 15) ? "block" : "none";
        cards15();
    }

    function crearCard(article) {
        const card = document.createElement("div");
        card.className = "card display_center";
        card.innerHTML = `
            <div class="amarillo carta_personaje">
                <div class="display_center">
                    <img class="tamaño_fotos" src="${article.image ? article.image : "assets/images/noimage.jpg"}" alt="${article.name}">
                </div>
                <h2 class="l_height font_harry color_potter nombre shadow">${article.name}</h2>
                <p class="l_height letra">Specie: ${article.species}</p>
                <p class="l_height letra">House: ${article.house || "Sin casa"}</p>
                <p class="l_height letra">State: ${article.alive ? "Alive" : "♰ Dead"}</p>
                <div class="l_height display_flex botones_posicion">
                    <button class="botones_info mouse boton letra bold border maroon ">Más información</button>
                </div>
            </div> 
        `;

        const boton = card.querySelector(".botones_info");
        boton.addEventListener("click", () => {
            localStorage.setItem("personajeSeleccionado", JSON.stringify(article));
            const nombreURL = article.name.replace(/\s+/g, '');
            window.location.href = `personajesInfo.html?personaje=${nombreURL}`;
        });

        return card;
    }

    function mostrarFiltrados(lista) {
        const container = document.getElementById("mi-container");
        const boton_mas = document.getElementById("btn-ver-mas");

        container.innerHTML = ""; 
        boton_mas.style.display = "none"; 

        for (const article of lista) {
            const card = crearCard(article);
            container.appendChild(card);
        }
    }

    function cards15() {
        if (isSearching) return; // si se usa el buscador no mostrar mas tarjetas

        const container = document.getElementById("mi-container");
        const boton_mas = document.getElementById("btn-ver-mas");

        const nextItems = contenidoActual.slice(currentIndex, currentIndex + 15); // se xtrae desde currentIndex hasta currentIndex + 15

        setTimeout(() => {
            if (currentIndex === 0) {
                container.innerHTML = "";
            }

            for (const article of nextItems) {
                const card = crearCard(article);
                container.appendChild(card);
            }

            currentIndex += 15;

            if (currentIndex >= contenidoActual.length) {
                boton_mas.style.display = "none";
            } else {
                boton_mas.style.display = "block";
            }

            spinAnimation.cancel(); 
            spinnerContainer.style.display = "none";
            spinner.style.display = "none"; 

        }, 1000);
    }

    

    function showError(message) {
    spinnerContainer.style.display = "none";
    spinner.style.display = "none";

    // Ocultar el contenedor principal con los personajes (si existe)
    const container = document.getElementById("mi-container");
    if(container) container.style.display = "none";

    // Mostrar contenedor de error
    const contenedorError = document.getElementById("contenedor-error");
    contenedorError.style.display = "flex";

}

    /*-------------Buscador filtro -----------*/

    const buscador = document.getElementById("buscador");

    let dataOriginal = []; 
    let isSearching = false; 

    buscador.addEventListener("input", () => { // el evento input se usa cada vez que el usuario escribe o borra algo dentro del campo de búsqueda
        const texto = buscador.value.toLowerCase();
        
        if (texto === "") { // si se borra el texto
            isSearching = false;
            createContent(dataOriginal);
        } else { // si esta escribiendo 
            isSearching = true;
            const filtrados = dataOriginal.filter(personaje =>
                personaje.name.toLowerCase().includes(texto)
            ); // mostramos
            mostrarFiltrados(filtrados);
        }
    });

    /*-------------Casas Filtro-----------*/

    const selectCasa =document.getElementById("filtroCasa");

    let dataOriginal2 = []; 

    selectCasa.addEventListener("change",()=>{
        const seleccion =selectCasa.value;

        if (seleccion ==="todos") {
            createContent(dataOriginal2);
        } else {
            const filtrados =dataOriginal2.filter(elegirPersonaje => elegirPersonaje.house === seleccion);
            createContent(filtrados);
        }
    });

    /*-------------Animation Spinner-----------*/

    const spinAnimation = spinner.animate([
        { transform: "rotate(0deg)" },
        { transform: "rotate(360deg)" }
    ], {
        duration: 1000,
        iterations: Infinity
    });

    spinAnimation.play(); 


    const halo = document.querySelector('.halo');

    document.addEventListener('mousemove', (e) => {
       halo.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    });
