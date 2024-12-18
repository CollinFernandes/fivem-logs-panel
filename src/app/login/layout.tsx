import React, { Suspense } from "react"

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense>
        {children}
    </Suspense>
  );
}

export default LoginLayout;