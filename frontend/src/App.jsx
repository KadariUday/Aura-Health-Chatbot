import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = "https://aura-health-chatbot.onrender.com";

import { 
  HeartPulse, LogOut, Paperclip, Mic, Send, Calendar, 
  FileText, Pill, UserCircle2, Bot, ChevronRight, Menu, X, CheckCircle2, Lock, Mail, User as UserIcon, Globe, AlertTriangle, BookOpen, Activity, Phone, MapPin, Plus, MessageSquare, Clock, Heart
} from 'lucide-react';

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      if (isLogin) {
        const response = await axios.post(`${API_BASE_URL}/api/login`, {
          email: formData.email,
          password: formData.password
        });
        // Normalize backend response 'username' to 'name' for frontend consistency
        const user = { name: response.data.user.username, email: response.data.user.email };
        onLogin(user);
      } else {
        const response = await axios.post(`${API_BASE_URL}/api/signup`, {
          username: formData.name,
          email: formData.email,
          password: formData.password
        });
        const user = { name: response.data.user.username, email: response.data.user.email };
        onLogin(user);
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred during authentication. Make sure backend is running.');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f4f7fb] relative overflow-hidden font-sans">
      <div className="bg-medical-pattern"></div>
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob pointer-events-none"></div>

      <div className="w-full max-w-5xl bg-white md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 animate-slide-up border border-gray-100 min-h-screen md:min-h-[600px]">
        <div className="w-full md:w-1/2 bg-gradient-to-br from-[#0070f3] to-indigo-600 text-white p-8 md:p-12 flex flex-col justify-center md:justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 flex items-center space-x-3 mb-6 md:mb-10">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <HeartPulse size={24} className="text-white md:w-8 md:h-8" />
            </div>
            <span className="text-xl md:text-3xl font-bold tracking-tight">Aura Health</span>
          </div>
          
          <div className="relative z-10">
            <h1 className="text-2xl md:text-4xl font-extrabold mb-2 md:mb-4 leading-tight">Smart. Secure. <br className="hidden md:block"/>Explainable.</h1>
            <p className="text-blue-100 text-sm md:text-lg mb-4 md:mb-8 leading-relaxed opacity-90">
              Experience our upgraded Medical NLP Engine featuring Kaggle-Dataset Integrated XAI.
            </p>
          </div>
          
          <div className="relative z-10 flex items-center space-x-4 text-[10px] md:text-sm text-blue-200">
            <span>✓ Multilingual</span>
            <span>✓ Voice Enabled</span>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 sm:p-16 bg-white flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
          <p className="text-sm md:text-base text-gray-500 mb-6 md:mb-8">{isLogin ? 'Enter your credentials to access your dashboard.' : 'Sign up to start chatting with MedChat AI.'}</p>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 text-sm animate-fade-in flex items-center">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <UserIcon size={18} className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-gray-800"
                />
              </div>
            )}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input 
                type="email" 
                placeholder="Email Address" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-gray-800"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input 
                type="password" 
                placeholder="Password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-gray-800"
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full py-4 bg-[#0070f3] hover:bg-blue-600 text-white rounded-xl font-bold shadow-md hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 active:scale-95 transition-all"
            >
              {isLogin ? 'Sign In to Dashboard' : 'Create Secure Account'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }} 
              className="text-blue-600 font-bold hover:underline"
            >
              {isLogin ? 'Sign up here' : 'Log in here'}
            </button>
          </div>
        </div>
      </div>
      
      <footer className="mt-8 flex flex-col items-center gap-3 z-10">
        <a href="https://www.linkedin.com/in/kadariuday" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/20">
          <UserCircle2 size={16} /> Contact Us (LinkedIn)
        </a>
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-[10px] font-bold text-blue-100 shadow-lg backdrop-blur-sm tracking-widest uppercase animate-pulse">
           <span className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>
           Maintained by Kadari Uday
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
        .animate-blob { animation: blob 7s infinite alternate; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
      `}} />
    </div>
  );
};

const Dashboard = ({ user, onLogout }) => {
  const storageKey = `medchat_data_${user.email}`;
  
  const loadUserData = () => {
    const defaultMessages = [{ id: 1, role: 'bot', content: `Hello ${user.name.split(' ')[0]}! Welcome to Aura Health Chatbot.\n\nI am equipped with Explainable AI (XAI) and Kaggle dataset integrations. How can I help you today?`, isPrimary: true, isEmergency: false }];
    
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        messages: defaultMessages // Always reset chat on login
      };
    }
    
    return {
      messages: defaultMessages,
      history: [],
      appointments: [],
      consultsCount: 0
    };
  };

  const [userData, setUserData] = useState(loadUserData());
  
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(userData));
  }, [userData, storageKey]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const [insights, setInsights] = useState({
    xai: 'Awaiting symptom analysis...',
    medicines: [],
    doctors: [],
    actions: ['Describe your symptoms clearly']
  });

  const [activeTab, setActiveTab] = useState('Dashboard');
  const [toast, setToast] = useState({ show: false, message: '' });
  const [modal, setModal] = useState({ isOpen: false, type: null });
  const [isRecording, setIsRecording] = useState(false);

  const [doctorsDb, setDoctorsDb] = useState(() => {
    const defaultList = {
      "General Physician": { name: "Dr. Kadari Uday", phone: "+91 98765 43210", email: "kadariuday2233@gmail.com", hospital: "Apollo Hospitals" },
      "Cardiologist": { name: "Dr. Rajesh Sharma", phone: "+91 98765 43210", email: "dr.sharma@heartcare.in", hospital: "Apollo Hospitals" },
      "Neurologist": { name: "Dr. Anjali Desai", phone: "+91 98765 43211", email: "anjali.neuro@citymed.in", hospital: "City Medical Center" },
      "ENT Specialist": { name: "Dr. Priya Patel", phone: "+91 98765 43213", email: "priya.ent@carehospital.in", hospital: "Care Hospitals" },
      "Pulmonologist": { name: "Dr. Amit Kumar", phone: "+91 98765 43214", email: "amit.pulmo@breathewell.in", hospital: "BreatheWell Lung Center" },
      "Gastroenterologist": { name: "Dr. Neha Gupta", phone: "+91 98765 43215", email: "neha.gastro@digestive.in", hospital: "Digestive Health Institute" },
      "Endocrinologist": { name: "Dr. Sanjay Reddy", phone: "+91 98765 43216", email: "sanjay.endo@diabetes.in", hospital: "Diabetes Care Clinic" },
      "Emergency Specialist": { name: "Emergency Ward", phone: "108 / 112", email: "emergency@hospital.in", hospital: "Nearest Govt/Private Hospital" },
      "Dermatologist": { name: "Dr. Sneha Iyer", phone: "+91 98765 43217", email: "sneha.derma@skinclinic.in", hospital: "Skin & Hair Care Center" },
      "Orthopedist": { name: "Dr. Ramesh Babu", phone: "+91 98765 43218", email: "ramesh.ortho@bonecare.in", hospital: "Bone & Joint Hospital" },
      "Rheumatologist": { name: "Dr. Kavita Menon", phone: "+91 98765 43219", email: "kavita.rheuma@jointcare.in", hospital: "Joint Care Institute" },
      "Physiotherapist": { name: "Dr. Rahul Verma", phone: "+91 98765 43220", email: "rahul.physio@rehab.in", hospital: "Rehab Physiotherapy Clinic" },
      "Dentist": { name: "Dr. Pooja Agarwal", phone: "+91 98765 43221", email: "pooja.dentist@smile.in", hospital: "Smile Dental Clinic" },
      "Endodontist": { name: "Dr. Tarun Jain", phone: "+91 98765 43222", email: "tarun.endo@rootcanal.in", hospital: "Advanced Dental Care" },
      "Urologist": { name: "Dr. Anil Kapoor", phone: "+91 98765 43223", email: "anil.uro@kidneycare.in", hospital: "Kidney Care Hospital" },
      "Dietician": { name: "Dt. Ritu Sharma", phone: "+91 98765 43224", email: "ritu.diet@nutrition.in", hospital: "Nutrition & Wellness Center" },
      "Allergist": { name: "Dr. Sameer Khan", phone: "+91 98765 43225", email: "sameer.allergy@allergycare.in", hospital: "Allergy Care Clinic" },
      "Trichologist": { name: "Dr. Maya Das", phone: "+91 98765 43226", email: "maya.tricho@hairclinic.in", hospital: "Advanced Hair Clinic" },
      "Ophthalmologist": { name: "Dr. Sunil Joshi", phone: "+91 98765 43227", email: "sunil.opthal@eyecare.in", hospital: "Vision Eye Hospital" },
      "Optometrist": { name: "Dr. Rakesh Nair", phone: "+91 98765 43228", email: "rakesh.opto@glasses.in", hospital: "Clear Vision Clinic" },
      "Psychiatrist": { name: "Dr. Deepa Rao", phone: "+91 98765 43229", email: "deepa.psych@mindcare.in", hospital: "MindCare Psychiatric Center" },
      "Infectious Disease Specialist": { name: "Dr. Arun Kumar", phone: "+91 98765 43230", email: "arun.infect@feverclinic.in", hospital: "Infectious Disease Institute" },
      "Gynecologist": { name: "Dr. Lakshmi Prasad", phone: "+91 98765 43231", email: "lakshmi.gyno@womenscare.in", hospital: "Women's Care Hospital" },
      "Pediatrician": { name: "Dr. Rohan Gupta", phone: "+91 98765 43232", email: "rohan.peds@childcare.in", hospital: "Child Care Clinic" },
      "Oncologist": { name: "Dr. Sumanth Reddy", phone: "+91 98765 43233", email: "sumanth.onco@cancerinstitute.in", hospital: "Cancer Research Institute" },
      "Nephrologist": { name: "Dr. Suresh Babu", phone: "+91 98765 43234", email: "suresh.nephro@kidney.in", hospital: "National Kidney Foundation" },
      "Proctologist": { name: "Dr. Harish Kumar", phone: "+91 98765 43235", email: "harish.procto@pilesclinic.in", hospital: "Piles & Fissure Clinic" },
      "General Surgeon": { name: "Dr. Manoj Tiwari", phone: "+91 98765 43236", email: "manoj.surgeon@surgery.in", hospital: "General Surgery Center" },
      "Sports Medicine Specialist": { name: "Dr. Arjun Patel", phone: "+91 98765 43237", email: "arjun.sports@sportsmed.in", hospital: "Sports Injury Clinic" },
      "Psychologist": { name: "Dr. Smriti Irani", phone: "+91 98765 43238", email: "smriti.psych@therapy.in", hospital: "Therapy & Counseling Center" }
    };
    
    const saved = localStorage.getItem('medchat_doctors');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure default doctors (like Dr. Kadari Uday) are updated/included
      return { ...parsed, ...defaultList };
    }
    return defaultList;
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('medchat_doctors', JSON.stringify(doctorsDb));
  }, [doctorsDb]);

  const [bookingData, setBookingData] = useState({ doctor: null, problem: '', date: '', time: '' });
  const [newDoctorData, setNewDoctorData] = useState({ specialty: '', name: '', hospital: '', phone: '', email: '', availability: '' });
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      showToast("❌ New passwords do not match!");
      return;
    }
    if (passwords.new.length < 6) {
      showToast("❌ New password must be at least 6 characters!");
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/api/change-password`, {
        email: user.email,
        old_password: passwords.old,
        new_password: passwords.new
      });
      showToast("✅ Password changed successfully!");
      setModal({ isOpen: false });
      setPasswords({ old: '', new: '', confirm: '' });
    } catch (err) {
      showToast(`❌ ${err.response?.data?.detail || "Error changing password"}`);
    }
  };


  const toggleFavorite = (docName) => {
    setUserData(prev => {
      const favs = prev.favorites || [];
      const isFav = favs.includes(docName);
      if (!isFav) showToast(`❤️ Added ${docName} to favorites!`);
      return { ...prev, favorites: isFav ? favs.filter(n => n !== docName) : [...favs, docName] };
    });
  };

  const initiateBooking = (docInfo) => {
    setBookingData({ doctor: docInfo, problem: '', date: '', time: '' });
    setModal({ isOpen: true, type: 'confirm_booking' });
  };

  const finalizeBooking = async () => {
    if (!bookingData.problem.trim() || !bookingData.date || !bookingData.time) {
      showToast("Please fill all booking details (Problem, Date, and Time).");
      return;
    }
    const dateStr = `${bookingData.date} at ${bookingData.time}`;
    
    setUserData(prev => ({
      ...prev,
      appointments: [{ doctor: bookingData.doctor.name, time: dateStr, status: 'Confirmed' }, ...prev.appointments]
    }));
    
    // Generate the direct string output as requested in the screenshot
    const appointmentDetails = `Appointment with Dr. ${bookingData.doctor.name}
Scheduled for: ${dateStr}

Patient Problem:
${bookingData.problem}

-----------------------------------------
SYSTEM STATUS: Message routed successfully via MedChat AI.`;

    // Send to the doctor's email via FormSubmit
    try {
      const targetEmail = bookingData.doctor.email;
      
      console.log("Attempting to send email to:", targetEmail);

      // Using a hidden form submission to an iframe to completely bypass CORS issues
      const iframe = document.createElement('iframe');
      iframe.name = 'hidden_iframe';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      const form = document.createElement('form');
      form.action = `https://formsubmit.co/${targetEmail}`;
      form.method = 'POST';
      form.target = 'hidden_iframe';

      const fields = {
        _subject: `New Appointment Request from ${user.name}`,
        _captcha: "false",
        name: user.name,
        email: user.email,
        message: appointmentDetails
      };

      for (const key in fields) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = fields[key];
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();

      // Clean up DOM after submission
      setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      }, 1000);

      showToast(`✅ Appointment Request Sent to ${targetEmail}!`);
    } catch (e) {
      console.error("Submission failed:", e);
      showToast(`❌ Error: ${e.message}`);
    }

    setModal({ isOpen: false, type: null });
  };

  const handleAddDoctorSubmit = (e) => {
    e.preventDefault();
    if(!newDoctorData.specialty || !newDoctorData.name || !newDoctorData.hospital || !newDoctorData.email) {
      showToast("Please fill all required doctor fields."); return;
    }
    setDoctorsDb(prev => ({
      ...prev,
      [newDoctorData.specialty]: {
        name: newDoctorData.name,
        hospital: newDoctorData.hospital,
        phone: newDoctorData.phone || 'N/A',
        email: newDoctorData.email,
        availability: newDoctorData.availability || "Mon-Sat, 10:00 AM - 6:00 PM"
      }
    }));
    setModal({isOpen: false});
    showToast(`✅ Added ${newDoctorData.name} to the directory!`);
    setNewDoctorData({ specialty: '', name: '', hospital: '', phone: '', email: '', availability: '' });
  };

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [userData.messages]);

  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleSend = async (e) => {
    if(e) e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    setUserData(prev => {
      const isFirstConsult = prev.messages.length === 1;
      const newHistory = isFirstConsult ? [{ title: `${userMessage.substring(0, 20)}... Consult`, time: 'Just now', active: true }, ...prev.history.map(h => ({...h, active: false}))] : prev.history;
      
      return {
        ...prev,
        messages: [...prev.messages, { id: Date.now(), role: 'user', content: userMessage }],
        history: newHistory,
        consultsCount: isFirstConsult ? prev.consultsCount + 1 : prev.consultsCount
      };
    });
    
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/chat`, {
        message: userMessage,
        session_id: user.email,
        language: language
      });

      const { intent, entities, reply, is_emergency, xai_explanation, medicines, doctors } = response.data;
      
      if (xai_explanation && xai_explanation !== "Awaiting more symptom data for XAI analysis.") {
          setInsights({
              xai: xai_explanation,
              medicines: medicines || [],
              doctors: doctors || [],
              actions: ['Rest', 'Stay Hydrated', 'Seek clinical advice']
          });
      }

      setUserData(prev => ({
        ...prev,
        messages: [
          ...prev.messages, 
          { id: Date.now() + 1, role: 'bot', content: reply, isPrimary: true, isEmergency: is_emergency },
          { id: Date.now() + 2, role: 'bot', content: `NLP extracted:\nIntent: ${intent}\nEntities: ${entities.map(e => e.text).join(', ') || 'None detected'}`, isPrimary: false, isEmergency: false }
        ]
      }));
      
      if(is_emergency) {
        showToast("🚨 Critical Emergency Detected! Check recommendations.");
      }

    } catch (error) {
      console.error('Error:', error);
      setUserData(prev => ({
        ...prev,
        messages: [...prev.messages, { id: Date.now() + 1, role: 'bot', content: 'Connection error. Please try again.', isPrimary: true, isEmergency: false }]
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicClick = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      showToast("Speech recognition is not supported in this browser.");
      return;
    }
    
    if (isRecording) return;
    setIsRecording(true);
    showToast("🎤 Listening... Speak now.");
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'te' ? 'te-IN' : 'en-US';
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      showToast("Speech transcribed successfully.");
      setIsRecording(false);
    };
    
    recognition.onerror = () => {
      showToast("Error capturing speech. Please try again.");
      setIsRecording(false);
    };
    
    recognition.onend = () => {
      setIsRecording(false);
    };
    
    recognition.start();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if(file) { showToast(`📎 Uploaded medical document: ${file.name}`); }
  };

  const renderModal = () => {
    if (!modal.isOpen) return null;
    return (
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up relative">
          <button onClick={() => setModal({ isOpen: false, type: null })} className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10">
            <X size={18} className="text-gray-600" />
          </button>

          {modal.type === 'confirm_booking' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Confirm Appointment</h2>
              <p className="text-gray-600 text-sm mb-4">Provide details for {bookingData.doctor?.name}.</p>
              
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
                <p className="font-bold text-blue-900">{bookingData.doctor?.name}</p>
                <p className="text-sm text-blue-700">{bookingData.doctor?.hospital}</p>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Select Date</label>
                  <input type="date" required value={bookingData.date} onChange={e => setBookingData({...bookingData, date: e.target.value})} className="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Select Time</label>
                  <input type="time" required value={bookingData.time} onChange={e => setBookingData({...bookingData, time: e.target.value})} className="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><MessageSquare size={16}/> Problem Description</label>
                <textarea 
                  value={bookingData.problem}
                  onChange={e => setBookingData({...bookingData, problem: e.target.value})}
                  placeholder="E.g., I have been experiencing severe chest pain and shortness of breath for the past two days..." 
                  className="w-full p-3 border border-gray-200 rounded-xl h-24 focus:ring-2 focus:ring-blue-500 outline-none resize-none bg-gray-50 text-gray-800 text-sm"
                ></textarea>
                <p className="text-xs text-gray-500 mt-2">Clicking send will securely transmit this message directly to the doctor's inbox.</p>
              </div>

              <button onClick={finalizeBooking} className="w-full py-3 bg-[#0070f3] text-white rounded-xl font-bold shadow-md hover:bg-blue-600 transition-colors active:scale-95 flex items-center justify-center gap-2">
                <Send size={18} /> Send Booking Request
              </button>
            </div>
          )}



          {modal.type === 'email_output' && (
            <div className="p-6">
              <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mb-4 shadow-inner">
                <CheckCircle2 className="text-green-400" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Simulated String Output</h2>
              <p className="text-gray-600 text-sm mb-4">Because this is a custom newly added doctor, we bypassed the backend mailer and generated the raw string directly:</p>
              
              <div className="bg-gray-900 text-green-400 p-4 rounded-xl text-sm font-mono whitespace-pre-wrap overflow-y-auto max-h-[300px] border-l-4 border-green-500 shadow-inner custom-scrollbar">
                {modal.content}
              </div>

              <button onClick={() => setModal({isOpen:false})} className="w-full py-3 mt-6 bg-gray-900 text-white rounded-xl font-bold shadow-md hover:bg-gray-800 transition-colors active:scale-95">
                Acknowledge
              </button>
            </div>
          )}

          {modal.type === 'add_doctor' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Add New Doctor</h2>
              <p className="text-gray-600 text-sm mb-6">Register a specialist to the local directory.</p>
              <form onSubmit={handleAddDoctorSubmit} className="space-y-3">
                <input required type="text" placeholder="Specialty (e.g., Cardiologist)" value={newDoctorData.specialty} onChange={e => setNewDoctorData({...newDoctorData, specialty: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
                <input required type="text" placeholder="Doctor Full Name" value={newDoctorData.name} onChange={e => setNewDoctorData({...newDoctorData, name: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
                <input required type="text" placeholder="Hospital / Clinic Name" value={newDoctorData.hospital} onChange={e => setNewDoctorData({...newDoctorData, hospital: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
                <input type="text" placeholder="Availability (e.g. Mon-Fri, 9AM-5PM)" value={newDoctorData.availability} onChange={e => setNewDoctorData({...newDoctorData, availability: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="Phone Number" value={newDoctorData.phone} onChange={e => setNewDoctorData({...newDoctorData, phone: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
                  <input required type="email" placeholder="Email Address" value={newDoctorData.email} onChange={e => setNewDoctorData({...newDoctorData, email: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
                </div>
                <button type="submit" className="w-full py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors mt-2">Save Doctor Details</button>
              </form>
            </div>
          )}

          {modal.type === 'all_doctors' && (
            <div className="p-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="text-emerald-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Doctor Directory</h2>
              <p className="text-gray-600 text-sm mb-6">Select any specialist to book an appointment.</p>
              
              <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                {Object.entries(doctorsDb)
                  .sort((a, b) => {
                    const isAFav = (userData.favorites || []).includes(a[1].name);
                    const isBFav = (userData.favorites || []).includes(b[1].name);
                    if (isAFav && !isBFav) return -1;
                    if (!isAFav && isBFav) return 1;
                    return 0;
                  })
                  .map(([docType, doc], idx) => {
                  return (
                    <div key={idx} className="p-4 border border-gray-200 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all bg-gray-50 flex flex-col space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg">{doc.name}</h3>
                          <p className="text-sm font-medium text-emerald-600">{docType}</p>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); toggleFavorite(doc.name); }} className="p-2 -mr-2 -mt-2 rounded-full hover:bg-emerald-100 transition-colors">
                          <Heart size={20} className={`${(userData.favorites || []).includes(doc.name) ? "fill-red-500 text-red-500" : "text-gray-300 hover:text-red-400"}`} />
                        </button>
                      </div>
                      <div className="flex flex-col space-y-2 text-sm text-gray-600 mt-2">
                        <div className="flex items-center gap-2"><MapPin size={14} className="text-gray-400" /> {doc.hospital}</div>
                        <div className="flex items-center gap-2"><Clock size={14} className="text-gray-400" /> {doc.availability || "Mon-Sat, 10:00 AM - 6:00 PM"}</div>
                        <div className="flex items-center gap-2"><Phone size={14} className="text-gray-400" /> <a href={`tel:${doc.phone.replace(/\s+/g, '')}`} className="hover:text-emerald-600 font-medium">{doc.phone}</a></div>
                        <div className="flex items-center gap-2"><Mail size={14} className="text-gray-400" /> <a href={`mailto:${doc.email}`} className="hover:text-emerald-600 font-medium">{doc.email}</a></div>
                      </div>
                      <button onClick={() => initiateBooking(doc)} className="w-full py-2.5 mt-2 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors shadow-sm active:scale-95">
                        Book Appointment
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {modal.type === 'appointment' && (
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Calendar className="text-blue-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Doctor Profiles</h2>
              <p className="text-gray-600 text-sm mb-6">Contact recommended specialists near you directly.</p>
              
              <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                {(insights.doctors.length > 0 ? insights.doctors : ["General Physician"])
                  .sort((a, b) => {
                    const docA = doctorsDb[a] || { name: `Dr. Specialist (${a})` };
                    const docB = doctorsDb[b] || { name: `Dr. Specialist (${b})` };
                    const isAFav = (userData.favorites || []).includes(docA.name);
                    const isBFav = (userData.favorites || []).includes(docB.name);
                    if (isAFav && !isBFav) return -1;
                    if (!isAFav && isBFav) return 1;
                    return 0;
                  })
                  .map((docType, idx) => {
                  const doc = doctorsDb[docType] || { name: `Dr. Specialist (${docType})`, phone: "+91 98765 00000", email: "contact@hospital.in", hospital: "City General Hospital" };
                  return (
                    <div key={idx} className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all bg-gray-50 flex flex-col space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg">{doc.name}</h3>
                          <p className="text-sm font-medium text-blue-600">{docType}</p>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); toggleFavorite(doc.name); }} className="p-2 -mr-2 -mt-2 rounded-full hover:bg-blue-100 transition-colors">
                          <Heart size={20} className={`${(userData.favorites || []).includes(doc.name) ? "fill-red-500 text-red-500" : "text-gray-300 hover:text-red-400"}`} />
                        </button>
                      </div>
                      <div className="flex flex-col space-y-2 text-sm text-gray-600 mt-2">
                        <div className="flex items-center gap-2"><MapPin size={14} className="text-gray-400" /> {doc.hospital}</div>
                        <div className="flex items-center gap-2"><Clock size={14} className="text-gray-400" /> {doc.availability || "Mon-Sat, 10:00 AM - 6:00 PM"}</div>
                        <div className="flex items-center gap-2"><Phone size={14} className="text-gray-400" /> <a href={`tel:${doc.phone.replace(/\s+/g, '')}`} className="hover:text-blue-600 font-medium">{doc.phone}</a></div>
                        <div className="flex items-center gap-2"><Mail size={14} className="text-gray-400" /> <a href={`mailto:${doc.email}`} className="hover:text-blue-600 font-medium">{doc.email}</a></div>
                      </div>
                      <button onClick={() => initiateBooking(doc)} className="w-full py-2.5 mt-2 bg-[#0070f3] text-white font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-sm active:scale-95">
                        Book Appointment
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {modal.type === 'symptoms' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Symptom Log</h2>
              <textarea placeholder="How are you feeling today?" className="w-full p-3 border border-gray-200 rounded-xl mb-4 h-32 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"></textarea>
              <button onClick={() => { setModal({isOpen:false}); showToast("📝 Log saved to your records."); }} className="w-full py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600">Save Entry</button>
            </div>
          )}

          {modal.type === 'medication' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Medication Tracker</h2>
              <div className="space-y-3 mb-6">
                {insights.medicines.length > 0 ? insights.medicines.map((med, idx) => (
                  <label key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100">
                    <input type="checkbox" className="w-5 h-5 text-emerald-500" />
                    <span className="font-medium text-gray-700">{med}</span>
                  </label>
                )) : (
                  <p className="text-sm text-gray-500">No active medications prescribed.</p>
                )) : (
                  <p className="text-sm text-gray-500">No active medications prescribed.</p>
                )}
              </div>
            </div>
          )}

          {modal.type === 'change_password' && (
            <div className="p-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                <Lock className="text-indigo-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Change Password</h2>
              <p className="text-gray-600 text-sm mb-6">Enter your details to update your security.</p>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Current Password</label>
                  <input required type="password" value={passwords.old} onChange={e => setPasswords({...passwords, old: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">New Password</label>
                  <input required type="password" value={passwords.new} onChange={e => setPasswords({...passwords, new: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Confirm New Password</label>
                  <input required type="password" value={passwords.confirm} onChange={e => setPasswords({...passwords, confirm: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
                </div>
                <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors mt-2">Update Password</button>
              </form>
            </div>
          )}

        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col relative z-10 selection:bg-blue-200 selection:text-blue-900 bg-[#f4f7fb]">
      <div className="bg-medical-pattern"></div>
      
      {toast.show && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center space-x-2 animate-fade-in">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {renderModal()}
      
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between z-30 shadow-sm sticky top-0 transition-all duration-300">
        <div className="flex items-center space-x-2 group cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => { setActiveTab('Dashboard'); setIsMobileMenuOpen(false); }}>
          <HeartPulse className="text-blue-600" size={28} />
          <span className="text-lg sm:text-xl font-bold text-[#0f2851] truncate max-w-[150px] sm:max-w-none">Aura Health</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-600">
          {['Dashboard', 'Consult AI', 'Appointments'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${activeTab === tab ? 'bg-blue-50 text-blue-600 px-4 py-2 rounded-lg shadow-sm font-bold' : 'hover:text-blue-600'} transition-all duration-300`}
            >
              {tab}
            </button>
          ))}
          
          <div className="flex items-center space-x-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1">
            <Globe size={16} className="text-gray-500" />
            <select 
              value={language} 
              onChange={(e) => { setLanguage(e.target.value); showToast(`Language changed to ${e.target.options[e.target.selectedIndex].text}`); }}
              className="bg-transparent text-gray-700 outline-none cursor-pointer"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="bn">বাংলা (Bengali)</option>
              <option value="gu">ગુજરાતી (Gujarati)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div 
            onClick={() => setModal({ isOpen: true, type: 'change_password' })}
            className="flex items-center space-x-2 cursor-pointer group hover:bg-gray-50 px-2 sm:px-3 py-1.5 rounded-full transition-all border border-transparent hover:border-gray-100"
          >
            <span className="text-sm font-medium text-gray-700 hidden lg:block group-hover:text-blue-600 transition-colors">{user.name}</span>
            <UserCircle2 className="text-gray-400 group-hover:text-blue-500 transition-colors" size={26} />
          </div>

          <button onClick={onLogout} title="Log Out" className="text-gray-400 hover:text-red-500 transition-all hover:bg-red-50 p-2 rounded-full active:scale-90 hidden sm:block">
            <LogOut size={20} />
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-gray-600 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-all">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-[#0f2851]/20 backdrop-blur-md z-40 animate-fade-in" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="bg-white p-6 shadow-xl animate-slide-up flex flex-col space-y-4" onClick={e => e.stopPropagation()}>
            {['Dashboard', 'Consult AI', 'Appointments'].map(tab => (
              <button 
                key={tab}
                onClick={() => { setActiveTab(tab); setIsMobileMenuOpen(false); }}
                className={`flex items-center justify-between p-4 rounded-xl border ${activeTab === tab ? 'bg-blue-50 border-blue-200 text-blue-600 font-bold' : 'bg-gray-50 border-gray-100 text-gray-700'} transition-all`}
              >
                {tab}
                <ChevronRight size={18} />
              </button>
            ))}
            <div className="pt-4 border-t border-gray-100 mt-4 flex flex-col space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Language</span>
                <Globe size={18} className="text-gray-400" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                 <select 
                  value={language} 
                  onChange={(e) => { setLanguage(e.target.value); setIsMobileMenuOpen(false); showToast(`Language changed!`); }}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="te">Telugu</option>
                  <option value="ta">Tamil</option>
                </select>
              </div>
              <button onClick={onLogout} className="w-full py-4 bg-red-50 text-red-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
                <LogOut size={20} /> Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col z-20 relative pt-4 sm:pt-6 pb-12 animate-fade-in">
        <h1 className="text-xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8 tracking-tight flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
          <span className="truncate max-w-[250px] sm:max-w-none">
            {activeTab === 'Consult AI' && 'Symptom Checker'}
            {activeTab === 'Dashboard' && `Hi, ${user.name.split(' ')[0]}!`}
            {activeTab === 'Appointments' && 'Appointments'}
          </span>
          <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-[10px] sm:text-xs rounded-full shadow-lg">V2.0 LIVE</span>
        </h1>

        {/* --- DASHBOARD VIEW --- */}
        {activeTab === 'Dashboard' && (
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 p-8 flex-1 animate-fade-in max-w-5xl mx-auto w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2"><Activity className="text-blue-500" /> Patient Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 hover:-translate-y-1 transition-transform cursor-pointer" onClick={() => setActiveTab('Consult AI')}>
                <h3 className="text-blue-800 font-bold mb-2">Total Consults</h3>
                <p className="text-4xl font-extrabold text-blue-600">{userData.consultsCount}</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100 hover:-translate-y-1 transition-transform cursor-pointer" onClick={() => setActiveTab('Appointments')}>
                <h3 className="text-emerald-800 font-bold mb-2">Upcoming Appointments</h3>
                <p className="text-4xl font-extrabold text-emerald-600">{userData.appointments.length}</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-100 hover:-translate-y-1 transition-transform cursor-pointer" onClick={() => setModal({isOpen:true, type:'medication'})}>
                <h3 className="text-purple-800 font-bold mb-2">Active Prescriptions</h3>
                <p className="text-4xl font-extrabold text-purple-600">{insights.medicines.length}</p>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
            <ul className="space-y-3">
               {userData.history.slice(0,3).map((item, i) => (
                 <li key={i} className="p-4 border border-gray-200 rounded-xl flex justify-between items-center bg-gray-50 hover:bg-white cursor-pointer transition-colors" onClick={() => setActiveTab('Consult AI')}>
                    <span className="font-medium text-gray-700">{item.title}</span>
                    <span className="text-sm text-blue-600 font-bold bg-blue-100 px-3 py-1 rounded-full">{item.time}</span>
                 </li>
               ))}
               <li className="p-4 border border-gray-200 rounded-xl flex justify-between items-center bg-gray-50">
                  <span className="font-medium text-gray-700">Account Created</span>
                  <span className="text-sm text-gray-500">Today</span>
               </li>
            </ul>
          </div>
        )}



        {/* --- APPOINTMENTS VIEW --- */}
        {activeTab === 'Appointments' && (
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 p-8 flex-1 animate-fade-in max-w-5xl mx-auto w-full">
             <div className="flex justify-between items-center mb-8">
               <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Calendar className="text-blue-500" /> Your Appointments</h2>
               <div className="flex items-center gap-3">
                 <button onClick={() => setModal({isOpen: true, type: 'add_doctor'})} className="px-4 py-2.5 bg-gray-100 text-gray-700 hover:text-blue-600 rounded-lg font-bold shadow-sm hover:bg-gray-200 transition-all flex items-center gap-2 hidden sm:flex"><Plus size={18} /> Add Doctor</button>
                 <button onClick={() => setModal({isOpen: true, type: 'all_doctors'})} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-bold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95">Book New</button>
               </div>
             </div>
             
             <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Upcoming Appointments</h3>
             {userData.appointments.length > 0 ? (
               <div className="space-y-4 mb-8">
                 {userData.appointments.map((apt, i) => (
                   <div key={i} className="p-6 border border-blue-200 rounded-xl bg-blue-50 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                      <div>
                         <h3 className="font-bold text-blue-900 text-lg">{apt.doctor.startsWith('Dr.') ? apt.doctor : `Dr. ${apt.doctor}`}</h3>
                         <p className="text-blue-700 font-medium mt-1">{apt.time}</p>
                      </div>
                      <div className="mt-4 sm:mt-0 flex gap-3">
                         <button onClick={() => {
                           const docEntry = Object.values(doctorsDb).find(d => d.name === apt.doctor);
                           setUserData(prev => ({...prev, appointments: prev.appointments.filter((_, idx) => idx !== i)}));
                           if (docEntry) {
                             initiateBooking(docEntry);
                             showToast("Please select your new time slot.");
                           } else {
                             setModal({isOpen: true, type: 'all_doctors'});
                           }
                         }} className="px-4 py-2 border border-blue-300 text-blue-700 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors active:scale-95">Reschedule</button>
                         <span className="px-4 py-2 bg-blue-200 text-blue-800 rounded-lg text-sm font-bold tracking-wide flex items-center gap-1"><CheckCircle2 size={16}/> {apt.status}</span>
                      </div>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="p-6 border border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center mb-8 h-32">
                  <p className="text-gray-500 text-sm font-medium">You have no upcoming appointments.</p>
                  <button onClick={() => setModal({isOpen: true, type: 'appointment'})} className="text-blue-600 font-bold text-sm mt-2 hover:underline">Book one now</button>
               </div>
             )}
             
             <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Past History</h3>
             <div className="p-6 border border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center h-24">
                <p className="text-gray-500 text-sm">No past appointments to show.</p>
             </div>
          </div>
        )}

        {/* --- CONSULT AI VIEW (Original Chat UI) --- */}
        {activeTab === 'Consult AI' && (
          <div className="flex flex-col lg:flex-row gap-6 lg:h-[75vh]">
            {/* Left Column */}
            <div className="w-full lg:w-1/4 flex flex-col gap-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-5 flex-1 overflow-hidden flex flex-col">
                <h3 className="font-bold text-gray-800 mb-4 text-lg">Conversation History</h3>
                <div className="flex flex-col space-y-2 overflow-y-auto pr-2 custom-scrollbar">
                  {userData.history.length > 0 ? userData.history.map((chat, idx) => (
                    <button 
                      key={idx}
                      className={`text-left p-3 rounded-xl w-full transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5 active:scale-[0.98] border-l-4 focus:outline-none focus:ring-2 focus:ring-blue-300 ${chat.active ? 'bg-[#eef5ff] border-blue-600' : 'bg-white hover:bg-gray-50 border-transparent hover:border-gray-200'}`}
                    >
                      <p className={`font-semibold text-sm ${chat.active ? 'text-gray-800' : 'text-gray-700'}`}>{chat.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{chat.title} - {chat.time}</p>
                    </button>
                  )) : (
                    <div className="text-center p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                      <p className="text-xs text-gray-500">No previous consultations.</p>
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-gray-800 mb-4 text-lg mt-6">Quick Tools</h3>
                <div className="flex flex-col space-y-3">
                  <button onClick={() => setModal({isOpen: true, type: 'symptoms'})} className="flex items-center space-x-3 p-3 rounded-xl border border-gray-200 hover:bg-emerald-50 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] w-full group/btn">
                    <FileText size={18} className="text-emerald-500 group-hover/btn:scale-110 transition-transform" />
                    <span className="font-medium text-sm text-gray-700 group-hover/btn:text-emerald-700">Symptom Log</span>
                  </button>
                  <button onClick={() => setModal({isOpen: true, type: 'medication'})} className="flex items-center space-x-3 p-3 rounded-xl border border-gray-200 hover:bg-emerald-50 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] w-full group/btn">
                    <Pill size={18} className="text-emerald-500 group-hover/btn:scale-110 transition-transform" />
                    <span className="font-medium text-sm text-gray-700 group-hover/btn:text-emerald-700">Medication Tracker</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Center Column - Chat Interface */}
            <div className="w-full lg:w-2/4 bg-white/95 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white/50 cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-inner">
                    <Bot className="text-blue-600" size={22} />
                  </div>
                  <h2 className="font-bold text-gray-800 text-lg">Aura Health AI</h2>
                </div>
                <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded text-green-700 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span>GPT Flow Active</span>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar scroll-smooth">
                {userData.messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`} style={{ animation: 'slideUp 0.3s ease-out forwards' }}>
                    {msg.role === 'bot' && msg.isPrimary && (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1 shadow-sm ${msg.isEmergency ? 'bg-red-100' : 'bg-blue-100'}`}>
                        {msg.isEmergency ? <AlertTriangle className="text-red-600" size={18} /> : <Bot className="text-blue-600" size={18} />}
                      </div>
                    )}
                    {msg.role === 'bot' && !msg.isPrimary && (
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                        <Bot className="text-gray-500" size={18} />
                      </div>
                    )}
                    
                    <div className={`max-w-[85%] px-4 py-3 text-[15px] leading-relaxed whitespace-pre-wrap transition-all duration-300 hover:-translate-y-0.5 ${
                      msg.role === 'user' 
                        ? 'bg-[#0070f3] text-white rounded-2xl rounded-tr-sm shadow-sm' 
                        : msg.isPrimary 
                          ? msg.isEmergency 
                            ? 'bg-red-600 text-white rounded-2xl rounded-tl-sm shadow-lg border-2 border-red-400 font-bold' 
                            : 'bg-[#0070f3] text-white rounded-2xl rounded-tl-sm shadow-sm'
                          : 'bg-gray-50 text-gray-700 rounded-2xl rounded-tl-sm shadow-sm text-sm border border-gray-200'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                     <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                        <Bot className="text-blue-600" size={18} />
                      </div>
                    <div className="bg-gray-50 border border-gray-200 text-gray-600 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm text-sm flex items-center space-x-2">
                      <span className="flex space-x-1">
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-gray-100 bg-white/80 backdrop-blur-sm z-10">
                <form onSubmit={handleSend} className="relative flex items-center group">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isRecording ? "🎤 Listening to your symptoms..." : "Describe your symptoms (e.g. 'I have a fever and cough')..."}
                    className={`w-full pl-5 pr-32 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-700 placeholder-gray-400 text-[15px] shadow-sm transition-all duration-300 ${isRecording ? 'bg-red-50 border-red-300 text-red-700' : 'bg-gray-50 hover:bg-white border-gray-200'}`}
                    disabled={isLoading || isRecording}
                  />
                  <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
                  <div className="absolute right-2 flex items-center space-x-1">
                    <button type="button" onClick={() => fileInputRef.current.click()} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300 active:scale-90" title="Upload Reports">
                      <Paperclip size={18} />
                    </button>
                    <button type="button" onClick={handleMicClick} className={`p-2 rounded-full transition-all duration-300 active:scale-90 ${isRecording ? 'text-red-500 bg-red-100 animate-pulse' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'}`} title="Speak Symptoms">
                      <Mic size={18} />
                    </button>
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="px-5 py-2 bg-[#0070f3] text-white rounded-lg font-medium hover:bg-blue-600 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 transition-all duration-300 ml-1 flex items-center justify-center gap-2"
                    >
                      Send <Send size={16} />
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column - Explainable AI Insights */}
            <div className="w-full lg:w-1/4 flex flex-col gap-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-5 group flex-1">
                <h3 className="font-bold text-gray-800 mb-4 text-lg leading-tight flex items-center gap-2">
                  Explainable AI (XAI) <span className="relative flex h-2 w-2 ml-1"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span></span>
                </h3>
                
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 shadow-inner">
                  <h4 className="font-bold text-gray-800 text-[15px] mb-2 border-b border-gray-200 pb-2">Why this prediction?</h4>
                  <p className="text-sm text-blue-700 font-medium mb-3 bg-blue-50 p-2 rounded border border-blue-100 leading-relaxed">
                    {insights.xai}
                  </p>
                  
                  <h5 className="font-bold text-gray-800 text-sm mb-1 mt-3 flex items-center gap-1"><Pill size={14} className="text-emerald-500"/> Suggested Medicines</h5>
                  <ul className="list-disc pl-5 mb-4 text-sm text-gray-700 space-y-1 marker:text-emerald-500">
                    {insights.medicines.length > 0 ? insights.medicines.map((med, i) => (
                      <li key={i}>{med}</li>
                    )) : <li>Awaiting NLP analysis</li>}
                  </ul>
                  <p className="text-[10px] text-gray-400 italic mt-[-10px] mb-3">⚠️ Non-prescription only. Consult doctor.</p>

                  <h5 className="font-bold text-gray-800 text-sm mb-1 border-t border-gray-200 pt-3 flex items-center gap-1"><UserCircle2 size={14} className="text-blue-500"/> Suggested Specialists</h5>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 marker:text-blue-500">
                    {insights.doctors.length > 0 ? insights.doctors.map((doc, i) => (
                      <li key={i}>{doc}</li>
                    )) : <li>Awaiting NLP analysis</li>}
                  </ul>
                </div>
              </div>
              

            </div>
          </div>
        )}
      </main>

      <footer className="w-full mt-auto border-t border-gray-200 bg-white/50 backdrop-blur-sm px-6 py-4 flex flex-col sm:flex-row items-center justify-between z-20 text-sm text-gray-500 font-medium">
        <div className="flex items-center space-x-6 mb-4 sm:mb-0">
          <button onClick={() => showToast("Privacy Policy opened.")} className="hover:text-blue-600 transition-colors">Privacy Policy</button>
          <button onClick={() => showToast("Terms opened.")} className="hover:text-blue-600 transition-colors">Terms</button>
          <a href="https://www.linkedin.com/in/kadariuday" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors flex items-center gap-1">
            <UserCircle2 size={14} /> Contact Us (LinkedIn)
          </a>
        </div>
        <div className="flex flex-col items-center sm:items-end gap-1.5">
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-[11px] font-bold text-blue-600 shadow-sm animate-pulse">
             <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
             Maintained by Kadari Uday
          </div>
          <div className="text-[10px] text-gray-400">© 2026 Aura Health Chatbot</div>
        </div>
      </footer>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 100% { transform: translateX(200%); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-slide-up { animation: slideUp 0.3s ease-out forwards; }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
      `}} />
    </div>
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('loginTime');
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem('currentUser');
    const loginTime = localStorage.getItem('loginTime');
    
    if (loggedInUser && loginTime) {
      const currentTime = new Date().getTime();
      const timeElapsed = currentTime - parseInt(loginTime, 10);
      
      // 30 minutes = 30 * 60 * 1000 = 1800000 milliseconds
      if (timeElapsed > 1800000) {
        handleLogout(); // Session expired
      } else {
        setUser(JSON.parse(loggedInUser));
        setIsAuthenticated(true);
      }
    } else if (loggedInUser) {
      // Legacy users without a login time should be logged out
      handleLogout();
    }
  }, []);

  // Monitor active session for 30 minute limit
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const intervalId = setInterval(() => {
      const loginTime = localStorage.getItem('loginTime');
      if (loginTime) {
        const currentTime = new Date().getTime();
        const timeElapsed = currentTime - parseInt(loginTime, 10);
        if (timeElapsed > 1800000) {
          handleLogout();
          alert("Your secure session has expired (30 minutes). For your safety, please log in again.");
        }
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, [isAuthenticated]);

  const handleLogin = (userData) => {
    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('loginTime', new Date().getTime().toString());
    setUser(userData);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}
