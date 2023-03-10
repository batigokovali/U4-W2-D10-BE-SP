import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import { createWriteStream } from "fs"

const { readJSON, writeJSON, writeFile, createReadStream } = fs

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")

const mediasJSONPath = join(dataFolderPath, "medias.json")
export const getMedias = () => readJSON(mediasJSONPath)
export const writeMedias = mediasArray => writeJSON(mediasJSONPath, mediasArray)
export const saveMediasPosters = (fileName, fileContentAsBuffer) => writeFile(join(mediasPostersPublicFolderPath, fileName), fileContentAsBuffer)
export const getMediasJSONReadableStream = () => createReadStream(mediasJSONPath)
export const getMediasPDFWritableStream = fileName => createWriteStream(join(dataFolderPath, fileName))