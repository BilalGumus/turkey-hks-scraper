import { useContext } from "react";
import { SocketContext } from "../../context/SocketProvider";

function AbortButton() {
  const { socket, isAborting, setIsAborting } = useContext(SocketContext);

  return (
    <button
      onClick={async () => {
        if (isAborting) return;
        setIsAborting(true);
        await socket.current.send(
          JSON.stringify({
            type: "ABORT",
          })
        );
      }}
      className="cursor-pointer flex gap-2 items-center py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg"
    >
      {isAborting ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="animate-spin w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      ) : (
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
      <span className="font-inter text-sm">
        {isAborting ? "Aborting..." : "Abort Scraping"}
      </span>
    </button>
  );
}

export default AbortButton;
