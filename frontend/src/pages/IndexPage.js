import Post from '../components/Post';
import { useState, useEffect } from 'react';

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:7777/post').then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <div>
      <form className='search-form' method='get'>
        <input
          type='text'
          placeholder='검색어를 입력하세요.'
          className='search-input'
        />
      </form>
      {posts.length > 0 && posts.map((post) => <Post {...post} />)}
    </div>
  );
}
