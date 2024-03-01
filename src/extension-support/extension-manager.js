const dispatch = require('../dispatch/central-dispatch');
var extension_defs  = require('../util/extb-definitions');
const log = require('../util/log');
const maybeFormatMessage = require('../util/maybe-format-message');

const BlockType = require('./block-type');

// These extensions are currently built into the VM repository but should not be loaded at startup.
// TODO: move these out into a separate repository?
// TODO: change extension spec so that library info, including extension ID, can be collected through static methods

// 主板
const category_motherboards = {
    microbit: () => require('../extensions/scratch3_microbit'),
    udblockMicrobit: ()=> require("../extensions/udblock_microbit"),
    udblockUDPi: () => require('../extensions/udblock_udpi'),
    udblockUDPiPlus: () => require('../extensions/udblock_udpi_plus'),
    udblockUDPiV2: () => require('../extensions/udblock_udpi_v2'),
    udblockUDPiPlusV2: () => require('../extensions/udblock_udpi_plus_v2'),
    udblockUDPiMiniV1 : ()=> require("../extensions/udblock_udpi_mini"),
};

// 拓展板
const category_extendboards = {
    // 拓展板
    udblockEXTBMF: () => require("../extensions/udblock_extb_mf"),
    udblockEXTBSM: () => require("../extensions/udblock_extb_sm"),
    udblockEXTBIO: ()=> require("../extensions/udblock_extb_io"),
    udblockEXTBCar: ()=> require("../extensions/udblock_car"),
    udblockEXTBCarPro: ()=> require("../extensions/udblock_carpro"),
    udblockEXTBCar2D: ()=> require("../extensions/udblock_car_2d"),
    udblockEXTBCar2DNew: ()=> require("../extensions/udblock_car_2d_new"),
    udblockEXTBIOT: ()=> require("../extensions/udblock_iot"),
    
}

// 传感器执
const category_sensors = {
    // 传感器
    offlineSTTSensor: ()=>require("../extensions/udblock_sensor/offline_stt_sensor"),
    nfcSensor: ()=>require("../extensions/udblock_sensor/sensor_nfc"),
    raindropSensor: ()=>require("../extensions/udblock_sensor/raindrop_sensor"),
    soundSensor: ()=>require("../extensions/udblock_sensor/sound_sensor"),
    rypoelectricSensor: ()=>require("../extensions/udblock_sensor/rypoelectric_sensor"),
    smartGrayscaleSensor: ()=>require("../extensions/udblock_sensor/smart_grayscale_sensor"),
    colorDetectSensor: ()=>require("../extensions/udblock_sensor/color_detect_sensor"),
    lightAmpSensor: ()=>require("../extensions/udblock_sensor/light_amp_sensor"),
    sonicSensor: ()=>require("../extensions/udblock_sensor/sonic_sensor"),
    routeFindingSensor: ()=>require("../extensions/udblock_sensor/route_finding_sensor"),
    flameDetectSensor: ()=>require("../extensions/udblock_sensor/flame_detect_sensor"),
    simGraySensor: ()=>require("../extensions/udblock_sensor/simulate_grayscale_sensor"),
    smokeSensor: ()=>require("../extensions/udblock_sensor/smoke_sensor"),
    windSpeedSensor: ()=>require("../extensions/udblock_sensor/wind_speed_sensor"),
    dirtHumiditySensor: ()=>require("../extensions/udblock_sensor/dirt_humidity_sensor"),
    waterProofTempSensor: ()=>require("../extensions/udblock_sensor/waterproove_temp_sensor"),
    dht11Sensor: ()=>require("../extensions/udblock_sensor/dht11_sensor"),
    foutChanRouteFinderSensor: ()=>require("../extensions/udblock_sensor/four_channel_route_finder"),
    eightChnKeyboardSensor: ()=>require("../extensions/udblock_sensor/keyboard_module_8"),
    simpleRemoteSensor: ()=>require("../extensions/udblock_sensor/simple_remote"),
    bibiCamK210: ()=>require("../extensions/udblock_sensor/bibi_cam_k210"),
}

