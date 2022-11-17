import React, { FC, Fragment, memo } from "react";
import Frame from "../Components/Common/Frame";

type Props = {
    children: JSX.Element,
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <Fragment>
      {children}
    </Fragment>
  );
};

export default Layout;
