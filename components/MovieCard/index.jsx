import { useRouter } from "next/router"

import Button from "../Button"

import { category } from "../../lib/api/tmdbApi"
import apiConfig from "../../lib/api/apiConfig"

export default function MovieCard(props) {
   const { push } = useRouter()

   const { item } = props

   const link = "/detail/" + category[props.category] + "/" + item.id

   const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path)

   return (
      <div onClick={() => push(link)}>
         <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
            <Button>
               <i className="bx bx-play"></i>
            </Button>
         </div>

         <h3>{item.title || item.name}</h3>
      </div>
   )
}
