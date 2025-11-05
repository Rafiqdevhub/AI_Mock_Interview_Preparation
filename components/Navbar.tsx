import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getCurrentUser, signOut } from "@/lib/actions/auth.action";

const Navbar = async () => {
  const user = await getCurrentUser();

  return (
    <nav className="flex justify-between items-center py-6 px-8 border-b border-dark-300">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.png" alt="JobPsych AI Logo" width={38} height={32} />
        <h2 className="text-primary-100">JobPsych AI</h2>
      </Link>

      <div className="text-center text-primary-100 italic text-sm max-md:hidden">
        The best way to predict the future is to create it
      </div>

      {user ? (
        <div className="flex gap-3 items-center">
          <Button asChild className="btn-primary">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <form action={signOut}>
            <Button className="btn-secondary">Logout</Button>
          </form>
        </div>
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
  );
};

export default Navbar;
