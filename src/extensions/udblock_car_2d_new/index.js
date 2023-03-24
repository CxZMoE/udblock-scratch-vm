const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const log = require('../../util/log');
const EXTB_LIST = require('../../util/extb-definitions')


// 方块引用
const carBlocks = require('../../myBlocks/car')
const cameraBlocks = require('../../myBlocks/camerab');
const sensorBlocks = require('../../myBlocks/sensor');
const actionBlocks = require('../../myBlocks/action');
const {miscMenuBlocks, GenerateRJMenuAll} = require('../../myBlocks/menu');
const { extb_car_2d_new } = require ('../../../src/util/extb-definitions');
var { bt } = require ('../../../src/util/extb-definitions');
// 方块图标链接
const blockIconURI = 'data:image/png;base64,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'
class UDBlockCar2DNew {
    constructor(runtime) {
        this.runtime = runtime;
        // this.customBlocks = [].concat(
        //     cameraBlocks,
        //     sensorBlocks,
        //     actionBlocks(false,false)
        // )
        this.dblRelayPinYellow = {
            acceptReporters: true,
            items: []
        };
        this.dblRelayPinBlue = {
            acceptReporters: true,
            items: []
        };
        // 双路继电器生成菜单
        var rj11s;
        rj11s = extb_car_2d_new.RJ11;
        for (i in rj11s) {
            var yellowPin = rj11s[i].value[0];
            var bluePin = rj11s[i].value[1];
            if (!(yellowPin >= 34 && yellowPin <= 39)){
                this.dblRelayPinYellow.items.push({text:"RJ"+String(Number(i)+1), value: String(yellowPin)});
            }
            if (!(bluePin >= 34 && bluePin <= 39)){
                this.dblRelayPinBlue.items.push({text:"RJ"+String(Number(i)+1), value: String(bluePin)});
            }
        }
    }

    
    getInfo() {
        return {
            id: "udblockEXTBCar2DNew",
            name: "四点半双驱小车",
            type: "extb_car_2d_new",
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: "espstart",
                    blockType: BlockType.HAT,
                    text: "系统初始化完成"
                },
                {
                    opcode: "print",
                    blockType: BlockType.COMMAND,
                    text: "打印[TEXT]",
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "欢迎"
                        }
                    }
                },
                {
                    type: "custom_seperator",
                    text: '★ 事件',
                },
                // {
                //     opcode: 'whenButtonPressed',
                //     blockType: BlockType.EVHAT,
                //     text: '当主板按钮[BTN]按下(线程)',
                //     arguments: {
                //         BTN:{
                //             type: ArgumentType.STRING,
                //             defaultValue: "0",
                //             menu: 'buttons'
                //         }
                //     }
                // },
                {
                    opcode: 'whenButtonPressedIRQ',
                    blockType: BlockType.EVHAT,
                    text: '当主板按钮[BTN]按下(中断)',
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
                    text: '★ 板载执行器',
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
                            defaultValue: "udpi-" + (parseInt(Math.random() * 10000000 + ''))
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
                    text: '★ 控制',
                },
                {
                    opcode: 'moveForward',
                    blockType: BlockType.COMMAND,
                    text: '以[SPEED]%的速度前进',
                    arguments: {
                        SPEED: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 30
                        }
                    }
                },
                {
                    opcode: 'moveBack',
                    blockType: BlockType.COMMAND,
                    text: '以[SPEED]%的速度后退',
                    arguments: {
                        SPEED: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 30
                        }
                    }
                },
                {
                    opcode: 'turnLeft',
                    blockType: BlockType.COMMAND,
                    text: '以[SPEED]%的速度左转',
                    arguments: {
                        SPEED: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 30
                        }
                    }
                },
                {
                    opcode: 'turnRight',
                    blockType: BlockType.COMMAND,
                    text: '以[SPEED]%的速度右转',
                    arguments: {
                        SPEED: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 30
                        }
                    }
                },
                {
                    opcode: 'turnCustomize',
                    blockType: BlockType.COMMAND,
                    text: '左轮以[SPDL]%速度[MODEL]，右轮以[SPDR]%速度[MODER]',
                    arguments: {
                        SPDL: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 30
                        },
                        SPDR: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 30
                        },
                        MODEL: {
                            type: ArgumentType.STRING,
                            menu: "carServoMode"
                        },
                        MODER: {
                            type: ArgumentType.STRING,
                            menu: "carServoMode"
                        }
                    }
                },
                {
                    opcode: 'getRedLeft',
                    blockType: BlockType.BOOLEAN,
                    text: '左红外传感器被触发,阈值[THREHOLD]',
                    arguments: {
                        THREHOLD: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 500
                        }
                    }
                },
                {
                    opcode: 'getCar2DSonic',
                    blockType: BlockType.REPORTER,
                    text: '获取超声波传感器距离',
                },
                {
                    opcode: 'getRedRight',
                    blockType: BlockType.BOOLEAN,
                    text: '右红外传感器被触发,阈值[THREHOLD]',
                    arguments: {
                        THREHOLD: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 500
                        }
                    }
                },
                {
                    opcode: 'getRedLeftValue',
                    blockType: BlockType.REPORTER,
                    text: '左红外传感器ADC数值',
                },
                {
                    opcode: 'getRedRightValue',
                    blockType: BlockType.REPORTER,
                    text: '右红外传感器ADC数值',
                },
                {
                    opcode: 'stopCar',
                    blockType: BlockType.COMMAND,
                    text: '停止小车'
                },
                {
                    type: "custom_seperator",
                    text: '★ APP遥控'
                },
                // #  0:三角 1:圆形 2:叉 3:正方形 4:上 5:右 6:下 7:左 8:L1 9:L2 10:R1 11:R2
            
                {
                    opcode: 'startServer',
                    blockType: BlockType.COMMAND,
                    text: '开启遥控功能 热点名[SSID] 密码[PSK]',
                    arguments: {
                        SSID: {
                            type: ArgumentType.STRING,
                            defaultValue: "udpi-" + (parseInt(Math.random() * 10000000 + ''))
                        },
                        PSK: {
                            type: ArgumentType.STRING,
                            defaultValue: "test12345678"
                        }
            
                    }
                },
                {
                    opcode: 'stopServer',
                    blockType: BlockType.COMMAND,
                    text: '关闭遥控功能'
                },
                {
                    opcode: 'appGetButtonStatus',
                    blockType: BlockType.BOOLEAN,
                    text: 'APP按键[BTN]被按下',
                    arguments: {
                        BTN:{
                            type: ArgumentType.NUMBER,
                            menu: 'appBtnMenu'
                        }
                    }
                },
                {
                    opcode: 'appGetButtonUP',
                    blockType: BlockType.BOOLEAN,
                    text: 'APP按键[BTN]被松开',
                    arguments: {
                        BTN:{
                            type: ArgumentType.NUMBER,
                            menu: 'appBtnMenu'
                        }
                    }
                },
                {
                    opcode: 'appGetRemote',
                    blockType: BlockType.REPORTER,
                    text: 'APP遥感[POS]',
                    arguments: {
                        POS:{
                            type: ArgumentType.NUMBER,
                            menu: 'ps2RemoteMenu'
                        }
                    }
                },
                // ...this.customBlocks
            ],
            menus: {
                ...GenerateRJMenuAll('extb_car_2d_new', bt),
                servoMenu: {
                    acceptReporters: true,
                    items: [{text: "一",value: "0x01"},{text: "二",value: "0x02"},{text: "三",value: "0x03"},{text: "四",value: "0x04"},]
                },
                carServoMode: {
                    acceptReporters: true,
                    items: [{text: "正转",value: "clock"},{text: "反转",value: "anticlock"}]
                },
                dblRelayPinYellow: this.dblRelayPinYellow,
                dblRelayPinBlue:this.dblRelayPinBlue,
                ...miscMenuBlocks
                
            }
        }
    }
}

module.exports = UDBlockCar2DNew;