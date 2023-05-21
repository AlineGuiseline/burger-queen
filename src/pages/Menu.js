import Quadrado from "../components/Quadrado"
import QuadradoTitulo from "../components/QuadradoTitulo"
import './Menu.css'
function Menu() {
    return( 
        <section className="bodyMenu">

            <div className="optionsBreakfast"> 
                <QuadradoTitulo item ='Café da Manhã' />
                <Quadrado item='Café americano' valor='R$5'/>
                <Quadrado item='Café com leite' valor='R$7'/>
                <Quadrado item='Sanduíche de presunto e queijo' valor='R$10'/>
                <Quadrado item='Suco de fruta natural' valor='R$7'/> 
            </div>
            <div className="optionsLunch">
                <QuadradoTitulo item='Almoço'/>
                <Quadrado item='Hambúrguer simples' valor='R$10'/>
                <Quadrado item='Hambúrguer duplo' valor='R$15'/>
                <Quadrado item='Batata frita' valor='R$5'/>
                <Quadrado item='Anéis de cebola' valor='R$5'/>
                <Quadrado item='Água 500ml' valor='R$5'/>
                <Quadrado item='Água 750ml' valor='R$7'/>
                <Quadrado item='Bebida gaseificada 500ml' valor='R$7'/>
                <Quadrado item='Bebida gaseificada 750ml' valor='R$10'/>
            </div>
        </section>
    )
}

export default Menu