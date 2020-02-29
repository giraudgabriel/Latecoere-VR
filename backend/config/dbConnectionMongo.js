import { Db, Server } from 'mongodb'

const connMongoDB = () => {
    const db = new Db(
        '',//db
        new Server(
            'localhost', // endereço do servidor bd
            27017, // porta de conexão
            {}
        ), {}
    )
    return db
}

export default () => {
    return connMongoDB
}