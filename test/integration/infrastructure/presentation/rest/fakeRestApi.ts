import DatabaseConnectionKnexAdapter from "../../../../../src/infrastructure/database/DatabaseConnectionKnexAdapter"
import DatabaseRepositoryFactory from "../../../../../src/infrastructure/database/repository/DatabaseRepositoryFactory"
import AxiosAdapter from "../../../../../src/infrastructure/http-server/AxiosAdapter"
import RestApi from "../../../../../src/infrastructure/rest/RestApi"

let isUp: boolean = false
let clients: number = 0
const dbConnection = new DatabaseConnectionKnexAdapter()
const restApi = new RestApi(new AxiosAdapter(() => isUp = true), new DatabaseRepositoryFactory(dbConnection))

export async function up() {
    clients++
    if (!isUp) restApi.start(9999, '/api')
    await sleep(3000)
}

export async function down() {
    clients--
    if (clients === 0)
        restApi.stop()
}

export const FAKE_REST_API_URL = 'http://localhost:9999/api'

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}