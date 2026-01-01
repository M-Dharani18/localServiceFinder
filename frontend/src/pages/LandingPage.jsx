// import { Link } from 'react-router-dom'
// import { 
//   Search, 
//   Clock, 
//   Shield, 
//   Star, 
//   Users, 
//   CheckCircle,
//   ArrowRight,
//   Home,
//   Wrench,
//   Sparkles,
//   MapPin,
//   Zap,
//   Award,
//   TrendingUp
// } from 'lucide-react'

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
//       {/* Navigation */}
//       <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-20">
//             {/* Logo */}
//             <div className="flex items-center group">
//               <div className="relative">
//                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center shadow-lg group-hover:shadow-emerald-200 transition-all duration-300">
//                   <Shield className="w-7 h-7 text-white" />
//                 </div>
//                 <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full animate-pulse"></div>
//               </div>
//               <span className="ml-4 text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 bg-clip-text text-transparent">
//                 LocalService Pro
//               </span>
//             </div>

//             {/* Navigation Links */}
//             <div className="hidden md:flex items-center space-x-1">
//               <a href="#features" className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 font-medium transition-all duration-300">Features</a>
//               <a href="#how-it-works" className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 font-medium transition-all duration-300">How it Works</a>
//               <a href="#services" className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 font-medium transition-all duration-300">Services</a>
//               <a href="#testimonials" className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 font-medium transition-all duration-300">Testimonials</a>
//             </div>

//             {/* Auth Buttons */}
//             <div className="flex items-center space-x-3">
//               <Link 
//                 to="/login" 
//                 className="px-6 py-3 rounded-xl text-slate-700 font-semibold hover:bg-slate-100 transition-all duration-300"
//               >
//                 Sign In
//               </Link>
//               <Link 
//                 to="/register" 
//                 className="group relative px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
//                 <span className="relative flex items-center gap-2">
//                   Get Started
//                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//           <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
//         </div>

//         <div className="max-w-7xl mx-auto relative">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//             {/* Left Content */}
//             <div className="space-y-8">
//               <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-700 font-semibold animate-fade-in">
//                 <Sparkles className="w-5 h-5" />
//                 <span>Trusted by 10,000+ Happy Customers</span>
//               </div>
              
//               <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
//                 Your Local
//                 <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 animate-gradient">
//                   Service Experts
//                 </span>
//               </h1>
              
//               <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
//                 Connect with verified professionals in your neighborhood. Quality service, trusted results, every single time.
//               </p>
              
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Link 
//                   to="/register" 
//                   className="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white font-semibold shadow-xl hover:shadow-emerald-300 overflow-hidden transition-all duration-300"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
//                   <span className="relative flex items-center justify-center gap-2">
//                     Find Your Pro Now
//                     <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
//                   </span>
//                 </Link>
//                 <Link 
//                   to="/login" 
//                   className="px-8 py-3.5 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300"
//                 >
//                   Sign In
//                 </Link>
//               </div>
              
//               {/* Stats */}
//               <div className="grid grid-cols-3 gap-6 pt-8">
//                 {[
//                   { value: '800+', label: 'Verified Pros', icon: Award },
//                   { value: '4.9★', label: 'Avg Rating', icon: Star },
//                   { value: '24/7', label: 'Support', icon: Clock }
//                 ].map((stat, idx) => (
//                   <div key={idx} className="group">
//                     <div className="flex items-center gap-2 mb-1">
//                       <stat.icon className="w-4 h-4 text-emerald-600" />
//                       <div className="text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{stat.value}</div>
//                     </div>
//                     <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             {/* Right - Hero Visual */}
//             <div className="relative">
//               <div className="relative rounded-3xl overflow-hidden shadow-2xl">
//                 <img 
//                   src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
//                   alt="Service professionals at work"
//                   className="w-full h-[600px] object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                
//                 {/* Floating Service Cards */}
//                 <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl max-w-xs animate-float">
//                   <div className="flex items-center gap-4 mb-4">
//                     <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
//                       <Wrench className="w-7 h-7 text-white" />
//                     </div>
//                     <div>
//                       <div className="font-bold text-slate-900 text-lg">Plumbing</div>
//                       <div className="text-sm text-slate-600">John's Services</div>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">$89</span>
//                     <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-semibold">
//                       <Star className="w-4 h-4 fill-current" />
//                       4.9
//                     </span>
//                   </div>
//                 </div>
                
