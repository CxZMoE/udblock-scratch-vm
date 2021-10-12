const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const log = require('../../util/log');
const formatMessage = require('format-message')

// 方块图标链接
const blockIconURI = 'data:img/png;base64,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';


class UDblockUDPiPlus {
    constructor(runtime) {
        this.runtime = runtime;
    }

    getInfo() {
        return {
            id: "udblockUDPiPlus",
            name: "UDPi+开发板",
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: "espstart",
                    blockType: BlockType.HAT,
                    text: "UDPi+主板初始化完成"
                },
                {
                    opcode: "print",
                    blockType: BlockType.COMMAND,
                    text: "打印[TEXT]",
                    arguments: {
                        TEXT:{
                            type: ArgumentType.STRING,
                            defaultValue: "欢迎"
                        }
                    }
                },
                {
                    type: "custom_seperator",
                    text: '★ 事件',
                },
                {
                    opcode: 'whenButtonPressed',
                    blockType: BlockType.EVHAT,
                    text: '当主板按钮[BTN]按下',
                    arguments: {
                        BTN:{
                            type: ArgumentType.STRING,
                            defaultValue: "0",
                            menu: 'buttons'
                        }
                    }
                },
                {
                    type: "custom_seperator",
                    text: '★ 系统资源',
                },
                {
                    opcode: 'getStartTime',
                    blockType: BlockType.REPORTER,
                    text: '获取主板启动时间(毫秒)'
                },
                {
                    opcode: 'delay_ms',
                    blockType: BlockType.COMMAND,
                    text: '延迟[TIME]毫秒',
                    arguments: {
                        TIME: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 200
                        }
                    }
                },
                {
                    opcode: 'delay_us',
                    blockType: BlockType.COMMAND,
                    text: '延迟[TIME]微秒',
                    arguments: {
                        TIME: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1000
                        }
                    }
                },
                {
                    opcode: 'delay_s',
                    blockType: BlockType.COMMAND,
                    text: '延迟[TIME]秒',
                    arguments: {
                        TIME: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                },
                {
                    type: "custom_seperator",
                    text: '★ 传感器',
                },
                {
                    opcode: 'readAmbientLightSensor',
                    blockType: BlockType.REPORTER,
                    text: '读取环境光传感器'
                },
                {
                    opcode: 'readSoundSensor',
                    blockType: BlockType.REPORTER,
                    text: '读取声音传感器'
                },
                {
                    opcode: 'readGryoSensor',
                    blockType: BlockType.REPORTER,
                    text: '读取陀螺仪传感器'
                },
                {
                    opcode: 'readAccelSensor',
                    blockType: BlockType.REPORTER,
                    text: '读取加速度传感器'
                },
                {
                    type: "custom_seperator",
                    text: '★ 显示屏',
                },
                {
                    opcode: 'displayClean',
                    blockType: BlockType.COMMAND,
                    text: '控制显示屏擦除内容'
                },
                {
                    opcode: 'displayWrite',
                    blockType: BlockType.COMMAND,
                    text: '将在显示屏[LINE]行显示文本[TEXT]',
                    arguments:{
                        LINE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0, // * 16
                            menu: "displayLine"
                        },
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "UDBlock, Go!"
                        }
                    }
                },
                {
                    opcode: 'displayWriteShow',
                    blockType: BlockType.COMMAND,
                    text: '在显示屏[LINE]行显示文本[TEXT]立即显示',
                    arguments:{
                        LINE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0, // * 16
                            menu: "displayLine"
                        },
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "UDBlock, Go!"
                        }
                    }
                },
                {
                    opcode: 'displayShow',
                    blockType: BlockType.COMMAND,
                    text: '控制显示器刷新内容'
                },
                {
                    opcode: 'displayDrawLabel',
                    blockType: BlockType.COMMAND,
                    text: '屏幕画标签 X:[X] Y:[Y] 内容: [STR]',
                    arguments:{
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 50, // * 16
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5, // * 16
                        },
                        STR: {
                            type: ArgumentType.STRING,
                            defaultValue: 'UDPI', // * 16
                        },
                    }
                },
                {
                    opcode: 'displayDrawPoint',
                    blockType: BlockType.COMMAND,
                    text: '屏幕画点 X[X] Y[Y]',
                    arguments:{
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0, // * 16
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0, // * 16
                        }
                    }
                },
                {
                    opcode: 'displayDrawLine',
                    blockType: BlockType.COMMAND,
                    text: '屏幕画直线 起点 X[SX] Y[SY] | 终点 X[EX] Y[EY]',
                    arguments:{
                        SX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0, // * 16
                        },
                        SY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0, // * 16
                        },
                        EX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 128, // * 16
                        },
                        EY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 64, // * 16
                        },
                    }
                },
                {
                    opcode: 'displayDrawRect',
                    blockType: BlockType.COMMAND,
                    text: '屏幕画矩形 X[SX] Y[SY] 长[LENGTH] 宽[WIDTH]',
                    arguments:{
                        SX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 128/2 - 20, // * 16
                        },
                        SY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 64/2 - 20, // * 16
                        },
                        LENGTH: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 40, // * 16
                        },
                        WIDTH: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 40, // * 16
                        },
                    }
                },
                {
                    opcode: 'displayDrawRectFill',
                    blockType: BlockType.COMMAND,
                    text: '屏幕画实心矩形 X[SX] Y[SY] 长[LENGTH] 宽[WIDTH]',
                    arguments:{
                        SX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 128/2 - 20, // * 16
                        },
                        SY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 64/2 - 20, // * 16
                        },
                        LENGTH: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 40, // * 16
                        },
                        WIDTH: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 40, // * 16
                        },
                    }
                },
                {
                    opcode: 'displayDrawCircle',
                    blockType: BlockType.COMMAND,
                    text: '屏幕画圆形 坐标 X:[SX] Y:[SY] 半径:[R]',
                    arguments:{
                        SX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 128/2 - 20, // * 16
                        },
                        SY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 64/2 - 20, // * 16
                        },
                        R: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 40, // * 16
                        },
                    }
                },
                {
                    opcode: 'displayDrawCircleFill',
                    blockType: BlockType.COMMAND,
                    text: '屏幕画实心圆形 X:[SX] Y:[SY] 半径[R]',
                    arguments:{
                        SX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 128/2 - 20, // * 16
                        },
                        SY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 64/2 - 20, // * 16
                        },
                        R: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 40, // * 16
                        },
                    }
                },
                {
                    opcode: 'displayDrawTriangle',
                    blockType: BlockType.COMMAND,
                    text: '屏幕画三角形 坐标 X1:[X1] Y1:[Y1]\nX2:[X2] Y2:[Y2]\nX3:[X3] Y3:[Y3]',
                    arguments:{
                        X1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 128/2, // * 16
                        },
                        Y1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 64/2 - 20, // * 16
                        },
                        X2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 128/2 + 20, // * 16
                        },
                        Y2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 64/2 + 20, // * 16
                        },
                        X3: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 128/2 - 20, // * 16
                        },
                        Y3: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 64/2 + 20, // * 16
                        },

                    }
                },
                {
                    opcode: 'displayDrawTriangleFill',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'udblockUDPiPlus.displayDrawTriangleFill',
                        default: '屏幕画实心三角形 坐标 X1:[X1] Y1:[Y1]\nX2:[X2] Y2:[Y2]\nX3:[X3] Y3:[Y3]',
                        description: 'get the measured degrees a motor has turned'
                    }),
                    arguments:{
                        X1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 128/2, // * 16
                        },
                        Y1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 64/2 - 20, // * 16
                        },
                        X2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 128/2 + 20, // * 16
                        },
                        Y2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 64/2 + 20, // * 16
                        },
                        X3: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 128/2 - 20, // * 16
                        },
                        Y3: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 64/2 + 20, // * 16
                        },

                    }
                },
                {
                    opcode: 'displayDrawCircle',
                    blockType: BlockType.COMMAND,
                    text: '屏幕画圆形 坐标 X:[SX] Y:[SY] 半径:[R]',
                    arguments:{
                        SX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 128/2 - 20, // * 16
                        },
                        SY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 64/2 - 20, // * 16
                        },
                        R: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 40, // * 16
                        },
                    }
                },
                {
                    opcode: 'displayScroll',
                    blockType: BlockType.COMMAND,
                    text: '屏幕内容向X:[X] Y:[Y]移动 ',
                    arguments:{
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0, // * 16
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5, // * 16
                        },
                    }
                },

                {
                    type: "custom_seperator",
                    text: '★ 执行器',
                },
                {
                    opcode: 'openOnBoardRGB',
                    blockType: BlockType.COMMAND,
                    text: '控制启用主板RGB'
                },
                {
                    opcode: 'closeOnBoardRGB',
                    blockType: BlockType.COMMAND,
                    text: '控制禁用主板RGB'
                },
                {
                    opcode: 'setLuminanceOnBoardRGB',
                    blockType: BlockType.COMMAND,
                    text: '控制主板RGB设置亮度为 [NUMBER] %',
                    arguments: {
                        NUMBER: {
                            type: ArgumentType.NUMBER,
                            defaultValue: "50",
                            menu: []
                        }
                    }
                },
                {
                    opcode: 'setRGBDraw',
                    blockType: BlockType.COMMAND,
                    text: '控制主板RGB显示颜色[COLOR]',
                    arguments: {
                        COLOR: {
                            type: ArgumentType.COLOR,
                        }
                    }
                },
                {
                    opcode: 'setRGBLineSingleDraw',
                    blockType: BlockType.COMMAND,
                    text: '控制主板RGB[INDEX]号灯珠显示颜色[COLOR]',
                    arguments: {
                        INDEX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        COLOR: {
                            type: ArgumentType.COLOR,
                        }
                    }
                },
                {
                    opcode: 'setRGBLineSingleOnlyDraw',
                    blockType: BlockType.COMMAND,
                    text: '控制主板RGB只有[INDEX]号灯珠显示颜色[COLOR]',
                    arguments: {
                        INDEX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        COLOR: {
                            type: ArgumentType.COLOR,
                        }
                    }
                },
                {
                    type: "custom_seperator",
                    text: '★ ▶ 蜂鸣器',
                },
                {
                    opcode: 'setBuzzerPlay',
                    blockType: BlockType.COMMAND,
                    text: '控制主板蜂鸣器播放[SOUND] 音调 [PITCH]',
                    arguments: {
                        SOUND: {
                            type: ArgumentType.STRING,
                            defaultValue: "DO",
                            menu: "buzzerSounds"
                        },
                        PITCH: {
                            type: ArgumentType.STRING,
                            defaultValue: "LOW",
                            menu: "buzzerPitches"
                        }
                    }
                },
                {
                    opcode: 'setBuzzerPlayMidi',
                    blockType: BlockType.COMMAND,
                    text: '控制主板蜂鸣器播放MIDI [SOUND]',
                    arguments: {
                        SOUND: {
                            type: ArgumentType.STRING,
                            defaultValue: "demo"
                        }
                    }
                },
                {
                    opcode: 'setBuzzerStop',
                    blockType: BlockType.COMMAND,
                    text: '控制主板蜂鸣器停止播放',
                },
                {
                    type: "custom_seperator",
                    text: '★ ▶ 网络',
                },
                {
                    opcode: 'getWiFiStatus',
                    blockType: BlockType.BOOLEAN,
                    text: 'Wi-Fi连接成功？',
                },
                {
                    opcode: 'setConnectToWiFi',
                    blockType: BlockType.COMMAND,
                    text: '控制主板连接到Wi-Fi [SSID] [PSK]',
                    arguments: {
                        SSID: {
                            type: ArgumentType.STRING,
                            defaultValue: "改为你要连接的热点名",
                        },
                        PSK: {
                            type: ArgumentType.STRING,
                            defaultValue: "改为你要连接的热点密码",
                        }
                    }
                },
                {
                    opcode: 'closeConnectToWiFi',
                    blockType: BlockType.COMMAND,
                    text: '控制主板断开Wi-Fi',
                },
                {
                    opcode: 'openWiFiAP',
                    blockType: BlockType.COMMAND,
                    text: '控制主板打开热点[SSID] [PSK]',
                    arguments: {
                        SSID: {
                            type: ArgumentType.STRING,
                            defaultValue: "udpi-" + (parseInt(Math.random()*10000000+ '')) 
                        },
                        PSK: {
                            type: ArgumentType.STRING,
                            defaultValue: "udpi12345678"
                        }
                    }
                },
                {
                    opcode: 'udpClientSent',
                    blockType: BlockType.COMMAND,
                    text: '控制UDP客户端发送消息[MSG]',
                    arguments: {
                        MSG: {
                            type: ArgumentType.STRING,
                            defaultValue: "ping"
                        },
                    }
                },
                {
                    opcode: 'udpClientReceiveEvent',
                    blockType: BlockType.EVHAT,
                    text: '当UDP服务器接收到消息',
                },
                {
                    opcode: 'udpClientReceivedText',
                    blockType: BlockType.REPORTER,
                    text: 'UDP消息',
                },
                
                
            ],
            menus: {
                buzzerSounds: {
                    acceptReporters: true,
                    items: [{ text: "DO", value: "DO" }, { text: "RE", value: "RE" }, { text: "MI", value: "MI" }, { text: "FA", value: "FA" }, { text: "SO", value: "SO" }, { text: "LA", value: "LA" }, { text: "XI", value: "XI" }]
                },
                buzzerPitches: {
                    acceptReporters: true,
                    items: [{ text: "低", value: "LOW" }, { text: "中", value: "MID" }, { text: "高", value: "HIGH" }]
                },
                buttons:{
                    acceptReporters: true,
                    items:[{ text: "A", value: "0" },{ text: "B", value: "2" }]
                },
                displayLine:{
                    acceptReporters: true,
                    items:[{ text: "一", value: "0" },{ text: "二", value: "1" },{ text: "三", value: "2" },{ text: "四", value: "3" },{ text: "五", value: "4" }]
                },color: {
                    acceptReporters: true,
                    items: [{ text: "红色", value: "red" },{ text: "绿色", value: "green" },{ text: "蓝色", value: "blue" },{ text: "黄色", value: "yellow" },{ text: "天蓝色", value: "skyblue" },{ text: "紫色", value: "purple" },{ text: "白色", value: "white" },{ text: "黑色", value: "black" }]
                },
                imageMethods : {
                    acceptReporters: true,
                    items: [{ text: "边缘查找", value: "iess" },{ text: "锐化", value: "ishs" },{ text: "浮雕化", value: "issr" }]
                }
            }
        }
    }
    
    espstart(){return false}
    whenButtonPressed(){}
    getStartTime(){}
    delay_ms(){}
    delay_us(){}
    delay_s(){}
    readAmbientLightSensor(){}
    readSoundSensor(){}
    readGryoSensor(){}
    readAccelSensor(){}
    openOnBoardRGB(){}
    closeOnBoardRGB(){}
    setLuminanceOnBoardRGB(){}
    setRGBDraw(){}
    setRGBLineDraw(){}
    setRGBLineSingleDraw(){}
    setRGBLineSingleOnlyDraw(){}
    setBuzzerPlay(){}
    setBuzzerStop(){}
    getWiFiStatus(){}
    setConnectToWiFi(){}
    closeConnectToWiFi(){}
    openWiFiAP(){}
    udpClientSent(){}
    udpClientReceiveEvent(){}
}

module.exports = UDblockUDPiPlus;