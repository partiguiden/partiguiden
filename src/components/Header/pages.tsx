import React from 'react';
import {
  Home,
  Note,
  Group,
  GavelRounded,
  HowToVoteRounded,
  InfoRounded,
  Person,
  Poll,
} from '@material-ui/icons';
import Image from 'next/image';
import parties from '../../utils/getParties';
import * as ROUTES from '../../lib/routes';

const partyFactory = (partyAbbrev: string) =>
  function PartyIcon() {
    return (
      <Image
        src={`/static/images/party-logos/${partyAbbrev.toUpperCase()}.png`}
        layout="fixed"
        width="30%"
        height="30%"
        quality="50%"
      />
    );
  };

export default [
  { href: ROUTES.INDEX, title: 'Hem', Icon: Home },
  {
    href: ROUTES.STANDPOINTS,
    title: 'Partiernas Ståndpunkter',
    Icon: Note,
    associated: [ROUTES.STANDPOINT],
  },
  {
    href: ROUTES.PARTY,
    title: 'Partierna',
    subPages: parties.map((party) => ({
      title: party.name,
      id: party.letter.toLocaleLowerCase(),
      Icon: partyFactory(party.letter.toUpperCase()),
    })),
    Icon: Group,
  },
  { href: ROUTES.DECISIONS, title: 'Riksdagsbeslut', Icon: GavelRounded },
  { href: ROUTES.VOTES, title: 'Voteringar', Icon: HowToVoteRounded, associated: [ROUTES.VOTE] },
  { href: ROUTES.MEMBERS, title: 'Ledamöter', Icon: Person, associated: [ROUTES.MEMBER] },
  {
    href: ROUTES.POLLS,
    title: 'Opinionsundersökningar',
    Icon: Poll,
    associated: [],
  },
  { href: ROUTES.ABOUT_US, title: 'Om oss', Icon: InfoRounded },
];
