import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

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
          <h1 className="hero-title">Master Your Next Interview with AI</h1>
          <p className="text-lg text-light-100">
            Practice real interview questions, get instant AI-powered feedback,
            and boost your confidence with JobCrack AI.
          </p>

          <div className="auth-buttons">
            <Button asChild className="btn-primary max-sm:w-full">
              <Link href="/sign-up">Get Started Free</Link>
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
          <h2 className="section-title">Why Choose JobCrack AI?</h2>
          <p className="feature-description text-lg max-w-2xl mx-auto">
            Our AI-powered platform helps you practice and perfect your
            interview skills with realistic scenarios and personalized feedback.
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
              <h3 className="feature-title">AI-Powered Practice</h3>
              <p className="feature-description">
                Practice with our intelligent AI interviewer that adapts to your
                responses and provides realistic interview scenarios.
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
              <h3 className="feature-title">Instant Feedback</h3>
              <p className="feature-description">
                Get detailed, actionable feedback on your performance, including
                strengths and areas for improvement.
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
              <h3 className="feature-title">Multiple Tech Stacks</h3>
              <p className="feature-description">
                Practice interviews for various roles and technologies including
                React, Node.js, Python, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8 mt-16">
        <div className="text-center">
          <h2 className="section-title">How It Works</h2>
          <p className="feature-description text-lg max-w-2xl mx-auto">
            Get interview-ready in just three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="text-center">
            <div className="step-number">1</div>
            <h3 className="feature-title">Choose Your Role</h3>
            <p className="feature-description">
              Select the position you&apos;re applying for and specify your tech
              stack and experience level.
            </p>
          </div>

          <div className="text-center">
            <div className="step-number">2</div>
            <h3 className="feature-title">Practice Interview</h3>
            <p className="feature-description">
              Engage in a realistic AI-powered interview session with voice
              interaction and relevant questions.
            </p>
          </div>

          <div className="text-center">
            <div className="step-number">3</div>
            <h3 className="feature-title">Get Feedback</h3>
            <p className="feature-description">
              Receive detailed performance analysis with personalized
              recommendations for improvement.
            </p>
          </div>
        </div>
      </section>

      <section className="card-cta mt-16">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className="section-title">Ready to Ace Your Interview?</h2>
          <p className="text-lg text-light-100">
            Join thousands of job seekers who have improved their interview
            skills with JobCrack AI.
          </p>

          <div className="auth-buttons">
            <Button asChild className="btn-primary max-sm:w-full">
              <Link href="/sign-up">Start Practicing Now</Link>
            </Button>
            <Button asChild className="btn-secondary max-sm:w-full">
              <Link href="/sign-in">I Have an Account</Link>
            </Button>
          </div>
        </div>

        <Image
          src="/user.jpg"
          alt="Success Story"
          width={400}
          height={400}
          className="max-sm:hidden rounded-2xl"
        />
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
              <h3 className="feature-title">Realistic Interview Experience</h3>
              <p className="feature-description">
                Practice with an AI that mimics real interviewer behavior and
                asks relevant questions for your field.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <div>
              <h3 className="feature-title">Personalized Feedback</h3>
              <p className="feature-description">
                Receive detailed analysis of your responses with specific
                recommendations for improvement.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <div>
              <h3 className="feature-title">Practice Anytime</h3>
              <p className="feature-description">
                Available 24/7 to help you practice whenever you have time,
                fitting your schedule perfectly.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <div>
              <h3 className="feature-title">Track Your Progress</h3>
              <p className="feature-description">
                Monitor your improvement over time with detailed performance
                analytics and scoring.
              </p>
            </div>
          </div>
        </div>
      </section>
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
            Ready to practice more interviews and improve your skills?
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
