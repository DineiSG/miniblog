import styles from './Dashboard.module.css'

import { Link } from 'react-router-dom'


import { useAuthValue } from '../../context/AuthContext' //Pegando informação do usuário
import { useFetchDocuments } from '../../hooks/useFetchDocuments' //Chamando os posts do usuario
import { useDeleteDocument } from '../../hooks/useDeleteDocument' //Deletando um id do usuário
import CreatePost from '../CreatePost/CreatePost'

const Dashboard = () => {
  const user=useAuthValue() //Pegando o usuaro
  const uid = user.uid //pegando o id do usuario no useFetchDocument

  const {documents: posts, loading} = useFetchDocuments("posts", null, uid)
  const {deleteDocument} = useDeleteDocument("posts")


  if(loading){
    return <p>Carregando...</p>
  }


  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie seus posts</p>

      {/*Caso o usuário nao tenha post, sera exibida uma mensagem avisando e ele
      será redirecionado para a pagina de criar post, caso ele tenha, os posts serao exibidos */}
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Nao foram encontrados posts</p>
          <Link to='/posts/create' className='btn'>Criar primeiro post{CreatePost}</Link>
        </div>
      ) : (
        <>
        <div className={styles.post_header}>
          <span>Titulo</span>
          <span>Ações</span>
        </div>
          {posts && posts.map((post) =>(
          <div key={post.id} className={styles.post_row}>
            <p>{post.title}</p>
            <div>
              <Link to={`/posts/${post.id}`} className="btn btn-outline">
                Ver
              </Link>
              <Link to={`/posts/edit/${post.id}`}className="btn btn-outline">
                Editar
              </Link>
              <button onClick={()=> deleteDocument(post.id)} className='btn btn-outline btn-danger'>
                Excluir
              </button>
            </div>

          </div>))}
          
        </>
      )}

      
     
    </div>
  )
}

export default Dashboard
