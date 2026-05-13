import express from "express"
import cors from "cors"
import path from "path"

import { fileURLToPath } from "url"

import destinationRoutes from "./routes/destination.routes"

const app = express()

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

app.use(cors())

app.use(express.json())

// STATIC IMAGE
app.use(
    "/images/destinations",
    express.static(
        path.join(__dirname, "../public/destinations")
    )
)

// API ROUTE
app.use("/api/destinations", destinationRoutes)

export default app