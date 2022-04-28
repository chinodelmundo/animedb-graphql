import Anime from './Anime';
import { CircularProgress } from '@mui/material';
import '../styles/AnimeList.css';

function AnimeList({ data, loading }) {
  return (
    <div className="anime-list">
      {loading && (
        <div className="loading-icon">
          <CircularProgress />
        </div>
      )}
      {data?.getAllAnime.map((anime) => (
        <Anime anime={anime} key={anime.id} />
      ))}
    </div>
  );
}

export default AnimeList;
