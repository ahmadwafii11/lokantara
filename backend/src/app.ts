import express from "express"
import cors from "cors"
import path from "path"

import { fileURLToPath } from "url"

import destinationRoutes from "./routes/destination.routes"
import tourismCategoryRoutes from "./routes/tourismCategory.routes"
import regionRoutes from "./routes/regions.routes"
import transportStopCategoryRoutes from "./routes/transportStopCategory.routes"
import transportStopRoutes from "./routes/transportStop.routes"

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

// STATIC IMAGE REVIEWS
app.use(
    "/images/reviews",
    express.static(
        path.join(__dirname, "../public/reviews")
    )
)

// API ROUTE DESTINATIONS
app.use("/api/destinations", destinationRoutes)

// API ROUTE TOURISM CATEGORY
app.use("/api/tourismcategories", tourismCategoryRoutes)

// API ROUTE TRANSPORT STOP CATEGORY
app.use("/api/transportstopcategories", transportStopCategoryRoutes)

// API ROUTE TRANSPORT STOP
app.use("/api/transportstop", transportStopRoutes)

// API GET REGIONS
app.use("/api", regionRoutes)

export default app