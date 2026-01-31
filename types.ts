
export enum Category {
  FINANCE = 'Finance',
  TECH = 'Tech',
  IT = 'IT Knowledge',
  HEALTH = 'Health & Sports',
  MEDIA = 'Movies & Music'
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: Category;
  author: string;
  date: string;
  imageUrl: string;
  aiSummary?: string;
  tags: string[];
}

export interface User {
  name: string;
  role: string;
  avatar: string;
}
