"use client";
import React, { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface YearRangePickerProps {
  startYear?: number;
  endYear?: number;
  onRangeChange?: (
    startYear: number | undefined,
    endYear: number | undefined
  ) => void;
  placeholder?: string;
  className?: string;
  minYear?: number;
  maxYear?: number;
}

const YearRangePicker: React.FC<YearRangePickerProps> = ({
  startYear: initialStartYear,
  endYear: initialEndYear,
  onRangeChange,
  placeholder = "Pilih periode tahun...",
  className = "",
  minYear = 1900,
  maxYear = 2100,
}) => {
  const [startYear, setStartYear] = useState<number | undefined>(
    initialStartYear
  );
  const [endYear, setEndYear] = useState<number | undefined>(initialEndYear);
  const [isOpen, setIsOpen] = useState(false);
  const [selectingStart, setSelectingStart] = useState(true);
  const [currentDecade, setCurrentDecade] = useState(
    Math.floor((startYear || new Date().getFullYear()) / 10) * 10
  );

  const handleYearClick = (year: number) => {
    if (selectingStart) {
      setStartYear(year);
      setSelectingStart(false);
      if (endYear && endYear < year) {
        setEndYear(undefined);
      }
      onRangeChange?.(year, endYear && endYear >= year ? endYear : undefined);
    } else {
      if (!startYear || year >= startYear) {
        setEndYear(year);
        onRangeChange?.(startYear, year);
        setIsOpen(false);
        setSelectingStart(true);
      }
    }
  };

  const handlePrevDecade = () => {
    setCurrentDecade((prev) =>
      Math.max(prev - 10, Math.floor(minYear / 10) * 10)
    );
  };

  const handleNextDecade = () => {
    setCurrentDecade((prev) =>
      Math.min(prev + 10, Math.floor(maxYear / 10) * 10)
    );
  };

  const handleClear = () => {
    setStartYear(undefined);
    setEndYear(undefined);
    setSelectingStart(true);
    onRangeChange?.(undefined, undefined);
  };

  const years = Array.from({ length: 12 }, (_, i) => currentDecade + i);

  const hasSelection = startYear !== undefined || endYear !== undefined;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className={`flex items-center justify-between w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${className}`}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {hasSelection ? (
              <div className="flex items-center gap-2 text-gray-900 truncate">
                <span className="font-medium">{startYear || "?"}</span>
                <span className="text-gray-400">-</span>
                <span className="font-medium">{endYear || "?"}</span>
              </div>
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </div>
          <div className="flex items-center gap-1 ml-2">
            {hasSelection && (
              <X
                className="w-4 h-4 text-gray-400 hover:text-gray-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
              />
            )}
            <Calendar className="w-4 h-4 text-gray-500" />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 sm:w-80 p-0 bg-white border border-gray-200 rounded-lg shadow-lg">
        <div className="p-4">
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Tahun Awal:</span>
              <span
                className={`font-semibold ${
                  selectingStart ? "text-blue-600" : "text-gray-900"
                }`}
              >
                {startYear || "Select"}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Tahun Akhir:</span>
              <span
                className={`font-semibold ${
                  !selectingStart ? "text-blue-600" : "text-gray-900"
                }`}
              >
                {endYear || "Select"}
              </span>
            </div>
          </div>

          <div className="mb-3 text-xs text-center text-gray-500">
            {selectingStart ? "Pilih Tahun Awal" : "Pilih Tahun Akhir"}
          </div>

          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handlePrevDecade}
              disabled={currentDecade <= Math.floor(minYear / 10) * 10}
              className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-sm font-semibold text-gray-900">
              {currentDecade} - {currentDecade + 11}
            </span>
            <button
              onClick={handleNextDecade}
              disabled={currentDecade >= Math.floor(maxYear / 10) * 10}
              className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Year Grid */}
          <div className="grid grid-cols-3 gap-2">
            {years.map((year) => {
              const isDisabled =
                year < minYear ||
                year > maxYear ||
                (!selectingStart && startYear && year < startYear);

              const isStartYear = year === startYear;
              const isEndYear = year === endYear;
              const isInRange =
                startYear && endYear && year > startYear && year < endYear;

              return (
                <button
                  key={year}
                  onClick={() => !isDisabled && handleYearClick(year)}
                  disabled={!!isDisabled}
                  className={`
                    px-3 py-2 text-sm rounded-md transition-all relative
                    ${
                      isStartYear || isEndYear
                        ? "bg-blue-600 text-white font-semibold hover:bg-blue-700"
                        : isInRange
                        ? "bg-blue-100 text-blue-900 hover:bg-blue-200"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                    ${
                      isDisabled
                        ? "opacity-40 cursor-not-allowed hover:bg-transparent"
                        : "cursor-pointer"
                    }
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                  `}
                >
                  {year}
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200">
            <button
              onClick={handleClear}
              className="flex-1 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                setSelectingStart(true);
              }}
              className="flex-1 px-3 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Ok
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default YearRangePicker;
