import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import EachData from '../components/EachData'
import Navbar from '../components/Navbar'

export default function Home(props) {

  const [genreMovies, setGenreMovie] = useState(null)
  const [genresTv, setGenresTv] = useState(null)
  const [popularMovies, setPopularMovies] = useState(null)
  const [nowPlaying, setNowPlaying] = useState(null)
  const [topRated, setTopRated] = useState(null)
  const [upcommingMovies, setUpcommingMovies] = useState(null)

  useEffect(() => {
    setGenreMovie(props.genreMovies)
    setGenresTv(props.genresTv)
    setPopularMovies(props.popularMovies)
    setNowPlaying(props.nowPlaying)
    setTopRated(props.topRated)
    setUpcommingMovies(props.upcommingMovies)
  })
  // if(genreMovies === null && genresTv === null && popularMovies === null && nowPlaying === null && topRated === null && upcommingMovies === null) {
  //   return (
  //     <div>
  //       <h1>Loading</h1>
  //     </div>
  //   )
  // } else {
    return (
      <div>
        <Head>
          <title>LUX | online movies rating</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="mx-4 md:container md:mx-auto pt-4">
          <EachData data={popularMovies} title="Popular movies" />
          <EachData data={nowPlaying} title="Now Playing" />
          <EachData data={topRated} title="Top Rated" />
          <EachData data={upcommingMovies} title="Upcomming Movies" />
        </div>
      </div>
    )
  // }
}

export async function getStaticProps() {
  const tr = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=f52aa1a7c260685a467d566a4b94825f")
  const topRated = await tr.json()

  const np = await fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=f52aa1a7c260685a467d566a4b94825f")
  const nowPlaying = await np.json()

  const pm = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=f52aa1a7c260685a467d566a4b94825f")
  const popularMovies = await pm.json()

  const upcom = await fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=f52aa1a7c260685a467d566a4b94825f")
  const upcommingMovies = await upcom.json()

  const genre = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=f52aa1a7c260685a467d566a4b94825f")
  const genreMovies = await genre.json()

  const genreTvUrl = await fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=f52aa1a7c260685a467d566a4b94825f")
  const genresTv = await genreTvUrl.json()

  return {
    props: {
      topRated: topRated,
      nowPlaying: nowPlaying,
      popularMovies: popularMovies,
      upcommingMovies: upcommingMovies,
      genreMovies: genreMovies,
      genresTv: genresTv
    }
  }
}
