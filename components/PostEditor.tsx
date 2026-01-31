
import React, { useState } from 'react';
import { Category, BlogPost } from '../types';
import { X, Sparkles, Loader2, Save } from 'lucide-react';
import { generateBlogIdea } from '../services/geminiService';

interface PostEditorProps {
  onClose: () => void;
  onSave: (post: Omit<BlogPost, 'id'>) => void;
}

const PostEditor: React.FC<PostEditorProps> = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Category>(Category.TECH);
  const [tags, setTags] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAiInspiration = async () => {
    setIsGenerating(true);
    try {
      const res = await generateBlogIdea(category);
      const data = JSON.parse(res);
      setTitle(data.title || "新洞察");
      setContent(data.intro || "");
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    onSave({
      title,
      content,
      category,
      author: 'aita 管理员',
      date: new Date().toISOString().split('T')[0],
      imageUrl: `https://picsum.photos/800/450?random=${Math.floor(Math.random() * 100)}`,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl glass rounded-3xl overflow-hidden flex flex-col shadow-2xl border-white/20">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-bold font-orbitron text-blue-400 flex items-center gap-2 tracking-tight">
            <Sparkles size={20} />
            量子编辑器
          </h2>
          <button onClick={onClose} className="p-2 glass rounded-full hover:bg-white/10">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">文章分类</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
              >
                {Object.values(Category).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">标签 (以逗号分隔)</label>
              <input 
                type="text"
                placeholder="AI, 编程, 未来..."
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">文章标题</label>
            <input 
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="请输入标题..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-xl font-bold"
            />
            <button 
              type="button"
              onClick={handleAiInspiration}
              disabled={isGenerating}
              className="absolute right-3 bottom-3 p-1.5 text-blue-400 hover:text-blue-300 transition-colors"
              title="获取 AI 灵感"
            >
              {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">内容传输</label>
            <textarea 
              rows={8}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="在这里记录你的星际感悟..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none leading-relaxed text-sm"
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-900/40 transition-all active:scale-95"
            >
              <Save size={20} />
              发布到网络
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEditor;
