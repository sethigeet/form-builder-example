import * as yup from "yup";
import { FormFieldOptions } from "~/mock";

export const riskDetailsSchema = yup.object().shape({
  // Asset
  assetType: yup
    .string()
    .oneOf(FormFieldOptions.assetTypes.map((v) => v.value))
    .required(),
  assetSubType: yup
    .string()
    .oneOf(FormFieldOptions.assetSubTypes.map((v) => v.value))
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
    .oneOf(FormFieldOptions.transactions.map((v) => v.value))
    .required(),
  investmentTransaction: yup
    .string()
    .oneOf(FormFieldOptions.transactions.map((v) => v.value))
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
