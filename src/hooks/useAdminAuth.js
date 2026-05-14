'use client';

import { useEffect, useState } from 'react';

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si le cookie admin existe
    const checkAuth = () => {
      // Vérification simple via document.cookie
      const hasAdminSession = document.cookie.includes('admin_session=authenticated');
      setIsAdmin(hasAdminSession);
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  return { isAdmin, loading };
}