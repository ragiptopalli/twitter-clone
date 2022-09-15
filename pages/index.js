import Head from 'next/head';
import Feed from '../components/feed/Feed';
import Sidebar from '../components/sidebar/Sidebar';
import Widgets from '../components/widgets/Widgets';

export default function Home({ newsResults }) {
  return (
    <div>
      <Head>
        <title>Twitter Clone App</title>
        <meta name='description' content='Twitter Clone using NextJs' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex min-h-screen max-w-7xl mx-auto'>
        <div>
          <Sidebar />
        </div>

        <Feed />

        <Widgets newsResults={newsResults.articles} />
      </main>
    </div>
  );
}

//https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json

export async function getServerSideProps() {
  const newsResults = await fetch(
    'https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json'
  ).then((res) => res.json());

  return {
    props: {
      newsResults,
    },
  };
}
