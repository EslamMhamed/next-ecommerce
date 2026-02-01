import Footer from "@/components/Footer"
import Header from "@/components/shared/header"

export const dynamic = "force-dynamic";

function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
        <main className="flex-1 wrapper">
            {children}
        </main>
        <Footer />
    </div>
  )
}

export default RootLayout