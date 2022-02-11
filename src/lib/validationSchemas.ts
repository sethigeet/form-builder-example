import * as yup from "yup";

export const ASSET_TYPES = [
  { label: "Asset 1", value: "asset-1" },
  { label: "Asset 2", value: "asset-2" },
  { label: "Asset 3", value: "asset-3" },
];

export const ASSET_SUB_TYPES = [
  { label: "Sub Asset 1", value: "sub-asset-1" },
  { label: "Sub Asset 2", value: "sub-asset-2" },
  { label: "Sub Asset 3", value: "sub-asset-3" },
];

export const TRANSACTIONS = [
  { label: "Transaction 1", value: "transaction-1" },
  { label: "Transaction 2", value: "transaction-2" },
  { label: "Transaction 3", value: "transaction-3" },
];

export const riskDetailsSchema = yup.object().shape({
  // Asset
  assetType: yup
    .string()
    .oneOf(ASSET_TYPES.map((v) => v.value))
    .required(),
  assetSubType: yup
    .string()
    .oneOf(ASSET_SUB_TYPES.map((v) => v.value))
    .required(),

  // Security
  securityCode: yup.string().required().min(4),
  securityName: yup.string().required().min(4),
  securityShortName: yup.string().required().min(4),
  isin: yup.string().required().min(10),
  isIPO: yup.bool().required(),

  // Value
  faceValue: yup.number().required().min(10),
  decimalsAllowed: yup.bool().required(),
  numOfDecimals: yup
    .number()
    .when("decimalsAllowed", {
      is: true,
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.equals([0]),
    })
    .min(0),

  // Transactions
  collateralTransaction: yup
    .string()
    .oneOf(TRANSACTIONS.map((v) => v.value))
    .required(),
  investmentTransaction: yup
    .string()
    .oneOf(TRANSACTIONS.map((v) => v.value))
    .required(),

  // Issuer
  issuerId: yup.string().required().min(4),
  searchIssuerName: yup.string().required().min(4),

  // Industry
  industryCode: yup.string().required().min(4),
  searchIndustryName: yup.string().required().min(4),

  // Internal Rating
  internalRating: yup.string().required().min(4),
  searchInternalRatingName: yup.string().required().min(4),

  // Others
  listed: yup.bool().required(),
  onlyDematForm: yup.bool().required(),
  cusip: yup.string().required().min(4),
  remarks: yup.string(),
});
