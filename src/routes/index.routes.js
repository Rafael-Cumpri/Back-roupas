import { Router } from 'express'
import clothRoutes from './cloth.routes.js'

const rotas = Router()

rotas.use('/clothes', clothRoutes)

export default rotas