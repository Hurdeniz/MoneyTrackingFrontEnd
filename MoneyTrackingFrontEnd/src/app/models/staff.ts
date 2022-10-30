export interface Staff {
  staffId: number;
  identityNumber: string;
  nameSurname: string;
  phone1: string;
  phone2: string;
  email: string;
  province: string;
  district: string;
  adress: string;
  staffTaskId: number;
  staffEpisodeId: number;
  dateOfEntryIntoWork: Date;
  dateOfDismissal: Date;
  status: boolean;
}
