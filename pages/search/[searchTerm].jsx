import Head from "next/head"
import { useRouter } from 'next/router'
import Link from 'next/link'
import Footer from '../../components/footer'

export default function searchTerm(initialData) {

    const router = useRouter()

	return (
        <>
		<div className='container'>
			<Head>
				<title>Search results for: {router.query.searchTerm}
                </title>
                <meta name="description" content={initialData.giphys.map((each, index) => each.title + ' ')}></meta>
				<link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
				<link rel='stylesheet' href='/styles.css' />
			</Head>
                <Link href="/"><a>Go Home</a></Link>
			<h1>Search Results for {router.query.searchTerm}</h1>
            <div className="giphy-search-results-grid">
                {initialData.giphys.map((each, index) => {
                    return(
                        <div key={index}>
                        <h3>{each.title}</h3>
                        <img src={each.images.original.url} alt={each.title}/>
                        </div>
                    )
                })}
            </div>
		</div>
        <Footer/>
        </>
	);
}

export async function getServerSideProps(context) {
    const searchTerm = context.query.searchTerm
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=Uza5EPDGOue71J103zLA8Dm1CnT6POdU&limit=10`)
    const giphys = await response.json()
    return {
      props: {
        giphys: giphys.data
      }
    }
}