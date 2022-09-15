import Image from 'next/image';
import React from 'react';

const UserToFollowWidget = ({ user }) => {
  const fullName = user.name.first + ' ' + user.name.last;
  return (
    <div className='flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200'>
      <Image
        className='rounded-full'
        width='40'
        height='40'
        alt={user.login.username}
        src={user.picture.thumbnail}
      />
      <div className='truncate ml-4 leading-5'>
        <h4 className='font-bold hover:underline text-[14px] truncate'>
          {user.login.username}
        </h4>
        <h5 className='text-[13px] text-gray-500 truncate'>{fullName}</h5>
      </div>
      <button className='ml-auto bg-blue-400 shadow-md hover:brightness-95 text-white rounded-full text-sm px-3.5 py-1.5 font-bold'>
        Follow
      </button>
    </div>
  );
};

export default UserToFollowWidget;
