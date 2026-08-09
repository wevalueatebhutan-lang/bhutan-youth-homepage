import { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, getDocs, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
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
        tag: noticeTag === 'update' ? 'Construction' : noticeTag === 'event' ? 'Events' : 'Report',
        date: today,
        createdAt: serverTimestamp(),
      });
      setNoticeTitle('');
      setNoticeContent('');
      await fetchNotices();
      alert('Notice published successfully.');
    } catch (err) {
      console.error(err);
      alert('Failed to publish notice. Please try again.');
    } finally {
      setLoadingNotice(false);
    }
  };

  // 0원 무료 업로드를 위한 이미지 자동 리사이징 및 Base64 변환 헬퍼
  const compressImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1000; // 가로 최대 1000px로 웹 최적화 고화질 처리
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) return resolve(event.target?.result as string);
          ctx.drawImage(img, 0, 0, width, height);

          // JPEG 0.82 품질로 0원 고화질 압축
          const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
          resolve(dataUrl);
        };
        img.onerror = (err) => reject(err);
        img.src = event.target?.result as string;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  // Upload Gallery Item (100% Spark Free Engine)
  const handleUploadGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryTitle || !galleryFile) return;

    setLoadingGallery(true);
    try {
      // 1. Storage 및 카드 결제 필요 없음! 100% 무료 Base64 데이터로 자동 압축
      const base64ImageUrl = await compressImageToBase64(galleryFile);

      // 2. 100% 무료 Firestore DB에 0원으로 이미지 데이터 직접 등록
      await addDoc(collection(db, 'gallery'), {
        title: galleryTitle,
        imageUrl: base64ImageUrl,
        uploadedAt: serverTimestamp(),
      });

      setGalleryTitle('');
      setGalleryFile(null);
      const fileInput = document.getElementById('gallery-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      await fetchGallery();
      alert('Photo uploaded to gallery successfully.');
    } catch (err) {
      console.error('Image processing error:', err);
      alert('Failed to upload image. Please try again.');
    } finally {
      setLoadingGallery(false);
    }
  };

  // Delete Notice
  const handleDeleteNotice = async (id: string) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;
    try {
      await deleteDoc(doc(db, 'notices', id));
      await fetchNotices();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Gallery Item
  const handleDeleteGallery = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;
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
        <div className="admin-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo.png" alt="BTF Logo" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
          <span>BTF Portal Admin</span>
        </div>
        <nav className="admin-nav">
          <button
            className={`admin-nav-btn ${activeTab === 'notices' ? 'active' : ''}`}
            onClick={() => setActiveTab('notices')}
          >
            Notices Management
          </button>
          <button
            className={`admin-nav-btn ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            Gallery Management
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
            Sign Out
          </button>
        </div>

        <div className="admin-content">
          {/* TAB 1: NOTICES */}
          {activeTab === 'notices' && (
            <>
              {/* Publish Form */}
              <div className="admin-card">
                <h3>Publish New Notice</h3>
                <form onSubmit={handlePublishNotice} className="admin-form">
                  <div className="form-row">
                    <div className="admin-form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        placeholder="Enter notice title..."
                        value={noticeTitle}
                        onChange={(e) => setNoticeTitle(e.target.value)}
                        disabled={loadingNotice}
                        required
                      />
                    </div>
                    <div className="admin-form-group" style={{ maxWidth: '280px' }}>
                      <label>Category Tag</label>
                      <select
                        value={noticeTag}
                        onChange={(e) => setNoticeTag(e.target.value)}
                        disabled={loadingNotice}
                      >
                        <option value="update">Construction</option>
                        <option value="event">Events & News</option>
                        <option value="report">ODA Report</option>
                      </select>
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>Content</label>
                    <textarea
                      placeholder="Enter detailed notice content..."
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
                      {loadingNotice ? 'Publishing...' : 'Publish Notice'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Notice List */}
              <div className="admin-card">
                <h3>Published Notices</h3>
                {notices.length === 0 ? (
                  <div className="empty-state">No published notices found. Post a new announcement above.</div>
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
                <h3>Upload New Gallery Photo</h3>
                <form onSubmit={handleUploadGallery} className="admin-form">
                  <div className="form-row">
                    <div className="admin-form-group">
                      <label>Photo Caption</label>
                      <input
                        type="text"
                        placeholder="Enter caption for the photo..."
                        value={galleryTitle}
                        onChange={(e) => setGalleryTitle(e.target.value)}
                        disabled={loadingGallery}
                        required
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Image File</label>
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
                      {loadingGallery ? 'Uploading Image...' : 'Upload Photo'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Gallery Grid */}
              <div className="admin-card">
                <h3>Uploaded Gallery Photos</h3>
                {galleryItems.length === 0 ? (
                  <div className="empty-state">No gallery photos uploaded yet. Upload your first photo above.</div>
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
