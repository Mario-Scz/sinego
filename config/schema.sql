-- USUARIOS (login.php usa: usuario, contraseña, role)
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user'
) ENGINE=InnoDB;

-- PRODUCTOS (productos.php usa: nombre, descripcion, precio, imagen, genero, creado)
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2),
    imagen VARCHAR(255),
    genero VARCHAR(50),
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- CARRITO (cart.php usa: usuario_id, producto_id, cantidad)
CREATE TABLE IF NOT EXISTS carrito (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT DEFAULT 1,
    UNIQUE KEY (usuario_id, producto_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- FAVORITOS (favorites.php usa: usuario_id, producto_id)
CREATE TABLE IF NOT EXISTS favoritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    producto_id INT NOT NULL,
    UNIQUE KEY (usuario_id, producto_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- CLIENTES (cl-add.php)
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    telefono VARCHAR(20),
    correo VARCHAR(100)
) ENGINE=InnoDB;

-- FACTURAS (fac add.php)
CREATE TABLE IF NOT EXISTS facturas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_factura VARCHAR(50),
    cliente VARCHAR(100),
    descripcion TEXT
) ENGINE=InnoDB;

-- ENVÍOS (log add.php)
CREATE TABLE IF NOT EXISTS envios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_libro VARCHAR(50),
    autor VARCHAR(100),
    tipo_envio VARCHAR(50)
) ENGINE=InnoDB;

-- IMPRENTA (imprenta.php)
CREATE TABLE IF NOT EXISTS imprenta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    unidades INT,
    paginas INT,
    tipo_impresion VARCHAR(50),
    material VARCHAR(50)
) ENGINE=InnoDB;

-- LIBROS (cat add.php)
CREATE TABLE IF NOT EXISTS libros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(50),
    autor VARCHAR(100),
    titulo VARCHAR(150),
    tipo VARCHAR(50)
) ENGINE=InnoDB;
