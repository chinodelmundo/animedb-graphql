import { useState, useEffect } from 'react';
import { Button, TextField, Alert } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useMutation, gql } from '@apollo/client';
import '../styles/NewCharForm.css';

const NewCharForm = ({ anime }) => {
  const [newChar, setNewChar] = useState({});
  const [animeId, setAnimeId] = useState();
  const [charId, setCharId] = useState();
  const [fetchCounter, setFetchCounter] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const ADD_CHAR = gql`
    mutation AddNewCharacter($character: CharacterInput) {
      addNewCharacter(character: $character) {
        id
      }
    }
  `;
  const [addCharacter, { loading, error }] = useMutation(ADD_CHAR, {
    variables: {
      character: newChar
    }
  });

  useEffect(() => {
    const fetchFirstChar = async (animeid, charid) => {
      const url = `https://api.jikan.moe/v4/characters/${charid}`;
      try {
        const response = await fetch(url);
        const json = await response.json();

        if (json.data) {
          if (json.data.about?.length > 500) {
            json.data.about = json.data.about.substring(0, 400);
          }

          let character = {
            id: json.data.mal_id,
            animeid: animeid,
            name: json.data.name,
            favorites: json.data.favorites,
            about: json.data.about,
            image: json.data.images.jpg.image_url
          };

          setNewChar(character);
          setErrorMsg('');
        } else {
          setErrorMsg(
            'There was an issue loading the character. Please try again.'
          );
        }
      } catch (error) {
        setErrorMsg(error);
      }
    };

    if (anime?.length > 0) {
      const animeIds = anime.map((x) => x.id);
      const randomAnimeId =
        animeIds[Math.floor(Math.random() * animeIds.length)];

      setAnimeId(randomAnimeId);

      const url = `https://api.jikan.moe/v4/anime/${randomAnimeId}/characters`;
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          const randomChar =
            json.data[Math.floor(Math.random() * json.data.length)];
          setCharId(randomChar.character.mal_id);

          if (fetchCounter === 0) {
            fetchFirstChar(randomAnimeId, randomChar.character.mal_id);
            setFetchCounter(fetchCounter + 1);
          }
        } catch (error) {
          setErrorMsg(error);
        }
      };

      fetchData();
    }
  }, [anime, fetchCounter]);

  useEffect(() => {
    let errorObj = JSON.stringify(error, null, 2);
    if (errorObj) {
      setErrorMsg(error.message);
    }
  }, [error]);

  const handleAddCharacter = () => {
    addCharacter();
    setNewChar({});
  };

  const handleGetRandomChar = () => {
    setNewChar({});
    const url = `https://api.jikan.moe/v4/characters/${charId}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();

        if (json.data) {
          if (json.data.about?.length > 500) {
            json.data.about = json.data.about.substring(0, 400);
          }

          let character = {
            id: json.data.mal_id,
            animeid: animeId,
            name: json.data.name,
            favorites: json.data.favorites,
            about: json.data.about,
            image: json.data.images.jpg.image_url
          };

          setNewChar(character);
          setErrorMsg('');
        } else {
          setErrorMsg(
            'There was an issue loading the character. Please try again.'
          );
        }
      } catch (error) {
        setErrorMsg(error);
      }
    };

    fetchData();
    setFetchCounter(fetchCounter + 1);
  };

  return (
    <div className="new-character">
      {loading && (
        <Alert severity="info" className="messages">
          Character is being saved...
        </Alert>
      )}
      {errorMsg && (
        <Alert severity="error" className="messages">
          {errorMsg}
        </Alert>
      )}
      {newChar.id && (
        <div className="new-character-form">
          <div className="new-character-info">
            <TextField
              value={
                anime.filter((x) => x.id === newChar.animeid.toString())[0]
                  ?.title
              }
              label="Anime"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
            />
            <TextField
              label="Name"
              value={newChar.name}
              variant="filled"
              InputProps={{
                readOnly: true
              }}
            />
            <TextField
              label="Favorites"
              value={newChar.favorites}
              variant="filled"
              InputProps={{
                readOnly: true
              }}
            />
            <TextField
              label="About"
              value={newChar.about ? newChar.about : ''}
              multiline
              rows={4}
              variant="filled"
              InputProps={{
                readOnly: true
              }}
            />
          </div>
          <img
            src={newChar.image}
            alt="new-character-img"
            className="new-char-image"
          />
        </div>
      )}
      <div className="buttons">
        <Button
          variant="contained"
          onClick={handleAddCharacter}
          disabled={!newChar.id}
        >
          Add Character
        </Button>
        <Button
          variant="contained"
          onClick={handleGetRandomChar}
          color="info"
          title="Fetch another random character"
        >
          <RefreshIcon />
        </Button>
      </div>
    </div>
  );
};

export default NewCharForm;
