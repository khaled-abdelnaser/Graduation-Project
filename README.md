# Graduation Project - Smart Doctor Assistant

A full-stack healthcare application with Spring Boot backend and Angular frontend.

## 🚀 Quick Start with Docker

```bash
docker-compose up -d
```

This starts:

- **Backend API** → http://localhost:8081
- **Frontend** → http://localhost
- **PostgreSQL** → localhost:5432

## Stop

```bash
docker-compose down
```

## View Logs

```bash
docker-compose logs -f
```

---

## 🔧 Local Development (Without Docker)

### Backend

```bash
cd backend
mvn spring-boot:run
```

### Frontend

```bash
cd front-end
npm install
npm start
```

---

## 📦 Stack

| Component | Technology  | Port |
| --------- | ----------- | ---- |
| Backend   | Spring Boot | 8081 |
| Frontend  | Angular     | 4200 |
| Database  | PostgreSQL  | 5432 |

---

## 🐛 Troubleshooting

**Port conflict?**

```bash
docker-compose down -v
docker-compose up -d --build
```

**Database error?**

```bash
docker-compose restart postgres
```

---

**Author:** Khaled Abdelnaser
