// import React from 'react'

// const reactJSX = (<div></div>)

// export default reactJSX


import '#/styles/globals.css'
import { AddressBar } from '#/ui/playground/AddressBar'
// import { GlobalNav } from '#/ui/playground/GlobalNav'
import { VercelLogo } from '#/ui/playground/VercelLogo'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="[color-scheme:dark]">
      <head />
      <body className="overflow-y-scroll bg-gray-1100 bg-[url('/grid.svg')]">
        {/* <GlobalNav /> */}

        <div className="lg:pl-72">
          <div className="mx-auto max-w-4xl space-y-8 px-2 pt-20 lg:py-8 lg:px-8">
            <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
              <div className="rounded-lg bg-black">
                <AddressBar />
              </div>
            </div>

            <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
              <div className="rounded-lg bg-black p-3.5 lg:p-6">{children}</div>
            </div>

            <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
              <div className="rounded-lg bg-black">
                <Byline />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

function Byline() {
  return (
    <div className="flex items-center justify-between space-x-4 p-3.5 lg:px-5 lg:py-3">
      <div className="flex items-center space-x-1.5">
        <div className="text-sm text-gray-600">By</div>
        <a href="https://vercel.com" title="Vercel">
          <div className="w-16 text-gray-300 hover:text-gray-50">
            <VercelLogo />
          </div>
        </a>
      </div>

      <div className="text-sm text-gray-600">
        <a
          className="underline decoration-dotted underline-offset-4 hover:text-gray-400"
          href="https://github.com/vercel/app-playground"
        >
          View code
        </a>
        {' or '}
        <a
          className="underline decoration-dotted underline-offset-4 hover:text-gray-400"
          href="https://vercel.com/templates/next.js/app-directory"
        >
          deploy your own
        </a>
      </div>
    </div>
  )
}
