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
    // {
    //     opcode: 'initNFC',
    //     blockType: BlockType.COMMAND,
    //     text: '初始化NFC传感器',
    // },
    {
        opcode: 'startPolling',
        blockType: BlockType.COMMAND,
        text: '启动NFC传感器',
    },
    {
        opcode: 'stopPolling',
        blockType: BlockType.COMMAND,
        text: '停止NFC传感器',
    },
    {
        opcode: 'getUID',
        blockType: BlockType.REPORTER,
        text: 'NFC卡号',
    },
    {
        type: "custom_seperator",
        text: '★> 基础传感器',
    },
    {
        opcode: 'readRainDropSensor',
        blockType: BlockType.REPORTER,
        text: '雨滴传感器[PORT]',
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
        text: '声音传感器[PORT]',
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
        text: '智能灰度传感器[PORT]',
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
        text: '颜色识别传感器[COLOR]',
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
        text: '环境光传感器[PORT]',
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
        text: '超声波传感器[PORT]',
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
        text: '巡线传感器[PORT]',
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
        text: '火焰传感器数字[PORT]',
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
        text: '火焰传感器模拟[PORT]',
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
        text: '模拟灰度传感器[PORT]',
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
        text: '烟雾传感器[PORT]',
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
        text: '土壤湿度传感器[PORT]',
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
        text: '防水温度传感器[PORT]',
        arguments: {
            PORT: {
                type: ArgumentType.STRING,
                menu: "RJMenu"
            }
        }
    },  
]

module.exports = sensorBlocks;