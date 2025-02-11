import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const teamMembers = [
  { name: "John Doe", role: "CEO", image: "src/assets/team1.jpg" },
  { name: "Jane Smith", role: "CTO", image: "src/assets/team2.jpg" },
  { name: "Alice Johnson", role: "COO", image: "src/assets/team3.jpg" },
  { name: "Bob Brown", role: "CFO", image: "src/assets/team4.jpg" },
  { name: "Charlie Davis", role: "CMO", image: "src/assets/team2.jpg" },
];

export default function TeamMembers() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollWidth = container.scrollWidth - container.clientWidth;

    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev >= scrollWidth ? 0 : prev + 1));
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-12 bg-lightGray"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Our Team Members</h2>
        <div
          ref={containerRef}
          className="flex overflow-x-hidden space-x-8 p-4"
          style={{ transform: `translateX(-${scrollPosition}px)` }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 bg-white p-6 rounded-lg shadow-lg w-64"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mb-4 mx-auto"
              />
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}