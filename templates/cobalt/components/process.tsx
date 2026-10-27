const STEPS = [
  {
    title: "Throw",
    body: "Each form is centered and pulled on the wheel from about a pound of stoneware.",
  },
  {
    title: "Trim",
    body: "Leather-hard pieces are flipped, trimmed for a clean foot, and handles are attached.",
  },
  {
    title: "Bisque",
    body: "A first firing to cone 04 turns clay into something that can hold glaze.",
  },
  {
    title: "Glaze & fire",
    body: "Dipped by hand, then fired to cone 6 so every piece is food- and dishwasher-safe.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="scroll-mt-16 border-b border-border bg-card"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 py-16 md:px-8 lg:py-24">
        <h2 className="max-w-2xl font-display text-4xl font-semibold tracking-tight text-balance md:text-5xl">
          Four steps, about three weeks, per mug.
        </h2>
        <ol className="grid border-t border-foreground sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="flex flex-col gap-4 border-b border-border py-8 sm:pr-8 lg:border-b-0"
            >
              <span className="font-mono text-xs text-primary">{`Step ${index + 1}`}</span>
              <h3 className="font-display text-2xl font-medium">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
