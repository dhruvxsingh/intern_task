🛍️ Croma Product Scraper – Full Stack Internship Task
📚 Overview
This is a full-stack web application, designed to scrape live product data from Croma's Televisions & Accessories page and display the data in a stylish frontend interface. The project uses Python, Flask, Redis, Vue.js, and beautiful custom styling to build an end-to-end pipeline from data scraping to display.

🚀 Features
📦 Scrapes product title, price, discount, and extra offers from Croma.
📥 Stores scraped data in Redis for fast retrieval.
🔌 Backend API built with Flask, exposes /scraped-content.
💅 Frontend built with Vue.js, styled to match dark UI specs.
🎯 Modular, clean and readable code in both frontend and backend.
🧩 Tech Stack
Layer	Technology
Data	Web Scraping with BeautifulSoup
Storage	Redis (via Docker)
Backend	Python 3.8+, Flask
Frontend	Vue.js (CLI-based), CSS
DevOps	Docker, venv, npm, Git
💡 Architecture
         +-----------------------+
         |   Croma Website       |
         |  (source of data)     |
         +-----------+-----------+
                     |
        Scrape via requests + bs4
                     |
                     v
        +-----------------------+
        |     Backend (Flask)   |
        |  ↔ Redis (cached data)|
        +-----------+-----------+
                     |
     Serve as JSON   |   API: /scraped-content
                     v
        +-----------------------+
        |     Frontend (Vue.js) |
        |   Fetch & Render cards|
        +-----------------------+


⚙️ How to Run It Locally
📌 Requires: Python 3.8+, Docker, and Node.js 14+

🔧 Backend Setup
# Clone the repo
git clone https://github.com/dhruvxsingh/croma-scraper.git
cd croma-scraper

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start Redis using Docker
docker run --name redis -p 6379:6379 -d redis  # only once
docker start redis                              # for future runs

# Run scraper to populate Redis
python backend/scraper.py

# Start Flask server
python backend/app.py

API will be available at: http://127.0.0.1:5000/scraped-content

🌐 Frontend Setup
cd frontend

# Install Vue dependencies
npm install

# Run development server
npm run serve

App will be available at: http://localhost:8080

🛠️ Folder Structure
project/
│
├── backend/
│   ├── app.py               # Flask API
│   ├── scraper.py           # Web scraping logic
│   └── requirements.txt     # Python deps
│
├── frontend/
│   ├── src/App.vue          # Vue UI
│   ├── package.json         # Frontend deps
│   └── ... other config files
│
├── venv/                    # Python virtual env
└── new_readme.md
