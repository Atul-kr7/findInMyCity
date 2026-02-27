pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/Atul-kr7/findInMyCity.git'
            }
        }

        stage('Build') {
            steps {
                sh 'echo Building Project'
                sh 'ls -la'
            }
        }

        stage('Test') {
            steps {
                sh 'echo Testing Project'
            }
        }
    }
}