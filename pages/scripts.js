document.addEventListener("DOMContentLoaded", function () {

  // Seleccionamos el div con id "libros"
  const librosDiv = document.getElementById("libros");

  fetch("http://localhost:3000/libros", {
    method: "POST"
  })
    .then(response => response.json())
    .then(data => {
      // Limpiamos el contenido actual del div libros
      librosDiv.innerHTML = "";

      // Iteramos sobre los libros recibidos y los agregamos al HTML
      data.data.forEach((libro,index) => {
        const bookContainer = document.createElement("div");
        bookContainer.tabIndex = index+1
        bookContainer.setAttribute('role', 'listitem');
        bookContainer.classList.add('book-container');  // Añadimos una clase para el estilo
        
        // Creamos un contenedor para la imagen y establecemos sus atributos
        const imgContainer = document.createElement("div");
        imgContainer.classList.add('book-image');  // Añadimos una clase para el estilo
        
        // Creamos un elemento de imagen y establecemos sus atributos
        const img = document.createElement("img");
        img.src = "../"+libro.ruta;  // Asignamos la ruta de la imagen - la modificacion de la ruta es por el orden de las carpetas q no queria actualizar la ruta en la base de datos xd
        img.alt = libro.titulo;  // Texto alternativo para la imagen
        img.setAttribute('role', 'presentation');  // Indicamos que es una presentación visual
        
        // Creamos el overlay que contendrá los detalles adicionales
        const overlay = document.createElement("div");
        overlay.classList.add('overlay');
        
        // Añadimos los datos del libro al overlay
        const author = document.createElement("p");
        author.textContent = `Autor: ${libro.autor}`;
        
        const nationality = document.createElement("p");
        nationality.textContent = `Nacionalidad: ${libro.nacionalidad}`;
        
        const category = document.createElement("p");
        category.textContent = `Categoría: ${libro.categoria}`;
        
        overlay.appendChild(author);
        overlay.appendChild(nationality);
        overlay.appendChild(category);
        
        // Añadimos la imagen y el overlay al contenedor de la imagen
        imgContainer.appendChild(img);
        imgContainer.appendChild(overlay);
        
        // Creamos un elemento de título y establecemos su contenido
        const titulo = document.createElement("h3");
        titulo.textContent = libro.titulo;  // Asignamos el título del libro
        titulo.setAttribute('role', 'heading');
        titulo.setAttribute('aria-level', '3');  // Nivel del encabezado
        titulo.classList.add('book-title');  // Añadimos una clase para el estilo

        // Añadimos etiquetas ARIA para describir la imagen y el título
        bookContainer.setAttribute('aria-label', `${libro.titulo}, imagen`);
        
        // Añadimos el contenedor de la imagen y el título al contenedor del libro
        bookContainer.appendChild(imgContainer);
        bookContainer.appendChild(titulo);

        // Añadimos el contenedor del libro al div libros
        librosDiv.appendChild(bookContainer);
      });
    })
    .catch(error => {
      console.error("Error al obtener libros:", error);
    });
});

document.getElementById("book-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const isbnInput = document.getElementById("ISBN");
    const isbnValue = isbnInput.value;

    // Validar que el ISBN tenga exactamente 13 dígitos
    if (!/^\d{13}$/.test(isbnValue)) {
        alert("El ISBN debe tener exactamente 13 dígitos");
        return;  // No enviar el formulario
    }
    let formData = new FormData();
    formData.append("ISBN", document.getElementById("ISBN").value);
    formData.append("title", document.getElementById("title").value);
    formData.append("author", document.getElementById("author").value);
    formData.append("nacionalidad", document.getElementById("nacionalidad").value);
    formData.append("categoria", document.getElementById("categoria").value);
    formData.append("image", document.getElementById("image").files[0]);
  
    // Enviar datos al servidor
    fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          alert("Libro añadido correctamente");
        } else {
          alert("Error al añadir el libro.");
        }
      })
      .catch((error) => console.error("Error:", error));
});


