interface ICampaignPayload {
  campaignId: string;
  campaignKey: string;
  value: string | number | boolean;
}

export interface Untitled1 {
  campaigns: Campaign[];
  total_campaigns: number;
}

export interface ICampaign {
  beneficiary: Beneficiary;
  bank: Bank;
  status: string;
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
  submittedDate: string;
  changedStatusOn: string;
  _id: string;
  campaignName: string;
  category: string;
  createdDate: string;
  adhaar_photo: Photo[];
  beneficiary_photo: Photo[];
  others: any[];
  campaigner: Campaigner;
  longDescription: string;
  description: string;
  fromdate: string;
  target: number;
  donation: number;
  enddate: string;
  statusChangedBy: StatusChangedBy;
}

export interface Photo {
  _id: string;
  url: string;
  public_id: string;
}

export interface Bank {
  bankName: string;
  ifsccode: string;
  branch: string;
  accountName: string;
  accountNumber: number;
}

export interface Beneficiary {
  firstName: string;
  lastName: string;
  dob: string;
  address: string;
  city: string;
  state: string;
  email: string;
  adhaar: number;
  phone: number;
  pin: number;
}

export interface Campaigner {
  avatar: Avatar;
  _id: string;
  username: string;
  email: string;
}

export interface Avatar {
  public_id: string;
  url: string;
}

export interface StatusChangedBy {
  name: string;
  email: string;
  userId: string;
}
