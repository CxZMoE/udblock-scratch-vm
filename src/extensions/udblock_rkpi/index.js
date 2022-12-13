const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const log = require('../../util/log');

// 方块图标链接
const blockIconURI = 'data:image/png;base64,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'

class UDblockRKPi {
    constructor(runtime) {
        this.runtime = runtime;
    }

    getInfo() {
        return {
            id: "udblockRKPi",
            name: "RK主板",
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: "rkstart",
                    blockType: BlockType.HAT,
                    text: "RKPI初始化完成"
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
                    text: '当按钮[BTN]按下',
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
                    text: '获取系统启动时间(毫秒)'
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
                // {
                //     opcode: 'openOnBoardRGB',
                //     blockType: BlockType.COMMAND,
                //     text: '控制启用RKPIRGB'
                // },
                // {
                //     opcode: 'closeOnBoardRGB',
                //     blockType: BlockType.COMMAND,
                //     text: '控制禁用RKPIRGB'
                // },
                // // {
                // //     opcode: 'setLuminanceOnBoardRGB',
                // //     blockType: BlockType.COMMAND,
                // //     text: '控制RKPIRGB设置亮度为 [NUMBER] %',
                // //     arguments: {
                // //         NUMBER: {
                // //             type: ArgumentType.NUMBER,
                // //             defaultValue: "50",
                // //         }
                // //     }
                // // },
                // {
                //     opcode: 'setRGBDraw',
                //     blockType: BlockType.COMMAND,
                //     text: '控制RKPIRGB显示颜色[COLOR]',
                //     arguments: {
                //         COLOR: {
                //             type: ArgumentType.COLOR,
                //         }
                //     }
                // },
                // {
                //     opcode: 'setRGBLineDraw',
                //     blockType: BlockType.COMMAND,
                //     text: '控制RKPIRGB[LINE]行显示颜色[COLOR]',
                //     arguments: {
                //         LINE: {
                //             type: ArgumentType.NUMBER,
                //             defaultValue: 1
                //         },
                //         COLOR: {
                //             type: ArgumentType.COLOR,
                //         }
                //     }
                // },
                // {
                //     opcode: 'setRGBLineSingleDraw',
                //     blockType: BlockType.COMMAND,
                //     text: '控制RKPIRGB[LINE]行[INDEX]号灯珠显示颜色[COLOR]',
                //     arguments: {
                //         LINE: {
                //             type: ArgumentType.NUMBER,
                //             defaultValue: 1
                //         },
                //         INDEX: {
                //             type: ArgumentType.NUMBER,
                //             defaultValue: 1
                //         },
                //         COLOR: {
                //             type: ArgumentType.COLOR,
                //         }
                //     }
                // },
                // {
                //     opcode: 'setRGBLineSingleOnlyDraw',
                //     blockType: BlockType.COMMAND,
                //     text: '控制RKPIRGB[LINE]行只有[INDEX]号灯珠显示颜色[COLOR]',
                //     arguments: {
                //         LINE: {
                //             type: ArgumentType.NUMBER,
                //             defaultValue: 1
                //         },
                //         INDEX: {
                //             type: ArgumentType.NUMBER,
                //             defaultValue: 1
                //         },
                //         COLOR: {
                //             type: ArgumentType.COLOR,
                //         }
                //     }
                // },
                // {
                //     type: "custom_seperator",
                //     text: '★ ▶ 蜂鸣器',
                // },
                // {
                //     opcode: 'setBuzzerPlay',
                //     blockType: BlockType.COMMAND,
                //     text: '控制RKPI蜂鸣器播放[SOUND] 音调 [PITCH]',
                //     arguments: {
                //         SOUND: {
                //             type: ArgumentType.STRING,
                //             defaultValue: "DO",
                //             menu: "buzzerSounds"
                //         },
                //         PITCH: {
                //             type: ArgumentType.STRING,
                //             defaultValue: "LOW",
                //             menu: "buzzerPitches"
                //         }
                //     }
                // },
                // {
                //     opcode: 'setBuzzerPlayMidi',
                //     blockType: BlockType.COMMAND,
                //     text: '控制RKPI蜂鸣器播放MIDI [SOUND]',
                //     arguments: {
                //         SOUND: {
                //             type: ArgumentType.STRING,
                //             defaultValue: "demo"
                //         }
                //     }
                // },
                // {
                //     opcode: 'setBuzzerStop',
                //     blockType: BlockType.COMMAND,
                //     text: '控制RKPI蜂鸣器停止播放',
                // },
                {
                    type: "custom_seperator",
                    text: '★ ▶ 网络',
                },
                // {
                //     opcode: 'getWiFiStatus',
                //     blockType: BlockType.BOOLEAN,
                //     text: 'Wi-Fi连接成功？',
                // },
                {
                    opcode: 'setConnectToWiFi',
                    blockType: BlockType.COMMAND,
                    text: '控制RKPI连接到Wi-Fi [SSID] [PSK]',
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
                    text: '控制RKPI断开Wi-Fi',
                },
                // {
                //     opcode: 'openWiFiAP',
                //     blockType: BlockType.COMMAND,
                //     text: '控制RKPI打开热点[SSID] [PSK]',
                //     arguments: {
                //         SSID: {
                //             type: ArgumentType.STRING,
                //             defaultValue: "RKPI" + (parseInt(Math.random()*10000000+ '')) 
                //         },
                //         PSK: {
                //             type: ArgumentType.STRING,
                //             defaultValue: "lz12345678"
                //         }
                //     }
                // },
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
                }
            ],
            menus: {
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
    rkstart(){return false}
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

module.exports = UDblockRKPi;