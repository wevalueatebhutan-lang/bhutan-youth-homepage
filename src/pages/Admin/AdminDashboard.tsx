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
        <div className="admin-brand">🥋 BTF Portal Admin</div>
        <nav className="admin-nav">
          <button
            className={`admin-nav-btn ${activeTab === 'notices' ? 'active' : ''}`}
            onClick={() => setActiveTab('notices')}
          >
            📢 Notices Management
          </button>
          <button
            className={`admin-nav-btn ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            📸 Gallery Management
          </button>
        </nav>
      </div>

      {/* Main Area */}
      <div className="admin-main">
        <div className="admin-topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>{activeTab === 'notices' ? 'Notices Management' : 'Gallery Management'}</h2>
          <button 
            onClick={handleLogout} 
            className="btn-delete-sm" 
            style={{ 
              padding: '8px 16px', 
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.02em'
            }}
          >
            🚪 Sign Out
          </button>
        </div>

        <div className="admin-content">
          {/* TAB 1: NOTICES */}
          {activeTab === 'notices' && (
            <>
              {/* Publish Form */}
              <div className="admin-card">
                <h3>Publish New Notice (공지사항 등록)</h3>
                <form onSubmit={handlePublishNotice} className="admin-form">
                  <div className="form-row">
                    <div className="admin-form-group">
                      <label>TITLE (제목)</label>
                      <input
                        type="text"
                        placeholder="공지 제목을 입력하세요..."
                        value={noticeTitle}
                        onChange={(e) => setNoticeTitle(e.target.value)}
                        disabled={loadingNotice}
                        required
                      />
                    </div>
                    <div className="admin-form-group" style={{ maxWidth: '280px' }}>
                      <label>CATEGORY TAG (태그 분류)</label>
                      <select
                        value={noticeTag}
                        onChange={(e) => setNoticeTag(e.target.value)}
                        disabled={loadingNotice}
                      >
                        <option value="update">공사 현황 (Construction)</option>
                        <option value="event">행사/뉴스 (Events & News)</option>
                        <option value="report">ODA 보고서 (ODA Report)</option>
                      </select>
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>CONTENT (내용)</label>
                    <textarea
                      placeholder="공지할 상세 내용을 입력하세요..."
                      value={noticeContent}
                      onChange={(e) => setNoticeContent(e.target.value)}
                      disabled={loadingNotice}
                      required
                    />
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loadingNotice}
                      style={{ padding: '12px 32px', fontWeight: 700 }}
                    >
                      {loadingNotice ? 'Publishing...' : '📢 Publish Notice'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Notice List */}
              <div className="admin-card">
                <h3>Published Notices (등록된 공지사항 목록)</h3>
                {notices.length === 0 ? (
                  <div className="empty-state">등록된 공지사항이 없습니다. 새로운 소식을 발행해 보세요.</div>
                ) : (
                  <div className="admin-table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th style={{ width: '120px' }}>Date</th>
                          <th style={{ width: '120px' }}>Category</th>
                          <th>Title</th>
                          <th style={{ width: '100px', textAlign: 'center' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {notices.map((n) => (
                          <tr key={n.id}>
                            <td style={{ color: '#64748b', fontWeight: 600 }}>{n.date}</td>
                            <td>
                              <span className={`tag-badge ${n.tag === '공사' ? 'update' : n.tag === '행사' ? 'event' : 'report'}`}>
                                {n.tag}
                              </span>
                            </td>
                            <td style={{ fontWeight: 700 }}>{n.title}</td>
                            <td style={{ textAlign: 'center' }}>
                              <button
                                onClick={() => handleDeleteNotice(n.id)}
                                className="btn-delete-sm"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {/* TAB 2: GALLERY */}
          {activeTab === 'gallery' && (
            <>
              {/* Upload Form */}
              <div className="admin-card">
                <h3>Upload New Gallery Photo (사진첩 등록)</h3>
                <form onSubmit={handleUploadGallery} className="admin-form">
                  <div className="form-row">
                    <div className="admin-form-group">
                      <label>TITLE / CAPTION (사진 설명)</label>
                      <input
                        type="text"
                        placeholder="사진에 대한 한 줄 설명을 적어주세요..."
                        value={galleryTitle}
                        onChange={(e) => setGalleryTitle(e.target.value)}
                        disabled={loadingGallery}
                        required
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>IMAGE FILE (이미지 파일)</label>
                      <input
                        id="gallery-file"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setGalleryFile(e.target.files ? e.target.files[0] : null)}
                        disabled={loadingGallery}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loadingGallery}
                      style={{ padding: '12px 32px', fontWeight: 700 }}
                    >
                      {loadingGallery ? 'Uploading Image...' : '📸 Upload Photo'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Gallery Grid */}
              <div className="admin-card">
                <h3>Uploaded Gallery Photos (등록된 사진 목록)</h3>
                {galleryItems.length === 0 ? (
                  <div className="empty-state">등록된 갤러리 이미지가 없습니다. 훈련 모습을 업로드해 보세요.</div>
                ) : (
                  <div className="admin-gallery-grid">
                    {galleryItems.map((item) => (
                      <div key={item.id} className="admin-gallery-card">
                        <div className="admin-gallery-img-wrapper">
                          <img src={item.imageUrl} alt={item.title} />
                        </div>
                        <div className="admin-gallery-info">
                          <p title={item.title}>{item.title}</p>
                          <button
                            onClick={() => handleDeleteGallery(item.id)}
                            className="btn-delete-sm"
                            style={{ width: '100%' }}
                          >
                            Delete Photo
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
