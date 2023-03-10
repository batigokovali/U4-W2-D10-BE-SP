import { checkSchema, validationResult } from "express-validator"
import createHttpError from "http-errors"

const mediasSchema = {
    title: {
        in: ["body"],
        isString: {
            errorMessage: "Title is a mandatory field and needs to be a string!"
        }
    },
    year: {
        in: ["body"],
        isNumeric: {
            errorMessage: "Year is a mandatory field and needs to be a number!"
        }
    },
    imdbID: {
        in: ["body"],
        isString: {
            errorMessage: "ImdbID is a mandatory field and needs to be a string!"
        }
    },
}

export const checkMediasSchema = checkSchema(mediasSchema)

export const triggerBadRequest = (req, res, next) => {
    const errors = validationResult(req)
    console.log(errors.array())
    if (errors.isEmpty()) {
        next()
    } else {
        next(createHttpError(400, "Errors during blogpost validation", { errorsList: errors.array() }))
    }
}