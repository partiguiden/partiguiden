import { PARLIAMENT_BASE_URL } from "@lib/constants";
import { parseVotes } from "./parsers/votes";
import type { DocumentList } from "../parliament/types";

interface Query {
  search?: string;
  committees: string[];
  page?: number;
}

export async function getVotes({ search, committees, page }: Query) {
  const query = new URLSearchParams({
    doktyp: "votering",
    sortorder: "desc",
    utformat: "json",
    sok: search || "",
    sort: search ? "rel" : "datum",
    p: page?.toString() || "",
  });
  for (const committe of committees) {
    query.append("org", committe);
  }

  const response = await fetch(
    `${PARLIAMENT_BASE_URL}/dokumentlista/?${query}`,
    {
      next: {
        revalidate: 60 * 60,
      },
    },
  );

  const data: DocumentList = await response.json();

  return parseVotes(data);
}