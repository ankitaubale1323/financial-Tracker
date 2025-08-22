pipeline {
    agent any

    environment {
        // DockerHub images
        BACKEND_IMAGE = "ankitaubale1323/finance-backend:latest"
        FRONTEND_IMAGE = "ankitaubale1323/finance-frontend:latest"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/ankitaubale1323/financial-Tracker.git',
                    credentialsId: 'git-cred'
            }
        }

        stage('Build with Docker Compose') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-credientials') {
                        sh 'docker-compose push'
                    }
                }
            }
        }
    }
}
