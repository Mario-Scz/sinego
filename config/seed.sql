-- Datos de ejemplo para Sinego
USE sinego;

INSERT INTO usuarios (usuario, contraseña, nombre, email) VALUES
('admin', '$2y$10$...........................................', 'Administrador', 'admin@sinego.com');

INSERT INTO productos (nombre, descripcion, precio, imagen, genero) VALUES
('Libro Ejemplo A', 'Descripción ejemplo A', 25.99, '../img/ejemplos.png', 'Comedia'),
('Libro Ejemplo B', 'Descripción ejemplo B', 32.50, '../img/ejemplos.png', 'Drama'),
('Libro Ejemplo C', 'Descripción ejemplo C', 28.75, '../img/ejemplos.png', 'Terror');

-- Nota: reemplaza la contraseña hasheada por password_hash('tu_password', PASSWORD_DEFAULT) en PHP
