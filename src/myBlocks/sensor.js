const BlockType = require("../extension-support/block-type")
const ArgumentType = require("../extension-support/argument-type")

const sensorBlocks = [
    {
        type: "custom_seperator",
        text: '★ 传感器',
    },
    {
        type: "custom_seperator",
        text: '★> NFC传感器',
    },
    {
        opcode: 'initNFC',
        blockType: BlockType.COMMAND,
        text: '初始化NFC传感器',
    },
    {
        opcode: 'startPolling',
        blockType: BlockType.COMMAND,
        text: '开始检测NFC卡',
    },
    {
        opcode: 'stopPolling',
        blockType: BlockType.COMMAND,
        text: '停止检测NFC卡',
    },
    {
        opcode: 'getUID',
        blockType: BlockType.REPORTER,
        text: '获取卡号',
    },
    {
        opcode: 'readRainDropSensor',
        blockType: BlockType.REPORTER,
        text: '读取雨滴传感器于[PORT]',
        arguments: {
            PORT: {
                type: ArgumentType.STRING,
                menu: "RJDigiMenu"
            }
        }
    },
    {
        opcode: 'readSoundSensor',
        blockType: BlockType.REPORTER,
        text: '读取声音传感器于[PORT]',
        arguments: {
            PORT: {
                type: ArgumentType.STRING,
                menu: "RJADCMenu"
            }
        }
    },
    {
        opcode: 'readSmartGrayscaleSensor',
        blockType: BlockType.REPORTER,
        text: '读取智能灰度传感器于[PORT]',
        arguments: {
            PORT: {
                type: ArgumentType.STRING,
                menu: "RJDigiMenu"
            }
        }
    },
    {
        opcode: 'detectColorSensorColor',
        blockType: BlockType.REPORTER,
        text: '判断颜色识别传感器为[COLOR]',
        arguments: {
            COLOR: {
                type: ArgumentType.STRING,
                menu: "colorDetectResultMenu"
            }
        }
    },
    {
        opcode: 'readAmbientLightSensor',
        blockType: BlockType.REPORTER,
        text: '读取环境光传感器于[PORT]',
        arguments: {
            PORT: {
                type: ArgumentType.STRING,
                menu: "RJADCMenu"
            }
        }
    },
    {
        opcode: 'readSonicSensor',
        blockType: BlockType.REPORTER,
        text: '读取超声波传感器于[PORT]',
        arguments: {
            PORT: {
                type: ArgumentType.STRING,
                menu: "RJMenu"
            }
        }
    },
    {
        opcode: 'readRouteFindingSensor',
        blockType: BlockType.REPORTER,
        text: '读取巡线传感器于[PORT]',
        arguments: {
            PORT: {
                type: ArgumentType.STRING,
                menu: "RJDigiMenu"
            }
        }
    },
    {
        opcode: 'readFlameSensor',
        blockType: BlockType.BOOLEAN,
        text: '火焰传感器于[PORT]检测到火焰',
        arguments: {
            PORT: {
                type: ArgumentType.STRING,
                menu: "RJDigiMenu"
            }
        }
    },
    {
        opcode: 'readFlameSensoADC',
        blockType: BlockType.REPORTER,
        text: '读取火焰传感器模拟量于[PORT]',
        arguments: {
            PORT: {
                type: ArgumentType.STRING,
                menu: "RJADCMenu"
            }
        }
    },
    {
        opcode: 'readGrayScaleSensor',
        blockType: BlockType.REPORTER,
        text: '读取模拟灰度传感器于[PORT]',
        arguments: {
            PORT: {
                type: ArgumentType.STRING,
                menu: "RJADCMenu"
            }
        }
    },
    {
        opcode: 'readSmokeSensor',
        blockType: BlockType.REPORTER,
        text: '读取模拟烟雾传感器于[PORT]',
        arguments: {
            PORT: {
                type: ArgumentType.STRING,
                menu: "RJADCMenu"
            }
        }
    },
    {
        opcode: 'readDirtHumiditySensor',
        blockType: BlockType.REPORTER,
        text: '读取土壤湿度传感器于[PORT]',
        arguments: {
            PORT: {
                type: ArgumentType.STRING,
                menu: "RJADCMenu"
            }
        }
    }, 
    {
        opcode: 'readDSTempSensor',
        blockType: BlockType.REPORTER,
        text: '读取防水温度传感器于[PORT]',
        arguments: {
            PORT: {
                type: ArgumentType.STRING,
                menu: "RJMenu"
            }
        }
    },  
]

module.exports = sensorBlocks;