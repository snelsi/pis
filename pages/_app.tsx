import * as React from "react";
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import { Apollo } from "apollo";

import "css/colors.css";
import "css/styles.css";

const Application = ({ Component, pageProps }) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Apollo>
      <GeistProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </GeistProvider>
    </Apollo>
  );
};

export default Application;
