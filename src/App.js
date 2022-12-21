import './App.css';
import React, { useEffect, useState } from 'react';
import PodcastCard from './components/PodcastCard';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';

const API_URL_PRINCIPAL = 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://itunes.apple.com/es/rss/toppodcasts/limit=12/genre=1310/json');


const App = () => {
  const [podcast, setPodcast] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getPodcast = async () => {
    console.log(isLoading)
    const response = await fetch(API_URL_PRINCIPAL);
    const data = await response.json()
    const datos = JSON.parse(data.contents)

    //console.log(datos)
    setPodcast(datos.feed.entry)
    console.log(datos)
  }


  useEffect(() => {
    setTimeout(() => {
      getPodcast().then(
        setLoading(false))
    }, 2000)

  }, [])

  return (
    <div className="App container mx-auto px-4">

      <NavBar />
      <SearchBar />
      {
        !isLoading
          ? (
            <div className=" grid sm:grid-cols-4  grid-cols-1 gap-4 pt-4">
              {podcast.map((podcast) => (
                <PodcastCard podcast={podcast} loading={isLoading} key={podcast.id.attributes["im:id"]} />
              ))}
            </div>
          ) : (
            <div className='empty'>
              <h2>Cargando</h2>
            </div>
          )
      }

    </div >
  );
}

export default App;
