import PostDetail from "../../components/PostDetail"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import { useQuery } from "../../hooks/useQuery"
import { Link } from "react-router-dom"
import styles from "./Search.module.css"



const Search = () => {
    const query = useQuery()
    const search = query.get("q")

    //Carregando os documentos de acordo com a busca que foi feita
    const {documents:posts} = useFetchDocuments("posts", search)

  return (
    <div className={styles.search_container}>
      <h1>Resultados encontrados para: {search}</h1>
      <div className={styles.noposts}>
        {posts && posts.length === 0 &&(
            
            <div className={styles.noposts}>
            <p>Nao foram encontrados posts à partir da sua busca...</p>
            <Link to="/" className="btn btn-dark" >Voltar</Link>
            </div>
        )}
        {posts && posts.map ((post)=>(
            <PostDetail key={post.id} post={post}/>
        ))}
      </div>
    </div>
  )
}

export default Search
