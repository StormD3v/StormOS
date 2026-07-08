'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout/container';
import { skills } from '@/content/skills';

// Group skills by category — derived at module level, not per render
const categories = [...new Set(skills.map((s) => s.category))];
const byCategory = Object.fromEntries(
  categories.map((cat) => [cat, skills.filter((s) => s.category === cat)])
);

/**
 * Skills section.
 * Displays the real tech stack from content/skills.ts.
 * Not currently used on any page — available when needed.
 */
export function Skills() {
  if (skills.length === 0) return null;

  return (
    <section id="skills" className="py-24 px-6">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
                <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-6">
                  {category}
                </p>
                <ul className="space-y-3">
                  {byCategory[category].map((skill) => (
                    <li
                      key={skill.id}
                      data-skill-name={skill.name}
                      className="text-neutral-300 text-sm"
                    >
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
