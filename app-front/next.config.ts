import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    /* config options here */
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },

    reactCompiler: true,
    allowedDevOrigins: ["127.0.0.1"], // for dev mode only

}

export default nextConfig
