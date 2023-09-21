// Configura las rutas en tu componente principal de la aplicación
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DedicatoriaForm from './screens/home';
import VerDedicatoria from './screens/dedicatoria';
import Flower from './screens/flowe';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component= {DedicatoriaForm}></Route>
        <Route path="/ver-dedicatoria/:dedicatoriaId" component={VerDedicatoria}/>
      </Routes>
    </Router>
  );
}

export default App;

