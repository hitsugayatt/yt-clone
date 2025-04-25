import { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronUp, ChevronDown } from 'lucide-react';

const FilterBar = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isExpanded, setIsExpanded] = useState(false);
  
  const filters = [
    'All', 'Music', 'Gaming', 'Podcasts', 'Live', 'Computer Science', 
    'Algorithms', 'Sports', 'News', 'Cooking', 'Fitness', 'Education',
    'Travel', 'Comedy', 'Animation', 'Recently Uploaded'
  ];

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative bg-white mb-4 p-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Filters</h3>
        <button 
          onClick={toggleExpand}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label={isExpanded ? "Collapse filters" : "Expand filters"}
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      <div 
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-96' : 'max-h-24'
        }`}
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
    </div>
  );
};

FilterBar.propTypes = {
  onFilterChange: PropTypes.func.isRequired
};

export default FilterBar;