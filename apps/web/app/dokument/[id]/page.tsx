import Container from "@components/common/container";
import PageTitle from "@components/common/page-title";
import SocialMediaShare from "@components/common/social-media-share";
import getDocumentHtml from "@lib/api/documents/get-document-html";
import { getDocumentJson } from "@lib/api/documents/get-document-json";

import "./parliament-document.css";

interface Props {
  params: {
    id: string;
  };
}

export default async function Document({ params: { id } }: Props) {
  const [html, data] = await Promise.all([
    getDocumentHtml(id),
    getDocumentJson(id),
  ]);

  return (
    <main>
      <PageTitle>
        {data.id}: {data.title}
      </PageTitle>
      <Container>
        <SocialMediaShare title={`${data.id}: ${data.title}`} />
        <div dangerouslySetInnerHTML={{ __html: html }} id="document-content" />
      </Container>
    </main>
  );
}

export const runtime = "edge";

export async function generateMetadata({ params: { id } }: Props) {
  const data = await getDocumentJson(id);
  return {
    title: `${data.id}: ${data.title} | Dokument | Partiguiden`,
  };
}
