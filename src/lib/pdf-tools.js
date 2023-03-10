import PdfPrinter from "pdfmake";
import imageToBase64 from "image-to-base64";
import { pipeline } from "stream"
import { promisify } from "util"
import { getMediasPDFWritableStream } from "./fs-tools.js";
import { join } from "path";


export const getMediasPDFReadableStream = async media => {
    // Define font files
    const fonts = {
        Courier: {
            normal: "Courier",
            bold: "Courier-Bold",
            italics: "Courier-Oblique",
            bolditalics: "Courier-BoldOblique",
        },
        Helvetica: {
            normal: "Helvetica",
            bold: "Helvetica-Bold",
            italics: "Helvetica-Oblique",
            bolditalics: "Helvetica-BoldOblique",
        },
    }

    const printer = new PdfPrinter(fonts)

    const coverBase64 = await imageToBase64(media.poster);

    const content = [media.title, media.year, media.imdbID, media.type, {
        image: `data:image/jpeg;base64,${coverBase64}`,
        width: 150,
        height: 150
    }]

    const docDefinition = {
        content: [...content],
        defaultStyle: {
            font: "Helvetica",
        },
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                font: "Courier",
            },
            subheader: {
                fontSize: 15,
                bold: false,
            },
        },
    }

    const pdfReadableStream = printer.createPdfKitDocument(docDefinition)
    pdfReadableStream.end()

    return pdfReadableStream
}

export const asyncPDFGeneration = async (media) => {
    const source = await getMediasPDFReadableStream(media)
    const destination = getMediasPDFWritableStream(`${media.imdbID}.pdf`)
    const promiseBasedPipeline = promisify(pipeline)
    await promiseBasedPipeline(source, destination)
}