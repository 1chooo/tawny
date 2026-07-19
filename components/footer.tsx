export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-foreground">
                <span className="text-background text-xs font-bold tracking-tight">DC</span>
              </span>
              <span className="font-semibold text-foreground tracking-tight">DesignCraft</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Handcrafted web designs and UI components for developers and designers who care about quality.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <p className="text-xs font-semibold text-foreground uppercase tracking-widest mb-3">Product</p>
              <ul className="flex flex-col gap-2">
                {['Designs', 'Components', 'Bundle', 'Changelog'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground uppercase tracking-widest mb-3">Resources</p>
              <ul className="flex flex-col gap-2">
                {['Documentation', 'Figma Files', 'License', 'FAQ'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground uppercase tracking-widest mb-3">Connect</p>
              <ul className="flex flex-col gap-2">
                {['Twitter / X', 'GitHub', 'Dribbble', 'Email'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} DesignCraft. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
