import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { memo } from "react";

import { Button } from "./ui/button";

import { cn, getRandomInterviewCover } from "@/lib/utils";
import { getFeedbackByInterviewId } from "@/lib/actions/general.action";
import DisplayTechIcons from "./DisplayTechIcons";

const InterviewCard = async ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  // Only fetch feedback if we have both userId and interviewId
  const feedback =
    userId && interviewId
      ? await getFeedbackByInterviewId({
          interviewId,
          userId,
        })
      : null;

  // Normalize the interview type for consistent display
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  // Map the type to the appropriate badge color
  const badgeColor =
    {
      Behavioral: "bg-light-400",
      Mixed: "bg-light-600",
      Technical: "bg-light-800",
    }[normalizedType] || "bg-light-600";

  // Format the date for display
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  // Determine the interview URL and button text based on feedback status
  const interviewUrl = feedback
    ? `/interview/${interviewId}/feedback`
    : `/interview/${interviewId}`;

  const buttonText = feedback ? "Check Feedback" : "View Interview";

  // Default text for interviews without feedback
  const defaultAssessment =
    "You haven't taken this interview yet. Take it now to improve your skills.";

  return (
    <div
      className="card-border w-[360px] max-sm:w-full min-h-96"
      role="article"
      aria-label={`${role} Interview Card`}
    >
      <div className="card-interview">
        <div>
          <div
            className={cn(
              "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg",
              badgeColor
            )}
            aria-label={`Interview type: ${normalizedType}`}
          >
            <p className="badge-text">{normalizedType}</p>
          </div>

          <Image
            src={getRandomInterviewCover()}
            alt={`${role} interview cover image`}
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
            priority={false}
            loading="lazy"
          />

          <h3 className="mt-5 capitalize">{role} Interview</h3>

          <div className="flex flex-row gap-5 mt-3">
            <div
              className="flex flex-row gap-2"
              aria-label={`Interview date: ${formattedDate}`}
            >
              <Image
                src="/calendar.svg"
                width={22}
                height={22}
                alt=""
                aria-hidden="true"
              />
              <p>{formattedDate}</p>
            </div>

            <div
              className="flex flex-row gap-2 items-center"
              aria-label={`Score: ${feedback?.totalScore || "Not available"}`}
            >
              <Image
                src="/star.svg"
                width={22}
                height={22}
                alt=""
                aria-hidden="true"
              />
              <p>{feedback?.totalScore || "---"}/100</p>
            </div>
          </div>

          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment || defaultAssessment}
          </p>
        </div>

        <div className="flex flex-row justify-between">
          <DisplayTechIcons techStack={techstack} />

          <Button className="btn-primary">
            <Link href={interviewUrl}>{buttonText}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
