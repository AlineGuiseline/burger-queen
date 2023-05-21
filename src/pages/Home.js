import "./Home.css";
import Logo from '../assets/logo.png';

function Home() {
  return (
    <div className='bodyHome'>
      <section className="container">
        <img alt="logo-imagem" src={Logo} className="logoImage" />
        <form>
        <label className="labelForm">E-mail</label>
          <div>
          <input type="email" placeholder="email@exemplo.com" className="inputForm" />
          </div>
          <label className="labelForm">Senha</label>
          <div>
          <input type="password" placeholder="******" className="inputForm" />
          </div>
        </form>
        <button className="btnForm">Login</button>
      
      </section>
    </div>
  );
}

export default Home;
