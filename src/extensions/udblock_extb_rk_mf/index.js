const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const log = require('../../util/log');
const {extb_rk_mf} = require('../../util/extb-definitions');
var {bt} = require('../../util/extb-definitions');
const {miscMenuBlocks, GenerateRJMenuAll} = require('../../myBlocks/menu');
const carBlocks = require('../../myBlocks/car');
const cameraBlocks = require('../../myBlocks/camerab');
const sensorBlocks = require('../../myBlocks/sensor');
const actionBlocks = require('../../myBlocks/action');
// 方块图标链接
const blockIconURI = 'data:image/png;base64,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'

class UDblockEXTBRKMF {
    constructor(runtime) {
        this.runtime = runtime;
        this.customBlocks = [
            // {
            //     type: "custom_seperator",
            //     text: '★ 触摸按键',
            // },
            // {
            //     opcode: 'readTouchValue',
            //     blockType: BlockType.REPORTER,
            //     text: '读取触摸按键[BTN]数值',
            //     arguments: {
            //         BTN: {
            //             type: ArgumentType.STRING,
            //             menu: "touchMenu"
            //         }
            //     }
            // },
            // {
            //     opcode: 'readTouchPressed',
            //     blockType: BlockType.BOOLEAN,
            //     text: '检测触摸按键[BTN]按下',
            //     arguments: {
            //         BTN: {
            //             type: ArgumentType.STRING,
            //             menu: "touchMenu"
            //         }
            //     }
            // },
        ].concat(
            sensorBlocks,
            actionBlocks(),
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
        var rj11s;
        if (bt == 'rk'){
            rj11s = extb_rk_mf.RJ11RK;
        }else{
            rj11s = extb_rk_mf.RJ11ESP32;
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
    }

    getInfo() {
        return {
            id: "udblockEXTBRKMF",
            name: "RK多功能拓展板",
            blockIconURI: blockIconURI,
            blocks: this.customBlocks,
            menus: {
                ...GenerateRJMenuAll('extb_rk_mf', 'rk'),
                touchMenu: {
                    acceptReporters: true,
                    items: extb_rk_mf.touch
                },
                servoMenu: {
                    acceptReporters: true,
                    items: [
                        {text:"一", value:extb_rk_mf.servo[0].value.join(",")},
                        {text:"二", value:extb_rk_mf.servo[1].value.join(",")},
                        {text:"三", value:extb_rk_mf.servo[2].value.join(",")},
                        {text:"四", value:extb_rk_mf.servo[3].value.join(",")},
                    ]
                },
                motorMenu: {
                    acceptReporters: true,
                    items: [
                        {text:"一", value:extb_rk_mf.motor[0].value.join(",")},
                        {text:"二", value:extb_rk_mf.motor[1].value.join(",")},
                    ]
                },
                dblRelayPinYellow: this.dblRelayPinYellow,
                dblRelayPinBlue:this.dblRelayPinBlue,
                ...miscMenuBlocks
            }
        }
    }

    readTouchValue(){
    }
}

module.exports = UDblockEXTBRKMF;