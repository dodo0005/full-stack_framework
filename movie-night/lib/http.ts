
import { NextResponse } from "next/server";

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export function serverError() {
  return jsonError("Internal server error", 500);
}
