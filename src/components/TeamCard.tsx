import { motion } from "framer-motion";

interface TeamCardProps {
  name: string;
  role: string;
  imageUrl: string;
  delay?: number;
}

export default function TeamCard({ 
  name, 
  role, 
  imageUrl, 
  delay = 0,
}: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className=" w-50 h-100 glass-card card-hover rounded-3xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-lg "
    >
      {/* Image Section */}
      <div className="relative group">
        <div className="aspect-square overflow-hidden">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-100 group-hover:brightness-110"
          />
        </div>
        
        {/* Overlay Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        </div>
      </div>

      {/* Info Section */}
      <div className="p-5 text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{name}</h3>
        <p className="text-primary font-medium">{role}</p>
      </div>
    </motion.div>
  );
}
