"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/firebase/admin";
import { feedbackSchema } from "@/constants";

/**
 * Creates or updates interview feedback
 */
export async function createFeedback(
  params: CreateFeedbackParams
): Promise<{ success: boolean; feedbackId?: string; error?: string }> {
  const { interviewId, userId, transcript, feedbackId } = params;

  if (!interviewId || !userId || !transcript.length) {
    return {
      success: false,
      error: "Missing required parameters",
    };
  }

  try {
    // Format transcript for the AI model
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    // Generate feedback using AI
    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }) as never,
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
      `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });

    // Prepare feedback document
    const feedback = {
      interviewId,
      userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
      createdAt: new Date().toISOString(),
    };

    // Create or update feedback document
    const feedbackRef = feedbackId
      ? db.collection("feedback").doc(feedbackId)
      : db.collection("feedback").doc();

    await feedbackRef.set(feedback);

    return {
      success: true,
      feedbackId: feedbackRef.id,
    };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Retrieves an interview by its ID
 */
export async function getInterviewById(id: string): Promise<Interview | null> {
  if (!id) return null;

  try {
    const interview = await db.collection("interviews").doc(id).get();

    if (!interview.exists) return null;

    return {
      id: interview.id,
      ...interview.data(),
    } as Interview;
  } catch (error) {
    console.error(`Error fetching interview with ID ${id}:`, error);
    return null;
  }
}

/**
 * Gets feedback for a specific interview and user
 */
export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { interviewId, userId } = params;

  if (!interviewId || !userId) return null;

  try {
    const querySnapshot = await db
      .collection("feedback")
      .where("interviewId", "==", interviewId)
      .where("userId", "==", userId)
      .limit(1)
      .get();

    if (querySnapshot.empty) return null;

    const feedbackDoc = querySnapshot.docs[0];

    return {
      id: feedbackDoc.id,
      ...feedbackDoc.data(),
    } as Feedback;
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return null;
  }
}

/**
 * Gets the latest interviews excluding user's own interviews
 */
export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[]> {
  const { userId, limit = 20 } = params;

  if (!userId) return [];

  try {
    const interviews = await db
      .collection("interviews")
      .orderBy("createdAt", "desc")
      .where("finalized", "==", true)
      .where("userId", "!=", userId)
      .limit(limit)
      .get();

    return interviews.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Interview[];
  } catch (error) {
    console.error("Error fetching latest interviews:", error);
    return [];
  }
}

/**
 * Gets all interviews for a specific user
 */
export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[]> {
  if (!userId) return [];

  try {
    const interviews = await db
      .collection("interviews")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

    return interviews.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Interview[];
  } catch (error) {
    console.error(`Error fetching interviews for user ${userId}:`, error);
    return [];
  }
}
