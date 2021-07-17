import Head from 'next/head'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Footer from '../components/footer'

export default function Home(initialData) {

  const [searchResults, setSearchResults] = useState([])
  const [searchTerm, setSearchTerm] = useState('cats')

  const router = useRouter();

  useEffect(()=>{
    setSearchResults(initialData.catGiphys.data)
  }, [initialData])

  const handleSubmit = async event => {
    event.preventDefault()
    console.log("forminput search", searchTerm)
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=Uza5EPDGOue71J103zLA8Dm1CnT6POdU&limit=10`)
    const catGiphys = await response.json()
    console.log(catGiphys)
    setSearchResults(catGiphys.data)
  }

  return (
    <div className="container">
      <Head>
        <title>Giphy Search App</title>
        <meta name="description" content="This is an example of a meta description. This will often show up in search results."></meta>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css"/>
      </Head>
      <h1>Giphy Search App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="search"  onChange={event => setSearchTerm(event.target.value)} required value={searchTerm}/>
        <button>Search</button>
      </form>
      <h1>Search Result for {router.query.searchTerm}</h1>
      <p>Share this search with <Link href="/search/[id]" as={`/search/${searchTerm}`}><a>{` http://localhost:3000/search/${searchTerm}`}</a></Link></p>
      <div className="giphy-search-results-grid">
      {searchResults.map(data => {
        return (
          <div key={data.id}>
            <h3>{data.title}</h3>
            <img src={data.images.original.url} alt={data.title}/>
            {/* <Image src={data.images.original.url} alt={data.title} height="200" width="200"/> */}
          </div>
        )
      })}
      </div>
      <Footer/>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch('https://api.giphy.com/v1/gifs/search?q=cats&api_key=Uza5EPDGOue71J103zLA8Dm1CnT6POdU&limit=10')
  const catGiphys = await response.json()
  return {
    props: {
      catGiphys
    }
  }

}