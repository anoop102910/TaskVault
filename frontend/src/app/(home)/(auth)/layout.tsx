export const metadata = {
  title: "Login",
  description: "",
};

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="px-4  md:px-8 lg:px-10">
      <div>{children}</div>
    </div>
  );
}
