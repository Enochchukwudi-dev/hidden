import React, { useEffect, useRef, useState } from 'react';
import whatsapp from '../assets/whatsapp.svg';

export default function WhatsAppFloat() {
  const ref = useRef(null);
  const draggingRef = useRef(false);
  const originRef = useRef({ x: 0, y: 0 });
  const pointerIdRef = useRef(null);

  const [pos, setPos] = useState({ x: 20, y: 80 });
  const [isDragging, setIsDragging] = useState(false);

  // Clamp helper
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  useEffect(() => {
    // load saved position
    try {
      const saved = localStorage.getItem('wa-float-pos');
      if (saved) setPos(JSON.parse(saved));
    } catch (e) {}
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const maxX = window.innerWidth - rect.width - 8;
      const maxY = window.innerHeight - rect.height - 8;
      setPos((p) => ({ x: clamp(p.x, 8, Math.max(8, maxX)), y: clamp(p.y, 8, Math.max(8, maxY)) }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onPointerDown = (e) => {
    e.preventDefault();
    const el = ref.current;
    if (!el) return;
    draggingRef.current = true;
    setIsDragging(true);
    pointerIdRef.current = e.pointerId;
    try { el.setPointerCapture(e.pointerId); } catch (err) {}
    originRef.current = { x: e.clientX, y: e.clientY, startX: pos.x, startY: pos.y };
  };

  const onPointerMove = (e) => {
    if (!draggingRef.current || pointerIdRef.current !== e.pointerId) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - originRef.current.x;
    const dy = e.clientY - originRef.current.y;
    const maxX = window.innerWidth - rect.width - 8;
    const maxY = window.innerHeight - rect.height - 8;
    const nx = clamp(originRef.current.startX + dx, 8, Math.max(8, maxX));
    const ny = clamp(originRef.current.startY + dy, 8, Math.max(8, maxY));
    setPos({ x: nx, y: ny });
  };

  // mouse fallback handlers for md/lg where pointer events may be inconsistent
  const onMouseDown = (e) => {
    e.preventDefault();
    const el = ref.current;
    if (!el) return;
    draggingRef.current = true;
    setIsDragging(true);
    originRef.current = { x: e.clientX, y: e.clientY, startX: pos.x, startY: pos.y };
    // add listeners on document to ensure we capture moves outside the element
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e) => {
    if (!draggingRef.current) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - originRef.current.x;
    const dy = e.clientY - originRef.current.y;
    const maxX = window.innerWidth - rect.width - 8;
    const maxY = window.innerHeight - rect.height - 8;
    const nx = clamp(originRef.current.startX + dx, 8, Math.max(8, maxX));
    const ny = clamp(originRef.current.startY + dy, 8, Math.max(8, maxY));
    setPos({ x: nx, y: ny });
  };

  const onMouseUp = (e) => {
    if (draggingRef.current) {
      draggingRef.current = false;
      setIsDragging(false);
      try { localStorage.setItem('wa-float-pos', JSON.stringify(pos)); } catch (err) {}
    }
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  const onPointerUp = (e) => {
    const el = ref.current;
    if (!el) return;
    try { el.releasePointerCapture(e.pointerId); } catch (err) {}
    draggingRef.current = false;
    setIsDragging(false);
    pointerIdRef.current = null;
    // persist
    try { localStorage.setItem('wa-float-pos', JSON.stringify(pos)); } catch (err) {}
  };

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{ left: pos.x, top: pos.y, touchAction: 'none', pointerEvents: 'auto' }}
      className={`block fixed z-50 w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      aria-grabbed={isDragging}
    >
      <a
        href="https://wa.me/2349031161058?text=Reaching%20out%20from%20folllowgod%20website%20"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full rounded-full flex items-center justify-center"
        style={{ backgroundColor: '#25D366' }}
        onClick={(e) => {
          // prevent accidental click immediately after drag
          if (draggingRef.current) e.preventDefault();
        }}
        aria-label="Open WhatsApp"
      >
        <img src={whatsapp} alt="WhatsApp" className="w-9 h-9" />
      </a>
    </div>
  );
}
