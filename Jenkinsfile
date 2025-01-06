pipeline {
    agent any
    environment {
        AWS_REGION = 'us-east-1'
        EKS_CLUSTER = 'eksdemo1'
        ECR_REPO = '537124935359.dkr.ecr.us-east-1.amazonaws.com/project-a/sample-repo'
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'test', url: 'https://github.com/Nish0508/cicd-with-jen-eks.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh '''
                    docker build -t ${ECR_REPO}:${BUILD_NUMBER} .
                    '''
                }
            }
        }
        stage('Push Docker Image to ECR') {
            steps {
                script {
                    sh '''
                    $(aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REPO})
                    docker push ${ECR_REPO}:${BUILD_NUMBER}
                    '''
                }
            }
        }
        stage('Deploy to EKS') {
            steps {
                script {
                    sh '''
                    kubectl set image deployment/backend backend=${ECR_REPO}:${BUILD_NUMBER} -n production
                    '''
                }
            }
        }
    }
    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Deployment Failed!'
        }
    }
}