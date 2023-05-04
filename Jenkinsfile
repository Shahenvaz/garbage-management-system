pipeline {
    agent any
     environment { 
        CH = sh (script: "git log -n 1 --pretty=format:'%H'", returnStdout: true)
    }
    stages {
        stage('build')
        {
            steps{
                sh 'docker build -t nodeapp .'
            }
            
        }
        stage('tagging')
        {
            steps{
                sh 'docker tag nodeapp shahenvaz7/nodeapp:$(printenv CH)'
            }
        }
        stage('docker push image')
        {
            steps
            {
                sh 'docker push shahenvaz7/nodeapp:$(printenv CH)'
            }
        }
        stage('deploying to kubernetes') {
            steps {
                withKubeConfig([credentialsId: '591250ef-950e-4c63-8677-5b65fa983fce']){
                    sh 'kubectl apply -f k8s/nodeApp.yml'
                    sh 'kubectl apply -f k8s/nodeService.yml'
                    sh 'kubectl apply -f k8s/mongodb.yml'
                    sh 'kubectl apply -f k8s/mongodbservice.yml'
                    sh 'kubectl set image deployment/nodeapp nodeapp=shahenvaz7/nodeapp:$(printenv CH)'   
                }
            }
        }
        
    }
} 