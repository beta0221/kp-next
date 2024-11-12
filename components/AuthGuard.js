import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const authGuard = (WrappedComponent) => {
  return (props) => {
    
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {

      let _isAuthenticated = localStorage.getItem('token') !== null
      setIsAuthenticated(_isAuthenticated) // 假設登入狀態儲存在 localStorage

      if (!_isAuthenticated) {
        // 如果未登入，跳轉至登入頁並附加目標頁的路徑
        router.replace(`/login?redirect=${router.asPath}`);
      }
    }, []);

    // 若使用者已登入，顯示包裝的組件
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};

export default authGuard;
