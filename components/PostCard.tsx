
import React from 'react';
import { BlogPost } from '../types';
import { Calendar, User, ArrowUpRight } from 'lucide-react';

interface PostCardProps {
  post: BlogPost;
  onClick: (post: BlogPost) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  return (
    <div 
      onClick={() => onClick(post)}
      className="group relative flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.08] transition-all cursor-pointer hover:border-blue-500/30"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 glass rounded-full text-xs font-semibold text-blue-400">
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            {post.date}
          </div>
          <div className="flex items-center gap-1">
            <User size={14} />
            {post.author}
          </div>
        </div>

        <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-1">
          {post.content}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex gap-2">
            {post.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[10px] uppercase tracking-wider text-gray-500 font-bold border border-white/10 px-2 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
