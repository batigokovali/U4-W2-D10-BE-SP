import Express from "express"
import { join } from "path"
import cors from 'cors'
import listEndpoints from "express-list-endpoints"
import createHttpError from "http-errors"
import { genericErrorHandler, badRequestHandler, unauthorizedHandler, notfoundHandler } from "./errorHandlers.js"
import mediasRouter from "./api/medias/medias.js"

const server = Express()
const port = process.env.PORT
console.log(port)
const publicFolderPath = join(process.cwd(), "./public")

const whitelist = [process.env.FE_DEV_URL, process.env.FE_PROD_URL]

//GLOBAL MIDDLEWARES

server.use(Express.static(publicFolderPath))
server.use(
    cors({
        origin: (currentOrigin, corsNext) => {
            if (!currentOrigin || whitelist.indexOf(currentOrigin) !== -1) {
                corsNext(null, true)
            } else {
                corsNext(createHttpError(400, `Origin ${currentOrigin} is not in the whitelist!`))
            }
        }
    })
)

server.use(Express.json())

//ENDPOINTS

server.use("/medias", mediasRouter)

//ERROR HANDLERS
server.use(badRequestHandler) // 400
server.use(unauthorizedHandler) // 401
server.use(notfoundHandler) // 404
server.use(genericErrorHandler) // 500

//ESSENTIALS
server.listen(port, () => {
    console.table(listEndpoints(server))
    console.log(`Server is running on port ${port}`)
})