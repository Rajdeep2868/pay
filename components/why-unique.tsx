import { Check } from "lucide-react"

export default function WhyUnique() {
  return (
    <section className="py-16 md:py-24 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why FusionPay is Unique</h2>
          <p className="text-foreground/80">
            Our innovative approach to crypto payments sets us apart from the competition
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-background/80 backdrop-blur-sm border border-border/60 rounded-xl p-6">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Crypto-to-Fiat Transactions</h3>
            <p className="text-foreground/70">Spend crypto anywhere without merchants needing to accept it directly.</p>
          </div>

          <div className="bg-background/80 backdrop-blur-sm border border-border/60 rounded-xl p-6">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">1-Tap Payment</h3>
            <p className="text-foreground/70">
              No complex steps; just tap, pay, and go with our streamlined interface.
            </p>
          </div>

          <div className="bg-background/80 backdrop-blur-sm border border-border/60 rounded-xl p-6">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Reversible Transactions</h3>
            <p className="text-foreground/70">Prevents loss due to scams or mistakes with our escrow system.</p>
          </div>

          <div className="bg-background/80 backdrop-blur-sm border border-border/60 rounded-xl p-6">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multi-Chain & Multi-Wallet</h3>
            <p className="text-foreground/70">Works with multiple blockchains & wallets for maximum flexibility.</p>
          </div>

          <div className="bg-background/80 backdrop-blur-sm border border-border/60 rounded-xl p-6">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No KYC Required</h3>
            <p className="text-foreground/70">Fully decentralized, non-custodial system that respects your privacy.</p>
          </div>

          <div className="bg-background/80 backdrop-blur-sm border border-border/60 rounded-xl p-6">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Accessibility</h3>
            <p className="text-foreground/70">Use FusionPay anywhere in the world without geographical restrictions.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

