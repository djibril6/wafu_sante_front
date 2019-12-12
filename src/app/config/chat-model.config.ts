export interface IChat {
    success?: boolean;
    message?: string;
    response?: ChatData;
}

interface ChatData { 
    user?: string;
    messages?: [{
        user: {
            name: String,
            avatar: String,
        },
        _id: String,
        text: String,
        reply: Boolean,
        date: string,
    }];
}

export class Chat implements IChat {
    constructor(
        public success?: boolean,
        public message?: string,
        public response?: ChatData,
    ) {}
}
