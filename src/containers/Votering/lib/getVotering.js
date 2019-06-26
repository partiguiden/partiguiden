import stripJsonComments from 'strip-json-comments';
import fetch from 'isomorphic-unfetch';

import { getVotes } from '../../../utils/votingHelpers';

const getMatches = (forslag, referens) => {
  let newForslag = forslag.replace(/(<br>)|<BR(\/)>/gm, '');
  const re = /\b([0-9][0-9][0-9][0-9]\/[0-9][0-9]):(\S+).*/gm;
  const matches = [];
  let match;

  do {
    match = re.exec(newForslag);
    if (match) matches.push(match);
  } while (match);

  for (let i = 0; i < matches.length; i += 1) {
    newForslag = newForslag.replace(matches[i][0], `[${i}]`);
  }
  for (let i = 0; i < matches.length; i += 1) {
    for (let j = 0; j < referens.length; j += 1) {
      if (matches[i][1] === referens[j].ref_dok_rm && matches[i][2] === referens[j].ref_dok_bet) {
        // eslint-disable-next-line prefer-destructuring
        matches[i][3] = referens[j].ref_dok_id;
      }
    }
  }

  return { matches, newForslag };
};

const getVotering = ({ bet, url }) =>
  fetch(url)
    .then(res => res.text())
    .then(json => {
      const result = JSON.parse(stripJsonComments(json));
      const { dokumentstatus } = result;
      const { utskottsforslag } = dokumentstatus.dokutskottsforslag;
      const currUtskottsforslag = Array.isArray(utskottsforslag)
        ? utskottsforslag[bet - 1]
        : utskottsforslag;

      const { matches, newForslag } = getMatches(
        currUtskottsforslag.forslag,
        dokumentstatus.dokreferens.referens
      );

      const { uppgift } = dokumentstatus.dokuppgift;

      const beslut = uppgift.find(el => {
        return el.kod === 'rdbeslut';
      });

      const notisBeskrivning = uppgift.find(el => {
        return el.kod === 'notis';
      });

      const notisRubrik = uppgift.find(el => {
        return el.kod === 'notisrubrik';
      });

      const { table } = currUtskottsforslag.votering_sammanfattning_html;
      const tableRow = Array.isArray(table) ? table[table.length - 1].tr : table.tr;
      return {
        forslag: newForslag,
        behandladeDokument: matches,
        dokument: dokumentstatus.dokument,
        bilaga: dokumentstatus.dokbilaga ? dokumentstatus.dokbilaga.bilaga : null,
        beslut: beslut ? beslut.text : '',
        voting: getVotes(tableRow),
        notisRubrik: notisRubrik.text,
        notisBeskrivning: notisBeskrivning.text
      };
    });

export default getVotering;
