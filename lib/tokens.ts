import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

import prisma from "@/lib/client/prisma";
import { getVerificationTokenByEmail } from "@/lib/actions/auth/verificiation.action";
import { getPasswordResetTokenByEmail } from "@/lib/actions/auth/password-reset.action";

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id }
    });
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires
    }
  });

  return passwordResetToken;
}

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verficationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    }
  });

  return verficationToken;
};