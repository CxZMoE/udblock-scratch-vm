const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
var bt = require('../../util/extb-definitions');
const {miscMenuBlocks, GenerateRJMenuAll} = require('../../myBlocks/menu');
// 方块图标链接
const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAD59JREFUaEPtWQl0FFW6/qqrl3R3Ot2ddDoLIQuBrISAbEFiWMJOAIEMaNgdeDCOPAWVER0HUeHhAgEePmQEZGAAQQmyI6uAbLJn0wCBJGRPp7uzdXpL9/y3EiAK78l5eoZxjnW4p6vqVur+3798/3cLDr/yg/uV24/fADzuCP4Wgd8i8DM98FsK/UwH/uw//7eOgEa+VB6VnJScdMdxR4RiEbK35WYujpufOWbCBHVISIjHhx8urtPpdJg69T+8srKy7B4eHrqYmBg9uZUzGAz1BkNZQbt2YVFSqTTCYrFlSSRcyIQJvzu0dOlfVQEBAZK0tLHGl19+1bNr167Sb46dqjt66ohtmeWjAanPjgvKdGUi1BVq3z8vY6f9FErpnYaHheuhEZDxGMaL8d+6kXr/LSsPeZyvOcOZis1IX7PYPitoin3qlOf40LAw0Rvz57kSeydi8NAU0YXzp93m+kZ+bOp4ni2Uk53psjTWOTvGxog95Aq+rtbklMoU/KgRKbaVK1aJ2gaHci88P6NpzNNjRL2T+nIXzp9zbdvxhXu/1zHZkTdOizLqPkdPdwKee3qQte6WvbzR4kpzAOd+DOJhAEThQYqs50aHRxoDHaaMwEad2VEHmAH7eTuSarthxYqP4O2jw/x5czBmbCq69+iFU18fBcQyDBs+EhzHIe/7HJQUFyJ54ECIRCI0OZ2w2mxIe+ZZvL9kCYKCQ/Han15BUmIi+iUPQmbmVcx95WXk9S6ET7wOte5aBMm9XLOK9EXVZbbgT7bfuFVhcsQTAEtrEPcAuN1ubuHChdzy5cu9noiQlqUOCTcqZe4Fa60Fn1xzNIJ3iKAyeOLFuD9i+LAU6P388OH7izF0yDDExsXj8sVzuHj5Itp3aA8xz8NkMuDLjH0Y/+x42G1WAZTN7sD69RuwedNm6P0DsGzp++jRowc5IAGlJcVIX7EcR1RfwwEnbG4HRvj62AYr/FKqTY4vlv8tW13vELevqDDfJgBuep+bAREAkPFKi9X5Gl3qrBaL9NCBz6d0ivB2F5dW1K1es0Z7Oa8ET8RHwelsQq/u/TFx4mRUVVXAWG0ApQLdpwWtjXj3nTdxKz8LLhfgcLjQBCWSEqIhkUjRJkCLL/adR1JSX0z//e9pVRGqDZXQaLVsfahUanpvGvQBKvBiKS5fycGQpB7uV199yWi327W5+TWip/oO3KXVautFwE6ZTLyjNQBfuviWRmjr8NwuKCSP/R3Hjx2Cq8kqGOmlUiA2IgRW8ibzqkjiCbfLDREvQkFRMbKzssgPnGAU6J9SIRGek0h4+hs34jvFwZuMZq5zOhyQcDY4yDEuesfxk+cQ2CaYUo6Hxtsf48Y/g2fGjwGRw49TfxG9888/CaDoTgm2bP0CZ08dhlZejfIKMxKTx8PLyxNLKfwOu5M81hYKhVIwsiWagvEuCoOQ+01OmhOBp3MWc5GIE67ZvMViQZPNAI1GDd5lxNVcAwY8FYMmFwelrhPV0yiMGT38/w/gDgHYui0DR77aBZ6KKjPnJtZSRPr27YfFi97G0UO7UG8Vk0c1kIh5IQoszViuMzhKpQJ2uxUSqRQ80RoDzMLCi0VoaLChtrYWnrIG+AcEQ8lXYd+x64joEApzTQO69UzG0GEjfz6Az7btJEO/RKM5B5ezq7D+b1sQHR2Dv2/agDMnD6DB7iF43MHSQSIRosC8yw6xWCz8srm75+xZVjPsmudYsZSh0S5BoJ8nrudXILZjDExVhejcfSgS+wx5NACVlZWeDie3rLLS8GRdQ0OQzWr1ovBzFRWVOHP6NG7kXYOKL8CJc4XonZgEvY8XLl3NRvGdUvj6BcBqtZPRdgIga85VIUWahOKlhKHaqadbEiGFGEPdnVPKeXSNVqCogkOI3oIjZysR16kTjBX5aNPuSQQEdUBycrKQdk1NTSxVq7RaTb5O7/NhoJ/P/SJma+7Zc1FRU+MUHz25Nfr08b0ndTp/qYeHnPg8kwqYPMhT6LkmgfKUoir4+qrBSfS4fSsP+45mCoTGvCuRiPH0gAiUVNYj0McD1fUczl0pgqWxEUq5DMP7dYCxphHeKh42lwdMlC4uWSimTZ0GPz89dmx6G/uP5iLt6Vhs2Z2PAYNGIjfnqsB4Xbom9psw84VsA3zqp/ULs7YuYm+H032Q8jPY1eQSGY3VOjdR7e3bhdi4cQuyrn2LKVMn0wL+Aqev/+tymA0FqKLmxoslQgRYEbM6ZoUb3MYbNqJRObV0KgeUVZiIaZxCnbA5h9NF5xQZmiMYkHqFYkRKCtHoRHxzZDP+8MJrGDR4CMIje5JMmQiprDmyWo3GJOL5JgrwUgnPL/lJFmJF/Bkr4oNf4j/nzCEPM4bkcPZAOuob3Th5sQTf511vplEK830WamE9dovlTat+z3Lf6WDFDMgVCsREhUHfJgqpqWMFEEuXvA5DwWHUiRMweMiIR6sBCv1D+wADkLFzLw4fzMCkyVOIo4NgNJrwPyuXQCRVo7S4ADduNAPwJMZpouK1Wq0C0OZaaPltAcEu24W3R1FhIRWyA3K5Aj4+PoiKikDnzh1RW1OHgwf2QiKy4akBaUhMSv75AHZk7MHhr3YiIqAG5nonsvPM1LDK0DchHLn5dZSbJda6BoeMUof0Am45Ha5YAcCPjG/B0+jhIcm02hzdRNQM1F5Kp7+fTtI+PBTUYSlYpHhzr+PatWxMmDQDffoNemQAOnLeefJguxafCT83b95qqYELENuv4/zVUuJ0OVxkYaOlHmovFXrGyq4dOl3WyVMl/54qfUFlWc321u9oHQkJz+WHRwamFtyqOKFWiOWhwbqKdu0ig0rLS9E2NBq1DW6IneWoNd6G3LcvevXugxnTJ99rZK0C+y519jfvBXn7djffuXNJXE1NneZ6/ne+az9euVnrrZOwln7pwjlqQhzGjRuLnhOnE2+7EESyYsb0KaisKIfZVE2pw5oT7+JFXK3d5tTcXegBIECTRutlpHV0lHYca3RJvTujpsaMiKiOFGGiX0sR9YM76NcrFPtOlCFlRCrpqzxqeiaSFlOnPPlkUoFGo7oZHOzL9gjNgS4vdyutVsNyenOXhvr6gNpacwAv4rmy8jKcOnUSJkM5oiIDYfpzOsrOXcOKSF9MSktFwa18SqFmAEpPpVALjY2W+zXQsoJQyy0EEBUVhfz8fOrQduJ1BdQkI8xGIwYPTBBqQCpX4dCRkxgxchy0PoEYnjJSYAImSTRan0K1l1exVu2dHhraqg+wIqb3PyDmioruYOvWHTh+ZA96xCnRdup7EBP3xfMOTE4bLxjrcNgFAHe9wYxt7sP3y4ClXDMCok3W5OhUKuVrtd6aoujIoI537lRRcYfAUFFCXZlY7twVjB47EUOGpuB3qaMe0EJEhI8u5nbs2E1FTFLClIVzl8vw8Zp18A8MQNr4VHSIiBA8U1RUJHRcmUczXwtKlK5NxmqBdjtERKKujrzLOjNpYdYrSMcKOikkNAwVFGk5CcKGhgYCJkVWZiYmTJ6B/smDH7mI/1caFfoAATh58pjA6UuXrYAXhX3Oi7PRv38ypQHr1nlwEpDY2I7U6Gwk6nhB1O3bu1vQPONpF1ZWVga9Xk+Am1UqA9bQUId9+/YK96h+BI3EgDPZkDpuMobS7u6R1Sg5rSWF7nNgYWERPt2wGWe++Rrnzx7D6H7ByMy3IC5cg7OZ5egdrxc6scFYi2s36/BEByWlhwiVZhvMtXYE+yuEiFy/0wC9VgpPBdNGLhSUWRDiLxcktpOMr2lwQacWttKoNNnx3e1qDBoyFqPHjKX9wGjIZD/cDzwshZQ1ddY3iJt1DRaL7MCenRPio7S8oaoc77y3Blk5eSAKxP7F4Vi1rxGzhijw7me1eH28Gtu+cWB0ghRLMux4I1UCo10Ls9mMwgob2url8JRacfamFB0D6mkbGgAVV4Wvsj0wJNaE7Ep/xOjKkWNqh07+RuZ7HP9OhiUbrpAUV+GpxN54980XYLGLkF9US+q0/wG1WkPiyfW5SiUT6Pphm3pN91h1+ey0KAvPcfsv5FZP+Hj7DfKeHPsXheHSbQ7xbe14Z7sNr49TIf1LC2aP9MR/ZTgxZzhJZZcYZ/KIlaRN4HgJfJWNuFHliWi9GSF+EojcduzO9EZKbAUO5PojpWM5sg2hgkYilsWlrEK8tylXqPk5U2KcEUHyT0wW17Rln+bIqqvs7UjBFbSm54cBED8R5VX+0qQozyY3/93F7MrO6zLySXyJsXBmF8jFdnq5CJ8eLMcfRrUhsUbygUTZthNmjOqlxndFjfDzVqC+vh59OpLmp6LNOA90Dm2Cv48n2ncbjbh+f4SxJBNHPp1JkXUht1yJ19O/EuT4+/PHYeOeHIE+//TKi/DxDXRu+WgG95cPMhzFlfY2ZLzxpwCAUvXt+Cjv2WqVRPltVjVJYSouRjOtjxZeF+62iB+ObRvp6walohBbGdvgEO0wfcRktojjERUdw505f0nENjkhQX4uRsWdOnfhTpw8y5WWlqBD+xDXkveWcrNnv3hvvYnjBjbs2HVkKYneha1Y+gdU/QPb2AWVTTDtQfya2ZsZScq3+WgN5IEI0vPsubv3780TwdCOAmoa7SoNhr+QiFPNnfvSuhXpKy5t2Lhx9KRJkwYePHgwa/jQoZ93695d6avXh23btm20UqmUPP/884tXr179Eb23QsizVsdDv8w9gOaXucHWos8RiDtx4sSipKSk3vS7u2/fvmtu3ry5JDw8PI6+S61666232E7LTiOG0nAlAZDPmzdv/gcffLCZ7pXRaNbiD/HmL2Pm//0WJU13WLBgwRQy9CVqgLcjIyMX1dTUrKK+wAcFBU2j7e2lFgBx1Ni2kNxQ/CsBYLv+IPognFBSUrKBp2PmzJnr165dOyM3Nzc7NjZ2Ls2z/SlLk3j67LJLLpcr/5UAECdBx4zLzMxcFhcX1/HSpUu36et02Lp16zZNnz59Fc3doCGl0YUisINFYO7cuW+mp6dvpXvFLdG5J3j/mTVwN7lUdBJFRfnirFmzJrCbTDslJiY+f+bMmRN0WV1cXLySZEUspVQ0BUlUWlpaSOr1SlhYGOl51LSug8cBgCm+4ISEhGQyeDXTRFQLJfT/DeyDaR4NjmrisJeXV3jrcqJ7hRqNpg/dK6dhe1xFzNZlNMvabgca0TTUNBi75NBgmxRPGsz49jSYyGROrqZxk8b1lmcfKwBmEFNnDAQzkJ3Tf0CgkkYDDTkNVic+LXPs+UYarANX0XjsKUQ20GaAPtLRYMXKzhm3kyAR2IdFiLEVG2yOHWyPxJ5h/aH5A2vL8Thq4O7av8jvrx7APwBz0/KLu9oIAAAAAABJRU5ErkJggg=='

