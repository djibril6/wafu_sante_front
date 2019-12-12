export interface IHistory {
    success?: boolean;
    message?: string;
    response?: HistoryData[];
}

interface HistoryData {
    id?: string;
    tel?: string;
    profil?: [string];
    action?: string;
    dateAction?: string;
}

interface HistoryDataAdd {
    refUser?: string;
    action?: string;
    refStructure?: string;
}

export class History implements IHistory {
    constructor(
        public success?: boolean,
        public message?: string,
        public response?: HistoryData[],
    ) {}
}

export class HistoryAddData implements HistoryDataAdd {
    constructor(
        public refUser?: string,
        public action?: string,
        public refStructure?: string,
    ) {}
}
