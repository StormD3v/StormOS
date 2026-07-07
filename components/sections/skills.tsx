'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout/container';
import { skills } from '@/content/skills';

// Group skills by category — derived at module level, not per render
const categories = [...new Set(skills.map((s) => s.category))];
const byCategory = Object.fromEntries(
  categories.map((cat) => [cat, skills.filter((s) => s.category === cat)])
);

export function Skills() {
  if (skills.length === 0) {
    return (
      <section id="skills" className="py-24 px-4">
        <Container>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-4">
            Skills &amp; Expertise
          </h2>
          <p className="text-neutral-400 text-lg mt-8">Skills coming soon</p>
        </Container>
      </section>
    );
  }

  return (
    <section id="skills" className="py-24 px-4">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-4">
            Skills &amp; Expertise
          </h2>
          <p className="text-xl text-neutral-400 mb-12 max-w-2xl">
            Technologies and tools I work with
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: categoryIndex * 0.1,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
              >
                {/* h3 — correct hierarchy below the h2 section heading */}
                <h3 className="text-xl font-semibold text-storm-blue mb-6">{category}</h3>
                <div className="space-y-4">
                  {byCategory[category].map((skill, skillIndex) => (
                    <div key={skill.id}>
                      <div className="flex justify-between mb-2">
                        <span className="text-neutral-300 text-sm">{skill.name}</span>
                        <span className="text-neutral-500 text-sm">{skill.proficiency}%</span>
                      </div>
                      <div
                        className="h-1.5 bg-neutral-800 rounded-full overflow-hidden"
                        role="progressbar"
                        aria-valuenow={skill.proficiency}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${skill.name} proficiency`}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: categoryIndex * 0.1 + skillIndex * 0.05,
                            ease: [0.215, 0.61, 0.355, 1],
                          }}
                          className="h-full bg-storm-blue rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
