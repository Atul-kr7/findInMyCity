pipeline {
    agent any

    environment {
        IMAGE_NAME = "atulkr7/findinmycity"
        IMAGE_TAG = "${BUILD_NUMBER}"
        DOCKER_CREDS = "docker-creds-id"
        KUBECONFIG_CRED = "kubeconfig-id"
        PATH = "/opt/homebrew/bin:/Users/atul/.rd/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    }

    stages {

        stage('SOURCE') {
            steps {
                checkout scm
            }
        }

        stage('BUILD') {
            steps {
                sh '''
                export PATH=/opt/homebrew/bin:$PATH
                node -v
                npm -v
                npm install
                '''
            }
        }

        // stage('TEST') {
        //     steps {
        //         sh '''
        //         export PATH=/opt/homebrew/bin:$PATH
        //         npm test
        //         '''
        //     }
        // }

        stage('Docker Build') {
            steps {
                sh '''
                docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest
                '''
            }
        }

        // stage('Container Image Scan') {
        //     steps {
        //         sh 'trivy image --severity HIGH,CRITICAL findinmycity:5.0'
        //     }
        // }

        stage('Push Image') {
            steps {
                script {
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
        }

        // stage('Kubernetes Manifest Scan') {
        //     steps {
        //         sh "trivy config helm/"
        //         sh "kube-score score helm/*.yaml"
        //     }
        // }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: "${KUBECONFIG_CRED}", variable: 'KUBECONFIG')]) {
                    sh """
                        kubectl apply -f helm/
                        kubectl rollout status deployment/findinmycity --timeout=2m
                        kubectl get pods -l app=findinmycity
                    """
                }
            }
        }

        // stage('Cluster Security Scan') {
        //     steps {
        //         sh "kube-bench --version"
        //         sh "kube-bench run --targets node,policies"
        //     }
        // }
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