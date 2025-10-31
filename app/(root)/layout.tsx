import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { getCurrentUser, signOut } from "@/lib/actions/auth.action";

const Layout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();

  return (
    <div className="root-layout">
      <nav className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="JobPsych AI Logo"
            width={38}
            height={32}
          />
          <h2 className="text-primary-100">JobPsych AI</h2>
        </Link>

        <div className="text-center text-primary-100 italic text-sm">
          The best way to predict the future is to create it
        </div>

        {user ? (
          <form action={signOut}>
            <Button className="btn-secondary">Logout</Button>
          </form>
        ) : (
          <div className="flex gap-2">
            <Button asChild className="btn-secondary">
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild className="btn-primary">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        )}
      </nav>

      {children}
    </div>
  );
};

export default Layout;
