import Link from "next/link";
import { SmartImage } from "@/components/media/SmartImage";
import { cn } from "@/lib/utils";
import { Heading } from "./Heading";

type CardTone = "default" | "warm";

type BaseProps = {
  href: string;
  title: string;
  excerpt?: string;
  footer?: string;
  image?: string;
  eyebrow?: string;
  className?: string;
};

export function LeadEditorialCard({
  href,
  title,
  excerpt,
  footer,
  image,
  eyebrow,
  className,
}: BaseProps) {
  return (
    <Link
      href={href}
      className={cn(
        "el-surface-card group grid overflow-hidden transition-all hover:opacity-95 md:grid-cols-[1.12fr_1fr]",
        className,
      )}
    >
      <SmartImage
        src={image ?? "/images/places/placeholder.jpg"}
        alt={title}
        fallbackLabel={eyebrow ?? "Lead"}
        className="aspect-[5/4] w-full md:aspect-auto md:min-h-[440px]"
        imgClassName="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
      />
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {eyebrow && <p className="editorial-kicker">{eyebrow}</p>}
        <div className="editorial-rule max-w-24" />
        <Heading
          as="h3"
          size="lg"
          font="serif"
          className="text-balance transition-opacity group-hover:opacity-75"
        >
          {title}
        </Heading>
        {excerpt && (
          <p className="font-sans text-[1.13rem] leading-[1.44] tracking-[0.18px] text-muted-foreground">
            {excerpt}
          </p>
        )}
        {footer && (
          <p className="font-sans text-[0.88rem] leading-[1.43] tracking-[0.14px] text-muted-foreground/80">
            {footer}
          </p>
        )}
        <p className="mt-auto font-sans text-[0.94rem] leading-[1.47] tracking-[0.15px] text-muted-foreground/70">
          Open Story
        </p>
      </div>
    </Link>
  );
}

export function StandardEditorialCard({
  href,
  title,
  excerpt,
  footer,
  image,
  eyebrow,
  className,
  tone = "default",
}: BaseProps & { tone?: CardTone }) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border transition-colors",
        tone === "warm"
          ? "border-transparent bg-[#f5f2ef]/80 shadow-[rgba(78,50,23,0.04)_0px_6px_16px]"
          : "border-border bg-white shadow-[rgba(0,0,0,0.075)_0px_0px_0px_0.5px_inset,rgba(0,0,0,0.06)_0px_0px_0px_1px,rgba(0,0,0,0.04)_0px_1px_2px,rgba(0,0,0,0.04)_0px_2px_4px]",
        className,
      )}
    >
      <SmartImage
        src={image ?? "/images/places/placeholder.jpg"}
        alt={title}
        fallbackLabel={eyebrow ?? "Guide"}
        className="aspect-[16/10] w-full"
        imgClassName="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        {eyebrow && <p className="editorial-kicker">{eyebrow}</p>}
        <div className="editorial-rule max-w-16" />
        <Heading
          as="h3"
          size="sm"
          font="serif"
          className="text-balance transition-opacity group-hover:opacity-75"
        >
          {title}
        </Heading>
        {excerpt && (
          <p className="line-clamp-3 font-sans text-[1rem] leading-[1.5] tracking-[0.16px] text-muted-foreground">
            {excerpt}
          </p>
        )}
        {footer && (
          <p className="mt-auto pt-1 font-sans text-[0.88rem] leading-[1.43] tracking-[0.14px] text-muted-foreground/75">
            {footer}
          </p>
        )}
      </div>
    </Link>
  );
}

export function CompactEditorialCard({
  href,
  title,
  excerpt,
  image,
  eyebrow,
  className,
}: BaseProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex gap-3 rounded-2xl border border-border bg-[#f5f5f5] p-3 transition-colors hover:border-black/15",
        className,
      )}
    >
      <SmartImage
        src={image ?? "/images/places/placeholder.jpg"}
        alt={title}
        fallbackLabel={eyebrow ?? "Area"}
        className="h-20 w-24 shrink-0"
        imgClassName="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="min-w-0">
        {eyebrow && <p className="label-xs mb-1 text-muted-foreground/60">{eyebrow}</p>}
        <Heading
          as="h3"
          size="xs"
          font="serif"
          className="truncate text-foreground/92 transition-opacity group-hover:opacity-75"
        >
          {title}
        </Heading>
        {excerpt && (
          <p className="mt-1 line-clamp-2 font-sans text-[0.88rem] leading-[1.43] tracking-[0.14px] text-muted-foreground/82">
            {excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}

export function TextNoteCard({
  title,
  body,
  href,
  cta,
  className,
  tone = "light",
}: {
  title: string;
  body: string;
  href?: string;
  cta?: string;
  className?: string;
  tone?: "light" | "ink";
}) {
  const cardClassName = cn(
    "flex h-full flex-col gap-3 rounded-3xl border p-5",
    tone === "ink"
      ? "note-panel"
      : "border-border bg-[#f5f5f5] text-foreground shadow-[rgba(0,0,0,0.075)_0px_0px_0px_0.5px_inset]",
    className,
  );

  const content = (
    <>
      <p className={cn("editorial-kicker", tone === "ink" && "text-current/70")}>Note</p>
      <div className={cn("editorial-rule max-w-14", tone === "ink" && "bg-current/25 after:bg-current/60")} />
      <Heading
        as="h3"
        size="sm"
        font="serif"
        className={cn("text-balance", tone === "ink" && "text-current")}
      >
        {title}
      </Heading>
      <p className={cn("font-sans text-[1rem] leading-[1.5] tracking-[0.16px]", tone === "ink" ? "text-current/80" : "text-muted-foreground")}>{body}</p>
      {href && cta && (
        <span
          className={cn(
            "mt-auto font-sans text-[0.94rem] leading-[1.47] tracking-[0.15px]",
            tone === "ink" ? "text-current/80" : "text-muted-foreground/75",
          )}
        >
          {cta}
        </span>
      )}
    </>
  );

  if (href && cta) {
    return (
      <Link href={href} className={cn(cardClassName, "transition-opacity hover:opacity-85")}>
        {content}
      </Link>
    );
  }

  return <article className={cardClassName}>{content}</article>;
}
