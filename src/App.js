//Importando o React Router
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

//Função que mapeia se a autenticaçlão do usuario foi feita com sucesso
import { onAuthStateChanged } from 'firebase/auth';

//Importando o context do provedor
import { AuthProvider } from './context/AuthContext';

//Importando o estilo
import './App.css';

//Importando as páginas e componentes
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register';
import Search from './pages/Search/Search';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboards/Dashboard';
import CreatePost from './pages/CreatePost/CreatePost';
import Post from './pages/Post/Post';
import EditPost from './pages/EditPost/EditPost';


//importando os hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';





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
          <Route path="/" element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/search' element={<Search/>}></Route>
          <Route path='/posts/:id' element={<Post/>}></Route>
          {/*Bloqueando a rota de um usuario nao logado e redirecionando para a home*/}
          <Route path="/login" element={!user ? <Login/>:<Navigate to="/"/>}></Route>
          <Route path='/register' element={!user ? <Register/>:<Navigate to="/"/>}></Route>
          {/*Bloqueando rota de um usuario nao registrado e redirecionadio para o login */}
          <Route path='/dashboard' element={user ? <Dashboard/>:<Navigate to="/login"/>}></Route>
          <Route path='/posts/edit/:id'element={user ? <EditPost/>:<Navigate to="/login"/>}></Route>
          <Route path='/posts/create'element={user ? <CreatePost/>:<Navigate to="/login"/>}></Route>
        </Routes>
      </div>
      <Footer />
      </BrowserRouter>
     </AuthProvider>
    </div>
  );
}

export default App;
