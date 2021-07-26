const BlockType = require("../extension-support/block-type")
const ArgumentType = require("../extension-support/argument-type")

const cameraBlocks = [
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
        opcode: 'doModeObjectDectection',
        blockType: BlockType.COMMAND,
        text: '[ACTION]自学习识别',
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
        opcode: 'doCross',
        blockType: BlockType.COMMAND,
        text: '[ACTION]路口识别',
        arguments: {
            ACTION: {
                type: ArgumentType.STRING,
                menu: "actions"
            },
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
        text: '获取自学习识别结果',
    },
    {
        opcode: 'getQrcodeString',
        blockType: BlockType.REPORTER,
        text: '获取二维码识别结果',
    },
    {
        opcode: 'getCrossCount',
        blockType: BlockType.REPORTER,
        text: '获取路口数',
    },
    {
        opcode: 'getCrossPixel',
        blockType: BlockType.BOOLEAN,
        text: '获取是否是路口 阈值[FVALUE]',
        arguments: {
            FVALUE: {
                type: ArgumentType.NUMBER,
                defaultValue: 7000
            }
        }
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
]

module.exports = cameraBlocks;