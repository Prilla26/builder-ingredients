import { AxiosError } from 'axios';

export type ImageData = {
  url: string;
  alt: string;
};

//https://medium.com/@steve.alves2/how-to-type-hex-colors-in-typescript-3c3b9a32baa7
type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;

export type ColorValueHex = `#${string}`;

export type CallToAction = { url?: string; label: string };

export type ExigoLanguageDictionary = {
  default: string;
  [key: string]: string;
};

export type ExigoProduct = {
  allow: string;
  businessVolume: number;
  commissionableVolume: number;
  countryCode: string;
  currencyCode: string;
  currencyDescription: string;
  currencySymbol: string;
  id: number;
  imageUrl: string;
  imageUrl100: string;
  imageUrl200: string;
  imageUrl400: string;
  itemDescription: string;
  name: string;
  nameLanguages: ExigoLanguageDictionary;
  price: number;
  priceConsultant: number;
  pricePreferred10: number;
  pricePreferred25: number;
  priceRetail: number;
  shortDetail: string;
  shortDetailLanguages: ExigoLanguageDictionary;
  sku: string;
  specialPrice: number;
  webCategoryID: number;
  webCategoryIDs: Array<number> | null;
};

export type CmsExigoProduct = Omit<
  ExigoProduct,
  'nameLanguages' | 'shortDetailLanguages'
>;

export enum RedirectionPath {
  Checkout = '/checkout',
  EnrollmentInformation = '/enrollment/information',
  Home = '/',
  Login = '/log-in',
  SignUp = '/sign-up',
  AllProducts = '/products',
}

export const ForgotPasswordPath =
  'https://myaccount.immunotec.com/forgotpassword';

export type PasswordStrength = {
  value: number;
  label: string;
  strength: number;
};

export type ProductTag = {
  name: string;
  handle: string;
  color: RGB | HEX;
};

export enum ErrorType {
  Server = 'Server',
  InvalidRequest = 'InvalidRequest',
}

export type GeneralError<ErrorT = unknown> = Error | AxiosError<ErrorT | null>;

export type ErrorResponse<ErrorT = unknown> = {
  errorType: ErrorType;
  error?: ErrorT;
  fallbackError?: GeneralError<ErrorT> | null;
};

export type CustomError<ErrorT> = {
  errorData?: ErrorResponse<ErrorT> | null;
  errorMessage: string;
} | null;

//Only keys of an object, whose type is KeyTypeU
export type KeysOfType<ObjectTypeT, KeyTypeU> = {
  [ObjKey in keyof ObjectTypeT]: ObjectTypeT[ObjKey] extends KeyTypeU
    ? ObjKey
    : never;
}[keyof ObjectTypeT];

export enum Languages {
  EN_US = 'en-US',
  ES_US = 'es-US',
  EN_CA = 'en-CA',
  FR_CA = 'fr-CA',
  ES_ES = 'es-ES',
  ES_CO = 'es-CO',
  ES_BO = 'es-BO',
  ES_DO = 'es-DO',
  ES_MX = 'es-MX',
  ES_GT = 'es-GT',
  ES_PE = 'es-PE',
  EN_GB = 'en-GB',
  EN_IE = 'en-IE',
  ES_EC = 'es-EC',
  PT_PT = 'pt-PT',
  IT_IT = 'it-IT',
  EN_CH = 'en-CH',
  DE_DE = 'de-DE',
  DE_AT = 'de-AT',
}

export enum LanguagesDefault {
  Default = 'xx-XX',
}

export type DataTestIdType = {
  dataTest?: string | undefined;
  readonly?: boolean;
  isCheckoutError?: boolean;
};

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type TextBlockSizes = 'base' | 'lg' | 'sm';

export function removePropertyFromObj<T>(obj: T, key: keyof T): Partial<T> {
  const newObj: Partial<T> = {};

  for (const prop in obj) {
    if (prop !== key) {
      newObj[prop] = obj[prop];
    }
  }

  return newObj;
}

export const colors = [
  '#0033A1',
  '#9EA1A2',
  '#000000',
  '#7FC143',
  '#A61647',
  '#F7FC32',
  '#E6F4FF',
  'D9D9D9',
];
