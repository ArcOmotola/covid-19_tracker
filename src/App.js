import React from 'react';
import { MenuItem, FormControl, Select } from '@material-ui/core';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="app_dropdown">
        <Select variant="outlined" value="abc">
          <MenuItem value="worldwide">Worldwide</MenuItem>
          <MenuItem value="worldwide">Nigeria</MenuItem>
          <MenuItem value="worldwide">Ghana</MenuItem>
          <MenuItem value="worldwide">Russia</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default App;
