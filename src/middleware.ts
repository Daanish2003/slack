import { convexAuthNextjsMiddleware, createRouteMatcher, isAuthenticatedNextjs, nextjsMiddlewareRedirect } from "@convex-dev/auth/nextjs/server";
import { usePathname } from "next/navigation";
import { useWorkspaceId } from "./hooks/use-workspace-id";
import { useGetWorkspace } from "./features/workspaces/api/use-get-workspace";

const isPublicPage = createRouteMatcher(["/auth"])
const isProtectedPage = createRouteMatcher(["/workspaces/*"])

 
export default convexAuthNextjsMiddleware((request) => {
    if(!isPublicPage(request) && !isAuthenticatedNextjs()) {
        return nextjsMiddlewareRedirect(request, "/auth")
    }
    // TODO: Redirect user away from "/auth" if authenticated
    if(isPublicPage(request) && isAuthenticatedNextjs()) {
        return nextjsMiddlewareRedirect(request, `/`)
    }
    if(isProtectedPage(request) && !isAuthenticatedNextjs()) {
        return nextjsMiddlewareRedirect(request, "/auth")
    }
});
 
export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};