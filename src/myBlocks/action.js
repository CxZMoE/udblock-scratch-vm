const BlockType = require("../extension-support/block-type")
const ArgumentType = require("../extension-support/argument-type")

function actionBlocks(hasMotor=true,hasServo=true) {
    var motor = []
    var servo = []
    if (hasMotor){
        motor = [
            {
                type: "custom_seperator",
                text: '★ ▶ 电机',
            },
            {
                opcode: 'turnMotorClock',
                blockType: BlockType.COMMAND,
                text: '电机[PORT]正转速度[SPEED]%',
                arguments: {
                    PORT: {
                        type: ArgumentType.NUMBER,
                        menu: "motorMenu"
                    },
                    SPEED: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 50
                    }
                }
            },
            {
                opcode: 'turnMotorAnticlock',
                blockType: BlockType.COMMAND,
                text: '电机[PORT]反转速度[SPEED]%',
                arguments: {
                    PORT: {
                        type: ArgumentType.NUMBER,
                        menu: "motorMenu"
                    },
                    SPEED: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 50
                    }
                }
            },
            {
                opcode: 'closeMotor',
                blockType: BlockType.COMMAND,
                text: '电机[PORT]停止',
                arguments: {
                    PORT: {
                        type: ArgumentType.NUMBER,
                        menu: "motorMenu"
                    },
                }
            }
        ]
    }
    if (hasServo){
        servo = [
            {
                type: "custom_seperator",
                text: '★ ▶ 舵机',
            },
            {
                opcode: 'turnServoDegree',
                blockType: BlockType.COMMAND,
                text: '舵机[PORT]旋转[DEGREE]°',
                arguments: {
                    PORT: {
                        type: ArgumentType.NUMBER,
                        menu: "servoMenu"
                    },
                    DEGREE: {
                        type: ArgumentType.ANGLE,
                        defaultValue: 90
                    }
                }
            }
        ]
    }


    return [
        {
            type: "custom_seperator",
            text: '★ 执行器',
        },
        {
            type: "custom_seperator",
            text: '★ ▶ 数码管',
        },
        {
            opcode: 'digitalDisplayShow',
            blockType: BlockType.COMMAND,
            text: '数码管显示数字[NUM]',
            arguments: {
                NUM: {
                    type: ArgumentType.NUMBER,
                    defaultValue: 500
                }
            }
        },
        {
            opcode: 'digitalDisplayClear',
            blockType: BlockType.COMMAND,
            text: '数码管清屏'
        },
        {
            opcode: 'digitalDisplayOpen',
            blockType: BlockType.COMMAND,
            text: '数码管开启'
        },
        {
            opcode: 'digitalDisplayClose',
            blockType: BlockType.COMMAND,
            text: '数码管关闭'
        },
        {
            opcode: 'digitalDisplayIntensity',
            blockType: BlockType.COMMAND,
            text: '数码管设置亮度[VALUE]',
            arguments: {
                VALUE: {
                    type: ArgumentType.NUMBER,
                    defaultValue: 8,
                    menu: "digitalDisplayIntensityMenu"
                }
            }
        },

        {
            type: "custom_seperator",
            text: '★ ▶ RGB灯带',
        },
        {
            opcode: 'openRGBStrip',
            blockType: BlockType.COMMAND,
            text: '打开RGB灯条[PORT]灯珠数量[COUNT]',
            arguments: {
                PORT: {
                    type: ArgumentType.STRING,
                    menu: "RJMenu"
                },
                COUNT: {
                    type: ArgumentType.NUMBER,
                    defaultValue: 15
                }
            }
        },
        {
            opcode: 'setRGBStripLuminance',
            blockType: BlockType.COMMAND,
            text: '设置RGB灯条[PORT]亮度[NUM]%',
            arguments: {
                PORT: {
                    type: ArgumentType.STRING,
                    menu: "RJMenu"
                },
                NUM: {
                    type: ArgumentType.NUMBER,
                    defaultValue: 20
                }
            }
        },
        {
            opcode: 'setRGBStripIndexColor',
            blockType: BlockType.COMMAND,
            text: '设置RGB灯条[PORT][INDEX]号灯颜色[COLOR]',
            arguments: {
                PORT: {
                    type: ArgumentType.STRING,
                    menu: "RJMenu"
                },
                INDEX: {
                    type: ArgumentType.NUMBER,
                    defaultValue: 1
                },
                COLOR: {
                    type: ArgumentType.COLOR
                }
            }
        },
        {
            opcode: 'setRGBStripIndexOnlyColor',
            blockType: BlockType.COMMAND,
            text: '设置RGB灯条[PORT]只有[INDEX]号灯显示[COLOR]',
            arguments: {
                PORT: {
                    type: ArgumentType.STRING,
                    menu: "RJMenu"
                },
                INDEX: {
                    type: ArgumentType.NUMBER,
                    defaultValue: 1
                },
                COLOR: {
                    type: ArgumentType.COLOR
                }
            }
        },
        {
            opcode: 'setRGBStripClear',
            blockType: BlockType.COMMAND,
            text: '设置RGB灯条[PORT]颜色[COLOR]',
            arguments: {
                PORT: {
                    type: ArgumentType.STRING,
                    menu: "RJMenu"
                },
                COLOR: {
                    type: ArgumentType.COLOR
                }
            }
        },
        ...motor,
        ...servo,
        {
            type: "custom_seperator",
            text: '★ ▶ 继电器',
        },
        {
            opcode: 'openReplay',
            blockType: BlockType.COMMAND,
            text: '打开继电器[PORT]',
            arguments: {
                PORT: {
                    type: ArgumentType.STRING,
                    menu: "RJMenu"
                }
            }
        },
        {
            opcode: 'closeReplay',
            blockType: BlockType.COMMAND,
            text: '关闭继电器[PORT]',
            arguments: {
                PORT: {
                    type: ArgumentType.STRING,
                    menu: "RJMenu"
                }
            }
        },
        {
            opcode: 'switchReplay',
            blockType: BlockType.COMMAND,
            text: '切换继电器[PORT]',
            arguments: {
                PORT: {
                    type: ArgumentType.STRING,
                    menu: "RJMenu"
                }
            }
        },
        
        
        {
            type: "custom_seperator",
            text: '★ ▶ 表情面板',
        },
        {
            opcode: 'setFacePanelCustomized',
            blockType: BlockType.COMMAND,
            text: '设置表情面板为自定义[FACE]颜色[COLOR]',
            arguments: {
                FACE: {
                    type: ArgumentType.MATRIXUD,
                    defaultValue: '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
                },
                COLOR: {
                    type: ArgumentType.COLOR
                }
            }
        },
        {
            opcode: 'setFacePanelPreset',
            blockType: BlockType.COMMAND,
            text: '设置表情面板为预设[FACE]颜色[COLOR]',
            arguments: {
                FACE: {
                    type: ArgumentType.STRING,
                    menu: "faceMenu"
                },
                COLOR: {
                    type: ArgumentType.COLOR,
                    menu: "faceColorMenu"
                }
            }
        },
    ]
}

module.exports = actionBlocks;