//                 <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl max-w-xs animate-float" style={{ animationDelay: '1s' }}>
//                   <div className="flex items-center gap-4 mb-4">
//                     <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center shadow-lg">
//                       <Home className="w-7 h-7 text-white" />
//                     </div>
//                     <div>
//                       <div className="font-bold text-slate-900 text-lg">Cleaning</div>
//                       <div className="text-sm text-slate-600">Clean Masters</div>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">$65</span>
//                     <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-semibold">
//                       <Star className="w-4 h-4 fill-current" />
//                       4.8
//                     </span>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Decorative Elements */}
//               <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl rotate-12 opacity-20"></div>
//               <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-cyan-400 to-emerald-500 rounded-2xl -rotate-12 opacity-20"></div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-24 bg-gradient-to-b from-white to-slate-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm mb-4">
//               Why Choose Us
//             </div>
//             <h2 className="text-3xl font-bold text-slate-900 mb-4">
//               Built for Your Peace of Mind
//             </h2>
//             <p className="text-lg text-slate-600 max-w-2xl mx-auto">
//               We make finding and booking local services simple, safe, and reliable
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: <Shield className="w-10 h-10" />,
//                 title: 'Verified Professionals',
//                 description: 'Every service provider is background-checked and verified for your complete safety.',
//                 gradient: 'from-emerald-500 to-teal-600',
//                 bgGradient: 'from-emerald-50 to-teal-50'
//               },
//               {
//                 icon: <Zap className="w-10 h-10" />,
//                 title: 'Lightning Fast',
//                 description: 'Book services and get them completed on the same day in most cases.',
//                 gradient: 'from-amber-500 to-orange-600',
//                 bgGradient: 'from-amber-50 to-orange-50'
//               },
//               {
//                 icon: <TrendingUp className="w-10 h-10" />,
//                 title: 'Best Pricing',
//                 description: 'Transparent pricing with no hidden fees. Compare and choose the best deal.',
//                 gradient: 'from-cyan-500 to-blue-600',
//                 bgGradient: 'from-cyan-50 to-blue-50'
//               },
//             ].map((feature, index) => (
//               <div key={index} className="group relative">
//                 <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-3xl transform group-hover:scale-105 transition-transform duration-300`}></div>
//                 <div className="relative bg-white rounded-3xl p-6 border-2 border-slate-200 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300">
//                   <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
//                     <div className="text-white">
//                       {feature.icon}
//                     </div>
//                   </div>
//                   <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
//                   <p className="text-slate-600 leading-relaxed">{feature.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section id="how-it-works" className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
//         </div>
        
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div className="text-center mb-16">
//             <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl text-white font-semibold text-sm mb-4">
//               Simple Process
//             </div>
//             <h2 className="text-3xl font-bold mb-4">How It Works</h2>
//             <p className="text-lg text-slate-300 max-w-2xl mx-auto">
//               Get your service booked in just a few simple steps
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             {[
//               { step: '01', title: 'Search Services', desc: 'Browse our wide range of professional services', icon: '🔍', color: 'from-emerald-500 to-teal-500' },
//               { step: '02', title: 'Choose Provider', desc: 'Select from verified professionals with reviews', icon: '👤', color: 'from-teal-500 to-cyan-500' },
//               { step: '03', title: 'Book & Pay', desc: 'Schedule and pay securely online', icon: '💳', color: 'from-cyan-500 to-blue-500' },
//               { step: '04', title: 'Enjoy Service', desc: 'Relax while experts handle your needs', icon: '✅', color: 'from-blue-500 to-purple-500' },
//             ].map((step, index) => (
//               <div key={step.step} className="relative group">
//                 {index < 3 && (
//                   <div className="hidden md:block absolute top-16 -right-12 w-24 h-1 bg-gradient-to-r from-white/20 to-transparent"></div>
//                 )}
//                 <div className="text-center transform group-hover:-translate-y-2 transition-transform duration-300">
//                   <div className={`w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl mb-4 shadow-xl group-hover:shadow-emerald-500/50`}>
//                     {step.icon}
//                   </div>
//                   <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-12 bg-white text-slate-900 rounded-xl flex items-center justify-center text-sm font-bold shadow-lg">
//                     {step.step}
//                   </div>
//                   <h3 className="text-lg font-bold mb-2">{step.title}</h3>
//                   <p className="text-sm text-slate-300">{step.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>



//       {/* CTA Section */}
//       <section className="py-24 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 relative overflow-hidden">
//         <div className="absolute inset-0 opacity-20">
//           <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
//         </div>
        
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
//             Ready to Get Started?
//           </h2>
//           <p className="text-lg text-emerald-100 mb-10 max-w-2xl mx-auto">
//             Join thousands of satisfied customers who trust LocalService Pro for their service needs
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link 
//               to="/register" 
//               className="group relative px-10 py-4 rounded-xl bg-white text-emerald-600 font-bold hover:bg-slate-50 shadow-2xl overflow-hidden transition-all duration-300"
//             >
//               <span className="relative flex items-center justify-center gap-2">
//                 Get Started Free
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
//               </span>
//             </Link>
//             <Link 
//               to="/login" 
//               className="px-10 py-4 rounded-xl border-2 border-white text-white font-bold hover:bg-white/10 backdrop-blur-xl transition-all duration-300"
//             >
//               Sign In
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-slate-900 text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
//             <div>
//               <div className="flex items-center mb-6">
//                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
//                   <Shield className="w-7 h-7" />
//                 </div>
//                 <span className="ml-4 text-2xl font-bold">LocalService Pro</span>
//               </div>
//               <p className="text-slate-400 leading-relaxed">
//                 Connecting you with trusted local service professionals for all your needs.
//               </p>
//             </div>
            
//             <div>
//               <h4 className="text-lg font-bold mb-6">Quick Links</h4>
//               <ul className="space-y-3">
//                 <li><Link to="/login" className="text-slate-400 hover:text-emerald-400 transition-colors">Sign In</Link></li>
//                 <li><Link to="/register" className="text-slate-400 hover:text-emerald-400 transition-colors">Register</Link></li>
//                 <li><a href="#features" className="text-slate-400 hover:text-emerald-400 transition-colors">Features</a></li>
//                 <li><a href="#services" className="text-slate-400 hover:text-emerald-400 transition-colors">Services</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className="text-lg font-bold mb-6">Company</h4>
//               <ul className="space-y-3">
//                 <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">About Us</a></li>
//                 <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Careers</a></li>
//                 <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Contact</a></li>
//                 <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Blog</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className="text-lg font-bold mb-6">Legal</h4>
//               <ul className="space-y-3">
//                 <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
//                 <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Terms of Service</a></li>
//                 <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Cookie Policy</a></li>
//               </ul>
//             </div>
//           </div>
          
//           <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
//             <p>© {new Date().getFullYear()} LocalService Pro. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>

//       <style>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//         @keyframes gradient {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }
//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient 3s ease infinite;
//         }
//         @keyframes fade-in {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.6s ease-out;
//         }
//       `}</style>
//     </div>
//   )
// }





// import { Link } from 'react-router-dom'
// import { 
//   Search, 
//   Clock, 
//   Shield, 
//   Star, 
//   Users, 
//   CheckCircle,
//   ArrowRight,
//   Home,
//   Wrench,
//   Sparkles,
//   MapPin,
//   Zap,
//   Award,
//   TrendingUp
// } from 'lucide-react'

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
//       {/* Navigation */}
//       <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-20">
//             {/* Logo */}
//             <div className="flex items-center group">
//               <div className="relative">
//                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center shadow-lg group-hover:shadow-emerald-200 transition-all duration-300">
//                   <Shield className="w-7 h-7 text-white" />
//                 </div>
//                 <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full animate-pulse"></div>
//               </div>
//               <span className="ml-4 text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 bg-clip-text text-transparent">
//                 LocalService Pro
//               </span>
//             </div>

//             {/* Navigation Links */}
//             <div className="hidden md:flex items-center space-x-1">
//               <a href="#features" className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 font-medium transition-all duration-300">Features</a>
//               <a href="#how-it-works" className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 font-medium transition-all duration-300">How it Works</a>
//               <a href="#services" className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 font-medium transition-all duration-300">Services</a>
//               <a href="#testimonials" className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 font-medium transition-all duration-300">Testimonials</a>
//             </div>

//             {/* Auth Buttons */}
//             <div className="flex items-center space-x-3">
//               <Link 
//                 to="/login" 
//                 className="px-6 py-3 rounded-xl text-slate-700 font-semibold hover:bg-slate-100 transition-all duration-300"
//               >
//                 Sign In
//               </Link>
//               <Link 
//                 to="/register" 
//                 className="group relative px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
//                 <span className="relative flex items-center gap-2">
//                   Get Started
//                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//           <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
//         </div>

//         <div className="max-w-7xl mx-auto relative">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//             {/* Left Content */}
//             <div className="space-y-8">
//               <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-700 font-semibold animate-fade-in">
//                 <Sparkles className="w-5 h-5" />
//                 <span>Trusted by 10,000+ Happy Customers</span>
//               </div>
              
//               <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
//                 Your Local
//                 <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 animate-gradient">
//                   Service Experts
//                 </span>
//               </h1>
              
//               <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
//                 Connect with verified professionals in your neighborhood. Quality service, trusted results, every single time.
//               </p>
              
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Link 
//                   to="/register" 
//                   className="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white font-semibold shadow-xl hover:shadow-emerald-300 overflow-hidden transition-all duration-300"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
//                   <span className="relative flex items-center justify-center gap-2">
//                     Find Your Pro Now
//                     <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
//                   </span>
//                 </Link>
//                 <Link 
//                   to="/login" 
//                   className="px-8 py-3.5 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300"
//                 >
//                   Sign In
//                 </Link>
//               </div>
              
//               {/* Stats */}
//               <div className="grid grid-cols-3 gap-6 pt-8">
//                 {[
//                   { value: '800+', label: 'Verified Pros', icon: Award },
//                   { value: '4.9★', label: 'Avg Rating', icon: Star },
//                   { value: '24/7', label: 'Support', icon: Clock }
//                 ].map((stat, idx) => (
//                   <div key={idx} className="group">
//                     <div className="flex items-center gap-2 mb-1">
//                       <stat.icon className="w-4 h-4 text-emerald-600" />
//                       <div className="text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{stat.value}</div>
//                     </div>
//                     <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             {/* Right - Hero Visual */}
//             <div className="relative">
//               <div className="relative rounded-3xl overflow-hidden shadow-2xl">
//                 <img 
//                   src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
//                   alt="Service professionals at work"
//                   className="w-full h-[600px] object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                
//                 {/* Floating Service Cards */}
//                 <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl max-w-xs animate-float">
//                   <div className="flex items-center gap-4 mb-4">
//                     <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
//                       <Wrench className="w-7 h-7 text-white" />
//                     </div>
//                     <div>
//                       <div className="font-bold text-slate-900 text-lg">Plumbing</div>
//                       <div className="text-sm text-slate-600">John's Services</div>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">$89</span>
//                     <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-semibold">
//                       <Star className="w-4 h-4 fill-current" />
//                       4.9
//                     </span>
//                   </div>
//                 </div>
                
//                 <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl max-w-xs animate-float" style={{ animationDelay: '1s' }}>
//                   <div className="flex items-center gap-4 mb-4">
//                     <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center shadow-lg">
//                       <Home className="w-7 h-7 text-white" />
//                     </div>
//                     <div>
//                       <div className="font-bold text-slate-900 text-lg">Cleaning</div>
//                       <div className="text-sm text-slate-600">Clean Masters</div>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">$65</span>
//                     <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-semibold">
//                       <Star className="w-4 h-4 fill-current" />
//                       4.8
//                     </span>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Decorative Elements */}
//               <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl rotate-12 opacity-20"></div>
//               <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-cyan-400 to-emerald-500 rounded-2xl -rotate-12 opacity-20"></div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-16 bg-gradient-to-b from-white to-slate-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm mb-4">
//               Why Choose Us
//             </div>
//             <h2 className="text-3xl font-bold text-slate-900 mb-4">
//               Built for Your Peace of Mind
//             </h2>
//             <p className="text-lg text-slate-600 max-w-2xl mx-auto">
//               We make finding and booking local services simple, safe, and reliable
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: <Shield className="w-10 h-10" />,
//                 title: 'Verified Professionals',
//                 description: 'Every service provider is background-checked and verified for your complete safety.',
//                 gradient: 'from-emerald-500 to-teal-600',
//                 bgGradient: 'from-emerald-50 to-teal-50'
//               },
//               {
//                 icon: <Zap className="w-10 h-10" />,
//                 title: 'Lightning Fast',
//                 description: 'Book services and get them completed on the same day in most cases.',
//                 gradient: 'from-amber-500 to-orange-600',
//                 bgGradient: 'from-amber-50 to-orange-50'
//               },
//               {
//                 icon: <TrendingUp className="w-10 h-10" />,
//                 title: 'Best Pricing',
//                 description: 'Transparent pricing with no hidden fees. Compare and choose the best deal.',
//                 gradient: 'from-cyan-500 to-blue-600',
//                 bgGradient: 'from-cyan-50 to-blue-50'
//               },
//             ].map((feature, index) => (
//               <div key={index} className="group relative">
//                 <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-3xl transform group-hover:scale-105 transition-transform duration-300`}></div>
//                 <div className="relative bg-white rounded-3xl p-6 border-2 border-slate-200 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300">
//                   <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
//                     <div className="text-white">
//                       {feature.icon}
//                     </div>
//                   </div>
//                   <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
//                   <p className="text-slate-600 leading-relaxed">{feature.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section id="how-it-works" className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
//         </div>
        
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div className="text-center mb-16">
//             <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl text-white font-semibold text-sm mb-4">
//               Simple Process
//             </div>
//             <h2 className="text-3xl font-bold mb-4">How It Works</h2>
//             <p className="text-lg text-slate-300 max-w-2xl mx-auto">
//               Get your service booked in just a few simple steps
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             {[
//               { step: '01', title: 'Search Services', desc: 'Browse our wide range of professional services', icon: '🔍', color: 'from-emerald-500 to-teal-500' },
//               { step: '02', title: 'Choose Provider', desc: 'Select from verified professionals with reviews', icon: '👤', color: 'from-teal-500 to-cyan-500' },
//               { step: '03', title: 'Book & Pay', desc: 'Schedule and pay securely online', icon: '💳', color: 'from-cyan-500 to-blue-500' },
//               { step: '04', title: 'Enjoy Service', desc: 'Relax while experts handle your needs', icon: '✅', color: 'from-blue-500 to-purple-500' },
//             ].map((step, index) => (
//               <div key={step.step} className="relative group">
//                 {index < 3 && (
//                   <div className="hidden md:block absolute top-12 -right-4 w-8 h-1 bg-gradient-to-r from-white/20 to-transparent z-0"></div>
//                 )}
//                 <div className="text-center transform group-hover:-translate-y-2 transition-transform duration-300 relative z-10">
//                   <div className="relative inline-block mb-8">
//                     <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl shadow-xl group-hover:shadow-emerald-500/50 transition-shadow`}>
//                       {step.icon}
//                     </div>
//                     <div className="absolute -top-2 -right-2 w-10 h-10 bg-white text-slate-900 rounded-lg flex items-center justify-center text-xs font-bold shadow-lg">
//                       {step.step}
//                     </div>
//                   </div>
//                   <h3 className="text-lg font-bold mb-2">{step.title}</h3>
//                   <p className="text-sm text-slate-300">{step.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>



//       {/* CTA Section */}
//       <section className="py-16 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 relative overflow-hidden">
//         <div className="absolute inset-0 opacity-20">
//           <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
//         </div>
        
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
//             Ready to Get Started?
//           </h2>
//           <p className="text-lg text-emerald-100 mb-10 max-w-2xl mx-auto">
//             Join thousands of satisfied customers who trust LocalService Pro for their service needs
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link 
//               to="/register" 
//               className="group relative px-10 py-4 rounded-xl bg-white text-emerald-600 font-bold hover:bg-slate-50 shadow-2xl overflow-hidden transition-all duration-300"
//             >
//               <span className="relative flex items-center justify-center gap-2">
//                 Get Started Free
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
//               </span>
//             </Link>
//             <Link 
//               to="/login" 
//               className="px-10 py-4 rounded-xl border-2 border-white text-white font-bold hover:bg-white/10 backdrop-blur-xl transition-all duration-300"
//             >
//               Sign In
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-slate-900 text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
//             <div>
//               <div className="flex items-center mb-6">
//                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
//                   <Shield className="w-7 h-7" />
//                 </div>
//                 <span className="ml-4 text-2xl font-bold">LocalService Pro</span>
//               </div>
//               <p className="text-slate-400 leading-relaxed">
//                 Connecting you with trusted local service professionals for all your needs.
//               </p>
//             </div>
            
//             <div>
//               <h4 className="text-lg font-bold mb-6">Quick Links</h4>
//               <ul className="space-y-3">
//                 <li><Link to="/login" className="text-slate-400 hover:text-emerald-400 transition-colors">Sign In</Link></li>
//                 <li><Link to="/register" className="text-slate-400 hover:text-emerald-400 transition-colors">Register</Link></li>
//                 <li><a href="#features" className="text-slate-400 hover:text-emerald-400 transition-colors">Features</a></li>
//                 <li><a href="#services" className="text-slate-400 hover:text-emerald-400 transition-colors">Services</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className="text-lg font-bold mb-6">Company</h4>
//               <ul className="space-y-3">
//                 <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">About Us</a></li>
//                 <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Careers</a></li>
//                 <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Contact</a></li>
//                 <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Blog</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className="text-lg font-bold mb-6">Legal</h4>
//               <ul className="space-y-3">
//                 <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
//                 <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Terms of Service</a></li>
//                 <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Cookie Policy</a></li>
//               </ul>
//             </div>
//           </div>
          
//           <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
//             <p>© {new Date().getFullYear()} LocalService Pro. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>

//       <style>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//         @keyframes gradient {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }
//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient 3s ease infinite;
//         }
//         @keyframes fade-in {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.6s ease-out;
//         }
//       `}</style>
//     </div>
//   )
// }




// import { Link } from 'react-router-dom'
// import { 
//   Search, 
//   Clock, 
//   Shield, 
//   Star, 
//   Users, 
//   CheckCircle,
//   ArrowRight,
//   Home,
//   Wrench,
//   Sparkles,
//   MapPin,
//   Zap,
//   Award,
//   TrendingUp
// } from 'lucide-react'

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
//       {/* Navigation */}
//       <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-20">
//             {/* Logo */}
//             <div className="flex items-center group">
//               <div className="relative">
//                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center shadow-lg group-hover:shadow-emerald-200 transition-all duration-300">
//                   <Shield className="w-7 h-7 text-white" />
//                 </div>
//                 <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full animate-pulse"></div>
//               </div>
//               <span className="ml-4 text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 bg-clip-text text-transparent">
//                 QuickServe
//               </span>
//             </div>

//             {/* Navigation Links */}
//             <div className="hidden md:flex items-center space-x-1">
//               <a href="#features" className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 font-medium transition-all duration-300">Features</a>
//               <a href="#how-it-works" className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 font-medium transition-all duration-300">How it Works</a>
//               <a href="#services" className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 font-medium transition-all duration-300">Services</a>
//               <a href="#testimonials" className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 font-medium transition-all duration-300">Testimonials</a>
//             </div>

//             {/* Auth Buttons */}
//             <div className="flex items-center space-x-3">
//               <Link 
//                 to="/login" 
//                 className="px-6 py-3 rounded-xl text-slate-700 font-semibold hover:bg-slate-100 transition-all duration-300"
//               >
//                 Sign In
//               </Link>
//               <Link 
//                 to="/register" 
//                 className="group relative px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
//                 <span className="relative flex items-center gap-2">
//                   Get Started
//                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//           <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
//         </div>

//         <div className="max-w-7xl mx-auto relative">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//             {/* Left Content */}
//             <div className="space-y-8">
//               <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-700 font-semibold animate-fade-in">
//                 <Sparkles className="w-5 h-5" />
//                 <span>Trusted by 10,000+ Happy Customers</span>
//               </div>
              
//               <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
//                 Your Local
//                 <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 animate-gradient">
//                   Service Experts
//                 </span>
//               </h1>
              
//               <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
//                 Connect with verified professionals in your neighborhood. Quality service, trusted results, every single time.
//               </p>
              
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Link 
//                   to="/register" 
//                   className="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white font-semibold shadow-xl hover:shadow-emerald-300 overflow-hidden transition-all duration-300"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
//                   <span className="relative flex items-center justify-center gap-2">
//                     Find Your Pro Now
//                     <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
//                   </span>
//                 </Link>
//                 <Link 
//                   to="/login" 
//                   className="px-8 py-3.5 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300"
//                 >
//                   Sign In
//                 </Link>
//               </div>
              
//               {/* Stats */}
//               <div className="grid grid-cols-3 gap-6 pt-8">
//                 {[
//                   { value: '800+', label: 'Verified Pros', icon: Award },
//                   { value: '4.9★', label: 'Avg Rating', icon: Star },
//                   { value: '24/7', label: 'Support', icon: Clock }
//                 ].map((stat, idx) => (
//                   <div key={idx} className="group">
//                     <div className="flex items-center gap-2 mb-1">
//                       <stat.icon className="w-4 h-4 text-emerald-600" />
//                       <div className="text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{stat.value}</div>
//                     </div>
//                     <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             {/* Right - Hero Visual */}
//             <div className="relative">
//               <div className="relative rounded-3xl overflow-hidden shadow-2xl">
//                 <img 
//                   src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
//                   alt="Service professionals at work"
//                   className="w-full h-[600px] object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                
//                 {/* Floating Service Cards */}
//                 <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl max-w-xs animate-float">
//                   <div className="flex items-center gap-4 mb-4">
//                     <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
//                       <Wrench className="w-7 h-7 text-white" />
//                     </div>
//                     <div>
//                       <div className="font-bold text-slate-900 text-lg">Plumbing</div>
//                       <div className="text-sm text-slate-600">John's Services</div>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">$89</span>
//                     <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-semibold">
//                       <Star className="w-4 h-4 fill-current" />
//                       4.9
//                     </span>
//                   </div>
//                 </div>
                
//                 <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl max-w-xs animate-float" style={{ animationDelay: '1s' }}>
//                   <div className="flex items-center gap-4 mb-4">
//                     <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center shadow-lg">
//                       <Home className="w-7 h-7 text-white" />
//                     </div>
//                     <div>
//                       <div className="font-bold text-slate-900 text-lg">Cleaning</div>
//                       <div className="text-sm text-slate-600">Clean Masters</div>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">$65</span>
//                     <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-semibold">
//                       <Star className="w-4 h-4 fill-current" />
//                       4.8
//                     </span>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Decorative Elements */}
//               <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl rotate-12 opacity-20"></div>
//               <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-cyan-400 to-emerald-500 rounded-2xl -rotate-12 opacity-20"></div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-16 bg-gradient-to-b from-white to-slate-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm mb-4">
//               Why Choose Us
//             </div>
//             <h2 className="text-3xl font-bold text-slate-900 mb-4">
//               Built for Your Peace of Mind
//             </h2>
//             <p className="text-lg text-slate-600 max-w-2xl mx-auto">
//               We make finding and booking local services simple, safe, and reliable
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: <Shield className="w-10 h-10" />,
//                 title: 'Verified Professionals',
//                 description: 'Every service provider is background-checked and verified for your complete safety.',
//                 gradient: 'from-emerald-500 to-teal-600',
//                 bgGradient: 'from-emerald-50 to-teal-50'
//               },
//               {
//                 icon: <Zap className="w-10 h-10" />,
//                 title: 'Lightning Fast',
//                 description: 'Book services and get them completed on the same day in most cases.',
//                 gradient: 'from-amber-500 to-orange-600',
//                 bgGradient: 'from-amber-50 to-orange-50'
//               },
//               {
//                 icon: <TrendingUp className="w-10 h-10" />,
//                 title: 'Best Pricing',
//                 description: 'Transparent pricing with no hidden fees. Compare and choose the best deal.',
//                 gradient: 'from-cyan-500 to-blue-600',
//                 bgGradient: 'from-cyan-50 to-blue-50'
//               },
//             ].map((feature, index) => (
//               <div key={index} className="group relative">
//                 <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-3xl transform group-hover:scale-105 transition-transform duration-300`}></div>
//                 <div className="relative bg-white rounded-3xl p-6 border-2 border-slate-200 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300">
//                   <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
//                     <div className="text-white">
//                       {feature.icon}
//                     </div>
//                   </div>
//                   <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
//                   <p className="text-slate-600 leading-relaxed">{feature.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section id="how-it-works" className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
//         </div>
        
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div className="text-center mb-16">
//             <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl text-white font-semibold text-sm mb-4">
//               Simple Process
//             </div>
//             <h2 className="text-3xl font-bold mb-4">How It Works</h2>
//             <p className="text-lg text-slate-300 max-w-2xl mx-auto">
//               Get your service booked in just a few simple steps
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             {[
//               { 
//                 step: '01', 
//                 title: 'Search Services', 
//                 desc: 'Browse our wide range of professional services', 
//                 icon: '🔍', 
//                 color: 'from-emerald-500 to-teal-500' 
//               },
//               { 
//                 step: '02', 
//                 title: 'Choose Provider', 
//                 desc: 'Select from verified professionals with reviews', 
//                 icon: '👤', 
//                 color: 'from-teal-500 to-cyan-500' 
//               },
//               { 
//                 step: '03', 
//                 title: 'Book & Pay', 
//                 desc: 'Schedule and pay securely online', 
//                 icon: '💳', 
//                 color: 'from-cyan-500 to-blue-500' 
//               },
//               { 
//                 step: '04', 
//                 title: 'Enjoy Service', 
//                 desc: 'Relax while experts handle your needs', 
//                 icon: '✅', 
//                 color: 'from-blue-500 to-purple-500' 
//               },
//             ].map((step, index) => (
//               <div key={step.step} className="relative group">
//                 {index < 3 && (
//                   <div className="hidden md:block absolute top-12 -right-4 w-8 h-1 bg-gradient-to-r from-white/20 to-transparent z-0"></div>
//                 )}
//                 <div className="text-center transform group-hover:-translate-y-2 transition-transform duration-300 relative z-10">
//                   <div className="relative inline-block mb-8">
//                     <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl shadow-xl group-hover:shadow-emerald-500/50 transition-shadow`}>
//                       {step.icon}
//                     </div>
//                     <div className="absolute -top-2 -right-2 w-10 h-10 bg-white text-slate-900 rounded-lg flex items-center justify-center text-xs font-bold shadow-lg">
//                       {step.step}
//                     </div>
//                   </div>
//                   <h3 className="text-lg font-bold mb-2">{step.title}</h3>
//                   <p className="text-sm text-slate-300 max-w-xs mx-auto">{step.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           {/* Progress Line (For Visual Connection) */}
//           {/* Clean Progress Line with Dots */}
// <div className="hidden md:block mt-12">
//   <div className="relative">
//     {/* Background connecting line */}
//     <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 transform -translate-y-1/2"></div>
    
//     <div className="relative flex justify-between">
//       {[1, 2, 3, 4].map((num) => (
//         <div key={num} className="relative flex flex-col items-center">
//           {/* Step circle with glow */}
//           <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-4">
//             <div className="text-white font-bold">{num}</div>
//             {/* Outer glow */}
//             <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30 animate-pulse"></div>
//           </div>
          
//           {/* Connecting line to next step */}
//           {num < 4 && (
//             <div className="absolute top-6 left-1/2 w-full h-0.5 bg-gradient-to-r from-emerald-500/30 to-cyan-500/30"></div>
//           )}
//         </div>
//       ))}
//     </div>
//   </div>
// </div>
//       </section>

//       {/* Popular Services Section - MINIMALIST */}
// <section id="services" className="py-20 bg-white">
//   <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//     <div className="text-center mb-16">
//       <h2 className="text-4xl font-bold text-slate-900 mb-4">
//         Popular Services
//       </h2>
//       <p className="text-slate-600 text-lg">
//         Discover the most sought-after services in your area
//       </p>
//     </div>
    
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//       {[
//         { name: 'Plumbing', icon: '🔧' },
//         { name: 'Cleaning', icon: '🧹' },
//         { name: 'Electrical', icon: '⚡' },
//         { name: 'Beauty', icon: '💅' },
//         { name: 'Tutoring', icon: '📚' },
//         { name: 'Pet Care', icon: '🐕' },
//         { name: 'Moving', icon: '🚚' },
//         { name: 'Gardening', icon: '🌿' },
//       ].map((service, index) => (
//         <div 
//           key={index} 
//           className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all duration-300"
//         >
//           <div className="flex flex-col items-center text-center">
//             <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
//               {service.icon}
//             </div>
//             <h3 className="text-lg font-semibold text-slate-900">
//               {service.name}
//             </h3>
//           </div>
//         </div>
//       ))}
//     </div>
    
//     <div className="mt-12 text-center">
//       <div className="inline-flex items-center gap-2 text-emerald-600 font-medium">
//         <span>50+ services available</span>
//         <div className="w-1 h-1 rounded-full bg-emerald-400"></div>
//         <span>Same-day booking</span>
//       </div>
//     </div>
//   </div>
// </section>

//       {/* CTA Section */}
//       <section className="py-16 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 relative overflow-hidden">
//         <div className="absolute inset-0 opacity-20">
//           <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
//         </div>
        
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
//             Ready to Get Started?
//           </h2>
//           <p className="text-lg text-emerald-100 mb-10 max-w-2xl mx-auto">
//             Join thousands of satisfied customers who trust QuickServe for their service needs
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link 
//               to="/register" 
//               className="group relative px-10 py-4 rounded-xl bg-white text-emerald-600 font-bold hover:bg-slate-50 shadow-2xl overflow-hidden transition-all duration-300"
//             >
//               <span className="relative flex items-center justify-center gap-2">
//                 Get Started Free
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
//               </span>
//             </Link>
//             <Link 
//               to="/login" 
//               className="px-10 py-4 rounded-xl border-2 border-white text-white font-bold hover:bg-white/10 backdrop-blur-xl transition-all duration-300"
//             >
//               Sign In
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-slate-900 text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
//             <div>
//               <div className="flex items-center mb-6">
//                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
//                   <Shield className="w-7 h-7" />
//                 </div>
//                 <span className="ml-4 text-2xl font-bold">QuickServe</span>
//               </div>
//               <p className="text-slate-400 leading-relaxed">
//                 Connecting you with trusted local service professionals for all your needs.
//               </p>
//             </div>
            
//             <div>
//               <h4 className="text-lg font-bold mb-6">Quick Links</h4>
//               <ul className="space-y-3">
//                 <li><Link to="/login" className="text-slate-400 hover:text-emerald-400 transition-colors">Sign In</Link></li>
//                 <li><Link to="/register" className="text-slate-400 hover:text-emerald-400 transition-colors">Register</Link></li>
//                 <li><a href="#features" className="text-slate-400 hover:text-emerald-400 transition-colors">Features</a></li>
//                 <li><a href="#services" className="text-slate-400 hover:text-emerald-400 transition-colors">Services</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className="text-lg font-bold mb-6">Company</h4>
//               <ul className="space-y-3">
//                 <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">About Us</a></li>
//                 <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Careers</a></li>
//                 <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Contact</a></li>
//                 <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Blog</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className="text-lg font-bold mb-6">Legal</h4>
//               <ul className="space-y-3">
//                 <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
//                 <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Terms of Service</a></li>
//                 <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Cookie Policy</a></li>
//               </ul>
//             </div>
//           </div>
          
//           <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
//             <p>© {new Date().getFullYear()} QuickServe. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>

//       <style>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//         @keyframes gradient {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }
//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient 3s ease infinite;
//         }
//         @keyframes fade-in {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.6s ease-out;
//         }
//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.5; }
//         }
//         .animate-pulse {
//           animation: pulse 2s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   )
// }


import { Link } from 'react-router-dom'
import { 
  Search, 
  Clock, 
  Shield, 
  Star, 
  Users, 
  CheckCircle,
  ArrowRight,
  Home,
  Wrench,
  Sparkles,
  MapPin,
  Zap,
  Award,
  TrendingUp
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center group">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center shadow-lg group-hover:shadow-emerald-200 transition-all duration-300">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full animate-pulse"></div>
              </div>
              <span className="ml-4 text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 bg-clip-text text-transparent">
                QuickServe
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              <a href="#features" className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 font-medium transition-all duration-300">Features</a>
              <a href="#how-it-works" className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 font-medium transition-all duration-300">How it Works</a>
              <a href="#services" className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 font-medium transition-all duration-300">Services</a>
              <a href="#testimonials" className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 font-medium transition-all duration-300">Testimonials</a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Link 
                to="/login" 
                className="px-6 py-3 rounded-xl text-slate-700 font-semibold hover:bg-slate-100 transition-all duration-300"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="group relative px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-700 font-semibold animate-fade-in">
                <Sparkles className="w-5 h-5" />
                
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Your Local
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 animate-gradient">
                  Service Experts
                </span>
              </h1>
              
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Connect with verified professionals in your neighborhood. Quality service, trusted results, every single time.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/register" 
                  className="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white font-semibold shadow-xl hover:shadow-emerald-300 overflow-hidden transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative flex items-center justify-center gap-2">
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                </Link>
                <Link 
                  to="/login" 
                  className="px-8 py-3.5 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300"
                >
                  Sign In
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {[
                  { value: '800+', label: 'Verified Pros', icon: Award },
                  { value: '4.9★', label: 'Avg Rating', icon: Star },
                  { value: '24/7', label: 'Support', icon: Clock }
                ].map((stat, idx) => (
                  <div key={idx} className="group">
                    <div className="flex items-center gap-2 mb-1">
                      <stat.icon className="w-4 h-4 text-emerald-600" />
                      <div className="text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{stat.value}</div>
                    </div>
                    <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right - Hero Visual */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Service professionals at work"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                
                {/* Floating Service Cards */}
                <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl max-w-xs animate-float">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
                      <Wrench className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-lg">Plumbing</div>
                      <div className="text-sm text-slate-600">John's Services</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Rs.400</span>
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-semibold">
                      <Star className="w-4 h-4 fill-current" />
                      4.9
                    </span>
                  </div>
                </div>
                
                <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl max-w-xs animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center shadow-lg">
                      <Home className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-lg">Cleaning</div>
                      <div className="text-sm text-slate-600">Clean Masters</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">Rs.300</span>
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-semibold">
                      <Star className="w-4 h-4 fill-current" />
                      4.8
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl rotate-12 opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-cyan-400 to-emerald-500 rounded-2xl -rotate-12 opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm mb-4">
              Why Choose Us
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Built for Your Peace of Mind
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We make finding and booking local services simple, safe, and reliable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-10 h-10" />,
                title: 'Verified Professionals',
                description: 'Every service provider is background-checked and verified for your complete safety.',
                gradient: 'from-emerald-500 to-teal-600',
                bgGradient: 'from-emerald-50 to-teal-50'
              },
              {
                icon: <Zap className="w-10 h-10" />,
                title: 'Lightning Fast',
                description: 'Book services and get them completed on the same day in most cases.',
                gradient: 'from-amber-500 to-orange-600',
                bgGradient: 'from-amber-50 to-orange-50'
              },
              {
                icon: <TrendingUp className="w-10 h-10" />,
                title: 'Best Pricing',
                description: 'Transparent pricing with no hidden fees. Compare and choose the best deal.',
                gradient: 'from-cyan-500 to-blue-600',
                bgGradient: 'from-cyan-50 to-blue-50'
              },
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-3xl transform group-hover:scale-105 transition-transform duration-300`}></div>
                <div className="relative bg-white rounded-3xl p-6 border-2 border-slate-200 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl text-white font-semibold text-sm mb-4">
              Simple Process
            </div>
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Get your service booked in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { 
                step: '01', 
                title: 'Search Services', 
                desc: 'Browse our wide range of professional services', 
                icon: '🔍', 
                color: 'from-emerald-500 to-teal-500' 
              },
              { 
                step: '02', 
                title: 'Choose Provider', 
                desc: 'Select from verified professionals with reviews', 
                icon: '👤', 
                color: 'from-teal-500 to-cyan-500' 
              },
              { 
                step: '03', 
                title: 'Book & Pay', 
                desc: 'Schedule and pay securely online', 
                icon: '💳', 
                color: 'from-cyan-500 to-blue-500' 
              },
              { 
                step: '04', 
                title: 'Enjoy Service', 
                desc: 'Relax while experts handle your needs', 
                icon: '✅', 
                color: 'from-blue-500 to-purple-500' 
              },
            ].map((step, index) => (
              <div key={step.step} className="relative group">
                {index < 3 && (
                  <div className="hidden md:block absolute top-12 -right-4 w-8 h-1 bg-gradient-to-r from-white/20 to-transparent z-0"></div>
                )}
                <div className="text-center transform group-hover:-translate-y-2 transition-transform duration-300 relative z-10">
                  <div className="relative inline-block mb-8">
                    <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl shadow-xl group-hover:shadow-emerald-500/50 transition-shadow`}>
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-white text-slate-900 rounded-lg flex items-center justify-center text-xs font-bold shadow-lg">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-300 max-w-xs mx-auto">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Fixed Progress Line */}
          <div className="hidden md:flex items-center justify-center mt-12 space-x-16">
            {[1, 2, 3, 4].map((num, index) => (
              <div key={num} className="flex items-center">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg">
                    {num}
                  </div>
                  {index < 3 && (
                    <div className="absolute top-1/2 left-full w-16 h-0.5 bg-gradient-to-r from-emerald-500/40 to-cyan-500/40"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services Section - MINIMALIST */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Popular Services
            </h2>
            <p className="text-slate-600 text-lg">
              Discover the most sought-after services in your area
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Plumbing', icon: '🔧' },
              { name: 'Cleaning', icon: '🧹' },
              { name: 'Electrical', icon: '⚡' },
              { name: 'Beauty', icon: '💅' },
              { name: 'Tutoring', icon: '📚' },
              { name: 'Pet Care', icon: '🐕' },
              { name: 'Moving', icon: '🚚' },
              { name: 'Gardening', icon: '🌿' },
            ].map((service, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {service.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-emerald-600 font-medium">
              <span>50+ services available</span>
              <div className="w-1 h-1 rounded-full bg-emerald-400"></div>
              <span>Same-day booking</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-emerald-100 mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust QuickServe for their service needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="group relative px-10 py-4 rounded-xl bg-white text-emerald-600 font-bold hover:bg-slate-50 shadow-2xl overflow-hidden transition-all duration-300"
            >
              <span className="relative flex items-center justify-center gap-2">
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
            <Link 
              to="/login" 
              className="px-10 py-4 rounded-xl border-2 border-white text-white font-bold hover:bg-white/10 backdrop-blur-xl transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                  <Shield className="w-7 h-7" />
                </div>
                <span className="ml-4 text-2xl font-bold">QuickServe</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Connecting you with trusted local service professionals for all your needs.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link to="/login" className="text-slate-400 hover:text-emerald-400 transition-colors">Sign In</Link></li>
                <li><Link to="/register" className="text-slate-400 hover:text-emerald-400 transition-colors">Register</Link></li>
                <li><a href="#features" className="text-slate-400 hover:text-emerald-400 transition-colors">Features</a></li>
                <li><a href="#services" className="text-slate-400 hover:text-emerald-400 transition-colors">Services</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">About Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Careers</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Contact</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>© {new Date().getFullYear()} QuickServe. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}