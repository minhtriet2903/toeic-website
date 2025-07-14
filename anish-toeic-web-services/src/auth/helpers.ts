import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { google } from 'googleapis';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const verifyGoogleToken = async (token: string) => {
  const oauth2Client = new google.auth.OAuth2();
  const ticket = await oauth2Client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_AUTH_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new UnauthorizedException('Google authentication failed');
  }

  const { email } = payload;
  return email;
};

export const validatePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
