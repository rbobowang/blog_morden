
import React, { useState } from 'react';
import { BlogPost } from '../types';
import { X, Sparkles, Loader2, Share2, Heart } from 'lucide-react';
import { summarizePost } from '../services/geminiService';

interface PostDetailProps {
  post: BlogPost;
  onClose: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onClose }) => {
  const [summary, setSummary] = useState<string | null>(post.aiSummary || null);
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (summary) return;
    setLoading(true);
    const res = await summarizePost(post.content);
    setSummary(res);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl max-h-[90vh] glass rounded-3xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        {/* Header Image */}
        <div className="relative h-64 md:h-80 shrink-0">
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 glass rounded-full hover:bg-white/20 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 -mt-10 relative">
          <div className="mb-6">
            <span className="px-4 py-1 bg-blue-600 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
              {post.category}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <img src="https://picsum.photos/40/40" className="w-8 h-8 rounded-full border border-blue-500/30" alt="" />
              <span>By {post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
          </div>

          {/* AI Summary Widget */}
          <div className="mb-10 p-6 rounded-2xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-blue-400 font-semibold">
                <Sparkles size={20} className="animate-pulse" />
                <span>Nova AI Synthesis</span>
              </div>
              {!summary && (
                <button 
                  onClick={handleSummarize}
                  disabled={loading}
                  className="px-4 py-1.5 glass rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2"
                >
                  {loading ? <Loader2 size={14} className="animate-spin" /> : 'Synthesize Content'}
                </button>
              )}
            </div>
            
            {loading ? (
              <div className="h-20 flex items-center justify-center">
                <p className="text-gray-400 text-sm italic animate-pulse">Scanning neural patterns...</p>
              </div>
            ) : summary ? (
              <div className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
                {summary}
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic">Unlock AI-generated insights for this post.</p>
            )}
          </div>

          <div className="prose prose-invert max-w-none mb-12">
            <p className="text-gray-300 leading-loose text-lg whitespace-pre-line">
              {post.content}
            </p>
          </div>

          <div className="flex items-center gap-4 pt-8 border-t border-white/5">
            <button className="flex items-center gap-2 px-6 py-2.5 glass rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all">
              <Heart size={20} />
              Like
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 glass rounded-xl hover:bg-blue-500/10 hover:text-blue-400 transition-all">
              <Share2 size={20} />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
