const params = new URLSearchParams(window.location.search); // Obtiene los parámetros de la URL
const nombreURL = params.get("personaje"); //saca el valor de "personaje" desde la URL


const container = document.getElementById("caracteristicas");
const spinnerContainer = document.querySelector(".spinner-container");


 new Promise((resolve, reject) => {
    const personajeGuardado = localStorage.getItem("personajeSeleccionado"); //Recupera el personaje guardado en el navegador


    if (!personajeGuardado) {
      reject("No se encontró ningún personaje en localStorage.");
    }

    const personaje =JSON.parse(personajeGuardado); // Lo convierte de texto a objeto

    setTimeout(() => resolve(personaje), 1000);
  })

  .then(personaje => {
     spinner.style.display ="none";
     spinnerContainer.style.display ="none";

    container.innerHTML = `
      <div class="informacionCompleta display_center">
        <div class="borde_carta display_center">
          <h1 class="font_harry color_potter shadow">${personaje.name}</h1>
        </div>
        <div class="foto_card display_center">
          <img class="tamaño_fotos" src="${personaje.image || 'assets/images/noimage.jpg'}" alt="${personaje.name}">
        </div>
        <table class="tabla-personaje">
          <tbody>
            <tr><td><strong>Species:</strong></td><td>${personaje.species}</td></tr>
            <tr><td><strong>House:</strong></td><td>${personaje.house || 'Doesnt have a house'}</td></tr>
            <tr><td><strong>State:</strong></td><td>${personaje.alive ? 'Alive' : 'Dead'}</td></tr>
            <tr><td><strong>Gender:</strong></td><td>${personaje.gender || 'Unknown'}</td></tr>
            <tr><td><strong>Year of birth:</strong></td><td>${personaje.dateOfBirth || 'Unknown'}</td></tr>
            <tr><td><strong>Wizard:</strong></td><td>${personaje.wizard ? 'Yes' : 'No'}</td></tr>
            <tr><td><strong>Ancestry:</strong></td><td>${personaje.ancestry || 'No specified'}</td></tr>
            <tr><td><strong>Eye Color:</strong></td><td>${personaje.eyeColour || 'Unknown'}</td></tr>
            <tr><td><strong>Hair Color:</strong></td><td>${personaje.hairColour || 'Unknown'}</td></tr>
            <tr>
              <td><strong>Wand:</strong></td>
              <td>
                Wood: ${personaje.wand?.wood || 'Unknown'}<br>
                Core: ${personaje.wand?.core || 'Unoknown'}<br>
                Length: ${personaje.wand?.length || 'Unknown'} ""
              </td>
            </tr>
            <tr><td><strong>Patronus:</strong></td><td>${personaje.patronus || 'Doesnt have'}</td></tr>
            <tr><td><strong>Student in Hogwarts:</strong></td><td>${personaje.hogwartsStudent ? 'Yes' : 'No'}</td></tr>
            <tr><td><strong>Hogwarts Staff:</strong></td><td>${personaje.hogwartsStaff ? 'Yes' : 'No'}</td></tr>
            <tr><td><strong>Actor/Actress:</strong></td><td>${personaje.actor || 'No Available'}</td></tr>
            <tr>
              <td colspan="2" style="text-align: center;">
                <a href="harryWiki.html">
                  <button class="boton_volver_card mouse boton letra boton_volver bold border maroon" >Volver</button>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    `;
  })
  .catch(error =>{
     spinner.style.display = "none";
     spinnerContainer.style.display = "none";
    container.innerHTML = `<p>Error: ${error}</p>`;
  });


const spinAnimation = spinner.animate([
  { transform: "rotate(0deg)" },
  { transform: "rotate(360deg)" }
], {
  duration:1000,
  iterations:Infinity
});

 spinAnimation.play();  
 
