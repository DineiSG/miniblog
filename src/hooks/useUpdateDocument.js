//Hook para editar um post

import { useState, useEffect, useReducer } from "react";

//Importando o banco de dados do Firebase
import { db } from "../firebase/config";

//Pegando a referencia do documento
import { updateDoc, doc } from "firebase/firestore";


//Estado inicial do reducer
const initialState={
    loading:null,
    error:null
}

//Estruturando o Reducer com o estado e a ação que necessitaremos
const updateReducer = (state, action) =>{
    switch(action.type){
        case "LOADING":
            return {loading: true, error:null}
        case "UPDATED_DOC":
            return {loading: false, error:null}
        case "ERROR":
            return {loading:false, error:action.payload}
        default:
            return state    
    }
}



export const useUpdateDocument = (docCollection) =>{
    const [response, dispatch]= useReducer(updateReducer, initialState)

    //limpando a memoria (memory leak)
    const[cancelled, setCancelled]= useState(false)

    //Verificando se a ação esta cnacelada ou nao
    const checkCancelBeforeDispatch = (action) =>{
        if (!cancelled){
            dispatch(action)
        }
    }

    //Função para inserção de documentos
    const updateDocument = async(id, data)=>{
        checkCancelBeforeDispatch({
            type: "LOADING"
        })

        try{         
            const docRef=await doc(db, docCollection, id)

            const updateDocument = await updateDoc(docRef, data)

            checkCancelBeforeDispatch({
                type:"UPDATED_DOC",
                payload:updateDocument, 
            })
            
        }catch(error){
            checkCancelBeforeDispatch({
                type:"ERROR",
                payload:error.message,
                
            })
            console.log(error)
        }
    }

    useEffect(()=>{
        return()=>setCancelled(true)
    },[])

    return{updateDocument, response}
}

