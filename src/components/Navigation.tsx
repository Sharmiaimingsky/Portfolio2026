import { useState, useEffect } from 'react';
import { Github, Linkedin, Code2, Download } from 'lucide-react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Systems', href: '#systems' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Experience', href: '#experience' },
  { label: 'Observatory', href: '#observatory' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3 glass border-b border-white/5' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className="text-sm font-semibold tracking-widest text-[#f0f4f8] hover:text-[#39ff14] transition-colors duration-200"
        >
          Sharmistha<span className="text-[#39ff14]">.</span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-medium tracking-wider uppercase text-[#6b7685] hover:text-[#f0f4f8] transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Sharmiaimingsky"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#6b7685] hover:text-[#f0f4f8] transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/sharmistha-chakrabortyy/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#6b7685] hover:text-[#f0f4f8] transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="https://leetcode.com/sharmic17/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#6b7685] hover:text-[#f0f4f8] transition-colors duration-200"
            aria-label="LeetCode"
          >
            <Code2 size={16} />
          </a>
          <a
            href="/Sharmistha_Chakraborty_04_09.pdf"
            download="Sharmistha_Chakraborty_Resume.pdf"
            className="p-2 text-[#6b7685] hover:text-[#39ff14] transition-colors duration-200"
            aria-label="Download Resume"
          >
            <Download size={16} />
          </a>
        </div>
      </div>
    </nav>
  );
}
