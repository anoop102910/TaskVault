import React from "react";
import Navbar from "./Navbar";

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};
