import CryptoJS from 'crypto-js'

export interface IEncryption {
    encryptSHA(value: string): string
    encryptAES(value: string, secretKey: string): string
    decryptAES(cipherText: string, secretKey: string): string
}

export class Encryption implements IEncryption {
    private encoding: typeof CryptoJS.enc.Utf8

    constructor() {
        this.encoding = CryptoJS.enc.Utf8
    }   

    encryptSHA(value: string) {
        return CryptoJS.SHA256(value).toString()
    }

    encryptAES(value: string, secretKey: string) {
        return CryptoJS.AES.encrypt(value, secretKey).toString()
    }

    decryptAES(cipherText: string, secretKey: string) {
        return CryptoJS.AES.decrypt(cipherText, secretKey).toString(this.encoding)
    }
}