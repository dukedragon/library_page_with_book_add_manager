import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import {addNewBook,searchBooks} from "./index.js"
const app = express();
const port = 3000;

// Middleware para permitir CORS
app.use(cors());

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(bodyParser.json());

// Middleware para parsear el cuerpo de las solicitudes con datos codificados en formato URL
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de multer para manejar la subida de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // Directorio donde se guardarán los archivos subidos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre del archivo en el servidor
  }
});

const upload = multer({ storage: storage });

// Ruta para manejar los datos del formulario
app.post('/upload', upload.single('image'), (req, res) => {
  console.log("Solicitud POST recibida en /upload");

  // Acceder a los datos del formulario
  const ISBN = req.body.ISBN;
  const title = req.body.title;
  const author = req.body.author;
  const Nacionalidad = req.body.nacionalidad;
  const categoria = req.body.categoria;
  const image = req.file; // Acceder al archivo de imagen, multer lo guarda en req.file
  let ressql = addNewBook(ISBN,title,author,Nacionalidad,categoria,image.path)
  console.log("se agreg",ressql)
  console.log("Datos recibidos:");
  console.log("Título:", title);
  console.log("Autor:", author);
  console.log("Imagen:", image);
  
  // Aquí puedes manejar los datos recibidos, por ejemplo, guardar en la base de datos

  res.json({ success: true, message: 'Libro añadido correctamente' });
});
app.post('/libros', upload.single('image'), async (req, res) => {
  //console.log("Solicitud POST recibida en /upload");
  let resBooks = await searchBooks()
  // Acceder a los datos del formulario
  
  // Aquí puedes manejar los datos recibidos, por ejemplo, guardar en la base de datos

  res.json({ success: true, message: 'Libro añadido correctamente', data: resBooks });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
