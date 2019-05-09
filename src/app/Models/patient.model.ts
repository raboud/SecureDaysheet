
export type ContactType = 'Home' | 'Work' | 'Cell' | 'Email' ;

export type AddressType = 'Home' | 'Work' ;

export enum InsuranceType {
 Primary,
 Secondary,
 Rertiary,
}

export interface IContactInfo {
  Type: ContactType;
  Info: string;
}

export interface IAddress {
  Type: AddressType;
  AddressLine1: string;
  AddressLine2: string;
  City: string;
  State: string;
  ZipCode: string;
}

export interface IInsuranceInfo {
  Type: number;
  RelationShip: string;
  InsuredId: string;
  ClaimNumber: string;
  ClaimType: string;
  AccidentDate: Date;
  AutoAccidentStat: string;
}

export interface IPatient {
  Id: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Addresses: IAddress[]
  ContactInfos: IContactInfo[];
  InActive: boolean;
  DOB: string;
  Gender: string;
  Race: string;
  Ethnicity: string;
  Insurance: IInsuranceInfo[];
}
