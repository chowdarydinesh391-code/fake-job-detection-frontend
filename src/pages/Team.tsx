
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import TeamCard from "@/components/TeamCard";
import { motion } from "framer-motion";

export default function Team() {
  const teamMembers = [
    {
      name: "Maddu Nagasai",
      role: "FULL STACK DEVELOPER",
      imageUrl: "https://res.cloudinary.com/dgpiiljnj/image/upload/v1744005208/WhatsApp_Image_2025-03-17_at_16.53.30_9ca9f437_ulr0sh.jpg",
    },
    {
      name: "Tulasi Pavani",
      role: "Team Lead",
      imageUrl: "https://res.cloudinary.com/dgpiiljnj/image/upload/v1743011148/WhatsApp_Image_2025-03-26_at_23.09.09_21928c4c_fhlrxw.jpg",
    },
    {
      name: "Gagan Dileep",
      role: "Frontend & Resoucer",
      imageUrl: "https://res.cloudinary.com/dgpiiljnj/image/upload/v1742883051/gagan_wricn9.jpg",
    },
    {
      name: "Areti Vyshnavi",
      role: "Data Analyst",
      imageUrl: "https://res.cloudinary.com/dgpiiljnj/image/upload/v1743403485/IMG-20250327-WA0002_rmsfhe.jpg",
    },
    {
      name: "Amar Nageswara Rao",
      role: "Resoucer",
      imageUrl: "https://i.pinimg.com/736x/a3/31/a8/a331a8d0a8ff50827c6cb3437f336a30.jpg",
    },
    {
      name: "Hameed Babu",
      role: "Resoucer",
      imageUrl: "https://i.pinimg.com/736x/a3/31/a8/a331a8d0a8ff50827c6cb3437f336a30.jpg",
    },
  ];

  return (
    <PageTransition transition="slide-right">
      <Navbar />
      
      <div className="pt-24 pb-16 md:pt-32 md:pb-24 px-6">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
            >
              Meet Our Team
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              The experts behind " Job or Joke " who are dedicated to protecting job seekers around the world.
            </motion.p>
          </div>
        </div>
      </div>
      
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamCard 
                key={member.name}
                name={member.name}
                role={member.role}
                imageUrl={member.imageUrl}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>
      
    </PageTransition>
  );
}
