import { useState } from 'react';
import Forms from './components/Forms';
import AnimeList from './components/AnimeList';
import Header from './components/Header';
import './App.css';
import { useLazyQuery, gql } from '@apollo/client';

const App = () => {
  const [animeFields, setAnimeFields] = useState([
    'id',
    'title',
    'year',
    'image'
  ]);
  const [characterFields, setCharacterFields] = useState([
    'id',
    'name',
    'favorites',
    'image'
  ]);
  const GET_ANIME = gql`
    query {
      getAllAnime {
        ${animeFields.join('\n')}
        ${characterFields.length > 0 ? 'characters {' : ''}
        ${characterFields.join('\n')}
        ${characterFields.length > 0 ? '}' : ''}
      }
    }
  `;
  const [loadAnime, { error, data, loading }] = useLazyQuery(GET_ANIME);

  return (
    <div className="app">
      <Header />
      {error && <div>Error: {error}</div>}
      <div className="main">
        <Forms
          onSearch={loadAnime}
          animeFields={animeFields}
          onSetAnimeFields={setAnimeFields}
          characterFields={characterFields}
          onSetCharacterFields={setCharacterFields}
        />
        <AnimeList data={data} loading={loading} />
      </div>
    </div>
  );
};

export default App;
