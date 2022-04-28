import { Card, Typography } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import '../styles/Character.css';

function Character({ character }) {
  return (
    <Card variant="outlined" className="character">
      <div>
        <Typography sx={{ fontSize: '0.9rem', fontWeight: 600 }}>
          {character.name}
        </Typography>
        <div className="character-info">
          {character.id && (
            <Typography sx={{ fontSize: '0.7rem' }}>
              ID: {character.id}
            </Typography>
          )}
          {character.favorites >= 0 && (
            <Typography sx={{ fontSize: '0.8rem' }}>
              <>
                <ThumbUpOutlinedIcon sx={{ height: '0.8rem' }} />
                {character.favorites}
              </>
            </Typography>
          )}
        </div>
        {character.image && (
          <img
            alt={character.name}
            src={character.image}
            className="char-image"
          />
        )}
      </div>
    </Card>
  );
}

export default Character;
