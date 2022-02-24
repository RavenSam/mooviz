import { useEffect, useState } from "react"
import PropTypes from "prop-types"

import styles from "./MovieList.module.scss"

import { SwiperSlide, Swiper } from "swiper/react"

import tmdbApi, { category } from "../../lib/api/tmdbApi"
import MovieCard from "../MovieCard"

export default function MovieList(props) {
   const [items, setItems] = useState([])

   useEffect(() => {
      const getList = async () => {
         let response = null
         const params = {}

         if (props.type !== "similar") {
            switch (props.category) {
               case category.movie:
                  response = await tmdbApi.getMovieList(props.type, { params })
                  break

               default:
                  response = await tmdbApi.getTvList(props.type, { params })
                  break
            }
         } else {
            response = await tmdbApi.similar(props.category, props.id)
         }

         setItems(response.results)
      }

      getList()
   }, [])

   return (
      <div className={styles.movieList}>
         <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
            {items.map((item, i) => (
               <SwiperSlide className={styles.swiperSlide} key={i}>
                  <MovieCard item={item} category={props.category} />
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   )
}

MovieList.propTypes = {
   category: PropTypes.string.isRequired,
   type: PropTypes.string.isRequired,
}
