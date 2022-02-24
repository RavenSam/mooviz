import styles from "./PageHeader.module.scss"

export default function PageHeader(props) {
   return (
      <div className={styles.pageHeader} style={{ backgroundImage: `url(/img-1.jpg)` }}>
         <h2>{props.title}</h2>
      </div>
   )
}
