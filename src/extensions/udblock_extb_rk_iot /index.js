const ArgumentType = require('scratch-vm/src/extension-support/argument-type');
const BlockType = require('scratch-vm/src/extension-support/block-type');
const {miscMenuBlocks, GenerateRJMenuAll} = require('scratch-vm/src/myBlocks/menu');
const cameraBlocks = require('scratch-vm/src/myBlocks/camerab');
const sensorBlocks = require('scratch-vm/src/myBlocks/sensor');
const actionBlocks = require('scratch-vm/src/myBlocks/action');
var bt = require ('scratch-vm/src/util/extb-definitions');
const { extb_rk_iot } = require('../../util/extb-definitions');
// 方块图标链接
const blockIconURI = 'data:image/png;base64,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'
class UDblockEXTBRKIOT {
    constructor(runtime) {
        this.runtime = runtime;
        this.customBlocks = [].concat(
            sensorBlocks,
            actionBlocks(false, false),
            cameraBlocks,
        )
        this.dblRelayPinYellow = {
            acceptReporters: true,
            items: []
        };
        this.dblRelayPinBlue = {
            acceptReporters: true,
            items: []
        };
        // 双路继电器生成菜单
        console.log(1)
        var rj11s;
        if (bt.bt == 'rk'){
            rj11s = extb_rk_iot.RJ11RK;
        }
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
        console.log(2)
        
    }

