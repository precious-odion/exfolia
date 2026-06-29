import { CheckCircle2 } from "lucide-react";

const people = [
    {
        src: "/people/person-1.jpg",
        alt: "Data analyst reviewing analytics dashboard",
        name: "Maya Chen",
        role: "Data Analyst"
    },
    {
        src: "/people/person-2.jpg",
        alt: "Growth lead exploring business data",
        name: "Sandra Mensah",
        role: "Growth Lead"
    },
    {
        src: "/people/person-3.jpg",
        alt: "Product manager working with reports",
        name: "Noah Smith",
        role: "Product Manager"
    },
    {
        src: "/people/person-4.jpg",
        alt: "Founder analyzing CSV data",
        name: "Elena Brooks",
        role: "Founder"
    }
];

type AvatarPhotoProps = {
    src: string;
    alt: string;
    className?: string;
};

export function AvatarPhoto({ src, alt, className = "" }: AvatarPhotoProps) {
    return (
        <span
            className={`inline-flex shrink-0 overflow-hidden rounded-full border-2 border-background bg-surface ${className}`}
        >
            <img src={src} alt={alt} className="h-full w-full object-cover" />
        </span>
    );
}

export function AvatarStack({ className = "" }: { className?: string }) {
    return (
        <div className={`flex -space-x-3 ${className}`} aria-label="People using Exfolia">
            {people.map((person) => (
                <AvatarPhoto
                    key={person.src}
                    src={person.src}
                    alt={person.alt}
                    className="h-11 w-11"
                />
            ))}
        </div>
    );
}

export function HeroPeopleCards({ className = "" }: { className?: string }) {
    const featuredPeople = people.slice(0, 3);

    return (
        <div className={`grid gap-4 sm:grid-cols-3 lg:gap-5 ${className}`}>
            {featuredPeople.map((person, index) => (
                <article
                    key={person.src}
                    className={`hero-card group relative min-h-[310px] overflow-hidden rounded-[1.75rem] border border-border bg-surface hero-photo-card ${index === 1 ? "sm:translate-y-8" : index === 2 ? "sm:translate-y-14" : ""
                        }`}
                >
                    <img
                        src={person.src}
                        alt={person.alt}
                        className="h-full min-h-[310px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 hero-photo-overlay p-5 pt-20 text-white">
                        <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold">{person.name}</p>
                            <CheckCircle2 size={16} className="text-accent-mint-soft" />
                        </div>
                        <p className="mt-1 text-xs font-medium text-white/78">{person.role}</p>
                    </div>
                </article>
            ))}
        </div>
    );
}

export function PeoplePreview({ className = "" }: { className?: string }) {
    return (
        <div className={`grid gap-3 sm:grid-cols-3 ${className}`}>
            {people.slice(0, 3).map((person) => (
                <div
                    key={person.src}
                    className="overflow-hidden rounded-3xl border border-border bg-surface"
                >
                    <img src={person.src} alt={person.alt} className="h-44 w-full object-cover" />
                </div>
            ))}
        </div>
    );
}
