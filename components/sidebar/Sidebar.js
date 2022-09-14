import Image from 'next/image';
import SidebarMenuItem from '../sidebarMenu/SidebarMenuItem';

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
        <SidebarMenuItem text='Notifications' Icon={BellIcon} />
        <SidebarMenuItem text='Messages' Icon={InboxIcon} />
        <SidebarMenuItem text='Bookmarks' Icon={BookmarkIcon} />
        <SidebarMenuItem text='Lists' Icon={ClipboardIcon} />
        <SidebarMenuItem text='Profile' Icon={UserIcon} />
        <SidebarMenuItem text='More' Icon={EllipsisHorizontalCircleIcon} />
      </div>

      <button className='bg-blue-400 text-white rounded-full w-56 h-12 font-bold text-lg shadow-md hover:brightness-95 hidden xl:inline'>
        Tweet
      </button>

      <div className='hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className='rounded-full xl:mr-4'
          width='50'
          height='50'
          src='https://avatars.githubusercontent.com/u/18445276?v=4'
          alt='user-img'
        />
        <div className='leading-5 hidden xl:inline'>
          <h4 className='font-bold'>Ragip Topalli</h4>
          <p className='text-gray-500'>@ragiptopalli</p>
        </div>
        <EllipsisHorizontalIcon className='h-5 xl:ml-8 hidden xl:inline' />
      </div>
    </div>
  );
};

export default Sidebar;
