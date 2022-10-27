const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');

// 方块图标链接
const blockIconURI = 'data:image/png;base64,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'

class UDblockMQTT {
    constructor(runtime) {
        this.runtime = runtime;
    }

    getInfo() {
        return {
            id: "udblockUtils",
            name: "UDBlock工具类",
            blockIconURI: blockIconURI,
            blocks: [
                {
                    type: "custom_seperator",
                    text: '★ I2C控制器',
                },
                {
                    opcode: 'getI2CFromMem',
                    blockType: BlockType.REPORTER,
                    text: '从[PERI]的[ADDR]地址获取[NUM]个字节',
                    arguments: {
                        PERI:{
                            type: ArgumentType.NUMBER,
                            defaultValue: "42"
                        },
                        ADDR:{
                            type: ArgumentType.NUMBER,
                            defaultValue: "8"
                        },
                        NUM:{
                            type: ArgumentType.NUMBER,
                            defaultValue: "1"
                        },
                        
                    }
                },
                {
                    opcode: 'getI2CFromAddr',
                    blockType: BlockType.REPORTER,
                    text: '从[ADDR]地址获取[NUM]个字节',
                    arguments: {
                        ADDR:{
                            type: ArgumentType.NUMBER,
                            defaultValue: "8"
                        },
                        NUM:{
                            type: ArgumentType.NUMBER,
                            defaultValue: "1"
                        },
                        
                    }
                },
                {
                    opcode: 'writeI2CAddr',
                    blockType: BlockType.REPORTER,
                    text: '向[ADDR]地址写入[CONTENT]',
                    arguments: {
                        ADDR:{
                            type: ArgumentType.NUMBER,
                            defaultValue: "8"
                        },
                        CONTENT:{
                            type: ArgumentType.STRING,
                            defaultValue: "0x01"
                        },
                        
                    }
                },
                {
                    opcode: 'writeI2CToMem',
                    blockType: BlockType.COMMAND,
                    text: '向[ADDR]地址写入[NUM]个字节内容[CONTENT]',
                    arguments: {
                        ADDR:{
                            type: ArgumentType.NUMBER,
                            defaultValue: "8"
                        },
                        NUM:{
                            type: ArgumentType.NUMBER,
                            defaultValue: "1"
                        },
                        CONTENT:{
                            type: ArgumentType.STRING,
                            defaultValue: "0x01"
                        },
                    }
                },
                {
                    type: "custom_seperator",
                    text: '★ MQTT',
                },
                {
                    opcode: 'initMQTT',
                    blockType: BlockType.COMMAND,
                    text: '初始化MQTT客户端 ID:[ID] 地址:[SERVER]:[PORT] 用户名[USER] 密码[PASSWD]',
                    arguments: {
                        ID:{
                            type: ArgumentType.STRING,
                            defaultValue: "udblockclient-"+String(new Date().getTime())
                        },
                        SERVER:{
                            type: ArgumentType.STRING,
                            defaultValue: "127.0.0.1"
                        },
                        PORT:{
                            type: ArgumentType.STRING,
                            defaultValue: "1883"
                        },
                        USER:{
                            type: ArgumentType.STRING,
                            defaultValue: "testuser"
                        },
                        PASSWD:{
                            type: ArgumentType.STRING,
                            defaultValue: "testuser123"
                        },
                    }
                },
                {
                    opcode: 'connectMQTT',
                    blockType: BlockType.COMMAND,
                    text: '连接到MQTT服务器',
                },
                {
                    opcode: 'disconnectMQTT',
                    blockType: BlockType.COMMAND,
                    text: '取消连接到MQTT服务器',
                },
                {
                    opcode: 'publishMQTT',
                    blockType: BlockType.COMMAND,
                    text: 'MQTT发布话题[TOPIC]内容[MSG]QOS[QOS]',
                    arguments: {
                        TOPIC:{
                            type: ArgumentType.STRING,
                            defaultValue: "ping"
                        },
                        MSG:{
                            type: ArgumentType.STRING,
                            defaultValue: "pong"
                        },
                        QOS:{
                            type: ArgumentType.NUMBER,
                            defaultValue: "0"
                        }
                    }
                },
                {
                    opcode: 'subscribeMQTT',
                    blockType: BlockType.COMMAND,
                    text: 'MQTT订阅话题[TOPIC]QOS:[QOS]',
                    arguments: {
                        TOPIC:{
                            type: ArgumentType.STRING,
                            defaultValue: "ping"
                        },
                        QOS:{
                            type: ArgumentType.NUMBER,
                            defaultValue: "0"
                        }
                    }
                },
                {
                    opcode: 'checkMQTT',
                    blockType: BlockType.COMMAND,
                    text: '检查MQTT消息',
                },
                {
                    opcode: 'waitMQTT',
                    blockType: BlockType.COMMAND,
                    text: '等待接收MQTT消息',
                },
                {
                    opcode: 'setcallbackMQTT',
                    blockType: BlockType.LOOP,
                    text: '当MQTT接收到消息',
                },
                {
                    opcode: 'mqttValueTopic',
                    blockType: BlockType.REPORTER,
                    text: '当前MQTT话题',
                },
                {
                    opcode: 'mqttValueMsg',
                    blockType: BlockType.REPORTER,
                    text: '当前MQTT消息',
                },
                {
                    type: "custom_seperator",
                    text: '★ JSON',
                },
                {
                    opcode: 'jsonInitObj',
                    blockType: BlockType.COMMAND,
                    text: 'JSON初始化对象[NAME]',
                    arguments: {
                        NAME:{
                            type: ArgumentType.STRING,
                            defaultValue: "data"
                        }
                    }
                },
                {
                    opcode: 'jsonSetItem',
                    blockType: BlockType.COMMAND,
                    text: 'JSON设置对象[NAME]的第[INDEX]项为[VALUE]',
                    arguments: {
                        NAME:{
                            type: ArgumentType.STRING,
                            defaultValue: "data"
                        },
                        INDEX:{
                            type: ArgumentType.STRING,
                            defaultValue: "'temperature'"
                        },
                        VALUE:{
                            type: ArgumentType.NUMBER,
                            defaultValue: 20
                        }
                    }
                },
                {
                    opcode: 'jsonLoads',
                    blockType: BlockType.REPORTER,
                    text: 'JSON解析字符串[STR]为对象',
                    arguments: {
                        STR:{
                            type: ArgumentType.STRING,
                            defaultValue: '{"x": 1, "y": 2}'
                        }
                    }
                },
                {
                    opcode: 'jsonDumps',
                    blockType: BlockType.REPORTER,
                    text: 'JSON文本化对象[OBJ]',
                    arguments: {
                        OBJ:{
                            type: ArgumentType.STRING,
                            defaultValue: "data"
                        }
                    }
                },
                {
                    opcode: 'jsonGetIndex',
                    blockType: BlockType.REPORTER,
                    text: 'JSON对象[NAME]的第[INDEX]项',
                    arguments: {
                        NAME:{
                            type: ArgumentType.STRING,
                            defaultValue: 'data'
                        },
                        INDEX:{
                            type: ArgumentType.STRING,
                            defaultValue: '\'tempureture\''
                        }
                    }
                },
                {
                    opcode: 'jsonDecodeUTF8',
                    blockType: BlockType.REPORTER,
                    text: 'JSON对象[NAME]解码为通用文本格式',
                    arguments: {
                        NAME:{
                            type: ArgumentType.STRING,
                            defaultValue: 'data'
                        }
                    }
                },
                {
                    opcode: 'jsonEncodeUTF8',
                    blockType: BlockType.REPORTER,
                    text: 'JSON对象[NAME]编码为通用文本格式',
                    arguments: {
                        NAME:{
                            type: ArgumentType.STRING,
                            defaultValue: 'data'
                        }
                    }
                },
                {
                    opcode: 'diyLine',
                    blockType: BlockType.REPORTER,
                    text: '自定义字段[TEXT]',
                    arguments: {
                        TEXT:{
                            type: ArgumentType.STRING,
                            defaultValue: 'data'
                        }
                    }
                },
                {
                    type: "custom_seperator",
                    text: '★ 线程',
                },
                {
                    opcode: 'create_thread',
                    blockType: BlockType.LOOP,
                    text: '启动线程 名称[NAME]',
                    arguments: {
                        NAME:{
                            type: ArgumentType.STRING,
                            defaultValue: 'thread_1'
                        }
                    }
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
                },
                {
                    opcode: 'urequestsGetItemText',
                    blockType: BlockType.REPORTER,
                    text: 'GET地址[ADDR]获取结果文本',
                    arguments: {
                        ADDR: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        }
                    }
                },
                {
                    opcode: 'urequestsGetItemJSON',
                    blockType: BlockType.REPORTER,
                    text: 'GET地址[ADDR]获取结果JSON对象',
                    arguments: {
                        ADDR: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        }
                    }
                },
                {
                    type: "custom_seperator",
                    text: '★ UDP',
                },
                {
                    opcode: 'initUdp',
                    blockType: BlockType.COMMAND,
                    text: '初始化UDP对象'
                },
                {
                    opcode: 'connectUdp',
                    blockType: BlockType.COMMAND,
                    text: 'UDP连接到地址[ADDR]:[PORT]',
                    arguments: {
                        ADDR: {
                            type: ArgumentType.STRING,
                            defaultValue: '127.0.0.1'
                        },
                        PORT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3000
                        }
                    }
                },
                {
                    opcode: 'udpSetTimeout',
                    blockType: BlockType.COMMAND,
                    text: 'UDP设置超时时间为[TIMEOUT]',
                    arguments: {
                        TIMEOUT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 200
                        }
                    }
                },
                {
                    opcode: 'udpSetBlocking',
                    blockType: BlockType.COMMAND,
                    text: 'UDP设置是否阻塞[BLOCK]',
                    arguments: {
                        BLOCK: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: 'udpSend',
                    blockType: BlockType.COMMAND,
                    text: 'UDP发送数据[DATA]',
                    arguments: {
                        DATA: {
                            type: ArgumentType.STRING,
                            defaultValue: 'data'
                        }
                    }
                },
                {
                    opcode: 'udpWrite',
                    blockType: BlockType.COMMAND,
                    text: 'UDP发送所有数据[DATA]',
                    arguments: {
                        DATA: {
                            type: ArgumentType.STRING,
                            defaultValue: 'data'
                        }
                    }
                },
                {
                    opcode: 'udpRecv',
                    blockType: BlockType.COMMAND,
                    text: 'UDPD读取[NUM]个字节的数据',
                    arguments: {
                        NUM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5
                        }
                    }
                },
            ],
            menus: {

            }
        }
    }
}

module.exports = UDblockMQTT;