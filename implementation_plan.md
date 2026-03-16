# Canva-Style Drag-and-Drop Resume Studio

A "Canva-style" drag-and-drop resume builder integrated into the Porichoy Nuxt.js app. The resume is treated as a **Stage**, and the sidebar is the **Asset Library**. All state is managed reactively in a composable, with exports to PNG/JSON. Backend APIs are documented (not implemented yet).

## Proposed Changes

### Dependencies

#### [MODIFY] [package.json](file:///d:/porichoy/package.json)
- Add `konva` and `vue-konva` packages for the canvas engine
- Add `cropperjs` for the image crop modal

---

### State Management (Source of Truth)

#### [NEW] [useResumeStore.js](file:///d:/porichoy/composables/useResumeStore.js)
Reactive composable holding the layer state. Each element on the canvas is a "layer" object:
```js
{ id, type, x, y, width, height, text, fontSize, fontFamily, fill, src, rotation, ... }
```
Functions: `addLayer()`, `updateLayer()`, `removeLayer()`, `selectLayer()`, `moveLayerUp/Down()`, `undoAction()`, `getState()`, `loadState()`.

#### [NEW] [useCanvasExport.js](file:///d:/porichoy/composables/useCanvasExport.js)
Export helpers:
- `exportToPNG(stageRef)` → downloads PNG via `stage.toDataURL()`
- `exportToJSON(layers)` → downloads the layers state as [.json](file:///d:/porichoy/package.json)
- `saveToLocalStorage(id, layers)` / `loadFromLocalStorage(id)`

---

### Studio Layout & Page

#### [NEW] [studioLayout.vue](file:///d:/porichoy/layouts/studioLayout.vue)
A dedicated full-screen layout for the studio — **no** AppSideBar or AppNavBar. Instead, the slot fills the entire viewport with a minimal top bar (logo, back link, save/export buttons).

#### [NEW] [resume-builder.vue](file:///d:/porichoy/pages/studio/resume-builder.vue)
The main studio page. Three-panel layout:
1. **Left**: Tabbed StudioSidebar (asset library)
2. **Center**: ResumeCanvas (Konva Stage on a dotted-grid background)
3. **Right**: PropertiesPanel (context-sensitive, appears when an element is selected)

A `StudioToolbar` sits above the canvas area.

---

### Studio Sidebar (Asset Library)

#### [NEW] [StudioSidebar.vue](file:///d:/porichoy/components/studio/StudioSidebar.vue)
A narrow icon rail (collapsed) + expanded panel. Tabs:
- **Text** — heading, subheading, body text presets
- **Sections** — Education, Experience, Skills, Projects blocks
- **Shapes** — lines, dividers, rectangles, circles
- **Images** — upload profile photo, drag stock icons
- **Settings** — page size, background color, grid toggle

Each tab panel emits an `add-element` event that pushes to the store.

#### [NEW] [TextPanel.vue](file:///d:/porichoy/components/studio/panels/TextPanel.vue)
#### [NEW] [SectionsPanel.vue](file:///d:/porichoy/components/studio/panels/SectionsPanel.vue)
#### [NEW] [ShapesPanel.vue](file:///d:/porichoy/components/studio/panels/ShapesPanel.vue)
#### [NEW] [ImagesPanel.vue](file:///d:/porichoy/components/studio/panels/ImagesPanel.vue)
#### [NEW] [SettingsPanel.vue](file:///d:/porichoy/components/studio/panels/SettingsPanel.vue)

---

### Canvas

#### [NEW] [ResumeCanvas.vue](file:///d:/porichoy/components/studio/ResumeCanvas.vue)
- Renders a `<v-stage>` scaled to an A4 page (794×1123 px at 96 DPI)
- Iterates over `store.layers` with `v-for`, rendering each as a `<v-group>` with appropriate children (`<v-text>`, `<v-rect>`, `<v-image>`, etc.)
- Handles `dragend` to sync position back to state
- Uses a Konva `Transformer` to show resize/rotate handles on the selected element
- Dotted grid background with zoom support

---

### Properties Panel

#### [NEW] [PropertiesPanel.vue](file:///d:/porichoy/components/studio/PropertiesPanel.vue)
Appears on the right when any element is selected. Shows:
- **Text**: font family, font size, color, bold/italic/underline, alignment
- **Shape**: fill color, stroke color, stroke width, border radius
- **Image**: crop button (opens modal), opacity, border radius
- **Common**: position (x, y), size (w, h), rotation, delete, duplicate, lock

---

### Toolbar

#### [NEW] [StudioToolbar.vue](file:///d:/porichoy/components/studio/StudioToolbar.vue)
Top bar above canvas with:
- Project name (editable)
- Undo/Redo buttons
- Zoom slider (50%–200%)
- Grid toggle
- Export dropdown: PNG, JSON, PDF (placeholder)
- Save Draft button

---

### Image Crop Modal

#### [NEW] [ImageCropModal.vue](file:///d:/porichoy/components/studio/ImageCropModal.vue)
Teleported modal using Cropper.js. Opens when user clicks "Crop" on a selected image. Returns cropped data URI back to the layer state.

---

### Navigation Update

#### [MODIFY] [AppSideBar.vue](file:///d:/porichoy/components/AppSideBar.vue)
Add a "Resume Studio" link under the "Build" group pointing to `/studio/resume-builder`, with icon `fa-solid fa-wand-magic-sparkles` and a "New" badge.

---

### API Documentation

#### [NEW] [api-spec.md](file:///d:/porichoy/docs/api-spec.md)
Documents the backend APIs needed for future integration:
- `POST /api/resumes` — save resume JSON
- `GET /api/resumes/:id` — load resume JSON
- `PUT /api/resumes/:id` — update resume
- `DELETE /api/resumes/:id` — delete resume
- `POST /api/resumes/:id/export/pdf` — export to PDF (receives canvas image, returns PDF)
- `POST /api/images/upload` — upload image asset
- `POST /api/images/remove-bg` — AI background removal
- `GET /api/templates` — list resume templates
- `GET /api/templates/:id` — get template layer data

---

## Verification Plan

### Automated (Dev Server)
Run dev server and verify no build/SSR errors:
```bash
cd d:\porichoy
npm run dev
```

### Browser Verification
1. Navigate to `http://localhost:3000/studio/resume-builder`
2. Verify three-panel layout renders (sidebar, canvas, properties)
3. Click "Add Heading" from Text panel → text appears on canvas
4. Drag the text element → position updates
5. Click element → properties panel shows controls
6. Change font size in properties → element updates on canvas
7. Click "Add Section → Experience" → pre-built group appears
8. Export to JSON → file downloads with correct layer data
9. Export to PNG → image downloads
10. Check sidebar nav link exists in dashboard pages

### Manual by User
- Please visually inspect the overall "Canva-like" aesthetics on your screen
- Try adding, dragging, and editing multiple elements to test the UX flow
