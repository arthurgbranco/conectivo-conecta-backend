import { Router } from 'express'
import { createInscricao } from '../controllers/InscricaoController'
import { authenticateJWTToken } from '../middlewares/TokenAuth'

const router = Router()

//Routes
router.post('/', authenticateJWTToken, createInscricao)

export default router
