-- Esquema de base de datos para Sinego
-- Ejecútalo con mysql o phpMyAdmin para crear las tablas necesarias

CREATE DATABASE IF NOT EXISTS sinego CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sinego;

-- tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    nombre VARCHAR(100) DEFAULT NULL,
    email VARCHAR(100) DEFAULT NULL,
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT DEFAULT NULL,
    precio DECIMAL(10,2) NOT NULL DEFAULT 0,
    imagen VARCHAR(255) DEFAULT NULL,
    genero VARCHAR(50) DEFAULT NULL,
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- tabla de carrito, cada fila representa un producto dentro del carrito de un usuario
CREATE TABLE IF NOT EXISTS carrito (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY (usuario_id, producto_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- tabla de favoritos
CREATE TABLE IF NOT EXISTS favoritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    producto_id INT NOT NULL,
    agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY (usuario_id, producto_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
) ENGINE=InnoDB;
