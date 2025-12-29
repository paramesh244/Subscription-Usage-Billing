import {Router} from "express"

import {recordUsage} from '../services/usage.service'

const router = Router()
router.post('/',recordUsage)

export default router
