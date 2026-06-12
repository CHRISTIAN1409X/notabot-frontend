const ipRoutes = {
    "PROD": window.env?.VITE_CLOUD || import.meta.env.VITE_CLOUD,
    "LOCAL": window.env?.VITE_LOCAL ||  import.meta.env.VITE_LOCAL
};

const baseUrl = ipRoutes[window.env?.VITE_ENVIRONMENT || import.meta.env.VITE_ENVIRONMENT];

export {baseUrl};
