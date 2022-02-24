import React, { useEffect, useState } from "react"

import apiConfig from "../../lib/api/apiConfig"
import tmdbApi from "../../lib/api/tmdbApi"

export default function Cast(props) {
   const [casts, setCasts] = useState([])

   useEffect(() => {
      const getCredits = async () => {
         const res = await tmdbApi.credits(props.cat, props.id)

         setCasts(res.cast.slice(0, 5))
      }

      getCredits()
   }, [props.cat, props.id])

   return (
      <div className={props.styles.casts}>
         {casts.map((item, i) => (
            <div key={i} className={props.styles.casts__item}>
               <div
                  className={props.styles.casts__item__img}
                  style={{
                     backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`,
                  }}
               ></div>
               <p className={props.styles.casts__item__name}>{item.name}</p>
            </div>
         ))}
      </div>
   )
}
