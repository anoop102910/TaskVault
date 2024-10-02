"use client";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <div >
      <Navbar />
      {children}
    </div>
  );
}
