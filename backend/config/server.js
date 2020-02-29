import express from 'express'
import consign from 'consign'
import { urlencoded } from 'body-parser'
import expressValidator from 'express-validator'

const app = express()

app.set('view engine', 'ejs')
app.set('views', './app/views')

app.use(express.static('./app/public'))

app.use(urlencoded({
    extended: true
}))

app.use(expressValidator())

consign()
    .include('app/routes')
    .then('app/models')
    .then('config/dbConnectionMongo.js')
    .then('config/dbConnectionMySql.js')
    .then('app/controllers')
    .into(app)

export default app