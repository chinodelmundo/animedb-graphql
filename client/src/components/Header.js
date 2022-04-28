import { AppBar, Toolbar, Typography } from '@mui/material';
import '../styles/Header.css';

function Header({ anime }) {
  return (
    <AppBar position="relative">
      <Toolbar>
        <a className="header-link" href="/">
          <Typography variant="h6">AnimeDB-GraphQL</Typography>
        </a>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
