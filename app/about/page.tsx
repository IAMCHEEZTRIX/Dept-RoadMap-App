import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TeamCard } from "@/components/team-card"
import { teamMembers } from "@/data/team"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header Section */}
        <section className="border-b border-[color:var(--border-color)] bg-gradient-to-b from-[color:var(--bg)] to-[color:var(--card)]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-[color:var(--text)] sm:text-5xl text-balance">
                About Us
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-[color:var(--muted)] leading-relaxed text-pretty">
                Meet our dedicated faculty and staff who are committed to excellence in computer science education and
                research.
              </p>
            </div>
          </div>
        </section>

        {/* Team Grid Section */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
