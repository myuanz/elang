import {quickGetParserByName} from "../utils/quickGetParserByName";

const parser = quickGetParserByName(__filename, __dirname)
console.log(parser.parse("' asd"))

test('adds 1 + 2 to equal 3', () => {
    expect(parser.parse("' asd")).toEqual({type: '注释', content: 'asd'});
});


exports.testSample = {
    "' asd": {type: '注释', content: 'asd'},
    "'asd   ": {type: '注释', content: 'asd   '},
    "' assssd": {type: '注释', content: 'assssd'},
}