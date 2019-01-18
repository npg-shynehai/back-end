export class Person {
    public name: string;
    public age: number | null;
    public comment: string;
    constructor(name: string, age: number | null, comment: string) {
        this.name = name;
        this.age = age;
        this.comment = comment;
    }
}
