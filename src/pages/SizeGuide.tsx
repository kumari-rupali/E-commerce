import React from 'react';
import { motion } from 'motion/react';
import { Ruler, Info } from 'lucide-react';
import BackButton from '../components/BackButton';

export default function SizeGuide() {
  const sizes = [
    { size: 'XS', bust: '32-33', waist: '24-25', hip: '34-35' },
    { size: 'S', bust: '34-35', waist: '26-27', hip: '36-37' },
    { size: 'M', bust: '36-37', waist: '28-29', hip: '38-39' },
    { size: 'L', bust: '38-40', waist: '30-32', hip: '40-42' },
    { size: 'XL', bust: '41-43', waist: '33-35', hip: '43-45' },
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
          <h1 className="text-5xl font-serif italic mb-8">Size Guide</h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed mb-12">
            Find your perfect fit. Our measurements are in inches.
          </p>

          <div className="bg-sahrika-gray rounded-[32px] overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Size</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Bust</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Waist</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Hip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {sizes.map((item) => (
                  <tr key={item.size} className="hover:bg-white transition-colors">
                    <td className="px-8 py-6 text-sm font-black">{item.size}</td>
                    <td className="px-8 py-6 text-sm font-medium text-gray-500">{item.bust}</td>
                    <td className="px-8 py-6 text-sm font-medium text-gray-500">{item.waist}</td>
                    <td className="px-8 py-6 text-sm font-medium text-gray-500">{item.hip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-black">
                <Ruler size={18} />
                <h3 className="text-lg font-bold uppercase tracking-widest italic">How to measure</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                  <p className="text-sm text-gray-400 font-medium">Bust: Measure around the fullest part of your chest.</p>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                  <p className="text-sm text-gray-400 font-medium">Waist: Measure around your natural waistline.</p>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                  <p className="text-sm text-gray-400 font-medium">Hip: Measure around the fullest part of your hips.</p>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-[32px] flex items-start space-x-4">
              <Info className="text-gray-300" size={24} />
              <p className="text-[11px] text-gray-400 font-bold uppercase leading-relaxed tracking-widest">
                Between sizes? We recommend sizing up for a more relaxed fit, or sizing down for a tailored look.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
