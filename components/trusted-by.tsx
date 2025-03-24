export default function TrustedBy() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-xl text-foreground/70">Trusted by Industry Leaders</h2>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-8 w-32 bg-foreground/10 rounded-md opacity-50"></div>
          ))}
        </div>
      </div>
    </section>
  )
}

