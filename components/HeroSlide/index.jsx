import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"

import tmdbApi, { category, movieType } from "../../lib/api/tmdbApi"
import apiConfig from "../../lib/api/apiConfig"

import SwiperCore, { Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import Button, { OutlineButton } from "../Button"
import Modal, { ModalContent } from "../Modal"

import styles from "./HeroSlide.module.scss"

export default function HeroSlide({ movieItems }) {
   SwiperCore.use([Autoplay])

   return (
      <div className={styles.heroSlide}>
         <Swiper
            modules={[Autoplay]}
            grabCursor={true}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
               delay: 3000,
            }}
         >
            {movieItems.map((item, i) => (
               <SwiperSlide key={i}>
                  {({ isActive }) => <HeroSlideItem item={item} className={isActive ? styles.active : ""} />}
               </SwiperSlide>
            ))}
         </Swiper>

         {movieItems.map((item, i) => (
            <TrailerModal key={i} item={item} />
         ))}
      </div>
   )
}

const HeroSlideItem = (props) => {
   const router = useRouter()

   const { item } = props
   const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)

   const setModalActive = async () => {
      const modal = document.querySelector(`#modal_${item.id}`)

      const videos = await tmdbApi.getVideos(category.movie, item.id)

      if (videos.results.length > 0) {
         const videoSrc = `https://www.youtube.com/embed/` + videos.results[0].key
         modal.querySelector(".modal__content > iframe").setAttribute("src", videoSrc)
      } else {
         modal.querySelector(".modal__content").innerHTML = "No Trailer"
      }

      modal.classList.toggle("active")
   }

   return (
      <div className={`${styles.heroSlide__item} ${props.className}`} style={{ backgroundImage: `url(${background})` }}>
         <div className={`${styles.heroSlide__item__content} ${styles.container}`}>
            <div className={styles.heroSlide__item__content__info}>
               <h2>{item.title}</h2>

               <div className={styles.overview}>{item.overview}</div>

               <div className={styles.btns}>
                  <Button onClick={() => router.push("/detail/movie/" + item.id)}>watch now</Button>

                  <OutlineButton onClick={setModalActive}>Watch trailer</OutlineButton>
               </div>
            </div>

            <div className={styles.heroSlide__item__content__poster}>
               <img src={apiConfig.w500Image(item.poster_path)} alt={item.title + " image"} />
            </div>
         </div>
      </div>
   )
}

const TrailerModal = (props) => {
   const { item } = props

   const iframeRef = useRef(null)

   const onClose = () => iframeRef.current.setAttribute("src", "")

   return (
      <Modal active={false} id={`modal_${item.id}`}>
         <ModalContent onClose={onClose}>
            <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
         </ModalContent>
      </Modal>
   )
}
