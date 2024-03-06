import { useEffect } from 'react';
import UserDetails from '../components/UserDetails';
import { User, UserProps } from '../types/types';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useLoader } from '../context/LoaderContext';

export default function UserDetailsPage({ user }: UserProps) {
  const { hideLoader } = useLoader();
  
  useEffect(() => {
    hideLoader();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-500 mb-8">User Details</h1>
      <UserDetails user={user} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users: User[] = await response.json();

  const paths = users.map(user => ({
    params: { id: user.id.toString() }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const userId = params?.id;

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const user: User = await response.json();

    return {
      props: {
        user
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};
