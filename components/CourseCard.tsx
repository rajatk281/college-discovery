import { Clock, IndianRupee } from "lucide-react";
import { Course } from "@/lib/api";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="flex items-center justify-between rounded-[10px] border border-border bg-card p-4 transition-colors hover:border-border/80">
      <div>
        <h4 className="text-sm font-semibold text-text-primary">{course.name}</h4>
        <div className="mt-1 flex items-center gap-1 text-text-secondary">
          <Clock className="h-3.5 w-3.5" />
          <span className="text-xs">{course.duration}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 text-text-secondary">
        <IndianRupee className="h-3.5 w-3.5" />
        <span className="text-sm font-medium">₹{course.fees.toLocaleString("en-IN")}</span>
      </div>
    </div>
  );
}
