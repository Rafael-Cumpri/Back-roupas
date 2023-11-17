import { Router } from 'express'
import { getClothes, getClothByID, getClothByColor, getClothBySize, getClothByType, getClothBySizeandType, createCloth, updateCloth, deleteCloth,  } from '../controllers/cloth.controller.js'

const clothRoutes = Router()

clothRoutes.get('/', getClothes)

clothRoutes.get('/:id', getClothByID)

clothRoutes.post('/', createCloth)

clothRoutes.put('/:id', updateCloth)

clothRoutes.delete('/:id', deleteCloth)

export default clothRoutes