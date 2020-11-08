import * as peg from 'pegjs'
import {Generator} from "../generateGrammarFile"
import * as fs from "fs";
import * as path from "path";

export const quickGetParserByName = (name: string, basePath: string) => {
    const grammarsName = name.replace(basePath, '').split('.').slice(0, 2).join(".")
    const generator = new Generator(basePath)
    const parserFileContent = fs.readFileSync(path.join(generator.buildPath, grammarsName)).toString()
    return peg.generate(parserFileContent)
}
