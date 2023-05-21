import styles from './Quadrado.module.css'

function Quadrado(props){
    return(
        <div className={styles.quadrado}>
            <div>
                <p className={styles.nomeItem}>{props.item}</p>
            </div>
            <div>
                <p className={styles.valor}>{props.valor}</p>
            </div>
        </div>
    )
}

export default Quadrado