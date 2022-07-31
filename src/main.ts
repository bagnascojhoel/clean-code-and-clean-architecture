import DatabaseConnectionKnexAdapter from "./infrastructure/database/DatabaseConnectionKnexAdapter";
import DatabaseRepositoryFactory from "./infrastructure/database/repository/DatabaseRepositoryFactory";
import AxiosAdapter from "./presentation/http-server/AxiosAdapter";
import RestApi from "./presentation/rest/RestApi";

const dbConnection = new DatabaseConnectionKnexAdapter()
const restApi = new RestApi(new AxiosAdapter, new DatabaseRepositoryFactory(dbConnection))

restApi.start(3000, '/api')
