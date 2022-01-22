const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const log = require('../../util/log');
const formatMessage = require('format-message')

// 方块图标链接
const blockIconURI = 'data:image/png;base64,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'

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
                    opcode: 'readGestureSensor',
                    blockType: BlockType.BOOLEAN,
                    text: '读取手势传感器为[GESTURE]',
                    arguments: {
                        GESTURE:{
                            type: ArgumentType.STRING,
                            defaultValue: "up",
                            menu: "gesture_sensor"
                        }
                    }
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
                // {
                //     opcode: 'displayWriteShow',
                //     blockType: BlockType.COMMAND,
                //     text: '在显示屏[LINE]行显示文本[TEXT]立即显示',
                //     arguments:{
                //         LINE: {
                //             type: ArgumentType.NUMBER,
                //             defaultValue: 0, // * 16
                //             menu: "displayLine"
                //         },
                //         TEXT: {
                //             type: ArgumentType.STRING,
                //             defaultValue: "UDBlock, Go!"
                //         }
                //     }
                // },
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
                    text: '屏幕画实心三角形 坐标 X1:[X1] Y1:[Y1]\nX2:[X2] Y2:[Y2]\nX3:[X3] Y3:[Y3]',
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
                // {
                //     opcode: 'setLuminanceOnBoardRGB',
                //     blockType: BlockType.COMMAND,
                //     text: '控制主板RGB设置亮度为 [NUMBER] %',
                //     arguments: {
                //         NUMBER: {
                //             type: ArgumentType.NUMBER,
                //             defaultValue: "50"
                //         }
                //     }
                // },
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
                {
                    type: "custom_seperator",
                    text: '★ ▶ HTTP请求',
                },
                {
                    opcode: 'urequestsAddItemMap',
                    blockType: BlockType.COMMAND,
                    text: '创建数据对象[NAME]',
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'data'
                        }
                    }
                },
                {
                    opcode: 'urequestsSetItem',
                    blockType: BlockType.COMMAND,
                    text: '设置数据对象[NAME]的[KEY]为[VALUE]',
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'data'
                        },
                        KEY: {
                            type: ArgumentType.STRING,
                            defaultValue: 'number'
                        },
                        VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: '6'
                        }
                    }
                },
                {
                    opcode: 'urequestsDelItem',
                    blockType: BlockType.COMMAND,
                    text: '删除数据对象[NAME]的[KEY]',
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'data'
                        },
                        KEY: {
                            type: ArgumentType.STRING,
                            defaultValue: 'number'
                        }
                    }
                },
                {
                    opcode: 'urequestsPostItem',
                    blockType: BlockType.COMMAND,
                    text: 'POST数据对象[NAME]到地址[ADDR]',
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'data'
                        },
                        ADDR: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        }
                    }
                },
                {
                    opcode: 'urequestsGetItem',
                    blockType: BlockType.COMMAND,
                    text: 'GET地址[ADDR]',
                    arguments: {
                        ADDR: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        }
                    }
                }
                
            ],
            menus: {
                gesture_sensor: {
                    acceptReporters: true,
                    items:[{text: "上", value: "up"},{text: "下", value: "down"},{text: "左", value: "left"},{text: "右", value: "right"}]
                },
                buzzerSounds: {
                    acceptReporters: true,
                    items: [{ text: "DO", value: "DO" }, { text: "RE", value: "RE" }, { text: "MI", value: "MI" }, { text: "FA", value: "FA" }, { text: "SO", value: "SO" }, { text: "LA", value: "LA" }, { text: "XI", value: "SI" }]
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
                    items:[{ text: "一", value: "0" },{ text: "二", value: "1" },{ text: "三", value: "2" },{ text: "四", value: "3" }]
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