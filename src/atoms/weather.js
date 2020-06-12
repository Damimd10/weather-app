import { atom } from 'recoil';

export default atom({
  key: 'weather',
  default: {
    data: null,
    status: 'IDLE',
    error: null,
  },
});
