import NextLink from 'next/link';

import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

import * as ROUTES from '../../lib/routes';

import { Leader as LeaderType } from '../../types/member';
import { PartyData } from '../../types/party';

const LeaderAvatar = styled(Avatar)(
  ({ theme }) => `
    margin-bottom: ${theme.spacing(1)};
    margin-right: auto;
    margin-left: auto;
    width: ${theme.spacing(20)};
    height: ${theme.spacing(20)};

    ${theme.breakpoints.down('md')} {
      width: ${theme.spacing(15)};
      height: ${theme.spacing(15)};
    }

    ${theme.breakpoints.down('xs')} {
      width: ${theme.spacing(10)};
      height: ${theme.spacing(10)};
    }
`
);

const LeaderCard = styled(Paper)(
  ({ theme }) => `
    height: 100%;
    padding: 1rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    :hover {
      background-color:
        ${theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200]};
      box-shadow: ${theme.shadows[10]};
    }
`
);

const stringToColor = (string: string): string => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }

  return color;
};

const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
      fontSize: '2rem',
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
};

const Leader: React.FC<LeaderType> = ({ id, role, firstName, lastName, pictureUrl }) => {
  return (
    <Grid item md={3} sm={4} xs={6}>
      <NextLink passHref href={ROUTES.MEMBER} as={ROUTES.getMemberHref(id)}>
        <a style={{ textDecoration: 'none' }}>
          <LeaderCard elevation={0}>
            <LeaderAvatar
              {...stringAvatar(`${firstName} ${lastName}`)}
              src={pictureUrl}
              alt={`${firstName} ${lastName}`}
            />
            <div>
              <Typography variant="subtitle2" component="p">
                {firstName} {lastName}
              </Typography>
              <Typography>{role}</Typography>
            </div>
          </LeaderCard>
        </a>
      </NextLink>
    </Grid>
  );
};

interface Props {
  party: PartyData;
}

const Leaders: React.FC<Props> = ({ party }) => (
  <Paper sx={{ padding: '1rem', marginBottom: '1rem' }}>
    <Typography gutterBottom variant="h4" align="center">
      Ledning
    </Typography>
    <Grid container spacing={2} justifyContent="center">
      {party.leaders.map((leader) => (
        <Leader key={leader.sourceId} {...leader} />
      ))}
    </Grid>
  </Paper>
);

export default Leaders;