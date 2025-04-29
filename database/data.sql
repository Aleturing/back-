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
	"IVA"	REAL DEFAULT 0.16,  --   IVA
	"otros_impuestos"	REAL DEFAULT 0.02,  --   Otros impuestos
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
	"IVA"	REAL DEFAULT 0.16,  --  IVA
	"otros_impuestos"	REAL DEFAULT 0.02,  --  Otros impuestos
	"IGTF"	REAL DEFAULT 0.03,  --  IGTF
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
	"IVA"	REAL DEFAULT 0.16,  -- IVA
	"otros_impuestos"	REAL DEFAULT 0.02,  -- Otros impuestos
	"IGTF"	REAL DEFAULT 0.03,  -- IGTF
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

-- Inserciones
INSERT INTO "factura_compra" VALUES (1,1,'2024-12-29',500.75,1,0,0.1,NULL,0.16,0.02,0.03); -- con IGTF
INSERT INTO "factura_venta" VALUES (1,1,'2024-12-29',1500.0,2,0,0.1,NULL,NULL,0.16,0.02,0.03); -- con IGTF

COMMIT;
