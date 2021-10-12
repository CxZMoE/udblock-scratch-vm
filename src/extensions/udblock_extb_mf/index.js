const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const log = require('../../util/log');
const EXTB_LIST = require('../../util/extb-definitions');
const miscMenuBlocks = require('../../myBlocks/menu');
const carBlocks = require('../../myBlocks/car');
const cameraBlocks = require('../../myBlocks/camerab');
const sensorBlocks = require('../../myBlocks/sensor');
const actionBlocks = require('../../myBlocks/action');

// 方块图标链接
const blockIconURI = 'data:img/png;base64,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';


class UDblockEXTBMF {
    constructor(runtime) {
        this.runtime = runtime;
        this.customBlocks = [
            {
                type: "custom_seperator",
                text: '★ 触摸按键',
            },
            {
                opcode: 'readTouchValue',
                blockType: BlockType.REPORTER,
                text: '读取触摸按键[BTN]数值',
                arguments: {
                    BTN: {
                        type: ArgumentType.STRING,
                        menu: "touchMenu"
                    }
                }
            },
            {
                opcode: 'readTouchPressed',
                blockType: BlockType.BOOLEAN,
                text: '检测触摸按键[BTN]按下',
                arguments: {
                    BTN: {
                        type: ArgumentType.STRING,
                        menu: "touchMenu"
                    }
                }
            },
        ].concat(
            sensorBlocks,
            actionBlocks(),
            cameraBlocks,
        )
    }

    getInfo() {
        return {
            id: "udblockEXTBMF",
            name: "多功能拓展板",
            blockIconURI: blockIconURI,
            blocks: this.customBlocks,
            menus: {
                touchMenu: {
                    acceptReporters: true,
                    items: EXTB_LIST.extb_mf.touch
                },
                RJMenu: {
                    acceptReporters: true,
                    items: [
                        {text:"RJ1", value:EXTB_LIST.extb_mf.RJ11[0].value.join(",")},
                        {text:"RJ2", value:EXTB_LIST.extb_mf.RJ11[1].value.join(",")},
                        {text:"RJ3", value:EXTB_LIST.extb_mf.RJ11[2].value.join(",")},
                        {text:"RJ4", value:EXTB_LIST.extb_mf.RJ11[3].value.join(",")},
                        {text:"RJ5", value:EXTB_LIST.extb_mf.RJ11[4].value.join(",")},
                        {text:"RJ6", value:EXTB_LIST.extb_mf.RJ11[5].value.join(",")},
                    ]
                },
                RJDigiMenu: {
                    acceptReporters: true,
                    items: [
                        {text:"RJ1", value:EXTB_LIST.extb_mf.RJ11[0].value[0]},
                        {text:"RJ2", value:EXTB_LIST.extb_mf.RJ11[1].value[0]},
                        {text:"RJ3", value:EXTB_LIST.extb_mf.RJ11[2].value[0]},
                        {text:"RJ4", value:EXTB_LIST.extb_mf.RJ11[3].value[0]},
                        {text:"RJ5", value:EXTB_LIST.extb_mf.RJ11[4].value[0]},
                        {text:"RJ6", value:EXTB_LIST.extb_mf.RJ11[5].value[0]},
                    ]
                },
                RJADCMenu: {
                    acceptReporters: true,
                    items: [
                        {text:"RJ1", value: EXTB_LIST.extb_mf.RJ11[0].value[0]},
                        {text:"RJ2", value: EXTB_LIST.extb_mf.RJ11[1].value[0]},
                        {text:"RJ4", value: EXTB_LIST.extb_mf.RJ11[3].value[0]},
                        {text:"RJ5", value: EXTB_LIST.extb_mf.RJ11[4].value[0]},
                    ]
                },
                servoMenu: {
                    acceptReporters: true,
                    items: [
                        {text:"一", value:EXTB_LIST.extb_mf.servo[0].value},
                        {text:"二", value:EXTB_LIST.extb_mf.servo[1].value},
                        {text:"三", value:EXTB_LIST.extb_mf.servo[2].value},
                        {text:"四", value:EXTB_LIST.extb_mf.servo[3].value},
                    ]
                },
                motorMenu: {
                    acceptReporters: true,
                    items: [
                        {text:"一", value:EXTB_LIST.extb_mf.motor[0].value.join(",")},
                        {text:"二", value:EXTB_LIST.extb_mf.motor[1].value.join(",")},
                    ]
                },
                ...miscMenuBlocks
            }
        }
    }

    readTouchValue(){

    }
}

module.exports = UDblockEXTBMF;