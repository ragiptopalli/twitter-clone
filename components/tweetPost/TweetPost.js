import {
  ChartBarIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

const TweetPost = ({ post }) => {
  return (
    <div className='flex p-3 cursor-pointer border-b border-gray-200'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className='w-11 h-11 rounded-full mr-4'
        src={post.userImage}
        alt={post.userName}
      />
      <div className=''>
        <div className='flex items-center justify-between'>
          <div className='flex space-x-1 items-center whitespace-nowrap'>
            <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>
              {post.name}
            </h4>
            <span className='text-sm sm:text-[15px]'>@{post.username} - </span>
            <span className='text-sm sm:text-[15px] hover:underline'>
              {post.timestamp}
            </span>
          </div>
          <EllipsisHorizontalIcon className='hoverEffect h-10 w-10 hover:bg-sky-100 hover:text-sky-500 p-1' />
        </div>

        <p className='text-gray-800 text-[15px] sm:text-[16px] mb-2'>
          {post.tweetText}
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className='rounded-2xl mr-2'
          src={post.tweetImage}
          alt={post.tweetText}
        />
        {/* Icons for posts */}
        <div className='flex justify-between text-gray-500 p-2'>
          <ChatBubbleOvalLeftIcon className='h-9  w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100' />
          <TrashIcon className='h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100' />
          <HeartIcon className='h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100' />
          <ShareIcon className='h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100' />
          <ChartBarIcon className='h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100' />
        </div>
      </div>
    </div>
  );
};

export default TweetPost;
