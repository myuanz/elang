import {quickGetParserByName} from "../utils/quickGetParserByName";

const parser = quickGetParserByName(__filename, __dirname)

test(__filename, () => {
    const tests = {
        "a[2]": {
            "type": "取数组",
            "left": {
                "type": "标识符",
                "content": "a"
            },
            "right": {
                "type": "数字",
                "content": 2
            }
        },
        "a [2]": {
            "type": "取数组",
            "left": {
                "type": "标识符",
                "content": "a"
            },
            "right": {
                "type": "数字",
                "content": 2
            }
        },
        "a[ 2 ]": {
            "type": "取数组",
            "left": {
                "type": "标识符",
                "content": "a"
            },
            "right": {
                "type": "数字",
                "content": 2
            }
        },
        "a[2 + f(2)]": {
            "type": "取数组",
            "left": {
                "type": "标识符",
                "content": "a"
            },
            "right": {
                "type": "二元运算",
                "left": {
                    "type": "数字",
                    "content": 2
                },
                "right": {
                    "call": "f",
                    "args": [
                        {
                            "type": "数字",
                            "content": 2
                        }
                    ],
                    "type": "调用"
                },
                "symbol": "+"
            }
        },
    }
    for (const input of Object.keys(tests)){
        expect(parser.parse(input)).toEqual(tests[input]);
    }
});