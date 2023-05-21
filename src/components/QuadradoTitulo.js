import styles from './QuadradoTitulo.module.css'

function QuadradoTitulo(props){
    return(
        <div className={styles.quadrado}>
            <div>
                <p className={styles.nomeItemTitulo}>{props.item}</p>
            </div>
        </div>
    )
}

export default QuadradoTitulo