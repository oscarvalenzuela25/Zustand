import React, { useEffect, useState } from 'react';
import { tesloApi } from '../../../api/teslo.ap';

const RequestInfo = () => {
  const [info, setInfo] = useState<unknown>();

  useEffect(() => {
    tesloApi
      .get('/auth/private')
      .then(response => setInfo(response))
      .catch(() => setInfo('error'));
  }, []);

  return (
    <>
      <h2>Informacion</h2>
      <pre>{JSON.stringify(info, null, 2)}</pre>
    </>
  );
};

export default RequestInfo;
