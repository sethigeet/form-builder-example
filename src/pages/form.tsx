import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import { Header } from "~/components";
import { FormModeOptions } from "~/lib";

const Form: NextPage = () => {
  const [currentMode, setCurrentMode] = useState(FormModeOptions[0].text);

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
      </div>
    </>
  );
};

export default Form;
