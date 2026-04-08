# NEXUS — Beyond Control
 Plataforma educativa en TI para Medellín · Tecnológico de Antioquia

## Cómo ejecutar el proyecto

### Requisitos previos
- [Node.js](https://nodejs.org/) v16 o superior
- npm (viene incluido con Node.js)
- Visual Studio Code (recomendado)
- Nota: desarrollado con react.js

### Pasos para iniciar

# Instalar dependencias de Node
npm install

# Iniciar la interfaz visual
npm start

# Configuración de Base de Datos
DB_NAME=nexus_db
DB_USER=postgres
DB_PASS=tu_contraseña

# Configuración de Correo (Gmail App Password)
EMAIL_HOST_USER='tu_correo@gmail.com'
EMAIL_HOST_PASSWORD='tu_codigo_de_16_letras_de_google'

# Seguridad Django
SECRET_KEY='tu_llave_secreta'
DEBUG=True


---

## Estructura del proyecto

```
NEXUS-PROJECT/
├── backend/                    # Servidor Django (Python)
│   ├── apps/
│   │   └── solicitudes/        # Lógica de correos y recuperación
│   ├── nexus/                  # Configuración principal y settings.py
│   ├── manage.py               # Gestor de comandos de Django
│   ├── .env                    # Variables privadas (¡No se sube!)
│   └── .env.example            # Plantilla para colaboradores
├── src/                        # Frontend (React)
│   ├── components/
│   │   ├── Background.jsx      # Fondo con Grid + blobs decorativos animados
│   │   ├── Background.css      # Estilos y animaciones del fondo visual
│   │   ├── Navbar.jsx          # Barra de navegación superior
│   │   ├── Navbar.css          # Diseño de la barra (glassmorphism)
│   │   ├── Hero.jsx            # Sección de impacto principal
│   │   ├── Hero.css            # Estilos de bienvenida
│   │   ├── Login.jsx           # Formulario de acceso
│   │   ├── Login.css           # Diseño del panel de inicio de sesión
│   │   ├── Registro.jsx        # Formulario de creación de cuenta
│   │   ├── Registro.css        # Estilos de validaciones de registro
│   │   ├── RecuperarPassword.jsx # Formulario para solicitar enlace de recuperación (Nuevo)
│   │   ├── RecuperarPassword.css # Estilos del panel de olvido de contraseña (Nuevo)
│   │   ├── RestablecerPassword.jsx # Formulario para nueva clave con UID/Token (Nuevo)
│   │   ├── RestablecerPassword.css # Estilos del formulario de cambio de clave (Nuevo)
│   │   ├── Terminal.jsx        # Simulación de consola de comandos
│   │   ├── Terminal.css        # Estilo retro/futurista
│   │   ├── Stats.jsx           # Fila con contadores y métricas
│   │   ├── Stats.css           # Diseño de tarjetas de estadísticas
│   │   ├── Features.jsx        # Grid con funcionalidades clave
│   │   ├── Features.css        # Estilos del tablero de funcionalidades
│   │   ├── Rutas.jsx           # Sección de rutas de aprendizaje
│   │   ├── Rutas.css           # Diseño de etiquetas y navegación
│   │   ├── CtaBanner.jsx       # Banner inferior de acción
│   │   ├── CtaBanner.css       # Colores y efectos del banner
│   │   ├── Footer.jsx          # Pie de página con créditos
│   │   └── Footer.css          # Estilos de la sección final
│   ├── App.jsx                 # Componente raíz y gestión de rutas (React Router)
│   ├── index.js                # Punto de entrada de React
│   └── index.css               # Estilos globales y variables de color
├── public/                     # Archivos públicos y HTML base
├── package.json                # Dependencias del Frontend
└── README.md                   # Documentación del proyecto

## Paleta de colores

| Variable            | Valor     | Uso                        |
|---------------------|-----------|----------------------------|
| `--accent-cyan`     | `#00E5FF` | Acento principal / tech    |
| `--accent-lime`     | `#A3FF4F` | Aprendizaje / acceso libre |
| `--accent-purple`   | `#7B5CFA` | IA / personalización       |
| `--accent-orange`   | `#FF6B35` | Datos / dinamismo          |
| `--bg-deep`         | `#060B14` | Fondo profundo             |

# Nexus
