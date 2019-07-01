import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { string } from 'prop-types';

import styles from './styles';

const useStyles = makeStyles(styles);

const Dokument = ({ body }) => {
  const classes = useStyles();

  return <div className={classes.dokumentBody} dangerouslySetInnerHTML={{ __html: body }} />; // eslint-disable-line react/no-danger
};

Dokument.propTypes = {
  body: string.isRequired
};

export default Dokument;
