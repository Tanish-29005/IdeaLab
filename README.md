# 💡 IdeaLab Website — Official Innovation Lab Cell, Shah & Anchor

> **College Project | Shah & Anchor Kutchhi Engineering College**

The official website for IdeaLab — the innovation and entrepreneurship lab cell at Shah & Anchor Kutchhi Engineering College. Built to centralize events, showcase the team, and make lab activities accessible to all students.

---

## 🎯 What It Does

| Feature | Description |
|---|---|
| 📅 Events Page | Dynamically lists upcoming and past events via Google Forms integration |
| 👥 Team Section | Showcases lab cell members with roles and details |
| 📝 Easy Updates | Non-technical admins can add events/members directly through Google Forms — no code needed |
| 📱 Responsive Design | Works across desktop and mobile screens |

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Data Management:** Google Forms + Google Sheets (as a lightweight CMS)
- **Styling:** CSS

---

## 🏗️ How the CMS Works

Instead of a traditional backend, the site uses a **Google Forms → Google Sheets → React** pipeline:

```
Admin fills Google Form
        │
        ▼
Google Sheets (auto-updated)
        │
        ▼  Published Sheet API
React Frontend fetches & displays data
```

This lets non-developers on the lab team update events and members without touching any code.

---

## 🚀 Features

- **Zero-maintenance content updates** — Google Forms acts as the admin panel
- **Fast and lightweight** — no heavy backend, just React + public Sheets API
- **Clean UI** — designed to represent the college lab cell professionally
- **Scalable** — easy to add new sections (gallery, achievements, projects)

---

n](https://linkedin.com/in/tanish-nagarkar-768384251) | [Email](mailto:tanishnagarkar@gmail.com)
