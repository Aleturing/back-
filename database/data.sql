BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS "administrador" (
	"id"	INTEGER,
	"usuario_id"	INTEGER NOT NULL,
	"nivel_acceso"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("usuario_id") REFERENCES "usuario"("id")
);

CREATE TABLE IF NOT EXISTS "clientes" (
	"id"	INTEGER,
	"nombre"	TEXT NOT NULL,
	"email"	TEXT UNIQUE,
	"telefono"	TEXT,
	"direccion"	TEXT NOT NULL,
	"cedula"	TEXT,
	"rif"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "detalle_devolucion" (
	"id"	INTEGER,
	"devolucion_compra_id"	INTEGER,
	"devolucion_venta_id"	INTEGER,
	"producto_id"	INTEGER NOT NULL,
	"cantidad"	INTEGER NOT NULL,
	"motivo"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("devolucion_compra_id") REFERENCES "devolucion_compra"("id"),
	FOREIGN KEY("devolucion_venta_id") REFERENCES "devolucion_venta"("id"),
	FOREIGN KEY("producto_id") REFERENCES "productos"("id")
);

CREATE TABLE IF NOT EXISTS "detalle_factura" (
	"id"	INTEGER,
	"factura_compra_id"	INTEGER,
	"factura_venta_id"	INTEGER,
	"producto_id"	INTEGER NOT NULL,
	"cantidad"	INTEGER NOT NULL,
	"precio_unitario"	REAL NOT NULL,
	"IVA"	REAL DEFAULT 0.16,  -- Nuevo campo IVA
	"otros_impuestos"	REAL DEFAULT 0.02,  -- Nuevo campo Otros impuestos
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("factura_compra_id") REFERENCES "factura_compra"("id"),
	FOREIGN KEY("factura_venta_id") REFERENCES "factura_venta"("id"),
	FOREIGN KEY("producto_id") REFERENCES "productos"("id")
);

CREATE TABLE IF NOT EXISTS "devolucion_compra" (
	"id"	INTEGER,
	"factura_compra_id"	INTEGER NOT NULL,
	"fecha"	TEXT DEFAULT CURRENT_TIMESTAMP,
	"motivo"	TEXT NOT NULL,
	"tasa"	REAL DEFAULT 0.00,
	"anulada"	BOOLEAN DEFAULT 0,
	"detalle_devolucion_id"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("detalle_devolucion_id") REFERENCES "detalle_devolucion"("id"),
	FOREIGN KEY("factura_compra_id") REFERENCES "factura_compra"("id")
);

CREATE TABLE IF NOT EXISTS "devolucion_venta" (
	"id"	INTEGER,
	"factura_venta_id"	INTEGER NOT NULL,
	"fecha"	TEXT DEFAULT CURRENT_TIMESTAMP,
	"motivo"	TEXT NOT NULL,
	"tasa"	REAL DEFAULT 0.00,
	"anulada"	BOOLEAN DEFAULT 0,
	"detalle_devolucion_id"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("detalle_devolucion_id") REFERENCES "detalle_devolucion"("id"),
	FOREIGN KEY("factura_venta_id") REFERENCES "factura_venta"("id")
);

CREATE TABLE IF NOT EXISTS "factura_compra" (
	"id"	INTEGER,
	"proveedor_id"	INTEGER NOT NULL,
	"fecha"	TEXT DEFAULT CURRENT_TIMESTAMP,
	"total"	REAL NOT NULL,
	"usuario_id"	INTEGER NOT NULL,
	"anulada"	BOOLEAN DEFAULT 0,
	"tasa"	REAL DEFAULT 0.00,
	"detalle_factura_id"	INTEGER,
	"IVA"	REAL DEFAULT 0.16,  -- Nuevo campo IVA
	"otros_impuestos"	REAL DEFAULT 0.02,  -- Nuevo campo Otros impuestos
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("detalle_factura_id") REFERENCES "detalle_factura"("id"),
	FOREIGN KEY("proveedor_id") REFERENCES "proveedores"("id"),
	FOREIGN KEY("usuario_id") REFERENCES "usuario"("id")
);

CREATE TABLE IF NOT EXISTS "factura_venta" (
	"id"	INTEGER,
	"cliente_id"	INTEGER NOT NULL,
	"fecha"	TEXT DEFAULT CURRENT_TIMESTAMP,
	"total"	REAL NOT NULL,
	"usuario_id"	INTEGER NOT NULL,
	"anulada"	BOOLEAN DEFAULT 0,
	"tasa"	REAL DEFAULT 0.00,
	"IVA"	REAL DEFAULT 0.16,  -- Nuevo campo IVA
	"otros_impuestos"	REAL DEFAULT 0.02,  -- Nuevo campo Otros impuestos
	"detalle_factura_id"	INTEGER,
	"devolucion_venta_id"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("cliente_id") REFERENCES "clientes"("id"),
	FOREIGN KEY("detalle_factura_id") REFERENCES "detalle_factura"("id"),
	FOREIGN KEY("devolucion_venta_id") REFERENCES "devolucion_venta"("id"),
	FOREIGN KEY("usuario_id") REFERENCES "usuario"("id")
);

CREATE TABLE IF NOT EXISTS "productos" (
	"id"	INTEGER,
	"nombre"	TEXT NOT NULL,
	"descripcion"	TEXT,
	"precio"	REAL NOT NULL,
	"stock"	INTEGER NOT NULL,
	"foto"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "proveedores" (
	"id"	INTEGER,
	"nombre"	TEXT NOT NULL,
	"email"	TEXT UNIQUE,
	"telefono"	TEXT,
	"direccion"	TEXT NOT NULL,
	"cedula"	TEXT,
	"rif"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "usuario" (
	"id"	INTEGER,
	"nombre"	TEXT NOT NULL,
	"correo"	TEXT NOT NULL UNIQUE,
	"contraseña"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);

INSERT INTO "administrador" VALUES (1,1,'superadmin');
INSERT INTO "clientes" VALUES (1,'Juan Pérez','juan.perez@gmail.com','123456789','Calle Falsa 123','12345678',NULL);
INSERT INTO "clientes" VALUES (2,'María López','maria.lopez@gmail.com','987654321','Av. Principal 456','87654321',NULL);
INSERT INTO "detalle_devolucion" VALUES (1,1,NULL,1,1,'Producto roto');
INSERT INTO "detalle_devolucion" VALUES (2,NULL,1,2,1,'Error en la entrega');
INSERT INTO "detalle_factura" VALUES (1,1,NULL,1,2,1200.5,0.16,0.02);
INSERT INTO "detalle_factura" VALUES (2,NULL,1,2,1,50.99,0.16,0.02);
INSERT INTO "detalle_factura" VALUES (3,NULL,1,3,1,25.75,0.16,0.02);
INSERT INTO "detalle_factura" VALUES (4,2,NULL,3,3,25.75,0.16,0.02);
INSERT INTO "devolucion_compra" VALUES (1,1,'2024-12-30','Producto defectuoso',0.1,0,NULL);
INSERT INTO "devolucion_venta" VALUES (1,1,'2024-12-30','Cliente insatisfecho',0.1,0,NULL);
INSERT INTO "factura_compra" VALUES (1,1,'2024-12-29',500.75,1,0,0.1,NULL,0.16,0.02);
INSERT INTO "factura_compra" VALUES (2,2,'2024-12-28',800.0,1,0,0.1,NULL,0.16,0.02);
INSERT INTO "factura_venta" VALUES (1,1,'2024-12-29',1500.0,2,0,0.1,NULL,NULL,0.16,0.02);
INSERT INTO "factura_venta" VALUES (2,2,'2024-12-28',250.0,3,0,0.1,NULL,NULL,0.16,0.02);
INSERT INTO "productos" VALUES (1,'Laptop','Laptop de alta gama',1200.5,10,'laptop.jpg');
INSERT INTO "productos" VALUES (2,'Teclado','Teclado mecánico',50.99,100,'teclado.jpg');
INSERT INTO "productos" VALUES (3,'Mouse','Mouse inalámbrico',25.75,200,'mouse.jpg');
INSERT INTO "proveedores" VALUES (1,'Proveedor A','contacto@proveedora.com','123123123','Zona Industrial A',NULL,'J-12345678-9');
INSERT INTO "proveedores" VALUES (2,'Proveedor B','contacto@proveedorb.com','321321321','Zona Industrial B',NULL,'J-98765432-1');
INSERT INTO "usuario" VALUES (1,'Administrador','admin@sistema.com','admin123');
INSERT INTO "usuario" VALUES (2,'Usuario1','usuario1@sistema.com','password1');
INSERT INTO "usuario" VALUES (3,'Usuario2','usuario2@sistema.com','password2');

COMMIT;
