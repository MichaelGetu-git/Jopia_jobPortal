import React, { useState } from 'react';

function Authentication() {
  const [isSignedIn, setIsSignedIn] = useState(null);

  const signIn = () => {
    setIsSignedIn(true);
  };

  const signOut = () => {
    setIsSignedIn(false);
  };

  return { isSignedIn, signIn, signOut };
}

export default Authentication;
