import * as fs from 'fs'
import * as path from 'path'
import * as peg from 'pegjs'

import {Generator} from "../generateGrammarFile"


interface TestSample {
    [from: string]: string
}

const generator = new Generator("./grammars")

generator.BuildAll().forEach(file => {
    const testFilePath = path.join(generator.basePath, file + ".test.js")
    const parserFileContent = fs.readFileSync(path.join(generator.buildPath, file)).toString()
    if (fs.existsSync(testFilePath)){
        const testSample: TestSample = require(testFilePath).testSample
        const parser = peg.generate(parserFileContent)
        for (const from in testSample){
            const t1 = parser.parse(from)
            const t2 = testSample[from]
            console.log(t1, t2, t1==t2)
        }
    }
})