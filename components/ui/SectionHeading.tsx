interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({ title, subtitle, centered = false }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 relative inline-block">
        {title}
        <span className="absolute -bottom-2 left-0 w-12 h-1 bg-accent"></span>
        {centered && <span className="absolute -bottom-2 right-0 left-0 mx-auto w-12 h-1 bg-accent"></span>}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-gray-600 max-w-2xl ${centered ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
