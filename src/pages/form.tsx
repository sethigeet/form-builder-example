import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

import { Header, Stepper } from "~/components";
import { FormModeOptions, FormStepLabels } from "~/lib";

const Form: NextPage = () => {
  const [currentMode, setCurrentMode] = useState(FormModeOptions[0].text);
  const [activeStep, setActiveStep] = useState(2);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setActiveStep((v) => (v += 1));
      } else if (e.key === "ArrowLeft") {
        setActiveStep((v) => (v -= 1));
      }
    };

    addEventListener("keydown", handler);

    return () => removeEventListener("keydown", handler);
  }, []);

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
            <div>Step 3</div>
            <div>Step 4</div>
            <div>Step 5</div>
          </Stepper>
        </div>
        <button onClick={() => setActiveStep((v) => (v += 1))}>+</button>
        <br />
        <br />
        <button onClick={() => setActiveStep((v) => (v -= 1))}>-</button>
      </div>
    </>
  );
};

export default Form;
