//Importando o React Router
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

//Função que mapeia se a autenticaçlão do usuario foi feita com sucesso
import { onAuthStateChanged } from 'firebase/auth';

//Importando o context do provedor
import { AuthProvider } from './context/AuthContext';

//Importando as páginas e componentes
import './App.css';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

//importando os hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';
import Dashboard from './pages/Dashboards/Dashboard';
import CreatePost from './pages/CreatePost/CreatePost';




function App() {
  //Logica para monitorar o status do usuario
  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  //Condicionando o estado de loading ao status do usuario
  const loadingUser= user === undefined

  //useEffect que sera executado baseado no valor da autenticação
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      setUser(user)
    })

  }, [auth])

  if (loadingUser){
    return <p>Carregando...</p>
  }


  return (
    <div className="App">
     <AuthProvider value={user}>
     <BrowserRouter>
      <Navbar />
      <div className='container'>
        <Routes>
          {/*Criando as rotas das páginas */}
          <Route path="/home" element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/posts/create'element={<CreatePost/>}></Route>
        </Routes>
      </div>
      <Footer />
      </BrowserRouter>
     </AuthProvider>
    </div>
  );
}

export default App;
