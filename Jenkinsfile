pipeline {
    agent any

    stages {
        stage('build')
        {
            steps{
                sh 'docker build -t nodeapp .'
            }
            
        }
        stage('deploying to testing') {
            steps {
                sh 'docker run -dp 8081:8081 nodeapp'
            }
        }
        stage('testing')
        {
            steps{
                sh 'npm test'
            }
        }
    }
}
