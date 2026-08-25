import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Product } from "@/components/landing/Product";
import { Models } from "@/components/landing/Models";
import { Mechanics } from "@/components/landing/Mechanics";
import { Workspace } from "@/components/landing/Workspace";
import { ClientPath } from "@/components/landing/ClientPath";
import { ConsentControl } from "@/components/landing/ConsentControl";
import { Connect } from "@/components/landing/Connect";
import { LeadForm } from "@/components/landing/LeadForm";
import { Faq, faqItems } from "@/components/landing/Faq";
import { Footer } from "@/components/landing/Footer";

const title = "Bill.su — регулярные платежи через СБП для бизнеса";
const description =
  "Приём подписок, абонементов и регулярных счетов через СБП. Техническое подключение до недели, выплаты T+3 напрямую от НКО.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };

  return (
    <div className="min-h-screen">
      <Nav />
      <main id="main-content">
        <Hero />
        <Product />
        <Workspace />
        <Models />
        <ClientPath />
        <Mechanics />
        <ConsentControl />
        <Connect />
        <LeadForm />
        <Faq />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </div>
  );
}
