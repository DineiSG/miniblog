//Formulario de registro

import { useAuthentication } from '../../hooks/useAuthentication'
import styles from './Register.module.css'
import {useState, useEffect} from 'react'

const Register = () => {
  //States do formulario

  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [createUser, authError, loading] = useAuthentication()

  //States de status
  const [error, setError] = useState("")

  //Evento de envio do formulario
  const handleSubmit = async (e) =>{
    e.preventDefault()

    //Limpando o formulario apos o envio
    setError("")

    //Formando o usuário com base nos inputs
    const user={
      displayName,
      email,
      password
    }

    //Validações do formulario
    if (password !== confirmPassword){
      setError("As senhas precisam ser iguais!")
      return
    }

    const res = await createUser(user)
    console.log(user)
  }

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias !</p>

      {/*Declarando que o formulario obedecera ao evento de envio */}
      <form onSubmit={handleSubmit}>
        <label>
            <span>Nome:</span>
            <input type="text" 
            name="displayName" 
            required placeholder="Nome do usuário" 
            /*Chamando o state  */
            value={displayName}
            onChange={(e)=>setDisplayName(e.target.value)}
            />
        </label>
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
        <label>
            <span>Confirmação de Senha:</span>
            <input type="password" 
            name="confirmPassword" 
            required placeholder="Confirme a sua senha" 
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            />
        </label>
        <button className='btn'>Cadastrar</button>
         {/*Exibindo o erro no console.log */}
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default Register
