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
const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+cGVuLWljb248L3RpdGxlPjxnIHN0cm9rZT0iIzU3NUU3NSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik04Ljc1MyAzNC42MDJsLTQuMjUgMS43OCAxLjc4My00LjIzN2MxLjIxOC0yLjg5MiAyLjkwNy01LjQyMyA1LjAzLTcuNTM4TDMxLjA2NiA0LjkzYy44NDYtLjg0MiAyLjY1LS40MSA0LjAzMi45NjcgMS4zOCAxLjM3NSAxLjgxNiAzLjE3My45NyA0LjAxNUwxNi4zMTggMjkuNTljLTIuMTIzIDIuMTE2LTQuNjY0IDMuOC03LjU2NSA1LjAxMiIgZmlsbD0iI0ZGRiIvPjxwYXRoIGQ9Ik0yOS40MSA2LjExcy00LjQ1LTIuMzc4LTguMjAyIDUuNzcyYy0xLjczNCAzLjc2Ni00LjM1IDEuNTQ2LTQuMzUgMS41NDYiLz48cGF0aCBkPSJNMzYuNDIgOC44MjVjMCAuNDYzLS4xNC44NzMtLjQzMiAxLjE2NGwtOS4zMzUgOS4zYy4yODItLjI5LjQxLS42NjguNDEtMS4xMiAwLS44NzQtLjUwNy0xLjk2My0xLjQwNi0yLjg2OC0xLjM2Mi0xLjM1OC0zLjE0Ny0xLjgtNC4wMDItLjk5TDMwLjk5IDUuMDFjLjg0NC0uODQgMi42NS0uNDEgNC4wMzUuOTYuODk4LjkwNCAxLjM5NiAxLjk4MiAxLjM5NiAyLjg1NU0xMC41MTUgMzMuNzc0Yy0uNTczLjMwMi0xLjE1Ny41Ny0xLjc2NC44M0w0LjUgMzYuMzgybDEuNzg2LTQuMjM1Yy4yNTgtLjYwNC41My0xLjE4Ni44MzMtMS43NTcuNjkuMTgzIDEuNDQ4LjYyNSAyLjEwOCAxLjI4Mi42Ni42NTggMS4xMDIgMS40MTIgMS4yODcgMi4xMDIiIGZpbGw9IiM0Qzk3RkYiLz48cGF0aCBkPSJNMzYuNDk4IDguNzQ4YzAgLjQ2NC0uMTQuODc0LS40MzMgMS4xNjVsLTE5Ljc0MiAxOS42OGMtMi4xMyAyLjExLTQuNjczIDMuNzkzLTcuNTcyIDUuMDFMNC41IDM2LjM4bC45NzQtMi4zMTYgMS45MjUtLjgwOGMyLjg5OC0xLjIxOCA1LjQ0LTIuOSA3LjU3LTUuMDFsMTkuNzQzLTE5LjY4Yy4yOTItLjI5Mi40MzItLjcwMi40MzItMS4xNjUgMC0uNjQ2LS4yNy0xLjQtLjc4LTIuMTIyLjI1LjE3Mi41LjM3Ny43MzcuNjE0Ljg5OC45MDUgMS4zOTYgMS45ODMgMS4zOTYgMi44NTYiIGZpbGw9IiM1NzVFNzUiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGQ9Ik0xOC40NSAxMi44M2MwIC41LS40MDQuOTA1LS45MDQuOTA1cy0uOTA1LS40MDUtLjkwNS0uOTA0YzAtLjUuNDA3LS45MDMuOTA2LS45MDMuNSAwIC45MDQuNDA0LjkwNC45MDR6IiBmaWxsPSIjNTc1RTc1Ii8+PC9nPjwvc3ZnPg==';


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
            cameraBlocks,
            sensorBlocks,
            actionBlocks()
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