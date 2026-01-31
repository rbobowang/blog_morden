
import React, { useState } from 'react';
import { Category } from '../types';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Cpu, 
  Code, 
  Activity, 
  Film, 
  PlusCircle, 
  Sparkles,
  Search,
  Menu,
  X,
  HeartHandshake
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeCategory: Category | 'All';
  setActiveCategory: (cat: Category | 'All') => void;
  onOpenEditor: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeCategory, setActiveCategory, onOpenEditor }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: '所有洞察', icon: <LayoutDashboard size={20} />, value: 'All' },
    { label: Category.RESONANCE, icon: <HeartHandshake size={20} />, value: Category.RESONANCE },
    { label: Category.FINANCE, icon: <TrendingUp size={20} />, value: Category.FINANCE },
    { label: Category.TECH, icon: <Cpu size={20} />, value: Category.TECH },
    { label: Category.IT, icon: <Code size={20} />, value: Category.IT },
    { label: Category.HEALTH, icon: <Activity size={20} />, value: Category.HEALTH },
    { label: Category.MEDIA, icon: <Film size={20} />, value: Category.MEDIA },
  ];

  return (
    <div className="min-h-screen flex bg-[#030712] text-gray-100 overflow-x-hidden">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 glass border-r border-white/10 transition-transform duration-300 transform
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center neon-border">
              <Sparkles className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold font-orbitron tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              AITA
            </h1>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  setActiveCategory(item.value as any);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  activeCategory === item.value 
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className={`${activeCategory === item.value ? 'text-blue-400' : 'group-hover:text-blue-400'}`}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-10 pt-10 border-t border-white/5">
            <button 
              onClick={onOpenEditor}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 py-3 rounded-xl font-semibold shadow-lg shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <PlusCircle size={20} />
              发布文章
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 p-4 glass rounded-2xl border border-white/5">
          <div className="flex items-center gap-3">
            <img src="https://picsum.photos/40/40" className="w-10 h-10 rounded-full border border-blue-500/50" alt="avatar" />
            <div>
              <p className="text-sm font-semibold">aita 管理员</p>
              <p className="text-xs text-gray-500">首席创新官</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 min-h-screen">
        <header className="flex items-center justify-between mb-8">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 glass rounded-lg"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="relative flex-1 max-w-md mx-4 md:mx-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="搜索星际档案..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex px-4 py-1.5 glass rounded-full text-[10px] font-semibold text-blue-400 animate-pulse border-blue-500/20 tracking-tighter">
              网络状态：全系统正常
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
};

export default Layout;
