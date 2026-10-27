import Image from "next/image";
import { cn } from "@/lib/utils";

export function Photo({
  src,
  alt,
  sizes,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const missing = src.trim() === "";

  return (
    <div className={cn("group relative overflow-hidden bg-muted", className)}>
      {missing ? (
        <div className="absolute inset-0 flex items-center justify-center border border-border p-4 text-center">
          <span className="text-sm break-words text-muted-foreground">
            {alt.trim() || "Photo not set"}
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      )}
    </div>
  );
}
