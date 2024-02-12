import styles from './CreatePost.module.css'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'


const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  const handleSubmit = (e)=>{
    e.preventDefault()
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
          required
          placehokder="Pense em um bom título..."
          onChange={(e)=>setTitle(e.target.value)}
          value={title} />
        </label>
        <label>
          <span>URL da Imagem:</span>
          <input type="text"
          name="image"
          required
          placehokder="Insira uma imagem que representa o seu post."
          onChange={(e)=>setImage(e.target.value)}
          value={image} />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
          name="body"
          required
          placeholder='Insira o conteúdo do post'
          onChange={(e)=>setBody(e.target.value)}
          value={body}/>
        </label>
        <label>
          <span>Tags:</span>
          <input type="text"
          name="tags"
          required
          placehokder="Insira as tags separadas por virgulas"
          onChange={(e)=>setTags(e.target.value)}
          value={tags} />
        </label>
        <button className='btn'>Cadastrar</button>
       
        {/*{!loading && <button className='btn'>Cadastrar</button>}
        
        {loading && <button className='btn'disable>Aguarde...</button>}
        
         
        {errorFront && <p className='error'>{errorFront}</p>}*/ }
      </form>
    </div>
  )
}

export default CreatePost
