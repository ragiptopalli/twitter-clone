import { useRef, useState } from 'react';

import { useSession, signOut } from 'next-auth/react';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db, storage } from '../../firebase';

import {
  FaceSmileIcon,
  PhotoIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import Image from 'next/image';

const TweetInput = () => {
  const { data: session } = useSession();
  const [input, setInput] = useState('');
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickFileRef = useRef(null);

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);
    const docRef = await addDoc(collection(db, 'posts'), {
      id: session.user.uuid,
      name: session.user.name,
      username: session.user.username,
      email: session.user.email,
      userImage: session.user.image,
      tweetText: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedImageFile) {
      await uploadString(imageRef, selectedImageFile, 'data_url').then(
        async () => {
          const downloadURL = await getDownloadURL(imageRef);

          await updateDoc(doc(db, 'posts', docRef.id), {
            tweetImage: downloadURL,
          });
        }
      );
    }

    setInput('');
    setSelectedImageFile(null);
    setLoading(false);
  };

  const handlePostImage = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedImageFile(readerEvent.target.result);
    };
  };

  return (
    <>
      {session && (
        <div className='flex border-b border-gray-200 p-3 space-x-3'>
          {/* eslint-disable-next-line  @next/next/no-img-element*/}
          <img
            onClick={signOut}
            className='rounded-full cursor-pointer hover:brightness-95 h-12 w-12'
            width='60'
            height='60'
            referrerPolicy='no-referrer'
            src={session.user.image}
            alt={session.user.name}
          />
          <div className='w-full divide-y divide-gray-200'>
            <div className=''>
              <textarea
                className='w-full border-none focus:ring-0 text-lg focus:placeholder-gray-300 placeholder-gray-600 tracking-wide min-h-[50px] text-gray-700'
                rows='2'
                placeholder="What's happening?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
              {selectedImageFile && (
                <div className='relative'>
                  <XMarkIcon
                    onClick={() => setSelectedImageFile(null)}
                    className='h-5 text-black absolute hover:text-blue-400 z-10 cursor-pointer rounded-full'
                  />
                  <Image
                    src={selectedImageFile}
                    alt='twitter-logo'
                    width={1200}
                    height={980}
                    objectFit='contain'
                    className={`${loading && 'animate-pulse'}`}
                  />
                </div>
              )}
            </div>

            <div className='flex items-center justify-between pt-2.5'>
              {!loading && (
                <>
                  <div className='flex'>
                    <div
                      className=''
                      onClick={() => pickFileRef.current.click()}
                    >
                      <PhotoIcon className='h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100' />
                      <input
                        type='file'
                        hidden
                        ref={pickFileRef}
                        onChange={handlePostImage}
                      />
                    </div>
                    <FaceSmileIcon className='h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100' />
                  </div>
                  <button
                    onClick={sendPost}
                    disabled={!input.trim()}
                    className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'
                  >
                    Tweet
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TweetInput;
