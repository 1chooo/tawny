import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { GithubIcon } from "@/components/github-icon";
import { profile } from "@/lib/profile";

function VcardContacts() {
  return (
    <ul className="vcard-contacts">
      <li className="vcard-contact">
        <span className="vcard-icon-box">
          <MapPin size={18} aria-hidden="true" />
        </span>
        <div className="vcard-contact-copy">
          <p className="vcard-contact-label">Location</p>
          <p className="vcard-contact-value">{profile.city}</p>
        </div>
      </li>
      <li className="vcard-contact">
        <span className="vcard-icon-box">
          <Mail size={18} aria-hidden="true" />
        </span>
        <div className="vcard-contact-copy">
          <p className="vcard-contact-label">Email</p>
          <a className="vcard-contact-value" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>
      </li>
      <li className="vcard-contact">
        <span className="vcard-icon-box">
          <GithubIcon />
        </span>
        <div className="vcard-contact-copy">
          <p className="vcard-contact-label">GitHub</p>
          <a
            className="vcard-contact-value"
            href={`https://github.com/${profile.github}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {profile.github}
          </a>
        </div>
      </li>
    </ul>
  );
}

export function VcardSidebar() {
  return (
    <aside className="vcard-sidebar">
      <div className="vcard-identity">
        <div className="vcard-avatar">
          <Image
            src={profile.avatar}
            alt=""
            width={150}
            height={150}
            priority
            className="vcard-avatar-img"
          />
        </div>
        <div>
          <h1 className="vcard-name">{profile.name}</h1>
          <p className="vcard-status">{profile.status}</p>
        </div>
      </div>
      <div className="vcard-sidebar-more">
        <div className="vcard-separator" />
        <VcardContacts />
      </div>
    </aside>
  );
}

export function VcardMobileContacts() {
  return (
    <aside className="vcard-mobile-contacts" aria-label="Contacts">
      <VcardContacts />
    </aside>
  );
}
