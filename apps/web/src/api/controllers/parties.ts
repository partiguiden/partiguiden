import type { PartyAbbreviation } from "../../utils/parties";
import { partyNameMap } from "../../utils/parties";
import type { PartyData } from "../../types/party";
import { getWikipediaAbstract, getWikipediaInfoBox } from "./wikipedia";

export const getParty = (
  party: Lowercase<PartyAbbreviation>,
): Promise<Omit<PartyData, "abbrev">> => {
  return Promise.all([
    getWikipediaAbstract(party),
    getWikipediaInfoBox(party),
  ]).then(([abstract, infoBox]) => {
    return {
      abstract,
      ...infoBox,

      name: partyNameMap[party],
    };
  });
};

export const partyController = (
  party: Lowercase<PartyAbbreviation>,
): Promise<Omit<PartyData, "abbrev">> => {
  return getParty(party);
};
