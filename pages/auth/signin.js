import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';

const signin = ({ providers }) => {
  return (
    <div className='flex flex-col items-center space-y-20 pt-48'>
      <Image
        src='https://help.twitter.com/content/dam/help-twitter/brand/logo.png'
        alt='twitter-logo'
        width={250}
        height={250}
        objectFit='contain'
      />

      <div className='flex justify-center'>
        {Object.values(providers).map((provider) => (
          <div key={provider.name} className=''>
            <button
              className='relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all border-[#1d9bf0] border-2 bg-white rounded hover:bg-white group'
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            >
              <span className='w-48 h-48 rounded rotate-[-40deg] bg-[#1d9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0'></span>
              <span className='relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white'>
                Sign in with {provider.name}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};

export default signin;
