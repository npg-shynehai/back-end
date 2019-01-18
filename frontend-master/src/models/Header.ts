export class Header {
    public name_age: string;
    public comment: string;
    public action: string;
    constructor(name_age: string, comment: string, action: string) {
        this.name_age = name_age;
        this.comment = comment;
        this.action = action;
    }
}
module.exports = Header