import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Card
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NewCharForm from './NewCharForm';
import SearchForm from './SearchForm';
import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import '../styles/Forms.css';

const Forms = ({
  onSearch,
  animeFields,
  onSetAnimeFields,
  characterFields,
  onSetCharacterFields
}) => {
  const [expanded, setExpanded] = useState('panel2');
  const GET_ANIME_ID = gql`
    query GetAllAnime {
      getAllAnime {
        id
        title
      }
    }
  `;

  const { data } = useQuery(GET_ANIME_ID);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Card className="forms">
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
        >
          <Typography>Add new Characters</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ borderTop: '0.2rem #979696 solid' }}>
          <NewCharForm anime={data?.getAllAnime} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
        >
          <Typography>Search Data</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ borderTop: '0.2rem #979696 solid' }}>
          <SearchForm
            onSearch={onSearch}
            animeFields={animeFields}
            onSetAnimeFields={onSetAnimeFields}
            characterFields={characterFields}
            onSetCharacterFields={onSetCharacterFields}
          />
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default Forms;
