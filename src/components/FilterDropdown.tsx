import React, { useEffect, useRef } from 'react';

interface FilterDropdownProps {
  open: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement>;
  children: React.ReactNode;
  width?: number;
}

export default function FilterDropdown({ open, onClose, anchorRef, children, width }: FilterDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute z-30 mt-2 left-0 bg-white rounded-xl shadow-2xl border border-gray-200 p-4"
      style={{ minWidth: 320, width: width || undefined }}
    >
      {children}
    </div>
  );
} 