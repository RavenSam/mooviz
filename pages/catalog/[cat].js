import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"
import MovieGrid from "../../components/MovieGrid"

import PageHeader from "../../components/PageHeader"

import { category } from "../../lib/api/tmdbApi"

export default function Catalog() {
   const { query } = useRouter()

   const cat = query?.cat ? query?.cat : null

   return (
      <>
         <Head>
            <title>Moviz - {cat === category.movie ? "Movie" : "TV Series"}</title>
         </Head>

         <PageHeader title={cat === category.movie ? "Movie" : "TV Series"} />

         <div className="container">
            <div className="section mb-3">
               <MovieGrid category={cat} />
            </div>
         </div>
      </>
   )
}
