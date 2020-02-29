import { createConnection } from 'mysql'

const connMySql = () =>
    createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: ''
    })
    
export default () => connMySql