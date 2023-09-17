import React, { useEffect, useState } from "react";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { styled } from "@mui/material/styles";

import { useMemberDocuments } from "../../../hooks/parliamentHooks";
import Document from "./Document";
import LoadCircle from "../../LoadCircle";

const PaginationContainer = styled("div")`
  display: flex;
  justify-content: center;
  flex: 1;
  margin-bottom: 2rem;
`;

interface Props {
  id: string;
  setDocumentCount: React.Dispatch<React.SetStateAction<number>>;
}

const Documents: React.FC<Props> = ({ id, setDocumentCount }) => {
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

  return (
    <Stack spacing={3}>
      {!data ? (
        <div style={{ alignItems: "center" }}>
          <LoadCircle />
        </div>
      ) : (
        <>
          {data.documents.map((document) => (
            <Document document={document} key={document.id} />
          ))}
          {data.pages > 1 && (
            <PaginationContainer>
              <Pagination
                onChange={changePage}
                page={page}
                count={data.pages}
              />
            </PaginationContainer>
          )}
        </>
      )}
    </Stack>
  );
};

export default Documents;
