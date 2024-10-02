import Navbar from "./Navbar";

export const metadata = {
  title: "Task Vault",
  description:
    "Task Vault is a task management application that allows you to manage your tasks in a secure and easy way.",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <div className="lg:px-10 md:px-4 px-2">
      <Navbar />
      {children}
    </div>
  );
}
