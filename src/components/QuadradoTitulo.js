import './QuadradoTitulo.modules.css'

function QuadradoTitulo(props){
    return(
        <div className='quadradoTitulo'>
            <div>
                <p className='nomeItemTitulo'>{props.item}</p>
            </div>
        </div>
    )
}

export default QuadradoTitulo