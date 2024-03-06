import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLoader } from '../context/LoaderContext';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathnames = pathname ? pathname.split('/').filter((x) => x) : [];
  const { showLoader } = useLoader();

  return (
    <nav className="text-sm font-medium my-8">
      <ul className="list-none p-0 inline-flex">
        <li className="flex items-center">
          {pathnames.length >= 1 ? (
            <Link href="/" onClick={showLoader}>
              <span className="text-blue-500">Home</span>
            </Link>
          ) : (
            <span className="text-gray-500">Home</span>
          )}
          <svg
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </li>
        {pathnames.map((pathname, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={pathname} className="flex items-center">
              {!isLast ? (
                <Link href={routeTo}>
                  <span className="text-blue-500" onClick={showLoader}>{pathname}</span>
                </Link>
              ) : (
                <span className="text-gray-500">{pathname}</span>
              )}
              {!isLast && (
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
