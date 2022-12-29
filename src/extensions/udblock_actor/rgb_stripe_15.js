const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
var bt = require('../../util/extb-definitions');
const {miscMenuBlocks, GenerateRJMenuAll} = require('../../myBlocks/menu');
// 方块图标链接
const blockIconURI = 'data:image/png;base64,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'

class UDRGBStrip15 {
    constructor(runtime) {
        this.runtime = runtime;
        bt.registerDef(this.getInfo().id);
    }

    getInfo() {
        return {
            id: "rgbStript15",
            name: "RGB灯带(15灯珠)",
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'openRGBStrip',
                    blockType: BlockType.COMMAND,
                    text: '打开RGB灯条[PORT]灯珠数量[COUNT]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: "RJMenu"
                        },
                        COUNT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 15
                        }
                    }
                },
                {
                    opcode: 'setRGBStripLuminance',
                    blockType: BlockType.COMMAND,
                    text: '设置RGB灯条[PORT]亮度[NUM]%',
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: "RJMenu"
                        },
                        NUM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 20
                        }
                    }
                },
                {
                    opcode: 'setRGBStripIndexColor',
                    blockType: BlockType.COMMAND,
                    text: '设置RGB灯条[PORT][INDEX]号灯颜色[COLOR]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: "RJMenu"
                        },
                        INDEX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        COLOR: {
                            type: ArgumentType.COLOR
                        }
                    }
                },
                {
                    opcode: 'setRGBStripIndexOnlyColor',
                    blockType: BlockType.COMMAND,
                    text: '设置RGB灯条[PORT]只有[INDEX]号灯显示[COLOR]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: "RJMenu"
                        },
                        INDEX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        COLOR: {
                            type: ArgumentType.COLOR
                        }
                    }
                },
                {
                    opcode: 'setRGBStripClear',
                    blockType: BlockType.COMMAND,
                    text: '设置RGB灯条[PORT]颜色[COLOR]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: "RJMenu"
                        },
                        COLOR: {
                            type: ArgumentType.COLOR
                        }
                    }
                },
            ],
            menus: {
                // 生成RJ11菜单，针对不同的拓展板
                ...GenerateRJMenuAll(bt.bt, bt.bt),
                ...miscMenuBlocks
            }
        }
    }

    readTouchValue(){

    }
}

module.exports = UDRGBStrip15;