import React from 'react';
import LandingPage from './LandingPages'
import './App.css'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <LandingPage/>
            </div>
        </ThemeProvider>
    );
}

export default App;
