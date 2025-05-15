import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ENDPOINTS } from "../endpoints";

// Define types for data
interface UserDetails {
    _id: string;
    email: string;
    wallet_address: string;
    private_key: string;
    created_at: string;
    email_verified: boolean;
    user_name: string;
    sponsor_name: string | null;
    direct_team: number;
    registration_method: string;
    payout_wallet: number;
    premium_upgrade_wallet: number;
    premium_reentry_wallet: number;
    premium_reserves_wallet: number;
    rainmaker_upgrade_wallet: number;
    rainmaker_reentry_wallet: number;
    rainmaker_reserves_wallet: number;
    premium_level: string;
    rainmaker_level: string;
    highest_premium_level: string | null;
    highest_rainmaker_level: string | null;
    is_active: boolean;
    is_paid: boolean;
    last_activity: string;
    password?: string; // Changed to optional
    isAdmin: boolean;
    referrer_address?: string;
    sponsor_id?: string;
}


// Context type
interface ManageUserContextType {
  users: UserDetails[];
  loading: boolean;
  fetchUsers: () => void;
}

// Create Context
const ManageUserContext = createContext<ManageUserContextType | undefined>(undefined);

// Provider Component
export const ManageUserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserDetails[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.post(ENDPOINTS.ALL_USERS);
      console.log("user data:", response.data);
      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <ManageUserContext.Provider value={{ users, loading, fetchUsers }}>
      {children}
    </ManageUserContext.Provider>
  );
};

// Custom hook to use context
export const useManageUsers = () => {
  const context = useContext(ManageUserContext);
  if (!context) {
    throw new Error("useManageUsers must be used within a ManageUserProvider");
  }
  return context;
};