class UDOledModuleSSD1306Of128M64 {
    constructor(runtime) {
        this.runtime = runtime;
        bt.registerDef(this.getInfo().id);
    }

    getInfo() {
        return {
            id: "oledModuleSSD1306Of128M64",
            name: "OLED显示模组(128x64)",
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'displayClean',
                    blockType: BlockType.COMMAND,
                    text: '控制OLED显示屏擦除内容'
                },
                {
                    opcode: 'displayWrite',
                    blockType: BlockType.COMMAND,
                    text: '将在OLED显示屏[LINE]行显示文本[TEXT]',
                    arguments:{
                        LINE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0, // * 16
                            menu: "displayLine"
                        },
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "UDBlock,Go!"
                        }
                    }
                },
                // {
                //     opcode: 'displayWriteShow',
                //     blockType: BlockType.COMMAND,
                //     text: '在OLED显示屏[LINE]行显示文本[TEXT]立即显示',
                //     arguments:{
                //         LINE: {
                //             type: ArgumentType.NUMBER,
                //             defaultValue: 0, // * 16
                //             menu: "displayLine"
                //         },
                //         TEXT: {
                //             type: ArgumentType.STRING,
                //             defaultValue: "UDBlock, Go!"
                //         }
                //     }
                // },
                {
                    opcode: 'displayShow',
                    blockType: BlockType.COMMAND,
                    text: '控制显示器刷新内容'
                },
                {
                    opcode: 'displayDrawLabel',
                    blockType: BlockType.COMMAND,
                    text: 'OLED显示屏画标签 X:[X] Y:[Y] 内容: [STR]',
                    arguments:{
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 50, // * 16
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5, // * 16
                        },
                        STR: {
                            type: ArgumentType.STRING,
                            defaultValue: 'UDPI', // * 16
                        },
                    }
                },
                {
                    opcode: 'displayDrawPoint',
                    blockType: BlockType.COMMAND,
                    text: 'OLED显示屏画点 X[X] Y[Y]',
                    arguments:{
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0, // * 16
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0, // * 16
                        }
                    }
                },
                {
                    opcode: 'displayDrawLine',
                    blockType: BlockType.COMMAND,
                    text: 'OLED显示屏画直线 起点 X[SX] Y[SY] | 终点 X[EX] Y[EY]',
                    arguments:{
                        SX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0, // * 16
                        },
                        SY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0, // * 16
                        },
                        EX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 128, // * 16
                        },
                        EY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 64, // * 16
                        },
                    }
                },
                {
                    opcode: 'displayDrawRect',
                    blockType: BlockType.COMMAND,
                    text: 'OLED显示屏画矩形 X[SX] Y[SY] 长[LENGTH] 宽[WIDTH]',
                    arguments:{
                        SX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 128/2 - 20, // * 16
                        },
                        SY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 64/2 - 20, // * 16
                        },
                        LENGTH: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 40, // * 16
                        },
                        WIDTH: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 40, // * 16
                        },
                    }
                },
                {
                    opcode: 'displayDrawRectFill',
                    blockType: BlockType.COMMAND,
                    text: 'OLED显示屏画实心矩形 X[SX] Y[SY] 长[LENGTH] 宽[WIDTH]',
                    arguments:{
                        SX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 128/2 - 20, // * 16
                        },
                        SY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 64/2 - 20, // * 16
                        },
                        LENGTH: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 40, // * 16
                        },
                        WIDTH: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 40, // * 16
                        },
                    }
                },
                {
                    opcode: 'displayDrawCircle',
                    blockType: BlockType.COMMAND,
                    text: 'OLED显示屏画圆形 坐标 X:[SX] Y:[SY] 半径:[R]',
                    arguments:{
                        SX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 128/2 - 20, // * 16
                        },
                        SY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 64/2 - 20, // * 16
                        },
                        R: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 40, // * 16
                        },
                    }
                },
                {
                    opcode: 'displayDrawCircleFill',
                    blockType: BlockType.COMMAND,
                    text: 'OLED显示屏画实心圆形 X:[SX] Y:[SY] 半径[R]',
                    arguments:{
                        SX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 128/2 - 20, // * 16
                        },
                        SY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 64/2 - 20, // * 16
                        },
                        R: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 40, // * 16
                        },
                    }
                },
                {
                    opcode: 'displayDrawTriangle',
                    blockType: BlockType.COMMAND,
                    text: 'OLED显示屏画三角形 坐标 X1:[X1] Y1:[Y1]\nX2:[X2] Y2:[Y2]\nX3:[X3] Y3:[Y3]',
                    arguments:{
                        X1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 128/2, // * 16
                        },
                        Y1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 64/2 - 20, // * 16
                        },
                        X2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 128/2 + 20, // * 16
                        },
                        Y2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 64/2 + 20, // * 16
                        },
                        X3: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 128/2 - 20, // * 16
                        },
                        Y3: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 64/2 + 20, // * 16
                        },
        
                    }
                },
                {
                    opcode: 'displayDrawTriangleFill',
                    blockType: BlockType.COMMAND,
                    text: 'OLED显示屏画实心三角形 坐标 X1:[X1] Y1:[Y1]\nX2:[X2] Y2:[Y2]\nX3:[X3] Y3:[Y3]',
                    arguments:{
                        X1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 128/2, // * 16
                        },
                        Y1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 64/2 - 20, // * 16
                        },
                        X2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 128/2 + 20, // * 16
                        },
                        Y2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 64/2 + 20, // * 16
                        },
                        X3: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 128/2 - 20, // * 16
                        },
                        Y3: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 64/2 + 20, // * 16
                        },
        
                    }
                },
                {
                    opcode: 'displayDrawCircle',
                    blockType: BlockType.COMMAND,
                    text: 'OLED显示屏画圆形 坐标 X:[SX] Y:[SY] 半径:[R]',
                    arguments:{
                        SX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 128/2 - 20, // * 16
                        },
                        SY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 64/2 - 20, // * 16
                        },
                        R: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 40, // * 16
                        },
                    }
                },
                {
                    opcode: 'displayScroll',
                    blockType: BlockType.COMMAND,
                    text: 'OLED显示屏内容向X:[X] Y:[Y]移动 ',
                    arguments:{
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0, // * 16
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5, // * 16
                        },
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

module.exports = UDOledModuleSSD1306Of128M64;