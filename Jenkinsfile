pipeline {
    agent any

    environment {
        IMAGE_NAME = "yourdockerhub/app"
        IMAGE_TAG = "${BUILD_NUMBER}"
        DOCKER_CREDS = "docker-creds-id"
        KUBECONFIG_CRED = "kubeconfig-id"
        // PATH = "/Users/atul/.rd/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
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
                sh 'docker build -t yourdockerhub/app:14 .'
            }
        }

        // stage('Container Image Scan') {
        //     steps {
        //         sh 'trivy image --severity HIGH,CRITICAL findinmycity:5.0'
        //     }
        // }

        stage('Push Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "${DOCKER_CREDS}",
                    usernameVariable: 'atulkr7',
                    passwordVariable: 'AT@95041ul'
                )]) {
                    sh """
                        echo $AT@95041ul | docker login -u $atulkr7 --password-stdin
                        docker push atulkr7/findinmycity:tagname
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