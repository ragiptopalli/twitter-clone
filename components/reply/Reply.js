import {
  ChartBarIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid';

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from '../../firebase';

import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Moment from 'react-moment';

import { modalState } from '../../atmos/commentModalAtom';
import { postIdState } from '../../atmos/commentModalAtom';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

const Reply = ({ reply, replyId, originalPostId }) => {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalPostId, setModalPostId] = useRecoilState(postIdState);

  const router = useRouter();

  useEffect(() => {
    return onSnapshot(
      collection(db, 'posts', originalPostId, 'replies', replyId, 'likes'),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db, originalPostId]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uuid) !== -1
    );
  }, [likes]);

  const likeReply = async () => {
    if (session) {
      if (hasLiked) {
        await deleteDoc(
          doc(
            db,
            'posts',
            originalPostId,
            'replies',
            replyId,
            'likes',
            session?.user.uuid
          )
        );
      } else {
        await setDoc(
          doc(
            db,
            'posts',
            originalPostId,
            'replies',
            replyId,
            'likes',
            session?.user.uuid
          ),
          {
            username: session?.user.username,
          }
        );
      }
    } else {
      signIn();
    }
  };

  const deleteReply = async () => {
    if (window.confirm('Are you sure you want to delete this reply!')) {
      deleteDoc(doc(db, 'posts', originalPostId, 'replies', replyId));
    }
  };

  return (
    <div className='flex p-3 cursor-pointer border-b border-gray-200 pl-20'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className='w-11 h-11 rounded-full mr-4'
        src={reply?.userImage}
        referrerPolicy='no-referrer'
        alt=''
      />
      <div className='flex-1'>
        <div className='flex items-center justify-between'>
          <div className='flex space-x-1 items-center whitespace-nowrap'>
            <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>
              {reply?.name}
            </h4>
            <span className='text-sm sm:text-[15px]'>
              @{reply?.username} -{' '}
            </span>
            <span className='text-sm sm:text-[15px] hover:underline'>
              <Moment fromNow>{reply?.timestamp?.toDate()}</Moment>
            </span>
          </div>
          <EllipsisHorizontalIcon className='hoverEffect h-10 w-10 hover:bg-sky-100 hover:text-sky-500 p-1' />
        </div>

        <p className='text-gray-800 text-[15px] sm:text-[16px] mb-2'>
          {reply?.comment}
        </p>

        {/* Icons for posts */}
        <div className='flex justify-between text-gray-500 p-2'>
          <div className='flex items-center'>
            <ChatBubbleOvalLeftIcon
              onClick={() => {
                if (!session) {
                  signIn();
                } else {
                  setModalPostId(originalPostId);
                  setModalOpen(!modalOpen);
                }
              }}
              className='h-9  w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100'
            />
          </div>

          {session?.user.uuid === reply?.userId && (
            <TrashIcon
              onClick={deleteReply}
              className='h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100'
            />
          )}
          <div className='flex items-center'>
            {hasLiked ? (
              <HeartIconFilled
                onClick={likeReply}
                className='h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100'
              />
            ) : (
              <HeartIcon
                onClick={likeReply}
                className='h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100'
              />
            )}
            {likes.length > 0 && (
              <span
                className={`${hasLiked && 'text-red-500'} text-sm select-none`}
              >
                {likes.length}
              </span>
            )}
          </div>
          <ShareIcon className='h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100' />
          <ChartBarIcon className='h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100' />
        </div>
      </div>
    </div>
  );
};

export default Reply;
