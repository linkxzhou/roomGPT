export const kLocalInviteCode = "InviteCode";

// TODO: add magic number
const magicNum = 7;

export function isWeChat(): boolean {
    const ua = window.navigator.userAgent.toLowerCase();
    const match = ua.match(/MicroMessenger/i);
    if (match === null) {
        return false;
    }
    if (match.includes('micromessenger')) {
        return true;
    }
    return false;
}

export function checkSumEncrypt(data: string): boolean {
    if (!data) return false;
    let sum = 0;
    for (let i = 0; i < data.length - 1; i++) {
        sum += data.charCodeAt(i);
    }
    sum += magicNum; 
    return (sum%16).toString(16) == (data.charCodeAt(data.length - 1)%16).toString(16);
}

export function setLocal(name: string, data: string) {
    localStorage.setItem(name, data);
}

export function getLocal(name: string): any {
    return localStorage.getItem(name);
}
  
/******
function checkSumEncrypt(data) {
    let sum = 0;
    for (let i = 0; i < data.length - 1; i++) {
        sum += data.charCodeAt(i);
    }
    sum += 7; // TODO: add magic number
    return (sum%16).toString(16) == (data.charCodeAt(data.length - 1)%16).toString(16);
}

function generateSumEncrypt(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomStr = "";
    for (let i = 0; i < length; i++) {
        randomStr += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    let sum = 0;
    for (let i = 0; i < randomStr.length; i++) {
        sum += randomStr.charCodeAt(i);
    }
    sum += 7; // TODO: add magic number
    let result = randomStr + (sum%16).toString(16);
    return result;
}
******/
