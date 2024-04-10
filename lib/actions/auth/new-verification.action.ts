"use server";

import prisma from '@/lib/client/prisma';
import { getUserByEmail } from "@/lib/actions/user.action";
import { getVerificationTokenByToken } from "@/lib/actions/auth/verificiation.action";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  console.log('---token----', token)
  console.log('---existingToken----', existingToken)

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  console.log('---1----', token)

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  console.log('---2----', token)

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  console.log('---3----', token)

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { 
      emailVerified: new Date(),
      email: existingToken.email,
    }
  });

  console.log('---4----', token)

  await prisma.verificationToken.delete({
    where: { id: existingToken.id }
  });

  console.log('---5----', token)

  return { success: "Email verified!" };
};