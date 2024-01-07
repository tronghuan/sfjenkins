#!groovy

import groovy.json.JsonSlurperClassic

node {
    def BUILD_NUMBER=env.BUILD_NUMBER
    def RUN_ARTIFACT_DIR="tests/${BUILD_NUMBER}"
    def SFDC_USERNAME

    def HUB_ORG="huan@daotrong.com"
    def SFDC_HOST="https://login.salesforce.com/"
    def JWT_KEY_CRED_ID="705d27fd-a93d-45f8-aeb1-1a9c7731f96d"
    def CONNECTED_APP_CONSUMER_KEY="3MVG95mg0lk4bathnRmPKo9JXuOCfrzAgjSS_rOd78cFEeKTWmqmL3bv4oGVhr9rqQxZZk.OrgCZA7C0iyr3e"

    println 'KEY IS'
    println JWT_KEY_CRED_ID
    println HUB_ORG
    println SFDC_HOST
    println CONNECTED_APP_CONSUMER_KEY
    def toolbelt = tool 'toolbelt'

    stage('checkout source') {
        // When running in multi-branch job, one must issue this command
        checkout scm
    }

    withCredentials([file(credentialsId: JWT_KEY_CRED_ID, variable: 'jwt_key_file')]){
        stage('Deploy Code'){
            if (isUnix()) {
                rc = sh returnStatus: true, script: "${toolbelt} force:auth:jwt:grant --clientid ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG} --jwtkeyfile ${jwt_key_file} --setdefaultdevhubusername --instanceurl ${SFDC_HOST}"
            } else {
                rc = bat returnStatus: true, script: "\"${toolbelt}\" force:auth:jwt:grant --clientid ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG}  --jwtkeyfile \"${jwt_key_file}\" --setdefaultdevhubusername --instanceurl ${SFDC_HOST}"
            }

            if (rc != 0) {
                error 'hub org authorzation failed'
            }

            println rc

            // need to pull out assigned username
            if (isUnix()) {
                rmsg = sh returnStdout: true, script: "${toolbelt} project deploy start --metadata ApexClass -o ${HUB_ORG}"
            } else {
                rmsg = bat returnStdout: true, script: "\"${toolbelt}\" project deploy start --metadata ApexClass -o ${HUB_ORG}"
            }

            printf rmsg
            println('Hello from a Job DSL script!')
            println(rmsg)
        }
    }
}
