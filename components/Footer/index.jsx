import Link from "next/link"

import styles from "./Footer.module.scss"

export default function Footer() {
   return (
      <div className={styles.footer} style={{ backgroundImage: `url(/img-1.jpg)` }}>
         <div className={`${styles.footer__content} container`}>
            <div className={styles.footer__content__logo}>
               <div className={styles.logo}>
                  <Link href="/">
                     <a>
                        Movi<span className="text-primary">Z</span>
                     </a>
                  </Link>
               </div>
            </div>

            <div className={styles.footer__content__menus}>
               <div className={styles.footer__content__menu}>
                  <Link href="/">
                     <a>Home</a>
                  </Link>
                  <Link href="/">
                     <a>Contact us</a>
                  </Link>
                  <Link href="/">
                     <a>Terms of servics</a>
                  </Link>
                  <Link href="/">
                     <a>About us</a>
                  </Link>
               </div>

               <div className={styles.footer__content__menu}>
                  <Link href="/">
                     <a>Live</a>
                  </Link>
                  <Link href="/">
                     <a>FAQ</a>
                  </Link>
                  <Link href="/">
                     <a>Premium</a>
                  </Link>
                  <Link href="/">
                     <a>Privacy policy</a>
                  </Link>
               </div>

               <div className={styles.footer__content__menu}>
                  <Link href="/">
                     <a>You must watch</a>
                  </Link>
                  <Link href="/">
                     <a>Recent release</a>
                  </Link>
                  <Link href="/">
                     <a>Top IMDB</a>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   )
}
