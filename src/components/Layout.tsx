import { ReactNode } from 'react';
import Breadcrumbs from './Breadcrumbs';
import { useLoader } from '../context/LoaderContext';
import Loader from './Loader';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isLoading } = useLoader();

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4">Test task</header>
      <main className="flex-grow container mx-auto px-4 mb-10">
        {isLoading && <Loader />}
        <Breadcrumbs />
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4">Footer</footer>
    </div>
  );
};
