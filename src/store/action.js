export function getTukang(payload) {
    return {type: "GET_TUKANG", payload}
}
export function getIdTukang(payload) {
    return {type: "GET_ID", payload}
}
export function setTokenTukang(payload) {
    return {type: "SET_TOKEN", payload}
}