import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import tmdbApi, { category, movieType, tvType } from "../../lib/api/tmdbApi"

import Button, { OutlineButton } from "../Button"
import Input from "../Input"
import MovieCard from "../MovieCard"

import styles from "./MovieGrid.module.scss"

export default function MovieGrid(props) {
   const [items, setItems] = useState([])
   const [page, setPage] = useState(1)
   const [totalPage, setTotalPage] = useState(0)

   const { query } = useRouter()

   useEffect(() => {
      const getList = async () => {
         let response = null

         if (query?.search === undefined) {
            const params = {}
            switch (props.category) {
               case category.movie:
                  response = await tmdbApi.getMovieList(movieType.upcoming, { params })
                  break

               default:
                  response = await tmdbApi.getTvList(tvType.popular, { params })
                  break
            }
         } else {
            const params = { query: query?.search }
            response = await tmdbApi.search(props.category, { params })
         }

         setItems(response.results)
         setTotalPage(response.total_pages)
      }

      getList()
   }, [props.category, query?.search])

   const loadMore = async () => {
      let response = null

      if (query?.search === undefined) {
         const params = { page: page + 1 }
         switch (props.category) {
            case category.movie:
               response = await tmdbApi.getMovieList(movieType.upcoming, { params })
               break

            default:
               response = await tmdbApi.getTvList(tvType.popular, { params })
               break
         }
      } else {
         const params = { query: query?.search, page: page + 1 }
         response = await tmdbApi.search(props.category, { params })
      }

      setItems([...items, ...response.results])
      setPage(page + 1)
   }

   return (
      <>
         <div className="section mb-3">
            <MovieSearch category={props.category} keyword={query?.search} />
         </div>

         <div className={styles.movieGrid}>
            {items.map((item, i) => (
               <MovieCard key={i} category={props.category} item={item} />
            ))}
         </div>

         {page < totalPage ? (
            <div className={styles.movieGrid__loadmore}>
               <OutlineButton className="small" onClick={loadMore}>
                  Load More
               </OutlineButton>
            </div>
         ) : null}
      </>
   )
}

const MovieSearch = (props) => {
   const [keyword, setKeyword] = useState(props.keyword || "")
   const router = useRouter()

   const goToSearch = useCallback(() => {
      if (keyword.trim().length > 0) {
         router.push({ pathname: `/catalog/${category[props.category]}`, query: { search: keyword } })
      }
   }, [keyword, props.category, router])

   useEffect(() => {
      const enterEvent = (e) => {
         e.preventDefault()
         if (e.keyCode === 13) {
            goToSearch()
         }
      }

      document.addEventListener("keyup", enterEvent)

      return () => {
         document.removeEventListener("keyup", enterEvent)
      }
   }, [keyword, goToSearch])

   return (
      <div className={styles.movieSearch}>
         <Input type="text" placehoder="Enter keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} />

         <Button className="small" onClick={goToSearch}>
            Search
         </Button>
      </div>
   )
}
