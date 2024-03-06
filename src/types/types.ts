export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface UserProps {
  user: User;
}

export interface UserListProps {
  users: User[];
  searchTerm?: string;
}

export interface LoaderContextProps {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}
