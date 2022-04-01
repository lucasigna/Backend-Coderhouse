import { BrowserRouter,Route,Routes,Navigate } from 'react-router-dom'
import './App.scss';
import { ItemListContainer } from './Components/ItemListContainer/ItemListContainer';
import { NavBar } from './Components/NavBar/NavBar';

function App() {

  /* useEffect(() => {

    fetch('http://localhost:8080/api/productos')
    .then( resp => resp.json())
    .then( data =>  console.log(data) )

  },[]) */

  return (
    <BrowserRouter>

        <NavBar/>

        <Routes>
            <Route exact path="/" element={<ItemListContainer/>}/>
            <Route exact path="*" element={<Navigate to="/"/>}/>
        </Routes>

    </BrowserRouter>
  );
}

export default App;
