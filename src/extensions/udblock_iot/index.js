const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const log = require('../../util/log');
const EXTB_LIST = require('../../util/extb-definitions')

// 方块图标链接
const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+cGVuLWljb248L3RpdGxlPjxnIHN0cm9rZT0iIzU3NUU3NSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik04Ljc1MyAzNC42MDJsLTQuMjUgMS43OCAxLjc4My00LjIzN2MxLjIxOC0yLjg5MiAyLjkwNy01LjQyMyA1LjAzLTcuNTM4TDMxLjA2NiA0LjkzYy44NDYtLjg0MiAyLjY1LS40MSA0LjAzMi45NjcgMS4zOCAxLjM3NSAxLjgxNiAzLjE3My45NyA0LjAxNUwxNi4zMTggMjkuNTljLTIuMTIzIDIuMTE2LTQuNjY0IDMuOC03LjU2NSA1LjAxMiIgZmlsbD0iI0ZGRiIvPjxwYXRoIGQ9Ik0yOS40MSA2LjExcy00LjQ1LTIuMzc4LTguMjAyIDUuNzcyYy0xLjczNCAzLjc2Ni00LjM1IDEuNTQ2LTQuMzUgMS41NDYiLz48cGF0aCBkPSJNMzYuNDIgOC44MjVjMCAuNDYzLS4xNC44NzMtLjQzMiAxLjE2NGwtOS4zMzUgOS4zYy4yODItLjI5LjQxLS42NjguNDEtMS4xMiAwLS44NzQtLjUwNy0xLjk2My0xLjQwNi0yLjg2OC0xLjM2Mi0xLjM1OC0zLjE0Ny0xLjgtNC4wMDItLjk5TDMwLjk5IDUuMDFjLjg0NC0uODQgMi42NS0uNDEgNC4wMzUuOTYuODk4LjkwNCAxLjM5NiAxLjk4MiAxLjM5NiAyLjg1NU0xMC41MTUgMzMuNzc0Yy0uNTczLjMwMi0xLjE1Ny41Ny0xLjc2NC44M0w0LjUgMzYuMzgybDEuNzg2LTQuMjM1Yy4yNTgtLjYwNC41My0xLjE4Ni44MzMtMS43NTcuNjkuMTgzIDEuNDQ4LjYyNSAyLjEwOCAxLjI4Mi42Ni42NTggMS4xMDIgMS40MTIgMS4yODcgMi4xMDIiIGZpbGw9IiM0Qzk3RkYiLz48cGF0aCBkPSJNMzYuNDk4IDguNzQ4YzAgLjQ2NC0uMTQuODc0LS40MzMgMS4xNjVsLTE5Ljc0MiAxOS42OGMtMi4xMyAyLjExLTQuNjczIDMuNzkzLTcuNTcyIDUuMDFMNC41IDM2LjM4bC45NzQtMi4zMTYgMS45MjUtLjgwOGMyLjg5OC0xLjIxOCA1LjQ0LTIuOSA3LjU3LTUuMDFsMTkuNzQzLTE5LjY4Yy4yOTItLjI5Mi40MzItLjcwMi40MzItMS4xNjUgMC0uNjQ2LS4yNy0xLjQtLjc4LTIuMTIyLjI1LjE3Mi41LjM3Ny43MzcuNjE0Ljg5OC45MDUgMS4zOTYgMS45ODMgMS4zOTYgMi44NTYiIGZpbGw9IiM1NzVFNzUiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGQ9Ik0xOC40NSAxMi44M2MwIC41LS40MDQuOTA1LS45MDQuOTA1cy0uOTA1LS40MDUtLjkwNS0uOTA0YzAtLjUuNDA3LS45MDMuOTA2LS45MDMuNSAwIC45MDQuNDA0LjkwNC45MDR6IiBmaWxsPSIjNTc1RTc1Ii8+PC9nPjwvc3ZnPg==';


class UDblockIOT {
    constructor(runtime) {
        this.runtime = runtime;
    }

