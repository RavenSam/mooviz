import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useRef } from "react"
import styles from "./header.module.scss"

const headerNav = [
   { label: "home", path: "/" },
   { label: "movies ", path: "/catalog/movie" },
   { label: "tv series", path: "/catalog/tv" },
]

export default function Header() {
   const { asPath } = useRouter()
   const headerRef = useRef(null)

   const active = headerNav.findIndex((e) => e.path === asPath)

   useEffect(() => {
      const shrinkHeader = () => {
         if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            headerRef.current.classList.add(styles.shrink)
         } else {
            headerRef.current.classList.remove(styles.shrink)
         }
      }

      window.addEventListener("scroll", shrinkHeader)

      return () => {
         window.removeEventListener("scroll", shrinkHeader)
      }
   }, [])

   return (
      <div ref={headerRef} className={styles.Header}>
         <div className={`${styles.wrap} container`}>
            <div className={styles.logo}>
               <Link href="/">
                  <a>
                     Movi<span className="text-primary">Z</span>
                  </a>
               </Link>
            </div>

            <ul>
               {headerNav.map((e, i) => (
                  <li key={i}>
                     <Link href={e.path}>
                        <a className={`${i === active ? styles.active : ""}`}>{e.label}</a>
                     </Link>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   )
}
