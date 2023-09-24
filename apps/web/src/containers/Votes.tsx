import { useRouter } from "next/router";

import {
  queryAttrToArray,
  queryAttrToNumber,
  queryAttrToString,
} from "../utils";
import ContainerList from "../components/ContainerList";
import Filter from "../components/ParlimentFilter/Filter";
import VoteList from "../components/VoteList/VoteList";

const Votes: React.FC = () => {
  const router = useRouter();
  const search = queryAttrToString(router.query.search);
  const page = queryAttrToNumber(router.query.page, 1);
  const org = queryAttrToArray(router.query.org);

  return (
    <div style={{ display: "flex" }}>
      <ContainerList maxWidth="md">
        <VoteList router={router} page={page} />
      </ContainerList>
      <Filter router={router} search={search} org={org} />
    </div>
  );
};

export default Votes;