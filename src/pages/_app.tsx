import "../styles/globals.css";
import type { AppProps } from "next/app";

import { Footer, Navbar } from "~/components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navbar />
      <div className="mt-3 mb-[70px]">
        <Component {...pageProps} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 -mt-[60px]">
        <Footer />
      </div>
    </div>
  );
}

export default MyApp;
