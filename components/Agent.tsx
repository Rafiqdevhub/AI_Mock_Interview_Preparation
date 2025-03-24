"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

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
}: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Memoize the last message content for efficient re-renders
  const lastMessage = useMemo(
    () => (messages.length > 0 ? messages[messages.length - 1].content : ""),
    [messages]
  );

  // Handle feedback generation with proper dependency tracking
  const handleGenerateFeedback = useCallback(
    async (messageData: SavedMessage[]) => {
      if (!interviewId || !userId) return;

      const { success, feedbackId: id } = await createFeedback({
        interviewId,
        userId,
        transcript: messageData,
        feedbackId,
      });

      if (success && id) {
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        router.push("/");
      }
    },
    [interviewId, userId, feedbackId, router]
  );

  // Handle starting the call with proper dependency tracking
  const handleCall = useCallback(async () => {
    setCallStatus(CallStatus.CONNECTING);

    if (type === "generate") {
      const workflowId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;
      if (!workflowId) return;

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
  }, [type, userName, userId, questions]);

  // Handle disconnecting the call
  const handleDisconnect = useCallback(() => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  }, []);

  // Set up event listeners for the call
  useEffect(() => {
    const eventHandlers: Record<string, (data: any) => void> = {
      "call-start": () => setCallStatus(CallStatus.ACTIVE),
      "call-end": () => setCallStatus(CallStatus.FINISHED),
      message: (message: Message) => {
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
      error: () => setCallStatus(CallStatus.INACTIVE),
    };

    // Register all event handlers
    Object.entries(eventHandlers).forEach(([event, handler]) => {
      vapi.on(event, handler);
    });

    // Clean up event handlers on unmount
    return () => {
      Object.entries(eventHandlers).forEach(([event, handler]) => {
        vapi.off(event, handler);
      });
    };
  }, []);

  // Handle call completion
  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      } else if (messages.length > 0) {
        handleGenerateFeedback(messages);
      }
    }
  }, [callStatus, type, messages, router, handleGenerateFeedback]);

  // Determine button text based on call status
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
              className="object-cover"
            />
            {isSpeaking && (
              <span className="animate-speak" aria-label="AI is speaking" />
            )}
          </div>
          <h3>AI Interviewer</h3>
        </div>
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="User avatar"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
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
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}
      <div className="w-full flex justify-center">
        {callStatus !== CallStatus.ACTIVE ? (
          <button
            className="relative btn-call"
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
            <span className="relative">{buttonText}</span>
          </button>
        ) : (
          <button
            className="btn-disconnect"
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
