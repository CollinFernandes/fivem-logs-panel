import NextTopLoader from 'nextjs-toploader';
import Header from '@/components/dash/header';
import Sidebar from '@/components/dash/sidebar';

const DashAuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen">
      <NextTopLoader crawl showSpinner={false} color="#fff" height={2} easing="ease" />
      <Header />
      <Sidebar />
      <main className="pt-20 pl-[21.3rem] pr-5 pb-5">{children}</main>
    </div>
  );
};

export default DashAuthLayout;
