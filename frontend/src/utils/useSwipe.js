const useSwipe = (onSwipeRight, onSwipeLeft, threshold = 50) => {
    let touchStart = null;
  
    const onTouchStart = (e) => {
      touchStart = e.touches[0].clientX;
    };
  
    const onTouchMove = (e) => {
      if (!touchStart) return;
  
      const currentTouch = e.touches[0].clientX;
      const diff = currentTouch - touchStart;
  
      if (Math.abs(diff) >= threshold) {
        if (diff > 0) {
          // Swipe right
          onSwipeRight?.();
        } else {
          // Swipe left
          onSwipeLeft?.();
        }
        touchStart = null;
      }
    };
  
    const onTouchEnd = () => {
      touchStart = null;
    };
  
    return {
      onTouchStart,
      onTouchMove,
      onTouchEnd
    };
  };
  
  export default useSwipe;
