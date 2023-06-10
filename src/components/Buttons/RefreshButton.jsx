import { useContext } from "react";
import { SocketContext } from "../../context/SocketProvider";

function RefreshButton() {
  const { createNewSocket, isReconnecting, setIsReconnecting } =
    useContext(SocketContext);

  return (
    <button
      onClick={() => {
        if (isReconnecting) return;

        setIsReconnecting(true);
        createNewSocket();
      }}
      className="group cursor-pointer flex gap-2 items-center py-2 px-4 rounded-lg bg-indigo-500 hover:bg-indigo-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`w-5 h-5 ${
          isReconnecting
            ? "animate-spin"
            : "transition-transform duration-700 group-hover:rotate-[360deg]"
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>

      <span className="font-inter text-sm">
        {isReconnecting ? "Reconnecting..." : "Try To Reconnect"}
      </span>
    </button>
  );
}

export default RefreshButton;
