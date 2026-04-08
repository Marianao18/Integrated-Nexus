# ── STAGE 1: imagen base ──────────────────────────────────────────────────────
# Usamos Python 3.11 en su versión slim (más liviana, sin paquetes innecesarios)
FROM python:3.11-slim

# ── Variables de entorno ───────────────────────────────────────────────────────
# PYTHONDONTWRITEBYTECODE: evita que Python genere archivos .pyc (innecesarios en contenedor)
# PYTHONUNBUFFERED: los logs de Python salen en tiempo real en la terminal de Docker
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# ── Directorio de trabajo dentro del contenedor ────────────────────────────────
# Todos los comandos siguientes se ejecutan desde /app
WORKDIR /app

# ── Instalar dependencias del sistema ─────────────────────────────────────────
# libpq-dev y gcc son necesarios para que psycopg2 pueda conectarse a PostgreSQL
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# ── Instalar dependencias de Python ───────────────────────────────────────────
# Copiamos primero solo requirements.txt para aprovechar el cache de Docker:
# si no cambia requirements.txt, Docker no reinstala las dependencias en cada build
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# ── Copiar el código fuente ────────────────────────────────────────────────────
COPY . .

# ── Puerto que expone el contenedor ───────────────────────────────────────────
EXPOSE 8000

# ── Comando de inicio ──────────────────────────────────────────────────────────
# Corre las migraciones automáticamente y luego levanta el servidor Django
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
