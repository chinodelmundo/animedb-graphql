import { useState } from 'react';
import {
  Button,
  FormControlLabel,
  Switch,
  Checkbox,
  Snackbar,
  Alert
} from '@mui/material';
import '../styles/SearchForm.css';

const SearchForm = ({
  onSearch,
  animeFields,
  onSetAnimeFields,
  characterFields,
  onSetCharacterFields
}) => {
  const [warningMsg, setWarningMsg] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [includeChar, setIncludeChar] = useState(true);

  const handleAnimeToggle = () => {
    setWarningMsg('Anime data cannot be unselected.');
    setShowWarning(true);
  };

  const handleToggleAnimeFields = (field) => {
    if (animeFields.includes(field)) {
      let fields = animeFields.filter((x) => x !== field);
      if (fields.length > 0) {
        onSetAnimeFields(fields);
      } else {
        setWarningMsg('Must check at least one Anime field.');
        setShowWarning(true);
      }
    } else {
      onSetAnimeFields([field, ...animeFields]);
    }
  };

  const handleCharToggle = (checked) => {
    setIncludeChar(checked);
    if (checked) {
      onSetCharacterFields(['id', 'name', 'favorites', 'image']);
    } else {
      onSetCharacterFields([]);
    }
  };

  const handleToggleCharFields = (field) => {
    if (characterFields.includes(field)) {
      let fields = characterFields.filter((x) => x !== field);
      onSetCharacterFields(fields);
      if (fields.length === 0) {
        setIncludeChar(false);
      }
    } else {
      onSetCharacterFields([field, ...characterFields]);
    }
  };

  return (
    <div className="search-forms">
      <div className="fields">
        <div>
          <FormControlLabel
            control={<Switch checked={true} onChange={handleAnimeToggle} />}
            label="Anime"
          />
          <div className="checkboxes">
            <FormControlLabel
              control={
                <Checkbox
                  checked={animeFields.includes('id')}
                  onChange={() => handleToggleAnimeFields('id')}
                />
              }
              label="ID"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={animeFields.includes('title')}
                  onChange={() => handleToggleAnimeFields('title')}
                />
              }
              label="Title"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={animeFields.includes('year')}
                  onChange={() => handleToggleAnimeFields('year')}
                />
              }
              label="Year"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={animeFields.includes('image')}
                  onChange={() => handleToggleAnimeFields('image')}
                />
              }
              label="Image"
            />
          </div>
        </div>
        <div>
          <FormControlLabel
            control={
              <Switch
                checked={includeChar}
                onChange={(event) => handleCharToggle(event.target.checked)}
              />
            }
            label="Characters"
          />
          <div className="checkboxes">
            <FormControlLabel
              disabled={!includeChar}
              control={
                <Checkbox
                  checked={characterFields.includes('id')}
                  onChange={() => handleToggleCharFields('id')}
                />
              }
              label="ID"
            />
            <FormControlLabel
              disabled={!includeChar}
              control={
                <Checkbox
                  checked={characterFields.includes('name')}
                  onChange={() => handleToggleCharFields('name')}
                />
              }
              label="Name"
            />
            <FormControlLabel
              disabled={!includeChar}
              control={
                <Checkbox
                  checked={characterFields.includes('favorites')}
                  onChange={() => handleToggleCharFields('favorites')}
                />
              }
              label="Favorites"
            />
            <FormControlLabel
              disabled={!includeChar}
              control={
                <Checkbox
                  checked={characterFields.includes('image')}
                  onChange={() => handleToggleCharFields('image')}
                />
              }
              label="Image"
            />
          </div>
        </div>
      </div>
      <Button variant="contained" onClick={() => onSearch()}>
        Get All Anime
      </Button>
      <Snackbar
        open={showWarning}
        autoHideDuration={6000}
        onClose={() => setShowWarning(false)}
      >
        <Alert
          onClose={() => setShowWarning(false)}
          severity="warning"
          sx={{ width: '100%' }}
        >
          {warningMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SearchForm;
