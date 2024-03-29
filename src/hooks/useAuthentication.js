//Hook para a criação e autenticação de usuario
import{
    getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
}from 'firebase/auth'

import {useState, useEffect} from 'react'

export const useAuthentication= () =>{
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // cleanup - useState que irá cancelar as açoes futuras do componente. O objetivo é nao ter problemas com leak de memoria
    const [cancelled, setCancelled]=useState(false)

    //Pegando autenticações do firebase e criando funções de autenticaçao
    const auth=getAuth()

    //Função de verificação do cancelled
    function checkIfIsCancelled(){
        if (cancelled){
            return
        }
    }

    //Função de criação do usuario no firebase
    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {

            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user,{
                displayName:data.displayName
            })
            setLoading(false)

            return user
        }catch(error){
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage
            if(error.message.includes("Password")){
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres"
            }else if (error.message.includes("email-already")){
                systemErrorMessage="E-mail ja cadastrado."
            }else{
                systemErrorMessage= "Ocorreu um erro, por favor tente mais tarde"
            }
            setLoading(false)
            setError(systemErrorMessage)
        }
        
    }

    //Função de logout
    const logout = ()=>{
        checkIfIsCancelled()

        signOut(auth)
    }

    //Login

    const login = async(data)=>{
        checkIfIsCancelled()
        setLoading(true)
        setError(false)
        
        try{
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)
        }catch (error){
            let systemErrorMessage;
                systemErrorMessage = "Usuário ou senha inválido. Por favor tente novamente."
            
            setError(systemErrorMessage)
            setLoading(false)
        }
    }

    //Esse useEffect tem a função de evitar o memory leak
    useEffect(()=>{
        return() => setCancelled(true)
    },[])

    return{
        auth, 
        createUser,
        error,
        loading,
        logout,
        login,
    }



}
