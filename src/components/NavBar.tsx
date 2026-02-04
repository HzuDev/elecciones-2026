import { useAuth } from '../lib/auth-context';
import { LogOut, Home, User as UserIcon } from 'lucide-react';
import { getPath } from '../config/site';

export function NavBar() {
  const { user, isAuthenticated, isGuest, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      window.location.href = getPath('/');
    }
  };

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const isExplorePage = currentPath.includes('/explorar');
  const isContributePage = currentPath.includes('/contribuir');

  return (
    <nav className="fixed top-4 md:top-8 left-0 right-0 z-50 px-4 md:px-6">
      <div className="max-w-6xl mx-auto bg-white border border-slate-200 rounded-[2rem] md:rounded-[2.5rem] px-4 md:px-8 py-3 md:py-4 flex items-center justify-between shadow-xl shadow-slate-100">
        
        {/* Logo */}
        <a href={getPath('/')} className="flex items-center gap-4 group">
          <div className="w-11 h-11 bg-slate-900 rounded-[1.2rem] flex items-center justify-center shadow-lg group-hover:bg-blue-600 transition-colors">
            <Home className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-black text-xl tracking-tighter leading-none">
              SUB<span className="text-blue-600">2026</span>
            </h1>
            <p className="text-[9px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-1">
              Transparencia
            </p>
          </div>
        </a>

        {/* Navigation Tabs */}
        <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
          <a 
            href={getPath('/explorar')}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              isExplorePage 
                ? 'bg-white text-blue-600 shadow-sm border border-slate-200' 
                : 'text-slate-400 hover:text-slate-900'
            }`}
          >
            Explorar
          </a>
          {isAuthenticated && !isGuest ? (
            <a 
              href={getPath('/contribuir')}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                isContributePage 
                  ? 'bg-white text-blue-600 shadow-sm border border-slate-200' 
                  : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              Contribuir
            </a>
          ) : (
            <div className="px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-slate-300 cursor-not-allowed relative group">
              Contribuir
              {!isAuthenticated && (
                <div className="hidden group-hover:block absolute top-full left-0 mt-2 px-3 py-2 bg-slate-900 text-white text-[10px] font-medium rounded-lg whitespace-nowrap">
                  Inicia sesión para contribuir
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-black text-slate-300 uppercase leading-none mb-1">
                    {isGuest ? 'Invitado' : 'Identidad'}
                  </p>
                  <p className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors truncate max-w-[120px]">
                    {user?.name || user?.email}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200 group-hover:bg-blue-50 transition-colors">
                  <UserIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-600" strokeWidth={2.5} />
                </div>
              </div>
              <button 
                onClick={handleLogout}
                disabled={isLoading}
                className="text-slate-300 hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Cerrar sesión"
              >
                <LogOut className="w-6 h-6" strokeWidth={2.5} />
              </button>
            </>
          ) : (
            <a 
              href={getPath('/login')}
              className="flex items-center gap-3 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-100"
            >
              <UserIcon className="w-4 h-4" strokeWidth={2.5} />
              Iniciar Sesión
            </a>
          )}
        </div>

      </div>
    </nav>
  );
}
