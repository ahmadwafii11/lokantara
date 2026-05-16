import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/reviews")
    },

    filename: (req, file, cb) => {
        const unique =
            Date.now() + path.extname(file.originalname)

        cb(null, unique)
    },
})

export const uploadReview =
    multer({ storage })