CREATE TABLE Autores (
    ID_autor INT PRIMARY KEY AUTOINCREMENT,
    Nombre VARCHAR(255) NOT NULL,
    Nacionalidad VARCHAR(255) NOT NULL
);

CREATE TABLE Categorias (
    ID_categoria INTEGER PRIMARY KEY AUTOINCREMENT,
    Nombre TEXT NOT NULL
);

CREATE TABLE Clientes (
    ID_cliente INT PRIMARY KEY AUTOINCREMENT,
    Nombre VARCHAR(255) NOT NULL,
    Direccion VARCHAR(255) NOT NULL,
    Telefono VARCHAR(50) NOT NULL
);

CREATE TABLE Libros (
    ISBN VARCHAR(13) PRIMARY KEY,
    Título VARCHAR(255) NOT NULL,
    ID_autor INT NOT NULL,
    ID_categoria INT NOT NULL,
    FOREIGN KEY (ID_autor) REFERENCES Autores(ID_autor),
    FOREIGN KEY (ID_categoria) REFERENCES Categorías(ID_categoria)
);

CREATE TABLE Prestamos (
    ISBN VARCHAR(13) NOT NULL,
    ID_cliente INT NOT NULL,
    Fecha_Prestamo DATE NOT NULL,
    Fecha_Devolucion DATE ,
    FOREIGN KEY (ISBN) REFERENCES Libros(ISBN),
    FOREIGN KEY (ID_cliente) REFERENCES Clientes(ID_cliente)
);
