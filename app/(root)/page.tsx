import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import Footer from "@/components/Footer";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

const LandingPage = () => {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h1 className="hero-title">Your AI Career Intelligence Assistant</h1>
          <p className="text-lg text-light-100">
            Get personalized career guidance, practice interviews, receive
            expert feedback, and accelerate your professional growth with
            JobPsych AI.
          </p>

          <div className="auth-buttons">
            <Button asChild className="btn-primary max-sm:w-full">
              <Link href="/sign-up">Get Started </Link>
            </Button>
            <Button asChild className="btn-secondary max-sm:w-full">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>

        <Image
          src="/robot.png"
          alt="AI Interview Assistant"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-8 mt-12">
        <div className="text-center">
          <h2 className="section-title">Why Choose JobPsych AI?</h2>
          <p className="feature-description text-lg max-w-2xl mx-auto">
            Your comprehensive AI-powered career companion that provides
            intelligent guidance, interview practice, and personalized
            development strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="card-border landing-feature-card">
            <div className="card p-8 text-center">
              <Image
                src="/ai-avatar.png"
                alt="AI Practice"
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <h3 className="feature-title">Career Guidance</h3>
              <p className="feature-description">
                Receive personalized career advice, industry insights, and
                strategic guidance to navigate your professional journey
                effectively.
              </p>
            </div>
          </div>

          <div className="card-border landing-feature-card">
            <div className="card p-8 text-center">
              <Image
                src="/star.svg"
                alt="Instant Feedback"
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <h3 className="feature-title">Interview Mastery</h3>
              <p className="feature-description">
                Hone your interview skills with AI-powered practice sessions,
                instant feedback, and performance analytics.
              </p>
            </div>
          </div>

          <div className="card-border landing-feature-card">
            <div className="card p-8 text-center">
              <Image
                src="/tech.svg"
                alt="Tech Stack"
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <h3 className="feature-title">Professional Development</h3>
              <p className="feature-description">
                Access resources, skill assessments, and development plans
                tailored to your career goals and industry requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8 mt-16">
        <div className="text-center">
          <h2 className="section-title">How It Works</h2>
          <p className="feature-description text-lg max-w-2xl mx-auto">
            Transform your career with our intelligent three-step process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="text-center">
            <div className="step-number">1</div>
            <h3 className="feature-title">Assess & Plan</h3>
            <p className="feature-description">
              Share your career goals and current situation to receive
              personalized guidance and development plans.
            </p>
          </div>

          <div className="text-center">
            <div className="step-number">2</div>
            <h3 className="feature-title">Practice & Learn</h3>
            <p className="feature-description">
              Engage in interactive sessions including mock interviews, skill
              assessments, and targeted learning experiences.
            </p>
          </div>

          <div className="text-center">
            <div className="step-number">3</div>
            <h3 className="feature-title">Grow & Succeed</h3>
            <p className="feature-description">
              Track your progress, receive ongoing feedback, and achieve your
              career objectives with confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8 mt-16">
        <div className="text-center">
          <h2 className="section-title">Key Benefits</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <div>
              <h3 className="feature-title">Personalized Career Strategy</h3>
              <p className="feature-description">
                Receive tailored career advice based on your unique skills,
                experience, and professional aspirations.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <div>
              <h3 className="feature-title">Comprehensive Skill Development</h3>
              <p className="feature-description">
                Access targeted learning resources and development plans
                designed to bridge skill gaps and accelerate growth.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <div>
              <h3 className="feature-title">24/7 Career Support</h3>
              <p className="feature-description">
                Get instant access to career guidance and support whenever you
                need it, fitting seamlessly into your busy schedule.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <div>
              <h3 className="feature-title">Progress Tracking & Analytics</h3>
              <p className="feature-description">
                Monitor your career development with detailed analytics,
                milestone tracking, and performance insights over time.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

const Dashboard = ({
  user,
  userInterviews,
  allInterview,
}: {
  user: User;
  userInterviews: Interview[];
  allInterview: Interview[];
}) => {
  const hasPastInterviews = userInterviews?.length > 0;
  const hasUpcomingInterviews = allInterview?.length > 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Welcome back, {user.name}!</h2>
          <p className="text-lg">
            Continue your career development journey and unlock new
            opportunities with JobPsych AI.
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start New Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="AI Interview Assistant"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Practice More</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>There are no interview templates available</p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    return <LandingPage />;
  }

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user.id),
    getLatestInterviews({ userId: user.id }),
  ]);

  return (
    <Dashboard
      user={user}
      userInterviews={userInterviews || []}
      allInterview={allInterview || []}
    />
  );
}

export default Home;
