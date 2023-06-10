import { useContext, useState } from "react";
import { open } from "@tauri-apps/api/shell";
import { downloadDir } from "@tauri-apps/api/path";
import {
  exists,
  readTextFile,
  writeTextFile,
  BaseDirectory,
} from "@tauri-apps/api/fs";
import { SocketContext } from "../../context/SocketProvider";

function ExportAsJSONButton() {
  const [loading, setLoading] = useState(false);
  const { tempFileName } = useContext(SocketContext);

  const exportAsJSON = async () => {
    setLoading(true);
    const downloadDirPath = await downloadDir();

    const JSONFileName = tempFileName + ".json";

    const isExist = await exists(JSONFileName, {
      dir: BaseDirectory.AppLocalData,
    });

    if (!isExist) {
      setLoading(false);
      return alert("Opps, Something went wrong! There is no data to export.");
    }

    const data = await readTextFile(JSONFileName, {
      dir: BaseDirectory.AppLocalData,
    });

    await writeTextFile(JSONFileName, data, {
      dir: BaseDirectory.Download,
    });

    await open(downloadDirPath);

    return setLoading(false);
  };

  return (
    <button
      onClick={!loading ? exportAsJSON : null}
      className={`cursor-pointer flex gap-2 items-center py-2 px-4 rounded-lg bg-slate-500 ${
        !loading ? "hover:bg-slate-600" : "cursor-not-allowed"
      }`}
    >
      {loading ? (
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-4 h-4 mr-2 text-gray-200 animate-spin fill-slate-700"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
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
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      )}
      <span className="font-inter text-sm">
        {loading ? "Exporting..." : "Export as JSON"}
      </span>
    </button>
  );
}

export default ExportAsJSONButton;
