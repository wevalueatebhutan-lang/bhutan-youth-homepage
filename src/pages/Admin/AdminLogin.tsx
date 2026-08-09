import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

// 🔒 관리자 권한을 부여할 구글 이메일 화이트리스트
// (부탄 현지 담당자 이메일이 추가되면 이 배열에 쉼표로 추가하기만 하면 됩니다.)
const ADMIN_EMAILS = [
  'wevalueatebhutan@gmail.com',
  'admin@bhutantaekwondo.org'
];

export default function AdminLogin() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // 로그인된 구글 계정이 관리자 이메일 목록에 포함되어 있는지 확인
      if (user.email && ADMIN_EMAILS.includes(user.email)) {
        // 권한 승인 -> 대시보드 이동
        navigate('/admin');
      } else {
        // 권한 없음 -> 즉시 로그아웃 처리 및 차단
        await signOut(auth);
        setError(`Access Denied: '${user.email}' is not registered as an Administrator.`);
      }
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      if (err.code === 'auth/configuration-not-found') {
        setError('구글 로그인 기능이 Firebase 콘솔에서 아직 활성화되지 않았습니다. 시작가이드를 참고해 주세요.');
      } else {
        setError('Google Sign-In failed or was closed.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-card">
        <div className="login-logo">🥋</div>
        <h1>Admin Dashboard</h1>
        <p className="login-subtitle">Bhutan Youth Development Project</p>
        
        <div style={{ marginTop: '24px', width: '100%' }}>
          <button 
            type="button" 
            className="btn btn-primary login-btn" 
            onClick={handleGoogleLogin} 
            disabled={loading}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '12px',
              backgroundColor: '#4285F4',
              borderColor: '#4285F4'
            }}
          >
            {loading ? (
              'Authenticating...'
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z" fill="#FFF"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z" fill="#FFF"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957275C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z" fill="#FFF"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#FFF"/>
                </svg>
                Sign In with Google
              </>
            )}
          </button>
        </div>

        {error && (
          <div 
            className="login-error" 
            style={{ 
              marginTop: '16px', 
              fontSize: '0.85rem', 
              textAlign: 'center',
              lineHeight: '1.4' 
            }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
