import React from 'react';
import Router from 'next/router';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core/';
import { object } from 'prop-types';

import getOrganInfo from '../../../../utils/authorityTable';

const useStyles = makeStyles({
  headerTitle: {
    fontSize: '1.15rem',
    color: '#ffffff'
  },
  headerRoot: {
    width: '100%',
    textAlign: 'left',
    padding: '0.25rem 1rem'
  }
});

const Documents = ({ document }) => {
  const classes = useStyles();
  const organ = getOrganInfo(document.organ);
  return (
    <Card
      style={{ cursor: 'pointer' }}
      onClick={() => Router.push(`/dokument?id=${document.id}`, `/dokument/${document.id}`)}
    >
      {organ && (
        <CardHeader
          title={organ.desc}
          style={{ background: organ.color }}
          classes={{
            title: classes.headerTitle,
            root: classes.headerRoot
          }}
        />
      )}
      <CardContent>
        <Typography style={{ fontSize: '0.75rem' }} color="textSecondary" gutterBottom>
          {document.dokumentnamn}
        </Typography>
        <Typography color="primary">{document.notisrubrik}</Typography>
        <Typography style={{ fontSize: '0.85rem' }} color="textSecondary">
          {document.undertitel}
        </Typography>
      </CardContent>
    </Card>
  );
};

Documents.propTypes = {
  document: object.isRequired
};

export default Documents;
