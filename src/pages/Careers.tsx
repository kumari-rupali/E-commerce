import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Send, MapPin } from 'lucide-react';
import BackButton from '../components/BackButton';

export default function Careers() {
  const openings = [
    { title: 'Senior Designer', location: 'Mumbai / Remote', type: 'Full-time' },
    { title: 'Content strategist', location: 'Delhi', type: 'Full-time' },
    { title: 'Logistics Manager', location: 'Bengaluru', type: 'Full-time' },
    { title: 'Fashion Intern', location: 'Remote', type: 'Internship' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <BackButton />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12"
        >
          <h1 className="text-5xl font-serif italic mb-8">Careers</h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed mb-16">
            Help us shape the future of ethical fashion. We are always looking for creative minds.
          </p>

          <div className="space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 italic px-4">Open Positions</h2>
            {openings.map((job, idx) => (
              <div key={idx} className="group p-8 bg-sahrika-gray rounded-[32px] flex flex-col md:flex-row md:items-center justify-between hover:bg-black hover:text-white transition-all cursor-pointer">
                <div>
                  <h3 className="text-lg font-bold italic font-serif mb-2">{job.title}</h3>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center text-[10px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100">
                      <MapPin size={12} className="mr-1" />
                      {job.location}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100">
                      {job.type}
                    </span>
                  </div>
                </div>
                <button className="mt-6 md:mt-0 px-6 py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:bg-sahrika-red group-hover:text-white transition-all">
                  Apply Now
                </button>
              </div>
            ))}
          </div>

          <div className="mt-24 p-12 bg-black text-white rounded-[40px] text-center">
            <Briefcase size={40} className="mx-auto mb-6 text-sahrika-red" />
            <h2 className="text-3xl font-serif italic mb-4">Don't see a fit?</h2>
            <p className="text-[11px] font-bold uppercase tracking-widest opacity-50 mb-10">Send us your portfolio anyway. We love meeting talent.</p>
            <a href="mailto:careers@sahrika.com" className="inline-flex items-center space-x-3 text-xs font-black uppercase tracking-[0.2em] border-b-2 border-sahrika-red pb-1 hover:opacity-70 transition-all">
              <span>Send Portfolio</span>
              <Send size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
