import React, { useState, useEffect } from 'react';
/* Next-js imports */
import Head from 'next/head';
import { withRouter } from 'next/router';

// ES Modules
import parse from 'html-react-parser';
import axios from 'axios';
import LoadCircle from '../../LoadCircle';

const Dokument = ({ router }) => {
  const [body, setBody] = useState(null);

  useEffect(() => {
    const url = `https://data.riksdagen.se/dokument/${router.query.id}`;

    axios({
      method: 'get',
      url
    }).then(response => {
      const html = parse(response.data);
      let initialBody;
      for (let i = 0; i < html.length; i += 1) {
        if (html[i].type && html[i].type === 'div') {
          initialBody = html[i];
          break;
        }
      }
      setBody(initialBody);
    });
  });

  return (
    <React.Fragment>
      <Head>
        <title>Dokument {router.query.id} | Partiguiden.nu</title>
      </Head>
      {body ? (
        <div className="container dokumentBody" style={{ paddingTop: '1.5rem' }}>
          {body}
        </div>
      ) : (
        <LoadCircle />
      )}
    </React.Fragment>
  );
};

export default withRouter(Dokument);
