import './App.css';
import React, { useEffect, useState } from 'react';
import PodcastCard from './components/PodcastCard';
import NavBar from './components/NavBar';

const API_URL_PRINCIPAL = 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://itunes.apple.com/es/rss/toppodcasts/limit=12/genre=1310/json');


const App = () => {
  let [podcast, setPodcast] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [term, setTerm] = useState("");

  const getPodcast = async () => {
    console.log(isLoading)
    const response = await fetch(API_URL_PRINCIPAL);
    const data = await response.json()
    const datos = JSON.parse(data.contents)

    //console.log(datos)
    setPodcast(datos.feed.entry)
    console.log(datos)
  }

  const handleChange = (e) => {
    e.preventDefault();
    setTerm(e.target.value)
  }

  if (term.length > 0) {
    podcast = podcast.filter((podcast) => {
      return podcast.title.label.toLowerCase().match(term.toLowerCase())
    })
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
      <input
        type="text"
        className="mt-5 block w-full px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
        placeholder="Buscar..."
        onChange={handleChange}
        value={term}
      />
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
