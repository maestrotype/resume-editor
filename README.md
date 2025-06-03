# 📄 Resume Editor (React + Node.js + MongoDB)

A minimalistic resume editor with PDF export, avatar upload, and REST API.

## ⚙️ Tech Stack
- **Frontend:** React, TailwindCSS, html2pdf  
- **Backend:** Node.js, Express.js, Mongoose  
- **Database:** MongoDB (local or Atlas)  
- **Auth:** Basic (MVP-level)  
- **Features:** i18n (EN / RU), avatar upload, PDF export  

## 🚀 Features
- 🔧 Create, update, delete resumes  
- 🌍 Multilingual interface (EN / RU)  
- 📎 Avatar image upload  
- 📄 Export resumes to PDF  
- ☁️ Easily deployable to Render or any Node.js-compatible host  

## 📁 Project Structure
```
resume-editor/
├── client/         # React frontend (if separated)
├── server/         # Node.js + Express backend
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   └── src/config/
├── .env            # Environment variables (excluded from Git)
├── README.md
```

## 🧪 Getting Started (Local)

1. **Clone the repo**  
```bash
git clone https://github.com/your-username/resume-editor.git
cd resume-editor
```

2. **Install dependencies**  
```bash
npm install
```

3. **Add `.env` file**  
Create `.env` in root or `server/`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resume-db?retryWrites=true&w=majority
PORT=4000
```

4. **Run the project**  
```bash
npm run dev
# or
node index.js
```

## 🌐 API Endpoints

| Method | URL                   | Description         |
|--------|------------------------|---------------------|
| GET    | `/api/resumes`        | Get all resumes     |
| GET    | `/api/resumes/:id`    | Get one resume      |
| POST   | `/api/resumes`        | Create resume       |
| PUT    | `/api/resumes/:id`    | Update resume       |
| DELETE | `/api/resumes/:id`    | Delete resume       |
| POST   | `/api/upload/avatar`  | Upload avatar image |

## ☁️ Deploy on Render

1. Go to https://render.com  
2. Create new **Web Service**  
3. Set:
   - **Start command:** `node index.js`  
   - **Root dir:** `server` or `/`  
   - **Env vars:**  
     ```
     MONGODB_URI=your-mongodb-uri
     PORT=4000
     ```

## 📦 Scripts

| Command         | Description              |
|------------------|--------------------------|
| `npm install`    | Install dependencies     |
| `npm run dev`    | Run dev mode             |
| `node index.js`  | Run server manually      |

## 📑 .env Example

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resume-db?retryWrites=true&w=majority
PORT=4000
```

## 🧠 TODO
- [ ] Auth with roles
- [ ] Save PDF to server
- [ ] Live preview with WebSocket
- [ ] Vue/Svelte versions
- [ ] Export to DOCX, JSON Resume, etc.

## 👤 Author

Made by **Andrii** 🇺🇦 — [github.com/your-username](https://github.com/your-username)

## 📄 License

MIT © 2025
