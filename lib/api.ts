import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

/* ── College Types ── */
export interface College {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  overview: string;
  placements: string;
  imageUrl: string | null;
  courses?: Course[];
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  name: string;
  duration: string;
  fees: number;
  collegeId: string;
  createdAt: string;
}

export interface Review {
  id: string;
  comment: string;
  rating: number;
  userName: string;
  collegeId: string;
  createdAt: string;
}

export interface SavedCollege {
  id: string;
  userId: string;
  collegeId: string;
  college: College;
  createdAt: string;
}

/* ── Colleges ── */
export interface FetchCollegesParams {
  search?: string;
  location?: string;
  minFees?: string;
  maxFees?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface CollegesResponse {
  success: boolean;
  page: number;
  limit: number;
  totalColleges: number;
  totalPages: number;
  data: College[];
}

export async function fetchColleges(params: FetchCollegesParams = {}) {
  const { data } = await api.get<CollegesResponse>("/colleges", { params });
  return data;
}

export async function fetchCollegeById(id: string) {
  const { data } = await api.get<{ success: boolean; data: College }>(`/colleges/${id}`);
  return data;
}

/* ── Auth ── */
export async function registerUser(body: { name: string; email: string; password: string }) {
  const { data } = await api.post("/auth/register", body);
  return data;
}

export async function loginUser(body: { email: string; password: string }) {
  const { data } = await api.post<{ success: boolean; message: string; token: string }>(
    "/auth/login",
    body
  );
  return data;
}

/* ── Reviews ── */
export async function addReview(collegeId: string, body: { comment: string; rating: number }) {
  const { data } = await api.post(`/colleges/${collegeId}/review`, body);
  return data;
}

/* ── Save / Unsave ── */
export async function saveCollege(collegeId: string) {
  const { data } = await api.post(`/colleges/${collegeId}/save`);
  return data;
}

export async function unsaveCollege(collegeId: string) {
  const { data } = await api.delete(`/colleges/${collegeId}/save`);
  return data;
}

/* ── Saved Colleges ── */
export async function fetchSavedColleges() {
  const { data } = await api.get<{ success: boolean; data: SavedCollege[] }>("/saved");
  return data;
}

export default api;
