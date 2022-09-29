import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '../../atmos/commentModalAtom';
import Modal from 'react-modal';
import {
  FaceSmileIcon,
  PhotoIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { db } from '../../firebase';
import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import Image from 'next/image';
import Moment from 'react-moment';

import { useSession } from 'next-auth/react';

import { useRouter } from 'next/router';

const CommentModal = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);
  const [modalPostId] = useRecoilState(postIdState);
  const [post, setPost] = useState([]);
  const [input, setInput] = useState('');

  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    return onSnapshot(doc(db, 'posts', modalPostId), (snapshot) => {
      setPost(snapshot);
      console.log(snapshot);
    });
  }, [modalPostId]);

  const sendComment = async () => {
    await addDoc(collection(db, 'posts', modalPostId, 'replies'), {
      comment: input,
      name: session.user.name,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });

    setIsModalOpen(false);
    setInput('');
    router.push(`/posts/${modalPostId}`);
  };

  return (
    <div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          className='max-w-lg w-[90%]  absolute top-24 left-[50%] translate-x-[-50%] bg-white border-1 border-gray-400 rounded-md shadow-md'
        >
          <div className='p-1'>
            <div className='border-b border-gray-200 py-2 px-1.5'>
              <div className='hoverEffect w-9 h-9 flex items-center justify-center'>
                <XMarkIcon
                  onClick={() => setIsModalOpen(false)}
                  className='h-[22px] text-gray-700'
                />
              </div>
            </div>
            <div className='p-2 flex items-center space-x-1 relative'>
              <span className='w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300' />
              <Image
                className='rounded-full'
                src={post?.data()?.userImage}
                height={44}
                width={44}
                referrerPolicy='no-referrer'
                alt=''
              />
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
            <p className='text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2'>
              {post?.data()?.tweetText}
            </p>

            <div className='flex p-2 space-x-3'>
              {/* eslint-disable-next-line  @next/next/no-img-element*/}
              <img
                className='rounded-full h-11 w-11'
                referrerPolicy='no-referrer'
                src={session.user.image}
                alt={session.user.name}
              />
              <div className='w-full divide-y divide-gray-200'>
                <div className=''>
                  <textarea
                    className='w-full border-none focus:ring-0 text-lg focus:placeholder-gray-300 placeholder-gray-600 tracking-wide min-h-[50px] text-gray-700'
                    rows='1'
                    placeholder='Tweet your reply'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                </div>

                <div className='flex items-center justify-between pt-2.5'>
                  <div className='flex'>
                    <div
                      className=''
                      onClick={() => pickFileRef.current.click()}
                    >
                      <PhotoIcon className='h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100' />
                      {/* <input
                        type='file'
                        hidden
                        ref={pickFileRef}
                        onChange={handlePostImage}
                      /> */}
                    </div>
                    <FaceSmileIcon className='h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100' />
                  </div>
                  <button
                    onClick={sendComment}
                    disabled={!input.trim()}
                    className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CommentModal;
