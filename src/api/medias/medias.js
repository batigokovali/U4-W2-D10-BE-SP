import Express from "express";
import multer from "multer"
import uniqid from "uniqid"
import createHttpError from "http-errors";
import { checkMediasSchema, triggerBadRequest } from "./validation.js";
import { getMedias, writeMedias } from "../../lib/fs-tools.js";
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import { asyncPDFGeneration } from "../../lib/pdf-tools.js";
import { getMediasPDFReadableStream } from "../../lib/pdf-tools.js";
import { pipeline } from "stream";

const mediasRouter = Express.Router()

const cloudinaryUploader = multer({
    storage: new CloudinaryStorage({
        cloudinary,
        params: {
            folder: "U4-W2-D10-Netflix-API/posters"
        },
    }),
}).single("poster")

mediasRouter.post("/", checkMediasSchema, triggerBadRequest, async (req, res, next) => {
    try {
        const newMedia = { ...req.body }
        const mediasArray = await getMedias()
        mediasArray.push(newMedia)
        await writeMedias(mediasArray)
        res.send(newMedia)
    } catch (error) {
        next(error)
    }
})

mediasRouter.get("/", async (req, res, next) => {
    try {
        const medias = await getMedias()
        if (req.query && req.query.title) {
            const filteredMedias = medias.filter(media => media.title.toLowerCase().includes(req.query.title.toLowerCase()))
            res.send(filteredMedias)
        } else {
            res.send(medias)
        }
    } catch (error) {
        next(error)
    }
})

mediasRouter.get("/:mediaID", async (req, res, next) => {
    try {
        const medias = await getMedias()
        const foundMedia = medias.find(media => media.imdbID === req.params.mediaID)
        if (foundMedia) {
            res.send(foundMedia)
        } else {
            next(createHttpError(404, `Media with imdbID ${req.params.mediaID} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

mediasRouter.post("/:mediaID/poster", cloudinaryUploader, async (req, res, next) => {
    try {
        const medias = await getMedias()
        const i = medias.findIndex((media) => media.imdbID === req.params.mediaID)
        if (i !== -1) {
            medias[i].poster = req.file.path;
            await writeMedias(medias);
            res.status(201).send({
                success: "true",
                message: `Poster successfully added to media with id ${req.params.mediaID}`,
            })
        } else {
            next(createHttpError(404, `Media with id ${req.params.mediaID} not found!`))
        }
    } catch (error) {

    }
})

mediasRouter.get("/:mediaID/pdf", async (req, res, next) => {
    try {
        const medias = await getMedias()
        const filteredMedia = medias.find(media => media.imdbID === req.params.mediaID)
        if (filteredMedia) {
            res.setHeader("Content-Disposition", `attachment; filename=${filteredMedia.imdbID}.pdf`);
            const source = await getMediasPDFReadableStream(filteredMedia)
            const destination = res;
            pipeline(source, destination, (err) => {
                console.log(err)
            })
        } else {
            next(createHttpError(404, `Media with id ${req.params.mediaID} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

export default mediasRouter