import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ENDPOINTS } from "../endpoints";

// Define types for data
interface DashboardData {
  trafficStats: any;
  transactions: any;
  users: any;
  infoCards: any;
}

// Context type
interface DashboardContextType {
  data: DashboardData | null;
  loading: boolean;
}

// Create Context
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Provider Component
export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch API Data
    const fetchData = async () => {
      try {
        const response = await axios.post(ENDPOINTS.DASHBOARD); // Single API Call
        console.log("Dashboard data:", response.data);
        const result = response.data;
        setData(result);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardContext.Provider value={{ data, loading }}>
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook to use context
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};