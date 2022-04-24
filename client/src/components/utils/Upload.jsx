import { useEffect } from "react";

import { useStorage } from "./useStorage";
import Loader from "./Loader";

function Upload({ file, type, src: { src, setSrc } }) {
  const { url, error, progress } = useStorage(file, type);

  useEffect(() => {
    setSrc(url);
  }, [url]);

  return <Loader loading={progress} />;
}

export default Upload;
