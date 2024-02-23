import styles from './EditPost.module.css'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import { useFetchDocument } from '../../hooks/useFetchDocument' 
import { useInsertDocument } from '../../hooks/useInsertDocument'


const EditPost = () => {
  
  const {id} = useParams()
  const {document: post}= useFetchDocument("posts", id)

  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  const user =useAuthValue()
  const navigate = useNavigate()
  const {updateDocument, response} = useUpdateDocument("posts")

  //Buscando os dados do post para ediçao
  useEffect(()=>{
    if (post){
      setTitle(post.title)
      setBody(post.body)
      setImage(post.image)

      //tratando as tags e transformando-as em texto para serem editadas
      const textTags = post.tagsArray.join(", ")
      setTags(textTags)
    }
  }, [post])
  

  const handleSubmit = (e)=>{
    e.preventDefault()
    setFormError("")
    
    //validar url da imagem
    try{
      new URL(image) 
    }catch{
      setFormError("A imagem precisa ser uma URL")
      return
    }

    //criar o array de tags
    const tagsArray = tags.split(",").map((tag)=>tag.trim().toLowerCase())
    
    //checar todos os valores
    if(!title || !image || !tags || !body){
      setFormError("Por favor preencha todos os campos")
      return
    }

    if(formError){
      return
    } 

    const data = {
      title, 
      image,
      body,
      tagsArray,
      uid:user.uid,
      createdBy: user.displayName,
    }

    updateDocument(id, data)

    //Redirect home
    navigate("/dashboard")
    

  }

  return (
    <div className={styles.edit_post}>
      {/*Validando o post */}
      {post &&(
        <>
        <h2>Editando Post: {post.title}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input type="text"
          name="title"
          placeholder="Pense em um bom título..."
          onChange={(e)=>setTitle(e.target.value)}
          value={title} />
        </label>
        <label>
          <span>URL da Imagem:</span>
          <input type="text"
          name="image"
          placeholder="Insira uma imagem que representa o seu post."
          onChange={(e)=>setImage(e.target.value)}
          value={image} />
        </label>
        <p className={styles.preview_title}>Previa da imagem atual:</p>
        <img className={styles.image_preview}
        src={post.image}
        alt={post.title}
        />
        <label>
          <span>Conteúdo:</span>
          <textarea
          name="body"
          placeholder='Insira o conteúdo do post'
          onChange={(e)=>setBody(e.target.value)}
          value={body}/>
        </label>
        <label>
          <span>Tags:</span>
          <input type="text"
          name="tags"
          placehokder="Insira as tags separadas por virgulas"
          onChange={(e)=>setTags(e.target.value)}
          value={tags} />
        </label>
       
        {!response.loading && <button className='btn'>Salvar</button>}
        {response.loading && <button className='btn'disable>Aguarde...</button>}
        {formError && <p className='error'>{formError} </p>}
        {response.error && <p className='error'>{response.error}</p>}
      </form>
        </>
      )}
    </div>
  )
}

export default EditPost
