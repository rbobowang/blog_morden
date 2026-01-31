
import React, { useState, useEffect, useMemo } from 'react';
import Layout from './components/Layout';
import PostCard from './components/PostCard';
import PostDetail from './components/PostDetail';
import PostEditor from './components/PostEditor';
import AIAssistant from './components/AIAssistant';
import { Category, BlogPost } from './types';
import { INITIAL_POSTS } from './constants';
import { Sparkles, ArrowRight, Zap, Heart } from 'lucide-react';

const App: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Load from localStorage on mount (Simulated backend)
  useEffect(() => {
    const saved = localStorage.getItem('novasphere_posts');
    if (saved) {
      setPosts(JSON.parse(saved));
    } else {
      setPosts(INITIAL_POSTS);
      localStorage.setItem('novasphere_posts', JSON.stringify(INITIAL_POSTS));
    }
  }, []);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return posts;
    return posts.filter(p => p.category === activeCategory);
  }, [posts, activeCategory]);

  const handleSavePost = (newPostData: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = {
      ...newPostData,
      id: Date.now().toString(),
    };
    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem('novasphere_posts', JSON.stringify(updated));
    setIsEditorOpen(false);
  };

  return (
    <Layout 
      activeCategory={activeCategory} 
      setActiveCategory={setActiveCategory}
      onOpenEditor={() => setIsEditorOpen(true)}
    >
      {/* Hero Section */}
      <section className="mb-12 relative overflow-hidden rounded-[2.5rem] p-8 md:p-16 border border-white/10 glass">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-blue-400 font-bold tracking-widest text-xs mb-6 uppercase">
            <Heart size={16} className="text-purple-400" />
            2026 共鸣矩阵 & 进化中的智能
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            在功能过剩的时代 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">捕捉最新共鸣</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed">
            实时追踪 2026 年 1 月的财经波动、环境智能进化以及影视文化中那些让灵魂震颤的溢价信号。
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setIsEditorOpen(true)}
              className="px-8 py-4 bg-blue-600 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/40"
            >
              开始发布
              <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 glass rounded-2xl font-bold border border-white/10 hover:bg-white/5 transition-all">
              2026 核心逻辑
            </button>
          </div>
        </div>
      </section>

      {/* Featured Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <div className="w-2 h-8 bg-blue-600 rounded-full" />
            2026 开年归档流
          </h2>
          <p className="text-gray-500 text-sm ml-5 mt-1">显示 {filteredPosts.length} 条前瞻信号</p>
        </div>
        
        <div className="flex gap-2">
          <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-400 cursor-not-allowed border-white/5">
            <Sparkles size={18} />
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {filteredPosts.map(post => (
          <PostCard key={post.id} post={post} onClick={setSelectedPost} />
        ))}
        {filteredPosts.length === 0 && (
          <div className="col-span-full py-20 glass rounded-3xl border-dashed border-2 border-white/10 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="text-gray-600" size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-400">当前频段未发现信号</h3>
            <p className="text-gray-600 mt-2 max-w-xs mx-auto">尝试切换分类或开始新的传输以填充归档。</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedPost && (
        <PostDetail 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)} 
        />
      )}

      {isEditorOpen && (
        <PostEditor 
          onClose={() => setIsEditorOpen(false)} 
          onSave={handleSavePost}
        />
      )}

      <AIAssistant />

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 mt-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600/20 rounded flex items-center justify-center">
              <Sparkles className="text-blue-500" size={12} />
            </div>
            <span className="font-orbitron font-bold tracking-tighter text-gray-400 uppercase">AITA AI</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-blue-400 transition-colors">共鸣矩阵 2026</a>
            <a href="#" className="hover:text-blue-400 transition-colors">隐私核心</a>
            <a href="#" className="hover:text-blue-400 transition-colors">系统洞察</a>
          </div>
          <div className="tracking-tighter uppercase font-medium">
            &copy; 2026 AITA. 所有系统运行正常.
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default App;
