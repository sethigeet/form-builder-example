import { FC, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";

import { Formik, Form as FormikForm } from "formik";

import { Header, Input, Select, Stepper, Switch } from "~/components";
import {
  ASSET_SUB_TYPES,
  ASSET_TYPES,
  FormModeOptions,
  FormStepLabels,
  riskDetailsSchema,
  TRANSACTIONS,
} from "~/lib";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

const Form: NextPage = () => {
  const [currentMode, setCurrentMode] = useState(FormModeOptions[0].text);
  const [activeStep, setActiveStep] = useState(2);

  return (
    <>
      <Head>
        <title>Security Master - CMFS</title>
      </Head>
      <div>
        <Header
          heading="Security Master"
          currentMode={currentMode}
          setCurrentMode={setCurrentMode}
          modeOptions={FormModeOptions}
        />
        <div className="mt-4">
          <Stepper activeStep={activeStep} labels={FormStepLabels}>
            <div>Step 1</div>
            <div>Step 2</div>
            <Step3 />
            <div>Step 4</div>
            <div>Step 5</div>
          </Stepper>
        </div>
      </div>
    </>
  );
};

export default Form;

const Step3: FC = () => {
  return (
    <div className="mt-16 grid place-items-center">
      <div className="max-w-6xl rounded-2xl bg-gray-100 p-10">
        <Formik
          initialValues={{
            // Asset
            assetType: "",
            assetSubType: "",

            // Security
            securityCode: "",
            securityName: "",
            securityShortName: "",
            isin: "",
            isIPO: false,

            // Value
            faceValue: 0,
            decimalsAllowed: false,
            numOfDecimals: 0,

            // Transactions
            collateralTransaction: "",
            investmentTransaction: "",

            // Issuer
            issuerId: "",
            searchIssuerName: "",

            // Industry
            industryCode: "",
            searchIndustryName: "",

            // Internal Rating
            internalRating: "",
            searchInternal_ratingName: "",

            // Others
            listed: false,
            onlyDematForm: false,
            cusip: "",
            remarks: "",
          }}
          onSubmit={(vals) => console.log(vals)}
          validationSchema={riskDetailsSchema}
        >
          {({ values, errors }) => (
            <FormikForm className="grid grid-cols-2 gap-10">
              {/* Left Column */}
              <div>
                {/* Asset section */}
                <h2 className="text-2xl font-medium">Asset</h2>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <Select
                    name="assetType"
                    label="Asset Type"
                    placeholder="Select asset type"
                    options={ASSET_TYPES}
                    className="w-56"
                  />
                  <Select
                    name="assetSubType"
                    label="Asset Sub Type"
                    placeholder="Select asset sub type"
                    options={ASSET_SUB_TYPES}
                    className="w-56"
                  />
                </div>

                {/* Security section */}
                <h2 className="text-2xl font-medium">Security</h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-2">
                  <Input
                    name="securityCode"
                    label="Security Code"
                    placeholder="Enter security code"
                    className="w-56"
                  />
                  <Input
                    name="securityName"
                    label="Security Name"
                    placeholder="Enter security name"
                    className="w-56"
                  />
                  <Input name="isin" label="ISIN" placeholder="Enter isin" className="w-56" />
                  <Input
                    name="securityShortName"
                    label="Security Short Name"
                    placeholder="Enter security short name"
                    className="w-56"
                  />
                  <Switch
                    name="isIPO"
                    label="Is IPO?"
                    className="col-span-2 grid w-full place-items-center"
                  />
                </div>

                {/* Value section */}
                <h2 className="text-2xl font-medium">Value</h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-2">
                  <Input
                    name="faceValue"
                    type="number"
                    label="Face Value"
                    placeholder="Enter face value"
                    className="col-span-2 w-56"
                  />
                  <Switch name="decimalsAllowed" label="Decimals Allowed?" />
                  <Input
                    name="numOfDecimals"
                    label="Number of decimals"
                    type="number"
                    disabled={!values.decimalsAllowed}
                    className="w-48"
                  />
                </div>
              </div>

              <div>
                {/* Transactions section */}
                <h2 className="text-2xl font-medium">Transactions</h2>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <Select
                    name="collateralTransaction"
                    label="Collateral Transaction"
                    placeholder="Select a transation"
                    options={TRANSACTIONS}
                    className="w-56"
                  />
                  <Select
                    name="investmentTransaction"
                    label="Investment Transaction"
                    placeholder="Select a transation"
                    options={TRANSACTIONS}
                    className="w-56"
                  />
                </div>

                {/* Issuer section */}
                <h2 className="text-2xl font-medium">Issuer</h2>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <Input
                    name="issuerId"
                    label="Issuer ID"
                    placeholder="Enter issuer ID"
                    className="w-56"
                  />
                  <Input
                    name="searchIssuerName"
                    label="Search Issuer by name"
                    placeholder="Enter issuer name"
                    className="w-56"
                  />
                </div>

                {/* Industry section */}
                <h2 className="text-2xl font-medium">Industry</h2>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <Input
                    name="industryCode"
                    label="Industry Code"
                    placeholder="Enter industry code"
                    className="w-56"
                  />
                  <Input
                    name="searchIndustryName"
                    label="Search industry by name"
                    placeholder="Enter industry name"
                    className="w-56"
                  />
                </div>

                {/* Internal Rating section */}
                <h2 className="text-2xl font-medium">Internal Rating</h2>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <Input
                    name="internalRating"
                    label="Internal Rating"
                    placeholder="Enter internal rating"
                    className="w-56"
                  />
                  <Input
                    name="searchInternalRatingName"
                    label="Search rating by name"
                    placeholder="Enter rating name"
                    className="w-56"
                  />
                </div>

                {/* Internal Rating section */}
                <h2 className="text-2xl font-medium">Internal Rating</h2>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <Input
                    name="internalRating"
                    label="Internal Rating"
                    placeholder="Enter internal rating"
                    className="w-56"
                  />
                  <Input
                    name="searchInternalRatingName"
                    label="Search rating by name"
                    placeholder="Enter rating name"
                    className="w-56"
                  />
                </div>
              </div>

              <div className="col-span-2 mx-auto max-w-max">
                {/* Others section */}
                <h2 className="text-2xl font-medium">Others</h2>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <Switch name="listed" label="Listed" />
                  <Switch name="onlyDematForm" label="Pledge only allowed in Demat form?" />
                  <Input name="cusip" label="CUSIP" placeholder="Enter CUSIP" className="w-56" />
                  <Input
                    name="remarks"
                    label="Remarks"
                    placeholder="Enter remarks"
                    className="w-56"
                  />
                </div>
              </div>

              <div className="col-span-2 mt-4 flex">
                <button
                  type="submit"
                  className="mr-auto flex items-center justify-center rounded-lg bg-gray-300 p-3 text-lg font-bold text-slate-800"
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                  Back
                </button>

                <button
                  type="submit"
                  className="ml-auto flex items-center justify-center rounded-lg bg-blue-900 p-3 text-lg font-bold text-white"
                >
                  Next
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </div>
    </div>
  );
};
