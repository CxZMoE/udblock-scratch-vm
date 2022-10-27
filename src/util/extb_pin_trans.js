const BIDTable = {
    // RJ1
    "36": {
        esp32: 33,
        rk: 19,
        rk_origin: 19,
    },
    "58": {
        esp32: 5,
        rk: 0,      // XXX
        rk_origin: 16,
    },
    // RJ2
    "35": {
        esp32: 32,
        rk: 17,
        rk_origin: 17,
    },
    "59": {
        esp32: 17,
        rk: 13,
        rk_origin: 13,
    },
    // RJ3
    "57": {
        esp32: 18,
        rk: 14,
        rk_origin: 14,
    },
    "60": {
        esp32: 2,
        rk: 15,
        rk_origin: 15,
    },
    // RJ4
    "34": {
        esp32: 35,
        rk: 18, // C2 C2              // XXX
        rk_origin: 18, // C2 C2
    },
    "42": {
        esp32: 19,
        rk: 4,  // A4 A4                  // XXX
        rk_origin: 4,  // A4 A4
    },
    // RJ5
    "33": {
        esp32: 34,
        rk: 16, // A0 C0          // XXX
        rk_origin: 0, // A0 C0
    },
    "38": {
        esp32: 26,
        rk: 1,  // A1 A1
        rk_origin: 1,  // A1 A1
    },
    // RJ6
    "37": {
        esp32: 25,
        rk: 23,  // C7 C7
        rk_origin: 23,  // C7 C7
    },
    "41": {
        esp32: 21,
        rk: 22,  // C6 C6
        rk_origin: 22,  // C6 C6
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
    return String(BIDTable[bid]["esp32"]);
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