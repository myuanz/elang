import {Parser} from 'jison'
import * as fs from "fs";
import * as path from "path";

const grammar = fs.readFileSync(path.join(__dirname, 'grammar/main.jison'), "utf8");
const parser = new Parser(grammar);

console.log(parser.parse("a=sddd"))

