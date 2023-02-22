const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
var bt = require('../../util/extb-definitions');
const {miscMenuBlocks, GenerateRJMenuAll} = require('../../myBlocks/menu');
// 方块图标链接
const blockIconURI = 'data:image/png;base64,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'

class UDBibiCamK210 {
    constructor(runtime) {
        this.runtime = runtime;
        bt.registerDef(this.getInfo().id);
    }

    getInfo() {
        return {
            id: "bibiCamK210",
            name: "比比智慧摄像头",
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'initCameraI2C',
                    blockType: BlockType.COMMAND,
                    text: '打开摄像头(I2C)版本[PORT]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: "RJMenu"
                        },
                    }
                },
                {
                    opcode: 'switchMode',
                    blockType: BlockType.COMMAND,
                    text: '摄像头切换到模式[MODE]',
                    arguments: {
                        MODE: {
                            type: ArgumentType.STRING,
                            menu: "kcamera_modes"
                        },
                    }
                },
                {
                    type: "custom_seperator",
                    text: '★ 物体识别',
                },
                {
                    opcode: 'getObjResult',
                    blockType: BlockType.REPORTER,
                    text: '获取物体识别结果[RESULT]',
                    arguments: {
                        RESULT: {
                            type: ArgumentType.STRING,
                            menu: "kcamera_obj_results"
                        },
                    }
                },
                {
                    type: "custom_seperator",
                    text: '★ 分类识别',
                },
                {
                    opcode: 'enterClassifierTraining',
                    blockType: BlockType.COMMAND,
                    text: '进入训练模式,类别名称[NAME]',
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Table'
                        },
                    }
                },
                {
                    opcode: 'loadClassifier',
                    blockType: BlockType.COMMAND,
                    text: '加载类别[NAME]进行识别',
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Table'
                        },
                    }
                },
                {
                    opcode: 'getClassifierResult',
                    blockType: BlockType.REPORTER,
                    text: '获取分类识别结果[RESULT]',
                    arguments: {
                        RESULT: {
                            type: ArgumentType.STRING,
                            menu: "kcamera_classifier_results"
                        },
                    }
                },
                {
                    type: "custom_seperator",
                    text: '★ 人脸识别',
                },
                {
                    opcode: 'getFaceResult',
                    blockType: BlockType.REPORTER,
                    text: '获取人脸识别结果[RESULT]',
                    arguments: {
                        RESULT: {
                            type: ArgumentType.STRING,
                            menu: "kcamera_face_results"
                        },
                    }
                },
                {
                    opcode: 'addFaceByName',
                    blockType: BlockType.REPORTER,
                    text: '添加人脸ID[NAME]',
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Steve'
                        },
                    }
                },
                {
                    opcode: 'delFaceSample',
                    blockType: BlockType.REPORTER,
                    text: '删除所有人脸识别样本',
                },
                {
                    type: "custom_seperator",
                    text: '★ 二维码/条形码识别',
                },
                {
                    opcode: 'getQRCodeResult',
                    blockType: BlockType.REPORTER,
                    text: '获取二维码结果[RESULT]',
                    arguments: {
                        RESULT: {
                            type: ArgumentType.STRING,
                            menu: "kcamera_qrcode_results"
                        },
                    }
                },
                {
                    opcode: 'getBarCodeResult',
                    blockType: BlockType.REPORTER,
                    text: '获取条形码结果[RESULT]',
                    arguments: {
                        RESULT: {
                            type: ArgumentType.STRING,
                            menu: "kcamera_barcode_results"
                        },
                    }
                },
                {
                    type: "custom_seperator",
                    text: '★ 标签识别',
                },
                {
                    opcode: 'getAprilTagResult',
                    blockType: BlockType.REPORTER,
                    text: '获取标签识别结果[RESULT]',
                    arguments: {
                        RESULT: {
                            type: ArgumentType.STRING,
                            menu: "kcamera_april_results"
                        },
                    }
                },
                {
                    type: "custom_seperator",
                    text: '★ 颜色识别',
                },
                {
                    opcode: 'startColorOpt',
                    blockType: BlockType.COMMAND,
                    text: '开始识别颜色[COLOR]',
                    arguments: {
                        COLOR: {
                            type: ArgumentType.STRING,
                            menu: "color"
                        },
                    }
                },
                {
                    opcode: 'getColorResult',
                    blockType: BlockType.REPORTER,
                    text: '获取颜色识别结果[RESULT]',
                    arguments: {
                        RESULT: {
                            type: ArgumentType.STRING,
                            menu: "kcamera_color_results"
                        },
                    }
                },
                {
                    type: "custom_seperator",
                    text: '★ 循迹识别',
                },
                {
                    opcode: 'getRouteResult',
                    blockType: BlockType.REPORTER,
                    text: '获取循迹识别结果[RESULT]',
                    arguments: {
                        RESULT: {
                            type: ArgumentType.STRING,
                            menu: "kcamera_route_results"
                        },
                    }
                },
            ],
            menus: {
                // 生成RJ11菜单，针对不同的拓展板
                ...GenerateRJMenuAll(bt.bt, bt.bt),
                ...miscMenuBlocks,
                color: {
                    acceptReporters: true,
                    items: [
                        { text: "红色", value: '(30,100,15,127,15,127)'},
                        { text: "绿色", value: '(0,80,-70,-10,-0,30)'},
                        { text: "蓝色", value: '(12,75,62,-38,-20,-68)'},
                        { text: "黄色", value: '(12,75,62,-38,-20,-68)'},
                        { text: "天蓝色", value: '(69,78,-5,-68,17,-39)'},
                        { text: "紫色", value: '(5,28,-40,61,-19,-46)'},
                        { text: "白色", value: '(97,54,-7,127,-14,9)'},
                        { text: "黑色", value: '(4,25,-120,24,-128,16)'}
                    ]
                }
            }
        }
    }

    readTouchValue(){

    }
}

module.exports = UDBibiCamK210;