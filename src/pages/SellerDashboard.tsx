import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Package, DollarSign, Users, ShoppingBag, Edit, Trash2, ExternalLink, X } from 'lucide-react';
import BackButton from '../components/BackButton';
import { productSvc } from '../lib/db';
import { toast } from 'sonner';
import { useStore } from '../store/useStore';
import { Product } from '../types';
import { formatPrice } from '../lib/utils';

export default function SellerDashboard() {
  const { products, setProducts, currency, user } = useStore();
  const [activeTab, setActiveTab] = useState('inventory');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Fashion',
    image: '',
    stock: ''
  });

  const stats = [
    { label: 'Total Revenue', value: formatPrice(112450, currency), icon: DollarSign, trend: '+12.5%' },
    { label: 'Active Orders', value: '24', icon: ShoppingBag, trend: '+2' },
    { label: 'Inventory Items', value: products.length.toString(), icon: Package, trend: '0' },
    { label: 'Total Customers', value: '850', icon: Users, trend: '+45' },
  ];

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        image: product.image,
        stock: product.stock.toString()
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'Fashion',
        image: 'https://picsum.photos/seed/' + Math.random() + '/600/600',
        stock: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    
    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image,
      sellerId: user.uid,
      stock: parseInt(formData.stock),
      rating: editingProduct ? editingProduct.rating : 5,
      reviewCount: editingProduct ? editingProduct.reviewCount : 0
    };

    try {
      if (editingProduct) {
        toast.info("Update limited in this version.");
      } else {
        await productSvc.create(productData);
        toast.success("Product published to Archive.");
      }
      
      const fresh = await productSvc.getAll();
      if (fresh) setProducts(fresh);
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Process failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
      <BackButton />
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h1 className="text-6xl font-black tracking-tighter uppercase italic mb-4">Seller Central</h1>
          <p className="text-gray-500 font-medium tracking-tight">
            Manage your store, track performance, and grow your brand.
          </p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-black text-white font-black text-sm uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg active:scale-95"
        >
          <Plus size={18} className="mr-2" />
          Add New Product
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, i) => (
          <div key={i} className="p-8 bg-white border border-gray-100 rounded-[32px] shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-gray-50 rounded-2xl text-black">
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-black tracking-widest text-green-500 bg-green-50 px-2 py-1 rounded-full uppercase">
                {stat.trend}
              </span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{stat.label}</p>
            <p className="text-3xl font-black tracking-tighter text-black">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex space-x-12 border-b border-gray-100 mb-10">
        {['inventory', 'orders', 'analytics'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-xs font-black uppercase tracking-[0.2em] transition-all relative ${
              activeTab === tab ? 'text-black' : 'text-gray-400 hover:text-black'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Inventory Table */}
      {activeTab === 'inventory' && (
        <div className="bg-white border border-gray-100 rounded-[40px] overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 italic">Product</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 italic">Category</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 italic">Price</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 italic">Stock</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 italic text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <img src={product.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-sm font-black tracking-tight">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{product.category}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-black tracking-tight">{formatPrice(product.price, currency)}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${product.stock < 10 ? 'text-red-500' : 'text-gray-400'}`}>
                      {product.stock} Units
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end space-x-2">
                       <button 
                         onClick={() => handleOpenModal(product)}
                         className="p-2 text-gray-300 hover:text-black hover:bg-white rounded-lg transition-all shadow-sm"
                       >
                         <Edit size={16} />
                       </button>
                       <button 
                         onClick={() => toast.info("Archive deletion is restricted for this demo.")}
                         className="p-2 text-gray-300 hover:text-red-500 hover:bg-white rounded-lg transition-all shadow-sm"
                       >
                         <Trash2 size={16} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-x-4 top-[10%] bottom-[10%] md:inset-x-auto md:left-1/2 md:-ml-[300px] md:w-[600px] bg-white rounded-[40px] shadow-2xl z-[101] overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h2 className="text-2xl font-black uppercase italic tracking-tighter">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors">
                  <X />
                </button>
              </div>

              <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-8 space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Product Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-black transition-all font-bold"
                    placeholder="e.g. Minimalist Watch"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Price ({currency === 'INR' ? '₹' : '$'})</label>
                    <input
                      required
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-black transition-all font-bold"
                      placeholder="99.99"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Stock Level</label>
                    <input
                      required
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-black transition-all font-bold"
                      placeholder="50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-black transition-all font-bold appearance-none px-6"
                  >
                    {['Fashion', 'Electronics', 'Footwear', 'Accessories'].map(cat => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Description</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-black transition-all font-medium h-32"
                    placeholder="Tell customers about your product..."
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Image URL</label>
                  <input
                    required
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-black transition-all font-medium text-xs text-gray-500"
                  />
                </div>
              </form>

              <div className="p-8 border-t border-gray-100 bg-gray-50 flex space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 bg-white border border-gray-200 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-4 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-lg active:scale-95"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {activeTab === 'orders' && (
        <div className="py-20 text-center">
           <p className="text-2xl font-black tracking-tighter uppercase italic text-gray-300">No active orders</p>
        </div>
      )}
    </div>
  );
}
