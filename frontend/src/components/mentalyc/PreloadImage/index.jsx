import React, { useEffect, useState } from "react";

export const PreloadImage = ({ src, className }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let unmounted = false;
    const loadImage = () => {
      let image = new Image();
      image.onload = () => {
        if (!unmounted) {
          setLoaded(true);
        }
      };
      image.src = src;
    };

    if (src) {
      loadImage();
    }

    return () => {
      unmounted = true;
    };
  }, [src]);

  return (
    <div className={className}>
      <div
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          opacity: loaded ? "1" : "0",
          transition: "opacity 300ms cubic-bezier(0.215, 0.61, 0.355, 1)"
        }}
      ></div>
    </div>
  );
};
