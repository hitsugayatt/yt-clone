import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FilterBar = ({ onFilterChange }: { onFilterChange: (filter: string) => void }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const filters = [
    'All', 'Music', 'Gaming', 'Podcasts', 'Live', 'Computer Science', 
    'Algorithms', 'Sports', 'News', 'Cooking', 'Fitness', 'Education',
    'Travel', 'Comedy', 'Animation', 'Recently Uploaded'
  ];

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  const scrollLeft = () => {
    const newPosition = Math.max(0, scrollPosition - 200);
    setScrollPosition(newPosition);
    document.getElementById('filters-container')!.scrollLeft = newPosition;
  };

  const scrollRight = () => {
    const container = document.getElementById('filters-container')!;
    const newPosition = Math.min(
      container.scrollWidth - container.clientWidth,
      scrollPosition + 200
    );
    setScrollPosition(newPosition);
    container.scrollLeft = newPosition;
  };

  return (
    <div className="relative flex items-center bg-white mb-4">
      <button 
        onClick={scrollLeft}
        className="absolute left-0 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        aria-label="Scroll left"
      >
        <ChevronLeft size={20} />
      </button>
      
      <div 
        id="filters-container"
        className="flex items-center space-x-3 overflow-x-auto py-3 px-12 no-scrollbar scroll-smooth"
        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
      >
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterClick(filter)}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
              activeFilter === filter
                ? 'bg-black text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      
      <button 
        onClick={scrollRight}
        className="absolute right-0 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        aria-label="Scroll right"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default FilterBar;