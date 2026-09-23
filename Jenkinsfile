pipeline {

    agent any

    parameters {
        choice(
            name: 'ENVIRONMENT',
            choices: ['QA', 'DEV', 'UAT'],
            description: 'Select the environment to run Playwright tests'
        )
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Set Environment') {
            steps {
                script {

                    if (params.ENVIRONMENT == 'DEV') {
                        env.BASE_URL = 'https://dev.example.com'
                        env.CREDENTIAL_ID = 'DEV_SAUCE_CREDENTIALS'
                    }

                    else if (params.ENVIRONMENT == 'QA') {
                        env.BASE_URL = 'https://www.saucedemo.com'
                        env.CREDENTIAL_ID = 'QA_SAUCE_CREDENTIALS'
                    }

                    else if (params.ENVIRONMENT == 'UAT') {
                        env.BASE_URL = 'https://uat.example.com'
                        env.CREDENTIAL_ID = 'UAT_SAUCE_CREDENTIALS'
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browser') {
            steps {
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Playwright Tests') {
            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: env.CREDENTIAL_ID,
                        usernameVariable: 'SAUCE_USERNAME',
                        passwordVariable: 'SAUCE_PASSWORD'
                    )
                ]) {

                    bat 'npx playwright test'
                }
            }
        }

        stage('Check Test Results') {
            steps {
                bat 'dir test-results /s'
            }
        }
    }

    post {

        always {
            echo 'Archiving Playwright test results...'

            archiveArtifacts(
                artifacts: 'test-results/**/*',
                allowEmptyArchive: true
            )
        }
    }
}