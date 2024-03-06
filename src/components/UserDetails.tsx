import { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { UserProps } from '../types/types';
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? 'none';

export default function UserDetails({ user }: UserProps ) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
      <div className="bg-white shadow-lg rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex justify-between mb-8">
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="mt-1 text-gray-600">{user?.username}</p>
          </div>
          <p className="mt-1 text-gray-600">{user?.email}</p>
        </div>
        <div className="border-t border-gray-200 divide-y divide-gray-200">
          <div className="py-3 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:p-5 hover:bg-gray-100 transition-colors duration-300">
            <span className="text-sm font-medium text-gray-500">Address:</span>
            <span className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.address.street}, {user?.address.suite}, {user?.address.city}, {user?.address.zipcode}</span>
          </div>
          <div className="py-3 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:p-5 hover:bg-gray-100 transition-colors duration-300">
            <span className="text-sm font-medium text-gray-500">Phone:</span>
            <span className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {user?.phone}</span>
          </div>
          <div className="py-3 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:p-5 hover:bg-gray-100 transition-colors duration-300">
            <span className="text-sm font-medium text-gray-500">Website:</span>
            <span className="mt-1 text-sm text-blue-500 sm:mt-0 sm:col-span-2">
              <a href={`https://${user?.website}`} className='cursor-pointer hover:underline' target="_blank" rel="noopener noreferrer"> {user?.website}</a>
            </span>
          </div>
          <div className="py-3 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:p-5 hover:bg-gray-100 transition-colors duration-300">
            <span className="text-sm font-medium text-gray-500">Company:</span>
            <span className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {user?.company.name}, {user?.company.catchPhrase}, {user?.company.bs}</span>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg">
        <div className="px-4 py-5 sm:px-6 h-full">
          {isLoaded && (
            <GoogleMap
              center={{
                lat: parseFloat(user?.address.geo.lat),
                lng: parseFloat(user?.address.geo.lng)
              }}
              zoom={3}
              mapContainerStyle={{ height: '100%', width: '100%', minHeight: '350px' }}
            >
              <Marker position={{ lat: parseFloat(user?.address.geo.lat), lng: parseFloat(user?.address.geo.lng) }} />
            </GoogleMap>
          )}
        </div>
      </div>
    </section>
  );
};