// 执行器
const category_actors = {
    offlineTTSModule: ()=>require("../extensions/udblock_actor/offline_tts_module"),
    i2cMotorModule: ()=>require("../extensions/udblock_actor/i2c_motor_module"),
    digitalTube: ()=>require("../extensions/udblock_actor/digital_tube"),
    rgbStript15: ()=>require("../extensions/udblock_actor/rgb_stripe_15"),
    stepperModule: ()=>require("../extensions/udblock_actor/stepper_motor_module"),
    relayOneChn: ()=>require("../extensions/udblock_actor/replay_module_single_channel"),
    relayTwoChn: ()=>require("../extensions/udblock_actor/relay_module_dual_channel"),
    i2cFacePanel: ()=>require("../extensions/udblock_actor/i2c_face_panel"),
    oledModuleSSD1306Of128M64: ()=>require("../extensions/udblock_actor/i2c_oled_ssd1306_128_64"),
}

// 工具
const category_tools = {
    // 工具类
    udblockMQTT: ()=> require("../extensions/udblock-mqtt"),
    udblockUtils : ()=> require("../extensions/udblock-utils"),
}

const nativeExtensions = {
    // This is an example that isn't loaded with the other core blocks,
    // but serves as a reference for loading core blocks as extensions.
    // coreExample: () => require('../blocks/scratch3_core_example'),
    // These are the non-core built-in extensions.
    pen: () => require('../extensions/scratch3_pen'),
    wedo2: () => require('../extensions/scratch3_wedo2'),
    music: () => require('../extensions/scratch3_music'),
    
    text2speech: () => require('../extensions/scratch3_text2speech'),
    translate: () => require('../extensions/scratch3_translate'),
    videoSensing: () => require('../extensions/scratch3_video_sensing'),
    ev3: () => require('../extensions/scratch3_ev3'),
    makeymakey: () => require('../extensions/scratch3_makeymakey'),
    boost: () => require('../extensions/scratch3_boost'),
    gdxfor: () => require('../extensions/scratch3_gdx_for'),

};

// const test_ext = ()=>require('../extensions/udblock_test_ext/test_ext_file')
// console.log('Blockly:', Blockly);
var customExtensions = {}

function newCustomExtensionClass(data){
    class UDBlockCustomExtension {
        constructor(runtime) {
            this.runtime = runtime;
        }
    
        getInfo() {
            return {
                id: data.id,
                name: data.name,
                blockIconURI: data.icon,
                blocks: data.blocks,
                type: "extb_cus",
                menus: {
                    ...data.menus
                }
            }
        }
    }
    return UDBlockCustomExtension;
}

function loadCustomExtensions(extensions){
    var custom_extensions = {};
    window.customExtensions = {};
    extensions.forEach((data)=>{
        let ext = data.block_definition;

        custom_extensions[ext.id] = ()=>newCustomExtensionClass(ext);
        window.customExtensions[ext.id] = ext;
        console.log(customExtensions);
    })
    // extensions is a extension info list loaded from user filesystem
    // extensions: [ext1, ext2, ext3], ext1: {getInfo()...}
    
    return custom_extensions;
}


var builtinExtensions = Object.assign({},
    category_motherboards,
    category_extendboards,
    category_sensors,
    category_actors,
    category_tools,
    nativeExtensions
)

window.electron.bindResCustomExtList((extensions)=>{
    console.log('we have:', extensions);
    customExtensions = loadCustomExtensions(extensions);
    console.log(customExtensions)
    builtinExtensions = Object.assign(builtinExtensions, customExtensions);
})

window.electron.requestCustomExtList();

/**
 * @typedef {object} ArgumentInfo - Information about an extension block argument
 * @property {ArgumentType} type - the type of value this argument can take
 * @property {*|undefined} default - the default value of this argument (default: blank)
 */

/**
 * @typedef {object} ConvertedBlockInfo - Raw extension block data paired with processed data ready for scratch-blocks
 * @property {ExtensionBlockMetadata} info - the raw block info
 * @property {object} json - the scratch-blocks JSON definition for this block
 * @property {string} xml - the scratch-blocks XML definition for this block
 */

/**
 * @typedef {object} CategoryInfo - Information about a block category
 * @property {string} id - the unique ID of this category
 * @property {string} name - the human-readable name of this category
 * @property {string|undefined} blockIconURI - optional URI for the block icon image
 * @property {string} color1 - the primary color for this category, in '#rrggbb' format
 * @property {string} color2 - the secondary color for this category, in '#rrggbb' format
 * @property {string} color3 - the tertiary color for this category, in '#rrggbb' format
 * @property {Array.<ConvertedBlockInfo>} blocks - the blocks, separators, etc. in this category
 * @property {Array.<object>} menus - the menus provided by this category
 */

