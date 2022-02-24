import Head from "next/head"

import { category, movieType, tvType } from "../lib/api/tmdbApi"

import HeroSlide from "../components/HeroSlide"
import { OutlineButton } from "../components/Button"
import { useRouter } from "next/router"
import MovieList from "../components/MoviList"

export default function Home() {
   const router = useRouter()

   return (
      <>
         <Head>
            <title>Moviz - Home</title>
         </Head>

         <div>
            <section>
               <HeroSlide />
            </section>

            <div className="container">
               <div className="section mb-3">
                  <div className="section__header mb-2">
                     <h2>Trending Movies</h2>

                     <OutlineButton className="small" onClick={() => router.push("/catalog/movie")}>
                        View More
                     </OutlineButton>
                  </div>

                  <MovieList category={category.movie} type={movieType.popular} />
               </div>

               <div className="section mb-3">
                  <div className="section__header mb-2">
                     <h2>Top Reted Movies</h2>

                     <OutlineButton className="small" onClick={() => router.push("/catalog/movie")}>
                        View More
                     </OutlineButton>
                  </div>

                  <MovieList category={category.movie} type={movieType.top_rated} />
               </div>

               <div className="section mb-3">
                  <div className="section__header mb-2">
                     <h2>Trending TV</h2>

                     <OutlineButton className="small" onClick={() => router.push("/catalog/tv")}>
                        View More
                     </OutlineButton>
                  </div>

                  <MovieList category={category.tv} type={tvType.popular} />
               </div>

               <div className="section mb-3">
                  <div className="section__header mb-2">
                     <h2>Top Rated TV</h2>

                     <OutlineButton className="small" onClick={() => router.push("/catalog/tv")}>
                        View More
                     </OutlineButton>
                  </div>

                  <MovieList category={category.tv} type={tvType.top_rated} />
               </div>
            </div>
         </div>
      </>
   )
}
