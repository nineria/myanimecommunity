import dynamic from "next/dynamic";
import Loading from "./Loading";

export default dynamic(() => import("@mantine/rte"), {
  // Disable during server side rendering
  ssr: false,

  // Render anything as fallback on server, e.g. loader or html content without editor
  loading: () => <Loading />,
});
