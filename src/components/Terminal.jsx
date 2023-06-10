import moment from "moment";
import { useContext, useEffect, useRef } from "react";
import { SocketContext } from "../context/SocketProvider";

function Terminal() {
  const { logs } = useContext(SocketContext);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (logs.length > 0) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, [logs]);

  return (
    <div
      className="coding inverse-toggle px-5 pt-4 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased 
              bg-[#0c0c0c]  pb-6 pt-4 rounded-lg leading-normal"
    >
      <div className="top mb-2 flex">
        <div className="h-3 w-3 bg-red-500 rounded-full"></div>
        <div className="ml-2 h-3 w-3 bg-orange-300 rounded-full"></div>
        <div className="ml-2 h-3 w-3 bg-green-500 rounded-full"></div>
      </div>
      <div className="h-[210px] overflow-y-auto mt-[10px] flex flex-col">
        {logs.map((log, index) => (
          <div key={index} className="flex">
            <span className="text-gray-600">
              {moment(log.date).format("H:mm:ss")}&nbsp;
            </span>
            <span className={log.color}>{log.command}</span>
            <p className="flex-1 typing items-center pl-2">
              {log.description}
              <br />
            </p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

export default Terminal;
