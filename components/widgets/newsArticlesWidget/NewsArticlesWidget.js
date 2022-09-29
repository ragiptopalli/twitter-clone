/* eslint-disable @next/next/no-img-element */
const News = ({ article }) => {
  return (
    <a href={article.url} target='_blank' rel='noreferrer'>
      <div className='px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-500 ease-out border-b border-gray-200 '>
        <div className='mt-3'>
          <h6 className='text-sm font-bold'>{article.title}</h6>
        </div>
        <img
          className='rounded-xl mt-2'
          width='240'
          height='70'
          src={article.urlToImage}
          alt={article.title}
        />
      </div>
    </a>
  );
};

export default News;
