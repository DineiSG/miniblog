//Nesta página serao exibidos os posts

import styles from './Post.module.css'

import {useParams} from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'

const Post = () => {
    const {id} = useParams()
    const{document:post, loading}=useFetchDocument("posts", id)
  return (
    <div>
      {loading && <p>Carregando post...</p>}  
      {post&&(
        <>
        <h1>{post.title}</h1>
        <img src={post.image} alt={post.title} />
        <p>{post.body}</p>
        <h3>Este post trata sobre:</h3>
        {post.tagsArray.map((tag)=>(
            <p key={tag}>
                <span>#</span>
                {tag}
            </p>
        ))}
        </>
      )}
    </div>
  )
}

export default Post
