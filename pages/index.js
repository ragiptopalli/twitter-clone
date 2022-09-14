import Head from 'next/head';
import Feed from '../components/feed/Feed';
import Sidebar from '../components/sidebar/Sidebar';
import Widgets from '../components/widgets/Widgets';

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

        <Feed />

        <Widgets />
      </main>
    </div>
  );
}
