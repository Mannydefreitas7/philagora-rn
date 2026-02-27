import { useState, useEffect } from "react";
import { type Session, type User } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";

const useDatabase = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://example.com/api/data");
        const json = await response.json();
        setData(json);
      } catch (error) {
        // setError(error);
      }
    };

    fetchData();
  }, []);

  return { data, error };
};

export default useDatabase;
