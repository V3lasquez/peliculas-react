import React, { useState } from 'react'
import './styles/Peliculas.css'


export const BuscadorPeliculas = () => {

  const baseURL= 'https://api.themoviedb.org/3/search/movie'
  const KEY_API= 'd929c0686bacb9bf5b4d89b51b79f674'
  const [buscador, setBuscador] = useState('')
  const [peliculas, setPelicula]= useState([])
 
  const handleInputChange=(e)=>{
    setBuscador(e.target.value)
  }
   
  const handleSubmit=(e)=>{
    e.preventDefault()
    fetchPelicula()
  }
  const fetchPelicula= async()=>{   
    try{
      const response = await fetch(`${baseURL}?query=${buscador}&api_key=${KEY_API}`)
      const data = await response.json()
      setPelicula(data.results)

    }catch(e){
      console.error("A ocurrido un error",e)
    }
  }

  return (
    <div>
      <h1 className='title'>Buscador de peliculas</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='ingrese una pelicula'
        value={buscador} onChange={handleInputChange}>
        </input>
        <button type='submit' >Buscar</button>
      </form>
      
      <div className='movie-list'>
        {peliculas.map((pelicula)=> (
          <div key={pelicula.id} className='movie-card'>
            <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title}></img>
            <h1>{pelicula.title}</h1>
            <p>{pelicula.overview}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
