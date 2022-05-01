import { useEffect, useLayoutEffect, useRef } from "react";

const useIntersectionObserver = (callback) => {
  const ref = useRef(null);
  useEffect(() => {
    console.log("ABOUT OBSERVER CREATE");
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback()
        }
      },
      {
        threshold: 0.5,
        root: null,
        rootMargin: "0px",
      }
    );

    observer.observe(element);
    return () => {
      observer.unobserve(element);
    };
  }, []);
  return ref;
};
export default useIntersectionObserver;
