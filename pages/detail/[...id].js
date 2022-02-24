import Head from "next/head"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Cast from "../../components/shared/Cast"
import Videos from "../../components/shared/Videos"
import MoviList from "../../components/MoviList"

import apiConfig from "../../lib/api/apiConfig"
import tmdbApi from "../../lib/api/tmdbApi"

import styles from "../../styles/Detail.module.scss"

export default function Detail({ item }) {
   const router = useRouter()

   const cat = router?.query?.id && router?.query?.id[0]
   const id = router?.query?.id && router?.query?.id[1]

   if (router.isFallback) {
      return <div>Loading...</div>
   }

   return (
      <>
         <Head>
            <title>{item?.title || item?.name}</title>
         </Head>

         {item && (
            <>
               <div
                  className={styles.banner}
                  style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})` }}
               ></div>

               <div className={`mb-3 container ${styles.movieContent}`}>
                  <div className={styles.movieContent__poster}>
                     <div
                        className={styles.movieContent__poster__img}
                        style={{
                           backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})`,
                        }}
                     ></div>
                  </div>

                  <div className={styles.movieContent__info}>
                     <h1 className={styles.title}>{item?.title || item?.name}</h1>

                     <div className={styles.genres}>
                        {item.genres &&
                           item.genres.slice(0, 5).map((genre, i) => (
                              <span key={i} className={styles.genres__item}>
                                 {genre.name}
                              </span>
                           ))}
                     </div>

                     <p className={styles.overview}>{item.overview}</p>

                     <div className={styles.cast}>
                        <div className="secion__header">
                           <h2>Casts</h2>
                        </div>

                        <Cast styles={styles} cat={cat} id={id} />
                     </div>
                  </div>
               </div>

               <div className="container">
                  <div className="section mb-3">
                     <Videos styles={styles} cat={cat} id={id} />
                  </div>

                  <div className="section mb-3">
                     <div className="section__header mb-2">
                        <h2>Similar</h2>
                     </div>

                     <MoviList category={cat} id={id} type="similar" />
                  </div>
               </div>
            </>
         )}
      </>
   )
}

export async function getStaticProps({ params }) {
   const cat = params?.id[0]
   const id = params?.id[1]
   const response = await tmdbApi.details(cat, id, { params: {} })

   return {
      props: {
         item: response,
      },

      revalidate: 50,
   }
}

export async function getStaticPaths() {
   return {
      paths: [],
      fallback: "blocking",
   }
}
