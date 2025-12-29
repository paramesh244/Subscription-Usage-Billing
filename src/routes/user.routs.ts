import { Router } from "express";

import { getCurrentUsage,getBillingSummary } from "../services/billing.serve";

const router = Router()

router.get("/:id/current-usage", getCurrentUsage)

router.get("/:id/billing-summary",getBillingSummary)


export default router
