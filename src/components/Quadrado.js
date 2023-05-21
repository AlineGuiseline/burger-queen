import './Quadrado.modules.css'

function Quadrado(props){
    return(
        <div className='quadrado'>
            <p className='nomeItem'>{props.item}</p>
            <p className='valor'>{props.valor}</p>
        </div>
    )
}
export default Quadrado