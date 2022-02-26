import Link from 'next/link';

import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

import { darken, styled } from '@mui/material/styles';

import { lookupAuthority } from '../../../utils/authorityTable';
import { MemberDocument } from '../../../types/member';

import * as ROUTES from '../../../lib/routes';

const CustomCardHeader = styled(CardHeader)<{ color: string }>`
  width: 100%;
  text-align: left;
  padding: 0.25rem 1rem;
  background-color: ${({ theme, color }) =>
    theme.palette.mode === 'dark' ? darken(color, 0.6) : color};
  .title {
    font-size: 1.15rem;
    color: #ffffff;
  }
`;

/* const useStyles = makeStyles({
  headerTitle: {
    fontSize: '1.15rem',
    color: '#ffffff',
  },
  headerRoot: {
    width: '100%',
    textAlign: 'left',
    padding: '0.25rem 1rem',
  },
}); */

interface Props {
  document: MemberDocument;
}
const Document: React.FC<Props> = ({ document }) => {
  const authority = !!document.authority && lookupAuthority(document.authority);
  return (
    <Card>
      <Link href={ROUTES.DOCUMENT} as={ROUTES.getDocumentHref(document.id)} passHref>
        <ButtonBase style={{ display: 'block' }} component="a">
          {authority && <CustomCardHeader title={authority.desc} color={authority.color} />}
          <CardContent>
            <Typography color="textSecondary" variant="body2">
              {document.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {document.altTitle}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {document.subtitle}
            </Typography>
          </CardContent>
        </ButtonBase>
      </Link>
    </Card>
  );
};

export default Document;
