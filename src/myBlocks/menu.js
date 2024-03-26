const EXTB_LIST = require('../util/extb-definitions');

const miscMenuBlocks = {
    COMIDMenu: {
        acceptReporters: true,
        items: [{ text: "串口1", value: "1" }, { text: "串口2", value: "2" }]
    },
    channel: {
        acceptReporters: true,
        items: [{ text: "黄路", value: "0" }, { text: "蓝路", value: "1" }]
    },
    displayLine: { // OLED模组显示行数菜单
        acceptReporters: true,
        items: [{ text: "一", value: "0" }, { text: "二", value: "1" }, { text: "三", value: "2" }, { text: "四", value: "3" }]
    },
    colorDetectMenu: {
        acceptReporters: true,
        items: [{ text: "红色", value: 0 }, { text: "绿色", value: 1 }, { text: "蓝色", value: 2 }, { text: "全部", value: -1 },]
    },
    colorDetectResultMenu: {
        acceptReporters: true,
        items: [{ text: "红色", value: "(1,0,0)" }, { text: "绿色", value: "(0,1,0)" }, { text: "蓝色", value: "(0,0,1)" }, { text: "黄色", value: "(1,1,0)" }, { text: "紫色", value: "(1,0,1)" }, { text: "天蓝色", value: "(0,1,1)" }, { text: "黑色", value: "(0,0,0)" }, { text: "白色", value: "(1,1,1)" }]
    },
    colorRGBMenu: {
        acceptReporters: true,
        items: [{ text: "红", value: "r" }, { text: "绿", value: "g" }, { text: "蓝", value: "b" }, { text: "列表", value: "all" }]
    },
    faceMenu: {
        acceptReporters: true,
        items: [{ text: "笑脸", value: "0x01" }, { text: "调皮", value: "0x02" }, { text: "得意", value: "0x03" }, { text: "伤心", value: "0x04" }, { text: "开心", value: "0x05" }, { text: "OK", value: "0x06" }, { text: "两眼发光", value: "0x07" }]
    },
    faceColorMenu: {
        acceptReporters: true,
        items: [{ text: "红色", value: "FACE_COLOR_RED" }, { text: "绿色", value: "FACE_COLOR_GREEN" }, { text: "蓝色", value: "FACE_COLOR_BLUE" }, { text: "红蓝", value: "FACE_COLOR_REDBLUE" }, { text: "红绿", value: "FACE_COLOR_REDGREEN" }, { text: "蓝绿", value: "FACE_COLOR_BLUEGREEN" }, { text: "白色", value: "FACE_COLOR_RBG" }]
    },
    digitalDisplayIntensityMenu: {
        acceptReporters: true,
        items: [{ text: "0", value: 0 }, { text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 },
        { text: "4", value: 4 }, { text: "5", value: 5 }, { text: "6", value: 6 }, { text: "7", value: 7 }, { text: "8", value: 8 }]
    },
    // 摄像头
    kcamera_modes: {
        acceptReporters: true,
        items: [
            { text: "物体识别", value: "obj" },
            { text: "颜色识别", value: "color" },
            { text: "人脸识别", value: "face" },
            { text: "分类识别", value: "self_learning" },
            { text: "二维码识别", value: "qrcode" },
            { text: "条形码识别", value: "barcode" },
            { text: "标签识别", value: "april_tag" },
            { text: "循迹识别", value: "route" },
        ]
    },
    kcamera_obj_results: {
        acceptReporters: true,
        items: [
            { text: "名称", value: "id" },
            { text: "中心坐标(X)", value: "x" },
            { text: "中心坐标(Y)", value: "y" },
            { text: "方框宽度(W)", value: "w" },
            { text: "方块高度(H)", value: "h" },
            { text: "检测到的数量", value: "count" },
        ]
    },
    kcamera_face_results: {
        acceptReporters: true,
        items: [
            { text: "人脸ID", value: "id" },
            { text: "中心坐标(X)", value: "x" },
            { text: "中心坐标(Y)", value: "y" },
            { text: "方框宽度(W)", value: "w" },
            { text: "方块高度(H)", value: "h" },
            { text: "人脸置信度", value: "score" },
        ]
    },
    kcamera_qrcode_results: {
        acceptReporters: true,
        items: [
            { text: "文本", value: "text" },
        ]
    },
    kcamera_barcode_results: {
        acceptReporters: true,
        items: [
            { text: "文本", value: "text" },
        ]
    },
    kcamera_color_results: {
        acceptReporters: true,
        items: [
            { text: "屏幕中心RGB数值", value: "rgb" },
            { text: "色块位置X", value: "x" },
            { text: "色块位置Y", value: "y" },
            { text: "色块宽度", value: "w" },
            { text: "色块高度", value: "h" },
        ]
    },
    kcamera_route_results: {
        acceptReporters: true,
        items: [
            { text: "路口中心坐标(X)", value: "cross_x" },
            { text: "路口中心坐标(Y)", value: "cross_y" },
            { text: "路口类型", value: "type" },
            { text: "道路水平偏移", value: "offset_x" },
        ]
    },
    kcamera_april_results: {
        acceptReporters: true,
        items: [
            { text: "中心坐标(X)", value: "x" },
            { text: "中心坐标(Y)", value: "y" },
            { text: "方框宽度(W)", value: "w" },
            { text: "方框高度(H)", value: "h" },
            { text: "旋转角度", value: "rotation" },
            { text: "标签类型", value: "tag_family" },
            { text: "标签ID", value: "tag_id" },
            { text: "3D坐标", value: "translation_3d" },
            { text: "3D旋度", value: "rotation_3d" },
        ]
    },
    kcamera_classifier_results: {
        acceptReporters: true,
        items: [
            { text: "名称", value: "id" },
            { text: "颜色(估计)", value: "color" },
            { text: "置信度", value: "score" },
        ]
    },
    actions: {
        acceptReporters: true,
        items: [{ text: "开始", value: "START" }, { text: "切换", value: "SWITCH" }]
    },
    color: {
        acceptReporters: true,
        items: [{ text: "红色", value: "red" }, { text: "绿色", value: "green" }, { text: "蓝色", value: "blue" }, { text: "黄色", value: "yellow" }, { text: "天蓝色", value: "skyblue" }, { text: "紫色", value: "purple" }, { text: "白色", value: "white" }, { text: "黑色", value: "black" }]
    },
    imageMethods: {
        acceptReporters: true,
        items: [{ text: "边缘查找", value: "iess" }, { text: "锐化", value: "ishs" }, { text: "浮雕化", value: "issr" }]
    },
    colorResult: {
        acceptReporters: true,
        items: [{ text: "X", value: "0" }, { text: "Y", value: "1" }, { text: "宽度", value: "2" }, { text: "高度", value: "3" }]
    },
    faceModes: {
        acceptReporters: true,
        items: [{ text: "默认模式", value: "00" }, { text: "保存模式", value: "01" }]
    },
    inferedIndexMenu: {
        acceptReporters: true,
        items: [{ text: "一", value: "0" }, { text: "二", value: "1" }, { text: "三", value: "2" }, { text: "四", value: "3" }, { text: "五", value: "4" }, { text: "六", value: "5" }, { text: "七", value: "6" }, { text: "八", value: "7" },]
    },
    inferedDirectionMenu: {
        acceptReporters: true,
        items: [{ text: "车前", value: "front" }, { text: "车左前", value: "frontleft" }, { text: "车前中", value: "frontcenter" }, { text: "车右前", value: "frontright" }, { text: "车后", value: "back" }, { text: "车左后", value: "backleft" }, { text: "车后中", value: "backcenter" }, { text: "车右后", value: "backright" },]
    },
    FourInferredMap: {
        acceptReporters: true,
        items: [
            { text: "L2L1R1R2(0000)", value: "0x0f" },
            { text: "L2L1R1R2(1000)", value: "0x0e" },
            { text: "L2L1R1R2(0100)", value: "0x0d" },
            { text: "L2L1R1R2(1100)", value: "0x0c" },
            { text: "L2L1R1R2(0010)", value: "0x0b" },
            { text: "L2L1R1R2(1010)", value: "0x0a" },
            { text: "L2L1R1R2(0110)", value: "0x09" },
            { text: "L2L1R1R2(1110)", value: "0x08" },
            { text: "L2L1R1R2(0001)", value: "0x07" },
            { text: "L2L1R1R2(1001)", value: "0x06" },
            { text: "L2L1R1R2(0101)", value: "0x05" },
            { text: "L2L1R1R2(1101)", value: "0x04" },
            { text: "L2L1R1R2(0011)", value: "0x03" },
            { text: "L2L1R1R2(1011)", value: "0x02" },
            { text: "L2L1R1R2(0111)", value: "0x01" },
            { text: "L2L1R1R2(1111)", value: "0x00" },

            // { text: "四路都没有压线", value: "0x0f" },
            // { text: "第一路压线", value: "0x0e" },
            // { text: "第二路压线", value: "0x0d" },
            // { text: "第一二路压线", value: "0x0c" },
            // { text: "第三路压线", value: "0x0b" },
            // { text: "第一第三路压线", value: "0x0a" },
            // { text: "第二第三路压线", value: "0x09" },
            // { text: "第一第二第三路压线", value: "0x08" },
            // { text: "第四路压线", value: "0x07" },
            // { text: "第一第四路压线", value: "0x06" },
            // { text: "第二第四路压线", value: "0x05" },
            // { text: "第一第二第四路压线", value: "0x04" },
            // { text: "第三第四路压线", value: "0x03" },
            // { text: "第一第三第四路压线", value: "0x02" },
            // { text: "第二第三第四路压线", value: "0x01" },
            // { text: "第一第二第三第四路压线", value: "0x00" },
        ]
    },
    carProComStatusMenu: {
        acceptReporters: true,
        items: [{ text: "开始", value: "start" }, { text: "停车", value: "stop" }, { text: "挖矿", value: "mine" }, { text: "旋转180度", value: "maintain"}]
    },
    StepperDirectionMenu: {
        acceptReporters: true,
        items: [{ text: "正向", value: "0x01" }, { text: "反向", value: "0x00" }]
    },
    // 0 select 
    // 1 L3    
    // 2 R3   
    // 3 start  
    // 4 上    
    // 5 右     
    // 6 下    
    // 7 左    
    // 8 L2    
    // 9 R2     
    // 10 L1   
    // 11 R1   
    // 12 三角形 
    // 13 圆形   
    // 14 ×    
    // 15 正方形

    ps2BtnMenu: {
        acceptReporters: true,
        items: [
            // {text: "select", value: "0"},
            // {text: "L3", value: "1"},
            // {text: "R3", value: "2"},
            // {text: "start", value: "3"},
            { text: "上", value: "4" },
            { text: "右", value: "5" },
            { text: "下", value: "6" },
            { text: "左", value: "7" },
            { text: "L2", value: "8" },
            { text: "R2", value: "9" },
            { text: "L1", value: "10" },
            { text: "R1", value: "11" },
            { text: "Δ", value: "12" },
            { text: "o", value: "13" },
            { text: "×", value: "14" },
            { text: "□", value: "15" },
        ]
    },
    appBtnMenu: {
        acceptReporters: true,
        items: [
            // {text: "select", value: "0"},
            // {text: "L3", value: "1"},
            // {text: "R3", value: "2"},
            // {text: "start", value: "3"},
            { text: "上", value: "4" },
            { text: "右", value: "5" },
            { text: "下", value: "6" },
            { text: "左", value: "7" },
            { text: "L2", value: "9" },
            { text: "R2", value: "11" },
            { text: "L1", value: "8" },
            { text: "R1", value: "10" },
            { text: "Δ", value: "0" },
            { text: "o", value: "1" },
            { text: "×", value: "2" },
            { text: "□", value: "3" },
        ]
    },
    // 0 ly 1 lx 2 ry 3 rx
    ps2RemoteMenu: {
        acceptReporters: true,
        items: [
            { text: "LY", value: "0" },
            { text: "LX", value: "1" },
            { text: "RY", value: "2" },
            { text: "RX", value: "3" },
        ]
    },
    motor_module_motor_menu: {
        acceptReporters: true,
        items: [
            { text: "电机一", value: "0" },
            { text: "电机二", value: "1" },
            { text: "电机三", value: "2" },
            { text: "电机四", value: "3" },
        ]
    },
    motor_module_servo_menu: {
        acceptReporters: true,
        items: [
            { text: "舵机一", value: "0" },
            { text: "舵机二", value: "1" },
            { text: "舵机三", value: "2" },
            { text: "舵机四", value: "3" },
        ]
    },
}


