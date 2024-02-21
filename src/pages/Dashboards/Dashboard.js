import styles from './Dashboard.module.css'

import { Link } from 'react-router-dom'


import { useAuthValue } from '../../context/AuthContext' //Pegando informação do usuário
import { useFetchDocuments } from '../../hooks/useFetchDocuments' //Chamando os posts do usuario
import CreatePost from '../CreatePost/CreatePost'

const Dashboard = () => {
  const user=useAuthValue() //Pegando o usuaro
  const uid = user.uid //pegando o id do usuario no useFetchDocument

  const {documents: posts, loading} = useFetchDocuments("posts", null, uid) //

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Gerencie seus posts</p>

      {/*Caso o usuário nao tenha post, sera exibida uma mensagem avisando e ele
      será redirecionado para a pagina de criar post, caso ele tenha, os posts serao exibidos */}
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Nao foram encontrados posts</p>
          <Link to='/posts/create' className='btn'>Criar primeiro post</Link>
        </div>
      ) : (
        <div>
          <p>Tem posts</p>
        </div>
      )}

      {posts && posts.map((post) =>
      <h3>{post.title}</h3>)}
    </div>
  )
}

export default Dashboard
