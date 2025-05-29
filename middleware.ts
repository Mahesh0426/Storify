import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

// This middleware checks if the user is authenticated and redirects them to the dashboard
// if they are trying to access a public route while logged in.
export default clerkMiddleware(async (auth, request) => {
  const user = auth();
  const userId = (await user)?.userId;
  const url = new URL(request.url);
  if (userId && isPublicRoute(request) && url.pathname !== "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // protect non-public routes
  // If the route is not public and the user is not authenticated, protect the route
  if (!isPublicRoute(request)) {
    if (!userId) {
      await auth.protect();
    }
  }
});
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
