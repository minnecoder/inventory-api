import HTTPException from './HTTPException'

export class NotFound extends HTTPException {
    constructor(type: string) {
        super(404, `${type} was not found`)
    }
}

export class IsMissing extends HTTPException {
    constructor(type: string) {
        super(404, `${type} is missing`)
    }
}