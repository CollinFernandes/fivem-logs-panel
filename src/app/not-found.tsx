import { redirect } from 'next/navigation';
import { DEFAULT_REDIRECT } from '@/middleware';

const NotFound = () => {
  redirect(DEFAULT_REDIRECT);
};

export default NotFound;
