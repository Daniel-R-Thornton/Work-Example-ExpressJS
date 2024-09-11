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
  FundingSourceId: number;
}

export interface UpdateClientinput {
  Id: string;
  Name?: string;
  DateOfBirth?: Date;
  MainLanguage?: string;
  SecondaryLanguage?: string;
  FundingSourceId?: number;
}

export interface FundingSource {
  name: string;
  id: string;
}
