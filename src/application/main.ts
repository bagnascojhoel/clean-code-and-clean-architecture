import DatabaseConnectionKnexAdapter from "../infra/database/DatabaseConnectionKnexAdapter";
import AxiosAdapter from "../infra/http-server/AxiosAdapter";
import OrderRepositoryDatabase from "../infra/repository-database/OrderRepositoryDatabase";
import RestApi from "../infra/rest/RestApi";

const dbConnection = new DatabaseConnectionKnexAdapter()
const restApi = new RestApi(new AxiosAdapter, {
    order: new OrderRepositoryDatabase(dbConnection)
})

restApi.start(3000, '/api')
