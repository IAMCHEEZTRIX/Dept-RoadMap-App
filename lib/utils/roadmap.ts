// lib/utils/roadmap.ts
import type { Course, Roadmap, YearKey, SemesterKey } from "@/lib/types";

const YEAR_ORDER: YearKey[] = ["y1", "y2", "y3"];
const SEM_ORDER: SemesterKey[] = ["s1", "s2", "s3"];

function termIndex(y: YearKey, s: SemesterKey) {
  return YEAR_ORDER.indexOf(y) * SEM_ORDER.length + SEM_ORDER.indexOf(s);
}

function completedBefore(target: { year: YearKey; semester: SemesterKey }, roadmap: Roadmap) {
  const done = new Set<string>();
  for (const y of YEAR_ORDER) {
    for (const s of SEM_ORDER) {
      if (termIndex(y, s) < termIndex(target.year, target.semester)) {
        roadmap[y][s].forEach((id) => done.add(id));
      }
    }
  }
  return done;
}

export function canPlace(
  course: Course,
  target: { year: YearKey; semester: SemesterKey },
  roadmap: Roadmap
): { ok: boolean; reason?: string } {
  // 1) Level/year must match
  if (course.year !== target.year) {
    return { ok: false, reason: "This course belongs to a different level/year." };
  }

  // 2) Must be offered this semester
  const offered = course.offered ?? []; // defensive
  if (!offered.includes(target.semester)) {
    const semName =
      target.semester === "s1" ? "Semester 1" :
      target.semester === "s2" ? "Semester 2" : "Semester 3 (Summer)";
    return { ok: false, reason: `This course is not offered in ${semName}.` };
  }

  // 3) All prereqs must be completed in prior terms
  const prereqs = course.prereqs ?? [];
  if (prereqs.length) {
    const done = completedBefore(target, roadmap);
    const missing = prereqs.filter((p) => !done.has(p));
    if (missing.length) {
      return { ok: false, reason: `Missing prerequisites: ${missing.join(", ")}.` };
    }
  }

  return { ok: true };
}
