import { Service } from 'typedi'
import * as fs from 'fs'
import { Upload } from '../types/Upload'
import { v4 as uuid } from 'uuid'
import sharp from 'sharp'

const imagesUploadDir = './images'

@Service()
export class FileService {
  constructor() {}

  async storeImage(upload: Upload): Promise<string> {
    const { filename, createReadStream } = upload

    const stream = createReadStream()
    const uniqueFileName = this.generateUniqueFilename(filename)

    const path = `${imagesUploadDir}/${uniqueFileName}`

    return new Promise((resolve, reject) =>
      stream
        .pipe(fs.createWriteStream(path))
        .on('error', (error) => reject(error))
        .on('finish', () => resolve(uniqueFileName))
    )
  }

  isValidImage(upload: Upload) {
    const { mimetype } = upload

    return ['image/jpeg', 'image/png', 'image/gif'].includes(mimetype)
  }

  generateUniqueFilename(filename: string): string {
    const trimmedFilename = filename.replace(/\s+/g, `-`)

    const unique = uuid()

    return `${unique}-${trimmedFilename}`
  }

  async resizeImage(imageName: string) {
    try {
      const path = `${imagesUploadDir}/${imageName}`
      const resizedImage = `resized-${imageName}`
      const resizedImagePath = `${imagesUploadDir}/${resizedImage}`

      await sharp(path)
        .resize({
          width: 250,
          height: 200,
        })
        .toFile(resizedImagePath)

      return resizedImagePath
    } catch (error) {
      console.log(error)
      throw error 
    }
  }
}
