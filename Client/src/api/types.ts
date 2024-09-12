export interface Client {
  id: number;
  name: string;
  dateOfBirth: Date;
  mainLanguage: string;
  secondaryLanguage: string;
  fundingSourceId: number;
  fundingSourceName: string;
}

export interface CreateClientInput {
  name: number;
  dateOfBirth: Date;
  mainLanguage: string;
  secondaryLanguage: string;
  fundingSourceId: string;
}

export interface UpdateClientinput {
  id: number;
  name?: string;
  dateOfBirth?: Date;
  mainLanguage?: string;
  secondaryLanguage?: string;
  fundingSourceId?: number;
}

export interface FundingSource {
  name: string;
  id: number;
}
