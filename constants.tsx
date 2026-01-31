
import React from 'react';
import { Category, BlogPost } from './types';

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of AI in Modern Finance',
    content: 'As we move further into the 2020s, the integration of generative AI into stock market analysis is becoming more than just a trend—it is a necessity. Algorithms are now processing millions of data points per second to predict commodity price fluctuations with unprecedented accuracy...',
    category: Category.FINANCE,
    author: 'Nova Admin',
    date: '2024-05-20',
    imageUrl: 'https://picsum.photos/800/450?random=1',
    tags: ['AI', 'Stocks', 'FinTech']
  },
  {
    id: '2',
    title: 'Optimizing TypeScript Performance in Large Scale Apps',
    content: 'TypeScript has revolutionized frontend development, but as projects grow, build times can become a bottleneck. In this post, we explore techniques like project references and narrowing types to keep your developer experience smooth...',
    category: Category.IT,
    author: 'Tech Guru',
    date: '2024-05-18',
    imageUrl: 'https://picsum.photos/800/450?random=2',
    tags: ['React', 'TypeScript', 'Frontend']
  },
  {
    id: '3',
    title: 'The Rise of Bio-Hacking and Personalized Fitness',
    content: 'Modern athletes are no longer just training hard; they are training smart. Using wearable technology and real-time biometric feedback, the gap between professional sports and amateur fitness is narrowing...',
    category: Category.HEALTH,
    author: 'Coach K',
    date: '2024-05-15',
    imageUrl: 'https://picsum.photos/800/450?random=3',
    tags: ['Fitness', 'HealthTech', 'Wellness']
  }
];
