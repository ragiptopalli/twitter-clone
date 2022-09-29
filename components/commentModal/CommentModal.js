import { useRecoilState } from 'recoil';
import { modalState } from '../../atmos/commentModalAtom';

const CommentModal = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);

  return (
    <div>
      <h1>Comment Modal</h1>
      {isModalOpen && <h1>The modal is opened</h1>}
    </div>
  );
};

export default CommentModal;
