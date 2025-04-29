const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'papeleria.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
        return;
    }
    console.log('Conexión exitosa a la base de datos SQLite.');
});

db.serialize(() => {
    db.exec(
        `
        PRAGMA foreign_keys = OFF;
        BEGIN TRANSACTION;
        
        DROP TABLE IF EXISTS administrador;
        DROP TABLE IF EXISTS clientes;
        DROP TABLE IF EXISTS detalle_devolucion;
        DROP TABLE IF EXISTS detalle_factura;
        DROP TABLE IF EXISTS devolucion_compra;
        DROP TABLE IF EXISTS devolucion_venta;
        DROP TABLE IF EXISTS factura_compra;
        DROP TABLE IF EXISTS factura_venta;
        DROP TABLE IF EXISTS productos;
        DROP TABLE IF EXISTS proveedores;
        DROP TABLE IF EXISTS usuario;
        
        CREATE TABLE administrador (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario_id INTEGER NOT NULL,
            nivel_acceso TEXT NOT NULL,
            FOREIGN KEY(usuario_id) REFERENCES usuario(id)
        );

        CREATE TABLE clientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            email TEXT UNIQUE,
            telefono TEXT,
            direccion TEXT NOT NULL,
            cedula TEXT,
            rif TEXT
        );

        CREATE TABLE detalle_devolucion (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            devolucion_compra_id INTEGER,
            devolucion_venta_id INTEGER,
            producto_id INTEGER NOT NULL,
            cantidad INTEGER NOT NULL,
            motivo TEXT NOT NULL,
            FOREIGN KEY(devolucion_compra_id) REFERENCES devolucion_compra(id),
            FOREIGN KEY(devolucion_venta_id) REFERENCES devolucion_venta(id),
            FOREIGN KEY(producto_id) REFERENCES productos(id)
        );

        CREATE TABLE detalle_factura (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            factura_compra_id INTEGER,
            factura_venta_id INTEGER,
            producto_id INTEGER NOT NULL,
            cantidad INTEGER NOT NULL,
            precio_unitario REAL NOT NULL,
            IVA REAL DEFAULT 0.16,
            otros_impuestos REAL DEFAULT 0.02,
            FOREIGN KEY(factura_compra_id) REFERENCES factura_compra(id),
            FOREIGN KEY(factura_venta_id) REFERENCES factura_venta(id),
            FOREIGN KEY(producto_id) REFERENCES productos(id)
        );

        CREATE TABLE devolucion_compra (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            factura_compra_id INTEGER NOT NULL,
            fecha TEXT DEFAULT CURRENT_TIMESTAMP,
            motivo TEXT NOT NULL,
            tasa REAL DEFAULT 0.00,
            anulada BOOLEAN DEFAULT 0,
            detalle_devolucion_id INTEGER,
            FOREIGN KEY(detalle_devolucion_id) REFERENCES detalle_devolucion(id),
            FOREIGN KEY(factura_compra_id) REFERENCES factura_compra(id)
        );

        CREATE TABLE devolucion_venta (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            factura_venta_id INTEGER NOT NULL,
            fecha TEXT DEFAULT CURRENT_TIMESTAMP,
            motivo TEXT NOT NULL,
            tasa REAL DEFAULT 0.00,
            anulada BOOLEAN DEFAULT 0,
            detalle_devolucion_id INTEGER,
            FOREIGN KEY(detalle_devolucion_id) REFERENCES detalle_devolucion(id),
            FOREIGN KEY(factura_venta_id) REFERENCES factura_venta(id)
        );

        CREATE TABLE factura_compra (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            proveedor_id INTEGER NOT NULL,
            fecha TEXT DEFAULT CURRENT_TIMESTAMP,
            total REAL NOT NULL,
            usuario_id INTEGER NOT NULL,
            anulada BOOLEAN DEFAULT 0,
            tasa REAL DEFAULT 0.00,
            detalle_factura_id INTEGER,
            IVA REAL DEFAULT 0.16,
            otros_impuestos REAL DEFAULT 0.02,
            FOREIGN KEY(detalle_factura_id) REFERENCES detalle_factura(id),
            FOREIGN KEY(proveedor_id) REFERENCES proveedores(id),
            FOREIGN KEY(usuario_id) REFERENCES usuario(id)
        );

        CREATE TABLE factura_venta (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cliente_id INTEGER NOT NULL,
            fecha TEXT DEFAULT CURRENT_TIMESTAMP,
            total REAL NOT NULL,
            usuario_id INTEGER NOT NULL,
            anulada BOOLEAN DEFAULT 0,
            tasa REAL DEFAULT 0.00,
            IVA REAL DEFAULT 0.16,
            otros_impuestos REAL DEFAULT 0.02,
            detalle_factura_id INTEGER,
            devolucion_venta_id INTEGER,
            FOREIGN KEY(cliente_id) REFERENCES clientes(id),
            FOREIGN KEY(detalle_factura_id) REFERENCES detalle_factura(id),
            FOREIGN KEY(devolucion_venta_id) REFERENCES devolucion_venta(id),
            FOREIGN KEY(usuario_id) REFERENCES usuario(id)
        );

        CREATE TABLE productos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            descripcion TEXT,
            precio REAL NOT NULL,
            stock INTEGER NOT NULL,
            foto TEXT
        );

        CREATE TABLE proveedores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            email TEXT UNIQUE,
            telefono TEXT,
            direccion TEXT NOT NULL,
            cedula TEXT,
            rif TEXT
        );

        CREATE TABLE usuario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            correo TEXT NOT NULL UNIQUE,
            contraseña TEXT NOT NULL
        );

        INSERT INTO usuario (nombre, correo, contraseña) VALUES 
        ('Administrador', 'admin@sistema.com', 'admin123'),
        ('Usuario1', 'usuario1@sistema.com', 'password1'),
        ('Usuario2', 'usuario2@sistema.com', 'password2');

        INSERT INTO clientes (nombre, email, telefono, direccion, cedula, rif) VALUES 
        ('Juan Pérez', 'juan.perez@gmail.com', '123456789', 'Calle Falsa 123', '12345678', NULL),
        ('María López', 'maria.lopez@gmail.com', '987654321', 'Av. Principal 456', '87654321', NULL);

        INSERT INTO productos (nombre, descripcion, precio, stock, foto) VALUES 
        ('Laptop', 'Laptop de alta gama', 1200.5, 10, 'laptop.jpg'),
        ('Teclado', 'Teclado mecánico', 50.99, 100, 'teclado.jpg'),
        ('Mouse', 'Mouse inalámbrico', 25.75, 200, 'mouse.jpg');

        INSERT INTO proveedores (nombre, email, telefono, direccion, cedula, rif) VALUES 
        ('Proveedor A', 'contacto@proveedora.com', '123123123', 'Zona Industrial A', NULL, 'J-12345678-9'),
        ('Proveedor B', 'contacto@proveedorb.com', '321321321', 'Zona Industrial B', NULL, 'J-98765432-1');

        COMMIT;
        PRAGMA foreign_keys = ON;
        `,
        (err) => {
            if (err) {
                console.error("Error al ejecutar script SQL:", err.message);
            } else {
                console.log("Base de datos eliminada y recreada exitosamente.");
            }
        }
    );
});

db.close((err) => {
    if (err) {
        console.error("Error al cerrar la conexión con la base de datos:", err.message);
    } else {
        console.log("Conexión con la base de datos cerrada.");
    }
});
