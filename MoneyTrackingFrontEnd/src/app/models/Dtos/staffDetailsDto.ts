export interface StaffDetailsDto {
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
  staffTaskName: string;
  staffEpisodeId: number;
  staffEpisodeName: string;
  dateOfEntryIntoWork: Date;
  dateOfDismissal: Date;
  status: boolean;
}
