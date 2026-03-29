# 📄 AskMyPDF – AI-Powered PDF Chat Application (RAG Enabled)

An AI-powered full-stack application that allows users to upload PDF documents and ask questions in natural language. The system uses **Retrieval-Augmented Generation (RAG)** with embeddings and vector search to return highly accurate, context-aware answers.

---

## 🚀 Features

* 📂 Upload PDF documents
* 💬 Ask questions related to the uploaded PDF
* 🤖 AI-generated answers using **Google Gemini API**
* 🧠 Retrieval-Augmented Generation (RAG) pipeline
* 🔎 Semantic search using vector embeddings
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

### AI & Data Processing

* Google Gemini API
* LangChain (for document processing & embeddings)
* Pinecone (vector database)

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

```bash
git clone https://github.com/ChinuPathak/AskMyPDF
cd askmypdf
```

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```
GEMINI_API_KEY=your_api_key_here
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=your_index_name
PORT=5000
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🔐 Environment Variables

| Variable            | Description           |
| ------------------- | --------------------- |
| GEMINI_API_KEY      | Your Gemini API key   |
| PINECONE_API_KEY    | Your Pinecone API key |
| PINECONE_INDEX_NAME | Pinecone index name   |
| PORT                | Backend server port   |

---

## 🧠 How It Works (RAG Pipeline)

1. 📄 User uploads a PDF
2. 🔍 Backend parses the PDF content
3. ✂️ Text is split into smaller chunks
4. 🧬 Each chunk is converted into embeddings
5. 📦 Embeddings are stored in Pinecone vector database
6. ❓ User submits a query
7. 🔎 Query is converted into embedding
8. 📊 Semantic search retrieves relevant chunks
9. 🧠 Relevant context + query is sent to Gemini API
10. 💬 AI generates an accurate, context-aware response

---

## 📌 Key Improvements

* ✅ Implemented **semantic search using embeddings**
* ✅ Integrated **Pinecone vector database**
* ✅ Introduced **RAG architecture for better accuracy**
* ✅ Improved response relevance and context understanding

---

## 📌 Future Improvements

* 📚 Support multiple PDFs
* 💾 Store chat history
* 🔐 User authentication
* 🌐 Deploy on cloud (Vercel + Render)
* ⚡ Streaming responses for better UX

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
