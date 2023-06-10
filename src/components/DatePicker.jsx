import { useContext, useEffect, useRef } from "react";
import DateRangePicker from "flowbite-datepicker/DateRangePicker";
import { SocketContext } from "../context/SocketProvider";

function DatePicker() {
  const { setStartDate, setEndDate, scraping } = useContext(SocketContext);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  useEffect(() => {
    const dateRangePickerEl = document.getElementById("dateRangePickerId");
    new DateRangePicker(dateRangePickerEl, {
      format: "dd.mm.yyyy",
      minDate: "01/11/2016",
      maxDate: new Date(),
      orientation: "bottom left",
    });
  }, []);

  const handleSetDate = () => {
    setStartDate(startDateRef.current.value);
    setEndDate(endDateRef.current.value);
  };

  return (
    <div
      // date-rangepicker="true"
      id="dateRangePickerId"
      className="flex flex-wrap gap-4 items-center justify-center md:justify-between "
    >
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          disabled={scraping}
          ref={startDateRef}
          onBlur={handleSetDate}
          name="start"
          type="text"
          className={`${scraping ? "cursor-not-allowed" : ""} border text-sm rounded-lg block w-[294px] pl-10 p-2.5 bg-neutral-900 border-gray-600 placeholder-gray-400 text-white focus:ring-yellow-500 focus:border-yellow-500`}
          placeholder="Select Start Date"
        />
      </div>
      {/* <span className="mx-4 text-gray-500">to</span> */}
      <div className="w-full md:w-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 mx-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
          />
        </svg>
      </div>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          disabled={scraping}
          ref={endDateRef}
          onBlur={handleSetDate}
          name="end"
          type="text"
          className={`${scraping ? "cursor-not-allowed" : ""} border text-sm rounded-lg block w-[294px] pl-10 p-2.5 bg-neutral-900 border-gray-600 placeholder-gray-400 text-white focus:ring-yellow-500 focus:border-yellow-500`}
          placeholder="Select End Date"
        />
      </div>
    </div>
  );
}

export default DatePicker;
