import { useState } from 'react';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import News from './newsArticlesWidget/NewsArticlesWidget';
import UserToFollowWidget from './usersToFollowWidget/UsersToFollowWidget';

const Widgets = ({ newsResults, userResults }) => {
  const [articleNum, setArticleNum] = useState(3);
  const [usersNum, setUsersNum] = useState(3);

  return (
    <div className='xl:w-[600px] hidden lg:inline ml-8 space-y-5'>
      <div className='w-[90%] xl:w-[95%] sticky top-0 bg-white py-1.5 z-50'>
        <div className='flex items-center p-3 rounded-full relative'>
          <MagnifyingGlassIcon className='h-5 z-50 text-gray-500' />
          <input
            className='absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100'
            type='text'
            placeholder='Search Twitter'
          />
        </div>
      </div>

      <div className='text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[95%]'>
        <h4 className='font-bold text-xl px-4'>What&apos;s happening</h4>
        {newsResults.slice(0, articleNum).map((article) => (
          <News key={article.url} article={article} />
        ))}
        <button
          onClick={() => setArticleNum(articleNum + 3)}
          className='text-blue-300 pl-4 pb-3 hover:text-blue-400'
        >
          Show more
        </button>
      </div>
      <div className='sticky top-16 text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[95%]'>
        <h4 className='font-bold text-xl px-4'>Who to Follow</h4>
        {userResults.slice(0, usersNum).map((user) => (
          <UserToFollowWidget
            key={user.login.uuid}
            user={user}
          ></UserToFollowWidget>
        ))}
        <button
          onClick={() => setUsersNum(usersNum + 3)}
          className='text-blue-300 pl-4 pb-3 hover:text-blue-400'
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default Widgets;
