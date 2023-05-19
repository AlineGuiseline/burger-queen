import './Button.modules.css'

function Button(props){
    return(
        <div>
            <button className='btnEstilo'>{props.nome}</button>
        </div>
    )
}
export default Button