import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import { Grid } from '@material-ui/core';

import { apiLinks } from '../../../../utils';
import Member from '../Member';
import LoadCircle from '../../../../components/LoadCircle';
import { useFilter } from '../../../../components/Filter';
import styles from './styles';

const useStyles = makeStyles(styles);

const MemberList = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const { parties, search } = useFilter()[0];

  const updateMembers = () => {
    const url = `${apiLinks.partiguidenApi}/members`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setMembers(data);
        setLoading(false);
      });
  };

  const updateRoute = () => {
    const partyString = parties.length > 0 && `party=${parties.join('&party=')}`;
    const searchString = search && `sok=${search}`;

    let href = '';
    if (searchString || partyString) {
      href += '?';
      if (searchString) {
        href += searchString;
        if (partyString) href += '&';
      }
      if (partyString) href += partyString;
    }

    Router.push(`/ledamoter${href}`);
  };

  useEffect(updateRoute, [parties, search]);
  useEffect(updateMembers, []);

  return loading ? (
    <LoadCircle />
  ) : (
    members.map(member => {
      const inParty = parties.length ? parties.includes(member.party) : true;
      const inSearch = member.name.toLowerCase().includes(search.toLowerCase());
      return (
        <Grid
          item
          xs={12}
          md={6}
          xl={4}
          key={member.id}
          style={inParty && inSearch ? null : { display: 'none' }}
        >
          <Member classes={classes} member={member} />
        </Grid>
      );
    })
  );
};

export default MemberList;
