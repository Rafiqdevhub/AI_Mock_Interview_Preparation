import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3>Interview generation</h3>
        <Button asChild className="btn-secondary">
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>

      <Agent
        userName={user.name}
        userId={user.id}
        profileImage={user.profileURL}
        type="generate"
      />
    </>
  );
};

export default Page;
