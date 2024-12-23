import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 500 500"
      className={cn("w-8 h-8", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Crescent moon shape */}
      <path
        d="M250 50c110.457 0 200 89.543 200 200s-89.543 200-200 200c-110.457 0-200-89.543-200-200 0-38.641 10.954-74.737 29.896-105.304C112.321 92.729 176.466 50 250 50z"
        className="fill-primary"
      />
      {/* Cat ear left */}
      <path
        d="M180 180l-40-60c-2.5-3.75-1.25-8.75 2.5-11.25 3.75-2.5 8.75-1.25 11.25 2.5l40 60c2.5 3.75 1.25 8.75-2.5 11.25-3.75 2.5-8.75 1.25-11.25-2.5z"
        className="fill-primary"
      />
      {/* Cat ear right */}
      <path
        d="M320 180l40-60c2.5-3.75 1.25-8.75-2.5-11.25-3.75-2.5-8.75-1.25-11.25 2.5l-40 60c-2.5 3.75-1.25 8.75 2.5 11.25 3.75 2.5 8.75 1.25 11.25-2.5z"
        className="fill-primary"
      />
      {/* Cat eye left */}
      <circle cx="200" cy="220" r="15" className="fill-background" />
      {/* Cat eye right */}
      <circle cx="300" cy="220" r="15" className="fill-background" />
    </svg>
  );
}