import { ListingType, PropertyType } from 'constants/post';

export interface IPostModalProps {
  visible: boolean;
  post?: Post;
  onCancel?: () => void;
}

export interface Image {
  name: string;
  base64: string;
}

export interface Post {
  id?: number | string;
  title: string;
  description: string;
  images: Image[];
  price: number;
  type: string;
  listingType: string;
  location: string;
  userId: number;
}
