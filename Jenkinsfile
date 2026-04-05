pipeline {
    agent any

    environment {
        IMAGE_NAME = "atulkr7/findinmycity"
        IMAGE_TAG = "${BUILD_NUMBER}"
        DOCKER_CREDS = "dockerhub-creds"
        KUBECONFIG_CRED = "kubeconfig-id"

        ARTIFACTORY_URL = "http://localhost:8082/artifactory/api/npm/npm-local/"
        ARTIFACTORY_CREDS = "artifactory-creds"

        PATH = "/opt/homebrew/bin:/Users/atul/.rd/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    }

    stages {

        stage('Checkout Source') {
            steps {
                checkout scm
            }
        }

        stage('Build Application') {
            steps {
                sh '''
                export PATH=/opt/homebrew/bin:$PATH
                node -v
                npm -v
                npm install
                '''
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'scanner1.0'
                    withSonarQubeEnv('SonarQube') {
                        sh """
                        ${scannerHome}/bin/sonar-scanner
                        """
                    }
                }
            }
        }

        stage('Publish to Artifactory') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "${ARTIFACTORY_CREDS}",
                    usernameVariable: 'ART_USER',
                    passwordVariable: 'ART_PASS'
                )]) {
                    sh '''
                    npm config set registry ${ARTIFACTORY_URL}
                    npm login --registry=${ARTIFACTORY_URL} <<EOF
                    $ART_USER
                    $ART_PASS
                    email@example.com
                    EOF
                    npm publish
                    '''
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest
                '''
            }
        }

        stage('Push Image to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "${DOCKER_CREDS}",
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                    set +x
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    set -x
                    docker push ${IMAGE_NAME}:${IMAGE_TAG}
                    docker push ${IMAGE_NAME}:latest
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: "${KUBECONFIG_CRED}", variable: 'KUBECONFIG')]) {
                    sh """
                    export KUBECONFIG=$KUBECONFIG
                    kubectl cluster-info
                    kubectl get nodes
                    kubectl apply -f helm/
                    kubectl rollout status deployment/findinmycity --timeout=2m
                    """
                }
            }
        }

        stage('Terraform Deploy') {
            steps {
                dir('terraform') {
                    sh '''
                    terraform init
                    terraform apply -auto-approve
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "Application deployed successfully 🚀"
        }
        failure {
            echo "Pipeline failed ❌"
        }
    }
}