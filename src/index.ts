import express from "express"

import usageRoutes from "./routes/usag.routes"
import userRoutes from "./routes/user.routs"

const PORT = 3000

const app = express()
app.use(express.json())

app.use("/usage",usageRoutes)
app.use("/users",userRoutes)



app.listen(PORT,()=>[
    console.log(`server running on ${PORT}`)
])