import express from "express"
import cors from "cors"
import path from "path"

import { fileURLToPath } from "url"

import destinationRoutes from "./routes/destination.routes"
import tourismCategoryRoutes from "./routes/tourismCategory.routes"

const app = express()

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

app.use(cors())

app.use(express.json())

// STATIC IMAGE DESTINATIONS
app.use(
    "/images/destinations",
    express.static(
        path.join(__dirname, "../public/destinations")
    )
)

// API ROUTE DESTINATIONS
app.use("/api/destinations", destinationRoutes)

// API ROUTE TOURISM CATEGORY
app.use("/api/tourismcategories", tourismCategoryRoutes)

export default app