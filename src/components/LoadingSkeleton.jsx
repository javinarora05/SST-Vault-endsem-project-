
const SkeletonCard = () => (
  <div className="bg-white dark:bg-surface-800 rounded-2xl overflow-hidden border border-surface-200 dark:border-surface-700">
    
    <div className="h-1.5 w-full skeleton" />
    
    <div className="p-5 space-y-4">
      
      <div className="w-20 h-6 rounded-lg skeleton" />
      
      <div className="w-3/4 h-5 rounded-lg skeleton" />
      
      <div className="space-y-2">
        <div className="w-full h-3 rounded skeleton" />
        <div className="w-2/3 h-3 rounded skeleton" />
      </div>
      
      <div className="space-y-2">
        <div className="w-1/2 h-4 rounded skeleton" />
        <div className="w-1/3 h-4 rounded skeleton" />
      </div>
      
      <div className="w-full h-10 rounded-xl skeleton" />
    </div>
  </div>
);

const SkeletonCalendar = () => (
  <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 border border-surface-200 dark:border-surface-700">
    
    <div className="flex items-center justify-between mb-6">
      <div className="w-32 h-6 rounded-lg skeleton" />
      <div className="flex gap-2">
        <div className="w-20 h-8 rounded-lg skeleton" />
        <div className="w-20 h-8 rounded-lg skeleton" />
        <div className="w-20 h-8 rounded-lg skeleton" />
      </div>
    </div>
    
    <div className="grid grid-cols-7 gap-2 mb-4">
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="h-8 rounded skeleton" />
      ))}
    </div>
    
    <div className="grid grid-cols-7 gap-2">
      {Array.from({ length: 35 }).map((_, i) => (
        <div key={i} className="h-20 rounded-lg skeleton" />
      ))}
    </div>
  </div>
);

const SkeletonList = ({ count = 3 }) => (
  <div className="space-y-3">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="flex items-center gap-4 p-4 bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700"
      >
        <div className="w-10 h-10 rounded-xl skeleton shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="w-2/3 h-4 rounded skeleton" />
          <div className="w-1/3 h-3 rounded skeleton" />
        </div>
        <div className="w-16 h-8 rounded-lg skeleton" />
      </div>
    ))}
  </div>
);

const LoadingSkeleton = ({ variant = 'cards', count = 6 }) => {
  if (variant === 'calendar') return <SkeletonCalendar />;
  if (variant === 'list') return <SkeletonList count={count} />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
