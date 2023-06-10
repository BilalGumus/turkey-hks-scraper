import React, { useContext } from "react";
import { SocketContext } from "../context/SocketProvider";
import AbortButton from "./Buttons/AbortButton";
import RefreshButton from "./Buttons/RefreshButton";
import ScrapButton from "./Buttons/ScrapButton";

function Scrap() {
  const { scraping, socketReconnect } = useContext(SocketContext);

  if (socketReconnect) return <RefreshButton />;

  if (scraping) return <AbortButton />;

  return (
    <>
      <ScrapButton />
    </>
  );
}

export default Scrap;
