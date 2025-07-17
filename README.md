# 🍬 Incubyte Kata - Sweet Shop Management System

This is a **Sweet Shop Management System** built as part of the **Incubyte Coding Kata**. It allows users to manage a list of sweets with features like adding new sweets, sorting by price or category, and restocking inventory.

> ⚠️ Note: The backend server is currently not running on the deployed Vercel version. However, the frontend UI is **successfully hosted** and functional.

🔗 **Live Preview:** [https://incubyte-kata-sweet-final-try.vercel.app/](https://incubyte-kata-sweet-final-try.vercel.app/)  
📦 **GitHub Repo:** [PiyushSharma10718/incubyte-kata-sweet](https://github.com/PiyushSharma10718/incubyte-kata-sweet)

---

## 🚀 Features

- 🧾 Add a sweet with name, price, and category.
- 🗂️ Sort sweets by:
  - Name
  - Price
  - Category (dessert, candy, chocolate, dryfruit, traditional)
- 🔍 Search sweets by name or category.
- 📦 Restock existing sweets (increase quantity).
- 📉 See the updated stock quantity of each item.

---

## 🛠️ Tech Stack

- **Frontend:** React.js + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Data Handling:** JavaScript Array (in-memory store for now)
- **Deployment:** Vercel (Frontend)

---

## 🧪 Development Status

- ✅ Frontend: Completed and deployed to Vercel.
- ⚠️ Backend: Developed and working locally but not hosted yet.
- 🚧 Final integration with backend on Vercel was attempted last minute but could not be completed due to time constraints.

---

## 💻 Getting Started (Local Setup)

1. **Clone the Repository**

   ```bash
   git clone https://github.com/PiyushSharma10718/incubyte-kata-sweet.git
   cd incubyte-kata-sweet

2. **Install Dependencies**

   ```bash
   npm install

3. **Run the Development Server**

   ```bash
   npm run dev

4. **Project Structure**

   ```bash
   incubyte-kata-sweet/
    ├── client/               # React frontend
    │   └── components/       # Reusable UI components
    │   └── pages/            # Feature-specific pages (Add, Sort, Restock)
    ├── server.js             # Express backend server
    ├── package.json          # Project config
    ├── README.md             # Project documentation
