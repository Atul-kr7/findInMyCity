pipeline {
    agent any

    environment {
        IMAGE_NAME = "yourdockerhub/app"
        IMAGE_TAG = "${BUILD_NUMBER}"
        DOCKER_CREDS = "docker-creds-id"
        KUBECONFIG_CRED = "kubeconfig-id"
    }

    stages {

        stage('SOURCE') {
            steps {
                checkout scm
            }
        }

        stage('BUILD') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('TEST') {
            steps {
                sh 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t $IMAGE_NAME:$IMAGE_TAG ."
            }
        }

        stage('Container Image Scan') {
            steps {
                sh "trivy image --severity HIGH,CRITICAL $IMAGE_NAME:$IMAGE_TAG"
            }
        }

        stage('Push Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "${DOCKER_CREDS}",
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh """
                        echo $PASS | docker login -u $USER --password-stdin
                        docker push $IMAGE_NAME:$IMAGE_TAG
                    """
                }
            }
        }

        stage('Kubernetes Manifest Scan') {
            steps {
                sh "trivy config k8s/"
                sh "kube-score score k8s/*.yaml"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: "${KUBECONFIG_CRED}", variable: 'KUBECONFIG')]) {
                    sh """
                        kubectl apply -f k8s/
                        kubectl rollout status deployment/app
                    """
                }
            }
        }

        stage('Cluster Security Scan') {
            steps {
                sh "kube-bench --version"
                sh "kube-bench run --targets node,policies"
            }
        }

        stage('Deploy Istio Resources') {
            steps {
                sh """
                    kubectl apply -f istio/gateway.yaml
                    kubectl apply -f istio/virtualservice.yaml
                    kubectl apply -f istio/destinationrule.yaml
                """
            }
        }

        stage('Istio Validation') {
            steps {
                sh "istioctl analyze"
            }
        }
    }

    post {
        success {
            echo "Application deployed successfully with Kubernetes + Istio 🚀"
        }
        failure {
            echo "Pipeline failed ❌"
        }
    }
}