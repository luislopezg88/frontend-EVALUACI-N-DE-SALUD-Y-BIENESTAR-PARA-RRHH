//export const API_URL = "http://localhost:3100/api";
export const API_URL =  process.env.NODE_ENV === 'development' ? "http://localhost:3100/api" : "https://backend-evaluaci-n-de-salud-y-bienestar-para-rrhh-kmzv893iy.vercel.app/api";
