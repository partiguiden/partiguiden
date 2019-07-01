import React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import styles from './styles';

const useStyles = makeStyles(styles);

const Member = ({ member, show }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} style={show ? null : { display: 'none' }}>
      <Link href={`/ledamot?id=${member.id}`} as={`/ledamot/${member.id}`}>
        <Paper elevation={2} classes={{ root: classes.memberCard }}>
          <div>
            <Typography gutterBottom color="primary" variant="body1">
              {member.status}
            </Typography>

            <Typography color="primary" variant="subtitle2">
              Valkrets
            </Typography>
            <Typography gutterBottom color="primary" variant="body2">
              {member.valkrets}
            </Typography>

            <Typography color="primary" variant="subtitle2">
              Ålder
            </Typography>
            <Typography color="primary" variant="body2">
              {member.alder}
            </Typography>
          </div>
          <div
            alt="Bild på ledamot"
            style={{ background: `url(${member.bild_url}) 50% 25% no-repeat` }}
            className={classes.memberImage}
          >
            {member.parti !== '-' && (
              <img
                className={classes.partySymbol}
                src={`../../static/images/party-logos/${member.parti.toUpperCase()}.svg`}
                alt="Partisymbol"
              />
            )}
          </div>
          <div className={classes.textContainer}>
            <span className={classes.name}>{member.namn}</span>
          </div>
        </Paper>
      </Link>
    </Grid>
  );
};
Member.propTypes = {
  member: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired
};

export default Member;