/**
 * @typedef {object} PendingExtensionWorker - Information about an extension worker still initializing
 * @property {string} extensionURL - the URL of the extension to be loaded by this worker
 * @property {Function} resolve - function to call on successful worker startup
 * @property {Function} reject - function to call on failed worker startup
 */

class ExtensionManager {
    constructor(runtime) {
        /**
         * The ID number to provide to the next extension worker.
         * @type {int}
         */
        this.nextExtensionWorker = 0;

        /**
         * FIFO queue of extensions which have been requested but not yet loaded in a worker,
         * along with promise resolution functions to call once the worker is ready or failed.
         *
         * @type {Array.<PendingExtensionWorker>}
         */
        this.pendingExtensions = [];

        /**
         * Map of worker ID to workers which have been allocated but have not yet finished initialization.
         * @type {Array.<PendingExtensionWorker>}
         */
        this.pendingWorkers = [];

        /**
         * Set of loaded extension URLs/IDs (equivalent for built-in extensions).
         * @type {Set.<string>}
         * @private
         */
        this._loadedExtensions = new Map();

        /**
         * Keep a reference to the runtime so we can construct internal extension objects.
         * TODO: remove this in favor of extensions accessing the runtime as a service.
         * @type {Runtime}
         */
        this.runtime = runtime;

        dispatch.setService('extensions', this).catch(e => {
            log.error(`ExtensionManager was unable to register extension service: ${JSON.stringify(e)}`);
        });
    }

    /**
     * Check whether an extension is registered or is in the process of loading. This is intended to control loading or
     * adding extensions so it may return `true` before the extension is ready to be used. Use the promise returned by
     * `loadExtensionURL` if you need to wait until the extension is truly ready.
     * @param {string} extensionID - the ID of the extension.
     * @returns {boolean} - true if loaded, false otherwise.
     */
    isExtensionLoaded(extensionID) {
        // Crack this for convinience of extension reloading.
        //return false;
        return this._loadedExtensions.has(extensionID);
    }
    removeLoadedExtension(extensionID) {
        this._loadedExtensions.delete(extensionID);
        this.refreshBlocks();
        // console.log("删除Extension:", extensionID)
    }
    removeAllLoadedExtension() {
        this._loadedExtensions.clear()
        this.refreshBlocks();
        // console.log("删除所有Extension:")
    }

    /**
     * Synchronously load an internal extension (core or non-core) by ID. This call will
     * fail if the provided id is not does not match an internal extension.
     * @param {string} extensionId - the ID of an internal extension
     */
    loadExtensionIdSync(extensionId) {
        console.log('同步加载拓展：'+String(extensionID))
        if (!builtinExtensions.hasOwnProperty(extensionId)) {
            log.warn(`Could not find extension ${extensionId} in the built in extensions.`);
            return;
        }

        /** @TODO dupe handling for non-builtin extensions. See commit 670e51d33580e8a2e852b3b038bb3afc282f81b9 */
        if (this.isExtensionLoaded(extensionId)) {
            const message = `Rejecting attempt to load a second extension with ID ${extensionId}`;
            log.warn(message);
            return;
        }

        const extension = builtinExtensions[extensionId]();
        const extensionInstance = new extension(this.runtime);
        const serviceName = this._registerInternalExtension(extensionInstance);
        this._loadedExtensions.set(extensionId, serviceName);
    }

    /**
     * Check is the given id the extended board
     */
    checkIsBuiltin(extensionId){
        return builtinExtensions.hasOwnProperty(extensionId);
    }
    checkIsExtb(extensionID){
        for (id in category_extendboards){
            if (String(id).indexOf(extensionID) > -1){
                return true;
            }
        }
        return false;
    }
    /**
     * Check for is loaded extend board
     */
    checkAnyExtbLoaded(){
        for (var ext_id in category_extendboards) {
            if (this.isExtensionLoaded(ext_id)){
                return true
            }
        }
        return false
    }
    /**
     * Check for loading situation
     */
    checkCanLoad(extensionURL){
        // 检测是否有选择过拓展板，没有就需要选择，选择过就不能再选择
        var can_load = false
        var loaded_extb = null
        

        if (!category_extendboards.hasOwnProperty(extensionURL)){
            // 检查是否加载过拓展板
            can_load = this.checkAnyExtbLoaded();
        }else{
            // 是拓展板
            let loaded_ext = false
            for (var ext_id in category_extendboards) {
                if (this.isExtensionLoaded(ext_id)){
                    loaded_ext = true;
                    loaded_extb = ext_id;
                }
            }
            if (loaded_ext && loaded_extb != extensionURL){
                const message = `已经添加过拓展板，请勿重复添加或新建工程。`
                alert(message)
                log.warn(message);
                return false
            }
            // 是拓展板的拓展
            can_load = true
        }

        // 如果未加载拓展板，并且当前加载的拓展不是主板。
        if (!can_load && !category_motherboards.hasOwnProperty(extensionURL) && !category_tools.hasOwnProperty(extensionURL) && !nativeExtensions.hasOwnProperty(extensionURL) && !extensionURL=="udblockUDPiMiniV1"){
            const message = `请先添加拓展板，然后再加载其他设备。`
            alert(message)
            log.warn(message);
        }else{
            can_load = true
        }
        return can_load
    }

