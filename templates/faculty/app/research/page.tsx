import Link from "next/link";

const textLink =
  "font-semibold text-[#990000] underline underline-offset-2 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#990000]";

export default function ResearchPage() {
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
        A full list is on the{" "}
        <Link href="/publications" className={textLink}>
          publications page
        </Link>
        .
      </p>
    </div>
  );
}
