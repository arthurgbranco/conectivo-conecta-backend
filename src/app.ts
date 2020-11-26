import { config } from 'dotenv'

// Add environment variables
config()

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import TrabalhadorRouter from './routers/TrabalhadorRouter'
import EmpresaRouter from './routers/EmpresaRouter'
import VagaRouter from './routers/VagaRouter'
import InscricaoRouter from './routers/InscricaoRouter'
import { checkDatabase } from './middlewares/DatabaseCheckers'

const app = express()

// Global Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(checkDatabase)
app.use(cors())

// Routes
app.use('/trabalhador', TrabalhadorRouter)
app.use('/empresa', EmpresaRouter)
app.use('/vaga', VagaRouter)
app.use('/inscricao', InscricaoRouter)

export default app
