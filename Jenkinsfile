pipeline {
    agent any
    triggers { pollSCM('*/5 * * * *') // Vérifier toutes les 5 minutes
    }
    environment {
        // Ajouter la variable dh_cred comme variables d'authentification
        DOCKERHUB_CREDENTIALS = credentials('dh_cred')

    }
    stages {
        stage('Checkout'){
            agent any
            steps{
                checkout scm
            }
        }
        stage('Init'){
            steps{
                // Permet l'authentification
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        stage('Build'){
            steps {
                //Changer "epsdevops" avec votre username sur DockerHub
                sh 'docker build -t aziztn/projet_back:$BUILD_ID .'
            }
        }
        stage('Deliver'){
            steps {
                //Changer "epsdevops" avec votre username sur DockerHub
                sh 'docker push aziztn/projet_back:$BUILD_ID'
            }
        }
        stage('Cleanup'){
            steps {
                //Changer "epsdevops" avec votre username sur DockerHub
                sh 'docker rmi aziztn/projet_back:$BUILD_ID'
                sh 'docker logout'
            }
        }
    }
}
