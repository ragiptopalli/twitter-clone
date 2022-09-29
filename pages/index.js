import Head from 'next/head';
import CommentModal from '../components/commentModal/CommentModal';
import Feed from '../components/feed/Feed';
import Sidebar from '../components/sidebar/Sidebar';
import Widgets from '../components/widgets/Widgets';

export default function Home({ newsResults, userResults }) {
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

        <Widgets
          newsResults={newsResults.articles}
          userResults={userResults.results}
        />

        <CommentModal />
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  // Getting random news results with specified category and country - US
  const newsResults = await fetch(
    'https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json'
  ).then((res) => res.json());

  // Getting random user results with specified country - US
  const userResults = await fetch(
    'https://randomuser.me/api/?results=30&inc=name,login,picture&nat=us'
  ).then((res) => res.json());

  return {
    props: {
      newsResults,
      userResults,
    },
  };
}
