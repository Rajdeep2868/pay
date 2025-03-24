import { Sparkles, Coins, Database } from "lucide-react"

export default function Future() {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-background to-background z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Future of FusionPay</h2>
          <p className="text-foreground/80">Our roadmap for upcoming features and innovations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-background/80 backdrop-blur-sm border border-border/60 rounded-xl p-6">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Based Smart Payments</h3>
            <p className="text-foreground/70 mb-4">
              Our AI system will automatically select the best payment option (crypto or fiat) based on:
            </p>
            <ul className="space-y-2 text-foreground/70">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Current exchange rates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Transaction fees</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>User preferences</span>
              </li>
            </ul>
          </div>

          <div className="bg-background/80 backdrop-blur-sm border border-border/60 rounded-xl p-6">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Coins className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Crypto Reward System</h3>
            <p className="text-foreground/70 mb-4">Earn cashback in NFTs & tokens for every transaction:</p>
            <ul className="space-y-2 text-foreground/70">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Tiered rewards based on transaction volume</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Exclusive NFT collections for loyal users</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Token rewards with staking options</span>
              </li>
            </ul>
          </div>

          <div className="bg-background/80 backdrop-blur-sm border border-border/60 rounded-xl p-6">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">DeFi Integration</h3>
            <p className="text-foreground/70 mb-4">Use funds from DeFi lending protocols directly for payments:</p>
            <ul className="space-y-2 text-foreground/70">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Borrow against your crypto assets</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Earn interest on unused balances</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Seamless integration with major DeFi protocols</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

