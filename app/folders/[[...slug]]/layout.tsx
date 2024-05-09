import React from 'react'
import { RefreshProvider } from "../components/RefreshContext";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <RefreshProvider>{children}</RefreshProvider>
  )
}
