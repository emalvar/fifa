# 🌟 Proyecto FIFA Full-Stack — Challenge XAcademy DEV 2025

Este repositorio contiene una aplicación web full-stack desarrollada como parte del **Challenge XAcademy DEV 2025**. El objetivo es gestionar jugadores de FIFA (masculinos y femeninos) mediante una arquitectura moderna que incluye:
- Frontend en **Angular**
- Backend con **Node.js + Express**
- Base de datos **MySQL**
- Contenerización con **Docker & Docker Compose**

---

## 📌 Características Principales

- 🔐 Autenticación de usuarios con **JWT**
- 🔄 Registro, login y protección de rutas
- 🧍‍♂️ CRUD completo de jugadores
- 🔒 Encriptación de contraseñas con **bcrypt**
- 🔗 Integración frontend-backend vía API REST
- 🐳 Arquitectura contenerizada con Docker Compose
- 🧠 Validación doble: en frontend (**Reactive Forms**) y backend (**Express-Validator**)
- 🛡️ Interceptor HTTP en Angular para envío automático del token JWT

---

## 🚀 Tecnologías Utilizadas

| Capa             | Tecnologías                                                                 |
|------------------|------------------------------------------------------------------------------|
| **Frontend**     | Angular 17, TypeScript, Reactive Forms, HttpClient            |
| **Backend**      | Node.js, Express.js, JWT, bcrypt.js, Express-Validator                      |
| **Base de Datos**| MySQL 8                                                                     |
| **Contenerización**| Docker, Docker Compose                                                    |

---

## 📂 Estructura del Proyecto

fifa-fullstack/
├── backend/              # API con Node.js + Express 
│   └── scripts/          # Scripts útiles
│       └── importData.js # Permite importar jugadores desde CSV a la BD
├── frontend/ # Aplicación Angular
├── db/ # Archivos CSV de jugadores 
├── docker-compose.yml 
└── README.md

---

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) v4+
- [Node.js](https://nodejs.org/) v18+ (solo si deseas ejecutar frontend/backend fuera de Docker)

---

## ▶️ Instrucciones de Ejecución

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repo>
   cd fifa-fullstack
   ```

2. **Levanta los contenedores**
   ```bash
   docker-compose up --build
   ```

3. **Accede a la aplicación**
   - Frontend: [http://localhost:80]
   - Backend API: [http://localhost:3000]
   - Base de Datos (MySQL): `localhost:3307`

---

## 📥 Importar Datos desde CSV

En la carpeta `backend/scripts/` se encuentra el archivo **`importData.js`**, que permite cargar los jugadores desde los CSV ubicados en la carpeta `db/` hacia la base de datos.

Para ejecutarlo dentro del contenedor del backend:

```bash
docker exec -it fifa-backend npm run import-data
```

Esto tomará los archivos `male_players.csv` y `female_players.csv` y los insertará en la tabla correspondiente.

---

📌 Endpoints de la API
Método	Endpoint	        Descripción	                        Autenticación
POST	/api/auth/register	Registro de nuevo usuario	        ❌
POST	/api/auth/login	    Login de usuario	                ❌
GET	    /api/players	    Listado de jugadores	            ✅
POST	/api/players	    Crear jugador nuevo	                ✅
PUT	    /api/players/:id	Actualizar jugador existente    	✅
DELETE	/api/players/:id	Eliminar jugador	                ✅
✅ = requiere token JWT


🧪 Ejemplo de Uso de la API
Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"1234567890"}'

Acceso con Token
curl -X GET http://localhost:3000/api/players \
  -H "Authorization: Bearer TU_TOKEN_AQUI"

📈 Próximos Pasos / Mejoras
[ ] Mejoras de estilo y experiencia de usuario (UI/UX)
[ ] Visualización de evolución de habilidades de jugadores en línea de tiempo
[ ] Documentación interactiva con Swagger (/api-docs)

Desarrollado por Emanuel Alvarez para el Challenge XAcademy DEV 2025 🚀