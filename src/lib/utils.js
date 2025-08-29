/**
 * Combines class names and merges Tailwind CSS classes
 * @param {...any} inputs - Class names to combine
 * @returns {string} - Combined and merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Combines multiple class values into a single string
 * @param {...any} inputs - Class values to combine
 * @returns {string} - Combined class string
 */
function clsx(...inputs) {
  const classes = [];
  
  for (const input of inputs) {
    if (!input) continue;
    
    if (typeof input === 'string') {
      classes.push(input);
    } else if (typeof input === 'number') {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const inner = clsx(...input);
      if (inner) {
        classes.push(inner);
      }
    } else if (typeof input === 'object' && input !== null) {
      for (const [key, value] of Object.entries(input)) {
        if (value) {
          classes.push(key);
        }
      }
    }
  }
  
  return classes.join(' ');
}

/**
 * Merges Tailwind CSS classes, handling conflicts properly
 * @param {string} classString - Class string to merge
 * @returns {string} - Merged class string
 */
function twMerge(classString) {
  if (!classString) return '';
  
  const classes = classString.split(/\s+/).filter(Boolean);
  const classMap = new Map();
  
  // Group classes by type and handle conflicts
  classes.forEach(className => {
    if (!className) return;
    
    // For Tailwind classes, we need to handle conflicts
    // This is a simplified version - real tailwind-merge has more complex logic
    const baseClass = getBaseClass(className);
    
    // If we already have a class of this type, replace it
    // (e.g., 'p-2' and 'p-4' -> keep only 'p-4')
    if (classMap.has(baseClass)) {
      classMap.set(baseClass, className);
    } else {
      classMap.set(baseClass, className);
    }
  });
  
  return Array.from(classMap.values()).join(' ');
}

/**
 * Extracts the base class name for conflict detection
 * @param {string} className - Tailwind class name
 * @returns {string} - Base class name
 */
function getBaseClass(className) {
  // This is a simplified implementation
  // Real tailwind-merge has a much more sophisticated system
  
  // Handle responsive variants (sm:, md:, lg:, xl:)
  if (className.includes(':')) {
    return className; // Keep responsive variants as-is for simplicity
  }
  
  // Extract the base utility type (e.g., 'p-2' -> 'p', 'bg-blue-500' -> 'bg')
  const match = className.match(/^([a-z]+)(-|$)/);
  if (match) {
    return match[1];
  }
  
  return className;
}