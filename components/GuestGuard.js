import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const guestGuard = (WrappedComponent) => {
  return (props) => {
    
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {

      let _isAuthenticated = localStorage.getItem('token') !== null
      setIsAuthenticated(_isAuthenticated) // 假設登入狀態儲存在 localStorage

      if (_isAuthenticated) {
        // 如果登入，跳轉至首頁
        router.replace(`/`);
      }
    }, []);

    // 若使用者未登入，顯示包裝的組件
    return !isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};

export default guestGuard;
