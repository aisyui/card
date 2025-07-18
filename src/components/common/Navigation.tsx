import { useLocation } from 'react-router-dom';

interface NavigationProps {
  username?: string;
}

export default function Navigation({ username: _username }: NavigationProps) {
  const location = useLocation();
  const loc = location.pathname.split('/').slice(-1)[0];

  const getDisplayText = () => {
    switch (loc) {
      case 'te':
        return '@yui.syui.ai /ten';
      case 'pr':
        return '@yui.syui.ai /fav 1234567';
      case 'docs':
      case 'en':
        return '@yui.syui.ai /help';
      case 'di':
        return '@yui.syui.ai /did';
      case 'svn':
        return '@yui.syui.ai /ten pay 7';
      default:
        return '@yui.syui.ai /card';
    }
  };

  return (
    <div className="bg-dark text-light mb-8">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <a href="/" className="text-accent text-2xl px-4">
            <span className="icon-ai"></span>
          </a>
          <code className="bg-dark p-0 hidden md:block">
            <a 
              href="https://bsky.app/profile/yui.syui.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-primary"
            >
              {getDisplayText()}
            </a>
          </code>
        </div>
        
      </div>
    </div>
  );
}