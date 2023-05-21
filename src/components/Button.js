import styles from './Button.module.css'

function Button(props){
    return(
        <div>
            <button className={styles.btnEstilo}>{props.nome}</button>
        </div>
    )
}
export default Button