-- inserts

INSERT INTO Autores ( Nombre, Nacionalidad)
VALUES
('Gabriel García Márquez', 'Colombiano'),
('Isabel Allende', 'Chilena');

INSERT INTO Clientes (Nombre,Direccion,Telefono)
VALUES
( 'juan david', "avenida 10 con 14", "3226494906")

INSERT INTO Categorias (Nombre)
VALUES
( 'Ficción'),
( 'Historia');

INSERT INTO Libros ( ISBN, Titulo, ID_autor, ID_categoria)
VALUES
( '978-3-16-148410-0', 'Cien Años de Soledad', 1, 1),
( '978-0-06-088328-7', 'La Casa de los Espíritus', 2, 1);

INSERT INTO Prestamos ( ISBN, ID_cliente, Fecha_Prestamo)
VALUES ('978-3-16-148410-0', 1 ,'22/06/24')

-- updates

UPDATE Authors
SET Name = 'Gabriel García Márquez Macondo'
WHERE AuthorID = 1;

UPDATE Books
SET Title = 'Cien Años de Soledad (Edición Especial)'
WHERE BookID = 1;

UPDATE Prestamos
SET Fecha_Devolucion = '22/06/24'
WHERE ISBN = "978-3-16-148410-0";

-- deletes

DELETE FROM Autores
WHERE AuthorID = 2;

DELETE FROM Libros
WHERE ISBN = "978-3-16-148410-0";

-- scripts
-- crear tabla nueva
CREATE TABLE Empleados (
    ID_editorial INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    Pais VARCHAR(100)
);
-- insertar nuevas categorias
INSERT INTO Categorias (Nombre)
VALUES
( 'Ficción'),
( 'Historia');
-- scripts sql casuales

-- devolver toda la tabla libros
SELECT * FROM Libros;
-- ordenar libros por categoria
SELECT L.ISBN AS ISBN_ID, L.Titulo, C.Nombre AS CategoriaNombre
FROM Libros L
JOIN Categorias C ON L.ID_categoria = C.ID_categoria
WHERE C.Nombre = 'Historia';
-- ordenar libros por autor Gabriel García Márquez
SELECT L.Titulo, A.Nombre AS Autor
FROM Libros L
JOIN Autores A ON L.ID_autor = A.ID_autor
WHERE A.Nombre = 'Gabriel García Márquez';
ORDER by L.Titulo
-- ordenar libros prestados por fecha 
SELECT Pr.ISBN AS libroID, L.Titulo, Pr.Fecha_prestamo
FROM Prestamos Pr
JOIN Libros L ON L.ISBN = Pr.ISBN
ORDER BY Pr.Fecha_prestamo;
-- ordenar clientes que pidieron libros prestados (una fila por cliente)
SELECT DISTINCT C.ID_cliente, C.Nombre, C.Direccion, C.Telefono, L.Titulo
FROM Clientes C
JOIN Prestamos P ON C.ID_cliente = P.ID_cliente;
JOIN Libros L ON L.ISBN = P.IBSN;
-- listar todos los libros que estan prestados por el momento
SELECT L.Titulo, C.Nombre AS Cliente, Pr.Fecha_prestamo, Pr.Fecha_devolucion
FROM Prestamos Pr
JOIN Libros L ON Pr.ISBN = L.ISBN
JOIN Clientes C ON Pr.ID_cliente = C.ID_cliente
WHERE Pr.Fecha_devolucion IS NULL
ORDER BY Pr.Fecha_prestamo;
