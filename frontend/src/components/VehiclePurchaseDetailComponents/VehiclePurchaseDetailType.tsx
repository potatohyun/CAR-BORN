export interface Props {
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
  open: boolean;
  handleClose: () => void;
  data: any;
  error: Error | null;
}

interface DetailDataType {
  accountId: string;
  carId: number;
  carMaker: string;
  carMileage: number;
  carModelNm: string;
  carModelYear: string;
  carRegNm: string;
  content: string;
  id: string;
  price: number;
  regDt: string;
  saleStatus: number;
  uptDt: string;
}

export interface RepairDataType {
  id: number;
  repairBookCarModelYear: string;
  repairBookCarRegNm: string;
  repairBookAccountName: string;
  repairBookAccountId: string;
  repairBookBookStatus: number;
  mileage: number;
  metadataUri: string;
  repairBookCarModelNm: string;
  repairDt: string;
}
export interface InspectDataType {
  id: number;
  content: string;
  inspectBookId: number;
  regDt: string;
  mileage: number;
  beforeImgNm: string;
  afterImgNm: string;
  receiptImgNm: string;
  inspectDt: string;
  metadataUri: string;
}
export interface InsuranceDataType {
  id: number;
  regDt: string;
  insuranceCompanyAccountId: string;
  category: string;
  insuranceDt: string;
  carMaker: string;
  carModelNm: string;
  carModelYear: string;
  carRegNm: string;
  metadataUri: string;
}
export interface DetailData {
  data: DetailDataType;
}

export interface RepairData {
  data: RepairDataType;
}
export interface InspectData {
  data: InspectDataType;
}
export interface InsuranceData {
  data: InsuranceDataType;
}
