import { Router } from 'express'
import {
	create,
	deleteEmpresa,
	editEmpresa,
	getAllEmpresas,
	getEmpresa,
	login
} from '../controllers/EmpresaController'
import { authenticateJWTToken } from '../middlewares/TokenAuth'

const router = Router()

// Routes
router.post('/register/', create)
router.post('/login/', login)
router.get('/:email', authenticateJWTToken, getEmpresa)
router.delete('/:email', authenticateJWTToken, deleteEmpresa)
router.get('/', authenticateJWTToken, getAllEmpresas)
router.put('/:email', authenticateJWTToken, editEmpresa)

export default router
