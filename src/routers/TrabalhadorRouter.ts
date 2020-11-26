import { Router } from 'express'
import {
	create,
	login,
	getTrabalhador,
	deleteTrabalhador,
	getAllTrabalhadores,
	editTrabalhador,
	getAllTrabalhadoresFromVaga
} from '../controllers/TrabalhadorController'
import { authenticateJWTToken } from '../middlewares/TokenAuth'

const router = Router()

// Routes
router.post('/register/', create)
router.post('/login/', login)
router.get('/:email', authenticateJWTToken, getTrabalhador)
router.delete('/:email', authenticateJWTToken, deleteTrabalhador)
router.get('/', authenticateJWTToken, getAllTrabalhadores)
router.put('/:email', authenticateJWTToken, editTrabalhador)
router.get(
	'/fromvaga/:idDaVaga',
	authenticateJWTToken,
	getAllTrabalhadoresFromVaga
)

export default router
