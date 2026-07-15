// GoHighLevel API client — Wave 1.0 integration spine.
// TODO: implement OAuth token exchange/refresh and typed wrappers around
// the appointments, contacts, and conversations endpoints. Run the Week-1
// GHL spike (see roadmap §07) before committing to scope here.

export type GhlOAuthTokens = {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  locationId: string;
};

export async function exchangeGhlOAuthCode(_code: string): Promise<GhlOAuthTokens> {
  throw new Error("Not implemented: GHL OAuth exchange");
}

export async function refreshGhlOAuthTokens(
  _tokens: GhlOAuthTokens,
): Promise<GhlOAuthTokens> {
  throw new Error("Not implemented: GHL OAuth refresh");
}

export async function sendSms(_params: {
  locationId: string;
  contactId: string;
  body: string;
}): Promise<void> {
  throw new Error("Not implemented: GHL SMS send");
}
