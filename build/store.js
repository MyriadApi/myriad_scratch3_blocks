"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initState = { isConnected: false };
const store = ((state) => {
    let accState = Object.freeze(state);
    const newState = (ns) => {
        const merged = Object.assign({}, accState, ns);
        accState = Object.freeze(merged);
    };
    const getState = () => {
        return accState;
    };
    return {
        newState,
        getState,
    };
})(initState);
exports.default = store;
