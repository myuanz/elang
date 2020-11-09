import * as fs from "fs";
import * as path from "path";


const testTemplate = `import {quickGetParserByName} from "../utils/quickGetParserByName";

const parser = quickGetParserByName(__filename, __dirname)

test(__filename, () => {
    const tests = {
        "' asd": {type: '注释', content: 'asd'},
    }
    for (const input of Object.keys(tests)){
        expect(parser.parse(input)).toEqual(tests[input]);
    }
});`

const root = "./src/grammars/"
fs.readdirSync(root)
    .filter(t => t.endsWith('grammar') && !fs.existsSync(root + t + ".test.ts"))
    .forEach(t => {
        console.log('write to', root + t + ".test.ts")
        fs.writeFileSync(root + t + ".test.ts", testTemplate)
    })