    getInfo() {

        return {
            id: "udblockEXTBRKIOT",
            name: "RK智能语音拓展板",
            blockIconURI: blockIconURI,
            blocks: [
                {
                    type: "custom_seperator",
                    text: '★ 功能',
                },
                {
                    opcode: 'initAiPlayer',
                    blockType: BlockType.COMMAND,
                    text: '初始化AI播放器'
                },
                {
                    opcode: 'initAiPlayerWithIP',
                    blockType: BlockType.COMMAND,
                    text: '初始化AI播放器 本机IP[IP]',
                    arguments: {
                        IP: {
                            type: ArgumentType.STRING,
                            defaultValue: "填入客户端所在网络设备使用的IP地址"
                        }
                    }
                },
                {
                    opcode: 'enableSD',
                    blockType: BlockType.COMMAND,
                    text: '启用SD卡'
                },
                {
                    opcode: 'disableSD',
                    blockType: BlockType.COMMAND,
                    text: '禁用SD卡'
                },
                {
                    opcode: 'setVolume',
                    blockType: BlockType.COMMAND,
                    text: '设置音量为[VOL]',
                    arguments: {
                        VOL:{
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        }
                    }
                },
                {
                    opcode: 'startRecording',
                    blockType: BlockType.COMMAND,
                    text: '录音[DUARATION]秒 保存到文件名[FNAME]',
                    arguments: {
                        DUARATION: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5
                        },
                        FNAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "recorded.wav"
                        }
                    }
                },
                {
                    opcode: 'removeRecord',
                    blockType: BlockType.COMMAND,
                    text: '删除录音文件[FNAME]',
                    arguments: {
                        FNAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "recorded.wav"
                        }
                    }
                },
                {
                    opcode: 'removeRecordAll',
                    blockType: BlockType.COMMAND,
                    text: '删除所有录音文件',
                },
                {
                    opcode: 'startPlaying',
                    blockType: BlockType.COMMAND,
                    text: '播放文件名[FNAME]',
                    arguments: {
                        FNAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "recorded.wav"
                        }
                    }
                },
                {
                    opcode: 'startPlayingAsync',
                    blockType: BlockType.COMMAND,
                    text: '异步播放文件名[FNAME]',
                    arguments: {
                        FNAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "recorded.wav"
                        }
                    }
                },
                {
                    opcode: 'startSTT',
                    blockType: BlockType.COMMAND,
                    text: '使用文件[FNAME]开始语音识别',
                    arguments: {
                        FNAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "recorded.wav"
                        }
                    }
                },
                {
                    opcode: 'getSTTResult',
                    blockType: BlockType.REPORTER,
                    text: '获取语音识别结果',
                },
                {
                    opcode: 'getSTTResultContains',
                    blockType: BlockType.BOOLEAN,
                    text: '语音识别结果包含[TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "你好"
                        },
                    }
                },
                {
                    opcode: 'getSTTResultEquals',
                    blockType: BlockType.BOOLEAN,
                    text: '语音识别结果等于[TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "你好"
                        },
                    }
                },
                {
                    opcode: 'startTTS',
                    blockType: BlockType.COMMAND,
                    text: '开始语音合成 文本[TEXT] 并播放',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "你好"
                        },
                    }
                },
                {
                    opcode: 'startTTSSave',
                    blockType: BlockType.COMMAND,
                    text: '开始语音合成 文本[TEXT] 并保存到文件[FNAME]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "你好"
                        },
                        FNAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "tts.mp3"
                        },
                    }
                },
                {
                    opcode: 'startASRMode',
                    blockType: BlockType.COMMAND,
                    text: '开始语音唤醒模式(小智同学)',
                },
                {
                    opcode: 'getASRResultBL',
                    blockType: BlockType.BOOLEAN,
                    text: '获取离线识别结果为[RESULT]',
                    arguments: {
                        RESULT: {
                            type: ArgumentType.STRING,
                            defaultValue: "1",
                            menu: "asrmenu"
                        }
                    }
                },
                {
                    opcode: 'getASRResult',
                    blockType: BlockType.REPORTER,
                    text: '离线识别结果',
                },
                {
                    opcode: 'asrResult',
                    blockType: BlockType.REPORTER,
                    text: '识别结果[RESULT]',
                    arguments: {
                        RESULT: {
                            type: ArgumentType.STRING,
                            defaultValue: "1",
                            menu: "asrmenu"
                        }
                    }
                },
                {
                    type: "custom_seperator",
                    text: '★ 指纹模块',
                },
                {
                    opcode: 'initFingerprint',
                    blockType: BlockType.COMMAND,
                    text: '初始化指纹模块',
                    arguments: {
                        VOL: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        },
                    }
                },
                {
                    opcode: 'enableFingerprint',
                    blockType: BlockType.COMMAND,
                    text: '启用指纹模块',
                },
                {
                    opcode: 'disableFingerprint',
                    blockType: BlockType.COMMAND,
                    text: '禁用指纹模块',
                },
                {
                    opcode: 'recordFinger',
                    blockType: BlockType.COMMAND,
                    text: '开始指纹录入',
                },
                {
                    opcode: 'renameFingerprint',
                    blockType: BlockType.COMMAND,
                    text: '重命名指纹[FID]为[NFID]',
                    arguments: {
                        FID: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        },
                        NFID: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        },
                    }
                },
                {
                    opcode: 'getFingerprintName',
                    blockType: BlockType.REPORTER,
                    text: '获取当前指纹名字',
                },
                {
                    opcode: 'getFingerprintId',
                    blockType: BlockType.REPORTER,
                    text: '获取当前指纹ID',
                },
                {
                    opcode: 'removeFingerprints',
                    blockType: BlockType.COMMAND,
                    text: '删除所有已录入指纹',
                },
                ...this.customBlocks
            ],
            menus: {
                asrmenu:  {
                    acceptReporters: true,
                    items: [
                        { text: "小智同学", value: "1" },
                        { text: "开灯", value: "2" },
                        { text: "关灯", value: "3" },
                        { text: "开红色的灯", value: "4" },
                        { text: "开绿色的灯", value: "5" },
                        { text: "开蓝色的灯", value: "6" },
                        { text: "播放歌曲", value: "7" },
                        { text: "现在有没有下雨", value: "8" },
                        { text: "当前湿度多少", value: "9" },
                        { text: "当前温度多少", value: "10" },
                        { text: "当前光照强度多少", value: "11" },
                        { text: "开风扇", value: "12" },
                        { text: "关风扇", value: "13" },
                        { text: "开窗帘", value: "14" },
                        { text: "关窗帘", value: "15" },
                        { text: "执行指令一", value: "16" },
                        { text: "执行指令二", value: "17" },
                        { text: "执行指令三", value: "18" },
                        { text: "执行指令四", value: "19" },
                        { text: "执行指令五", value: "20" },
                        { text: "执行指令六", value: "21" },
                        { text: "打开电机一", value: "22" },
                        { text: "打开电机二", value: "23" },
                        { text: "打开电机三", value: "24" },
                        { text: "打开电机四", value: "25" },
                        { text: "打开灯带一", value: "26" },
                        { text: "打开灯带二", value: "27" },
                        { text: "打开灯带三", value: "28" },
                        { text: "打开灯带四", value: "29" },
                        { text: "打开灯带五", value: "30" },
                        { text: "打开灯带六", value: "31" },
                        { text: "打开灯带七", value: "32" },
                        { text: "打开灯带八", value: "33" },
                        { text: "关闭灯带一", value: "34" },
                        { text: "关闭灯带二", value: "35" },
                        { text: "关闭灯带三", value: "36" },
                        { text: "关闭灯带四", value: "37" },
                        { text: "关闭灯带五", value: "38" },
                        { text: "关闭灯带六", value: "39" },
                        { text: "关闭灯带七", value: "40" },
                        { text: "关闭灯带八", value: "41" },
                        { text: "打开双路继电器一黄路", value: "42" },
                        { text: "打开双路继电器一蓝路", value: "43" },
                        { text: "打开双路继电器二黄路", value: "44" },
                        { text: "打开双路继电器二蓝路", value: "45" },
                        { text: "打开双路继电器三黄路", value: "46" },
                        { text: "打开双路继电器三蓝路", value: "47" },
                        { text: "打开双路继电器四黄路", value: "48" },
                        { text: "打开双路继电器四蓝路", value: "49" },
                        { text: "打开双路继电器五黄路", value: "50" },
                        { text: "打开双路继电器五蓝路", value: "51" },
                        { text: "打开双路继电器六黄路", value: "52" },
                        { text: "打开双路继电器六蓝路", value: "53" },
                        { text: "打开双路继电器七黄路", value: "54" },
                        { text: "打开双路继电器七蓝路", value: "55" },
                        { text: "打开双路继电器八黄路", value: "56" },
                        { text: "打开双路继电器八蓝路", value: "57" },
                        { text: "关闭双路继电器一黄路", value: "58" },
                        { text: "关闭双路继电器一蓝路", value: "59" },
                        { text: "关闭双路继电器二黄路", value: "60" },
                        { text: "关闭双路继电器二蓝路", value: "61" },
                        { text: "关闭双路继电器三黄路", value: "62" },
                        { text: "关闭双路继电器三蓝路", value: "63" },
                        { text: "关闭双路继电器四黄路", value: "64" },
                        { text: "关闭双路继电器四蓝路", value: "65" },
                        { text: "关闭双路继电器五黄路", value: "66" },
                        { text: "关闭双路继电器五蓝路", value: "67" },
                        { text: "关闭双路继电器六黄路", value: "68" },
                        { text: "关闭双路继电器六蓝路", value: "69" },
                        { text: "关闭双路继电器七黄路", value: "70" },
                        { text: "关闭双路继电器七蓝路", value: "71" },
                        { text: "关闭双路继电器八黄路", value: "72" },
                        { text: "关闭双路继电器八蓝路", value: "73" },
                        { text: "小智同学", value: "74" },
                        { text: "小智同学", value: "75" },
                        { text: "小智同学", value: "76" },
                        { text: "小智同学", value: "77" },
                        { text: "小智同学", value: "78" },
                        { text: "小智同学", value: "79" },
                        { text: "小智同学", value: "80" },
                        { text: "小智同学", value: "81" },
                        { text: "小智同学", value: "82" },
                        { text: "小智同学", value: "83" },
                        { text: "小智同学", value: "84" },
                        { text: "小智同学", value: "85" },
                        { text: "小智同学", value: "86" },
                        { text: "小智同学", value: "87" },
                        { text: "小智同学", value: "88" },
                        { text: "小智同学", value: "89" },
                        { text: "小智同学", value: "90" },
                        { text: "小智同学", value: "91" },
                        { text: "小智同学", value: "92" },
                        { text: "小智同学", value: "93" },
                        { text: "小智同学", value: "94" },
                        { text: "小智同学", value: "95" },
                        { text: "小智同学", value: "96" },
                        { text: "小智同学", value: "97" },
                        { text: "小智同学", value: "98" },
                        { text: "小智同学", value: "99" },
                        { text: "小智同学", value: "100" }
                    ]
                },
                ...GenerateRJMenuAll('extb_rk_iot', bt.bt),
                dblRelayPinYellow: this.dblRelayPinYellow,
                dblRelayPinBlue:this.dblRelayPinBlue,
                ...miscMenuBlocks
            }
        }
    }


}

module.exports = UDblockEXTBRKIOT;