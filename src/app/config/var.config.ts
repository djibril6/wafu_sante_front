import { Patient } from './patient-model.config';
import { User } from './user-model.config';
import { HistoryAddData } from './history-model.config';

export class VarConfig {
    public MAIN_URL = 'http://empirewafu.pro/wafu/wafu_sante_back/';
    public urlForIMGUpload = 'http://empirewafu.pro/wafu/wafu_person/';

    public patient: Patient;
    public telPatient: string;
    public idPatient: string;

    public user: User;
    public connected = false;

    public appID = 'AAAAAAAAAAAAA';

    public element: string;
    public defaultPWD = 'wafu1234';

    public historyData: HistoryAddData = {refUser: '-', action: '', refStructure: '-'};
}
