CREATE DATABASE BASE_DATOS;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    password VARCHAR(200) NOT NULL,
    rol VARCHAR(20) CHECK (rol IN ('admin', 'user')) DEFAULT 'user'
);

CREATE TABLE Producto(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    num_products INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE transaccion(
    id SERIAL PRIMARY KEY,
    id_producto integer REFERENCES Producto(id),
    id_user integer REFERENCES Users(id),
    cantidad INTEGER NOT NULL default 1,
    fecha TIMESTAMP NOT NULL DEFAULT current_timestamp
);


INSERT INTO Producto (name, price, num_products) VALUES
    ('anillo', 14.95, 80);
    ('pulsera', 19.95, 40),
