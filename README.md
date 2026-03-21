# 📄 AskMyPDF – AI-Powered PDF Chat Application

An AI-powered full-stack application that allows users to upload PDF documents and ask questions in natural language. The system processes the document and returns precise, context-aware answers using AI (Gemini API).

---

## 🚀 Features

* 📂 Upload PDF documents
* 💬 Ask questions related to the uploaded PDF
* 🤖 AI-generated answers based on document content
* ⚡ Fast and simple chat interface
* 🔐 Secure API handling using environment variables

---

## 🛠️ Tech Stack

### Frontend

* React.js
* CSS

### Backend

* Node.js
* Express.js

### AI Integration

* Google Gemini API

---

## 📁 Project Structure

```
pdfuploadAiProject/
│
├── backend/
│   ├── controller/
│   ├── prompt/
│   ├── router/
│   ├── parser.cjs
│   └── app.js
│
├── frontend/
│   ├── src/
│   └── public/
│
├── .gitignore
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```
git clone https://github.com/ChinuPathak/AskMyPDF
cd askmypdf
```

---

### 2️⃣ Setup Backend

```
cd backend
npm install
```

Create a `.env` file in the backend folder:

```
GEMINI_API_KEY=your_api_key_here
PORT=5000
```

Run backend:

```
npm start
```

---

### 3️⃣ Setup Frontend

```
cd frontend
npm install
npm start
```

---

## 🔐 Environment Variables

| Variable       | Description         |
| -------------- | ------------------- |
| GEMINI_API_KEY | Your Gemini API key |
| PORT           | Backend server port |

---

## ⚠️ Important Notes

* `.env` file is ignored using `.gitignore`
* Never expose your API keys publicly
* If a key is exposed, regenerate it immediately

---

## 🧠 How It Works

1. User uploads a PDF
2. Backend parses the PDF content
3. User sends a query
4. Query + document content is sent to Gemini API
5. AI generates a relevant answer
6. Response is displayed in the UI

---

## 📌 Future Improvements

* 🔍 Add semantic search (RAG with embeddings)
* 🧠 Use LangChain for better context handling
* 📚 Support multiple PDFs
* 💾 Store chat history
* 🌐 Deploy on cloud (Vercel + Render)

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Chinmay Pathak**

---

⭐ If you like this project, give it a star on GitHub!