    /**
     * Load an extension by URL or internal extension ID
     * @param {string} extensionURL - the URL for the extension to load OR the ID of an internal extension
     * @returns {Promise} resolved once the extension is loaded and initialized or rejected on failure
     */
    loadExtensionURL(extensionURL) {
        // console.log("通过URL加载拓展：" + extensionURL)
        
        if (builtinExtensions.hasOwnProperty(extensionURL)) {
            
            var result = false
            if (!this.checkCanLoad(extensionURL)){
                return Promise.resolve();
            }
            /** @TODO dupe handling for non-builtin extensions. See commit 670e51d33580e8a2e852b3b038bb3afc282f81b9 */
            if (this.isExtensionLoaded(extensionURL)) {
                const message = `Rejecting attempt to load a second extension with ID ${extensionURL}`;
                log.warn(message);
                return Promise.resolve();
            }
            if (this.checkIsExtb(extensionURL) || extensionURL == "udblockUDPiMiniV1"){
                // console.log('加载的是拓展板');
                Object.assign({"mb": extensionURL}, this.runtime);
                // console.log(this.runtime)
                this.runtime.mb = extensionURL;
            }
            const extension = builtinExtensions[extensionURL]();
            const extensionInstance = new extension(this.runtime);
            const serviceName = this._registerInternalExtension(extensionInstance);
            this._loadedExtensions.set(extensionURL, serviceName);
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            // If we `require` this at the global level it breaks non-webpack targets, including tests
            const ExtensionWorker = require('worker-loader?name=extension-worker.js!./extension-worker');

            this.pendingExtensions.push({ extensionURL, resolve, reject });
            dispatch.addWorker(new ExtensionWorker());
        });
    }

    /**
     * Regenerate blockinfo for any loaded extensions
     * @returns {Promise} resolved once all the extensions have been reinitialized
     */
    refreshBlocks() {
        const allPromises = Array.from(this._loadedExtensions.values()).map(serviceName =>
            dispatch.call(serviceName, 'getInfo')
                .then(info => {
                    info = this._prepareExtensionInfo(serviceName, info);
                    dispatch.call('runtime', '_refreshExtensionPrimitives', info);
                })
                .catch(e => {
                    log.error(`Failed to refresh built-in extension primitives: ${JSON.stringify(e)}`);
                })
        );
        return Promise.all(allPromises);
    }

    allocateWorker() {
        const id = this.nextExtensionWorker++;
        const workerInfo = this.pendingExtensions.shift();
        this.pendingWorkers[id] = workerInfo;
        return [id, workerInfo.extensionURL];
    }

    /**
     * Synchronously collect extension metadata from the specified service and begin the extension registration process.
     * @param {string} serviceName - the name of the service hosting the extension.
     */
    registerExtensionServiceSync(serviceName) {
        const info = dispatch.callSync(serviceName, 'getInfo');
        this._registerExtensionInfo(serviceName, info);
    }

    /**
     * Collect extension metadata from the specified service and begin the extension registration process.
     * @param {string} serviceName - the name of the service hosting the extension.
     */
    registerExtensionService(serviceName) {
        dispatch.call(serviceName, 'getInfo').then(info => {
            this._registerExtensionInfo(serviceName, info);
        });
    }

    /**
     * Called by an extension worker to indicate that the worker has finished initialization.
     * @param {int} id - the worker ID.
     * @param {*?} e - the error encountered during initialization, if any.
     */
    onWorkerInit(id, e) {
        const workerInfo = this.pendingWorkers[id];
        delete this.pendingWorkers[id];
        if (e) {
            workerInfo.reject(e);
        } else {
            workerInfo.resolve(id);
        }
    }

    /**
     * Register an internal (non-Worker) extension object
     * @param {object} extensionObject - the extension object to register
     * @returns {string} The name of the registered extension service
     */
    _registerInternalExtension(extensionObject) {
        const extensionInfo = extensionObject.getInfo();
        // console.log(extensionInfo)

        // 获取板子的类型
        // console.log(extensionInfo.type || null);
        if (extension_defs.bt != extensionInfo.type && extensionInfo.type != null) {
            // console.log(`BT: ${extension_defs.bt} => ${extensionInfo.type}`)
            extension_defs.bt = (extensionInfo.type || null);
        }

        const fakeWorkerId = this.nextExtensionWorker++;
        const serviceName = `extension_${fakeWorkerId}_${extensionInfo.id}`;
        dispatch.setServiceSync(serviceName, extensionObject);

        // delete(dispatch.services[serviceName])
        // // console.log(dispatch.services)
        dispatch.callSync('extensions', 'registerExtensionServiceSync', serviceName);
        return serviceName;
    }

    /**
     * Sanitize extension info then register its primitives with the VM.
     * @param {string} serviceName - the name of the service hosting the extension
     * @param {ExtensionInfo} extensionInfo - the extension's metadata
     * @private
     */
    _registerExtensionInfo(serviceName, extensionInfo) {
        extensionInfo = this._prepareExtensionInfo(serviceName, extensionInfo);
        dispatch.call('runtime', '_registerExtensionPrimitives', extensionInfo).catch(e => {
            log.error(`Failed to register primitives for extension on service ${serviceName}:`, e);
        });
    }

    /**
     * Modify the provided text as necessary to ensure that it may be used as an attribute value in valid XML.
     * @param {string} text - the text to be sanitized
     * @returns {string} - the sanitized text
     * @private
     */
    _sanitizeID(text) {
        return text.toString().replace(/[<"&]/, '_');
    }

    /**
     * Apply minor cleanup and defaults for optional extension fields.
     * TODO: make the ID unique in cases where two copies of the same extension are loaded.
     * @param {string} serviceName - the name of the service hosting this extension block
     * @param {ExtensionInfo} extensionInfo - the extension info to be sanitized
     * @returns {ExtensionInfo} - a new extension info object with cleaned-up values
     * @private
     */
    _prepareExtensionInfo(serviceName, extensionInfo) {
        extensionInfo = Object.assign({}, extensionInfo);
        if (!/^[a-z0-9]+$/i.test(extensionInfo.id)) {
            // console.log(extensionInfo.id)
            throw new Error('Invalid extension id');
        }
        extensionInfo.name = extensionInfo.name || extensionInfo.id;
        extensionInfo.blocks = extensionInfo.blocks || [];
        extensionInfo.targetTypes = extensionInfo.targetTypes || [];
        extensionInfo.blocks = extensionInfo.blocks.reduce((results, blockInfo) => {
            try {
                let result;
                // console.log(blockInfo)

                if (blockInfo.type == "custom_seperator") {
                    //// console.log("here")
                    result = String(blockInfo.text)
                } else {
                    switch (blockInfo) {
                        case '---': // separator
                            result = '---';
                            break;

                        default: // an ExtensionBlockMetadata object
                            result = this._prepareBlockInfo(serviceName, blockInfo);
                            break;
                    }
                    
                }
                results.push(result);

            } catch (e) {
                // TODO: more meaningful error reporting
                log.error(`Error processing block: ${e.message}, Block:\n${JSON.stringify(blockInfo)}`);
            }
            return results;
        }, []);
        extensionInfo.menus = extensionInfo.menus || {};
        extensionInfo.menus = this._prepareMenuInfo(serviceName, extensionInfo.menus);
        return extensionInfo;
    }

    /**
     * Prepare extension menus. e.g. setup binding for dynamic menu functions.
     * @param {string} serviceName - the name of the service hosting this extension block
     * @param {Array.<MenuInfo>} menus - the menu defined by the extension.
     * @returns {Array.<MenuInfo>} - a menuInfo object with all preprocessing done.
     * @private
     */
    _prepareMenuInfo(serviceName, menus) {
        const menuNames = Object.getOwnPropertyNames(menus);
        for (let i = 0; i < menuNames.length; i++) {
            const menuName = menuNames[i];
            let menuInfo = menus[menuName];

            // If the menu description is in short form (items only) then normalize it to general form: an object with
            // its items listed in an `items` property.
            if (!menuInfo.items) {
                menuInfo = {
                    items: menuInfo
                };
                menus[menuName] = menuInfo;
            }
            // If `items` is a string, it should be the name of a function in the extension object. Calling the
            // function should return an array of items to populate the menu when it is opened.
            if (typeof menuInfo.items === 'string') {
                const menuItemFunctionName = menuInfo.items;
                const serviceObject = dispatch.services[serviceName];
                // Bind the function here so we can pass a simple item generation function to Scratch Blocks later.
                menuInfo.items = this._getExtensionMenuItems.bind(this, serviceObject, menuItemFunctionName);
            }
        }
        return menus;
    }

    /**
     * Fetch the items for a particular extension menu, providing the target ID for context.
     * @param {object} extensionObject - the extension object providing the menu.
     * @param {string} menuItemFunctionName - the name of the menu function to call.
     * @returns {Array} menu items ready for scratch-blocks.
     * @private
     */
    _getExtensionMenuItems(extensionObject, menuItemFunctionName) {
        // Fetch the items appropriate for the target currently being edited. This assumes that menus only
        // collect items when opened by the user while editing a particular target.
        const editingTarget = this.runtime.getEditingTarget() || this.runtime.getTargetForStage();
        const editingTargetID = editingTarget ? editingTarget.id : null;
        const extensionMessageContext = this.runtime.makeMessageContextForTarget(editingTarget);

        // TODO: Fix this to use dispatch.call when extensions are running in workers.
        const menuFunc = extensionObject[menuItemFunctionName];
        const menuItems = menuFunc.call(extensionObject, editingTargetID).map(
            item => {
                item = maybeFormatMessage(item, extensionMessageContext);
                switch (typeof item) {
                    case 'object':
                        return [
                            maybeFormatMessage(item.text, extensionMessageContext),
                            item.value
                        ];
                    case 'string':
                        return [item, item];
                    default:
                        return item;
                }
            });

        if (!menuItems || menuItems.length < 1) {
            throw new Error(`Extension menu returned no items: ${menuItemFunctionName}`);
        }
        return menuItems;
    }

    /**
     * Apply defaults for optional block fields.
     * @param {string} serviceName - the name of the service hosting this extension block
     * @param {ExtensionBlockMetadata} blockInfo - the block info from the extension
     * @returns {ExtensionBlockMetadata} - a new block info object which has values for all relevant optional fields.
     * @private
     */
    _prepareBlockInfo(serviceName, blockInfo) {
        blockInfo = Object.assign({}, {
            blockType: BlockType.COMMAND,
            terminal: false,
            blockAllThreads: false,
            arguments: {}
        }, blockInfo);
        blockInfo.opcode = blockInfo.opcode && this._sanitizeID(blockInfo.opcode);
        blockInfo.text = blockInfo.text || blockInfo.opcode;

        switch (blockInfo.blockType) {
            case BlockType.EVENT:
                if (blockInfo.func) {
                    log.warn(`Ignoring function "${blockInfo.func}" for event block ${blockInfo.opcode}`);
                }
                break;
            case BlockType.BUTTON:
                if (blockInfo.opcode) {
                    log.warn(`Ignoring opcode "${blockInfo.opcode}" for button with text: ${blockInfo.text}`);
                }
                break;
            default: {
                if (!blockInfo.opcode) {
                    throw new Error('Missing opcode for block');
                }

                const funcName = blockInfo.func ? this._sanitizeID(blockInfo.func) : blockInfo.opcode;

                const getBlockInfo = blockInfo.isDynamic ?
                    args => args && args.mutation && args.mutation.blockInfo :
                    () => blockInfo;
                const callBlockFunc = (() => {
                    if (dispatch._isRemoteService(serviceName)) {
                        return (args, util, realBlockInfo) =>
                            dispatch.call(serviceName, funcName, args, util, realBlockInfo);
                    }

                    // avoid promise latency if we can call direct
                    const serviceObject = dispatch.services[serviceName];
                    if (!serviceObject[funcName]) {
                        // The function might show up later as a dynamic property of the service object
                        // 找不到拓展方块报错
                        //log.warn(`Could not find extension block function called ${funcName}`);
                    }
                    return (args, util, realBlockInfo) =>
                        serviceObject[funcName](args, util, realBlockInfo);
                })();

                blockInfo.func = (args, util) => {
                    const realBlockInfo = getBlockInfo(args);
                    // TODO: filter args using the keys of realBlockInfo.arguments? maybe only if sandboxed?
                    return callBlockFunc(args, util, realBlockInfo);
                };
                break;
            }
        }

        return blockInfo;
    }
}

module.exports = ExtensionManager;
