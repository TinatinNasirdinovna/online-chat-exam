"use client"
import ChatWebSocket from '@/components/ChatWebSocket';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';

const page = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div>
      {session ? (
        <>
        <ChatWebSocket userInfo ={session}/>
        
        </>
      ) : (
        <div className='singIn'>
          <h1>Sign in to get acces to WEB_CHAT</h1>
          <button onClick={() => signIn("github")}>Sign in with GitHub</button>
          <button onClick={() => signIn("google")}>Sign in with Google</button>
        </div>
      )}
    </div>
  );
};

export default page;