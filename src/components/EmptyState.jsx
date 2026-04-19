
import { motion } from 'framer-motion';

const EmptyState = ({
  title = 'No events found',
  message = 'Try adjusting your filters or check back later.',
  icon = '📭',
  action = null,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      
      <div className="text-6xl mb-4">{icon}</div>

      
      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">
        {title}
      </h3>

      
      <p className="text-sm text-surface-500 max-w-sm mb-6">{message}</p>

      
      {action && (
        <button
          onClick={action.onClick}
          className="px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;
