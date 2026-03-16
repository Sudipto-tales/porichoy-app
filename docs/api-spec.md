# Porichoy Resume Studio — Backend API Specification

This document defines the backend API endpoints required for the Resume Studio feature. These APIs should be implemented in the Go/FastAPI backend.

---

## Base URL

```
https://api.porichoy.in/v1
```

## Authentication

All endpoints require a Bearer token in the `Authorization` header:
```
Authorization: Bearer <jwt_token>
```

---

## 1. Resume CRUD

### `POST /resumes`
Create a new resume project.

**Request Body:**
```json
{
  "projectName": "My Resume",
  "canvasConfig": {
    "width": 794,
    "height": 1123,
    "background": "#ffffff",
    "showGrid": true
  },
  "layers": [ ...layerObjects ]
}
```

**Response:** `201 Created`
```json
{
  "id": "resume_abc123",
  "projectName": "My Resume",
  "createdAt": "2026-03-11T18:00:00Z",
  "updatedAt": "2026-03-11T18:00:00Z"
}
```

---

### `GET /resumes`
List all resumes for the authenticated user.

**Query Params:** `?page=1&limit=20&sort=updatedAt`

**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": "resume_abc123",
      "projectName": "My Resume",
      "thumbnail": "https://...",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "total": 5,
  "page": 1,
  "limit": 20
}
```

---

### `GET /resumes/:id`
Get a single resume with full layer data.

**Response:** `200 OK`
```json
{
  "id": "resume_abc123",
  "projectName": "My Resume",
  "canvasConfig": { ... },
  "layers": [ ...layerObjects ],
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

### `PUT /resumes/:id`
Update a resume.

**Request Body:** Same as POST.

**Response:** `200 OK`

---

### `DELETE /resumes/:id`
Delete a resume.

**Response:** `204 No Content`

---

## 2. Export

### `POST /resumes/:id/export/pdf`
Export resume as PDF. Receives a high-res canvas image (base64) and returns a PDF file.

**Request Body:**
```json
{
  "imageData": "data:image/png;base64,...",
  "pageSize": "A4",
  "orientation": "portrait"
}
```

**Response:** `200 OK` (file download)
- Content-Type: `application/pdf`
- Content-Disposition: `attachment; filename="resume.pdf"`

**Backend Implementation Notes:**
- Use `gofpdf` (Go) or `reportlab` (Python) to wrap the image into a professional PDF
- Support A4, Letter, and Legal page sizes

---

## 3. Image Upload

### `POST /images/upload`
Upload an image asset (profile photo, logo, etc.).

**Request:** `multipart/form-data`
- Field: `file` (image file, max 5MB)

**Response:** `201 Created`
```json
{
  "id": "img_xyz789",
  "url": "https://cdn.porichoy.in/uploads/img_xyz789.png",
  "width": 400,
  "height": 400,
  "size": 102400
}
```

---

### `POST /images/remove-bg`
Remove background from an image using AI.

**Request Body:**
```json
{
  "imageId": "img_xyz789"
}
```

**Response:** `200 OK`
```json
{
  "id": "img_xyz789_nobg",
  "url": "https://cdn.porichoy.in/uploads/img_xyz789_nobg.png"
}
```

---

## 4. Templates

### `GET /templates`
List available resume templates.

**Query Params:** `?category=resume&page=1&limit=20`

**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": "tpl_minimal",
      "name": "Minimal Clean",
      "thumbnail": "https://...",
      "category": "resume",
      "isPro": false
    }
  ],
  "total": 12
}
```

---

### `GET /templates/:id`
Get template with full layer data (can be loaded into the studio).

**Response:** `200 OK`
```json
{
  "id": "tpl_minimal",
  "name": "Minimal Clean",
  "canvasConfig": { ... },
  "layers": [ ...layerObjects ]
}
```

---

## Layer Object Schema

Each element on the canvas follows this structure:

```json
{
  "id": "el-1710000000-1",
  "type": "text | rect | circle | image | group",
  "x": 60,
  "y": 60,
  "width": 200,
  "height": 40,
  "rotation": 0,
  "locked": false,
  "visible": true,
  "opacity": 1,
  
  "text": "Hello World",
  "fontSize": 14,
  "fontFamily": "Inter",
  "fontStyle": "bold",
  "fill": "#1e293b",
  "letterSpacing": 0,
  
  "src": "https://...",
  "cornerRadius": 0,
  "radius": 50,
  "stroke": "#000",
  "strokeWidth": 1,
  
  "label": "Experience",
  "children": [ ...childLayerObjects ]
}
```

Fields are type-dependent. Groups contain a `children` array with nested layer objects (no further nesting).
