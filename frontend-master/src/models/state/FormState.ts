
export enum Status {
    SUCCESS, FAIL,
}

export class FormState {
    protected message!: string;
    protected status: Status | null = null;
}
