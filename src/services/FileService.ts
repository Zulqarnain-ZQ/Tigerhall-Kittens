import { Service } from 'typedi'
import * as fs from 'fs'
import { Upload } from '../types/Upload'

const imagesUploadDir = './images'

@Service()
export class FileService {
  constructor() {}

  async storeImage(upload: Upload): Promise<string> {
    const { filename, createReadStream } = upload

    const stream = createReadStream()

    const path = `${imagesUploadDir}/${filename}`

    return new Promise((resolve, reject) =>
      stream
        .pipe(fs.createWriteStream(path))
        .on('error', (error) => reject(error))
        .on('finish', () => resolve(path))
    )
  }

  isValidImage(upload: Upload) {
    const { mimetype } = upload

    return ['image/jpeg', 'image/png', 'image/gif'].includes(mimetype)
  }
}
