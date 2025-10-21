"use client";

import type { InputHTMLAttributes } from "react";

interface CoreInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function CoreInput({
  label,
  error,
  helperText,
  className = "",
  ...props
}: CoreInputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-[#616161] text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          className={`
						bg-white
						border-2 
						border-[#c9cbcc] 
						border-solid 
						rounded-[10px] 
						px-5 
						py-3.5
						w-full
						text-[#616161] 
						text-lg
						font-normal
						placeholder:text-[#c9cbcc]
						focus:outline-none
						focus:border-[#616161]
						transition-colors
						disabled:bg-gray-50
						disabled:cursor-not-allowed
						${error ? "border-red-500 focus:border-red-500" : ""}
						${className}
					`.trim()}
          {...props}
        />
      </div>
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      {helperText && !error && (
        <span className="text-[#616161] text-sm mt-1">{helperText}</span>
      )}
    </div>
  );
}
