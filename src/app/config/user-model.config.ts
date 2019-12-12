export interface IUser {
    success?: boolean;
    message?: string;
    response?: UserData;
}

export interface IAllUser {
    success?: boolean;
    message?: string;
    response?: UserData[];
}

interface UserData {
    _id?: number;
    nom?: string;
    prenom?: string;
    tel?: string;
    pwd?: string;
    roles?: [string];
    createBy?: string;
    dateCreation?: Date;
    actif?: string;
    ref_structure?: string;
}

export class User implements IUser {
    constructor(
        public success?: boolean,
        public message?: string,
        public response?: UserData,
    ) {}
}

export class AllUser implements IAllUser {
    constructor(
        public success?: boolean,
        public message?: string,
        public response?: UserData[],
    ) {}
}
