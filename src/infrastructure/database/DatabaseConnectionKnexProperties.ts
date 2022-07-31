import KNEX_CONFIG from '../../../knexfile'

export default class DatabaseConnectionProperties {

    public getConfig(env: string) {
        switch (env) {
            case 'test':
                return KNEX_CONFIG.test
            default:
            case 'development':
                return KNEX_CONFIG.development
        }
    }

}
