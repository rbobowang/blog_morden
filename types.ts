
export enum Category {
  FINANCE = '财经新闻',
  TECH = '现代科技',
  IT = 'IT 知识',
  HEALTH = '运动健康',
  MEDIA = '影视音乐',
  RESONANCE = '共鸣溢价'
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
