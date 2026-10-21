import { FacultyLink, facultyTextLink } from '@/components/faculty/faculty-link'

export function FacultyResearch() {
  return (
    <div className="max-w-3xl space-y-4 text-base leading-relaxed md:text-lg">
      <p>
        Dr. Alexandra Martinez&apos;s research focuses on neural interfaces and brain-computer
        interaction technologies. Her work on minimally invasive neural recording devices has led
        to breakthroughs in prosthetic limb control and treatment options for neurological
        disorders.
      </p>
      <p>
        The Neural Engineering Research Laboratory combines materials science, electrical
        engineering, and neuroscience to develop next-generation neural interfaces with improved
        biocompatibility and longevity.
      </p>
      <h2 className="pt-2 text-xl font-bold md:text-2xl">Recent work</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          Awarded a $3.2M NIH grant to develop wireless neural interfaces for spinal cord injury
          patients (May 2025).
        </li>
        <li>
          Paper published in Nature Neuroscience: &quot;Adaptive Neural Decoding Algorithms for
          Robust Brain-Computer Interfaces&quot; (April 2025).
        </li>
        <li>
          Industry partnership with Neuralink to develop clinical translation pathways for neural
          recording technology (March 2025).
        </li>
        <li>
          Paper to appear at IEEE EMBC 2025: &quot;Long-term Stability of Flexible Microelectrode
          Arrays in Motor Cortex&quot; (February 2025).
        </li>
      </ul>
      <p>
        A full list is on the{' '}
        <FacultyLink href="/publications" className={facultyTextLink}>
          publications page
        </FacultyLink>
        .
      </p>
    </div>
  )
}

export function FacultyStudents() {
  return (
    <div className="max-w-3xl space-y-4 text-base leading-relaxed md:text-lg">
      <p>
        The Neural Engineering Research Laboratory is hiring two postdoctoral researchers and three
        Ph.D. students for Fall 2025.
      </p>
      <h2 className="pt-2 text-xl font-bold md:text-2xl">How to inquire</h2>
      <p>
        Email Dr. Martinez at martinez.a at usc dot edu. Administrative questions can go to Sarah
        Johnson at sjohnson at usc dot edu or (213) 821-4568.
      </p>
      <p>The lab is in Denney Research Center (DRB) 232-240. The office is Denney Research Center (DRB) 248.</p>
    </div>
  )
}

export function FacultyTeaching() {
  return (
    <div className="max-w-3xl space-y-4 text-base leading-relaxed md:text-lg">
      <p>
        Dr. Alexandra Martinez is a professor of biomedical engineering at the University of
        Southern California.
      </p>
      <p>For questions about current courses, email martinez.a at usc dot edu or call (213) 821-4567.</p>
    </div>
  )
}
