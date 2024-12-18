import { auth } from '@/auth';

const Header = async () => {
  const session = await auth();

  return (
    <header className="fixed top-0 left-0 w-screen h-[4.2rem] bg-background border-b z-20">
      <ul className="w-full h-full ps-[21.3rem] pr-2 flex flex-row items-center justify-between">
        <li className="flex flex-row items-center"></li>
        <li className="flex flex-row items-center">
          <div className="flex flex-col justify-center text-end">
            <p className="font-bold leading-5">{session?.user?.name}</p>
            <p className="text-blue-500 text-sm leading-3">{(session?.user as { group: string }).group}</p>
          </div>

          <img src={session?.user?.image ?? '/images/profile_placeholder.jpg'} alt="Discord Avatar" className="size-11 rounded-md ml-1.5" />
        </li>
      </ul>
    </header>
  );
};

export default Header;
