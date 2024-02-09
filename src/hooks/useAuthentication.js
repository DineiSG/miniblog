
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
    const [cancelled, setcancelled]=useState(false)

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

        try {

            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user,{
                displayName:data.displayName
            })

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
        }
        setLoading(false)
    }

    //Esse useEffect tem a função de evitar o memory leak
    useEffect(()=>{
        return() => setcancelled(true)
    },[])

    return{
        auth, 
        createUser,
        error,
        loading,
    }



}