// 生成双向RJ11菜单，不包含只能输入的引脚
const GenerateRJMenuDuplex = function (id) {    
    var menu = {
        acceptReporters: true,
        items: []
    }
    var rj11s;
    console.log('id is', id);
    rj11s = EXTB_LIST[id].RJ11;
    for (var i in rj11s) {
        var rj11Name = rj11s[i].name;
        if (!rj11s[i].duplex) {
            // 只允许输入的引脚
            continue;
        }
        var rj11_menu_item = {
            text: rj11Name,                 // RJ11 名称
            value: rj11s[i].value.join(",") // RJ11 的引脚
        }
        menu.items.push(rj11_menu_item);
    }
    return menu;
}

// 生成RJ11菜单，包含所有的引脚
const GenerateRJMenu = function (id) {
    var menu = {
        acceptReporters: true,
        items: []
    }
    var rj11s;

    rj11s = EXTB_LIST[id].RJ11;
    for (var i in rj11s) {
        var rj11Name = rj11s[i].name;
        var rj11_menu_item = {
            text: rj11Name,                 // RJ11 名称
            value: rj11s[i].value.join(",") // RJ11 的引脚
        }
        menu.items.push(rj11_menu_item);
    }
    return menu;
}

const GenerateRJDigiMenu = function (id) {
    var menu = {
        acceptReporters: true,
        items: []
    }
    var rj11s;
    rj11s = EXTB_LIST[id].RJ11;

    for (var i in rj11s) {
        var rj11Name = rj11s[i].name;
        var rj11_menu_item = {
            text: rj11Name,                 // RJ11 名称
            value: String(rj11s[i].value[1]) // RJ11 的引脚
        }
        menu.items.push(rj11_menu_item);
    }
    return menu;
}
const GenerateADCMenuFull = function (id) {
    var menu = {
        acceptReporters: true,
        items: []
    }
    var rj11s;
    rj11s = EXTB_LIST[id].RJ11;

    for (var i in rj11s) {
        var rj11Name = rj11s[i].name;
        var rj11_menu_item = {
            text: rj11Name,          // RJ11 名称
            value: String(rj11s[i].value[0]) // ADC引脚
        }
        menu.items.push(rj11_menu_item);

    }
    return menu;
}
const GenerateADCMenu = function (id) {
    var menu = {
        acceptReporters: true,
        items: []
    }
    var rj11s = EXTB_LIST[id].RJ11;
    // alert(JSON.stringify)
    for (var i in rj11s) {
        var rj11Name = rj11s[i].name;
        var rj11_menu_item = {
            text: rj11Name,          // RJ11 名称
            value: String(rj11s[i].value[0]) // ADC引脚
        }
        if (rj11s[i].adc == true)
            menu.items.push(rj11_menu_item);
    }
    return menu;
}

