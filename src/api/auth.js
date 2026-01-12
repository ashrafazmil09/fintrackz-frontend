import api from "./api";

// ---------------- Auth ----------------
export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const register = async (username, email, password) => {
  const res = await api.post("/auth/register", { username, email, password });
  return res.data;
};

// ---------------- Profile ----------------
export const getProfile = async () => {
  const res = await api.get("/me");
  return res.data;
};

// ---------------- Accounts ----------------
export const getAccounts = async (type) => {
  const params = type ? { type } : undefined;
  const res = await api.get("/accounts", { params });
  return res.data;
};

export const getAccountById = async (id) => {
  const res = await api.get(`/accounts/${id}`);
  return res.data;
};

export const createAccount = async (data) => {
  const res = await api.post("/accounts", data);
  return res.data;
};

export const updateAccount = async (id, data) => {
  const res = await api.put(`/accounts/${id}`, data);
  return res.data;
};

export const deleteAccount = async (id) => {
  await api.delete(`/accounts/${id}`);
};

// ---------------- Transactions ----------------
export const getTransactions = async (type) => {
  const res = await api.get("/transactions", {
    params: { type },
  });
  return res.data;
};

export const createTransaction = async (data) => {
  const res = await api.post("/transactions", data);
  return res.data;
};

export const updateTransaction = async (id, data) => {
  const res = await api.put(`/transactions/${id}`, data);
  return res.data;
};

export const deleteTransaction = async (id) => {
  await api.delete(`/transactions/${id}`);
};

// ---------------- Ledgers ----------------
export const getLedgers = async (accountId) => {
  const res = await api.get("/ledgers", {
    params: { accountId },
  });
  return res.data;
};


