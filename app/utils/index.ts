import { useMatches } from '@remix-run/react';
import { useMemo } from 'react';
import type { IUser } from '~/models/user.server';
const DEFAULT_REDIRECT = '/';

/**
 * This should be used anytime the redirect path is user-provided
 * (Like the query string in login/sign pages). This avoids
 * open-redirect vulnerabilities
 *
 * @param {string} to the redirect destination
 * @param {string} defaultRedirect The redirect to use if the destination to is unsafe
 */

export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== 'string') return defaultRedirect;

  if (!to.startsWith('/') || to.startsWith('//')) return defaultRedirect;

  return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON | undefined} The router data or undefined if not found
 */

export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );

  return route?.data;
}

function isUser(user: any): user is IUser {
  return user && typeof user === 'object' && typeof user.email === 'string';
}

export function useOptionalUser(): IUser | undefined {
  const data: any = useMatchesData('root');
  if (!data || !isUser) return undefined;

  return data?.user;
}

export function useUser(): IUser {
  const maybeUser = useOptionalUser();

  if (!maybeUser) {
    throw new Error(
      'No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead'
    );
  }

  return maybeUser;
}
