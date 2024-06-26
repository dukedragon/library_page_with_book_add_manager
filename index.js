import sqliteImport from "sqlite3";
import { promisify } from "util";
const sqlite3 = sqliteImport.verbose();

export const db = new sqlite3.Database(
  "./database/db.sqlite",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      return console.error(
        err.message ?? "error en la conexion a la base de datos"
      );
    }
    console.log("conectado a la base de datos correctamente");
  }
);
const dbRun = promisify(db.run).bind(db);
const dbAll = promisify(db.all).bind(db);
const dbGet = promisify(db.get).bind(db);
//db.run(`INSERT INTO Autores ( Nombre, Nacionalidad) VALUES ('Gabriel Garcia Márquez', 'Colombiano'),('Isabel Allende', 'Chilena');`,(err)=>console.log(err?"error al insertar los datos:"+err.message:"datos agregados correctamente"))
//db.run(`INSERT INTO Categorias (Nombre)VALUES( 'Ficción'),( 'Historia');`,(err)=>console.log(err?"error al insertar los datos:"+err.message:"datos agregados correctamente"))
//db.run(`INSERT INTO Libros ( ISBN, Titulo, ID_autor, ID_categoria)VALUES( '978-3-16-148410-0', 'Cien Años de Soledad', 1, 1),( '978-0-06-088328-7', 'La Casa de los Espiritus', 2, 1);`,(err)=>console.log(err?"error al insertar los datos:"+err.message:"datos agregados correctamente"))
//db.run(`INSERT INTO Prestamos ( ISBN, ID_cliente, Fecha_Prestamo)VALUES ('978-3-16-148410-0', 1 ,'22/06/24')`,(err)=>console.log(err?"error al insertar los datos:"+err.message:"datos agregados correctamente"))
//db.run(`INSERT INTO Clientes (Nombre,Direccion,Telefono)VALUES( 'juan david', "avenida 10 con 14", "3226494906")`,(err)=>console.log(err?"error al insertar los datos:"+err.message:"datos agregados correctamente"))

async function searchBooksByAutor(AuthorName) {
  if (typeof AuthorName == "undefined" || AuthorName == null) {
    throw "error";
  }
  let SQLconsult = `SELECT L.Titulo, A.Nombre AS Autor FROM Libros L JOIN Autores A ON L.ID_autor = A.ID_autor WHERE A.Nombre = '${AuthorName.replace(
    '"',
    ""
  )}';ORDER by L.Titulo`;
  const dbAll = promisify(db.all).bind(db);
  return await dbAll(SQLconsult);
}
export async function searchBooks() {
  let SQLconsult = `
    SELECT 
      L.Titulo as titulo, 
      L.imagePath AS ruta,
      A.Nombre as autor, 
      A.Nacionalidad as nacionalidad, 
      C.Nombre as categoria 
    FROM 
      Libros L 
      JOIN Autores A ON L.ID_autor = A.ID_autor 
      JOIN Categorias C ON L.ID_categoria = C.ID_categoria 
    ORDER BY 
      L.Titulo
  `;
  const dbAll = promisify(db.all).bind(db);
  return await dbAll(SQLconsult);
}

export async function addNewBook(ISBN, titulo, autor, nacionalidad, categoria, filePath) {
  if (!ISBN || !titulo || !autor || !nacionalidad || !categoria || !filePath) {
    throw new Error("Todos los campos son obligatorios");
  }

  try {
    // Insertar autor si no existe
    const insertAutor = `
      INSERT INTO Autores (Nombre, Nacionalidad)
      SELECT ?, ?
      WHERE NOT EXISTS (SELECT 1 FROM Autores WHERE Nombre = ?);
    `;
    await dbRun(insertAutor, [autor, nacionalidad, autor]);

    // Obtener ID del autor
    const autorData = await dbGet(`SELECT ID_autor FROM Autores WHERE Nombre = ?`, [autor]);
    const autorID = autorData.ID_autor;

    // Insertar categoría si no existe
    const insertCategoria = `
      INSERT INTO Categorias (Nombre)
      SELECT ?
      WHERE NOT EXISTS (SELECT 1 FROM Categorias WHERE Nombre = ?);
    `;
    await dbRun(insertCategoria, [categoria, categoria]);

    // Obtener ID de la categoría
    const categoriaData = await dbGet(`SELECT ID_categoria FROM Categorias WHERE Nombre = ?`, [categoria]);
    const categoriaID = categoriaData.ID_categoria;

    // Insertar libro
    const insertBook = `
      INSERT INTO Libros (ISBN, Titulo, ID_autor, ID_categoria, imagePath)
      VALUES (?, ?, ?, ?, ?);
    `;
    await dbRun(insertBook, [ISBN, titulo, autorID, categoriaID, filePath]);

    console.log("Libro añadido correctamente");
    return true;
  } catch (err) {
    console.error('Error al insertar el libro:', err);
    return false;
  }
}

async function searchClientsWithLoans() {
  let SQLconsult = `SELECT DISTINCT C.ID_cliente, C.Nombre, C.Direccion, C.Telefono, L.Titulo FROM Clientes C JOIN Prestamos P ON C.ID_cliente = P.ID_cliente JOIN Libros L ON L.ISBN = P.ISBN;`;
  try {
    const dbAll = promisify(db.all).bind(db);
    return await dbAll(SQLconsult);
  } catch (error) {
    throw error;
  }
}
//db.run(`ALTER TABLE Libros ADD COLUMN imagePath VARCHAR(255);`)
//db.run(`ALTER TABLE Libros ADD COLUMN imagePath VARCHAR(100);`)
//db.run(`UPDATE Libros SET imagePath = "uploads\\soledad.png" WHERE ISBN = "978-3-16-148410-0";`)
