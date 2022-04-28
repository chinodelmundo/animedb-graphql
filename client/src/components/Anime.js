import { Card, Typography } from '@mui/material';
import CharactersList from './CharactersList';
import '../styles/Anime.css';

function Anime({ anime }) {
  return (
    <Card variant="outlined" className="anime-card">
      <div>
        <Typography sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
          {anime.title}
        </Typography>
        {anime.image && (
          <img alt={anime.title} src={anime.image} className="anime-image" />
        )}
        <div className="anime-info">
          {anime.year && (
            <Typography sx={{ fontSize: '0.8rem' }}>
              Year: {anime.year}
            </Typography>
          )}
          {anime.id && (
            <Typography sx={{ fontSize: '0.8rem' }}>ID: {anime.id}</Typography>
          )}
        </div>
      </div>
      <CharactersList characters={anime.characters} />
    </Card>
  );
}

export default Anime;
