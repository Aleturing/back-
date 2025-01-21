const fs = require('fs');
const path = require('path');

// Estructura de carpetas y archivos
const projectStructure = {
    database: {
        files: ['db.js']
    },
    models: {
        files: [
            'Usuario.js', 
            'Administrador.js', 
            'Producto.js', 
            'Cliente.js', 
            'Proveedor.js', 
            'FacturaCompra.js', 
            'FacturaVenta.js', 
            'DetalleFactura.js', 
            'DevolucionCompra.js', 
            'DevolucionVenta.js', 
            'DetalleDevolucion.js'
        ]
    },
    controllers: {
        files: [
            'usuarioController.js', 
            'administradorController.js', 
            'productoController.js', 
            'clienteController.js', 
            'proveedorController.js', 
            'facturaCompraController.js', 
            'facturaVentaController.js', 
            'devolucionCompraController.js', 
            'devolucionVentaController.js'
        ]
    },
    routes: {
        files: [
            'index.js',
            'usuarios.js', 
            'administradores.js', 
            'productos.js', 
            'clientes.js', 
            'proveedores.js', 
            'facturasCompras.js', 
            'facturasVentas.js', 
            'devolucionesCompras.js', 
            'devolucionesVentas.js'
        ]
    },
    base: {
        files: ['app.js', 'package.json']
    }
};

// Crear carpetas y archivos
const createStructure = (structure, basePath = '.') => {
    Object.keys(structure).forEach((key) => {
        const currentPath = path.join(basePath, key);

        // Crear carpeta
        if (!fs.existsSync(currentPath)) {
            fs.mkdirSync(currentPath, { recursive: true });
            console.log(`Carpeta creada: ${currentPath}`);
        }

        // Crear archivos dentro de la carpeta
        if (structure[key].files) {
            structure[key].files.forEach((file) => {
                const filePath = path.join(currentPath, file);
                if (!fs.existsSync(filePath)) {
                    fs.writeFileSync(filePath, '', 'utf8');
                    console.log(`Archivo creado: ${filePath}`);
                }
            });
        }

        // Crear subcarpetas (si existen)
        if (structure[key].subfolders) {
            createStructure(structure[key].subfolders, currentPath);
        }
    });
};

// Ejecutar la creación de la estructura
createStructure(projectStructure);

console.log('Estructura de proyecto creada correctamente.');
