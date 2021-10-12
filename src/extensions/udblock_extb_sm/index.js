const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const log = require('../../util/log');
const EXTB_LIST = require('../../util/extb-definitions');
const miscMenuBlocks = require('../../myBlocks/menu');
const cameraBlocks = require('../../myBlocks/camerab');
const sensorBlocks = require('../../myBlocks/sensor');
const actionBlocks = require('../../myBlocks/action');

// 方块图标链接
const blockIconURI = 'data:img/png;base64,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';


class UDblockEXTBSM {
    constructor(runtime) {
        this.runtime = runtime;
        this.customBlocks = [].concat(
            sensorBlocks,
            actionBlocks(),
            cameraBlocks,
        )
    }

    getInfo() {
        return {
            id: "udblockEXTBSM",
            name: "电机拓展板",
            blockIconURI: blockIconURI,
            blocks: this.customBlocks,
            menus: {
                RJMenu: {
                    acceptReporters: true,
                    items: [
                        {text:"RJ1", value:EXTB_LIST.extb_sm.RJ11[0].value.join(",")},
                        {text:"RJ2", value:EXTB_LIST.extb_sm.RJ11[1].value.join(",")},
                        {text:"RJ3", value:EXTB_LIST.extb_sm.RJ11[2].value.join(",")},
                        {text:"RJ4", value:EXTB_LIST.extb_sm.RJ11[3].value.join(",")},
                    ]
                },
                RJDigiMenu: {
                    acceptReporters: true,
                    items: [
                        {text:"RJ1", value:EXTB_LIST.extb_sm.RJ11[0].value[0]},
                        {text:"RJ2", value:EXTB_LIST.extb_sm.RJ11[1].value[0]},
                        {text:"RJ3", value:EXTB_LIST.extb_sm.RJ11[2].value[0]},
                        {text:"RJ4", value:EXTB_LIST.extb_sm.RJ11[3].value[0]},
                    ]
                },
                RJADCMenu: {
                    acceptReporters: true,
                    items: [
                        {text:"RJ1", value: EXTB_LIST.extb_sm.RJ11[0].value[0]},
                        {text:"RJ2", value: EXTB_LIST.extb_sm.RJ11[1].value[0]},
                        {text:"RJ3", value: EXTB_LIST.extb_sm.RJ11[2].value[0]},
                        {text:"RJ4", value: EXTB_LIST.extb_sm.RJ11[3].value[0]},
                    ]
                },
                motorMenu: {
                    acceptReporters: true,
                    items: [
                        {text:"一", value:EXTB_LIST.extb_sm.motor[0].value.join(",")},
                        {text:"二", value:EXTB_LIST.extb_sm.motor[1].value.join(",")},
                        {text:"三", value:EXTB_LIST.extb_sm.motor[2].value.join(",")},
                        {text:"四", value:EXTB_LIST.extb_sm.motor[3].value.join(",")},
                    ]
                },
                servoMenu: {
                    acceptReporters: true,
                    items: [
                        {text:"一", value:EXTB_LIST.extb_sm.servo[0].value},
                        {text:"二", value:EXTB_LIST.extb_sm.servo[1].value},
                        {text:"三", value:EXTB_LIST.extb_sm.servo[2].value},
                        {text:"四", value:EXTB_LIST.extb_sm.servo[3].value},
                    ]
                },
                ...miscMenuBlocks
            }
        }
    }
}

module.exports = UDblockEXTBSM;