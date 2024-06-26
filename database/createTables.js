import sqliteImport from "sqlite3";
const sqlite3 = sqliteImport.verbose();

export const db = new sqlite3.Database(
  "./db.sqlite",
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

let DDL_Autores_sentence = `CREATE TABLE Autores (ID_autor INTEGER PRIMARY KEY AUTOINCREMENT,Nombre VARCHAR(255) NOT NULL,Nacionalidad VARCHAR(255) NOT NULL,imagePath VARCHAR(255))`;
let DDL_Categorias_sentence = `CREATE TABLE Categorias (ID_categoria INTEGER PRIMARY KEY AUTOINCREMENT,Nombre TEXT NOT NULL)`;
let DDL_Clientes_sentence = `CREATE TABLE Clientes (ID_cliente INTEGER PRIMARY KEY AUTOINCREMENT,Nombre VARCHAR(255) NOT NULL,Direccion VARCHAR(255) NOT NULL,Telefono VARCHAR(50) NOT NULL)`;
let DDL_Libros_sentence = `CREATE TABLE Libros (ISBN VARCHAR(13) PRIMARY KEY,Titulo VARCHAR(255) NOT NULL,ID_autor INT NOT NULL,ID_categoria INT NOT NULL,FOREIGN KEY (ID_autor) REFERENCES Autores(ID_autor),    FOREIGN KEY (ID_categoria) REFERENCES Categorias(ID_categoria))`;
let DDL_Prestamos_sentence = `CREATE TABLE Prestamos (ISBN VARCHAR(13) NOT NULL,ID_cliente INT NOT NULL,Fecha_Prestamo DATE NOT NULL,Fecha_Devolucion DATE ,FOREIGN KEY (ISBN) REFERENCES Libros(ISBN),FOREIGN KEY (ID_cliente) REFERENCES Clientes(ID_cliente))`;
db.run(DDL_Categorias_sentence, (err) => {
  if (err) {
    return console.error("error al crear la tabla: " + err.message);
  }
  console.log("tabla Categorias creada");
});
db.run(DDL_Clientes_sentence, (err) => {
  if (err) {
    return console.error("error al crear la tabla: " + err.message);
  }
  console.log("tabla Clientes creada");
});
db.run(DDL_Libros_sentence, (err) => {
  if (err) {
    return console.error("error al crear la tabla: " + err.message);
  }
  console.log("tabla Libros creada");
});
db.run(DDL_Prestamos_sentence, (err) => {
  if (err) {
    return console.error("error al crear la tabla: " + err.message);
  }
  console.log("tabla Prestamos creada");
});
db.run(DDL_Autores_sentence, (err) => {
  if (err) {
    return console.error("error al crear la tabla: " + err.message);
  }
  console.log("tabla Autores creada");
});
