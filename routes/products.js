var express = require('express');
var router = express.Router();

const productController = require("../controllers/productsController")

// pagina HOME
router.get('/destacados', productController.getDestacados);

// pagina Detalle Producto
router.get('/:id', productController.getById);

// pagina Nuevo Producto
router.post('/',  productController.create);

// pagina Modificacion Producto
router.put('/ponerDestacado/:id', productController.ponerDestacado);
router.put('/quitarDestacado/:id', productController.quitarDestacado);
router.put('/:id', (req,res,next)=>{req.app.validateUser(req.res.next)}, productController.update);
router.delete('/:id', (req,res,next)=>{req.app.validateUser(req.res.next)}, productController.delete);

module.exports = router;
