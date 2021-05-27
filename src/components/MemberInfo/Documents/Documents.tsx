import React, { useState, useEffect } from 'react';

import { Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import LoadCircle from '../../LoadCircle';
import Document from './Document';
import { useMemberDocuments } from '../../../hooks/parliamentHooks';

interface Props {
  id: string;
  setDocumentCount: React.Dispatch<React.SetStateAction<number>>;
}

const useStyles = makeStyles({
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    marginBottom: '2rem',
  },
});

const Documents: React.FC<Props> = ({ id, setDocumentCount }) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);

  const data = useMemberDocuments(id, page);

  useEffect(() => {
    if (data?.count) {
      setDocumentCount(data.count);
    }
  }, [data?.count, setDocumentCount]);

  const changePage = (_event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  return !data ? (
    <Grid item xs={12}>
      <LoadCircle />
    </Grid>
  ) : (
    <>
      {data.documents.map((document) => (
        <Grid item xs={12} key={document.id}>
          <Document document={document} />
        </Grid>
      ))}
      {data.pages > 1 && (
        <div className={classes.paginationContainer}>
          <Pagination size="large" onChange={changePage} page={page} count={data.pages} />
        </div>
      )}
    </>
  );
};

export default Documents;
