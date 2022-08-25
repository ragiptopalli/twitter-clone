import { SparklesIcon } from '@heroicons/react/24/outline';
import TweetInput from '../TweetInput/TweetInput';
import TweetPost from '../TweetPost/TweetPost';

const Feed = () => {
  const posts = [
    {
      id: 1,
      name: 'Ragip Topalli',
      username: 'ragiptopalli',
      userImage: 'https://avatars.githubusercontent.com/u/18445276?v=4',
      tweetImage:
        'https://images.unsplash.com/photo-1661352483938-a71afc58db4a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80',
      tweetText: 'Nice view!',
      timestamp: '1 week ago',
    },
    {
      id: 2,
      name: 'Ragip Topalli',
      username: 'ragiptopalli',
      userImage: 'https://avatars.githubusercontent.com/u/18445276?v=4',
      tweetImage:
        'https://images.unsplash.com/photo-1657299142997-cb45f5dfa9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      tweetText: 'Hey there, beautiful day',
      timestamp: '2 years ago',
    },
    {
      id: 3,
      name: 'Ragip Topalli',
      username: 'ragiptopalli',
      userImage: 'https://avatars.githubusercontent.com/u/18445276?v=4',
      tweetImage:
        'https://images.unsplash.com/photo-1661273510842-8ac124ef4e91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      tweetText: 'Just another day in my neighborhood',
      timestamp: '4 days ago',
    },
    {
      id: 4,
      name: 'Ragip Topalli',
      username: 'ragiptopalli',
      userImage: 'https://avatars.githubusercontent.com/u/18445276?v=4',
      tweetImage:
        'https://images.unsplash.com/photo-1661324593223-e906644f88d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
      tweetText: 'Just washing my car today nthg much!.',
      timestamp: '12 hours ago',
    },
    {
      id: 5,
      name: 'Ragip Topalli',
      username: 'ragiptopalli',
      userImage: 'https://avatars.githubusercontent.com/u/18445276?v=4',
      tweetImage:
        'https://images.unsplash.com/photo-1657214058650-31cc8400713b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80',
      tweetText: 'PC BUILDING DAY!',
      timestamp: '1 month ago',
    },
  ];
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
