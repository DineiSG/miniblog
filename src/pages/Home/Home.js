//Importando o css
import styles from './Home.module.css'

import { useNavigate, Link} from 'react-router-dom'
import { useState } from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

//components
import PostDetail from '../../components/PostDetail'



const Home = () => {
  //state de busca
  const [query, setQuery]= useState("")
  const {documents:posts, loading} = useFetchDocuments("posts")
  const navigate = useNavigate()

  const handleSubmit=(e)=>{
    e.preventDefault()

    if (query) {
      return navigate(`/search?q=${query}`)
    }
  }


  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input type="text" 
        placeholder="Ou busque por tags..." 
        onChange={(e)=>setQuery(e.target.value)} />
        <button className='btn btn-dark'>Pesquisar</button>
      </form>
      <div>
        <h1>Posts...</h1>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post)=>(
          <PostDetail key={post.id} post={post}/>
        ))}
        {/*Caso nao tenha nenhum post o usuário sera redirecionado à pagina Criar Post */}
        {posts && posts.length === 0 &&(
          <div className={styles.noposts}>
            <p>Nao foram encontrados posts.</p>
            <Link to="/posts/create" className='btn'>
              Criar primeiro post
            </Link>

          </div>  
        )}
      </div>
    </div>
  )
}

export default Home
