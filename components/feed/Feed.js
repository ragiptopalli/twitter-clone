import { SparklesIcon } from '@heroicons/react/24/outline';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import TweetInput from '../tweetInput/TweetInput';
import TweetPost from '../tweetPost/TweetPost';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, []);

  return (
    <div className='xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl'>
      <div className='flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
        <h2 className='text-lg sm:text-xl font-bold cursor-pointer flex items-center justify-center'>
          Home
        </h2>
        <div className='hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9'>
          <SparklesIcon className='h-5' />
        </div>
      </div>
      <TweetInput />
      {posts.map((post) => (
        <TweetPost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
