import { Card, Typography } from '@mui/material';
import Character from './Character';
import '../styles/CharactersList.css';

function CharactersList({ characters }) {
  return (
    <Card className="characters-list">
      <div className="characters-header">
        <Typography sx={{ fontWeight: 800 }}>Characters</Typography>
      </div>
      <div className="characters">
        {characters?.map((character, index) => (
          <Character character={character} key={index} />
        ))}
      </div>
    </Card>
  );
}

export default CharactersList;
