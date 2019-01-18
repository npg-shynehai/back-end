import { Person } from '@/models/Person';
import { FormState } from '@/models/state/FormState';

export class PersonFormState extends FormState {
    public form: Person;
    public isProcessing: boolean; // Should be convert to local variable
    public errors!: Error[];
    constructor() {
        super();
        this.form = new Person('', null, '');
        this.isProcessing = false;
    }
}
