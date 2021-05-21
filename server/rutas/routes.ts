import { Router } from 'express';
import multer from 'multer';
import { getProspecto, getProspectos, postProspectos, evaluarProspecto} from '../controladores/routes.controller';
import { FileHandler } from '../middlewares/filesHandler';
import { validarMongoID, validarObservaciones, validarParametros } from '../middlewares/verifyParameters';
const router = Router();
const upload = multer();

router.get('/prospectos', getProspectos);

router.get('/prospecto/:id', [
    validarMongoID
], getProspecto);

router.post('/prospecto', [
    upload.any(),
    validarParametros,
    FileHandler
], postProspectos);


router.put('/prospecto/evaluar/:id', [
    validarMongoID,
    validarObservaciones
], evaluarProspecto)

export default router;