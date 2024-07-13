import  Home  from './components/Home';
import Bienvenida from './components/Bienvenida';
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function App(){
    return(
        <div className='contanier' >
            {/* <Menu /> */}
            <Home />
            <Bienvenida />
            
            {/* <Login /> */}
        </div>
    )
}

export default App