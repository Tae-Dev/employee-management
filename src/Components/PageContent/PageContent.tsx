import React from 'react';
import { Panel } from 'rsuite';

const PageContent = (props: any) => {
  return (
    <>
      <Panel style={{ background: '#fff' }} {...props} />
    </>
  );
};

export default PageContent;