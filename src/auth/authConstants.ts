//export const API_URL = "http://localhost:3100/api";
export const API_URL =  process.env.NODE_ENV === 'development' ? "http://localhost:3100/api" : "https://backend-evaluaci-n-de-salud-y-bienestar-para-rrhh-p9dd883et.vercel.app/api";
