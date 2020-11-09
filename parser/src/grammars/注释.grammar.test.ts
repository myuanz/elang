import {quickGetParserByName} from "../utils/quickGetParserByName";

const parser = quickGetParserByName(__filename, __dirname)

test(__filename, () => {
    const tests = {
        "' asd": {type: '注释', content: 'asd'},
        "'    asd": {type: '注释', content: 'asd'},
        "''''asd": {type: '注释', content: "'''asd"},
    }
    for (const input of Object.keys(tests)){
        expect(parser.parse(input)).toEqual(tests[input]);
    }
});