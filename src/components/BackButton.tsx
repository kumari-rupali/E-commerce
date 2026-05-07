import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate(-1)}
      className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] hover:text-sahrika-red transition-colors mb-6 group"
    >
      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
      <span>Go Back</span>
    </button>
  );
}
