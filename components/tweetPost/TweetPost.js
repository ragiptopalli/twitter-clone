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

const TweetPost = ({ post, id }) => {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [replies, setReplies] = useState([]);

  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalPostId, setModalPostId] = useRecoilState(postIdState);

  const router = useRouter();

  useEffect(() => {
    return onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
      setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    return onSnapshot(collection(db, 'posts', id, 'replies'), (snapshot) =>
      setReplies(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uuid) !== -1
    );
  }, [likes]);

  const likePost = async () => {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, 'posts', id, 'likes', session?.user.uuid));
      } else {
        await setDoc(doc(db, 'posts', id, 'likes', session?.user.uuid), {
          username: session.user.username,
        });
      }
    } else {
      signIn();
    }
  };

  const deletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post!')) {
      deleteDoc(doc(db, 'posts', id));
      if (post.data().image) {
        deleteObject(ref(storage, `posts/${id}/image`));
      }
      router.push('/');
    }
  };

  return (
    <div className='flex p-3 cursor-pointer border-b border-gray-200'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className='w-11 h-11 rounded-full mr-4'
        src={post?.data()?.userImage}
        referrerPolicy='no-referrer'
        alt=''
      />
      <div className='flex-1'>
        <div className='flex items-center justify-between'>
          <div className='flex space-x-1 items-center whitespace-nowrap'>
            <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>
              {post?.data()?.name}
            </h4>
            <span className='text-sm sm:text-[15px]'>
              @{post?.data()?.username} -{' '}
            </span>
            <span className='text-sm sm:text-[15px] hover:underline'>
              <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
            </span>
          </div>
          <EllipsisHorizontalIcon className='hoverEffect h-10 w-10 hover:bg-sky-100 hover:text-sky-500 p-1' />
        </div>

        <p className='text-gray-800 text-[15px] sm:text-[16px] mb-2'>
          {post?.data()?.tweetText}
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className='rounded-2xl mr-2'
          src={post?.data()?.tweetImage}
          alt=''
        />
        {/* Icons for posts */}
        <div className='flex justify-between text-gray-500 p-2'>
          <div className='flex items-center'>
            <ChatBubbleOvalLeftIcon
              onClick={() => {
                if (!session) {
                  signIn();
                } else {
                  setModalPostId(id);
                  setModalOpen(!modalOpen);
                }
              }}
              className='h-9  w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100'
            />
            {replies.length > 0 && (
              <span className='text-sm select-none'>{replies.length}</span>
            )}
          </div>

          {session?.user.uuid === post?.data()?.id && (
            <TrashIcon
              onClick={deletePost}
              className='h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100'
            />
          )}
          <div className='flex items-center'>
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className='h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100'
              />
            ) : (
              <HeartIcon
                onClick={likePost}
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

export default TweetPost;
