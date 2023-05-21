import './Quadrado.modules.css'

function Quadrado(props){
    return(
        <div className='quadrado'>
            <div>
                <p className='nomeItem'>{props.item}</p>
            </div>
            <div>
                <p className='valor'>{props.valor}</p>
            </div>
        </div>
    )
}

export default Quadrado