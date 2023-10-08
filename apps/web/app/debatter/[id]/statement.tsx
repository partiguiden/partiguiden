import MemberImage from "@components/parliament/member-image";
import type { DebateStatement, Speaker } from "@lib/api/debates/types";
import { partyLogo } from "@lib/assets";
import { routes } from "@lib/navigation";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface Props {
  statement: DebateStatement;
  speaker: Speaker;
  isSender: boolean;
}

export default function Statement({ statement, speaker, isSender }: Props) {
  return (
    <div>
      <div
        className={twMerge(
          "flex gap-[1.125rem]",
          isSender && "flex-row-reverse",
        )}
      >
        <div>
          <div
            className={twMerge(
              "relative rounded bg-slate-100 p-2 text-sm shadow-sm dark:bg-slate-900",
              "after:absolute  after:top-6 after:h-0 after:w-0 after:border-[1.125rem] after:border-transparent after:content-['']",
              "after:right-[-2.25rem] after:border-l-slate-100 dark:after:border-l-slate-900",
              isSender &&
                "after:left-[-1.125rem] after:right-auto after:border-l-0 after:border-l-transparent after:border-r-slate-100 dark:after:border-r-slate-900",
            )}
            dangerouslySetInnerHTML={{ __html: statement.text }}
          />
        </div>
        <Link href={routes.member(speaker.id)} className="mt-3 h-full">
          <MemberImage
            imageUrl={speaker.imageUrl}
            firstName={speaker.firstName}
            lastName={speaker.lastName}
            sizes="(min-width: 640px) 80px, 64px"
            className="mb-1 ml-auto h-16 w-16 sm:h-20 sm:w-20"
          >
            {speaker.party !== "-" && (
              <Image
                className={twMerge(
                  "absolute right-0 h-auto w-6 sm:w-8",
                  isSender && "left-0",
                )}
                width={32}
                height={32}
                src={partyLogo(speaker.party)}
                alt="Partisymbol"
              />
            )}
          </MemberImage>
          <p className="text-center text-sm">
            {speaker.firstName} {speaker.lastName}
          </p>
        </Link>
      </div>
      <p
        className={twMerge(
          "ml-auto mt-2 text-left text-xs",
          isSender && "text-right",
        )}
      >
        {statement.date}
      </p>
    </div>
  );
}