    getInfo() {
        return {
            id: "udblockEXTBIOT",
            name: "人工智能拓展板",
            blockIconURI: blockIconURI,
            blocks: [
                {
                    type: "custom_seperator",
                    text: '★ 功能',
                },
                {
                    opcode: 'startSST',
                    blockType: BlockType.COMMAND,
                    text: '开始语音识别于[PORT]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: "RJMenu"
                        },
                    }
                },
                {
                    opcode: 'startSST',
                    blockType: BlockType.COMMAND,
                    text: '结束语音识别于[PORT]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: "RJMenu"
                        },
                    }
                },
                {
                    opcode: 'startTTS',
                    blockType: BlockType.COMMAND,
                    text: '开始语音合成于[PORT]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: "RJMenu"
                        },
                    }
                },
                {
                    opcode: 'startTTS',
                    blockType: BlockType.COMMAND,
                    text: '结束语音合成于[PORT]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: "RJMenu"
                        },
                    }
                },
                {
                    type: "custom_seperator",
                    text: '★ 摄像头',
                },
                {
                    opcode: 'initCamera',
                    blockType: BlockType.COMMAND,
                    text: '初始化摄像头于端口[PORT]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: "RJMenu"
                        },
                    }
                },
                {
                    opcode: 'doFaceDectection',
                    blockType: BlockType.COMMAND,
                    text: '[ACTION]人脸识别',
                    arguments: {
                        ACTION: {
                            type: ArgumentType.STRING,
                            menu: "actions"
                        },
                    }
                },
                {
                    opcode: 'doObjectDectection',
                    blockType: BlockType.COMMAND,
                    text: '[ACTION]物体识别',
                    arguments: {
                        ACTION: {
                            type: ArgumentType.STRING,
                            menu: "actions"
                        },
                    }
                },
                {
                    opcode: 'doImageDectection',
                    blockType: BlockType.COMMAND,
                    text: '[ACTION]图像处理 方式[IMGMETHOD]',
                    arguments: {
                        ACTION: {
                            type: ArgumentType.STRING,
                            menu: "actions"
                        },
                        IMGMETHOD: {
                            type: ArgumentType.STRING,
                            menu: "imageMethods"
                        }
                    }
                },
                {
                    opcode: 'doQrcodeDectection',
                    blockType: BlockType.COMMAND,
                    text: '[ACTION]二维码识别',
                    arguments: {
                        ACTION: {
                            type: ArgumentType.STRING,
                            menu: "actions"
                        },
                    }
                },
                {
                    opcode: 'doColorDectection',
                    blockType: BlockType.COMMAND,
                    text: '[ACTION]颜色识别[COLOR]',
                    arguments: {
                        ACTION: {
                            type: ArgumentType.STRING,
                            menu: "actions"
                        },
                        COLOR: {
                            type: ArgumentType.STRING,
                            menu: "color"
                        }
                    }
                },
                {
                    opcode: 'getColorDectectionResult',
                    blockType: BlockType.REPORTER,
                    text: '获取颜色识别结果[RESULT]',
                    arguments: {
                        RESULT: {
                            type: ArgumentType.STRING,
                            menu: "colorResult"
                        }
                    }
                },
                {
                    opcode: 'getFaceDectectionResult',
                    blockType: BlockType.REPORTER,
                    text: '获取人脸识别结果人名',
                },
                {
                    opcode: 'getObjectDectectionResult',
                    blockType: BlockType.REPORTER,
                    text: '获取物体识别结果',
                },
                {
                    opcode: 'getModeObjectDectectionResult',
                    blockType: BlockType.REPORTER,
                    text: '获取物体识别结果',
                },
                {
                    opcode: 'getQrcodeString',
                    blockType: BlockType.REPORTER,
                    text: '获取二维码识别结果',
                },
                {
                    opcode: 'addFace',
                    blockType: BlockType.COMMAND,
                    text: '添加人脸[NAME]',
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "steve"
                        }
                    }
                },
                {
                    opcode: 'delFace',
                    blockType: BlockType.COMMAND,
                    text: '删除人脸[NAME]',
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "steve"
                        }
                    }
                },
                {
                    opcode: 'delAllFace',
                    blockType: BlockType.COMMAND,
                    text: '删除全部人脸',
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                        }
                    }
                },
                {
                    opcode: 'switchMode',
                    blockType: BlockType.COMMAND,
                    text: '切换到模式[MODE]',
                    arguments: {
                        MODE: {
                            type: ArgumentType.STRING,
                            defautValue: "01",
                            menu: "faceModes"
                        }
                    }
                },
            ],
            menus: {
                RJMenu: {
                    acceptReporters: true,
                    items: [
                        {text:"RJ1", value:EXTB_LIST.extb_car.RJ11[0].value.join(",")},
                        {text:"RJ2", value:EXTB_LIST.extb_car.RJ11[1].value.join(",")},
                    ]
                },
                RJDigiMenu: {
                    acceptReporters: true,
                    items: [
                        {text:"RJ1", value:EXTB_LIST.extb_car.RJ11[0].value[1]},
                        {text:"RJ2", value:EXTB_LIST.extb_car.RJ11[1].value[1]},
                    ]
                },
                RJADCMenu: {
                    acceptReporters: true,
                    items: [
                        {text:"RJ1", value: EXTB_LIST.extb_car.RJ11[0].value[0]},
                        {text:"RJ2", value: EXTB_LIST.extb_car.RJ11[1].value[0]},
                    ]
                },
                colorDetectMenu:{
                    acceptReporters: true,
                    items: [{text: "红色", value:  0},{text: "绿色", value:1},{text: "蓝色", value:2},{text: "全部", value:-1},]
                }
                ,colorDetectResultMenu:{
                    acceptReporters: true,
                    items:[{text: "红色", value:"(1,0,0)"},{text: "绿色", value:"(0,1,0)"},{text: "蓝色", value:"(0,0,1)"},{text: "黄色", value:"(1,1,0)"},{text: "紫色", value:"(1,0,1)"},{text: "天蓝色", value:"(0,1,1)"},{text: "黑色", value:"(0,0,0)"},{text: "白色", value:"(1,1,1)"}]
                },
                faceMenu: {
                    acceptReporters: true,
                    items:[{text:"笑脸", value: "0x01"},{text:"调皮", value: "0x02"},{text:"得意", value: "0x03"},{text:"伤心", value: "0x04"},{text:"开心", value: "0x05"},{text:"OK", value: "0x06"},{text:"两眼发光", value: "0x07"}]
                },
                faceColorMenu: {
                    acceptReporters: true,
                    items:[{text:"红色",value: "FACE_COLOR_RED"},{text:"绿色",value: "FACE_COLOR_GREEN"},{text:"蓝色",value: "FACE_COLOR_BLUE"},{text:"红蓝",value: "FACE_COLOR_REDBLUE"},{text:"红绿",value: "FACE_COLOR_REDGREEN"},{text:"蓝绿",value: "FACE_COLOR_BLUEGREEN"},{text:"白色",value: "FACE_COLOR_RBG"}]
                },
                digitalDisplayIntensityMenu:{
                    acceptReporters: true,
                    items:[{text:"0", value: 0},{text:"1", value: 1},{text:"2", value: 2},{text:"3", value: 3},
                    {text:"4", value: 4},{text:"5", value: 5},{text:"6", value: 6},{text:"7", value: 7},{text:"8", value: 8}]
                },
                actions: {
                    acceptReporters: true,
                    items: [{ text: "开始", value: "START" },{ text: "切换", value: "SWITCH" }]
                },
                color: {
                    acceptReporters: true,
                    items: [{ text: "红色", value: "red" },{ text: "绿色", value: "green" },{ text: "蓝色", value: "blue" },{ text: "黄色", value: "yellow" },{ text: "天蓝色", value: "skyblue" },{ text: "紫色", value: "purple" },{ text: "白色", value: "white" },{ text: "黑色", value: "black" }]
                },
                imageMethods : {
                    acceptReporters: true,
                    items: [{ text: "边缘查找", value: "iess" },{ text: "锐化", value: "ishs" },{ text: "浮雕化", value: "issr" }]
                },
                colorResult: {
                    acceptReporters: true,
                    items: [{text: "X", value: "0"},{text: "Y", value: "1"},{text: "宽度", value: "2"},{text: "高度", value: "3"}]
                },
                faceModes: {
                    acceptReporters: true,
                    items: [{text: "默认模式",value: "00"},{text: "保存模式",value: "01"}]
                },
            }
        }
    }
}

module.exports = UDblockIOT;