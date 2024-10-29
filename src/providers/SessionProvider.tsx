"use client"
import { FC, ReactNode } from "react";
import { SessionProvider as NextAuthPeovider } from "next-auth/react";
import { Session } from "next-auth";

interface ISessionProviderProps {
  children: ReactNode;
  session: Session | null;
}

const SessionProvider: FC<ISessionProviderProps> = ({ children, session }) => {
  return <NextAuthPeovider session={session}>{children}</NextAuthPeovider>;
};

export default SessionProvider;
