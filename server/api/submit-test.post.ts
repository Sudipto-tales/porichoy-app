import { defineEventHandler, readMultipartFormData } from 'h3'
import fs from 'node:fs'
import path from 'node:path'

export default defineEventHandler(async (event) => {
  const body = await readMultipartFormData(event)
  if (!body) return { error: 'No data' }

  const uploadDir = path.resolve('./assets/testing')
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }

  const result: any = { timestamp: new Date().toISOString() }
  const files: any = {}

  // Process each field
  for (const part of body) {
    if (part.name && part.filename) {
      // It's a file
      const safeName = `${Date.now()}-${part.filename}`
      const filePath = path.join(uploadDir, safeName)
      fs.writeFileSync(filePath, part.data)
      result[part.name] = `/assets/testing/${safeName}`
    } else if (part.name) {
      // It's a text field
      result[part.name] = part.data.toString()
    }
  }

  // Save the JSON log
  const jsonPath = path.join(uploadDir, 'reports.json')
  let currentReports = []
  
  if (fs.existsSync(jsonPath)) {
    const fileContent = fs.readFileSync(jsonPath, 'utf-8')
    currentReports = JSON.parse(fileContent || '[]')
  }

  currentReports.push(result)
  fs.writeFileSync(jsonPath, JSON.stringify(currentReports, null, 2))

  return { success: true, path: jsonPath }
})