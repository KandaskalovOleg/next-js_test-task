import React, { useState } from 'react';
import UserList from '../components/UserList';
import { User, UserListProps } from '../types/types';
import { GetStaticProps } from 'next';

export default function Home({ users }: UserListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
      
    if (!inputValue.startsWith(' ') && !(/ {2,}/.test(inputValue))) {
      setSearchTerm(inputValue);
    }
  };

  return (
    <>
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold text-blue-500">User List</h1>
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full pr-10"
          />
          {searchTerm && (
            <button
              className="absolute top-0 right-0 h-full w-8 text-gray-600 outline-none cursor-pointer transition ease-in-out duration-300 hover:text-gray-800 focus:text-gray-800 pr-3"
              onClick={() => setSearchTerm('')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <UserList users={users} searchTerm={searchTerm} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users: User[] = await response.json();
    return {
      props: {
        users
      }
    };
  } catch (error) {
    return {
      props: {
        users: []
      }
    };
  }
}
