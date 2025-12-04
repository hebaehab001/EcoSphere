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
  req: NextRequest
): Promise<NextResponse<ApiResponse<IEvent[]>>> => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return unauthorized("Not authenticated");
    }
    return ok(
      await rootContainer
        .resolve(EventController)
        .getEventsByUserId(session.user.id)
    );
  } catch (error) {
    console.log(error);
    return serverError("Something went wrong");
  }
};

export const POST = async (
  req: NextRequest
): Promise<NextResponse<ApiResponse<IEvent>>> => {
  try {
    const body = await req.json();
    const session = await auth();
    if (!session?.user?.id) {
      return unauthorized("Not authenticated");
    }
    return ok(
      await rootContainer
        .resolve(EventController)
        .createEvent(session.user.id, body)
    );
  } catch (error) {
    console.log(error);
    return serverError("Something went wrong");
  }
};

export const PUT = async (
  req: NextRequest
): Promise<NextResponse<ApiResponse<IEvent>>> => {
  try {
    const body = await req.json();
    const session = await auth();
    if (!session?.user?.id) {
      return unauthorized("Not authenticated");
    }
    return ok(
      await rootContainer
        .resolve(EventController)
        .updateEvent(session.user.id, body)
    );
  } catch (error) {
    console.log(error);
    return serverError("Something went wrong");
  }
};

export const DELETE = async (
  req: NextRequest,
): Promise<NextResponse<ApiResponse<IEvent>>> => {
  try {
    const { eventId } = await req.json();
    const session = await auth();
    if (!session?.user?.id) {
      return unauthorized("Not authenticated");
    }
    return ok(
      await rootContainer
        .resolve(EventController)
        .deleteEvent(session.user.id, eventId)
    );
  } catch (error) {
    console.log(error);
    return serverError("Something went wrong");
  }
};
