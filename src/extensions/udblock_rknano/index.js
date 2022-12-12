const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const log = require('../../util/log');

// 方块图标链接
const blockIconURI = 'data:image/png;base64,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'
class UDblockRKNano {
    constructor(runtime) {
        this.runtime = runtime;
    }

    getInfo() {
        return {
            id: "udblockRKNano",
            name: "RK2206 Nano",
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: "rknanostart",
                    blockType: BlockType.HAT,
                    text: "初始化完成"
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
                    text: '获取RKPI启动时间(毫秒)'
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
                    items:[{ text: "K1", value: "0" },{ text: "K2", value: "1" },{ text: "K3", value: "2" },{ text: "K4", value: "3" }]
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

module.exports = UDblockRKNano;