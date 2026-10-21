import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'

/**
 * Desktop crop of the faculty home. Nothing inside the card can be clicked.
 */
export function FacultyPreviewMock({ className }: { className?: string }) {
  return (
    <ScaledDesignCanvas className={className}>
      <div
        inert
        role="img"
        aria-label="Faculty design preview"
        className="h-full w-full bg-[#333333] font-(family-name:--font-faculty-sans) text-black"
      >
        <div className="mx-auto mt-3 w-[min(1040px,calc(100%-1.5rem))] border border-black bg-[#EEEEEE]">
          <header className="border-b border-black bg-[#990000] px-6 pt-4 pb-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-[#FFCC00]">University of Southern California</p>
              <svg viewBox="0 0 88 36" aria-hidden="true" className="h-8 w-auto">
                <rect x="2" y="1" width="84" height="2.5" fill="#FFCC00" />
                <rect x="8" y="5.5" width="72" height="1.25" fill="#FFCC00" />
                <text
                  x="44"
                  y="25"
                  textAnchor="middle"
                  fill="#FFCC00"
                  fontFamily="Georgia, Times, serif"
                  fontSize="18"
                  fontWeight="700"
                >
                  USC
                </text>
                <rect x="8" y="29" width="72" height="1.25" fill="#FFCC00" />
                <rect x="2" y="32.5" width="84" height="2.5" fill="#FFCC00" />
              </svg>
            </div>
            <div className="mt-4 flex items-end justify-between gap-6">
              <div>
                <p className="text-4xl font-bold text-white">Dr. Alexandra J. Martinez</p>
                <p className="mt-1 text-xl font-bold text-white">Professor, Biomedical Engineering</p>
              </div>
              <p className="text-sm font-bold text-[#EEEEEE]">
                Home | Research | Students | Teaching | Publications
              </p>
            </div>
          </header>
          <div className="grid grid-cols-[minmax(0,1fr)_240px] gap-8 px-8 py-8">
            <div>
              <p className="text-lg leading-relaxed">
                Dr. Alexandra Martinez is a professor of biomedical engineering at the University of
                Southern California. Her research focuses on neural interfaces and brain-computer
                interaction technologies.
              </p>
              <p className="mt-6 text-2xl font-bold">Recent News and Publications</p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-lg">
                <li>Awarded a $3.2M NIH grant for wireless neural interfaces (May 2025).</li>
                <li>Paper published in Nature Neuroscience (April 2025).</li>
              </ul>
            </div>
            <div>
              <div className="border border-black bg-[#CCCCCC] px-4 py-10 text-center text-sm text-[#333333]">
                Portrait
              </div>
              <p className="mt-4 border-b border-dotted border-black pb-1 text-center font-bold">
                Contact Information
              </p>
              <p className="mt-2 text-sm leading-relaxed">
                Email: martinez.a at usc dot edu
                <br />
                Phone: (213) 821-4567
                <br />
                Office: DRB 248
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScaledDesignCanvas>
  )
}
