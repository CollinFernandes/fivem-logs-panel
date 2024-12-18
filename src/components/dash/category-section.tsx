import { ChevronRight, LucideIcon } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

interface CategorySectionProps {
  label: string;
  items: Array<{ path: string; name: string; icon: LucideIcon }>;
  isExpanded: boolean;
  toggle: () => void;
  currentPath: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({ label, items, isExpanded, toggle, currentPath }) => (
  <div className="w-full mt-4">
    <button onClick={toggle} className="text-foreground text-sm font-bold flex items-center w-full transition">
      <ChevronRight size={17} className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
      {label}
    </button>
    <div className={`transition-max-height duration-300 ${isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
      <ul className="w-full mt-2 flex flex-col items-center gap-2">
        {items.map(({ path, name, icon: Icon }, index) => (
          <li key={index} className="w-full">
            <Link href={path} className="w-full">
              <Button variant={currentPath === path ? 'default' : 'sidebar'} className="w-full flex items-center justify-start gap-2">
                <Icon />
                <span>{name}</span>
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default CategorySection;
