export class ListTableState {
    public items: any[] = [];
    public isProcessing: boolean; // Should be convert to local variable
    public currentPage: number = 0;
    public totalPage: number = 0;
    public idMin: number = 1;
    public isMore :boolean;
    constructor() {
        this.isProcessing = false;
        this.isMore = false;
        this.currentPage = 1
    }
}
