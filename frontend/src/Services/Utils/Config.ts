interface Config {
    baseurl: string;
}

const config: Config = {
    baseurl: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
};
export default config;
