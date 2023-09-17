import type { NextRouter } from "next/router";
import { stringify } from "querystring";
import React, { useCallback } from "react";

import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

import { FlowAd } from "../Ad";
import LoadCircle from "../LoadCircle";
import Vote from "./Vote";

import { useVotes } from "../../hooks/parliamentHooks";

interface Props {
  router: NextRouter;
  page: number;
}

const VoteList: React.FC<Props> = ({ router, page }) => {
  const data = useVotes(router.query);
  const updatePage = useCallback(
    (_event: React.ChangeEvent<unknown>, newPage: number) => {
      const query = { ...router.query, page: newPage };

      router.push(`${router.route}?${stringify(query)}`);
    },
    [router],
  );

  return (
    <>
      {!data ? (
        <LoadCircle />
      ) : data.votes.length > 0 ? (
        <>
          {data.votes.map((vote, index) => (
            <React.Fragment key={`${vote.documentId}:${vote.proposition}`}>
              {!(index % 15) && <FlowAd />}
              <Vote vote={vote} />
            </React.Fragment>
          ))}
          {data.pages > 1 && (
            <Pagination
              sx={{ display: "flex", justifyContent: "center" }}
              onChange={updatePage}
              page={page}
              count={data.pages}
            />
          )}
        </>
      ) : (
        <Typography>Inga voteringar hittades</Typography>
      )}
    </>
  );
};

export default VoteList;
