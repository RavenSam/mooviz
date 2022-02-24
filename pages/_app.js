// Components
import Layout from "../components/Layouts"

// Styles
import "swiper/swiper.min.css"
import "../assets/boxicons-2.0.7/css/boxicons.min.css"
import "../styles/globals.scss"

export default function MyApp({ Component, pageProps }) {
   return (
      <>
         <Layout>
            <Component {...pageProps} />
         </Layout>
      </>
   )
}
