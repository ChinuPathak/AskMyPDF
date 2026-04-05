📄 AskMyPDF – AI-Powered PDF Chat Application (RAG + Streaming Enabled)

An AI-powered full-stack application that allows users to upload multiple PDF documents and ask questions in natural language. The system uses Retrieval-Augmented Generation (RAG) with embeddings and vector search, along with real-time streaming responses, to deliver fast and context-aware answers.

🚀 Features

📂 Upload multiple PDF documents
📑 Process and combine knowledge from multiple files
🔗 Separate APIs for uploading and querying
💬 Ask questions related to uploaded PDFs
🤖 AI-generated answers using Google Gemini API
🧠 Retrieval-Augmented Generation (RAG) pipeline
🔎 Semantic search using vector embeddings
⚡ Real-time streaming responses (token-by-token output)
💬 Smooth chat-like user experience
🔐 Secure API handling using environment variables

🛠️ Tech Stack
Frontend
React.js
CSS
Backend
Node.js
Express.js
AI & Data Processing
Google Gemini API (Streaming + Generation)
LangChain (document processing & embeddings)
Pinecone (vector database)
📁 Project Structure
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
⚙️ Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/ChinuPathak/AskMyPDF
cd askmypdf
2️⃣ Setup Backend
cd backend
npm install

Create a .env file in the backend folder:

GEMINI_API_KEY=your_api_key_here
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=your_index_name
PORT=5000

Run backend:

npm start
3️⃣ Setup Frontend
cd frontend
npm install
npm start
🔐 Environment Variables
Variable	Description
GEMINI_API_KEY	Your Gemini API key
PINECONE_API_KEY	Your Pinecone API key
PINECONE_INDEX_NAME	Pinecone index name
PORT	Backend server port
🔗 API Endpoints
📂 Upload API
Endpoint: /api/upload
Method: POST
Description: Upload one or multiple PDF files, process them, and store embeddings in Pinecone.
💬 Query API (Streaming Enabled)
Endpoint: /api/query
Method: POST
Description:
Accepts user query
Retrieves relevant context using vector search
Streams AI-generated response in real-time
🧠 How It Works (RAG + Streaming Pipeline)

📄 User uploads one or multiple PDFs via Upload API
🔍 Backend parses all PDF contents
✂️ Text is split into smaller chunks
🧬 Each chunk is converted into embeddings
📦 Embeddings are stored in Pinecone vector database

❓ User sends a query via Query API
🔎 Query is converted into embedding
📊 Semantic search retrieves relevant chunks
🧠 Context + query sent to Gemini API

⚡ Streaming begins:

Tokens are sent progressively from backend → frontend
UI updates in real-time (ChatGPT-like experience)

💬 Final response is built dynamically as it streams

📌 Key Improvements

✅ Added support for multiple PDF uploads
✅ Introduced separate Upload & Query APIs
✅ Implemented semantic search using embeddings
✅ Integrated Pinecone vector database
✅ Adopted RAG architecture for better accuracy
✅ Implemented real-time streaming responses
✅ Improved UX with chat-like interaction

📌 Future Improvements

📚 Better multi-document context ranking
💾 Store chat history
🔐 User authentication
🌐 Deploy on cloud (Vercel + Render)
📊 Response source highlighting (citations from PDFs)

🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

📜 License

This project is licensed under the MIT License.

👨‍💻 Author

Chinmay Pathak
