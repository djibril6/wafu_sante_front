export interface IPatient {
    success?: boolean;
    message?: string;
    response?: PatientData;
}

interface PatientData {
    id?: string;
    personID?: string;
    numCarte?: string;
    numPassport?: string;
    numCENI?: string;
    nom?: string;
    prenom?: string;
    dateNaiss?: string;
    lieuNaiss?: {region: String, pays: String};
    telephone?: [string];
    email?: [string];
    adresse?: [{residence: String, region: String, pays: String}];
    groupeSanguin?: {libelle: String, code: String};
    contactUrgence?: [string];
    tailles?: [{taille: Number, date: string}];
    poids?: [{poids: Number, date: string}];
    alergies?: [{libelle: String, dateAjout: string, details: String}];
    antecedants?: [{libelle: String, dateAjout: string, details: String, traitement: String}];
    maladies?: [{libelle: String, dateAjout: string, details: String, traitement: String}];
    consultations?: [{libelle: String, dateAjout: string, details: String}];
    examens?: [{libelle: String, dateAjout: string, resultat: String}];
    hospitalisation?: [{lieu: String, dateAjout: string, motif: String, details: String}];
    status?: string;
    photoProfil?: string;
}

export class Patient implements IPatient {
    constructor(
        public success?: boolean,
        public message?: string,
        public response?: PatientData,
    ) {}
}
