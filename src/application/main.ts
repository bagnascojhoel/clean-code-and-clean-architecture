import DatabaseConnectionKnexAdapter from "../infra/database/DatabaseConnectionKnexAdapter";
import OrderRepositoryDatabase from "../infra/repository-database/OrderRepositoryDatabase";
import AxiosAdapter from "../presentation/http-server/AxiosAdapter";
import RestApi from "../presentation/rest/RestApi";

const dbConnection = new DatabaseConnectionKnexAdapter()
const restApi = new RestApi(new AxiosAdapter, {
    order: new OrderRepositoryDatabase(dbConnection)
})

restApi.start(3000, '/api')
