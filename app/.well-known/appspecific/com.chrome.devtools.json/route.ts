import { NextResponse } from "next/server";

/**
 * Route handler for Chrome DevTools workspace auto-discovery.
 * Silences Chrome DevTools 404 log noise in local development terminal.
 * 
 * @returns {Promise<NextResponse>} Empty JSON response with HTTP status 200.
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({});
}
