import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Head from 'next/head';
import CommentModal from '../../components/commentModal/CommentModal';
import Sidebar from '../../components/sidebar/Sidebar';

import Widgets from '../../components/widgets/Widgets';

import { useRouter } from 'next/router';
import TweetPost from '../../components/tweetPost/TweetPost';
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

const PostPage = ({ newsResults, userResults }) => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    return onSnapshot(doc(db, 'posts', id), (snapshot) => setPost(snapshot));
  }, [db, id]);

  return (
    <div>
      <Head>
        <title>Post Title Page</title>
        <meta name='description' content='Twitter Clone using NextJs' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex min-h-screen max-w-7xl mx-auto'>
        <div>
          <Sidebar />
        </div>

        <div className='xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl'>
          <div className='flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
            <div className='flex items-center hoverEffect'>
              <ArrowLeftIcon
                onClick={() => router.push('/')}
                className='h-6 pl-4'
              />
            </div>
            <h2 className='text-lg sm:text-xl font-bold cursor-pointer flex items-center justify-center'>
              Replies
            </h2>
          </div>
          <TweetPost id={id} post={post} />
        </div>

        <Widgets
          newsResults={newsResults?.articles}
          userResults={userResults?.results}
        />

        <CommentModal />
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  // Getting random news results with specified category and country - US
  const newsResults = await fetch(
    'https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json'
  ).then((res) => res.json());

  // Getting random user results with specified country - US
  const userResults = await fetch(
    'https://randomuser.me/api/?results=30&inc=name,login,picture&nat=us'
  ).then((res) => res.json());

  return {
    props: {
      newsResults,
      userResults,
    },
  };
}

export default PostPage;
