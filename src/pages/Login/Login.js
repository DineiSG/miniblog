//Formulario de login
import styles from "./Login.module.css"
import { useAuthentication } from '../../hooks/useAuthentication'
import {useState, useEffect} from 'react'




const Login = () => {
  
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  //States de status
  const [errorFront, setErrorFront] = useState("")

  const {login, error:authError, loading} = useAuthentication()

  //Evento de envio do formulario
  const handleSubmit = async (e) =>{
    e.preventDefault()

    //Limpando o formulario apos o envio
    setErrorFront("")

    //Formando o usuário com base nos inputs
    const user={
      email,
      password
    }

    const res = await login(user)
    
    console.log(res)
  }
  
  useEffect(()=>{
    if(authError){
      setErrorFront(authError)
    }

  },[authError])



  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça login para poder utilizar o sistema</p>

      {/*Declarando que o formulario obedecera ao evento de envio */}
      <form onSubmit={handleSubmit}>
        <label>
            <span>E-mail:</span>
            <input type="email" 
            name="email" 
            required placeholder="E-mail do usuário" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
        </label>
        <label>
            <span>Senha:</span>
            <input type="password" 
            name="password" 
            required placeholder="Insira sua senha" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
        </label>
        {/*Inserindo a função loading */}
        {!loading && <button className='btn'>Entrar</button>}
         {/*Exibindo o erro no console.log */}
        {errorFront && <p className='error'>{errorFront}</p>}
      </form>
    </div>
  )
}

export default Login
