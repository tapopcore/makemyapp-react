import type { ReactNode } from "react";
import { SITE } from "../content";

const S = ({ h, children }: { h: string; children: ReactNode }) => (
  <section className="border-t border-ink py-8">
    <h2 className="display text-[28px] tracking-[-0.02em]">{h}</h2>
    <div className="mt-4 space-y-3 text-[17px] leading-relaxed text-ink-2 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">{children}</div>
  </section>
);

export default function Privacy() {
  return (
    <article className="hero-top wrap max-w-3xl pb-20 sm:pb-28">
      <p className="label text-mute">Effective 21 June 2025</p>
      <h1 className="display mt-4 text-[clamp(48px,8vw,96px)]">Privacy policy</h1>
      <p className="mt-6 text-[18px] leading-relaxed text-ink-2">MakeMyApp respects your privacy. This policy explains how we collect, use and protect the information you share when you visit makemyapp.co or use our services.</p>

      <S h="1. Information we collect">
        <p><b>Information you provide:</b></p>
        <ul><li>Name, email, phone number, business name and other details you submit through forms, WhatsApp or chat.</li><li>Project information shared during discussions or onboarding.</li></ul>
        <p><b>Collected automatically:</b></p>
        <ul><li>IP address, browser type, device information and pages visited, through cookies and analytics tools.</li><li>Usage data that helps us improve the website and our services.</li></ul>
        <p>We do not collect sensitive personal data unless it is required and you have agreed to it.</p>
      </S>
      <S h="2. How we use it">
        <ul><li>To reply to your enquiries and deliver the services you ask for.</li><li>To share updates, offers or changes. You can opt out any time.</li><li>To improve our website, services and customer experience.</li><li>To meet legal obligations.</li></ul>
        <p><b>We do not sell or rent your personal data to anyone.</b></p>
      </S>
      <S h="3. Sharing and disclosure">
        <ul><li>With trusted service providers who help us operate, such as hosting and CRM tools, under confidentiality.</li><li>When required by law, court order or a government request.</li><li>To protect our rights, our users and our business.</li></ul>
      </S>
      <S h="4. Data security">
        <p>We use appropriate technical and organisational measures to protect your data from unauthorised access, change, disclosure or loss. No method of transmission over the internet or electronic storage is completely secure.</p>
      </S>
      <S h="5. Cookies and tracking">
        <p>We use cookies and similar tools, including Google Analytics, to understand traffic and improve your experience. You can control or disable cookies in your browser settings.</p>
      </S>
      <S h="6. Your rights">
        <p>You may ask to access, update or delete your personal information, opt out of marketing, request a copy of your data, or withdraw consent. Write to <a className="font-semibold underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
      </S>
      <S h="7. Third-party links">
        <p>Our website links to other sites, including client projects. We are not responsible for their privacy practices or content.</p>
      </S>
      <S h="8. Changes to this policy">
        <p>We may update this policy from time to time. Updates will appear on this page with a new effective date.</p>
      </S>
      <S h="9. Contact">
        <p>{SITE.legal} (MakeMyApp)<br />{SITE.address}<br /><a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a> · {SITE.phone}</p>
      </S>
    </article>
  );
}
