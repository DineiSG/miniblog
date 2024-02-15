import { useState, useEffect } from "react";
import { db } from "../firebase/config";

//definindo uma coleção, pegando um dado, ordenando e filtrando 
import{
    collection, 
    query, 
    orderBy, 
    onSnapshot, 
    where,
    } from "firebase/firestore"

export const useFetchDocuments = (docCollection, search=null, uid=null)=>{
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //Memory leak
    const [cancelled, setCancelled] = useState(false)

    //Mapeando o tipo de dado que esta chegando
    useEffect(()=>{
        //Buscando o dado no BD
        async function loadData(){
            if (cancelled) {
                return}

            setLoading(true)

            const collectionRef=await collection(db, docCollection)
            try{
                let q

                if (search){
                    q = await query(
                        collectionRef,
                        where("tags", "array-contains", search),
                        orderBy("createdAt", "desc")
                    )
                }else if(uid){
                    q = await query(
                        collectionRef,
                        where("uid", "==", uid),
                        orderBy("createdAt", "desc")
                    )
                }else{
                    //Criando a busca de dados ordenados pela data de criação mais recente
                    q=await query(collectionRef, orderBy("createdAt", "desc"))
                }
                    
                

                //Função para mapear um dado alterado.
                await onSnapshot(q, (querySnapshot)=>{
                    setDocuments(
                        querySnapshot.docs.map((doc)=>({
                            id: doc.id,
                            ...doc.data()
                        }))
                    )
                    
                })

            }catch(error){
                console.log(error)
                setError(error.message)
                
            }
            setLoading(false)
        }
        loadData()

    },[docCollection, search, uid, cancelled])

    useEffect(() =>{
        return() => setCancelled(true)
    },[])

    return {documents, loading, error}
}