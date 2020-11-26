import { Router } from 'express'
import {
	createVaga,
	deleteVaga,
	editVaga,
	getAllVagas,
	getAllVagasByCNPJ,
	getVagaById
} from '../controllers/VagaController'
import { authenticateJWTToken } from '../middlewares/TokenAuth'

const router = Router()

//Routes
router.post('/', authenticateJWTToken, createVaga)
router.delete('/:idVaga', authenticateJWTToken, deleteVaga)
router.get('/:idVaga', authenticateJWTToken, getVagaById)
router.get('/', authenticateJWTToken, getAllVagas)
router.put('/:idVaga', authenticateJWTToken, editVaga)
router.get('/withcnpj/:cnpj', authenticateJWTToken, getAllVagasByCNPJ)

export default router
