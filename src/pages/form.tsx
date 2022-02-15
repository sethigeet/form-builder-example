import { Fragment, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";

import { Header, Stepper } from "~/components";
import { FormBuilder, SecurityMasterForms } from "~/lib";
import { FormModeOptions } from "~/mock";

const Form: NextPage = () => {
  const [currentMode, setCurrentMode] = useState(FormModeOptions[0].text);
  const [activeStep, setActiveStep] = useState(2);

  const next = () => setActiveStep((step) => step + 1);
  const back = () => setActiveStep((step) => step - 1);

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
          <Stepper activeStep={activeStep} labels={SecurityMasterForms.map((form) => form.title)}>
            {SecurityMasterForms.map((form, i) => {
              const BuiltForm = new FormBuilder(form);
              return <Fragment key={i}>{BuiltForm.render(next, back)}</Fragment>;
            })}
          </Stepper>
        </div>
      </div>
    </>
  );
};

export default Form;
