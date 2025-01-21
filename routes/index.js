const express = require("express");
const router = express.Router();




const productosRoutes = require("./productos");


router.use("/productos", productosRoutes);



const clienteRoutes = require("./clientes");


router.use("/clientes", clienteRoutes);


const administradoresRoutes = require("./administradores");


router.use("/administradores", administradoresRoutes);


const devolucionesComprasRoutes = require("./devolucionesCompras");


router.use("/devolucionesCompras", devolucionesComprasRoutes);


const devolucionesVentasRoutes = require("./devolucionesVentas");


router.use("/devolucionesVentas", devolucionesVentasRoutes);



const facturasComprasRoutes = require("./facturasCompras");


router.use("/facturasCompras", facturasComprasRoutes);


const facturasVentasRoutes = require("./facturasVentas");


router.use("/facturasVentas", facturasVentasRoutes);


const proveedoresRoutes = require("./proveedores");


router.use("/proveedores", proveedoresRoutes);


const usuariosRoutes = require("./usuarios");


router.use("/usuarios", usuariosRoutes);


const detalleFacturaRoutes = require("./detalleFactura");


router.use("/detalleFactura", detalleFacturaRoutes);


router.get("/", (req, res) => {
  res.send("Bienvenido a la API. El servidor está funcionando correctamente.");
});

module.exports = router;
