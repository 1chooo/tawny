import { USCLink, uscTextLink } from '@/components/usc/usc-link'
import { PortraitPlaceholder } from '@/components/usc/marks'

export function USCHome() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_280px]">
      <aside className="md:col-start-2 md:row-start-1">
        <PortraitPlaceholder />
        <h2 className="border-b border-dotted border-black pb-1 text-center font-bold">
          Contact Information
        </h2>
        <div className="mt-2 space-y-2 leading-relaxed">
          <p>
            <strong>Email:</strong> martinez.a at usc dot edu
          </p>
          <p>
            <strong>Phone:</strong> (213) 821-4567
          </p>
          <p>
            <strong>Office:</strong> Denney Research Center (DRB) 248
          </p>
          <p>
            <strong>Lab:</strong> Denney Research Center (DRB) 232-240
          </p>
          <p className="mt-3">
            <strong>Administrative Assistant:</strong>
            <br />
            Sarah Johnson
            <br />
            sjohnson at usc dot edu
            <br />
            (213) 821-4568
          </p>
        </div>
      </aside>

      <div className="md:col-start-1 md:row-start-1">
        <p className="text-base leading-relaxed md:text-lg">
          Dr. Alexandra Martinez is a professor of biomedical engineering at the University of
          Southern California. She received her Ph.D. in 2012 from Stanford University. Dr.
          Martinez&apos;s research focuses on neural interfaces and brain-computer interaction
          technologies. Her pioneering work in minimally invasive neural recording devices has led
          to breakthroughs in prosthetic limb control and treatment options for neurological
          disorders. Her lab combines expertise in materials science, electrical engineering, and
          neuroscience to develop next-generation neural interfaces with improved biocompatibility
          and longevity.
        </p>

        <h2 className="mt-8 mb-3 text-xl font-bold md:text-2xl">Recent News and Publications</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li className="text-base leading-relaxed md:text-lg">
            Awarded $3.2M NIH grant to develop wireless neural interfaces for spinal cord injury
            patients (May 2025).
          </li>
          <li className="text-base leading-relaxed md:text-lg">
            Paper published in Nature Neuroscience: &quot;Adaptive Neural Decoding Algorithms for
            Robust Brain-Computer Interfaces&quot; (April 2025).
          </li>
          <li className="text-base leading-relaxed md:text-lg">
            Lab receives industry partnership with Neuralink to develop clinical translation
            pathways for neural recording technology (March 2025).
          </li>
          <li className="text-base leading-relaxed md:text-lg">
            Paper to appear at IEEE EMBC 2025: &quot;Long-term Stability of Flexible Microelectrode
            Arrays in Motor Cortex&quot; (February 2025).
          </li>
          <li className="text-base leading-relaxed md:text-lg">
            Opening for two postdoctoral researchers and three Ph.D. students for Fall 2025. See
            the{' '}
            <USCLink href="/students" className={uscTextLink}>
              Students page
            </USCLink>{' '}
            for details.
          </li>
        </ul>
      </div>
    </div>
  )
}
