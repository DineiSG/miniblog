//Hook para criação de posts 

import { useState, useEffect, useReducer } from "react";

//Importando o banco de dados do Firebase
import { db } from "../firebase/config";

/*Importando a função de collection (cria as coleções de posts no
 firebase), addDoc (insere o documento no banco) e Timestamp(responsável por marcar a hora em que o post foi criodo) */ 
import { collection, addDoc, Timestamp } from "firebase/firestore";


//Estado inicial do reducer
const initialState={
    loading:null,
    error:null
}

//Estruturando o Reducer com o estado e a ação que necessitaremos
const insertReducer = (state, action) =>{
    switch(action.type){
        case "LOADING":
            return {loading: true, error:null}
        case "INSERTED_DOC":
            return {loading: false, error:null}
        case "ERROR":
            return {loading:false, error:action.payload}
        default:
            return state    
    }
}



export const useInsertDocument = (docCollection) =>{
    const [response, dispatch]= useReducer(insertReducer, initialState)

    //limpando a memoria (memory leak)
    const[cancelled, setCancelled]= useState(false)

    //Verificando se a ação esta cnacelada ou nao
    const checkCancelBeforeDispatch = (action) =>{
        if (!cancelled){
            dispatch(action)
        }
    }

    //Função para inserção de documentos
    const insertDocument = async(document)=>{
        checkCancelBeforeDispatch({
            type: "LOADING"
            
        })
        

        try{         
            const newDocument = {...document, createdAt: Timestamp.now()}
            
            const insertedDocument= await addDoc(
                collection(db, docCollection),
                newDocument
            )

            checkCancelBeforeDispatch({
                type:"INSERTED_DOC",
                payload:insertedDocument, 
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

    return{insertDocument, response}
}

