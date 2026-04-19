
import { motion } from 'framer-motion';
import useFilterStore from '../store/useFilterStore';
import { CATEGORIES } from '../utils/constants';

const FilterChips = () => {
  const { activeFilters, toggleFilter, clearFilters } = useFilterStore();

  return (
    <div className="flex flex-wrap items-center gap-2">
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={clearFilters}
        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
          activeFilters.length === 0
            ? 'bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/25'
            : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-400 border-surface-200 dark:border-surface-700 hover:border-primary-300'
        }`}
      >
        All Events
      </motion.button>

      
      {CATEGORIES.map((category) => {
        const isActive = activeFilters.includes(category.id);

        return (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleFilter(category.id)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border flex items-center gap-1.5"
            style={
              isActive
                ? {
                    backgroundColor: category.color,
                    color: 'white',
                    borderColor: category.color,
                    boxShadow: `0 4px 14px ${category.color}40`,
                  }
                : {
                    backgroundColor: 'transparent',
                    borderColor: undefined,
                  }
            }
            
            {...(!isActive && {
              className:
                'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border flex items-center gap-1.5 bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-400 border-surface-200 dark:border-surface-700 hover:border-surface-400',
            })}
          >
            <span>{category.icon}</span>
            <span>{category.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default FilterChips;
