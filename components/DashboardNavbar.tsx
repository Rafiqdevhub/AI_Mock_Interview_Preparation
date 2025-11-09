import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getCurrentUser, signOut } from "@/lib/actions/auth.action";

const DashboardNavbar = async () => {
  const user = await getCurrentUser();

  return (
    <nav className="border-b border-dark-300">
      <div className="flex flex-wrap justify-between items-center py-4 px-4 md:py-6 md:px-8 gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="JobPsych AI Logo"
            width={38}
            height={32}
            className="w-8 h-7 md:w-[38px] md:h-8"
          />
          <h2 className="text-primary-100 text-base md:text-xl">JobPsych AI</h2>
        </Link>

        <div className="hidden lg:block text-center text-primary-100 italic text-sm flex-1 px-4">
          The best way to predict the future is to create it
        </div>

        <div className="flex gap-2 md:gap-3 items-center w-full sm:w-auto order-3 sm:order-0">
          <Button asChild className="btn-secondary flex-1 sm:flex-none text-sm">
            <Link href="/">Back to Home</Link>
          </Button>
          {user && (
            <form action={signOut} className="flex-1 sm:flex-none">
              <Button type="submit" className="btn-primary w-full text-sm">
                Logout
              </Button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
