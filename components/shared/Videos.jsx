import React, { useEffect, useRef, useState } from "react"

import tmdbApi from "../../lib/api/tmdbApi"

export default function Videos(props) {
   const [videos, setVideos] = useState([])

   useEffect(() => {
      const getVideos = async () => {
         const res = await tmdbApi.getVideos(props.cat, props.id)

         setVideos(res.results.slice(0, 5))
      }

      getVideos()
   }, [props.cat, props.id])

   return (
      <>
         {videos.map((item, i) => (
            <Video styles={props.styles} key={i} item={item} />
         ))}
      </>
   )
}

const Video = ({ styles, item }) => {
   const iframeRef = useRef(null)

   useEffect(() => {
      const height = (iframeRef.current.offsetWidth * 9) / 16 + "px"

      iframeRef.current.setAttribute("height", height)
   }, [])

   return (
      <div className={styles.video}>
         <div className={styles.video__title}>
            <h2>{item.name}</h2>
         </div>

         <iframe src={`https://www.youtube.com/embed/${item.key}`} ref={iframeRef} width="100%" title="Video"></iframe>
      </div>
   )
}
