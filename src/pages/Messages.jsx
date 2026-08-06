import { useState, useRef, useEffect } from 'react';
import AdminNav from '../components/AdminNav.jsx';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';
import './Messages.css';

// Color roles driven by the shared admin theme (AdminAuthContext), so
// Messages matches Profile / AdminMainPage instead of always looking
// like the light theme regardless of the toggle.
const LIGHT_THEME = {
  surface: '#F9F8F6',
  bgSidebar: '#EFE9E3',
  border: '#D9CFC7',
  text: '#2C2825',
  textMuted: '#6E655D',
};
const DARK_THEME = {
  surface: '#38312B',
  bgSidebar: '#2D2721',
  border: '#473E36',
  text: '#F9F8F6',
  textMuted: '#D9CFC7',
};

export default function Messages() {
  const { darkMode, themeClass } = useAdminAuth();
  const T = darkMode ? DARK_THEME : LIGHT_THEME;
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('messages');
  const [activeTab, setActiveTab] = useState('media');
  const [isMuted, setIsMuted] = useState(true);
  const [showGroupInfo, setShowGroupInfo] = useState(true);
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [newChatName, setNewChatName] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [highlightedMsgId, setHighlightedMsgId] = useState(null);

  // Group editing state (Name and Avatar)
  const [isEditingGroup, setIsEditingGroup] = useState(false);
  const [editGroupName, setEditGroupName] = useState('');
  const [editGroupAvatar, setEditGroupAvatar] = useState('');
  const fileInputRef = useRef(null);

  // Active message menu popup state for pinning/options
  const [activeMessageMenuId, setActiveMessageMenuId] = useState(null);
  const messageMenuRef = useRef(null);

  // Dropdown menu state for header options (the three dots)
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const optionsMenuRef = useRef(null);

  // Modal states for image preview
  const [previewImage, setPreviewImage] = useState(null);

  const chatContainerRef = useRef(null);
  const messageRefs = useRef({});

  const [conversations, setConversations] = useState([
    { id: 1, name: 'Design Studio X', isGroup: true, preview: 'Alex is typing...', status: 'Alex is typing...', membersCount: 12, inviteLink: 'workwise/designstudio', time: '4m', unread: 2, pinned: true, avatar: null },
    { id: 2, name: 'PM Team Lead', isGroup: true, preview: 'I see, okay noted! Let’s review...', status: 'Online · 5 members', membersCount: 5, inviteLink: 'workwise/pmteam', time: '10m', unread: 0, pinned: true, avatar: null },
    { id: 3, name: 'Lead Architect', isGroup: false, preview: 'ok, thanks!', status: 'Last seen recently', email: 'architect.lead@workwise.io', phone: '+1 (555) 019-2834', time: '1h', unread: 0, pinned: false },
    { id: 4, name: 'Jordan Taylor', isGroup: false, preview: 'You can check it out...', status: 'Online', email: 'jordan.taylor@workwise.io', phone: '+1 (555) 014-9921', time: 'now', unread: 1, pinned: false },
    { id: 5, name: 'Morgan Lee', isGroup: false, preview: 'I’ll try my best vpn...', status: 'Busy', email: 'morgan.lee@workwise.io', phone: '+1 (555) 018-7743', time: '4m', unread: 0, pinned: false },
    { id: 6, name: 'Taylor Swift', isGroup: false, preview: 'okaan notedd bro!', status: 'Offline', email: 'taylor.swift@workwise.io', phone: '+1 (555) 012-3388', time: '7m', unread: 0, pinned: false },
    { id: 7, name: 'Sam Smith', isGroup: false, preview: 'nice.', status: 'Online', email: 'sam.smith@workwise.io', phone: '+1 (555) 017-5520', time: '23m', unread: 1, pinned: false },
  ]);

  const [activeChat, setActiveChat] = useState(conversations[0]);

  // Dictionary mapping each chat ID to its own array of messages
  const [chatMessages, setChatMessages] = useState({
    1: [
      { id: 101, sender: 'Lead Alex', text: 'Hey everyone! Just wanted to kick off the day by saying how excited I am to dive into our latest project.', time: '01.20 AM', isMe: false, pinned: true, isRead: true },
      { id: 102, sender: 'You', text: 'Excited as well! Let’s build something awesome.', time: '01.32 AM', isMe: true, pinned: false, isRead: true },
    ],
    2: [
      { id: 201, sender: 'PM Team Lead', text: 'I see, okay noted! Let’s review the timeline update.', time: '09.15 AM', isMe: false, pinned: true, isRead: true },
    ],
    3: [
      { id: 301, sender: 'Lead Architect', text: 'The blueprints look solid. ok, thanks!', time: 'Yesterday', isMe: false, pinned: false, isRead: true },
    ],
    4: [
      { id: 401, sender: 'Jordan Taylor', text: 'You can check it out on staging.', time: '11:04 AM', isMe: false, pinned: false, isRead: false },
    ],
    5: [
      { id: 501, sender: 'Morgan Lee', text: 'I’ll try my best vpn connection.', time: '4m ago', isMe: false, pinned: false, isRead: true },
    ],
    6: [
      { id: 601, sender: 'Taylor Swift', text: 'okaan notedd bro!', time: '7m ago', isMe: false, pinned: false, isRead: true },
    ],
    7: [
      { id: 701, sender: 'Sam Smith', text: 'nice.', time: '23m ago', isMe: false, pinned: false, isRead: false },
    ]
  });

  const messages = chatMessages[activeChat.id] || [];

  // Auto-scroll whenever messages change or chat changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, activeChat.id]);

  // Close options and message menu dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsMenuRef.current && !optionsMenuRef.current.contains(event.target)) {
        setShowOptionsMenu(false);
      }
      if (messageMenuRef.current && !messageMenuRef.current.contains(event.target)) {
        setActiveMessageMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      sender: 'You',
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      pinned: false,
      isRead: false,
    };

    setChatMessages(prev => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMsg]
    }));
    setMessageInput('');
  };

  const handleTogglePinMessage = (id) => {
    setChatMessages(prev => ({
      ...prev,
      [activeChat.id]: prev[activeChat.id].map(msg => msg.id === id ? { ...msg, pinned: !msg.pinned } : msg)
    }));
    setActiveMessageMenuId(null);
  };

  const handleJumpToMessage = (msgId) => {
    const element = messageRefs.current[msgId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlightedMsgId(msgId);
      setTimeout(() => {
        setHighlightedMsgId(null);
      }, 2000);
    }
  };

  const handleSelectChat = (chat) => {
    setSelectedChatId(chat.id);
    setActiveChat(chat);
    setConversations(conversations.map(c => c.id === chat.id ? { ...c, unread: 0 } : c));
    setIsEditingGroup(false);
    setEditGroupName(chat.name);
    setEditGroupAvatar(chat.avatar || '');
  };

  const handleCreateChat = (e) => {
    e.preventDefault();
    if (!newChatName.trim()) return;
    const newId = conversations.length + 1;
    const newConversation = {
      id: newId,
      name: newChatName,
      isGroup: true,
      preview: 'Started a new conversation',
      status: 'Online',
      membersCount: 1,
      inviteLink: `workwise/${newChatName.toLowerCase().replace(/\s+/g, '')}`,
      email: '',
      phone: '',
      time: 'now',
      unread: 0,
      pinned: false,
      avatar: null
    };
    setConversations([newConversation, ...conversations]);
    setChatMessages(prev => ({ ...prev, [newId]: [] }));
    setNewChatName('');
    setShowNewChatModal(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setEditGroupAvatar(localUrl);
    }
  };

  const handleSaveGroupSettings = (e) => {
    e.preventDefault();
    if (!editGroupName.trim()) return;

    const updatedConversations = conversations.map(c => {
      if (c.id === activeChat.id) {
        return { ...c, name: editGroupName, avatar: editGroupAvatar };
      }
      return c;
    });

    setConversations(updatedConversations);
    const updatedActive = updatedConversations.find(c => c.id === activeChat.id);
    setActiveChat(updatedActive);
    setIsEditingGroup(false);
  };

  const handleCopyInviteLink = (link) => {
    navigator.clipboard.writeText(link).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  const handleStartCall = (callType) => {
    window.open(`https://meet.google.com/new`, '_blank');
  };

  const handleDownloadFile = (fileName, fileType) => {
    const dummyContent = `This is a downloadable sample content for ${fileName}`;
    const blob = new Blob([dummyContent], { type: fileType === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Three dots menu handlers
  const handleMarkAllAsRead = () => {
    setConversations(conversations.map(c => ({ ...c, unread: 0 })));
    setShowOptionsMenu(false);
  };

  const handleClearAllChats = () => {
    if (window.confirm('Are you sure you want to clear all message histories?')) {
      const cleared = {};
      conversations.forEach(c => { cleared[c.id] = []; });
      setChatMessages(cleared);
      setShowOptionsMenu(false);
    }
  };

  const handleToggleAllNotifications = () => {
    setIsMuted(!isMuted);
    setShowOptionsMenu(false);
  };

  const filteredConversations = conversations.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedMessages = messages.filter(m => m.pinned);

  return (
    <div className={`messages-page ${themeClass}`}>
      {/* Same shared admin nav used across the admin console, so it stays visible and switchable here too */}
      <AdminNav />

    <div 
      className={`messages-wrapper ${themeClass}`}
      style={{
        '--bg-main': T.surface,
        '--bg-sidebar': T.bgSidebar,
        '--border-color': T.border,
        '--accent-color': '#C9B59C',
        backgroundColor: T.surface,
        color: T.text
      }}
    >
      
      {/* 1. LEFT NARROW ICON SIDEBAR */}
      <div className="messages-sidebar" style={{ backgroundColor: T.bgSidebar, borderRight: '1px solid #D9CFC7' }}>
        <div className="sidebar-top-icon">
          <div className="brand-logo-circle profile-badge-circle" title="User Profile" style={{ backgroundColor: '#C9B59C', color: '#F9F8F6' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
        </div>
        
        <div className="sidebar-nav-links">
          <div className={`nav-icon ${activeNav === 'messages' ? 'active' : ''}`} onClick={() => setActiveNav('messages')} title="Messages" style={{ color: activeNav === 'messages' ? T.text : T.textMuted }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
          <div className={`nav-icon ${activeNav === 'home' ? 'active' : ''}`} onClick={() => setActiveNav('home')} title="Home" style={{ color: activeNav === 'home' ? T.text : T.textMuted }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></div>
          <div className={`nav-icon ${activeNav === 'projects' ? 'active' : ''}`} onClick={() => setActiveNav('projects')} title="Projects" style={{ color: activeNav === 'projects' ? T.text : T.textMuted }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg></div>
          <div className={`nav-icon ${activeNav === 'team' ? 'active' : ''}`} onClick={() => setActiveNav('team')} title="Team" style={{ color: activeNav === 'team' ? T.text : T.textMuted }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div>
          <div className={`nav-icon ${activeNav === 'calendar' ? 'active' : ''}`} onClick={() => setActiveNav('calendar')} title="Calendar" style={{ color: activeNav === 'calendar' ? T.text : T.textMuted }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
          <div className={`nav-icon ${activeNav === 'downloads' ? 'active' : ''}`} onClick={() => setActiveNav('downloads')} title="Downloads" style={{ color: activeNav === 'downloads' ? T.text : T.textMuted }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></div>
          <div className={`nav-icon ${activeNav === 'notifications' ? 'active' : ''}`} onClick={() => setActiveNav('notifications')} title="Notifications" style={{ color: activeNav === 'notifications' ? T.text : T.textMuted }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></div>
        </div>

        <div className="sidebar-bottom-action"></div>
      </div>

      {/* 2. CHAT LIST PANEL */}
      <div className="chat-list-panel" style={{ backgroundColor: T.bgSidebar, borderRight: '1px solid #D9CFC7' }}>
        <div className="chat-list-header" style={{ borderBottom: '1px solid #D9CFC7', position: 'relative' }}>
          <h2 style={{ color: T.text }}>Messages</h2>
          <div className="chat-list-actions" style={{ display: 'flex', gap: '4px', position: 'relative' }} ref={optionsMenuRef}>
            <button className="icon-btn" title="New Chat" onClick={() => setShowNewChatModal(true)} style={{ color: T.text, background: 'none', border: 'none', cursor: 'pointer' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
            
            {/* Functional Three Dots Button */}
            <button className="icon-btn" title="More Options" onClick={() => setShowOptionsMenu(!showOptionsMenu)} style={{ color: T.text, background: 'none', border: 'none', cursor: 'pointer' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button>

            {/* Functional Dropdown Menu */}
            {showOptionsMenu && (
              <div style={{
                position: 'absolute',
                top: '30px',
                right: '0',
                backgroundColor: T.surface,
                border: '1px solid #D9CFC7',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                zIndex: 100,
                width: '160px',
                padding: '6px 0'
              }}>
                <button 
                  onClick={handleMarkAllAsRead}
                  style={{ width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', fontSize: '11px', color: T.text, cursor: 'pointer' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = T.border}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Mark all as read
                </button>
                <button 
                  onClick={handleToggleAllNotifications}
                  style={{ width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', fontSize: '11px', color: T.text, cursor: 'pointer' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = T.border}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  {isMuted ? 'Unmute all notifications' : 'Mute all notifications'}
                </button>
                <button 
                  onClick={handleClearAllChats}
                  style={{ width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', fontSize: '11px', color: '#c0392b', cursor: 'pointer' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = T.border}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Clear all history
                </button>
              </div>
            )}
          </div>
        </div>

        {showNewChatModal && (
          <form onSubmit={handleCreateChat} style={{ padding: '0 16px 12px 16px', display: 'flex', gap: '6px', borderBottom: '1px solid #D9CFC7' }}>
            <input 
              type="text" 
              placeholder="Chat name..." 
              value={newChatName} 
              onChange={(e) => setNewChatName(e.target.value)}
              style={{ padding: '6px 10px', fontSize: '11px', borderRadius: '6px', border: '1px solid #D9CFC7', backgroundColor: T.surface, color: T.text, flex: 1 }}
            />
            <button type="submit" className="send-btn" style={{ padding: '6px 10px', fontSize: '11px', backgroundColor: '#C9B59C', color: '#F9F8F6', border: 'none', borderRadius: '6px' }}>Add</button>
          </form>
        )}

        <div className="search-box-wrapper" style={{ backgroundColor: T.surface, border: '1px solid #D9CFC7', margin: '12px 16px', borderRadius: '8px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6E655D" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input 
            type="text" 
            placeholder="Search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ backgroundColor: 'transparent', color: T.text, border: 'none', outline: 'none', width: '100%' }}
          />
        </div>

        <div className="conversations-scroll">
          <div className="section-label" style={{ color: T.textMuted, paddingLeft: '16px', fontSize: '11px', fontWeight: 'bold' }}>Pinned Chats</div>
          {filteredConversations.filter(c => c.pinned).map(chat => (
            <div 
              key={chat.id} 
              className={`conversation-item ${selectedChatId === chat.id ? 'active-chat-item' : ''}`}
              onClick={() => handleSelectChat(chat)}
              style={{ 
                backgroundColor: selectedChatId === chat.id ? T.border : 'transparent',
                padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', borderBottom: '1px solid rgba(217, 207, 199, 0.4)'
              }}
            >
              <div className="avatar-placeholder-sm profile-avatar-icon" style={{ backgroundColor: '#C9B59C', color: '#F9F8F6', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {chat.avatar ? (
                  <img src={chat.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                )}
              </div>
              <div className="chat-preview-info" style={{ flex: 1, minWidth: 0 }}>
                <div className="chat-item-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h4 style={{ margin: 0, fontSize: '13px', color: T.text }}>{chat.name}</h4>
                  <span className="time" style={{ fontSize: '10px', color: T.textMuted }}>{chat.time}</span>
                </div>
                <p className="typing-preview" style={{ margin: '2px 0 0 0', fontSize: '11px', color: T.textMuted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.preview}</p>
              </div>
              {chat.unread > 0 && <span className="unread-badge" style={{ backgroundColor: '#C9B59C', color: '#F9F8F6', fontSize: '10px', padding: '2px 6px', borderRadius: '10px' }}>{chat.unread}</span>}
            </div>
          ))}

          <div className="section-label" style={{ marginTop: '16px', color: T.textMuted, paddingLeft: '16px', fontSize: '11px', fontWeight: 'bold' }}>All Messages</div>
          {filteredConversations.filter(c => !c.pinned).map(chat => (
            <div 
              key={chat.id} 
              className={`conversation-item ${selectedChatId === chat.id ? 'active-chat-item' : ''}`}
              onClick={() => handleSelectChat(chat)}
              style={{ 
                backgroundColor: selectedChatId === chat.id ? T.border : 'transparent',
                padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', borderBottom: '1px solid rgba(217, 207, 199, 0.4)'
              }}
            >
              <div className="avatar-placeholder-sm" style={{ backgroundColor: T.border, color: T.text, width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', overflow: 'hidden' }}>
                {chat.avatar ? (
                  <img src={chat.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <i className="fa-solid fa-user" style={{ fontSize: '11px' }} aria-hidden="true"></i>
                )}
              </div>
              <div className="chat-preview-info" style={{ flex: 1, minWidth: 0 }}>
                <div className="chat-item-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h4 style={{ margin: 0, fontSize: '13px', color: T.text }}>{chat.name}</h4>
                  <span className="time" style={{ fontSize: '10px', color: T.textMuted }}>{chat.time}</span>
                </div>
                <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: T.textMuted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.preview}</p>
              </div>
              {chat.unread > 0 && <span className="unread-badge" style={{ backgroundColor: '#C9B59C', color: '#F9F8F6', fontSize: '10px', padding: '2px 6px', borderRadius: '10px' }}>{chat.unread}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* 3. MAIN CHAT WINDOW */}
      <div className="main-chat-window" style={{ backgroundColor: T.surface, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="main-chat-header" style={{ backgroundColor: T.bgSidebar, borderBottom: '1px solid #D9CFC7', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="active-chat-meta" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="avatar-placeholder-sm profile-avatar-icon" style={{ backgroundColor: '#C9B59C', color: '#F9F8F6', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {activeChat.avatar ? (
                <img src={activeChat.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              )}
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '14px', color: T.text }}>{activeChat.name}</h3>
              <span className="typing-status" style={{ fontSize: '11px', color: T.textMuted }}>{activeChat.status}</span>
            </div>
          </div>
          <div className="main-header-icons" style={{ display: 'flex', gap: '10px' }}>
            <button className="icon-btn" title="Video Call" onClick={() => handleStartCall('video')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.text }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg></button>
            <button className="icon-btn" title="Audio Call" onClick={() => handleStartCall('audio')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.text }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></button>
            <button className="icon-btn" title="Toggle Info Panel" onClick={() => setShowGroupInfo(!showGroupInfo)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.text }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button>
          </div>
        </div>

        {/* Pinned Messages Banner Bar */}
        {pinnedMessages.length > 0 && (
          <div className="pinned-messages-banner" style={{ backgroundColor: T.bgSidebar, padding: '6px 16px', borderBottom: '1px solid #D9CFC7', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#C9B59C', display: 'flex', alignItems: 'center', gap: '5px' }}><i className="fa-solid fa-thumbtack" aria-hidden="true"></i> Pinned ({pinnedMessages.length}):</span>
            <span 
              onClick={() => handleJumpToMessage(pinnedMessages[pinnedMessages.length - 1].id)}
              style={{ fontSize: '11px', color: T.textMuted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, cursor: 'pointer', textDecoration: 'underline' }}
              title="Click to jump to message"
            >
              "{pinnedMessages[pinnedMessages.length - 1].text}"
            </span>
          </div>
        )}

        <div className="chat-messages-container" ref={chatContainerRef} style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          <div className="date-badge-wrapper" style={{ textAlign: 'center', margin: '10px 0' }}><span style={{ backgroundColor: T.bgSidebar, padding: '4px 10px', borderRadius: '12px', fontSize: '10px', color: T.textMuted, border: '1px solid #D9CFC7' }}>Today, March 12</span></div>

          {messages.map((msg) => {
            const isReallyMe = msg.isMe === true || msg.sender === 'You';
            const isHighlighted = highlightedMsgId === msg.id;
            const isMenuOpen = activeMessageMenuId === msg.id;

            return (
              <div 
                key={msg.id} 
                ref={el => messageRefs.current[msg.id] = el}
                className={`message-row ${isReallyMe ? 'my-message-row' : ''}`} 
                style={{ 
                  display: 'flex', 
                  justifyContent: isReallyMe ? 'flex-end' : 'flex-start', 
                  margin: '10px 0', 
                  gap: '8px', 
                  alignItems: 'flex-end',
                  width: 'fit-content',
                  marginLeft: isReallyMe ? 'auto' : '0',
                  marginRight: '0px',
                  transition: 'background-color 0.5s ease',
                  backgroundColor: isHighlighted ? 'rgba(201, 181, 156, 0.4)' : 'transparent',
                  borderRadius: '8px',
                  padding: isHighlighted ? '4px' : '0'
                }}
              >
                {!isReallyMe && (
                  <div className="avatar-placeholder-xs" style={{ backgroundColor: T.border, width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: T.text }}><i className="fa-solid fa-user" aria-hidden="true"></i></div>
                )}
                
                <div 
                  className={`message-bubble ${isReallyMe ? 'my-bubble' : 'peer-bubble'}`} 
                  style={{ 
                    backgroundColor: isReallyMe ? '#C9B59C' : T.bgSidebar, 
                    color: isReallyMe ? '#F9F8F6' : T.text, 
                    padding: '10px 14px', 
                    borderRadius: '12px', 
                    maxWidth: '100%', 
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    textAlign: isReallyMe ? 'right' : 'left',
                    position: 'relative'
                  }}
                >
                  {!isReallyMe && (
                    <span className="sender-name" style={{ fontSize: '10px', fontWeight: 'bold', color: '#C9B59C', display: 'block', marginBottom: '2px', textAlign: 'left' }}>{msg.sender}</span>
                  )}
                  <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.4' }}>{msg.text}</p>
                  
                  <div className="message-time" style={{ fontSize: '9px', opacity: 0.8, display: 'flex', justifyContent: isReallyMe ? 'flex-end' : 'flex-start', alignItems: 'center', gap: '6px', marginTop: '4px', color: isReallyMe ? '#E8E1DA' : '#9E948B' }}>
                    <span>{msg.time}</span>
                    {isReallyMe && (
                      <span>{msg.isRead ? <i className="fa-solid fa-check-double" aria-hidden="true"></i> : 'sent'}</span>
                    )}
                    {msg.pinned && <span title="Pinned Message"><i className="fa-solid fa-thumbtack" aria-hidden="true"></i></span>}
                    
                    {/* Message Action Options Trigger (Three dots per message) */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMessageMenuId(isMenuOpen ? null : msg.id);
                      }}
                      title="Message options"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px', color: 'inherit', fontSize: '10px', opacity: 0.8 }}
                    >
                      <i className="fa-solid fa-ellipsis" aria-hidden="true"></i>
                    </button>
                  </div>

                  {/* Pop-up menu for Pin/Unpin */}
                  {isMenuOpen && (
                    <div 
                      ref={messageMenuRef}
                      style={{
                        position: 'absolute',
                        bottom: '-32px',
                        right: isReallyMe ? '0' : 'auto',
                        left: isReallyMe ? 'auto' : '0',
                        backgroundColor: T.surface,
                        border: '1px solid #D9CFC7',
                        borderRadius: '6px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        zIndex: 50,
                        padding: '4px 0',
                        minWidth: '90px'
                      }}
                    >
                      <button 
                        onClick={() => handleTogglePinMessage(msg.id)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '4px 10px',
                          background: 'none',
                          border: 'none',
                          fontSize: '11px',
                          color: T.text,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = T.border}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      >
                        <i className="fa-solid fa-thumbtack" aria-hidden="true"></i> {msg.pinned ? 'Unpin' : 'Pin message'}
                      </button>
                    </div>
                  )}
                </div>

                {isReallyMe && (
                  <div className="avatar-placeholder-xs" style={{ backgroundColor: '#C9B59C', color: '#F9F8F6', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}><i className="fa-solid fa-star" aria-hidden="true"></i></div>
                )}
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSendMessage} className="chat-input-footer" style={{ backgroundColor: T.bgSidebar, padding: '12px 20px', borderTop: '1px solid #D9CFC7', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="input-toolbar-icons">
            <button type="button" className="icon-btn" title="Attach File" onClick={() => alert('Attach file dialog opened.')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.text }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg></button>
          </div>
          <input
            type="text"
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            style={{ flex: 1, backgroundColor: T.surface, border: '1px solid #D9CFC7', padding: '10px 14px', borderRadius: '20px', fontSize: '13px', color: T.text, outline: 'none' }}
          />
          <div className="input-right-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button type="button" className="icon-btn" title="Emoji" onClick={() => alert('Emoji picker opened.')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.text }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></button>
            <button type="button" className="icon-btn" title="Attachment" onClick={() => alert('Attachment picker opened.')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.text }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg></button>
            <button type="button" className="icon-btn" title="Location" onClick={() => alert('Share location clicked.')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.text }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></button>
            <button type="submit" className="send-btn" style={{ backgroundColor: '#C9B59C', color: '#F9F8F6', border: 'none', padding: '8px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Send <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </form>
      </div>

      {/* 4. RIGHT SIDEBAR PANEL */}
      {showGroupInfo && (
        <div className="group-info-panel" style={{ backgroundColor: T.bgSidebar, borderLeft: '1px solid #D9CFC7', width: '280px', padding: '16px', overflowY: 'auto' }}>
          <div className="group-info-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4 style={{ margin: 0, fontSize: '13px', color: T.text }}>{activeChat.isGroup ? 'Group Info' : 'User Info'}</h4>
            <button className="icon-btn" onClick={() => setShowGroupInfo(false)} title="Close Panel" style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.text, fontSize: '14px' }}><i className="fa-solid fa-xmark" aria-hidden="true"></i></button>
          </div>

          <div className="group-profile-card" style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div className="large-group-avatar profile-avatar-icon" style={{ backgroundColor: '#C9B59C', color: '#F9F8F6', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto', overflow: 'hidden' }}>
              {activeChat.avatar ? (
                <img src={activeChat.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              )}
            </div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '14px', color: T.text }}>{activeChat.name}</h3>
            <p style={{ margin: 0, fontSize: '11px', color: T.textMuted }}>{activeChat.isGroup ? `Group · ${activeChat.membersCount || 12} Members` : activeChat.status}</p>

            {activeChat.isGroup && (
              <button 
                onClick={() => {
                  setIsEditingGroup(!isEditingGroup);
                  setEditGroupName(activeChat.name);
                  setEditGroupAvatar(activeChat.avatar || '');
                }}
                style={{
                  marginTop: '8px',
                  backgroundColor: 'transparent',
                  border: '1px solid #D9CFC7',
                  borderRadius: '12px',
                  padding: '4px 10px',
                  fontSize: '10px',
                  color: T.text,
                  cursor: 'pointer'
                }}
              >
                {isEditingGroup ? 'Cancel Editing' : <><i className="fa-solid fa-pen" aria-hidden="true"></i> Edit Group Details</>}
              </button>
            )}
          </div>

          {/* Edit Group Form Panel inside Sidebar */}
          {activeChat.isGroup && isEditingGroup && (
            <form onSubmit={handleSaveGroupSettings} style={{ backgroundColor: T.surface, border: '1px solid #D9CFC7', padding: '10px', borderRadius: '8px', marginBottom: '16px' }}>
              <h5 style={{ fontSize: '11px', color: T.text, margin: '0 0 8px 0' }}>Change Group Settings</h5>
              
              <div style={{ marginBottom: '8px' }}>
                <label style={{ fontSize: '10px', color: T.textMuted, display: 'block', marginBottom: '2px' }}>Group Name</label>
                <input 
                  type="text" 
                  value={editGroupName} 
                  onChange={(e) => setEditGroupName(e.target.value)}
                  style={{ width: '100%', padding: '6px', fontSize: '11px', borderRadius: '4px', border: '1px solid #D9CFC7', backgroundColor: T.bgSidebar, color: T.text, boxSizing: 'border-box' }}
                />
              </div>

              {/* Local Folder Upload Picker Option */}
              <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '10px', color: T.textMuted, display: 'block', marginBottom: '4px' }}>Group Profile Picture</label>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    style={{ flex: 1, backgroundColor: T.bgSidebar, border: '1px solid #D9CFC7', color: T.text, padding: '6px', borderRadius: '4px', fontSize: '10px', cursor: 'pointer', textAlign: 'center' }}
                  >
                    <i className="fa-regular fa-folder-open" aria-hidden="true"></i> Browse Local Folder
                  </button>
                  {editGroupAvatar && (
                    <span style={{ fontSize: '10px', color: '#C9B59C', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '4px' }}><i className="fa-solid fa-check" aria-hidden="true"></i> Selected</span>
                  )}
                </div>
              </div>

              <button 
                type="submit"
                style={{ width: '100%', backgroundColor: '#C9B59C', color: '#F9F8F6', border: 'none', padding: '6px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Save Changes
              </button>
            </form>
          )}

          {activeChat.isGroup ? (
            <>
              {pinnedMessages.length > 0 && (
                <div className="info-section-block" style={{ marginBottom: '16px' }}>
                  <h5 style={{ fontSize: '11px', color: T.text, marginBottom: '6px' }}>Pinned Messages ({pinnedMessages.length})</h5>
                  {pinnedMessages.map(pm => (
                    <div key={pm.id} className="invite-link-box" style={{ backgroundColor: T.surface, border: '1px solid #D9CFC7', padding: '6px 10px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', fontSize: '11px' }}>
                      <span 
                        onClick={() => handleJumpToMessage(pm.id)}
                        style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: T.text, flex: 1, cursor: 'pointer', textDecoration: 'underline' }}
                        title="Click to jump to message"
                      >
                        {pm.text}
                      </span>
                      <button className="copy-btn" onClick={() => handleTogglePinMessage(pm.id)} title="Unpin" style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.textMuted, marginLeft: '6px' }}><i className="fa-solid fa-xmark" aria-hidden="true"></i></button>
                    </div>
                  ))}
                </div>
              )}

              <div className="info-section-block" style={{ marginBottom: '16px' }}>
                <h5 style={{ fontSize: '11px', color: T.text, marginBottom: '4px' }}>Invitation link</h5>
                <div className="invite-link-box" style={{ backgroundColor: T.surface, border: '1px solid #D9CFC7', padding: '6px 10px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: T.text }}>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>{activeChat.inviteLink || 'workwise/invite'}</span>
                  <button 
                    className="copy-btn" 
                    title="Copy Link" 
                    onClick={() => handleCopyInviteLink(activeChat.inviteLink || 'workwise/invite')} 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', marginLeft: '6px' }}
                  >
                    {copiedLink ? <i className="fa-solid fa-check" aria-hidden="true"></i> : <i className="fa-regular fa-copy" aria-hidden="true"></i>}
                  </button>
                </div>
                {copiedLink && <span style={{ fontSize: '9px', color: '#C9B59C', marginTop: '2px', display: 'block' }}>Copied to clipboard!</span>}
              </div>
            </>
          ) : (
            <>
              <div className="info-section-block" style={{ marginBottom: '16px' }}>
                <h5 style={{ fontSize: '11px', color: T.text, marginBottom: '8px', textAlign: 'center' }}>Contact Information</h5>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '11px', color: T.textMuted }}>
                    <span style={{ display: 'flex', alignItems: 'center', color: '#C9B59C' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </span>
                    <span style={{ color: T.text, wordBreak: 'break-all' }}>{activeChat.email || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '11px', color: T.textMuted }}>
                    <span style={{ display: 'flex', alignItems: 'center', color: '#C9B59C' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </span>
                    <span style={{ color: T.text }}>{activeChat.phone || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="info-section-block" style={{ marginBottom: '16px' }}>
                <h5 style={{ fontSize: '11px', color: T.text, marginBottom: '4px', textAlign: 'center' }}>Bio</h5>
                <p className="desc-text" style={{ fontSize: '11px', color: T.textMuted, margin: 0, lineHeight: '1.4', textAlign: 'center' }}>Available for project collaborations, design reviews, and engineering consultations.</p>
              </div>
            </>
          )}

          <div className="info-section-block" style={{ marginBottom: '16px' }}>
            <div className="flex-row-between">
              <h5 style={{ fontSize: '11px', color: T.text, margin: 0 }}>Notification</h5>
            </div>
            <div className="flex-row-between" style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: T.textMuted }}>Mute notifications</span>
              <label className="switch-sm" style={{ cursor: 'pointer' }}>
                <input type="checkbox" checked={isMuted} onChange={() => setIsMuted(!isMuted)} style={{ display: 'none' }} />
                <span className="slider-sm" style={{ width: '30px', height: '16px', backgroundColor: isMuted ? '#C9B59C' : T.border, display: 'inline-block', borderRadius: '10px', position: 'relative', transition: '0.2s' }}></span>
              </label>
            </div>
          </div>

          <div className="info-section-block" style={{ marginBottom: '16px' }}>
            <h5 style={{ fontSize: '11px', color: T.text, marginBottom: '8px' }}>Shared Images</h5>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
              <div 
                onClick={() => setPreviewImage('https://picsum.photos/seed/design1/600/600')} 
                style={{ aspectRatio: '1/1', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', backgroundColor: T.border }}
                title="Click to preview image"
              >
                <img src="https://picsum.photos/seed/design1/100/100" alt="Sample 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div 
                onClick={() => setPreviewImage('https://picsum.photos/seed/design2/600/600')} 
                style={{ aspectRatio: '1/1', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', backgroundColor: T.border }}
                title="Click to preview image"
              >
                <img src="https://picsum.photos/seed/design2/100/100" alt="Sample 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div 
                onClick={() => setPreviewImage('https://picsum.photos/seed/design3/600/600')} 
                style={{ aspectRatio: '1/1', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', backgroundColor: T.border }}
                title="Click to preview image"
              >
                <img src="https://picsum.photos/seed/design3/100/100" alt="Sample 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>

          <div className="info-section-block">
            <h5 style={{ fontSize: '11px', color: T.text, marginBottom: '8px' }}>Shared Files</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div 
                onClick={() => handleDownloadFile('Project_Specs.pdf', 'pdf')}
                style={{ backgroundColor: T.surface, border: '1px solid #D9CFC7', padding: '6px 8px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                title="Click to download file"
              >
                <span style={{ fontSize: '14px', color: '#C0512E' }}><i className="fa-regular fa-file-pdf" aria-hidden="true"></i></span>
                <div style={{ overflow: 'hidden', flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '11px', color: T.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '500' }}>Project_Specs.pdf</p>
                  <span style={{ fontSize: '9px', color: T.textMuted }}>2.4 MB · PDF (Click to download)</span>
                </div>
              </div>
              <div 
                onClick={() => handleDownloadFile('Budget_Q2.xlsx', 'xlsx')}
                style={{ backgroundColor: T.surface, border: '1px solid #D9CFC7', padding: '6px 8px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                title="Click to download file"
              >
                <span style={{ fontSize: '14px', color: '#3F7A3B' }}><i className="fa-regular fa-file-excel" aria-hidden="true"></i></span>
                <div style={{ overflow: 'hidden', flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '11px', color: T.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '500' }}>Budget_Q2.xlsx</p>
                  <span style={{ fontSize: '9px', color: T.textMuted }}>1.1 MB · Excel (Click to download)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* IMAGE PREVIEW MODAL LIGHTBOX */}
      {previewImage && (
        <div 
          onClick={() => setPreviewImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            cursor: 'zoom-out'
          }}
        >
          <div style={{ position: 'relative', maxWidth: '80vw', maxHeight: '80vh' }} onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setPreviewImage(null)}
              style={{
                position: 'absolute',
                top: '-36px',
                right: '0px',
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '20px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              <i className="fa-solid fa-xmark" aria-hidden="true"></i> Close
            </button>
            <img 
              src={previewImage} 
              alt="Preview Enlarged" 
              style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} 
            />
          </div>
        </div>
      )}

    </div>
    </div>
  );
}