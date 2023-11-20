const APIconnection = async (url = '/', bodyContent = {}, httpMethod = 'POST') => {
  const requestOptions = {
    method: httpMethod,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  };

  if (httpMethod !== 'GET') {
    requestOptions.body = JSON.stringify(bodyContent);
  }

  const req = await fetch(
    process.env.SERVER_LINK + url,
    requestOptions
  );

  if (req.status === 200) {
    const res = await req.json();
    return res;
  } else {
    throw new Error(
      `Status diferente de 200: ${req.status}`
    );
  }
};

export { APIconnection };
