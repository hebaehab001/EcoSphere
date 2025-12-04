import { auth } from "@/auth";
import { rootContainer } from "@/backend/config/container";
import EventController from "@/backend/features/event/event.controller";
import { IEvent } from "@/backend/features/user/user.model";
import {
  ApiResponse,
  ok,
  serverError,
  unauthorized,
} from "@/types/api-helpers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: Promise<{ eventId: string }> }
): Promise<NextResponse<ApiResponse<IEvent>>> => {
  try {
    const { eventId } = await context.params;
    const session = await auth();
    if (!session?.user?.id) {
      return unauthorized("Not authenticated");
    }
    return ok(
      await rootContainer
        .resolve(EventController)
        .getEvent(session.user.id, eventId)
    );
  } catch (error) {
    console.log(error);
    return serverError("Something went wrong");
  }
};
