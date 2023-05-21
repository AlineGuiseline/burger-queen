import Quadrado from "../components/Quadrado"
import './Menu.css'
function Menu() {
    return( 
        <section className="bodyMenu">

            <div className="optionsBreakfast"> 
                <Quadrado item ='Café da Manhã' />
                <Quadrado item='Café americano' valor='R$5'/>
                <Quadrado item='Café com leite'/>
                <Quadrado item='Sanduíche de presunto e queijo'/>
                <Quadrado item='Suco de fruta natural'/> 
            </div>
            <div className="optionsLunch">
                <Quadrado item='Almoço'/>
                <Quadrado item='Hambúrguer simples'/>
                <Quadrado item='Hambúrguer duplo'/>
                <Quadrado item='Batata frita'/>
                <Quadrado item='Anéis de cebola'/>
                <Quadrado item='Água 500ml'/>
                <Quadrado item='Água 750ml'/>
                <Quadrado item='Bebida gaseificada 500ml'/>
                <Quadrado item='Bebida gaseificada 750ml'/>
            </div>
        </section>
    )
}

export default Menu