import type { NextConfig } from "next";
import {
  IMAGE_REMOTE_HOSTNAMES,
  IMAGE_REMOTE_HTTP_HOSTNAMES,
} from "./src/data/image-remote-hosts";

const imageRemotePatterns = [
  ...IMAGE_REMOTE_HOSTNAMES.map((hostname) => ({
    protocol: "https" as const,
    hostname,
  })),
  ...IMAGE_REMOTE_HTTP_HOSTNAMES.map((hostname) => ({
    protocol: "http" as const,
    hostname,
  })),
];

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: imageRemotePatterns,
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
