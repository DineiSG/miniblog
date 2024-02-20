//Hook para visualização individual de posts

import { useState, useEffect } from "react";
import { db } from "../firebase/config";

//definindo uma coleção, pegando um dado, ordenando e filtrando 
import{
  doc,
  getDoc // Permit pegar um documento do banco de dados do firebase
    } from "firebase/firestore"

export const useFetchDocument = (docCollection, id)=>{ 
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //Memory leak
    const [cancelled, setCancelled] = useState(false)

    //Mapeando o tipo de dado que esta chegando
    useEffect(()=>{
        //Buscando o dado no BD
        async function loadDocument(){
            if (cancelled) {
                return}

            setLoading(true)

            try{
                const docRef = await doc(db, docCollection, id)
                const docSnap=await getDoc(docRef)

                setDocument(docSnap.data())
                setLoading(false) 
            }catch(error){
                console.log(error)
                setError(error.message)
                setLoading(true)   
            }
            
        }
        loadDocument()

    },[docCollection, id, cancelled])

    useEffect(() =>{
        return() => setCancelled(true)
    },[])

    return {document, loading, error}
}