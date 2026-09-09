import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ASHER",
    short_name: "ASHER",
    description: "Consultora de Crecimiento de Marca",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F4ED",
    theme_color: "#F7F4ED",
    icons: [
      {
        src: "/veyra.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/veyra.png",
        sizes: "any",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
