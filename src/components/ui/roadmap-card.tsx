"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface RoadmapItem {
  quarter: string;
  title: string;
  description: string;
  status?: "done" | "in-progress" | "upcoming";
}

export interface RoadmapCardProps {
  title?: string;
  description?: string;
  items: RoadmapItem[];
}

export function RoadmapCard({
  title = "Product Roadmap",
  description = "Upcoming features and releases",
  items,
}: RoadmapCardProps) {
  return (
    <Card className="w-full shadow-xl hover:shadow-lg transition-all duration-300 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-zinc-900 dark:text-white tracking-tight">
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-zinc-600 dark:text-zinc-400">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 right-0 top-4 h-px bg-zinc-200 dark:bg-zinc-700" />

          <div className="flex justify-between">
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="relative pt-8 text-center w-1/4 px-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
              >
                {/* Timeline Dot */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`absolute left-1/2 top-2 -translate-x-1/2 h-4 w-4 rounded-full flex items-center justify-center ${
                    item.status === "done" || item.status === "in-progress"
                      ? "bg-teal-500 dark:bg-teal-400"
                      : "bg-zinc-300 dark:bg-zinc-600"
                  }`}
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-white dark:bg-zinc-900" />
                </motion.div>

                {/* Quarter */}
                <Badge
                  variant={
                    item.status === "done" || item.status === "in-progress"
                      ? "default"
                      : "outline"
                  }
                  className={`mb-2 text-[11px] ${
                    item.status === "done" || item.status === "in-progress"
                      ? "bg-teal-500 text-white border-teal-500 hover:bg-teal-600"
                      : "border-zinc-300 text-zinc-500 dark:border-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  {item.quarter}
                </Badge>

                {/* Title + Description */}
                <h4 className="text-sm font-medium text-zinc-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
