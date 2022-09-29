const BIDTable = {
    "36": {
        esp32: 33,
        rk: 18,
    },
    "58": {
        esp32: 5,
        rk: 6,
    },

    "35": {
        esp32: 32,
        rk: 17,
    },
    "59": {
        esp32: 17,
        rk: 13,
    },

    "57": {
        esp32: 18,
        rk: 14,
    },
    "60": {
        esp32: 2,
        rk: 15,
    },

    "34": {
        esp32: 35,
        rk: 16,
    },
    "42": {
        esp32: 19,
        rk: 5,
    },

    "33": {
        esp32: 34,
        rk: 19,
    },
    "38": {
        esp32: 26,
        rk: 1,
    },
    "37": {
        esp32: 25,
        rk: 23,
    },
    "41": {
        esp32: 21,
        rk: 22,
    },
}

const RJ_BIDTable = {
    "1": [36, 58],
    "2": [35, 59],
    "3": [57, 60],
    "4": [34, 42],
    "5": [33, 38],
    "6": [37, 41]
}

function GetESP32PinByBid(bid){
    return String(BIDTable[bid]["esp32"]);
}

function GetRKPinByBid(bid){
    return String(BIDTable[bid]["rk"]);
}

function GetRJPinPair(rjId, chip="esp32"){
    let rjBids = RJ_BIDTable[rjId];
    let rj_a_bid = rjBids[0];
    let rj_b_bid = rjBids[1];
    let rj_a = BIDTable[rj_a_bid][chip];
    let rj_b = BIDTable[rj_b_bid][chip];
    console.log(rj_a, rj_b)
    return [String(rj_a), String(rj_b)];
}

module.exports = {
    GetRJPinPair,
    GetESP32PinByBid,
    GetRKPinByBid
}