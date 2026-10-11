// The landing page has no request-time data, so serve it as a static document.
// This removes the serverless render from the critical navigation request.
export const prerender = true;
