import styles from './CreatePost.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'


const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  const user =useAuthValue()
  const navigate = useNavigate()
  const {insertDocument, response} = useInsertDocument("posts")
  

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

    insertDocument({
      title, 
      image,
      body,
      tagsArray,
      uid:user.uid,
      createdBy: user.displayName,
    })

    //Redirect home
    navigate("/")
    

  }

  return (
    <div className={styles.create_post}>
      <h2>Criar Post</h2>
      <p>Escreva sobre o que quiser! Compartilhe o seu conhecimento!</p>
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
       
        {!response.loading && <button className='btn'>Cadastrar</button>}
        {response.loading && <button className='btn'disable>Aguarde...</button>}
        {formError && <p className='error'>{formError} </p>}
        {response.error && <p className='error'>{response.error}</p>}
      </form>
    </div>
  )
}

export default CreatePost
