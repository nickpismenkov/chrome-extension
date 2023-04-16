export interface ISecret {
    newSecret(): void
    getSecret(): string
}

export class Secret implements ISecret {
    private secret: string

    constructor() {
        this.secret = this.generateSecret()
    }

    private generateSecret(): string {
       return (Math.random() + 1).toString(36).substring(2)
    }

    newSecret(): void {
        this.secret = this.generateSecret()
    }

    getSecret() {
        return this.secret
    }
}