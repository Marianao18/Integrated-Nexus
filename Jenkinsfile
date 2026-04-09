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
                sh 'cd /Nexus-integrado && docker-compose -f ${COMPOSE_FILE} build --no-cache'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Desplegando Nexus...'
                sh 'cd /Nexus-integrado && docker-compose -f ${COMPOSE_FILE} down'
                sh 'cd /Nexus-integrado && docker-compose -f ${COMPOSE_FILE} up -d'
            }
        }

        stage('Verificar contenedores') {
            steps {
                echo 'Verificando estado de los contenedores...'
                sh 'cd /Nexus-integrado && docker-compose -f ${COMPOSE_FILE} ps'
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