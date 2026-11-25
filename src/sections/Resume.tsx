import { useState } from "react";
import { Download, FileText, Maximize2 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";

export function Resume() {
  const [failed, setFailed] = useState(false);

  return (
    <section id="resume" className="section scroll-mt-24 py-12">
      <SectionHeading
        index="07"
        eyebrow="Résumé"
        title="Curriculum Vitae"
        description="View the compiled résumé inline or download a local PDF copy."
      />

      <div className="mx-auto mt-6 max-w-4xl">
        <div className="overflow-hidden rounded-2xl border border-line bg-panel shadow-soft">
          <div className="flex items-center justify-between border-b border-line bg-panel-2 px-4 py-2.5">
            <div className="flex items-center gap-2 font-mono text-xs text-muted">
              <FileText size={14} className="text-accent dark:text-accent-soft" />
              <span>{profile.name} — Résumé.pdf</span>
            </div>
            <div className="flex items-center gap-2">
              <a href={profile.cvPath} target="_blank" rel="noreferrer">
                <Button size="sm" variant="ghost" asChild>
                  <Maximize2 size={14} />
                  <span className="hidden sm:inline">Open</span>
                </Button>
              </a>
              <a href={profile.cvPath} download="Karim-Souissi-CV.pdf">
                <Button size="sm" variant="secondary" asChild>
                  <Download size={14} />
                  <span>Download</span>
                </Button>
              </a>
            </div>
          </div>

          <div className="relative h-[520px] w-full bg-panel-2 sm:h-[640px]">
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
                <FileText size={36} className="text-accent dark:text-accent-soft" />
                <p className="text-sm text-muted">
                  Download the résumé PDF directly below.
                </p>
                <a href={profile.cvPath} download="Karim-Souissi-CV.pdf">
                  <Button size="sm" variant="secondary" asChild>
                    <Download size={14} />
                    <span>Download CV</span>
                  </Button>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
