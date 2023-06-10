import moment from "moment";
import { useContext } from "react";
import { SocketContext } from "../../context/SocketProvider";

function ScrapButton() {
  const { socket, socketReady, setScraping, setLogs, startDate, endDate } =
    useContext(SocketContext);
  const dateValidation =
    moment(startDate, "DD.MM.YYYY").isValid() &&
    moment(endDate, "DD.MM.YYYY").isValid();

  return (
    <button
      onClick={() => {
        setScraping(true);
        setLogs([]);
        return socket.current.send(
          JSON.stringify({
            type: "SCRAPE",
            data: {
              startDate: startDate,
              endDate: endDate,
            },
          })
        );
      }}
      disabled={!dateValidation || !socketReady}
      className={`cursor-pointer flex gap-2 items-center py-2 px-4 rounded-lg ${
        dateValidation && socketReady
          ? "bg-yellow-400 hover:bg-yellow-500"
          : "bg-gray-500 cursor-not-allowed"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
        />
      </svg>
      <span className="font-inter text-sm">Start Scraping</span>
    </button>
  );
}

export default ScrapButton;
