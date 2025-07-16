import { api } from "./axios";
import { getSession } from "next-auth/react";

// Kirim hasil screening DASS ke backend Laravel
export async function submitScreeningDass(data: any) {
  try {
    const session = await getSession();
    const token = session?.access_token;

    console.log('Sending data:', data); // Debug log
    
    const response = await api.post("/screening-dass", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Submit error:', error.response?.data || error.message);
    console.error('Full error:', error); // Tambahin ini buat debug
    
    // Sementara comment dulu alert-nya
    // if (error.response?.status === 500) {
    //   alert('Server sedang bermasalah. Coba lagi nanti.');
    // }
    
    throw error;
  }
}

// Ambil riwayat screening milik user login
export async function fetchUserScreeningHistory() {
  const session = await getSession();
  const token = session?.access_token;

  const response = await api.get("/screening-dass/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
}

// Ambil seluruh riwayat (untuk admin/nakes)
export async function fetchAllScreeningHistory() {
  const session = await getSession();
  const token = session?.access_token;

  const response = await api.get("/screening-dass/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
}