import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const CombinatHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigationItems = [
    { name: 'Home', href: '#home' },
    { 
      name: 'Por que Combinat?', 
      href: '#porque-combinat',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Nossa Missão', href: '#missao' },
        { name: 'Diferenciais', href: '#diferenciais' },
        { name: 'Cultura', href: '#cultura' },
      ]
    },
    { 
      name: 'Soluções', 
      href: '#solucoes', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Desenvolvimento', href: '#desenvolvimento' },
        { name: 'Marketing Digital', href: '#marketing' },
        { name: 'Consultoria', href: '#consultoria' },
      ]
    },
    { name: 'Equipe', href: '#equipe' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contato', href: '#contato' }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
              <span className="text-white font-bold text-xl group-hover:scale-110 transition-transform">C</span>
            </div>
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Combinat</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navigationItems.map((item) => (
              item.hasDropdown ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-1 px-3 py-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-md font-medium text-sm">
                      {item.name}
                      <ChevronDown className="w-4 h-4 ml-1 text-slate-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-48 animate-in fade-in-80">
                    {item.dropdownItems?.map((dropdownItem) => (
                      <DropdownMenuItem key={dropdownItem.name} asChild>
                        <a href={dropdownItem.href} className="cursor-pointer">
                          {dropdownItem.name}
                        </a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-md transition-colors font-medium text-sm"
                >
                  {item.name}
                </a>
              )
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" className="text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 font-medium">
              Entrar
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-md hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
              Começar Agora
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-20 bg-white/95 backdrop-blur-md z-40 overflow-y-auto animate-in slide-in-from-top duration-300">
            <div className="px-4 py-5 space-y-1">
              {navigationItems.map((item) => (
                <div key={item.name} className="py-1">
                  {item.hasDropdown ? (
                    <div className="space-y-2">
                      <div className="font-medium text-slate-900 py-3 border-b">
                        {item.name}
                      </div>
                      <div className="ml-4 space-y-1">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <a
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block py-2 px-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {dropdownItem.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className="block py-3 text-slate-800 font-medium hover:text-blue-600 transition-colors border-b"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
              <div className="pt-6 space-y-3">
                <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                  Entrar
                </Button>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white">
                  Começar Agora
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default CombinatHeader;
