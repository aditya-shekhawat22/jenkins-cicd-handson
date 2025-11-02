pipeline {
    agent any
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
    }
    
    environment {
        DOCKER_IMAGE = "jenkins-app:${BUILD_NUMBER}"
        DOCKER_LATEST = "jenkins-app:latest"
        APP_PORT = "3000"
    }
    
    stages {
        stage('Checkout') {
            steps {
                script {
                    echo "=== Stage: Code Checkout ==="
                    checkout scm
                    sh 'echo "Repository cloned successfully"'
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    echo "=== Stage: Install Dependencies ==="
                    sh 'npm install'
                }
            }
        }
        
        stage('Lint & Code Quality') {
            steps {
                script {
                    echo "=== Stage: Lint Code ==="
                    sh 'npm run lint || true'
                }
            }
        }
        
        stage('Test') {
            steps {
                script {
                    echo "=== Stage: Run Tests ==="
                    sh 'npm test || true'
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    echo "=== Stage: Build Docker Image ==="
                    sh '''
                        docker build -t ${DOCKER_IMAGE} .
                        docker tag ${DOCKER_IMAGE} ${DOCKER_LATEST}
                        echo "Docker image built: ${DOCKER_IMAGE}"
                    '''
                }
            }
        }
        
        stage('Run Container Test') {
            steps {
                script {
                    echo "=== Stage: Test Docker Container ==="
                    sh '''
                        docker run -d -p ${APP_PORT}:3000 --name test-app ${DOCKER_IMAGE}
                        sleep 5
                        curl -f http://localhost:${APP_PORT}/health && echo "Health check passed"
                        docker stop test-app
                        docker rm test-app
                    '''
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    echo "=== Stage: Deploy Application ==="
                    sh '''
                        docker-compose down || true
                        docker-compose up -d
                        sleep 5
                        docker-compose ps
                    '''
                }
            }
        }
        
        stage('Health Verification') {
            steps {
                script {
                    echo "=== Stage: Verify Deployment ==="
                    sh '''
                        echo "Checking application health..."
                        curl -f http://localhost:3000/health && echo "✓ Application is healthy"
                    '''
                }
            }
        }
    }
    
    post {
        always {
            echo "Pipeline execution completed"
            sh 'docker image prune -f || true'
        }
        
        success {
            echo "✓ Pipeline successful!"
        }
        
        failure {
            echo "✗ Pipeline failed!"
        }
    }
}
