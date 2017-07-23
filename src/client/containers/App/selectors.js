import { createStructuredSelector } from 'reselect';

const REDUCER = 'App';

const isOpenModal = state => state[REDUCER].isOpenModal;
const loginInfo = state => state[REDUCER].loginInfo;

export default createStructuredSelector({
  isOpenModal,
  loginInfo,
});
