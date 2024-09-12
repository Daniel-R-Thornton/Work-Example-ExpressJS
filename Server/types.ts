export interface Client {
  Id: number;
  Name: string;
  DateOfBirth: Date;
  MainLanguage: string;
  SecondaryLanguage: string;
  FundingSourceId: number;
  FundingSourceName: string;
}

export interface CreateClientInput {
  Name: string;
  DateOfBirth: Date;
  MainLanguage: string;
  SecondaryLanguage: string;
  FundingSourceId: string;
}

export interface FundingSource {
  name: string;
  id: string;
}
