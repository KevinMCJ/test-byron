import React from "react";

interface LoaderProps {
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ text = "Cargando..." }) => {
  return (
    <div className="loader">
      <div className="loader-spinner"></div>
      {text && <p className="mt-2">{text}</p>}
    </div>
  );
};

export default Loader;
