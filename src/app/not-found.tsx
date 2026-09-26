import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <div className="container section" style={{ display: "grid", gap: 24, justifyItems: "start" }}>
      <p className="t-label c-tertiary">404</p>
      <h1 className="t-display-l">
        This page was a <em className="t-serif-em c-accent">road not taken</em>.
      </h1>
      <p className="t-body-l c-secondary">The link may be old, or the page never existed.</p>
      <ButtonLink href="/">Back to the work</ButtonLink>
    </div>
  );
}
