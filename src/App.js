import React from "react";
import { useMediaQuery } from "react-responsive";

import { useLocalStorage, useStripes } from "./hooks.js";
import { DesktopAndTabletView } from "./components/desktopAndTablet/DesktopAndTabletView.js";
import { MobileView } from "./components/mobile/MobileView.js";
import "./index.css";

const App = () => {
  const isDesktopOrTablet = useMediaQuery({
    query: "(min-device-width: 768px)",
  });
  const useStripesProps = useStripes(isDesktopOrTablet);
  const useLocalStorageProps = useLocalStorage();

  return isDesktopOrTablet ? (
    <DesktopAndTabletView
      isDesktopOrTablet={isDesktopOrTablet}
      {...useStripesProps}
      {...useLocalStorageProps}
    />
  ) : (
    <MobileView
      isDesktopOrTablet={isDesktopOrTablet}
      {...useStripesProps}
      {...useLocalStorageProps}
    />
  );
};

export default App;
