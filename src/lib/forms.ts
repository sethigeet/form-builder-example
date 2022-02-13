import * as yup from "yup";

import { FormFieldOptions } from "~/mock";
import { Form } from "./formBuilder";

export const SecurityMasterForms: Form[] = [
  {
    title: "Primary Details",
    groups: [
      {
        label: "Personal Info",
        items: [
          {
            name: "firstName",
            label: "First Name",
            type: "input",
            props: { placeholder: "Enter your first name" },
            validation: yup.string().required().min(4),
          },
        ],
      },
    ],
  },
  {
    title: "Listing Details",
    groups: [
      {
        label: "Personal Info",
        items: [
          {
            name: "firstName",
            label: "First Name",
            type: "input",
            props: { placeholder: "Enter your first name" },
            validation: yup.string().required().min(4),
          },
        ],
      },
    ],
  },
  {
    title: "Risk Details",
    groups: [
      {
        label: "Asset",
        items: [
          {
            name: "assetType",
            label: "Asset Type",
            type: "select",
            options: FormFieldOptions.assetTypes,
            validation: yup
              .string()
              .oneOf(FormFieldOptions.assetTypes.map((v) => v.value))
              .required(),
          },
          {
            name: "assetSubType",
            label: "Asset Sub Type",
            type: "select",
            options: FormFieldOptions.assetSubTypes,
            validation: yup
              .string()
              .oneOf(FormFieldOptions.assetSubTypes.map((v) => v.value))
              .required(),
          },
        ],
      },
      {
        label: "Transactions",
        items: [
          {
            name: "collateralTransaction",
            label: "Collateral Transaction",
            type: "select",
            options: FormFieldOptions.transactions,
            validation: yup
              .string()
              .oneOf(FormFieldOptions.transactions.map((v) => v.value))
              .required(),
          },
          {
            name: "investmentTransaction",
            label: "Investment Transaction",
            type: "select",
            options: FormFieldOptions.transactions,
            validation: yup
              .string()
              .oneOf(FormFieldOptions.transactions.map((v) => v.value))
              .required(),
          },
        ],
      },
      {
        label: "Security",
        items: [
          {
            name: "securityCode",
            label: "Security Code",
            defaultValue: "default security code from server",
            type: "input",
            props: { placeholder: "Enter security code" },
            validation: yup.string().required().min(4),
          },
          {
            name: "securityName",
            label: "Security Name",
            type: "input",
            props: { placeholder: "Enter security name" },
            validation: yup.string().required().min(4),
          },
          {
            name: "securityShortName",
            label: "Security Short Name",
            type: "input",
            props: { placeholder: "Enter security short name" },
            validation: yup.string().required().min(4),
          },
          {
            name: "isin",
            label: "ISIN",
            type: "input",
            props: { placeholder: "Enter ISIN" },
            validation: yup.string().required().min(10),
          },
          {
            name: "isIPO",
            label: "Is IPO?",
            defaultValue: false,
            type: "switch",
            validation: yup.bool().required(),
          },
        ],
      },
      {
        label: "Value",
        items: [
          {
            name: "faceValue",
            label: "Face Value",
            type: "input",
            props: {
              type: "number",
              placeholder: "Enter face value",
              className: "col-span-2",
            },
            validation: yup.number().required().min(10),
          },
          {
            name: "decimalsAllowed",
            label: "Decimals Allowed?",
            defaultValue: false,
            type: "switch",
            validation: yup.bool().required(),
          },
          {
            name: "numOfDecimals",
            label: "Number of decimals",
            type: "input",
            props: {
              type: "number",
              className: "w-48",
            },
            validation: yup
              .number()
              .when("decimalsAllowed", {
                is: true,
                then: (schema) => schema.required(),
                otherwise: (schema) => schema.equals([0]),
              })
              .min(0),
          },
        ],
      },
      {
        label: "Issuer",
        items: [
          {
            name: "issuerId",
            label: "Issuer ID",
            type: "input",
            props: { placeholder: "Enter issuer ID" },
            validation: yup.string().required().min(4),
          },
          {
            name: "searchIssuerName",
            label: "Search Issuer by name",
            type: "input",
            props: { placeholder: "Enter issuer name" },
            validation: yup.string().required().min(4),
          },
        ],
      },
      {
        label: "Industry",
        items: [
          {
            name: "industryCode",
            label: "Industry Code",
            type: "input",
            props: { placeholder: "Enter industry code" },
            validation: yup.string().required().min(4),
          },
          {
            name: "searchIndustryName",
            label: "Search industry by name",
            type: "input",
            props: { placeholder: "Enter industry name" },
            validation: yup.string().required().min(4),
          },
        ],
      },
      {
        label: "Internal Rating",
        items: [
          {
            name: "internalRating",
            label: "Internal Rating",
            type: "input",
            props: { placeholder: "Enter internal rating" },
            validation: yup.string().required().min(4),
          },
          {
            name: "searchInternalRatingName",
            label: "Search rating by name",
            type: "input",
            props: { placeholder: "Enter rating name" },
            validation: yup.string().required().min(4),
          },
        ],
      },
      {
        label: "Internal Rating",
        items: [
          {
            name: "internalRating",
            label: "Internal Rating",
            type: "input",
            props: { placeholder: "Enter internal rating" },
            validation: yup.string().required().min(4),
          },
          {
            name: "searchInternalRatingName",
            label: "Search rating by name",
            type: "input",
            props: { placeholder: "Enter rating name" },
            validation: yup.string().required().min(4),
          },
        ],
      },
      {
        label: "Others",
        items: [
          {
            name: "listed",
            label: "Listed?",
            defaultValue: false,
            type: "switch",
            validation: yup.bool().required(),
          },
          {
            name: "onlyDematForm",
            label: "Pledge only allowed in Demat form?",
            defaultValue: false,
            type: "switch",
            validation: yup.bool().required(),
          },
          {
            name: "cusip",
            label: "CUSIP",
            type: "input",
            props: { placeholder: "Enter CUSIP" },
            validation: yup.string().required().min(4),
          },
          {
            name: "remarks",
            label: "Remarks",
            type: "input",
            props: { placeholder: "Enter remarks" },
            validation: yup.string(),
          },
        ],
      },
    ],
  },
  {
    title: "Rating Details",
    groups: [
      {
        label: "Personal Info",
        items: [
          {
            name: "firstName",
            label: "First Name",
            type: "input",
            props: { placeholder: "Enter your first name" },
            validation: yup.string().required().min(4),
          },
        ],
      },
    ],
  },
  {
    title: "Other Details",
    groups: [
      {
        label: "Personal Info",
        items: [
          {
            name: "firstName",
            label: "First Name",
            type: "input",
            props: { placeholder: "Enter your first name" },
            validation: yup.string().required().min(4),
          },
        ],
      },
    ],
  },
];
