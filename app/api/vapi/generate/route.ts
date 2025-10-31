import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { NextRequest } from "next/server";

import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

// Define request body interface for better type safety
interface GenerateInterviewRequest {
  type: string;
  role: string;
  level: string;
  techstack: string;
  amount: number;
  userid: string;
}

/**
 * Handles POST requests to generate new interviews
 */
export async function POST(request: NextRequest) {
  try {
    // Check if Firebase is properly initialized
    if (!db) {
      return Response.json(
        { success: false, error: "Database not available" },
        { status: 500 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const { type, role, level, techstack, amount, userid } =
      body as GenerateInterviewRequest;

    // Validate required fields
    if (!type || !role || !level || !techstack || !amount || !userid) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate interview questions using AI
    const { text: questionsText } = await generateText({
      model: google("gemini-2.0-flash-001") as never,
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
      `,
      temperature: 0.7, // Add temperature for more controlled output
    });

    // Parse questions and handle potential parsing errors
    let questions: string[];
    try {
      questions = JSON.parse(questionsText);

      // Validate that we received an array of strings
      if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error("Invalid questions format");
      }
    } catch (parseError) {
      console.error("Error parsing questions:", parseError);
      return Response.json(
        { success: false, error: "Failed to parse generated questions" },
        { status: 500 }
      );
    }

    // Create interview document
    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(",").map((item) => item.trim()), // Clean up tech stack items
      questions,
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    // Save to database
    const docRef = await db.collection("interviews").add(interview);

    return Response.json(
      {
        success: true,
        interviewId: docRef.id,
      },
      {
        status: 201,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("Error generating interview:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return Response.json(
      {
        success: false,
        error: errorMessage,
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * Handles GET requests for health checks
 */
export async function GET() {
  return Response.json(
    {
      success: true,
      status: "API is operational",
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "max-age=60", // Cache for 60 seconds
      },
    }
  );
}
