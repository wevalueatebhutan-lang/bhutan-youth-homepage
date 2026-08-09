import { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, getDocs, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import './Admin.css';

interface Notice {
  id: string;
  title: string;
  date: string;
  tag: string;
  content: string;
}

interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
}

type TabType = 'notices' | 'gallery';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('notices');

  // Notice Form State
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeTag, setNoticeTag] = useState('update');
  const [loadingNotice, setLoadingNotice] = useState(false);

  // Gallery Form State
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  const [loadingGallery, setLoadingGallery] = useState(false);

  // Data State
  const [notices, setNotices] = useState<Notice[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  // Fetch lists for dashboard
  const fetchNotices = async () => {
    try {
      const q = query(collection(db, 'notices'), orderBy('date', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetched: Notice[] = [];
      querySnapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() } as Notice);
      });
      setNotices(fetched);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchGallery = async () => {
    try {
      const q = query(collection(db, 'gallery'), orderBy('uploadedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetched: GalleryItem[] = [];
      querySnapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() } as GalleryItem);
      });
      setGalleryItems(fetched);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotices();
    fetchGallery();
  }, []);

  // Publish Notice
  const handlePublishNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle || !noticeContent) return;

    setLoadingNotice(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      await addDoc(collection(db, 'notices'), {
        title: noticeTitle,
        content: noticeContent,
        tag: noticeTag === 'update' ? '공사' : noticeTag === 'event' ? '행사' : '보고서',
        date: today,
        createdAt: serverTimestamp(),
      });
      setNoticeTitle('');
      setNoticeContent('');
      await fetchNotices();
      alert('공지사항이 성공적으로 등록되었습니다.');
    } catch (err) {
      console.error(err);
      alert('공지사항 등록에 실패했습니다.');
    } finally {
      setLoadingNotice(false);
    }
  };

  // Upload Gallery Item
  const handleUploadGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryTitle || !galleryFile) return;

    setLoadingGallery(true);
    try {
      // 1. Upload file to Storage
      const fileRef = ref(storage, `gallery/${Date.now()}_${galleryFile.name}`);
      await uploadBytes(fileRef, galleryFile);
      const downloadUrl = await getDownloadURL(fileRef);

      // 2. Save metadata to Firestore
      await addDoc(collection(db, 'gallery'), {
        title: galleryTitle,
        imageUrl: downloadUrl,
        uploadedAt: serverTimestamp(),
      });

      setGalleryTitle('');
      setGalleryFile(null);
      // Reset input element
      const fileInput = document.getElementById('gallery-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      await fetchGallery();
      alert('갤러리 이미지가 성공적으로 등록되었습니다.');
    } catch (err) {
      console.error(err);
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setLoadingGallery(false);
    }
  };

  // Delete Notice
  const handleDeleteNotice = async (id: string) => {
    if (!confirm('정말 이 공지사항을 삭제하시겠습니까?')) return;
    try {
      await deleteDoc(doc(db, 'notices', id));
      await fetchNotices();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Gallery Item
  const handleDeleteGallery = async (id: string) => {
    if (!confirm('정말 이 이미지를 삭제하시겠습니까?')) return;
    try {
      await deleteDoc(doc(db, 'gallery', id));
      await fetchGallery();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    // Basic reload for redirect via ProtectedRoute
    window.location.href = '/admin/login';
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-brand">🥋 BTF Admin</div>
        <nav className="admin-nav">
          <button
            className={`admin-nav-btn ${activeTab === 'notices' ? 'active' : ''}`}
            onClick={() => setActiveTab('notices')}
          >
            📢 Notices
          </button>
          <button
            className={`admin-nav-btn ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            📸 Gallery
          </button>
        </nav>
        <button className="admin-logout-btn" onClick={handleLogout}>Sign Out</button>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <div className="admin-topbar">
          <h2>{activeTab === 'notices' ? 'Notices Management' : 'Gallery Management'}</h2>
        </div>

        <div className="admin-content">
          {activeTab === 'notices' ? (
            <>
              {/* Notice Form */}
              <div className="admin-card">
                <h3>Publish New Notice (공지사항 등록)</h3>
                <form onSubmit={handlePublishNotice} className="admin-form">
                  <div className="form-group">
                    <label>Title (제목)</label>
                    <input
                      type="text"
                      value={noticeTitle}
                      onChange={(e) => setNoticeTitle(e.target.value)}
                      placeholder="공지 제목을 입력하세요..."
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Content (내용)</label>
                    <textarea
                      rows={4}
                      value={noticeContent}
                      onChange={(e) => setNoticeContent(e.target.value)}
                      placeholder="내용을 입력하세요..."
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Category Tag (태그 분류)</label>
                    <select value={noticeTag} onChange={(e) => setNoticeTag(e.target.value)}>
                      <option value="update">공사 현황</option>
                      <option value="event">행사/연수</option>
                      <option value="report">연차 보고서</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={loadingNotice}>
                    {loadingNotice ? 'Publishing...' : 'Publish'}
                  </button>
                </form>
              </div>

              {/* Notice List */}
              <div className="admin-card">
                <h3>Published Notices (등록된 공지사항 목록)</h3>
                <div style={{ marginTop: '16px' }}>
                  {notices.map((n) => (
                    <div
                      key={n.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBlock: '12px',
                        borderBottom: '1px solid var(--color-border)',
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: '0.95rem' }}>{n.title}</strong>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginLeft: '12px' }}>
                          {n.date} | {n.tag}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteNotice(n.id)}
                        style={{
                          background: 'rgba(231,76,60,0.1)',
                          border: 'none',
                          color: '#e74c3c',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Gallery Form */}
              <div className="admin-card">
                <h3>Upload New Gallery Photo (사진첩 등록)</h3>
                <form onSubmit={handleUploadGallery} className="admin-form">
                  <div className="form-group">
                    <label>Title / Caption (사진 설명)</label>
                    <input
                      type="text"
                      value={galleryTitle}
                      onChange={(e) => setGalleryTitle(e.target.value)}
                      placeholder="사진의 설명을 적어주세요..."
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Image File (이미지 파일)</label>
                    <input
                      id="gallery-file"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setGalleryFile(e.target.files[0]);
                        }
                      }}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={loadingGallery}>
                    {loadingGallery ? 'Uploading image...' : 'Upload'}
                  </button>
                </form>
              </div>

              {/* Gallery List */}
              <div className="admin-card">
                <h3>Uploaded Gallery Photos (등록된 사진 목록)</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px', marginTop: '16px' }}>
                  {galleryItems.map((item) => (
                    <div key={item.id} style={{ border: '1px solid var(--color-border)', borderRadius: '4px', overflow: 'hidden', background: 'var(--color-bg)' }}>
                      <img src={item.imageUrl} alt={item.title} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
                      <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.title}
                        </span>
                        <button
                          onClick={() => handleDeleteGallery(item.id)}
                          style={{
                            background: 'rgba(231,76,60,0.1)',
                            border: 'none',
                            color: '#e74c3c',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
