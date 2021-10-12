const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const log = require('../../util/log');

// 方块图标链接
const blockIconURI = 'data:img/png;base64,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';


class UDblockUDPi {
    constructor(runtime) {
        this.runtime = runtime;
    }

    getInfo() {
        return {
            id: "udblockUDPi",
            name: "UDPi 开发板",
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: "espstart",
                    blockType: BlockType.HAT,
                    text: "UDPi主板初始化完成"
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
                    opcode: 'setRGBLineDraw',
                    blockType: BlockType.COMMAND,
                    text: '控制主板RGB[LINE]行显示颜色[COLOR]',
                    arguments: {
                        LINE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        COLOR: {
                            type: ArgumentType.COLOR,
                        }
                    }
                },
                {
                    opcode: 'setRGBLineSingleDraw',
                    blockType: BlockType.COMMAND,
                    text: '控制主板RGB[LINE]行[INDEX]号灯珠显示颜色[COLOR]',
                    arguments: {
                        LINE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
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
                    text: '控制主板RGB[LINE]行只有[INDEX]号灯珠显示颜色[COLOR]',
                    arguments: {
                        LINE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
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
                            defaultValue: " ",
                        },
                        PSK: {
                            type: ArgumentType.STRING,
                            defaultValue: " ",
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

module.exports = UDblockUDPi;