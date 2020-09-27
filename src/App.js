import React from "react";
import { useMediaQuery } from "react-responsive";

import { useLocalStorage, useStripes } from "./hooks.js";
import { DesktopAndTabletView } from "./components/DesktopAndTabletView.js";
import { MobileView } from "./components/MobileView.js";
import "./index.css";

const App = () => {
  const isDesktopOrTablet = useMediaQuery({
    query: "(min-device-width: 768px)",
  });
  const useStripesProps = useStripes();
  const useLocalStorageProps = useLocalStorage();

  return isDesktopOrTablet ? (
    <DesktopAndTabletView {...useStripesProps} {...useLocalStorageProps} />
  ) : (
    <MobileView {...useStripesProps} {...useLocalStorageProps} />
  );
};

export default App;
