import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import { Outlet } from 'react-router-dom';
import { fetchNewAlbum, fetchSongs, fetchTopAlbum } from './api/api';
import { StyledEngineProvider } from '@mui/material';
import { Helmet, HelmetProvider } from 'react-helmet-async';
function App() {
  const [searchData, useSearchData] = useState();
  const [data, setData] = useState({});

const generateData = (key, source) => {
  source().then((data) =>{
    setData((prevData) => {
      return {...prevData, [key] : data};
    });
  });
};
useEffect(() => {
  generateData("topAlbums", fetchTopAlbum);
  generateData("newAlbums", fetchNewAlbum);
  generateData("songs", fetchSongs);
}, []);
const {topAlbums = [], newAlbums = [], songs = [] } = data;

  return (
    <HelmetProvider>
      <StyledEngineProvider injectFirst>
        <Helmet>
          <title> Qtify </title>
        </Helmet>
        <Navbar searchData={[...topAlbums, ...newAlbums]} />
        <Outlet context={{ data: { topAlbums, newAlbums, songs } }} />
      </StyledEngineProvider>
    </HelmetProvider>

  //  <>
  //       <StyledEngineProvider injectFirst>
  //          <Navbar searchData={[...topAlbums, ...newAlbums, ]} />
  //            <Outlet context={{data: {topAlbums, newAlbums, songs} }} />
  //         </StyledEngineProvider>
  //        </>

        );
      }

export default App;
 