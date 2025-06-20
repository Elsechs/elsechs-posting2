
import { useState } from "react";

export function Select({ children, onValueChange }) {
  return <div>{children}</div>;
}

export function SelectTrigger({ children }) {
  return <div className="p-2 border rounded-xl bg-white cursor-pointer">{children}</div>;
}

export function SelectValue({ placeholder }) {
  return <span>{placeholder}</span>;
}

export function SelectContent({ children }) {
  return <div className="mt-2">{children}</div>;
}

export function SelectItem({ children, value }) {
  return (
    <div className="p-2 cursor-pointer hover:bg-gray-100" data-value={value}>
      {children}
    </div>
  );
}
