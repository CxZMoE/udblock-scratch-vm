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
        ...motor,
        ...servo,
    ]
}

module.exports = actionBlocks;