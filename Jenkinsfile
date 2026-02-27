pipeline {
    agent any

    tools {
        nodejs 'node18'   // configured in Jenkins → Global Tool Configuration
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'feature/update',
                    url: 'https://github.com/Atul-kr7/findInMyCity'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Angular App') {
            steps {
                sh 'ng build --configuration=production'
            }
        }

        stage('Deploy to Server') {
            steps {
                sh '''
                sudo rm -rf /var/www/html/*
                sudo cp -r dist/* /var/www/html/
                '''
            }
        }
    }

    post {
        success {
            echo 'Angular App Deployed Successfully 🚀'
        }
        failure {
            echo 'Deployment Failed ❌'
        }
    }
}
