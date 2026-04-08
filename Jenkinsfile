// ── NEXUS · Jenkinsfile ───────────────────────────────────────────────────────
// Pipeline declarativo que automatiza: build → test → deploy
// Se ejecuta localmente en Jenkins cada vez que hay un cambio en el repositorio

pipeline {

    // "any" significa que Jenkins puede usar cualquier agente/nodo disponible
    agent any

    // Variables globales del pipeline
    environment {
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {

        // ── STAGE 1: CLONAR ───────────────────────────────────────────────────
        // Jenkins descarga el código más reciente del repositorio Git
        stage('Clonar repositorio') {
            steps {
                echo '📥 Clonando repositorio...'
                checkout scm
            }
        }

        // ── STAGE 2: BUILD ────────────────────────────────────────────────────
        // Construye las imágenes Docker del backend y frontend
        // "--no-cache" asegura que siempre se construya desde cero (sin cache viejo)
        stage('Build Docker images') {
            steps {
                echo '🐳 Construyendo imágenes Docker...'
                sh 'docker compose -f ${COMPOSE_FILE} build --no-cache'
            }
        }

        // ── STAGE 3: TEST ─────────────────────────────────────────────────────
        // Levanta solo el backend y la DB para correr los tests de Django
        // "--abort-on-container-exit" detiene todo si algún contenedor falla
        stage('Correr tests') {
            steps {
                echo '🧪 Corriendo tests del backend...'
                sh '''
                    docker compose -f ${COMPOSE_FILE} run --rm nexus-backend \
                    sh -c "python manage.py test --verbosity=2"
                '''
            }
            // Si los tests fallan, el pipeline se detiene y no hace deploy
            post {
                failure {
                    echo '❌ Tests fallidos. Deploy cancelado.'
                }
            }
        }

        // ── STAGE 4: DEPLOY ───────────────────────────────────────────────────
        // Detiene los contenedores anteriores y levanta los nuevos
        // "-d" = detached mode (en segundo plano)
        // "--build" = reconstruye si hubo cambios
        stage('Deploy') {
            steps {
                echo '🚀 Desplegando Nexus...'
                sh 'docker compose -f ${COMPOSE_FILE} down'
                sh 'docker compose -f ${COMPOSE_FILE} up -d --build'
            }
        }

        // ── STAGE 5: VERIFICAR ────────────────────────────────────────────────
        // Confirma que los 3 contenedores están corriendo correctamente
        stage('Verificar contenedores') {
            steps {
                echo '✅ Verificando estado de los contenedores...'
                sh 'docker compose -f ${COMPOSE_FILE} ps'
            }
        }
    }

    // ── POST: acciones después del pipeline ───────────────────────────────────
    post {
        success {
            echo '✅ Pipeline completado. Nexus está corriendo en http://localhost:3000'
        }
        failure {
            echo '❌ Pipeline fallido. Revisa los logs arriba.'
            // En producción aquí se enviaría un email o notificación a Slack
        }
        always {
            // Limpia imágenes Docker huérfanas para no llenar el disco
            sh 'docker image prune -f'
        }
    }
}
