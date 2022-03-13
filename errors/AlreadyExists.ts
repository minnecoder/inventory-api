import HTTPException from './HTTPException'

export class AlreadyExists extends HTTPException {
    constructor(type: string) {
        super(400, `${type} already exists`)
    }
}
