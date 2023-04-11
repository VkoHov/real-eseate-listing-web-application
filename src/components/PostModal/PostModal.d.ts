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
  title: string;
  description: string;
  price: number;
  type: string;
  location: string;
  images: Image[];
  id: string;
}
