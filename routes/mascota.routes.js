const {Router} = require('express');
const {check} = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existenteEmail, existeMascotaById,} = require('../helpers/db-validators');

const {   mascotaDelete,mascotaPost,mascotaPut,getMascotaById, mascotaGet,
} = require('../controllers/mascota.controller');

const router = Router();

router.get("/", mascotaGet);

router.get(
    "/:id",
    [
        check("id","El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ], getMascotaById);

router.put(
    "/:id",
    [
        check("id","El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ], mascotaPut);

router.delete(
    "/:id",
        [
        check("id","El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),            validarCampos
     ], mascotaDelete);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("raza", "La raza es obligatoria"),
        check("edad","La edad es obligatoria").isLength({min: 2,}),
        check("sexo", "el sexo debe ser obligatorio"),
        validarCampos,
    ],mascotaPost);

    module.exports =router;


