const BlockType = require("../extension-support/block-type")
const ArgumentType = require("../extension-support/argument-type")

const sensorBlocks = [
    {
        type: "custom_seperator",
        text: '★ 传感器',
    },
    {
        opcode: 'readWindSensor',
        blockType: BlockType.REPORTER,
        text: '读取风速传感器于[PORT]',
        arguments: {
            PORT: {
                type: ArgumentType.STRING,
                menu: "RJADCMenu"
            }
        }
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
]

module.exports = sensorBlocks;