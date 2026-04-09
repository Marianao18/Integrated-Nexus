pipeline {
    agent any

    environment {
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {

        stage('Verificar codigo') {
            steps {
                echo 'Verificando codigo fuente...'
                sh 'ls -la /Nexus-integrado'
            }
        }

        stage('Build Docker images') {
            steps {
                echo 'Construyendo imagenes Docker...'
                sh 'cd /Nexus-integrado && docker compose build'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Desplegando Nexus...'
                sh 'cd /Nexus-integrado && docker compose down'
                sh 'cd /Nexus-integrado && docker compose up -d'
            }
        }

        stage('Verificar contenedores') {
            steps {
                echo 'Verificando estado de los contenedores...'
                sh 'cd /Nexus-integrado && docker compose ps'
            }
        }
    }

    post {
        success {
            echo 'Nexus desplegado correctamente en http://localhost:3000'
        }
        failure {
            echo 'Pipeline fallido. Revisa los logs.'
        }
    }
}