import * as fs from 'fs'
import * as path from 'path'

import {Generator} from "../generateGrammarFile"


const generator = new Generator("./grammars")

generator.BuildAll().forEach(file => {
    console.log(file, fs.existsSync(file + ".test.js"))
    const testFilePath = path.join(generator.basePath, file + ".test.js")
    if (fs.existsSync(testFilePath)){
        const testSample = require(testFilePath).testSample
        console.log(testSample)
    }
})