import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Maximize2 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";

export function Resume() {
  const [failed, setFailed] = useState(false);

  return (
    <section id="resume" className="section scroll-mt-24 py-24">
      <SectionHeading
        eyebrow="Résumé"
        title="The one-page version"
        description="Prefer a PDF? View it inline or download a copy."
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto mt-12 max-w-4xl"
      >
        <div className="overflow-hidden rounded-2xl border border-line bg-panel shadow-soft">
          <div className="flex items-center justify-between border-b border-line bg-panel-2 px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-muted">
              <FileText size={16} className="text-accent" />
              {profile.name} — Résumé
            </div>
            <div className="flex items-center gap-2">
              <a href={profile.cvPath} target="_blank" rel="noreferrer">
                <Button size="sm" variant="ghost">
                  <Maximize2 size={14} />
                  <span className="hidden sm:inline">Open</span>
                </Button>
              </a>
              <a href={profile.cvPath} download>
                <Button size="sm" variant="secondary">
                  <Download size={14} />
                  Download
                </Button>
              </a>
            </div>
          </div>

          <div className="relative aspect-[1/1.3] w-full bg-panel-2 sm:aspect-[1.4/1]">
            {!failed ? (
              <object
                data={`${profile.cvPath}#toolbar=0&view=FitH`}
                type="application/pdf"
                className="h-full w-full"
                onError={() => setFailed(true)}
              >
                <iframe
                  src={profile.cvPath}
                  title="Résumé"
                  className="h-full w-full"
                  onError={() => setFailed(true)}
                />
              </object>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                <FileText size={40} className="text-accent" />
                <p className="text-sm text-muted">
                  Add your résumé PDF at{" "}
                  <code className="text-fg">public/karim-souissi-cv.pdf</code>{" "}
                  to preview it here.
                </p>
                <a href={profile.cvPath} download>
                  <Button size="sm" variant="secondary">
                    <Download size={14} />
                    Download CV
                  </Button>
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
