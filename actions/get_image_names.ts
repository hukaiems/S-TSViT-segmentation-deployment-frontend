import path from "path"
import fs from "fs"

export function ReadImageName () {
    const imagePath = path.join(process.cwd(), "public/show_img")
    const imageNames = fs.readdirSync(imagePath)

    return imageNames
}

