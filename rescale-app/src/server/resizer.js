import express from 'express'
import multer from 'multer'
import sharp from 'sharp'
import fs from 'fs-extra'
import path from 'path'

const app = express()
const port = 3000

const upload = multer({ dest: 'uploads/' })

app.use(express.static('public'))

app.post('/api/resize', upload.single('file'), async (req, res) => {
  const { width, height, dpi } = req.body
  const inputFilePath = req.file.path
  const outputFilePath = `resized/${req.file.originalname}`

  try {
    await sharp(inputFilePath)
      .resize(parseInt(width), parseInt(height))
      .withMetadata({ density: parseInt(dpi) })
      .toFile(outputFilePath)

    res.json({ fileName: req.file.originalname })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).send('Error processing image')
  } finally {
    fs.remove(inputFilePath)
  }
})

app.get('/api/download/:fileName', (req, res) => {
  const filePath = path.join(__dirname, 'resized', req.params.fileName)
  res.download(filePath)
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
