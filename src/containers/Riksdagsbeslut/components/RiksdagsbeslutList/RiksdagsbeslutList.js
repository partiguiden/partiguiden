import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import ButtonBase from '@material-ui/core/ButtonBase';

import ApiContext from '../../../../lib/ApiContext';
import Ad from '../../../../components/Ad';
import Riksdagsbeslut from '../Riksdagsbeslut/Riksdagsbeslut';
import LoadCircle from '../../../../components/LoadCircle';
import { getRiksdagsBeslutList } from '../../lib';
import { useStateValue } from '../../../../lib/stateProvider';

import styles from './styles';

const useStyles = makeStyles(styles);

const RiksdagsList = () => {
  const { riksdagenApi } = useContext(ApiContext);
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [beslut, setBeslut] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastPage, setLastPage] = useState(true);
  const { filter } = useStateValue()[0];

  const url = () => {
    const { search } = filter;
    const org = filter.org.join('&org=');
    return `${riksdagenApi}/dokumentlista/?sok=${search}&doktyp=bet&org=${org}&dokstat=beslutade&sort=${
      search ? 'rel' : 'datum'
    }&sortorder=desc&utformat=json&p=${page}`;
  };

  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    getRiksdagsBeslutList({ url: url(), page }).then(res => {
      if (isMounted) {
        setLastPage(res.lastPage);
        if (res.beslut) setBeslut(beslut.concat(...res.beslut));
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [page]);

  useEffect(() => {
    setBeslut([]);
    // eslint-disable-next-line no-new-wrappers
    setPage(new Number(1));
  }, [filter]);

  return (
    <React.Fragment>
      <div className={classes.listContainer}>
        {beslut &&
          beslut.map((beslutObject, index) => (
            <React.Fragment key={beslutObject.dok_id}>
              {!(index % 15) && <Ad />}
              <div>
                <Riksdagsbeslut beslut={beslutObject} />
              </div>
            </React.Fragment>
          ))}
      </div>
      {loading ? (
        <LoadCircle />
      ) : (
        !lastPage && (
          <div className={classes.buttonContainer}>
            <ButtonBase
              className={classes.loadMore}
              onClick={() => {
                setLastPage(true);
                setPage(curr => curr + 1);
              }}
            >
              Ladda mer
            </ButtonBase>
          </div>
        )
      )}
    </React.Fragment>
  );
};

export default RiksdagsList;
