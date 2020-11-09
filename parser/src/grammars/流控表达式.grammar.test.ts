import {quickGetParserByName} from "../utils/quickGetParserByName";

const parser = quickGetParserByName(__filename, __dirname)

test(__filename, () => {
    const tests = {
        [`.如果 (i)
    ' i = True
    a = 2
.否则
    ' i: False
    a = 3
.如果结束`]: {
            "type": "如果",
            "条件": {
                "type": "标识符",
                "content": "i"
            },
            "应为": [
                {
                    "content": "i = True",
                    "type": "注释"
                },
                {
                    "type": "赋值",
                    "left": "a",
                    "right": {
                        "type": "数字",
                        "content": 2
                    }
                }
            ],
            "否则为": [
                {
                    "content": "i: False",
                    "type": "注释"
                },
                {
                    "type": "赋值",
                    "left": "a",
                    "right": {
                        "type": "数字",
                        "content": 3
                    }
                }
            ]
        },
        [`.如果 (i)
    ' i = True
    a = 2
.否则

.如果结束`]: {
            "type": "如果",
            "条件": {
                "type": "标识符",
                "content": "i"
            },
            "应为": [
                {
                    "content": "i = True",
                    "type": "注释"
                },
                {
                    "type": "赋值",
                    "left": "a",
                    "right": {
                        "type": "数字",
                        "content": 2
                    }
                }
            ],
            "否则为": []
        }


    }
    for (const input of Object.keys(tests)){
        expect(parser.parse(input)).toEqual(tests[input]);
    }
});