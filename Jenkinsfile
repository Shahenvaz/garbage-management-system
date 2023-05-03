pipeline {
    agent any

    stages {
        stage('build')
        {
            sh 'docker build -t nodeadd .'
        }
        stage('tagging')
        {
            sh 'docker tag nodeapp shahenvaz7/nodeapp:20'
        }
        stage('docker push image')
        {
            sh 'docker push shahenvaz7/nodeapp:20'
        }
        stage('deploying to kubernetes') {
            steps {
                withKubeConfig([credentialsId: '591250ef-950e-4c63-8677-5b65fa983fce']){
                    sh 'kubectl set image deployment/nodeapp nodeapp=shahenvaz7/nodeapp:15'   
                }
            }
        }
        
    }
}
