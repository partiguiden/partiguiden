import type { Leader } from "./member";
import type { Party, PartyAbbreviation } from "../utils/parties";

export interface WikipediaInfoBox {
  website?: string;
  leaders: Leader[];
  ideology: string[];
}

export interface ParliamentPartyData {
  website?: string;
  leaders: Array<Leader>;
}

export interface PartyData extends ParliamentPartyData, WikipediaInfoBox {
  name: Party;
  abbrev: PartyAbbreviation;
  abstract: string;
}