pipeline {
    agent any

    stages {
        stage('build')
        {
            steps{
                sh 'npm update'
            }
            
        }
        stage('deploying to testing') {
            steps {
                sh 'npm start'
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
