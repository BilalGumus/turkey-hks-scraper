import { useContext } from "react";
import { SocketContext } from "../context/SocketProvider";
import ExportAsCSVButton from "./Buttons/ExportAsCSVButton";
import ExportAsJSONButton from "./Buttons/ExportAsJSONButton";

function Export() {
  const { exportable } = useContext(SocketContext);

  if (!exportable) return null;

  return (
    <div className="flex flex-wrap justify-end gap-4 mb-8">
      <ExportAsCSVButton />
      <ExportAsJSONButton />
    </div>
  );
}

export default Export;
