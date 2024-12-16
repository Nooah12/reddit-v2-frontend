import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import { QueryClientProvider } from '@/providers/query-client-provider'
import './globals.css'
//import { config } from '@fortawesome/fontawesome-svg-core'
//import '@fortawesome/fontawesome-svg-core/styles.css'
//config.autoAddCss = false

export const metadata: Metadata = {
  title: 'Reddit v2',
  description: 'Reddit clone app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={('flex min-h-screen flex-col items-center bg-zinc-50 font-medium text-zinc-800')}>
        <QueryClientProvider>
          {children}
          <Toaster />
        </QueryClientProvider>
      </body>
    </html>
  )
}