const GenerateI2CMenu = function (id) {
    var menu = {
        acceptReporters: true,
        items: []
    }
    var rj11s;

    rj11s = EXTB_LIST[id].RJ11;
    for (var i in rj11s) {
        if (rj11s[i].value[0] > 33 || rj11s[i].value[1] == 21){
            continue
        }
        var rj11Name = rj11s[i].name;
        var rj11_menu_item = {
            text: rj11Name,                 // RJ11 名称
            value: rj11s[i].value.join(",") // RJ11 的引脚
        }
        menu.items.push(rj11_menu_item);
    }
    return menu;
}

const GenerateRJMenuAll = function (id, bt) {
    var menu = {
        RJMenuDup: GenerateRJMenuDuplex(id),
        RJMenu: GenerateRJMenu(id),
        RJDigiMenu: GenerateRJDigiMenu(id),
        RJADCMenu: GenerateADCMenu(id),
        RJADCMenuFull: GenerateADCMenuFull(id),
        RJI2CMenu: GenerateI2CMenu(id)
    }
    console.log(menu)
    return menu
}
export {
    miscMenuBlocks,
    GenerateRJMenuDuplex,
    GenerateRJMenu,
    GenerateRJDigiMenu,
    GenerateADCMenuFull,
    GenerateADCMenu,
    GenerateRJMenuAll
};