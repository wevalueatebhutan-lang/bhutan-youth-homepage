import { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

// 🔒 관리자 권한을 부여할 구글 이메일 화이트리스트
const ADMIN_EMAILS = [
  'wevalueatebhutan@gmail.com',
  'admin@bhutantaekwondo.org'
];

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 1. 임시 관리자 계정 자동 생성 및 보장 (Auto Provisioning)
  useEffect(() => {
    const initAdminAccount = async () => {
      const defaultAdmin = 'admin@bhutantaekwondo.org';
      const defaultPassword = 'btfadmin123!';
      try {
        // 계정 생성을 시도합니다. (이미 존재할 경우 Firebase가 중복 에러를 내며 catch로 넘어감)
        await createUserWithEmailAndPassword(auth, defaultAdmin, defaultPassword);
        console.log(`[Firebase Auth] 임시 관리자 계정 생성 성공 (${defaultAdmin})`);
      } catch (err: any) {
        // '이미 존재하는 계정' 에러일 경우 정상이므로 안전하게 무시합니다.
        if (err.code === 'auth/email-already-in-use') {
          console.log('[Firebase Auth] 임시 관리자 계정 확인 완료');
        } else {
          console.error('[Firebase Auth] 계정 확인 오류:', err.message);
        }
      }
    };
    initAdminAccount();
  }, []);

  // 2. 구글 소셜 로그인
  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user.email && ADMIN_EMAILS.includes(user.email)) {
        navigate('/admin');
      } else {
        await signOut(auth);
        setError(`Access Denied: '${user.email}' is not registered as an Administrator.`);
      }
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      setError('Google Sign-In failed or was closed.');
    } finally {
      setLoading(false);
    }
  };

  // 3. 일반 이메일/비밀번호 로그인
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both Email and Password.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // 로그인 성공 시 대시보드로 이동
      navigate('/admin');
    } catch (err: any) {
      console.error('Email Login Error:', err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid Email or Password. Please try again.');
      } else {
        setError('Login failed: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-card">
        <div className="login-logo" style={{ marginBottom: '16px' }}>
          <img src="/logo.png" alt="BTF Logo" style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
        </div>
        <h1>Admin Dashboard</h1>
        <p className="login-subtitle">Bhutan Taekwondo Federation</p>
        
        {/* 일반 이메일 로그인 폼 */}
        <form onSubmit={handleEmailLogin} className="email-login-form" style={{ marginTop: '20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>Email Address</label>
            <input 
              type="email" 
              placeholder="admin@bhutantaekwondo.org" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.9rem', outline: 'none' }}
              required
            />
          </div>
          
          <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.9rem', outline: 'none' }}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary login-btn" 
            disabled={loading}
            style={{ width: '100%', padding: '12px', fontWeight: 700, fontSize: '0.92rem', marginTop: '8px' }}
          >
            {loading ? 'Logging In...' : 'Sign In'}
          </button>
        </form>

        <div className="login-divider" style={{ display: 'flex', alignItems: 'center', margin: '24px 0 16px', color: '#94a3b8', fontSize: '0.78rem', width: '100%' }}>
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--border)' }} />
          <span style={{ padding: '0 8px' }}>OR</span>
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--border)' }} />
        </div>

        <div style={{ width: '100%' }}>
          <button 
            type="button" 
            className="btn btn-outline login-btn" 
            onClick={handleGoogleLogin} 
            disabled={loading}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '12px',
              width: '100%',
              padding: '12px',
              fontSize: '0.9rem',
              fontWeight: 700,
              color: '#475569'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z" fill="#4285F4"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z" fill="#34A853"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957275C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z" fill="#FBBC05"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335"/>
            </svg>
            Google OAuth Sign In
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
