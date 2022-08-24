import Head from 'next/head';
import Sidebar from '../components/Sidebar/Sidebar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Twitter Clone App</title>
        <meta name='description' content='Twitter Clone using NextJs' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex min-h-screen max-w-7xl mx-auto'>
        <Sidebar />
      </main>
    </div>
  );
}
