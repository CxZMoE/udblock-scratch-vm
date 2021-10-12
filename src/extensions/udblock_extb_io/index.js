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


class UDblockEXTBIO {
    constructor(runtime) {
        this.runtime = runtime;
        this.customBlocks = [].concat(
            sensorBlocks,
            actionBlocks(false,false),
            cameraBlocks
        )
    }

    getInfo() {
        return {
            id: "udblockEXTBIO",
            name: "IO拓展板",
            blockIconURI: blockIconURI,
            blocks: this.customBlocks,
            menus: {
                RJMenu: {
                    acceptReporters: true,
                    items: [
                        {text:"RJ1", value:EXTB_LIST.extb_io.RJ11[0].value.join(",")},
                        {text:"RJ2", value:EXTB_LIST.extb_io.RJ11[1].value.join(",")},
                        {text:"RJ3", value:EXTB_LIST.extb_io.RJ11[2].value.join(",")},
                        {text:"RJ4", value:EXTB_LIST.extb_io.RJ11[3].value.join(",")},
                        {text:"RJ5", value:EXTB_LIST.extb_io.RJ11[4].value.join(",")},
                        {text:"RJ6", value:EXTB_LIST.extb_io.RJ11[5].value.join(",")},
                        {text:"RJ7", value:EXTB_LIST.extb_io.RJ11[6].value.join(",")},
                        {text:"RJ8", value:EXTB_LIST.extb_io.RJ11[7].value.join(",")},
                    ]
                },
                RJDigiMenu: {
                    acceptReporters: true,
                    items: [
                        {text:"RJ1", value:EXTB_LIST.extb_io.RJ11[0].value[0]},
                        {text:"RJ2", value:EXTB_LIST.extb_io.RJ11[1].value[0]},
                        {text:"RJ3", value:EXTB_LIST.extb_io.RJ11[2].value[0]},
                        {text:"RJ4", value:EXTB_LIST.extb_io.RJ11[3].value[0]},
                        {text:"RJ5", value:EXTB_LIST.extb_io.RJ11[4].value[0]},
                        {text:"RJ6", value:EXTB_LIST.extb_io.RJ11[5].value[0]},
                        {text:"RJ7", value:EXTB_LIST.extb_io.RJ11[6].value[0]},
                        {text:"RJ8", value:EXTB_LIST.extb_io.RJ11[7].value[0]},
                    ]
                },
                RJADCMenu: {
                    acceptReporters: true,
                    items: [
                        {text:"RJ1", value: EXTB_LIST.extb_io.RJ11[0].value[0]},
                        {text:"RJ2", value: EXTB_LIST.extb_io.RJ11[1].value[0]},
                        {text:"RJ7", value: EXTB_LIST.extb_io.RJ11[6].value[0]},
                        {text:"RJ8", value: EXTB_LIST.extb_io.RJ11[7].value[0]},
                    ]
                },
                ...miscMenuBlocks
            }
        }
    }
}

module.exports = UDblockEXTBIO;