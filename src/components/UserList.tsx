import React, { useEffect } from 'react';
import Link from 'next/link';
import { User, UserListProps } from '../types/types';
import { useLoader } from '../context/LoaderContext';

export default function UserList({ users, searchTerm }: UserListProps) {
  const { showLoader, hideLoader } = useLoader();
  
  useEffect(() => {
    hideLoader();
  }, []);

  let filteredUsers = users;

  if (searchTerm) {
    filteredUsers = users.filter(user => {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredUsers.map((user: User) => (
        <div key={user.id}>
          <Link href={`/${user.id}`} key={user.id} onClick={showLoader}>
            <div
              className="border p-4 rounded transition-shadow duration-300 hover:shadow-md cursor-pointer active:shadow-inner"
            >
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.address.street}, {user.address.suite}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
