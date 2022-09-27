import Image from 'next/image';
import SidebarMenuItem from '../sidebarMenu/SidebarMenuItem';

import { signIn, useSession, signOut } from 'next-auth/react';

import { HomeIcon, HashtagIcon } from '@heroicons/react/20/solid';

import {
  BookmarkIcon,
  InboxIcon,
  BellIcon,
  ClipboardIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <div className='hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24'>
      <div className='hoverEffect p-0 hover:bg-blue-100 xl:px-1 flex items-center justify-center'>
        <Image
          src='https://help.twitter.com/content/dam/help-twitter/brand/logo.png'
          alt='twitter-logo'
          width='50'
          height='50'
        ></Image>
      </div>

      <div className='mt-4 mb-2.5 xl:items-start'>
        <SidebarMenuItem text='Home' Icon={HomeIcon} active />
        <SidebarMenuItem text='Explore' Icon={HashtagIcon} />
        {session && (
          <>
            <SidebarMenuItem text='Notifications' Icon={BellIcon} />
            <SidebarMenuItem text='Messages' Icon={InboxIcon} />
            <SidebarMenuItem text='Bookmarks' Icon={BookmarkIcon} />
            <SidebarMenuItem text='Lists' Icon={ClipboardIcon} />
            <SidebarMenuItem text='Profile' Icon={UserIcon} />
            <SidebarMenuItem text='More' Icon={EllipsisHorizontalCircleIcon} />
          </>
        )}
      </div>

      {session ? (
        <>
          <button className='bg-blue-400 text-white rounded-full w-56 h-12 font-bold text-lg shadow-md hover:brightness-95 hidden xl:inline'>
            Tweet
          </button>

          <div className='hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              onClick={signOut}
              className='rounded-full xl:mr-4'
              width='50'
              height='50'
              src={session.user.image}
              alt='user-img'
            />
            <div className='leading-5 hidden xl:inline'>
              <h4 className='font-bold'>{session.user.name}</h4>
              <p className='text-gray-500'>@{session.user.username}</p>
            </div>
            <EllipsisHorizontalIcon className='h-5 xl:ml-8 hidden xl:inline' />
          </div>
        </>
      ) : (
        <>
          <button
            className='bg-blue-400 text-white rounded-full w-36 h-12 font-bold text-lg shadow-md hover:brightness-95 hidden xl:inline'
            onClick={signIn}
          >
            Sign In
          </button>
        </>
      )}
    </div>
  );
};

export default Sidebar;
