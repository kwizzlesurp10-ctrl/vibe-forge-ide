"use client";

import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';
import { useChat } from '@ai-sdk/react';
import { MessageSquare, X, Terminal, Minimize2, Maximize2 } from 'lucide-react';

export default function ForgeMindCopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const nodeRef = useRef(null); // For Draggable strict mode compliance
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, status, error, sendMessage } = useChat();
  const [input, setInput] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ role: 'user', parts: [{ type: 'text', text: input }] });
    setInput('');
  };
  
  const isLoading = status === 'submitted' || status === 'streaming';

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="relative group w-16 h-16 rounded-full bg-black border-2 border-cyan-500 shadow-[0_0_15px_rgba(0,240,255,0.5)] flex items-center justify-center overflow-hidden cursor-pointer"
        >
          {/* FusionPanda Closed-State Avatar */}
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Panda Ears */}
            <div className="absolute top-2 left-2 w-4 h-4 bg-fuchsia-500 rounded-full"></div>
            <div className="absolute top-2 right-2 w-4 h-4 bg-fuchsia-500 rounded-full"></div>
            {/* Panda Face */}
            <div className="w-10 h-8 bg-white rounded-[40%] flex items-center justify-center gap-1.5 mt-2 relative z-10 shadow-[0_0_10px_rgba(255,255,255,0.5)]">
               <motion.div 
                 animate={{ scaleY: [1, 0.1, 1] }} 
                 transition={{ repeat: Infinity, duration: 3, repeatDelay: 1.5 }}
                 className="w-3 h-3 bg-black rounded-full flex items-center justify-center"
               >
                 <div className="w-1 h-1 bg-cyan-400 rounded-full mb-1 ml-1"></div>
               </motion.div>
               <motion.div 
                 animate={{ scaleY: [1, 0.1, 1] }} 
                 transition={{ repeat: Infinity, duration: 3, repeatDelay: 1.5 }}
                 className="w-3 h-3 bg-black rounded-full flex items-center justify-center"
               >
                 <div className="w-1 h-1 bg-cyan-400 rounded-full mb-1 mr-1"></div>
               </motion.div>
               <div className="absolute bottom-1 w-1.5 h-1 bg-fuchsia-500 rounded-full"></div>
            </div>
          </div>
        </motion.button>
      </div>
    );
  }

  return (
    <Draggable nodeRef={nodeRef} handle=".drag-handle" defaultPosition={{x: -24, y: -24}} bounds="parent">
      <div 
        ref={nodeRef} 
        className={`fixed z-50 flex flex-col bg-[#0d0d12]/95 backdrop-blur-md border border-cyan-500/30 rounded-2xl shadow-[0_0_30px_rgba(0,240,255,0.15)] overflow-hidden transition-all duration-300 ${
          isMinimized ? 'w-72 h-16' : 'w-80 h-[500px]'
        }`}
        style={{ right: '0', bottom: '0' }}
      >
        {/* Header (Draggable Area) */}
        <div className="drag-handle h-14 bg-black/60 border-b border-cyan-500/30 px-3 flex items-center justify-between cursor-move shrink-0">
          <div className="flex items-center gap-2">
            {/* Mini Animated Panda */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-fuchsia-500 rounded-full"></div>
              <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-fuchsia-500 rounded-full"></div>
              <div className="w-6 h-5 bg-white rounded-[40%] flex items-center justify-center gap-1 mt-1 z-10">
                 <motion.div 
                   animate={isLoading ? { scaleY: [1, 0.5, 1], y: [0, -1, 0] } : { scaleY: [1, 0.1, 1] }} 
                   transition={{ repeat: Infinity, duration: isLoading ? 0.5 : 3, repeatDelay: isLoading ? 0 : 2 }}
                   className="w-1.5 h-1.5 bg-black rounded-full"
                 ></motion.div>
                 <motion.div 
                   animate={isLoading ? { scaleY: [1, 0.5, 1], y: [0, -1, 0] } : { scaleY: [1, 0.1, 1] }} 
                   transition={{ repeat: Infinity, duration: isLoading ? 0.5 : 3, repeatDelay: isLoading ? 0 : 2 }}
                   className="w-1.5 h-1.5 bg-black rounded-full"
                 ></motion.div>
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-wider flex items-center gap-2">
                FORGEMIND
                {isLoading && <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>}
              </div>
              <div className="text-[9px] text-cyan-400 font-mono uppercase tracking-widest">CoPilot Active</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIsMinimized(!isMinimized)} className="text-zinc-400 hover:text-cyan-400 transition">
              {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
            </button>
            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-fuchsia-500 transition">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Chat Area */}
        {!isMinimized && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm">
              {messages.length === 0 && (
                <div className="text-center text-zinc-500 text-xs mt-10">
                  <Terminal className="w-8 h-8 mx-auto mb-2 text-cyan-500/50" />
                  <p>Vercel AI Gateway Connected.</p>
                  <p>How can I help you forge today?</p>
                </div>
              )}
              {messages.map((m: any) => (
                <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div 
                    className={`max-w-[85%] rounded-2xl px-3 py-2 ${
                      m.role === 'user' 
                        ? 'bg-cyan-500/20 text-cyan-50 border border-cyan-500/30' 
                        : 'bg-zinc-800/80 text-zinc-200 border border-zinc-700/50'
                    }`}
                  >
                    {m.parts?.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('')}
                  </div>
                  
                  {/* Tool Call Rendering */}
                  {m.toolInvocations?.map((toolInvocation: any) => {
                    const toolCallId = toolInvocation.toolCallId;
                    return (
                      <div key={toolCallId} className="mt-1 text-xs w-[85%] rounded bg-black/60 border border-fuchsia-500/30 p-2 font-mono text-zinc-400">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse"></div>
                          <span className="text-fuchsia-400">Executing: {toolInvocation.toolName}</span>
                        </div>
                        {/* If tool is resolved, show status, else show running */}
                        {'result' in toolInvocation ? (
                           <div className="text-lime-400 pl-3">✓ Completed</div>
                        ) : (
                           <div className="pl-3 animate-pulse">Running...</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="h-16 bg-black/80 border-t border-cyan-500/30 p-2 shrink-0">
              <form onSubmit={handleSubmit} className="relative h-full">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask ForgeMind..."
                  disabled={isLoading}
                  className="w-full h-full bg-zinc-900 border border-zinc-700 rounded-xl pl-3 pr-10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-cyan-500 hover:text-cyan-300 disabled:text-zinc-600 transition-colors p-1"
                >
                  <MessageSquare size={16} />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </Draggable>
  );
}
