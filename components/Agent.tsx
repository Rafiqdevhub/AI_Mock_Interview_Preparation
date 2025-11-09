"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
  profileImage,
}: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const lastMessage = useMemo(
    () => (messages.length > 0 ? messages[messages.length - 1].content : ""),
    [messages]
  );

  const handleGenerateFeedback = useCallback(
    async (messageData: SavedMessage[]) => {
      if (!interviewId || !userId) {
        console.error("Missing interviewId or userId:", {
          interviewId,
          userId,
        });
        toast.error("Missing interview information. Redirecting to dashboard.");
        router.push("/dashboard");
        return;
      }

      toast.info("Generating your feedback...");

      const result = await createFeedback({
        interviewId,
        userId,
        transcript: messageData,
        feedbackId,
      });

      if (result.success && result.feedbackId) {
        toast.success("Feedback generated successfully!");
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        toast.error(result.error || "Failed to generate feedback");
        router.push("/dashboard");
      }
    },
    [interviewId, userId, feedbackId, router]
  );

  const handleCall = useCallback(async () => {
    try {
      setCallStatus(CallStatus.CONNECTING);
      toast.info("Connecting to interview...");

      if (type === "generate") {
        const workflowId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;
        if (!workflowId) {
          throw new Error("VAPI_WORKFLOW_ID is not set");
        }

        await vapi.start(workflowId, {
          variableValues: {
            username: userName,
            userid: userId,
          },
        });
      } else {
        const formattedQuestions = questions
          ? questions.map((question) => `- ${question}`).join("\n")
          : "";

        await vapi.start(interviewer, {
          variableValues: {
            questions: formattedQuestions,
          },
        });
      }
    } catch (error) {
      console.error("Failed to start call:", error);
      setCallStatus(CallStatus.INACTIVE);
      toast.error("Failed to start the call. Check your configuration.");
    }
  }, [type, userName, userId, questions]);

  const handleDisconnect = useCallback(() => {
    try {
      setCallStatus(CallStatus.FINISHED);
      vapi.stop();
    } catch {
      toast.error("Call ended with errors.");
    }
  }, []);

  useEffect(() => {
    const eventHandlers = {
      "call-start": () => {
        setCallStatus(CallStatus.ACTIVE);
        toast.success("Interview call connected!");
      },
      "call-end": () => {
        setCallStatus(CallStatus.FINISHED);
        toast.info("Interview call ended");
      },
      message: (data: unknown) => {
        const message = data as Message;
        if (
          message.type === "transcript" &&
          message.transcriptType === "final"
        ) {
          setMessages((prev) => [
            ...prev,
            {
              role: message.role,
              content: message.transcript,
            },
          ]);
        }
      },
      "speech-start": () => setIsSpeaking(true),
      "speech-end": () => setIsSpeaking(false),
      error: (error: unknown) => {
        const errorMessage =
          error instanceof Error ? error.message : String(error);

        if (
          errorMessage.includes("Meeting ended") ||
          errorMessage.includes("Meeting has ended")
        ) {
          console.log("Call ended normally");
          return;
        }

        setCallStatus(CallStatus.INACTIVE);
        toast.error("Call error occurred. Please try again.");
      },
    } as const;

    (Object.keys(eventHandlers) as Array<keyof typeof eventHandlers>).forEach(
      (event) => {
        vapi.on(event, eventHandlers[event]);
      }
    );

    return () => {
      (Object.keys(eventHandlers) as Array<keyof typeof eventHandlers>).forEach(
        (event) => {
          vapi.off(event, eventHandlers[event]);
        }
      );
    };
  }, []);

  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/dashboard");
      } else if (messages.length > 0) {
        handleGenerateFeedback(messages);
      }
    }
  }, [callStatus, type, messages, router, handleGenerateFeedback]);

  const buttonText = useMemo(() => {
    if (
      callStatus === CallStatus.INACTIVE ||
      callStatus === CallStatus.FINISHED
    ) {
      return "Call";
    }
    return ". . .";
  }, [callStatus]);

  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="AI Interviewer"
              width={65}
              height={54}
              className="object-cover w-16 h-14 sm:w-[65px] sm:h-14"
            />
            {isSpeaking && (
              <span className="animate-speak" aria-label="AI is speaking" />
            )}
          </div>
          <h3 className="text-lg sm:text-xl">JobPsych AI</h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 text-center px-2">
            Your Career Intelligence Assistant
          </p>
        </div>
        <div className="card-border">
          <div className="card-content">
            <Image
              src={profileImage || "/user.jpg"}
              alt="User avatar"
              width={120}
              height={120}
              className="rounded-full object-cover size-32 sm:size-40 md:size-[200px]"
            />
            <h3 className="text-lg sm:text-xl">{userName}</h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">Candidate</p>
          </div>
        </div>
      </div>
      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100",
                "text-sm sm:text-base md:text-lg"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}
      <div className="w-full flex justify-center px-4 sm:px-0">
        {callStatus !== CallStatus.ACTIVE ? (
          <button
            className="relative btn-call min-w-[120px] sm:min-w-40 cursor-pointer"
            onClick={handleCall}
            disabled={callStatus === CallStatus.CONNECTING}
            aria-label={
              callStatus === CallStatus.CONNECTING
                ? "Connecting..."
                : "Start interview call"
            }
          >
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== CallStatus.CONNECTING && "hidden"
              )}
              aria-hidden="true"
            />
            <span className="relative text-sm sm:text-base">{buttonText}</span>
          </button>
        ) : (
          <button
            className="btn-disconnect min-w-[120px] sm:min-w-40 text-sm sm:text-base cursor-pointer"
            onClick={handleDisconnect}
            aria-label="End interview call"
          >
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
