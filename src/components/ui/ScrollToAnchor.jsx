import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToAnchor() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        window.setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
      }

      return;
    }

    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, location.hash]);

  return null;
}

export default ScrollToAnchor;