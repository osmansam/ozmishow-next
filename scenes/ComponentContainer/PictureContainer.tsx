"use client";

import React from "react";

interface PictureContainerProps {
  children?: React.ReactNode;
  [key: string]: any;
}

// Placeholder component - copy from ozmishow/src/scenes/ComponentContainer/PictureContainer.tsx
const PictureContainer: React.FC<PictureContainerProps> = ({
  children,
  ...props
}) => {
  return <div {...props}>{children}</div>;
};

export default PictureContainer;
