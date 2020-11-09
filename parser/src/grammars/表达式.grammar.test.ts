import {quickGetParserByName} from "../utils/quickGetParserByName";

const parser = quickGetParserByName(__filename, __dirname)

test(__filename, () => {
    const tests = {
        "a = 2": {
            "left": "a",
            "right": {
                "content": 2,
                "type": "数字"
            },
            "type": "赋值"
        },
        "a = b(c, d(x, 3))": {
            "type": "赋值",
            "left": "a",
            "right": {
                "call": "b",
                "args": [
                    {
                        "type": "标识符",
                        "content": "c"
                    },
                    {
                        "call": "d",
                        "args": [
                            {
                                "type": "标识符",
                                "content": "x"
                            },
                            {
                                "type": "数字",
                                "content": 3
                            }
                        ],
                        "type": "调用"
                    }
                ],
                "type": "调用"
            }
        },
        "t ＝ t ％ 2": {
            "type": "赋值",
            "left": "t",
            "right": {
                "type": "二元运算",
                "left": {
                    "type": "标识符",
                    "content": "t"
                },
                "right": {
                    "type": "数字",
                    "content": 2
                },
                "symbol": "％"
            }
        }
    }
    for (const input of Object.keys(tests)) {
        expect(parser.parse(input)).toEqual(tests[input]);
    }
});