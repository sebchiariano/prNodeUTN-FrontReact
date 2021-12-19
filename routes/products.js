var express = require('express');
var router = express.Router();

const productController = require("../controllers/productsController")

// pagina HOME
router.get('/', productController.getAll);
router.get('/destacados', productController.getDestacados);

// pagina Detalle Producto
router.get('/:id', productController.getById);

// pagina Nuevo Producto
router.post('/',  productController.create);

// pagina Modificacion Producto
router.put('/actualizarCantidad/:id', productController.actualizarCantidad);
router.put('/ponerDestacado/:id', productController.ponerDestacado);
router.put('/quitarDestacado/:id', productController.quitarDestacado);
//router.put('/:id', (req,res,next)=>{req.app.validateUser(req.res.next)}, productController.update);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

module.exports = router;
