import './globals.css'
import {ReactNode} from "react";

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={'w-screen h-screen'}>{children}</body>
    </html>
  )
}
