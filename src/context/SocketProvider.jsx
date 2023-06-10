import moment from "moment";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import {
  exists,
  readTextFile,
  writeTextFile,
  BaseDirectory,
} from "@tauri-apps/api/fs";

export const SocketContext = createContext();

function SocketProvider({ children }) {
  const [tempFileName, setTempFileName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [logs, setLogs] = useState([]);
  const [scraping, setScraping] = useState(false);
  const [exportable, setExportable] = useState(false);
  const [socketReady, setSocketReady] = useState(false);
  const [socketReconnect, setSocketReconnect] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [isAborting, setIsAborting] = useState(false);
  const socketRef = useRef(null);

  const createNewSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
    }

    const socket = new WebSocket("ws://localhost:3001/ws");
    socketRef.current = socket;

    setLogs([
      {
        color: "text-yellow-400",
        command: "$connecting:",
        description: "trying to connect web socket server...",
        date: moment(),
      },
    ]);

    socket.onopen = () => {
      setSocketReconnect(false);
      setIsReconnecting(false);
      setSocketReady(true);
      setLogs((prev) => [
        ...prev,
        {
          color: "text-green-400",
          command: "$connected:",
          description: "websocket connection has established!",
          date: moment(),
        },
        {
          color: "text-blue-400",
          command: "$waiting:",
          description:
            "please select a date range and click `Start Scraping` button.",
          date: moment(),
        },
      ]);
    };
    socket.onmessage = async (message) => {
      const response = JSON.parse(message.data);

      if (response.type === "LOG") {
        setLogs((prev) => [...prev, response.data]);
      }
      if (response.type === "SCRAPE_STATUS") {
        setScraping(response.data.scraping);
        setExportable(!response.data.scraping);
      }
      if (response.type === "DATA") {
        let previousData = {};

        setTempFileName(response.dateRange);

        const fileName = response.dateRange + ".json";

        const isExist = await exists(fileName, {
          dir: BaseDirectory.AppLocalData,
        });

        if (isExist) {
          const contents = await readTextFile(fileName, {
            dir: BaseDirectory.AppLocalData,
          });
          if (contents) {
            previousData = JSON.parse(contents);
          }
        }

        const data = {
          ...previousData,
          [response.date]: response.data,
        };

        await writeTextFile(fileName, JSON.stringify(data), {
          dir: BaseDirectory.AppLocalData,
        });
      }
      if (response.type === "ABORT") {
        setIsAborting(false);
        setScraping(false);
        setExportable(false);

        setLogs([
          {
            color: "text-red-400",
            command: "$aborted:",
            description: "current scraping process successfully aborted!",
            date: moment(),
          },
          {
            color: "text-blue-400",
            command: "$waiting:",
            description:
              "please select a date range and click `Start Scraping` button.",
            date: moment(),
          },
        ]);
      }
    };
    socket.onclose = () => {
      setSocketReconnect(true);
      setIsReconnecting(false);
      setSocketReady(false);
      setLogs((prev) => [
        ...prev,
        {
          color: "text-red-400",
          command: "$closed:",
          description: "web socket server connection closed!",
          date: moment(),
        },
      ]);
    };
    socket.onerror = () => {
      setSocketReconnect(true);
      setIsReconnecting(false);
      setSocketReady(false);
      setLogs((prev) => [
        ...prev,
        {
          color: "text-red-400",
          command: "$error:",
          description:
            "oops! something went wrong while connecting to web socket server.",
          date: moment(),
        },
      ]);
    };
  }, []);

  useEffect(() => {
    createNewSocket();
  }, [createNewSocket]);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef,
        tempFileName,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        logs,
        scraping,
        exportable,
        socketReady,
        setLogs,
        setScraping,
        socketReconnect,
        setSocketReconnect,
        isReconnecting,
        setIsReconnecting,
        isAborting,
        setIsAborting,
        createNewSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
