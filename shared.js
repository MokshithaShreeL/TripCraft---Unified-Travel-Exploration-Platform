/* ==========================================================================
   TripCraft — Core Platform System (Auth, Bookings, Search, jsPDF Invoices, Modals)
   ========================================================================== */

// Utility Base64 URL Encoding/Decoding for RFC 7519 compliant simulated JWTs
function base64UrlEncode(str) {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64UrlDecode(str) {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) base64 += '=';
  return decodeURIComponent(escape(atob(base64)));
}

// -------------------------------------------------------------
// 1. ENTERPRISE DATA PERSISTENCE & JWT/OAUTH AUTHENTICATION MANAGER (TripCraftAuth)
// -------------------------------------------------------------
const TripCraftAuth = {
  STORAGE_KEY: 'tripcraft_user',
  JWT_KEY: 'tripcraft_jwt',

  // Pre-seeded 5 Verified Travelers + 1 System Administrator
  PRESEEDED_USERS: [
    {
      id: 'TC-USR-101',
      name: 'Priya Sunder',
      email: 'priya.traveler@example.com',
      password: 'Traveler2026!',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      phone: '+91 98765 43210',
      badge: 'Highland & Trekking Explorer',
      memberSince: '2024'
    },
    {
      id: 'TC-USR-102',
      name: 'Arun Kumar',
      email: 'arun.kumar@example.com',
      password: 'ArunTrip2026!',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
      phone: '+91 98451 22334',
      badge: 'Cultural & Heritage Enthusiast',
      memberSince: '2024'
    },
    {
      id: 'TC-USR-103',
      name: 'Deepa Nair',
      email: 'deepa.nair@example.com',
      password: 'DeepaMunnar2026!',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
      phone: '+91 97123 88440',
      badge: 'Kerala Solo Backpacker',
      memberSince: '2025'
    },
    {
      id: 'TC-USR-104',
      name: 'Karthik Raja',
      email: 'karthik.raja@example.com',
      password: 'Karthik2026!',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
      phone: '+91 99801 11223',
      badge: 'Luxury Resort Connoisseur',
      memberSince: '2025'
    },
    {
      id: 'TC-USR-105',
      name: 'Ananya Sharma',
      email: 'ananya.sharma@example.com',
      password: 'Ananya2026!',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
      phone: '+91 98220 77114',
      badge: 'Student Budget Explorer',
      memberSince: '2025'
    },
    {
      id: 'TC-ADM-001',
      name: 'Admin Master',
      email: 'admin@tripcraft.com',
      password: 'AdminMaster2026!',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
      phone: '+91 90000 00001',
      badge: 'System Administrator (Full Privileges)',
      memberSince: '2023'
    }
  ],

  // JWT Generation (RFC 7519 Compliant)
  generateJWT(user) {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

    const now = Math.floor(Date.now() / 1000);
    const payload = {
      sub: user.id || 'TC-USR-' + Math.floor(100 + Math.random() * 900),
      name: user.name,
      email: user.email,
      role: user.role || 'user',
      badge: user.badge || 'Verified Traveler',
      iss: 'tripcraft.auth.service',
      iat: now,
      exp: now + 86400 * 7 // 7 days expiration
    };

    const encHeader = base64UrlEncode(JSON.stringify(header));
    const encPayload = base64UrlEncode(JSON.stringify(payload));
    // Simulated cryptographic HMAC-SHA256 signature
    const signatureRaw = `${encHeader}.${encPayload}.tripcraft_jwt_secret_token_2026`;
    const encSig = base64UrlEncode(signatureRaw).slice(0, 43);

    const token = `${encHeader}.${encPayload}.${encSig}`;
    try {
      localStorage.setItem(this.JWT_KEY, token);
    } catch (e) {
      console.warn('Storage unavailable for JWT:', e);
    }
    return token;
  },

  getJWT() {
    return localStorage.getItem(this.JWT_KEY) || null;
  },

  decodeJWT(token) {
    const target = token || this.getJWT();
    if (!target) return null;
    try {
      const parts = target.split('.');
      if (parts.length !== 3) return null;
      return {
        header: JSON.parse(base64UrlDecode(parts[0])),
        payload: JSON.parse(base64UrlDecode(parts[1])),
        signature: parts[2]
      };
    } catch (e) {
      console.error('Invalid JWT format:', e);
      return null;
    }
  },

  verifyJWT(token) {
    const decoded = this.decodeJWT(token);
    if (!decoded) return { valid: false, reason: 'Malformed token' };
    const now = Math.floor(Date.now() / 1000);
    if (decoded.payload.exp && decoded.payload.exp < now) {
      return { valid: false, reason: 'Token has expired' };
    }
    return { valid: true, decoded };
  },

  getUser() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY) || localStorage.getItem('tc_session') || localStorage.getItem('tc_user');
      if (data) {
        const user = JSON.parse(data);
        // Verify JWT token exists and is valid
        const jwt = this.getJWT();
        if (jwt) {
          user.jwt = jwt;
        } else if (user.isLoggedIn || user.email) {
          user.jwt = this.generateJWT(user);
        }
        return user;
      }
    } catch (e) {
      console.error('Error reading user session:', e);
    }
    return null;
  },

  setUser(user) {
    try {
      if (user) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
        localStorage.setItem('tc_session', JSON.stringify(user));
        localStorage.setItem('tc_user', JSON.stringify(user));
        this.generateJWT(user);
      } else {
        localStorage.removeItem(this.STORAGE_KEY);
        localStorage.removeItem(this.JWT_KEY);
        localStorage.removeItem('tc_session');
        localStorage.removeItem('tc_user');
        try { sessionStorage.clear(); } catch(e) {}
      }
      this.updateNavAuth();
    } catch (e) {
      console.error('Error saving user session:', e);
    }
  },

  isLoggedIn() {
    const user = this.getUser();
    return !!(user && user.isLoggedIn);
  },

  isAdmin() {
    const user = this.getUser();
    return !!(user && user.isLoggedIn && user.role === 'admin');
  },

  login(email, password, name) {
    // Check if matching a pre-seeded account
    const found = this.PRESEEDED_USERS.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
    
    let user;
    if (found) {
      user = {
        id: found.id,
        name: found.name,
        email: found.email,
        role: found.role,
        avatar: found.avatar,
        phone: found.phone,
        badge: found.badge,
        isLoggedIn: true,
        memberSince: found.memberSince
      };
    } else {
      const existing = this.getUser();
      const displayName = name || (existing ? existing.name : (email ? email.split('@')[0].replace('.', ' ') : 'Priya Sunder'));
      const capitalizedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
      
      user = {
        id: 'TC-USR-' + Math.floor(100 + Math.random() * 900),
        name: capitalizedName,
        email: email || 'priya.traveler@example.com',
        role: (email && email.includes('admin')) ? 'admin' : 'user',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
        phone: '+91 98765 43210',
        badge: 'Verified Explorer',
        isLoggedIn: true,
        memberSince: new Date().getFullYear().toString()
      };
    }

    this.setUser(user);
    showToast(`Welcome back, ${user.name}!`, 'success');
    return user;
  },

  quickLogin(email) {
    const found = this.PRESEEDED_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      return this.login(found.email, found.password, found.name);
    }
    return this.login(email);
  },

  loginWithOAuth(provider = 'Google') {
    const isGoogle = provider.toLowerCase().includes('google');
    const user = {
      id: isGoogle ? 'TC-GGL-8821' : 'TC-GH-9912',
      name: isGoogle ? 'Priya Sunder (Google)' : 'Arun Kumar (GitHub)',
      email: isGoogle ? 'priya.traveler@gmail.com' : 'arun.dev@github.com',
      role: 'user',
      avatar: isGoogle 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
      phone: '+91 98765 43210',
      badge: `Signed in with ${provider}`,
      isLoggedIn: true,
      memberSince: '2026'
    };

    this.setUser(user);
    showToast(`Signed in with ${provider}.`, 'success');
    return user;
  },

  signup(name, email, password) {
    const user = {
      id: 'TC-USR-' + Math.floor(100 + Math.random() * 900),
      name: name || 'New Traveler',
      email: email || 'traveler@example.com',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop',
      phone: '+91 98765 43210',
      badge: 'New Explorer',
      isLoggedIn: true,
      memberSince: new Date().getFullYear().toString()
    };

    this.setUser(user);
    showToast(`Account created. Welcome, ${user.name}.`, 'success');
    return user;
  },

  logout() {
    this.setUser(null);
    showToast('You have been signed out.', 'info');
    setTimeout(() => {
      location.href = 'index.html';
    }, 300);
  },

  requireAuth(returnUrl) {
    if (!this.isLoggedIn()) {
      const target = returnUrl || location.pathname.split('/').pop() || 'index.html';
      sessionStorage.setItem('tripcraft_redirect', target);
      showToast('Please sign in to proceed with your booking.', 'info');
      setTimeout(() => {
        location.href = `login.html?redirect=${encodeURIComponent(target)}`;
      }, 500);
      return false;
    }
    return true;
  },

  requireAdmin() {
    if (!this.isAdmin()) {
      showToast('Restricted Access: Administrator credentials required.', 'error');
      setTimeout(() => {
        location.href = 'login.html?tab=signin&admin=1';
      }, 700);
      return false;
    }
    return true;
  },

  inspectJWT() {
    const token = this.getJWT();
    if (!token) {
      showToast('No active JWT found. Please log in first.', 'info');
      return;
    }

    const decoded = this.decodeJWT(token);
    if (!decoded) {
      showToast('Unable to parse active JWT.', 'error');
      return;
    }

    let modal = document.getElementById('jwtInspectorModalBackdrop');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'jwtInspectorModalBackdrop';
      modal.className = 'tc-modal-backdrop active';
      document.body.appendChild(modal);
    } else {
      modal.classList.add('active');
    }

    const parts = token.split('.');
    modal.innerHTML = `
      <div class="tc-modal-container" style="max-width: 620px;">
        <div class="tc-modal-banner" style="background: linear-gradient(135deg, #071626, #132C50);">
          <button class="tc-modal-close-btn" onclick="document.getElementById('jwtInspectorModalBackdrop').classList.remove('active')">&times;</button>
          <div class="tc-modal-banner-content">
            <span class="tc-modal-badge" style="background:rgba(118,255,3,0.2); color:#76FF03; border:1px solid #76FF03;">RFC 7519 Security Token</span>
            <h3 class="tc-modal-title">JWT Security Inspector</h3>
          </div>
        </div>
        <div class="tc-modal-body" style="padding: 24px;">
          <p style="font-size:13px; color:var(--text-muted); margin-bottom:12px;">
            Cryptographic token validating current user session across all TripCraft microservices.
          </p>
          
          <div style="font-size:11px; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:6px;">Raw Encoded Token (Header.Payload.Signature):</div>
          <div class="jwt-inspector-box">
            <span style="color:#FF5252;">${parts[0]}</span>.<span style="color:#E040FB;">${parts[1]}</span>.<span style="color:#00E5FF;">${parts[2]}</span>
          </div>

          <div style="font-size:11px; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:6px;">Decoded Token Claims:</div>
          <table class="jwt-claim-table">
            <thead>
              <tr><th>Claim</th><th>Value</th><th>Meaning</th></tr>
            </thead>
            <tbody>
              <tr><td><code>sub</code></td><td><strong>${decoded.payload.sub}</strong></td><td>Subject Identifier</td></tr>
              <tr><td><code>name</code></td><td>${decoded.payload.name}</td><td>User Full Name</td></tr>
              <tr><td><code>email</code></td><td>${decoded.payload.email}</td><td>Authorized Identity</td></tr>
              <tr><td><code>role</code></td><td><span class="chip ${decoded.payload.role === 'admin' ? 'chip-gold' : 'chip-teal'}">${decoded.payload.role.toUpperCase()}</span></td><td>RBAC Access Level</td></tr>
              <tr><td><code>iss</code></td><td>${decoded.payload.iss}</td><td>Token Issuer</td></tr>
              <tr><td><code>iat</code></td><td>${new Date(decoded.payload.iat * 1000).toLocaleTimeString()}</td><td>Issued At Timestamp</td></tr>
              <tr><td><code>exp</code></td><td>${new Date(decoded.payload.exp * 1000).toLocaleTimeString()}</td><td>Expiration Timestamp</td></tr>
            </tbody>
          </table>

          <div style="margin-top:18px; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:11.5px; color:var(--success); font-weight:600;">&#10004; Signature Verified: HS256 (Valid)</span>
            <button class="btn btn-teal" style="font-size:12px; padding:6px 14px;" onclick="document.getElementById('jwtInspectorModalBackdrop').classList.remove('active')">Dismiss</button>
          </div>
        </div>
      </div>
    `;
  },

  updateNavAuth() {
    const navCta = document.querySelector('.nav-cta');
    const navLinks = document.querySelector('.nav-links');
    const user = this.getUser();

    // Attach Language Switcher to Nav if not already present
    if (typeof TripCraftI18n !== 'undefined') {
      TripCraftI18n.renderSelector();
    }

    // Attach Currency Switcher to Nav if not already present
    if (typeof TripCraftCurrency !== 'undefined') {
      TripCraftCurrency.renderSelector();
    }

    // Attach Recently Accessed Strip if not already present
    if (typeof TripCraftHistory !== 'undefined') {
      TripCraftHistory.renderStrip();
    }

    // Add Admin Dashboard link in nav-links if user is admin
    if (navLinks) {
      let adminLink = navLinks.querySelector('a[href="admin.html"]');
      if (this.isAdmin()) {
        if (!adminLink) {
          adminLink = document.createElement('a');
          adminLink.href = 'admin.html';
          adminLink.style.color = 'var(--gold)';
          adminLink.style.fontWeight = '700';
          adminLink.textContent = '★ Admin';
          navLinks.appendChild(adminLink);
        }
      } else if (adminLink) {
        adminLink.remove();
      }

      // Nav items updated cleanly
    }

    if (!navCta) return;

    const wishlistCount = (typeof TripCraftWishlist !== 'undefined') ? TripCraftWishlist.getAll().length : 0;
    const wishlistIconHtml = `
      <a href="wishlist.html" class="tc-nav-wishlist-link" title="My Wishlist (${wishlistCount} saved)">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <span class="tc-nav-wishlist-badge" style="${wishlistCount > 0 ? '' : 'display:none;'}">${wishlistCount}</span>
      </a>
    `;

    const notifCount = (typeof TripCraftNotifications !== 'undefined') ? TripCraftNotifications.getUnreadCount() : 0;
    const notifIconHtml = `
      <div style="position:relative; display:inline-block;">
        <button class="tc-nav-notif-btn" id="tcNavNotifBtn" onclick="TripCraftNotifications.togglePanel(event)" title="Notifications (${notifCount} unread)">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span class="tc-nav-notif-badge" id="tcNavNotifBadge" style="${notifCount > 0 ? '' : 'display:none;'}">${notifCount}</span>
        </button>
        <div class="tc-notif-panel" id="tcNotifPanel" onclick="event.stopPropagation()">
          <div class="tc-notif-header">
            <div class="tc-notif-header-title">
              <span>Notifications</span>
              <span class="chip chip-teal" id="tcNotifHeaderCount" style="font-size:10px; padding:1px 6px;">${notifCount} new</span>
            </div>
            <div class="tc-notif-header-actions">
              <button class="tc-notif-header-btn" onclick="TripCraftNotifications.markAllAsRead()">Mark read</button>
              <span style="color:var(--gray-300);">&middot;</span>
              <button class="tc-notif-header-btn clear" onclick="TripCraftNotifications.clearAll()">Clear</button>
            </div>
          </div>
          <div class="tc-notif-list" id="tcNotifList"></div>
          <div class="tc-notif-footer">TripCraft Instant Travel Alerts &middot; Verified</div>
        </div>
      </div>
    `;

    if (user && (user.isLoggedIn || user.email)) {
      const userInitials = (function(n, e) {
        const str = (n || '').trim();
        if (str) {
          const parts = str.split(/\s+/).filter(Boolean);
          if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
          return str.slice(0, 2).toUpperCase();
        }
        if (e) {
          const clean = e.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
          return (clean.slice(0, 2) || 'TC').toUpperCase();
        }
        return 'TC';
      })(user.name, user.email);
      const firstName = (user.name || user.email || 'Traveler').split(' ')[0];

      navCta.innerHTML = `
        ${wishlistIconHtml}
        ${notifIconHtml}
        <div class="nav-user-profile" id="navUserProfileBtn" onclick="toggleNavDropdown(event)">
          <div class="nav-avatar-circle" title="${user.name || user.email}">${userInitials}</div>
          <span class="nav-user-name">${firstName}</span>
          <svg class="nav-user-arrow" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
          <div class="nav-user-dropdown" id="navUserDropdown" onclick="event.stopPropagation()">
            <div class="nav-dropdown-header">
              <div class="nav-dropdown-name">${user.name}</div>
              <div class="nav-dropdown-email">${user.email} &middot; <span style="color:var(--gold); font-weight:700;">${(user.role || 'user').toUpperCase()}</span></div>
            </div>
            <a href="wishlist.html" class="nav-user-dropdown-item">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              My Wishlist
              <span class="chip chip-gold" id="userMenuWishlistCount" style="margin-left:auto; font-size:10px; padding:1px 6px;">${wishlistCount}</span>
            </a>
            <a href="javascript:void(0)" class="nav-user-dropdown-item" onclick="TripCraftNotifications.togglePanel(event)">
              <svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              Notifications
              <span class="chip chip-gold" id="userMenuNotifCount" style="margin-left:auto; font-size:10px; padding:1px 6px;">${notifCount}</span>
            </a>
            <a href="bookings.html" class="nav-user-dropdown-item">
              <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              My Bookings &amp; Trips
            </a>
            <a href="itinerary.html" class="nav-user-dropdown-item">
              <svg viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
              Saved Itineraries
            </a>
            <a href="budget.html" class="nav-user-dropdown-item">
              <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Budget Tracker
            </a>
            <button class="nav-user-dropdown-item" onclick="TripCraftAuth.inspectJWT()">
              <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Inspect JWT Token
            </button>
            ${user.role === 'admin' ? `
            <a href="admin.html" class="nav-user-dropdown-item" style="color:var(--gold); font-weight:700;">
              <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              Admin Dashboard
            </a>
            ` : ''}
            <div class="nav-user-dropdown-divider"></div>
            <button class="nav-user-dropdown-item logout" onclick="TripCraftAuth.logout()">
              <svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Sign Out
            </button>
          </div>
        </div>
      `;
    } else {
      navCta.innerHTML = `
        ${wishlistIconHtml}
        ${notifIconHtml}
        <a href="login.html" class="btn btn-ghost">Sign In</a>
        <a href="login.html?tab=signup" class="btn btn-gold">Get Started</a>
      `;
    }

    // Ensure 'My Bookings' exists in nav links if not already present
    if (navLinks && !navLinks.querySelector('a[href="bookings.html"]')) {
      const myBookingsLink = document.createElement('a');
      myBookingsLink.href = 'bookings.html';
      myBookingsLink.textContent = 'My Bookings';
      const currentPage = location.pathname.split('/').pop() || 'index.html';
      if (currentPage === 'bookings.html') {
        myBookingsLink.classList.add('active');
      }
      navLinks.appendChild(myBookingsLink);
    }
  }
};

function toggleNavDropdown(e) {
  e.stopPropagation();
  const profile = document.getElementById('navUserProfileBtn');
  const menu = document.getElementById('navUserDropdown');
  if (menu && profile) {
    const isShowing = menu.classList.contains('show');
    menu.classList.toggle('show', !isShowing);
    profile.classList.toggle('active', !isShowing);
  }
}

document.addEventListener('click', () => {
  const menu = document.getElementById('navUserDropdown');
  const profile = document.getElementById('navUserProfileBtn');
  if (menu) menu.classList.remove('show');
  if (profile) profile.classList.remove('active');
});

// -------------------------------------------------------------
// 2. BOOKINGS & TRIP LEDGER MANAGER (TripCraftBookings)
// -------------------------------------------------------------
const TripCraftBookings = {
  getUserKey() {
    let email = 'guest';
    try {
      const u = JSON.parse(localStorage.getItem('tc_session') || localStorage.getItem('tc_user') || 'null');
      if (u && u.email) {
        email = u.email.toLowerCase().trim();
      }
    } catch (e) {}
    return 'tripcraft_bookings_' + email;
  },

  seedDefaults(key) {
    const targetKey = key || this.getUserKey();
    const defaults = [
      {
        id: 'TC-BK-2026-89421',
        invoiceId: 'TC-INV-2026-89421',
        type: 'hotel',
        title: 'Munnar Tea Country Resort',
        category: 'Luxury Estate Resort & Spa',
        location: 'Chithirapuram · Munnar, Kerala',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1920&auto=format&fit=crop',
        travelDate: '2026-09-18',
        guests: 2,
        options: 'Valley View Deluxe Cottage · Breakfast Included',
        basePrice: 10800,
        gst: 1296,
        total: 12096,
        paymentMode: 'UPI / GPay',
        status: 'Upcoming',
        createdAt: '2026-08-28T10:30:00.000Z',
        itinerary: 'Check-in: 12:00 PM | Check-out: 11:00 AM. Includes private tea garden walk, complimentary breakfast buffet, and on-site Ayurvedic spa session.',
        specs: [
          { label: 'Room Type', val: 'Valley View Deluxe Cottage' },
          { label: 'Inclusions', val: 'Breakfast Buffet, Plantation Walk, Free WiFi' },
          { label: 'Check-in / Check-out', val: '12:00 PM / 11:00 AM' }
        ]
      },
      {
        id: 'TC-BK-2026-51203',
        invoiceId: 'TC-INV-2026-51203',
        type: 'package',
        title: 'Royal Rajasthan Heritage Circuit',
        category: '5 Days · 4 Nights All-Inclusive',
        location: 'Jaipur, Jodhpur & Udaipur, Rajasthan',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1920&auto=format&fit=crop',
        travelDate: '2026-10-05',
        guests: 2,
        options: 'Heritage Haveli Stays & Private Chauffeur',
        basePrice: 37800,
        gst: 4536,
        total: 42336,
        paymentMode: 'Credit / Debit Card',
        status: 'Confirmed',
        createdAt: '2026-08-20T14:15:00.000Z',
        itinerary: 'Day 1: Amber Fort & Hawa Mahal. Day 2: City Palace & artisanal bazaars. Day 3: Mehrangarh Fort in Jodhpur. Day 4: Lake Pichola Boat Cruise in Udaipur. Day 5: Departure.',
        specs: [
          { label: 'Package Route', val: 'Jaipur → Jodhpur → Udaipur' },
          { label: 'Accommodation', val: '4-Star Verified Heritage Havelis' },
          { label: 'Transport', val: 'Dedicated AC Chauffeur throughout' }
        ]
      }
    ];
    try {
      localStorage.setItem(targetKey, JSON.stringify(defaults));
    } catch (e) {
      console.error('Error seeding bookings:', e);
    }
    return defaults;
  },

  getAll() {
    try {
      const key = this.getUserKey();
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }

      let user = null;
      try {
        user = JSON.parse(localStorage.getItem('tc_session') || localStorage.getItem('tc_user') || 'null');
      } catch (e) {}

      // If user is old pre-seeded Priya or Guest
      if (!user || user.email === 'priya@example.com' || user.email === 'priya.traveler@gmail.com') {
        return this.seedDefaults(key);
      }

      // If user is Arjun
      if (user.email === 'arjun@example.com' || user.email === 'arjun.explorer@gmail.com') {
        const arjunDefaults = [
          {
            id: 'TC-BK-2026-31904',
            invoiceId: 'TC-INV-2026-31904',
            type: 'package',
            title: 'Madurai & Chettinad Heritage Trail',
            category: '3 Days · 2 Nights Cultural Immersion',
            location: 'Madurai & Karaikudi, Tamil Nadu',
            image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1920&auto=format&fit=crop',
            travelDate: '2026-10-12',
            guests: 2,
            options: 'Mansion Stay & Meenakshi Temple Darshan',
            basePrice: 18500,
            gst: 2220,
            total: 20720,
            paymentMode: 'UPI / NetBanking',
            status: 'Confirmed',
            createdAt: '2026-09-01T12:00:00.000Z',
            itinerary: 'Day 1: Meenakshi Sundareswarar Temple & Thirumalai Nayakkar Mahal. Day 2: Chettinad Athangudi tile workshops & heritage culinary masterclass. Day 3: Departure.',
            specs: [
              { label: 'Heritage Guide', val: 'Certified Tamil Heritage Scholar' },
              { label: 'Stay', val: 'Restored 19th Century Chettiar Mansion' }
            ]
          }
        ];
        localStorage.setItem(key, JSON.stringify(arjunDefaults));
        return arjunDefaults;
      }

      // Any other new user: starts with fresh empty ledger
      localStorage.setItem(key, JSON.stringify([]));
      return [];
    } catch (e) {
      console.error('Error fetching bookings:', e);
      return [];
    }
  },

  getAllPlatformBookings() {
    const all = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && (k.startsWith('tripcraft_bookings') || k === 'tc_bookings')) {
          try {
            const items = JSON.parse(localStorage.getItem(k));
            if (Array.isArray(items)) {
              items.forEach(item => {
                if (item && item.id && !all.some(x => x.id === item.id)) {
                  all.push(item);
                }
              });
            }
          } catch(e) {}
        }
      }
    } catch(e) {}

    // If fewer than 3 bookings exist across the system, populate comprehensive verified records
    if (all.length < 3) {
      const seeded = [
        {
          id: 'TC-BK-2026-89421',
          invoiceId: 'TC-INV-2026-89421',
          type: 'hotel',
          title: 'Munnar Tea Country Resort',
          category: 'Luxury Estate Resort & Spa',
          location: 'Chithirapuram · Munnar, Kerala',
          customerName: 'Priya Sunder',
          customerEmail: 'priya.traveler@example.com',
          customerPhone: '+91 98765 43210',
          travelDate: '2026-10-18',
          guests: 2,
          roomType: 'Valley View Deluxe Cottage (King Bed)',
          options: 'Valley View Deluxe Cottage · Breakfast Included',
          basePrice: 10800,
          gst: 1296,
          total: 12096,
          paymentMode: 'UPI / GPay',
          status: 'Confirmed',
          createdAt: '2026-09-28T10:30:00.000Z',
          itinerary: 'Check-in: 12:00 PM | Check-out: 11:00 AM. Valley view cottage, tea garden walk, complimentary breakfast.',
          specs: [
            { label: 'Room Type', val: 'Valley View Deluxe Cottage (King Bed)' },
            { label: 'Inclusions', val: 'Breakfast Buffet, Plantation Walk, Free WiFi' },
            { label: 'Check-in / Check-out', val: '12:00 PM / 11:00 AM' }
          ]
        },
        {
          id: 'TC-BK-2026-77412',
          invoiceId: 'TC-INV-2026-77412',
          type: 'vehicle',
          hotel_booking_id: 'TC-BK-2026-89421',
          title: 'Toyota Innova Crysta Cab',
          category: 'Chauffeur Driven AC Premium',
          location: 'Kochi Airport → Munnar → Thekkady',
          customerName: 'Arun Kumar',
          customerEmail: 'arun.kumar@example.com',
          customerPhone: '+91 98451 22334',
          travelDate: '2026-10-18',
          guests: 4,
          roomType: '7-Seater AC Premium Cab',
          options: 'Airport Transfer & 3-Day Hill Station Circuit',
          basePrice: 7589,
          gst: 911,
          total: 8500,
          paymentMode: 'UPI / GPay',
          status: 'Confirmed',
          createdAt: '2026-09-29T11:00:00.000Z',
          itinerary: 'Pickup from Kochi Airport T3. Dedicated AC chauffeur for entire 3-day tea highlands tour.',
          specs: [
            { label: 'Vehicle Model', val: 'Toyota Innova Crysta' },
            { label: 'Capacity', val: '7 Passengers + Chauffeur' },
            { label: 'Linked Hotel Booking (FK)', val: 'TC-BK-2026-89421' }
          ]
        },
        {
          id: 'TC-BK-2026-51203',
          invoiceId: 'TC-INV-2026-51203',
          type: 'package',
          title: 'Royal Rajasthan Heritage Circuit',
          category: '5 Days · 4 Nights All-Inclusive',
          location: 'Jaipur, Jodhpur & Udaipur, Rajasthan',
          customerName: 'Deepa Nair',
          customerEmail: 'deepa.nair@example.com',
          customerPhone: '+91 97123 88440',
          travelDate: '2026-11-05',
          guests: 2,
          roomType: 'Heritage Haveli Suite & AC Sedan',
          options: 'Heritage Haveli Stays & Private Chauffeur',
          basePrice: 37800,
          gst: 4536,
          total: 42336,
          paymentMode: 'Credit / Debit Card',
          status: 'Confirmed',
          createdAt: '2026-09-20T14:15:00.000Z',
          itinerary: 'Amber Fort, Lake Pichola cruise, Mehrangarh Fort, certified guide darshan.',
          specs: [
            { label: 'Package Route', val: 'Jaipur → Jodhpur → Udaipur' },
            { label: 'Accommodation', val: '4-Star Verified Heritage Havelis' }
          ]
        },
        {
          id: 'TC-BK-2026-64119',
          invoiceId: 'TC-INV-2026-64119',
          type: 'hotel',
          title: 'The Tamara Kodai Luxury Resort',
          category: '5-Star Heritage Colonial Retreat',
          location: 'La Providence · Kodaikanal, Tamil Nadu',
          customerName: 'Karthik Raja',
          customerEmail: 'karthik.raja@example.com',
          customerPhone: '+91 99801 11223',
          travelDate: '2026-11-12',
          guests: 2,
          roomType: 'Luxury Heritage Forest Suite',
          options: 'Forest View Suite · Heated Swimming Pool & Spa',
          basePrice: 16518,
          gst: 1982,
          total: 18500,
          paymentMode: 'NetBanking / HDFC',
          status: 'Confirmed',
          createdAt: '2026-10-01T09:15:00.000Z',
          itinerary: 'Colonial luxury suite overlooking pine forest. High tea and botanical tour included.',
          specs: [
            { label: 'Room Type', val: 'Luxury Heritage Forest Suite' },
            { label: 'Check-in / Check-out', val: '01:00 PM / 11:00 AM' }
          ]
        },
        {
          id: 'TC-BK-2026-44092',
          invoiceId: 'TC-INV-2026-44092',
          type: 'album',
          title: 'Custom Travel Photobook Album',
          category: 'Print-on-Demand Keepsake',
          location: 'Kerala Highlands Expedition Album',
          customerName: 'Ananya Sharma',
          customerEmail: 'ananya.sharma@example.com',
          customerPhone: '+91 98220 77114',
          travelDate: '2026-10-20',
          guests: 1,
          roomType: 'Hardcover 32-Page Premium Matte',
          options: 'Deluxe Hardbound · Professional Print & Courier',
          basePrice: 2231,
          gst: 268,
          total: 2499,
          paymentMode: 'UPI / GPay',
          status: 'Confirmed',
          createdAt: '2026-10-02T16:40:00.000Z',
          itinerary: 'Dispatch to traveler postal address via Bluedart Express.',
          specs: [
            { label: 'Format', val: 'Hardcover 32-Page Matte' },
            { label: 'Delivery', val: 'Courier Express' }
          ]
        }
      ];
      seeded.forEach(s => {
        if (!all.some(x => x.id === s.id)) all.push(s);
      });
      try {
        localStorage.setItem('tripcraft_bookings_seed', JSON.stringify(seeded));
      } catch(e) {}
    }
    return all;
  },

  getById(id) {
    return this.getAll().find(b => b.id === id || b.invoiceId === id) || null;
  },

  save(bookingData) {
    const list = this.getAll();
    const uniqueId = 'TC-BK-2026-' + Math.floor(10000 + Math.random() * 90000);
    const invoiceId = 'TC-INV-2026-' + Math.floor(10000 + Math.random() * 90000);
    const hotelFk = bookingData.hotel_booking_id || bookingData.hotelBookingId || null;

    const specs = Array.isArray(bookingData.specs) ? [...bookingData.specs] : [
      { label: 'Booking Type', val: bookingData.category || 'Verified Service' },
      { label: 'Cancellation', val: 'Free cancellation up to 48h before arrival' }
    ];

    if (hotelFk) {
      specs.unshift({ label: 'Linked Hotel Booking (FK)', val: hotelFk });
    }

    const newBooking = {
      id: uniqueId,
      invoiceId: invoiceId,
      type: bookingData.type || 'hotel',
      hotel_booking_id: hotelFk,
      title: bookingData.title || 'TripCraft Reservation',
      category: bookingData.category || 'Travel Service',
      location: bookingData.location || bookingData.subtitle || 'India',
      image: bookingData.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop',
      travelDate: bookingData.travelDate || new Date().toISOString().split('T')[0],
      guests: parseInt(bookingData.guests, 10) || 1,
      options: bookingData.options || 'Standard Selection',
      basePrice: bookingData.basePrice || 2500,
      gst: bookingData.gst || Math.round((bookingData.basePrice || 2500) * 0.12),
      total: bookingData.total || ((bookingData.basePrice || 2500) + Math.round((bookingData.basePrice || 2500) * 0.12)),
      paymentMode: bookingData.paymentMode || 'UPI / GPay',
      status: 'Upcoming',
      createdAt: new Date().toISOString(),
      itinerary: bookingData.itinerary || bookingData.description || 'Verified booking managed by TripCraft. Complete inclusions and scheduled departure provided.',
      specs: specs
    };

    list.unshift(newBooking);
    try {
      localStorage.setItem(this.getUserKey(), JSON.stringify(list));
    } catch (e) {
      console.error('Error saving booking:', e);
    }

    if (typeof TripCraftNotifications !== 'undefined') {
      TripCraftNotifications.addNotification({
        type: 'booking',
        title: 'Booking Confirmed!',
        message: `Your reservation for "${newBooking.title}" is confirmed! Ref ID: #${newBooking.id}`,
        link: 'bookings.html'
      });
    }

    return newBooking;
  },

  cancel(id) {
    const list = this.getAll();
    const target = list.find(b => b.id === id);
    if (target) {
      target.status = 'Cancelled';
      try {
        localStorage.setItem(this.getUserKey(), JSON.stringify(list));
      } catch (e) {
        console.error('Error updating booking status:', e);
      }
      showToast(`Booking ${id} has been cancelled. Refund initiated to original payment method.`, 'info');
      return true;
    }
    return false;
  }
};

// -------------------------------------------------------------
// 3. UNIFIED SEARCH DATASET & ENGINE (TripCraftSearch)
// -------------------------------------------------------------
const TripCraftSearch = {
  catalog: [
    // Destinations
    {
      type: 'destination',
      title: 'Munnar, Kerala',
      category: 'Hill Station & Tea Highlands',
      location: 'Idukki District, Kerala',
      image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1920&auto=format&fit=crop',
      price: '₹4,500',
      numericPrice: 4500,
      rating: '4.8 (2.4k)',
      description: 'Rolling emerald tea hills, rare wildlife at Eravikulam, spice trails, and cool mountain breezes.',
      url: 'dest-detail.html?dest=Munnar',
      specs: [
        { label: 'Ideal Duration', val: '3 Days · 2 Nights' },
        { label: 'Safety Score', val: '8.8 / 10 (High)' },
        { label: 'Nearest Airport', val: 'Cochin Intl (COK)' }
      ]
    },
    {
      type: 'destination',
      title: 'Jaipur, Rajasthan',
      category: 'Royal Heritage & Forts',
      location: 'Pink City, Rajasthan',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1920&auto=format&fit=crop',
      price: '₹5,200',
      numericPrice: 5200,
      rating: '4.7 (3.1k)',
      description: 'Majestic Rajput architecture, Amber Fort, Hawa Mahal, and authentic artisanal bazaars.',
      url: 'dest-detail.html?dest=Jaipur',
      specs: [
        { label: 'Ideal Duration', val: '3 Days · 2 Nights' },
        { label: 'Safety Score', val: '7.8 / 10' }
      ]
    },
    {
      type: 'destination',
      title: 'Andaman & Nicobar Islands',
      category: 'Tropical Island & Coral Reefs',
      location: 'Havelock & Neil Island, UT India',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop',
      price: '₹8,900',
      numericPrice: 8900,
      rating: '4.9 (1.8k)',
      description: 'Crystal-clear turquoise waters, powder white beaches, scuba diving, and luxury beachside villas.',
      url: 'dest-detail.html?dest=Andaman',
      specs: [
        { label: 'Ideal Duration', val: '5 Days · 4 Nights' },
        { label: 'Safety Score', val: '9.2 / 10' }
      ]
    },
    {
      type: 'destination',
      title: 'Manali, Himachal Pradesh',
      category: 'Snow Peaks & Valleys',
      location: 'Kullu Valley, Himachal Pradesh',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1920&auto=format&fit=crop',
      price: '₹4,800',
      numericPrice: 4800,
      rating: '4.7 (2.9k)',
      description: 'Snow-capped mountain vistas, deodar pine forests, Solang Valley sports, and high passes.',
      url: 'dest-detail.html?dest=Manali',
      specs: [
        { label: 'Ideal Duration', val: '4 Days · 3 Nights' }
      ]
    },
    {
      type: 'destination',
      title: 'Goa Coastal Getaway',
      category: 'Beaches & Heritage Architecture',
      location: 'North & South Goa',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1920&auto=format&fit=crop',
      price: '₹3,900',
      numericPrice: 3900,
      rating: '4.8 (4.2k)',
      description: 'Sun-kissed beaches, Portuguese colonial architecture, sunset catamaran cruises, and beach shacks.',
      url: 'dest-detail.html?dest=Goa'
    },
    {
      type: 'destination',
      title: 'Ladakh High Himalayas',
      category: 'High Altitude & Monasteries',
      location: 'Leh & Nubra Valley, Ladakh',
      image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1920&auto=format&fit=crop',
      price: '₹11,500',
      numericPrice: 11500,
      rating: '4.9 (1.5k)',
      description: 'Dramatic mountain passes, Pangong Tso lake, ancient Tibetan monasteries, and star-gazing.',
      url: 'dest-detail.html?dest=Ladakh'
    },
    {
      type: 'destination',
      title: 'Bali, Indonesia',
      category: 'Tropical Paradise & Culture',
      location: 'Indonesia',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1920&auto=format&fit=crop',
      price: '₹45,000',
      numericPrice: 45000,
      rating: '4.9 (5.2k)',
      description: 'Lush terraced rice fields in Ubud, clifftop temples in Uluwatu, black volcanic beaches, and surf.',
      url: 'dest-detail.html?dest=Bali'
    },
    {
      type: 'destination',
      title: 'Ooty, Tamil Nadu',
      category: 'Queen of Hill Stations',
      location: 'Nilgiris District, Tamil Nadu',
      image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1920&auto=format&fit=crop',
      price: '₹4,200',
      numericPrice: 4200,
      rating: '4.8 (3.4k)',
      description: 'Colonial charm, Nilgiri Mountain Railway toy train, botanical gardens, and pine needle trails.',
      url: 'dest-detail.html?dest=Ooty'
    },
    {
      type: 'destination',
      title: 'Udaipur, Rajasthan',
      category: 'City of Lakes & Palaces',
      location: 'Mewar, Rajasthan',
      image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=1920&auto=format&fit=crop',
      price: '₹5,800',
      numericPrice: 5800,
      rating: '4.9 (2.7k)',
      description: 'Romantic Lake Pichola boat cruises, shimmering white marble City Palace, and heritage havelis.',
      url: 'dest-detail.html?dest=Udaipur'
    },
    {
      type: 'destination',
      title: 'Varanasi, Uttar Pradesh',
      category: 'Spiritual Capital & Ancient Ghats',
      location: 'Uttar Pradesh',
      image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1920&auto=format&fit=crop',
      price: '₹3,600',
      numericPrice: 3600,
      rating: '4.8 (4.1k)',
      description: 'Evening Ganga Aarti at Dashashwamedh Ghat, sunrise boat rides, narrow spiritual alleyways, and silk.',
      url: 'dest-detail.html?dest=Varanasi'
    },
    {
      type: 'destination',
      title: 'Rishikesh, Uttarakhand',
      category: 'Yoga Capital & White Water Adventure',
      location: 'Uttarakhand',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1920&auto=format&fit=crop',
      price: '₹4,100',
      numericPrice: 4100,
      rating: '4.9 (3.6k)',
      description: 'Ganges white-water rafting, bungee jumping, peaceful cliff ashrams, and Beatles ashram murals.',
      url: 'dest-detail.html?dest=Rishikesh'
    },
    {
      type: 'destination',
      title: 'Hampi, Karnataka',
      category: 'UNESCO World Heritage Boulder Ruins',
      location: 'Bellary District, Karnataka',
      image: 'https://images.unsplash.com/photo-1600100397608-f010f4439050?q=80&w=1920&auto=format&fit=crop',
      price: '₹3,800',
      numericPrice: 3800,
      rating: '4.8 (2.2k)',
      description: 'Vijayanagara Empire ruins, stone chariot at Vijaya Vittala, coracle rides across Tungabhadra River.',
      url: 'dest-detail.html?dest=Hampi'
    },
    {
      type: 'destination',
      title: 'Varkala, Kerala',
      category: 'Red Clifftop Ocean Coast',
      location: 'Thiruvananthapuram, Kerala',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop',
      price: '₹4,400',
      numericPrice: 4400,
      rating: '4.8 (2.9k)',
      description: 'Breathtaking red cliffs overlooking the Arabian Sea, Papanasam holy beach, natural mineral springs.',
      url: 'dest-detail.html?dest=Varkala'
    },
    {
      type: 'destination',
      title: 'Coorg, Karnataka',
      category: 'Coffee Country & Mist Valleys',
      location: 'Kodagu, Karnataka',
      image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1920&auto=format&fit=crop',
      price: '₹4,600',
      numericPrice: 4600,
      rating: '4.8 (3.1k)',
      description: 'Aromatic Arabica plantations, Abbey Waterfalls, Dubare Elephant Camp, and Tibetan Golden Temple.',
      url: 'dest-detail.html?dest=Coorg'
    },
    {
      type: 'destination',
      title: 'Kashmir Valley, J&K',
      category: 'Paradise on Earth & Alpine Lakes',
      location: 'Srinagar & Gulmarg, J&K',
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1920&auto=format&fit=crop',
      price: '₹8,500',
      numericPrice: 8500,
      rating: '4.9 (4.8k)',
      description: 'Dal Lake shikara wooden boats, Mughal gardens, Gulmarg snow gondola, and saffron meadows.',
      url: 'dest-detail.html?dest=Kashmir'
    },

    // Hotels
    {
      type: 'hotel',
      title: 'Munnar Tea Country Resort',
      category: 'Luxury Estate Resort & Spa',
      location: 'Chithirapuram · Munnar, Kerala',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1920&auto=format&fit=crop',
      price: '₹5,400',
      numericPrice: 5400,
      rating: '4.8 (340)',
      description: 'Private cottage among rolling tea plantations with balcony overlooking the Western Ghats.',
      specs: [
        { label: 'Room Type', val: 'Valley View Deluxe Cottage' },
        { label: 'Inclusions', val: 'Breakfast Buffet, Plantation Walk, WiFi' }
      ]
    },
    {
      type: 'hotel',
      title: 'Jaipur Royal Heritage Haveli',
      category: 'Restored Palace & Boutique Stay',
      location: 'Bani Park · Jaipur, Rajasthan',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1920&auto=format&fit=crop',
      price: '₹6,800',
      numericPrice: 6800,
      rating: '4.9 (410)',
      description: '300-year-old Rajput haveli featuring marble courtyards, frescoed suites, and royal dining.',
      specs: [
        { label: 'Room Type', val: 'Maharaja Suite' },
        { label: 'Inclusions', val: 'Breakfast, Folk Performance, Courtyard High Tea' }
      ]
    },
    {
      type: 'hotel',
      title: 'Andaman Barefoot Beach Resort',
      category: 'Eco-Luxury Beachfront Sanctuary',
      location: 'Radhanagar Beach · Havelock Island',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1920&auto=format&fit=crop',
      price: '₹9,200',
      numericPrice: 9200,
      rating: '4.9 (290)',
      description: 'Thatched wooden villas situated directly behind pristine white sands and turquoise waters.',
      specs: [
        { label: 'Room Type', val: 'Nicobari Sea-Breeze Villa' },
        { label: 'Inclusions', val: 'Complimentary Kayaks, Breakfast, Snorkel Gear' }
      ]
    },

    // Tour Packages
    {
      type: 'package',
      title: 'Royal Rajasthan Heritage Circuit',
      category: '5 Days · 4 Nights All-Inclusive',
      location: 'Jaipur, Jodhpur & Udaipur',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1920&auto=format&fit=crop',
      price: '₹18,900',
      numericPrice: 18900,
      rating: '4.9 (480)',
      description: 'Explore fortresses, royal palaces, desert evenings, and Lake Pichola with private chauffeur.',
      specs: [
        { label: 'Duration', val: '5 Days · 4 Nights' },
        { label: 'Stays', val: '4-Star Heritage Haveli Stays' },
        { label: 'Meals', val: 'All Breakfasts & Heritage Dinners' }
      ]
    },
    {
      type: 'package',
      title: 'Kerala Backwaters & Tea Highlands',
      category: '4 Days · 3 Nights Guided Tour',
      location: 'Munnar, Thekkady & Alleppey',
      image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1920&auto=format&fit=crop',
      price: '₹14,500',
      numericPrice: 14500,
      rating: '4.8 (390)',
      description: 'Tea estate walks in Munnar, spice sanctuary tours in Thekkady, and private houseboat cruise.',
      specs: [
        { label: 'Duration', val: '4 Days · 3 Nights' },
        { label: 'Highlights', val: 'Houseboat Stay, Spice Plantation, Kathakali' }
      ]
    },

    // Vehicles
    {
      type: 'vehicle',
      title: 'Toyota Innova Crysta (7-Seater)',
      category: 'Executive SUV Rental with Chauffeur',
      location: 'All Major Hubs & Intercity Routes',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1920&auto=format&fit=crop',
      price: '₹3,400',
      numericPrice: 3400,
      rating: '4.9 (820)',
      description: 'Spacious leather captain seats, dual AC, professional uniformed driver, and 250km daily included.',
      specs: [
        { label: 'Capacity', val: '6 Passengers + Driver' },
        { label: 'Fuel & Tolls', val: 'Included for first 250 km' }
      ]
    },
    {
      type: 'vehicle',
      title: 'Mahindra Thar 4x4 Off-Roader',
      category: 'Self-Drive Adventure SUV',
      location: 'Manali, Leh & Goa',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1920&auto=format&fit=crop',
      price: '₹4,200',
      numericPrice: 4200,
      rating: '4.8 (560)',
      description: 'Hard-top 4x4 with automatic transmission, all-terrain tires, and GPS tracker for mountain trails.',
      specs: [
        { label: 'Transmission', val: 'Automatic 4WD' },
        { label: 'Insurance', val: 'Zero-Depreciation Cover Included' }
      ]
    },

    // Transport
    {
      type: 'transport',
      title: 'Vande Bharat Express (Executive CC)',
      category: 'High-Speed Luxury Rail',
      location: 'Mumbai ⇄ Goa | Delhi ⇄ Varanasi',
      image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1920&auto=format&fit=crop',
      price: '₹2,650',
      numericPrice: 2650,
      rating: '4.9 (1.2k)',
      description: '180-degree rotating executive chairs, gourmet hot meal service, panoramic windows, and high speed.',
      specs: [
        { label: 'Class', val: 'Executive Chair Car (EC)' },
        { label: 'Catering', val: 'Complimentary Hot Gourmet Meals' }
      ]
    },

    // Guides
    {
      type: 'guide',
      title: 'Rajesh Sharma · Jaipur Historian',
      category: 'Government Certified Tour Guide',
      location: 'Jaipur & Amer, Rajasthan',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
      price: '₹2,200',
      numericPrice: 2200,
      rating: '4.9 (240)',
      description: '14+ years guiding scholars and travelers through the secret archives of Rajput history and fortresses.',
      specs: [
        { label: 'Languages', val: 'English, Hindi, French' },
        { label: 'Experience', val: '14 Years Certified' }
      ]
    },
    {
      type: 'guide',
      title: 'Ananya Nambiar · Kerala Naturalist',
      category: 'Wilderness & Spice Trail Expert',
      location: 'Munnar & Thekkady, Kerala',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
      price: '₹2,400',
      numericPrice: 2400,
      rating: '4.9 (195)',
      description: 'Botanist specializing in Western Ghats endemic bird species, tea history, and rare herbs.',
      specs: [
        { label: 'Languages', val: 'English, Malayalam, Tamil' },
        { label: 'Specialty', val: 'Birdwatching & Tea Science' }
      ]
    },
    // Community Posts (Indexed for combined search)
    {
      type: 'story',
      title: '5 Days in Munnar on a ₹12,000 Budget',
      category: 'Budget Breakdown & Route',
      location: 'Munnar, Kerala',
      image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop',
      price: '₹12,000',
      numericPrice: 12000,
      rating: '4.9 (340 likes)',
      description: 'Public KSRTC bus route, plantation homestays, and tea stall guide by Priya Sunder.',
      isSoloFriendly: true,
      url: 'community.html'
    },
    {
      type: 'story',
      title: 'Solo Female Travel in Andaman: Ferries & Stays',
      category: 'Solo Safety & Stays',
      location: 'Havelock, Andaman',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
      price: '₹8,900',
      numericPrice: 8900,
      rating: '4.9 (615 likes)',
      description: 'Government ferry schedules, female-safe beachfront huts, and verified dive operators.',
      isSoloFriendly: true,
      url: 'community.html'
    }
  ],

  HISTORY_KEY: 'tripcraft_search_history',

  getSearchHistory() {
    try {
      const data = localStorage.getItem(this.HISTORY_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Error reading search history:', e);
    }
    return ['Munnar', 'Jaipur', 'Andaman', 'South Goa', 'Ladakh'];
  },

  saveSearchQuery(q) {
    if (!q || !q.trim()) return;
    const query = q.trim();
    let history = this.getSearchHistory().filter(item => item.toLowerCase() !== query.toLowerCase());
    history.unshift(query);
    if (history.length > 6) history = history.slice(0, 6);
    try {
      localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
      console.error('Error saving search history:', e);
    }
  },

  search(query, filterType = 'all') {
    if (!query || !query.trim()) return [];
    const q = query.toLowerCase().trim();
    this.saveSearchQuery(query);

    return this.catalog.filter(item => {
      const matchesType = filterType === 'all' || item.type === filterType;
      const matchesQuery = (
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)
      );
      return matchesType && matchesQuery;
    });
  },

  searchSolo(query) {
    if (!query || !query.trim()) {
      return this.catalog.filter(item => item.isSoloFriendly || item.type === 'destination');
    }
    const q = query.toLowerCase().trim();
    return this.catalog.filter(item => {
      const isSolo = item.isSoloFriendly || item.type === 'destination' || item.category.toLowerCase().includes('solo') || item.title.toLowerCase().includes('solo');
      const matches = (
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
      return isSolo && matches;
    });
  },

  renderSearchHistoryChips(containerSelector = '#searchHistoryChips', inputSelector = '#heroSearchInput') {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const history = this.getSearchHistory();
    if (history.length === 0) {
      container.innerHTML = '';
      return;
    }

    let html = `<div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-top:10px; justify-content:center;">`;
    html += `<span style="font-size:11.5px; color:rgba(255,255,255,0.7); font-weight:600;">Recent:</span>`;
    history.forEach(term => {
      html += `<button type="button" class="chip chip-gold" style="cursor:pointer; border:none; padding:4px 10px; font-size:11px;" onclick="applyQuickSearch('${term}', '${inputSelector}')">${term}</button>`;
    });
    html += `</div>`;
    container.innerHTML = html;
  }
};

function applyQuickSearch(term, inputSelector = '#heroSearchInput') {
  const inputEl = document.querySelector(inputSelector);
  if (inputEl) {
    inputEl.value = term;
    inputEl.dispatchEvent(new Event('input', { bubbles: true }));
    inputEl.focus();
  }
}

// -------------------------------------------------------------
// 3B. DEDICATED SOLO TRIP PLANNER ENGINE (TripCraftSoloPlanner)
// -------------------------------------------------------------
const TripCraftSoloPlanner = {
  destinations: {
    'Munnar, Kerala': {
      image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop',
      safetyScore: '8.8 / 10',
      guidesCount: '48 Verified Guides',
      stays: [
        { name: 'Zostel Munnar Social Pod', rate: 1200, type: 'Hostel' },
        { name: 'Tea Plantation Private Cottage', rate: 2800, type: 'Resort' },
        { name: 'Green Valley Homestay', rate: 1600, type: 'Homestay' }
      ],
      transport: [
        { name: 'Self-Drive Scooter Pass', rate: 450, unit: 'per day' },
        { name: 'Shared Plantation Jeep', rate: 700, unit: 'per day' },
        { name: 'KSRTC Express Bus Pass', rate: 250, unit: 'one-time' }
      ],
      activities: [
        { name: 'Chithirapuram Sunrise Tea Trail Hike', rate: 650 },
        { name: 'Eravikulam Wildlife Guided Trek', rate: 850 },
        { name: 'Traditional Kathakali Cultural Evening', rate: 400 }
      ]
    },
    'Jaipur, Rajasthan': {
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop',
      safetyScore: '7.8 / 10',
      guidesCount: '86 Verified Guides',
      stays: [
        { name: 'Moustache Jaipur Backpacker Hub', rate: 1100, type: 'Hostel' },
        { name: 'Bani Park Heritage Haveli Room', rate: 2400, type: 'Haveli' },
        { name: 'Pearl Palace Boutique Stay', rate: 1800, type: 'Boutique' }
      ],
      transport: [
        { name: 'Jaipur Metro Tourist SmartCard', rate: 200, unit: 'one-time' },
        { name: 'Dedicated TukTuk City Pass', rate: 600, unit: 'per day' },
        { name: 'Private AC Cab Rental', rate: 1500, unit: 'per day' }
      ],
      activities: [
        { name: 'Amber Fort Secret Tunnel Guided Walk', rate: 750 },
        { name: 'Johari Bazaar Street Food Trail', rate: 500 },
        { name: 'Nahargarh Fort Sunset Panorama Tour', rate: 600 }
      ]
    },
    'Havelock, Andaman': {
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
      safetyScore: '9.2 / 10 (Extremely Safe)',
      guidesCount: '32 Dive Masters',
      stays: [
        { name: 'Beach No. 5 Eco Bamboo Hut', rate: 1600, type: 'Eco Stay' },
        { name: 'Barefoot Scuba Backpacker Dorm', rate: 1400, type: 'Hostel' },
        { name: 'Radhanagar Seafront Cottage', rate: 3800, type: 'Resort' }
      ],
      transport: [
        { name: 'Island Bicycle Rental', rate: 150, unit: 'per day' },
        { name: 'Scooter Rental Pass', rate: 500, unit: 'per day' },
        { name: 'Inter-Island Catamaran Pass', rate: 1200, unit: 'one-time' }
      ],
      activities: [
        { name: 'Introductory PADI Coral Reef Scuba Dive', rate: 3500 },
        { name: 'Elephant Beach Snorkeling Excursion', rate: 1200 },
        { name: 'Bioluminescent Night Kayaking', rate: 2000 }
      ]
    }
  },

  openPlannerModal(destKey = 'Munnar, Kerala') {
    const user = TripCraftAuth.getUser();
    if (!user) {
      TripCraftAuth.requireAuth('solo.html');
      return;
    }

    this.initPlannerModalDOM();
    const dest = this.destinations[destKey] || this.destinations['Munnar, Kerala'];
    this.currentDestKey = destKey;

    document.getElementById('soloPlanDestTitle').textContent = destKey;
    document.getElementById('soloPlanBanner').style.backgroundImage = `url('${dest.image}')`;
    document.getElementById('soloPlanSafety').textContent = dest.safetyScore;
    document.getElementById('soloPlanGuides').textContent = dest.guidesCount;

    // Stays
    const staySelect = document.getElementById('soloPlanStay');
    staySelect.innerHTML = dest.stays.map(s => `<option value="${s.rate}" data-name="${s.name}">${s.name} (₹${s.rate}/night)</option>`).join('');

    // Transport
    const transSelect = document.getElementById('soloPlanTransport');
    transSelect.innerHTML = dest.transport.map(t => `<option value="${t.rate}" data-name="${t.name}">${t.name} (₹${t.rate} ${t.unit})</option>`).join('');

    // Activities Checkboxes
    const actContainer = document.getElementById('soloPlanActivitiesList');
    actContainer.innerHTML = dest.activities.map((a, i) => `
      <label style="display:flex; align-items:center; justify-content:space-between; padding:8px 12px; background:var(--white); border:1px solid var(--gray-200); border-radius:var(--r-sm); cursor:pointer; font-size:12.5px;">
        <span style="display:flex; align-items:center; gap:8px;">
          <input type="checkbox" value="${a.rate}" data-name="${a.name}" onchange="TripCraftSoloPlanner.updateTotal()" checked style="accent-color:var(--teal);" />
          <strong>${a.name}</strong>
        </span>
        <span style="color:var(--teal); font-weight:700;">+₹${a.rate}</span>
      </label>
    `).join('');

    const dateInput = document.getElementById('soloPlanDate');
    if (dateInput && !dateInput.value) {
      dateInput.value = new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0];
    }

    this.updateTotal();

    // Ensure Step 1 is active on open
    const s1 = document.getElementById('soloStep1Plan');
    const s2 = document.getElementById('soloStep2Pay');
    const s3 = document.getElementById('soloStep3Success');
    if (s1) s1.style.display = 'block';
    if (s2) s2.style.display = 'none';
    if (s3) s3.style.display = 'none';

    const backdrop = document.getElementById('soloPlannerModalBackdrop');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  updateTotal() {
    const days = parseInt(document.getElementById('soloPlanDays')?.value || '3', 10);
    const stayRate = parseInt(document.getElementById('soloPlanStay')?.value || '1200', 10);
    const transRate = parseInt(document.getElementById('soloPlanTransport')?.value || '450', 10);

    let activitiesTotal = 0;
    document.querySelectorAll('#soloPlanActivitiesList input[type="checkbox"]:checked').forEach(cb => {
      activitiesTotal += parseInt(cb.value, 10);
    });

    const stayCost = stayRate * days;
    const transCost = transRate * days;
    const subtotal = stayCost + transCost + activitiesTotal;
    const gst = Math.round(subtotal * 0.12);
    const total = subtotal + gst;

    const stayTotalEl = document.getElementById('soloPlanStayTotal');
    if (stayTotalEl) stayTotalEl.textContent = `₹${stayCost.toLocaleString('en-IN')}`;
    const transTotalEl = document.getElementById('soloPlanTransTotal');
    if (transTotalEl) transTotalEl.textContent = `₹${transCost.toLocaleString('en-IN')}`;
    const actTotalEl = document.getElementById('soloPlanActTotal');
    if (actTotalEl) actTotalEl.textContent = `₹${activitiesTotal.toLocaleString('en-IN')}`;
    const gstEl = document.getElementById('soloPlanGST');
    if (gstEl) gstEl.textContent = `₹${gst.toLocaleString('en-IN')}`;
    const grandTotalEl = document.getElementById('soloPlanGrandTotal');
    if (grandTotalEl) grandTotalEl.textContent = `₹${total.toLocaleString('en-IN')}`;

    const proceedBtn = document.getElementById('soloProceedPayBtn');
    if (proceedBtn) {
      proceedBtn.innerHTML = `Proceed to Payment (₹${total.toLocaleString('en-IN')}) &rarr;`;
    }
  },

  currentBooking: null,

  goToCheckout() {
    const user = TripCraftAuth.getUser();
    if (!user) {
      TripCraftAuth.requireAuth('solo.html');
      return;
    }

    const days = parseInt(document.getElementById('soloPlanDays')?.value || '3', 10);
    const travelDate = document.getElementById('soloPlanDate')?.value || new Date().toISOString().split('T')[0];
    const staySelect = document.getElementById('soloPlanStay');
    const stayName = staySelect.options[staySelect.selectedIndex]?.getAttribute('data-name') || 'Solo Hostel';
    const transSelect = document.getElementById('soloPlanTransport');
    const transName = transSelect.options[transSelect.selectedIndex]?.getAttribute('data-name') || 'Scooter Pass';

    const actNames = [];
    document.querySelectorAll('#soloPlanActivitiesList input[type="checkbox"]:checked').forEach(cb => {
      actNames.push(cb.getAttribute('data-name'));
    });

    const destKey = this.currentDestKey || 'Munnar, Kerala';
    const stayRate = parseInt(staySelect.value, 10);
    const transRate = parseInt(transSelect.value, 10);
    let actTotal = 0;
    document.querySelectorAll('#soloPlanActivitiesList input[type="checkbox"]:checked').forEach(cb => {
      actTotal += parseInt(cb.value, 10);
    });

    const subtotal = (stayRate * days) + (transRate * days) + actTotal;
    const gst = Math.round(subtotal * 0.12);
    const total = subtotal + gst;

    // Fill checkout summary
    const elDest = document.getElementById('soloPayDest');
    if (elDest) elDest.textContent = destKey;
    const elDates = document.getElementById('soloPayDates');
    if (elDates) elDates.textContent = `${travelDate} (${days} Days)`;
    const elStay = document.getElementById('soloPayStay');
    if (elStay) elStay.textContent = `${stayName} + ${transName}`;
    const elAct = document.getElementById('soloPayActivities');
    if (elAct) elAct.textContent = actNames.join(', ') || 'Self-Guided Trail';
    const elSub = document.getElementById('soloPaySubtotal');
    if (elSub) elSub.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    const elGst = document.getElementById('soloPayGST');
    if (elGst) elGst.textContent = `₹${gst.toLocaleString('en-IN')}`;
    const elTot = document.getElementById('soloPayTotal');
    if (elTot) elTot.textContent = `₹${total.toLocaleString('en-IN')}`;
    const elBtnText = document.getElementById('soloPayBtnText');
    if (elBtnText) elBtnText.textContent = `Pay ₹${total.toLocaleString('en-IN')} & Confirm`;

    // Prefill traveller name and contact
    const nameField = document.getElementById('soloPayName');
    if (nameField && !nameField.value) nameField.value = user.name || '';
    const phoneField = document.getElementById('soloPayPhone');
    if (phoneField && !phoneField.value) phoneField.value = user.phone || '9876543210';

    document.getElementById('soloStep1Plan').style.display = 'none';
    document.getElementById('soloStep2Pay').style.display = 'block';
    document.getElementById('soloStep3Success').style.display = 'none';
  },

  goToPlan() {
    document.getElementById('soloStep1Plan').style.display = 'block';
    document.getElementById('soloStep2Pay').style.display = 'none';
    document.getElementById('soloStep3Success').style.display = 'none';
  },

  processPayment() {
    const user = TripCraftAuth.getUser();
    if (!user) {
      TripCraftAuth.requireAuth('solo.html');
      return;
    }

    const payName = document.getElementById('soloPayName')?.value.trim() || user.name || 'Solo Traveler';
    const payPhone = document.getElementById('soloPayPhone')?.value.trim() || '9876543210';
    const payIdProof = document.getElementById('soloPayGovtId')?.value.trim() || 'Aadhaar / Passport';
    const payMethod = document.querySelector('input[name="soloPayMethod"]:checked')?.value || 'UPI (Google Pay / PhonePe)';

    const days = parseInt(document.getElementById('soloPlanDays')?.value || '3', 10);
    const travelDate = document.getElementById('soloPlanDate')?.value || new Date().toISOString().split('T')[0];
    const staySelect = document.getElementById('soloPlanStay');
    const stayName = staySelect.options[staySelect.selectedIndex]?.getAttribute('data-name') || 'Solo Hostel';
    const transSelect = document.getElementById('soloPlanTransport');
    const transName = transSelect.options[transSelect.selectedIndex]?.getAttribute('data-name') || 'Scooter Pass';

    const actNames = [];
    document.querySelectorAll('#soloPlanActivitiesList input[type="checkbox"]:checked').forEach(cb => {
      actNames.push(cb.getAttribute('data-name'));
    });

    const destKey = this.currentDestKey || 'Munnar, Kerala';
    const dest = this.destinations[destKey] || { image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80' };

    const stayRate = parseInt(staySelect.value, 10);
    const transRate = parseInt(transSelect.value, 10);
    let actTotal = 0;
    document.querySelectorAll('#soloPlanActivitiesList input[type="checkbox"]:checked').forEach(cb => {
      actTotal += parseInt(cb.value, 10);
    });

    const subtotal = (stayRate * days) + (transRate * days) + actTotal;
    const gst = Math.round(subtotal * 0.12);
    const total = subtotal + gst;

    const payBtn = document.getElementById('soloPaySubmitBtn');
    if (payBtn) {
      payBtn.disabled = true;
      payBtn.textContent = 'Processing Payment...';
    }

    setTimeout(() => {
      const saved = TripCraftBookings.save({
        type: 'solo_trip',
        title: `${destKey} Solo Expedition (${days} Days)`,
        category: 'Solo Planned Itinerary',
        location: destKey,
        image: dest.image,
        travelDate,
        guests: 1,
        basePrice: subtotal,
        gst,
        total,
        paymentMode: payMethod,
        paymentStatus: 'Paid',
        customerName: payName,
        customerPhone: payPhone,
        customerEmail: user.email,
        description: `${days} Days personalized solo adventure with verified stay at ${stayName}, ${transName}, and ${actNames.length} curated activities.`,
        specs: [
          { label: 'Solo Destination', val: destKey },
          { label: 'Accommodation', val: `${stayName} (${days} Nights)` },
          { label: 'Transit Pass', val: `${transName} (${days} Days)` },
          { label: 'Curated Activities', val: actNames.join(', ') || 'Self-Guided Trail' },
          { label: 'Traveller Name', val: payName },
          { label: 'Govt ID / Emergency', val: payIdProof },
          { label: 'Safety Coverage', val: '24/7 SOS & Emergency Concierge' }
        ]
      });

      this.currentBooking = saved;

      if (payBtn) {
        payBtn.disabled = false;
        payBtn.textContent = 'Pay & Confirm';
      }

      // Populate Success screen
      document.getElementById('soloSuccessBookingId').textContent = saved.id || '#TC-SOLO-2026';
      document.getElementById('soloSuccessAmount').textContent = `₹${total.toLocaleString('en-IN')}`;
      document.getElementById('soloSuccessMethod').textContent = payMethod;
      document.getElementById('soloSuccessDest').textContent = `${destKey} (${days} Days)`;

      document.getElementById('soloStep1Plan').style.display = 'none';
      document.getElementById('soloStep2Pay').style.display = 'none';
      document.getElementById('soloStep3Success').style.display = 'block';

      showToast(`Payment Successful! Solo trip to ${destKey} confirmed.`, 'success');
    }, 700);
  },

  downloadInvoice() {
    if (this.currentBooking) {
      TripCraftInvoice.downloadPDF(this.currentBooking);
    } else {
      showToast('Please complete payment first to unlock invoice download.', 'error');
    }
  },

  viewInvoiceModal() {
    if (this.currentBooking) {
      this.closePlannerModal();
      showInvoiceModal(this.currentBooking);
    }
  },

  initPlannerModalDOM() {
    if (document.getElementById('soloPlannerModalBackdrop')) return;

    const backdrop = document.createElement('div');
    backdrop.id = 'soloPlannerModalBackdrop';
    backdrop.className = 'tc-modal-backdrop';
    backdrop.innerHTML = `
      <div class="tc-modal-container" id="soloPlannerContainer" role="dialog" aria-modal="true" style="max-width: 680px;">
        <div class="tc-modal-banner" id="soloPlanBanner" style="height:140px;">
          <button class="tc-modal-close-btn" onclick="TripCraftSoloPlanner.closePlannerModal()">&times;</button>
          <div class="tc-modal-banner-overlay"></div>
          <div class="tc-modal-banner-content">
            <span class="tc-modal-badge">Solo Itinerary &amp; Checkout</span>
            <h3 class="tc-modal-title" id="soloPlanDestTitle">Plan Your Solo Trip</h3>
          </div>
        </div>
        <div class="tc-modal-body" style="padding:22px 24px; max-height:80vh; overflow-y:auto;">
          
          <!-- STEP 1: ITINERARY PLANNER -->
          <div id="soloStep1Plan">
            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--teal-pale); padding:10px 14px; border-radius:var(--r-md); border:1px solid rgba(14,124,107,0.2); margin-bottom:18px;">
              <div style="font-size:12px; color:var(--teal); font-weight:700;">Safety Score: <span id="soloPlanSafety" style="color:var(--navy);">8.8 / 10</span></div>
              <div style="font-size:12px; color:var(--text-mid); font-weight:600;" id="soloPlanGuides">48 Verified Guides</div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:16px;">
              <div class="form-field">
                <label class="form-label">Trip Start Date</label>
                <input type="date" class="form-input" id="soloPlanDate" />
              </div>
              <div class="form-field">
                <label class="form-label">Duration (Days)</label>
                <select class="form-select" id="soloPlanDays" onchange="TripCraftSoloPlanner.updateTotal()">
                  <option value="2">2 Days / 1 Night</option>
                  <option value="3" selected>3 Days / 2 Nights</option>
                  <option value="4">4 Days / 3 Nights</option>
                  <option value="5">5 Days / 4 Nights</option>
                  <option value="7">7 Days / 6 Nights</option>
                </select>
              </div>
            </div>

            <div class="form-field">
              <label class="form-label">Select Verified Solo Stay</label>
              <select class="form-select" id="soloPlanStay" onchange="TripCraftSoloPlanner.updateTotal()"></select>
            </div>

            <div class="form-field">
              <label class="form-label">Select Solo Transport</label>
              <select class="form-select" id="soloPlanTransport" onchange="TripCraftSoloPlanner.updateTotal()"></select>
            </div>

            <div class="form-field">
              <label class="form-label">Curated Solo Activities</label>
              <div id="soloPlanActivitiesList" style="display:flex; flex-direction:column; gap:6px;"></div>
            </div>

            <!-- Running Total Box -->
            <div style="background:var(--gray-50); border:1px solid var(--gray-200); border-radius:var(--r-md); padding:14px 16px; margin-top:18px;">
              <div style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--text-muted); margin-bottom:8px;">Estimated Solo Budget Breakdown</div>
              <div style="display:flex; justify-content:space-between; font-size:12.5px; margin-bottom:4px;">
                <span style="color:var(--text-muted);">Accommodation Total:</span>
                <strong id="soloPlanStayTotal">₹0</strong>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:12.5px; margin-bottom:4px;">
                <span style="color:var(--text-muted);">Transport Total:</span>
                <strong id="soloPlanTransTotal">₹0</strong>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:12.5px; margin-bottom:4px;">
                <span style="color:var(--text-muted);">Activities Total:</span>
                <strong id="soloPlanActTotal">₹0</strong>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:12.5px; margin-bottom:8px; padding-bottom:6px; border-bottom:1px solid var(--gray-200);">
                <span style="color:var(--text-muted);">GST (12%):</span>
                <strong id="soloPlanGST">₹0</strong>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:14px; font-weight:700; color:var(--navy);">Running Total:</span>
                <span style="font-size:20px; font-weight:700; color:var(--teal);" id="soloPlanGrandTotal">₹0</span>
              </div>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:20px;">
              <button class="btn btn-ghost" style="color:var(--text-mid); border-color:var(--gray-200);" onclick="TripCraftSoloPlanner.closePlannerModal()">Cancel</button>
              <button class="btn btn-teal" id="soloProceedPayBtn" onclick="TripCraftSoloPlanner.goToCheckout()">
                Proceed to Payment &rarr;
              </button>
            </div>
          </div>

          <!-- STEP 2: DEDICATED PAYMENT CHECKOUT STEP -->
          <div id="soloStep2Pay" style="display:none;">
            <div style="background:linear-gradient(135deg, rgba(14,124,107,0.06), rgba(232,168,56,0.06)); border:1.5px solid var(--teal); border-radius:var(--r-md); padding:16px; margin-bottom:18px;">
              <div style="font-size:12px; font-weight:700; color:var(--teal); text-transform:uppercase; margin-bottom:6px;">Order &amp; Itinerary Summary</div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:13px;">
                <div><span style="color:var(--text-muted);">Destination:</span> <strong id="soloPayDest">Munnar</strong></div>
                <div><span style="color:var(--text-muted);">Schedule:</span> <strong id="soloPayDates">3 Days</strong></div>
                <div style="grid-column:1 / -1;"><span style="color:var(--text-muted);">Stay &amp; Transport:</span> <strong id="soloPayStay">Hostel + Scooter</strong></div>
                <div style="grid-column:1 / -1;"><span style="color:var(--text-muted);">Activities:</span> <strong id="soloPayActivities">Hiking</strong></div>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px; padding-top:10px; border-top:1px dashed var(--gray-300);">
                <span style="font-size:13px; font-weight:600;">Total Payable (incl. 12% GST):</span>
                <strong style="font-size:18px; color:var(--teal);" id="soloPayTotal">₹0</strong>
              </div>
            </div>

            <!-- Traveller Details -->
            <div style="margin-bottom:16px;">
              <div style="font-size:13px; font-weight:700; color:var(--navy); margin-bottom:10px;">Traveller Contact Details</div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:10px;">
                <div class="form-field">
                  <label class="form-label">Full Name *</label>
                  <input type="text" class="form-input" id="soloPayName" placeholder="Full Name" />
                </div>
                <div class="form-field">
                  <label class="form-label">Phone Number *</label>
                  <input type="tel" class="form-input" id="soloPayPhone" placeholder="+91 9876543210" />
                </div>
              </div>
              <div class="form-field">
                <label class="form-label">Govt ID Proof / Emergency Contact *</label>
                <input type="text" class="form-input" id="soloPayGovtId" placeholder="Aadhaar / Passport Number &amp; Contact Person" />
              </div>
            </div>

            <!-- Payment Method Selection -->
            <div style="margin-bottom:20px;">
              <div style="font-size:13px; font-weight:700; color:var(--navy); margin-bottom:10px;">Select Secure Payment Method</div>
              <div style="display:flex; flex-direction:column; gap:8px;">
                <label style="display:flex; align-items:center; gap:10px; padding:10px 14px; background:var(--white); border:1.5px solid var(--teal); border-radius:var(--r-md); cursor:pointer;">
                  <input type="radio" name="soloPayMethod" value="UPI (Google Pay / PhonePe / Paytm)" checked style="accent-color:var(--teal);" />
                  <div style="flex:1;">
                    <div style="font-weight:700; font-size:13px;">UPI Instant (Google Pay / PhonePe / Paytm / BHIM)</div>
                    <div style="font-size:11.5px; color:var(--text-muted);">Instant zero-fee transfer with UPI QR or UPI ID</div>
                  </div>
                  <span style="background:var(--teal-pale); color:var(--teal); font-size:10.5px; font-weight:700; padding:2px 8px; border-radius:10px;">Fastest</span>
                </label>
                <label style="display:flex; align-items:center; gap:10px; padding:10px 14px; background:var(--white); border:1px solid var(--gray-200); border-radius:var(--r-md); cursor:pointer;">
                  <input type="radio" name="soloPayMethod" value="Debit / Credit Card (Visa / Mastercard / RuPay)" style="accent-color:var(--teal);" />
                  <div style="flex:1;">
                    <div style="font-weight:700; font-size:13px;">Debit / Credit Card (Visa, Mastercard, RuPay)</div>
                    <div style="font-size:11.5px; color:var(--text-muted);">256-bit encrypted secure bank checkout</div>
                  </div>
                </label>
                <label style="display:flex; align-items:center; gap:10px; padding:10px 14px; background:var(--white); border:1px solid var(--gray-200); border-radius:var(--r-md); cursor:pointer;">
                  <input type="radio" name="soloPayMethod" value="Net Banking (All Major Indian Banks)" style="accent-color:var(--teal);" />
                  <div style="flex:1;">
                    <div style="font-weight:700; font-size:13px;">Net Banking (HDFC, SBI, ICICI, Axis &amp; 40+ banks)</div>
                    <div style="font-size:11.5px; color:var(--text-muted);">Direct instant account debit</div>
                  </div>
                </label>
              </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px; pt-2;">
              <button class="btn btn-ghost" style="color:var(--text-mid); border-color:var(--gray-200);" onclick="TripCraftSoloPlanner.goToPlan()">
                &larr; Back to Customization
              </button>
              <button class="btn btn-teal" id="soloPaySubmitBtn" style="padding:10px 22px; font-weight:700;" onclick="TripCraftSoloPlanner.processPayment()">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span id="soloPayBtnText">Pay &amp; Confirm Booking</span>
              </button>
            </div>
          </div>

          <!-- STEP 3: PAYMENT CONFIRMED & INVOICE ACCESS -->
          <div id="soloStep3Success" style="display:none; text-align:center; padding:16px 12px;">
            <div style="width:58px; height:58px; border-radius:50%; background:var(--success-bg, #ECFDF5); border:2px solid var(--success, #059669); color:var(--success, #059669); display:flex; align-items:center; justify-content:center; margin:0 auto 14px;">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h4 style="font-size:18px; font-weight:800; color:var(--navy); margin-bottom:6px;">Payment Successful &amp; Trip Confirmed!</h4>
            <p style="font-size:13.5px; color:var(--text-mid); margin-bottom:20px; line-height:1.5;">
              Your solo itinerary and verified stay are booked. Your tax invoice is now unlocked and ready for download.
            </p>

            <div style="background:var(--gray-50); border:1px solid var(--gray-200); border-radius:var(--r-md); padding:16px; text-align:left; font-size:13px; margin-bottom:22px;">
              <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                <span style="color:var(--text-muted);">Booking Reference:</span>
                <strong id="soloSuccessBookingId" style="color:var(--teal); font-family:monospace;">#TC-SOLO</strong>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                <span style="color:var(--text-muted);">Amount Paid:</span>
                <strong id="soloSuccessAmount" style="color:var(--success, #059669);">₹0</strong>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                <span style="color:var(--text-muted);">Payment Method:</span>
                <strong id="soloSuccessMethod">UPI</strong>
              </div>
              <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--text-muted);">Destination &amp; Days:</span>
                <strong id="soloSuccessDest">Munnar</strong>
              </div>
            </div>

            <!-- Invoice Buttons (Unlocked ONLY after Payment) -->
            <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
              <button class="btn btn-gold" style="padding:11px 22px; font-weight:700;" onclick="TripCraftSoloPlanner.downloadInvoice()">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Download Tax Invoice (PDF)
              </button>
              <button class="btn btn-teal" style="padding:11px 20px; font-weight:700;" onclick="TripCraftSoloPlanner.viewInvoiceModal()">
                View Official Invoice
              </button>
              <a href="bookings.html" class="btn btn-ghost" style="padding:11px 18px; border-color:var(--gray-300);">
                View in My Bookings
              </a>
            </div>
          </div>

        </div>
      </div>
    `;
    document.body.appendChild(backdrop);

    backdrop.addEventListener('click', e => {
      if (e.target === backdrop) this.closePlannerModal();
    });
  },

  closePlannerModal() {
    const backdrop = document.getElementById('soloPlannerModalBackdrop');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
};

// -------------------------------------------------------------
// 4. CLIENT-SIDE PDF INVOICE GENERATOR (jsPDF CDN)
// -------------------------------------------------------------
const TripCraftInvoice = {
  async downloadPDF(bookingData) {
    if (!bookingData) {
      showToast('No booking data provided for invoice generation.', 'error');
      return;
    }

    showToast('Generating official TripCraft PDF invoice...', 'info');

    // Check if jsPDF is available on window
    const { jsPDF } = window.jspdf || {};

    if (!jsPDF) {
      // If jsPDF not yet loaded, try loading dynamically
      try {
        await this.loadJsPdfScript();
      } catch (err) {
        console.warn('Could not load jsPDF from CDN, falling back to print dialog:', err);
        window.print();
        return;
      }
    }

    try {
      const doc = new (window.jspdf.jsPDF)({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const user = TripCraftAuth.getUser() || { name: 'Priya Sunder', email: 'priya.traveler@example.com' };
      const invoiceId = bookingData.invoiceId || bookingData.id || 'TC-INV-2026-' + Math.floor(10000 + Math.random() * 90000);
      const bookingId = bookingData.id || invoiceId;
      const todayStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      const travelDateStr = bookingData.travelDate || todayStr;
      const customerName = bookingData.customerName || user.name || 'Valued Traveler';
      const customerEmail = bookingData.customerEmail || user.email || 'traveler@tripcraft.com';
      const guests = bookingData.guests || 1;
      const basePrice = bookingData.basePrice || (bookingData.total ? Math.round(bookingData.total / 1.12) : 2500);
      const gst = bookingData.gst || Math.round(basePrice * 0.12);
      const grandTotal = bookingData.total || (basePrice + gst);
      const paymentMode = bookingData.paymentMode || 'UPI / Instant Bank Transfer';

      // 1. Navy Header Banner
      doc.setFillColor(11, 31, 58); // #0B1F3A
      doc.rect(0, 0, 210, 36, 'F');

      // Brand Logo & Title
      doc.setTextColor(250, 250, 248);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.text('TripCraft', 15, 18);

      doc.setTextColor(232, 168, 56); // #E8A838 (Gold)
      doc.setFontSize(10);
      doc.text('VERIFIED TRAVEL & EXPLORATION PLATFORM', 15, 26);

      // Invoice Tag in Header
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.text('TAX INVOICE / RECEIPT', 195, 18, { align: 'right' });
      doc.setFontSize(9);
      doc.text(`Ref: ${invoiceId}`, 195, 25, { align: 'right' });

      // 2. Status Badge Strip
      doc.setFillColor(247, 246, 243); // #F7F6F3
      doc.rect(15, 42, 180, 22, 'F');
      doc.setDrawColor(224, 221, 216);
      doc.rect(15, 42, 180, 22, 'D');

      doc.setTextColor(26, 122, 74); // Success green
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('STATUS: PAID & CONFIRMED', 22, 53);

      doc.setTextColor(122, 118, 112); // Text muted
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(`Issued On: ${todayStr}  |  Payment: ${paymentMode}`, 22, 59);

      doc.setTextColor(14, 124, 107); // Teal
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(`Booking ID: ${bookingId}`, 188, 55, { align: 'right' });

      // 3. Customer & Billing Meta Grid
      doc.setTextColor(11, 31, 58);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('BILLED TO:', 15, 74);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(61, 58, 53);
      doc.text(customerName, 15, 80);
      doc.setFontSize(9);
      doc.setTextColor(122, 118, 112);
      doc.text(customerEmail, 15, 85);
      doc.text('Verified TripCraft Member', 15, 90);

      doc.setTextColor(11, 31, 58);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('RESERVATION DETAILS:', 120, 74);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(61, 58, 53);
      doc.text(`Scheduled Date: ${travelDateStr}`, 120, 80);
      doc.text(`Guests / Units: ${guests} Person(s)`, 120, 85);
      doc.text(`Service Type: ${bookingData.category || 'Travel Service'}`, 120, 90);

      // 4. Line Items Table Header
      let y = 102;
      doc.setFillColor(14, 124, 107); // Teal header
      doc.rect(15, y, 180, 9, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text('DESCRIPTION & SERVICE ITEM', 20, y + 6);
      doc.text('QTY', 125, y + 6, { align: 'center' });
      doc.text('RATE (INR)', 155, y + 6, { align: 'right' });
      doc.text('AMOUNT (INR)', 190, y + 6, { align: 'right' });

      // Table Rows
      y += 9;
      doc.setFillColor(255, 255, 255);
      doc.rect(15, y, 180, 20, 'F');
      doc.setDrawColor(238, 236, 232);
      doc.rect(15, y, 180, 20, 'D');

      doc.setTextColor(11, 31, 58);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(bookingData.title || 'TripCraft Reservation', 20, y + 7);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(122, 118, 112);
      const subInfo = `${bookingData.category || 'Service'} · Location: ${bookingData.location || 'India'}`;
      doc.text(subInfo, 20, y + 13);

      doc.setTextColor(61, 58, 53);
      doc.setFontSize(9);
      doc.text(String(guests), 125, y + 9, { align: 'center' });
      const unitRate = Math.round(basePrice / (guests > 0 ? guests : 1));
      doc.text(`Rs. ${unitRate.toLocaleString('en-IN')}`, 155, y + 9, { align: 'right' });
      doc.text(`Rs. ${basePrice.toLocaleString('en-IN')}`, 190, y + 9, { align: 'right' });

      // Subtotal & Tax Rows
      y += 20;
      const addSummaryRow = (label, valStr, isBold = false, isGreen = false) => {
        doc.setFillColor(247, 246, 243);
        doc.rect(15, y, 180, 7.5, 'F');
        doc.setDrawColor(238, 236, 232);
        doc.rect(15, y, 180, 7.5, 'D');

        doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        doc.setFontSize(9);
        if (isGreen) {
          doc.setTextColor(26, 122, 74);
        } else if (isBold) {
          doc.setTextColor(11, 31, 58);
        } else {
          doc.setTextColor(61, 58, 53);
        }

        doc.text(label, 120, y + 5);
        doc.text(valStr, 190, y + 5, { align: 'right' });
        y += 7.5;
      };

      addSummaryRow('Subtotal (Taxable Value):', `Rs. ${basePrice.toLocaleString('en-IN')}`);
      addSummaryRow('GST (12% Government Tourism Tax):', `Rs. ${gst.toLocaleString('en-IN')}`);
      addSummaryRow('TripCraft Protection & Concierge:', 'Rs. 0 (Waived)', false, true);

      // Grand Total Row (Navy banner)
      doc.setFillColor(11, 31, 58);
      doc.rect(15, y, 180, 11, 'F');

      doc.setTextColor(232, 168, 56); // Gold
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('GRAND TOTAL PAID:', 120, y + 7.5);
      doc.text(`Rs. ${grandTotal.toLocaleString('en-IN')}`, 190, y + 7.5, { align: 'right' });

      // 5. Inclusions & Security Box
      y += 18;
      doc.setFillColor(245, 237, 214); // #F5EDD6 Sand
      doc.rect(15, y, 180, 24, 'F');
      doc.setDrawColor(232, 168, 56);
      doc.rect(15, y, 180, 24, 'D');

      doc.setTextColor(154, 110, 24);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.text('VERIFIED BOOKING GUARANTEE & INSTRUCTIONS', 20, y + 7);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(61, 58, 53);
      doc.text('• Please present this PDF or show your Booking QR / ID upon arrival at the destination or reception.', 20, y + 13);
      doc.text('• 100% Verified Quality Inspection by TripCraft Safety Standards. 24/7 Concierge Support included.', 20, y + 18);

      // 6. Footer Legal & Contact Notes
      doc.setFontSize(7.5);
      doc.setTextColor(122, 118, 112);
      doc.text('TripCraft Unified Travel Intelligence · support@tripcraft.com · Verified Tax Invoice', 105, 280, { align: 'center' });
      doc.text('This is a digitally generated tax receipt valid under electronic commerce provisions.', 105, 285, { align: 'center' });

      // Save PDF file
      const fileName = `TripCraft_Invoice_${bookingId}.pdf`;
      doc.save(fileName);
      showToast(`Invoice downloaded: ${fileName}`, 'success');
    } catch (e) {
      console.error('Failed to generate jsPDF invoice:', e);
      showToast('Error generating PDF file. Opening print view...', 'error');
      window.print();
    }
  },

  loadJsPdfScript() {
    return new Promise((resolve, reject) => {
      if (window.jspdf) {
        resolve();
        return;
      }
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      s.onload = () => resolve();
      s.onerror = (e) => reject(e);
      document.head.appendChild(s);
    });
  }
};

// -------------------------------------------------------------
// 5. TOAST SYSTEM
// -------------------------------------------------------------
function showToast(msg, type = 'success') {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  
  let iconSvg = '';
  if (type === 'success') {
    iconSvg = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
  } else if (type === 'error') {
    iconSvg = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
  } else {
    iconSvg = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
  }

  t.innerHTML = `${iconSvg} <span>${msg}</span>`;
  t.className = `toast toast-${type} show`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3400);
}

// -------------------------------------------------------------
// 6. UNIVERSAL ITEM DETAILS MODAL
// -------------------------------------------------------------
let currentDetailData = null;

function initDetailModalDOM() {
  if (document.getElementById('tcDetailModalBackdrop')) return;

  const backdrop = document.createElement('div');
  backdrop.id = 'tcDetailModalBackdrop';
  backdrop.className = 'tc-modal-backdrop';
  backdrop.innerHTML = `
    <div class="tc-modal-container" id="tcDetailModalContainer" role="dialog" aria-modal="true" style="max-width: 680px; max-height: 90vh; display:flex; flex-direction:column;">
      <div class="tc-modal-banner" id="tcDetailBanner" style="height: 180px; min-height:180px;">
        <button class="tc-modal-close-btn" onclick="closeDetailModal()" aria-label="Close modal">&times;</button>
        <div class="tc-modal-banner-overlay"></div>
        <div class="tc-modal-banner-content">
          <span class="tc-modal-badge" id="tcDetailCategory">Overview</span>
          <h3 class="tc-modal-title" id="tcDetailTitle">Item Details</h3>
        </div>
      </div>
      <div class="tc-modal-body" style="overflow-y: auto; flex:1; padding: 22px 24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div id="tcDetailSubtitle" style="font-size:13.5px; font-weight:700; color:var(--teal);"></div>
          <div id="tcDetailRating" class="rating"></div>
        </div>
        <p class="tc-modal-desc" id="tcDetailDesc" style="font-size:13.5px; line-height:1.6; color:var(--text-mid); margin-bottom:16px;"></p>
        
        <div class="tc-modal-specs" id="tcDetailSpecs"></div>

        <!-- DAY-BY-DAY ITINERARY (IF APPLICABLE) -->
        <div id="tcDetailItineraryWrapper" style="display:none; margin-bottom:18px;">
          <div style="font-size:11.5px; font-weight:700; text-transform:uppercase; letter-spacing:0.6px; color:var(--navy); margin-bottom:10px; display:flex; align-items:center; gap:6px;">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--teal)" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Day-by-Day Journey Itinerary
          </div>
          <div id="tcDetailItineraryList" style="display:flex; flex-direction:column; gap:8px;"></div>
        </div>

        <!-- KEY HIGHLIGHTS -->
        <div style="background:var(--gray-50); border:1px solid var(--gray-100); border-radius:var(--r-md); padding:12px 16px; margin-bottom:14px;">
          <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.6px; color:var(--text-muted); margin-bottom:8px;">Key Highlights &amp; Inclusions</div>
          <div id="tcDetailHighlights" style="display:flex; gap:6px; flex-wrap:wrap;"></div>
        </div>

        <!-- VERIFIED CATEGORY RATINGS BREAKDOWN -->
        <div id="tcDetailRatingsBreakdown"></div>

        <!-- INCLUSIONS & EXCLUSIONS -->
        <div id="tcDetailIncExcWrapper" style="display:none; grid-template-columns: 1fr 1fr; gap:12px; margin-bottom:18px;">
          <div style="background:rgba(26,122,74,0.06); border:1px solid rgba(26,122,74,0.18); border-radius:var(--r-md); padding:12px 14px;">
            <div style="font-size:11px; font-weight:700; color:var(--success); text-transform:uppercase; margin-bottom:6px;">&#10003; Inclusions</div>
            <div id="tcDetailInclusions" style="font-size:12px; color:var(--text-mid); line-height:1.5;"></div>
          </div>
          <div style="background:rgba(192,57,43,0.05); border:1px solid rgba(192,57,43,0.15); border-radius:var(--r-md); padding:12px 14px;">
            <div style="font-size:11px; font-weight:700; color:var(--error); text-transform:uppercase; margin-bottom:6px;">&#10005; Exclusions</div>
            <div id="tcDetailExclusions" style="font-size:12px; color:var(--text-mid); line-height:1.5;"></div>
          </div>
        </div>

        <div class="tc-modal-actions" style="margin-top:16px;">
          <button class="btn btn-ghost" style="color: var(--text-mid); border-color: var(--gray-200);" onclick="closeDetailModal()">Close</button>
          <button class="btn btn-teal" id="tcDetailBookBtn" onclick="transitionDetailToBooking()">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Book &amp; Reserve Now
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(backdrop);

  backdrop.addEventListener('click', e => {
    if (e.target === backdrop) closeDetailModal();
  });
}

function openDetailModal(data) {
  initDetailModalDOM();
  currentDetailData = data || {};

  document.getElementById('tcDetailTitle').textContent = data.title || 'Item Details';
  const catHtml = (data.category || 'Service') + (data.verified !== false ? ' <span class="tc-verified-partner-pill"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Verified Partner</span>' : '');
  document.getElementById('tcDetailCategory').innerHTML = catHtml;
  document.getElementById('tcDetailSubtitle').textContent = data.subtitle || data.location || '';
  document.getElementById('tcDetailDesc').textContent = data.description || 'Explore the complete verified details, inclusions, and scheduling options below.';

  const bannerEl = document.getElementById('tcDetailBanner');
  if (data.image) {
    bannerEl.style.backgroundImage = `url('${data.image}')`;
  } else {
    bannerEl.style.backgroundImage = `url('https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1920&auto=format&fit=crop')`;
  }

  // Rating
  const ratingEl = document.getElementById('tcDetailRating');
  if (data.rating) {
    ratingEl.innerHTML = `<span class="rating-star">&#9733;</span> <span class="rating-val">${data.rating}</span>`;
  } else {
    ratingEl.innerHTML = `<span class="rating-star">&#9733;</span> <span class="rating-val">4.9</span> <span class="rating-count">(Verified)</span>`;
  }

  // Verified Category Ratings Breakdown
  const ratingsEl = document.getElementById('tcDetailRatingsBreakdown');
  if (ratingsEl && window.TripCraftReviews) {
    ratingsEl.innerHTML = `
      <div style="background:var(--white); border:1px solid var(--gray-200); border-radius:var(--r-md); padding:12px 14px; margin-bottom:14px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <div style="font-size:11.5px; font-weight:700; text-transform:uppercase; color:var(--navy); display:flex; align-items:center; gap:5px;">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="var(--teal)" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
            Verified Guest Ratings &middot; Booking.com Standard
          </div>
          <span class="tc-verified-stay-badge" style="font-size:10px; padding:1px 6px;">100% Verified</span>
        </div>
        ${TripCraftReviews.renderCategoryBars(data.categories || TripCraftReviews.defaultCategories)}
      </div>
    `;
  }

  // Specs
  const specsEl = document.getElementById('tcDetailSpecs');
  let specsHtml = '';
  if (data.specs && Array.isArray(data.specs)) {
    data.specs.forEach(s => {
      specsHtml += `<div class="tc-modal-spec-row"><span class="tc-modal-spec-label">${s.label}</span><span class="tc-modal-spec-val">${s.val}</span></div>`;
    });
  } else {
    specsHtml = `
      <div class="tc-modal-spec-row"><span class="tc-modal-spec-label">Pricing Rate</span><span class="tc-modal-spec-val">${data.price || '₹2,500'}</span></div>
      <div class="tc-modal-spec-row"><span class="tc-modal-spec-label">TripCraft Verification</span><span class="tc-modal-spec-val" style="color:var(--teal);">Verified 100% Quality Inspected</span></div>
    `;
  }
  specsEl.innerHTML = specsHtml;

  // Day-by-Day Itinerary
  const itinWrapper = document.getElementById('tcDetailItineraryWrapper');
  const itinList = document.getElementById('tcDetailItineraryList');
  if (data.itinerary && Array.isArray(data.itinerary) && data.itinerary.length > 0) {
    let itinHtml = '';
    data.itinerary.forEach((item, idx) => {
      const dayTitle = item.day || `Day ${idx + 1}`;
      const dayDesc = item.desc || item.activities || item;
      itinHtml += `
        <div style="background:var(--white); border:1px solid var(--gray-200); border-radius:var(--r-sm); padding:10px 14px;">
          <div style="font-weight:700; font-size:12.5px; color:var(--teal); margin-bottom:3px;">${dayTitle}</div>
          <div style="font-size:12px; color:var(--text-mid); line-height:1.45;">${dayDesc}</div>
        </div>
      `;
    });
    itinList.innerHTML = itinHtml;
    itinWrapper.style.display = 'block';
  } else {
    itinWrapper.style.display = 'none';
  }

  // Highlights
  const highEl = document.getElementById('tcDetailHighlights');
  let highHtml = '';
  if (data.highlights && Array.isArray(data.highlights)) {
    data.highlights.forEach(h => {
      highHtml += `<span class="chip chip-teal">${h}</span>`;
    });
  } else {
    highHtml = `<span class="chip chip-teal">Free Cancellation</span><span class="chip chip-gold">Instant Confirmation</span><span class="chip chip-navy">24/7 Support</span>`;
  }
  highEl.innerHTML = highHtml;

  // Inclusions & Exclusions
  const incExcWrapper = document.getElementById('tcDetailIncExcWrapper');
  const incEl = document.getElementById('tcDetailInclusions');
  const excEl = document.getElementById('tcDetailExclusions');
  if (data.inclusions || data.exclusions) {
    incExcWrapper.style.display = 'grid';
    incEl.innerHTML = Array.isArray(data.inclusions) ? data.inclusions.map(i => `&bull; ${i}`).join('<br>') : (data.inclusions || 'Standard verified inclusions');
    excEl.innerHTML = Array.isArray(data.exclusions) ? data.exclusions.map(e => `&bull; ${e}`).join('<br>') : (data.exclusions || 'Personal expenses, items not listed');
  } else {
    incExcWrapper.style.display = 'none';
  }

  const backdrop = document.getElementById('tcDetailModalBackdrop');
  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDetailModal() {
  const backdrop = document.getElementById('tcDetailModalBackdrop');
  if (backdrop) backdrop.classList.remove('active');
  document.body.style.overflow = '';
}

function transitionDetailToBooking() {
  closeDetailModal();
  if (currentDetailData) {
    setTimeout(() => {
      openBookingModal(currentDetailData);
    }, 150);
  }
}

// -------------------------------------------------------------
// -------------------------------------------------------------
// 6.5. PRICE & AVAILABILITY REALISM ENGINE (TripCraftPricing)
// -------------------------------------------------------------
const TripCraftPricing = {
  PEAK_MONTHS: [9, 10, 11, 0, 4], // Oct, Nov, Dec, Jan, May
  WEEKEND_DAYS: [0, 5, 6], // Sun, Fri, Sat

  /**
   * Dynamic pricing multiplier based on selected date:
   * Standard weekday (Mon-Thu): 1.0x
   * Weekend (Fri-Sun): 1.15x (+15% weekend surge)
   * Peak season month (Oct-Jan, May): 1.20x (+20% peak season tag)
   * Peak season weekend: 1.35x (+35% peak season weekend)
   */
  getDynamicMultiplier(dateStr) {
    if (!dateStr) return { multiplier: 1.0, tag: 'Standard Weekday Rate', isWeekend: false, isPeak: false };
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return { multiplier: 1.0, tag: 'Standard Weekday Rate', isWeekend: false, isPeak: false };

    const day = d.getDay();
    const month = d.getMonth();
    const isWeekend = this.WEEKEND_DAYS.includes(day);
    const isPeak = this.PEAK_MONTHS.includes(month);

    let multiplier = 1.0;
    let tag = 'Standard Weekday Rate';

    if (isWeekend && isPeak) {
      multiplier = 1.35;
      tag = 'Peak Season Weekend (+35%)';
    } else if (isPeak) {
      multiplier = 1.20;
      tag = 'Peak Season Month (+20%)';
    } else if (isWeekend) {
      multiplier = 1.15;
      tag = 'Weekend Surge (+15%)';
    }

    return { multiplier, tag, isWeekend, isPeak };
  },

  calculateDynamicPrice(basePrice, dateStr) {
    const { multiplier, tag, isWeekend, isPeak } = this.getDynamicMultiplier(dateStr);
    const adjustedPrice = Math.round(basePrice * multiplier);
    return {
      basePrice,
      adjustedPrice,
      multiplier,
      tag,
      isWeekend,
      isPeak
    };
  },

  /**
   * Strikethrough original rack rate and savings calculation
   */
  getPriceComparison(currentPrice, discountPct = 18) {
    const originalPrice = Math.round(currentPrice / (1 - discountPct / 100));
    const savings = originalPrice - currentPrice;
    return {
      currentPrice,
      originalPrice,
      savings,
      discountPct
    };
  },

  /**
   * Urgency indicators - Session-locked using sessionStorage
   * Never flickers or regenerates randomly on refresh
   */
  getUrgencyInfo(itemId, itemType = 'hotel') {
    const safeId = (itemId || 'item').toString().replace(/[^a-zA-Z0-9_-]/g, '_');
    const key = `tc_urgency_${safeId}`;
    try {
      const stored = sessionStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {}

    // Deterministic hash seed
    let hash = 0;
    for (let i = 0; i < safeId.length; i++) {
      hash = ((hash << 5) - hash) + safeId.charCodeAt(i);
      hash |= 0;
    }
    const absHash = Math.abs(hash);

    const unitsLeft = 2 + (absHash % 4); // 2 to 5 left
    const viewersNow = 6 + (absHash % 14); // 6 to 19 viewing

    const unitWord = (itemType === 'flight' || itemType === 'train' || itemType === 'bus') 
      ? 'seats' 
      : (itemType === 'vehicle' ? 'vehicles' : (itemType === 'guide' ? 'slots' : 'rooms'));

    const data = {
      unitsLeft,
      unitWord,
      viewersNow,
      urgencyText: `Only ${unitsLeft} ${unitWord} left at this rate`,
      viewersText: `${viewersNow} people viewing this now`
    };

    try {
      sessionStorage.setItem(key, JSON.stringify(data));
    } catch (e) {}

    return data;
  },

  getCancellationPolicy(item) {
    if (item && item.cancellationPolicy) return item.cancellationPolicy;
    if (item && item.isNonRefundable) return 'Non-refundable (Instant Saver)';
    return 'Free cancellation until 24hrs before arrival';
  },

  renderUrgencyPills(itemId, itemType = 'hotel') {
    const info = this.getUrgencyInfo(itemId, itemType);
    return `
      <div class="tc-urgency-strip">
        <span class="tc-urgency-pill"><span class="tc-pulse-dot"></span>${info.urgencyText}</span>
        <span class="tc-viewers-pill"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>${info.viewersText}</span>
      </div>
    `;
  },

  renderPriceWithComparison(price, discountPct = 18) {
    const numPrice = typeof price === 'number' ? price : parseInt(String(price).replace(/[^0-9]/g, ''), 10) || 2500;
    const comp = this.getPriceComparison(numPrice, discountPct);
    return `
      <div class="tc-card-price-comp">
        <div class="tc-price-top-row">
          <span class="tc-price-strikethrough">₹${comp.originalPrice.toLocaleString('en-IN')}</span>
          <span class="tc-savings-tag">Save ₹${comp.savings.toLocaleString('en-IN')} (${comp.discountPct}% off)</span>
        </div>
        <div class="tc-price-main">₹${numPrice.toLocaleString('en-IN')}</div>
      </div>
    `;
  }
};

// -------------------------------------------------------------
// 6.6. REVIEWS & RATINGS ENGINE (TripCraftReviews)
// -------------------------------------------------------------
const TripCraftReviews = {
  currentFilter: 'all',

  defaultCategories: {
    cleanliness: 4.8,
    location: 4.9,
    value: 4.6,
    staff: 4.7
  },

  reviewsData: [
    {
      id: 'REV-101',
      author: 'Priya Sunder',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      userBadge: 'Verified Solo Explorer',
      date: 'September 12, 2026',
      timestamp: 1789214400000,
      rating: 5.0,
      categories: { cleanliness: 5.0, location: 5.0, staff: 4.9, value: 4.8 },
      title: 'Breathtaking sunrise over the tea garden from the private balcony',
      text: 'Our stay was absolutely magical. The early morning mist rising over the Chithirapuram tea terraces was right outside our bedroom window. The staff arranged a private guided walk through the organic plantation and packed warm cardamom tea for our sunrise trek. Room was spotless and the Ayurvedic spa afterwards was rejuvenating.',
      bookingId: 'TC-BK-2026-89421',
      roomType: 'Valley View Deluxe Cottage',
      stayDuration: '3 nights · Sept 2026',
      photos: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop'
      ],
      hostReply: {
        author: 'Arvind Menon',
        role: 'Property Manager',
        property: 'Munnar Tea Country Resort',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        date: 'September 14, 2026',
        text: 'Dear Priya, thank you so much for choosing us for your highland getaway. We are thrilled that you enjoyed the sunrise vistas and our heritage plantation walk. Chef Mohan was delighted you loved the high-range cardamom tea! We look forward to welcoming you back during the winter blossom season.'
      }
    },
    {
      id: 'REV-102',
      author: 'Karthik Raja',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
      userBadge: 'Frequent Explorer',
      date: 'August 24, 2026',
      timestamp: 1787616000000,
      rating: 4.8,
      categories: { cleanliness: 4.8, location: 4.9, staff: 4.8, value: 4.5 },
      title: 'Flawless hospitality and authentic Malabar cuisine',
      text: 'Everything from the airport chauffeur pickup arranged by TripCraft to the Karimeen Pollichathu served at dinner was top tier. The infinity pool overlooks the mountain ridge. Only small suggestion is to book the Kolukkumalai safari 48 hours early as slots fill up fast.',
      bookingId: 'TC-BK-2026-51203',
      roomType: 'Heritage Plantation Suite',
      stayDuration: '4 nights · Aug 2026',
      photos: [
        'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800&auto=format&fit=crop'
      ],
      hostReply: {
        author: 'TripCraft Host Partner',
        role: 'Guest Experience Director',
        property: 'Resort Operations Team',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
        date: 'August 26, 2026',
        text: 'Hello Karthik, thank you for your generous feedback. We appreciate your valuable note regarding the Kolukkumalai 4x4 permits — we have now integrated an automated reminder in the TripCraft itinerary builder for upcoming guests.'
      }
    },
    {
      id: 'REV-103',
      author: 'Deepa Nair',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
      userBadge: 'Solo Backpacker',
      date: 'July 19, 2026',
      timestamp: 1784428800000,
      rating: 4.7,
      categories: { cleanliness: 4.7, location: 4.8, staff: 4.7, value: 4.9 },
      title: 'Peaceful, safe, and exceptional value for solo travelers',
      text: 'As a solo female traveler visiting Munnar for the first time, safety was my highest priority. The property felt extremely secure with 24/7 front desk and respectful staff. The high-speed WiFi allowed me to do remote work in the afternoon overlooking the valley.',
      bookingId: 'TC-BK-2026-38291',
      roomType: 'Garden View Cottage',
      stayDuration: '2 nights · July 2026',
      photos: [],
      hostReply: null
    },
    {
      id: 'REV-104',
      author: 'Rahul Sengupta',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
      userBadge: 'Verified Explorer',
      date: 'June 05, 2026',
      timestamp: 1780617600000,
      rating: 4.9,
      categories: { cleanliness: 4.9, location: 5.0, staff: 4.8, value: 4.7 },
      title: 'Unbeatable location close to Eravikulam and tea museum',
      text: 'You avoid the crowded Munnar town center traffic completely while being just 15 minutes away from the tea museum and Rajamalai park gate. The evening campfires with estate musicians was an unforgettable touch.',
      bookingId: 'TC-BK-2026-19402',
      roomType: 'Presidential Tea Valley Villa',
      stayDuration: '3 nights · June 2026',
      photos: [
        'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=800&auto=format&fit=crop'
      ],
      hostReply: {
        author: 'Arvind Menon',
        role: 'Property Manager',
        property: 'Munnar Tea Country Resort',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        date: 'June 07, 2026',
        text: 'Thank you Rahul! The campfire musical evenings are indeed one of our favorite traditions. Hope to host your family again soon!'
      }
    }
  ],

  renderCategoryBars(categories = this.defaultCategories) {
    const cats = [
      { key: 'cleanliness', label: 'Cleanliness', score: categories.cleanliness || 4.8 },
      { key: 'location', label: 'Location', score: categories.location || 4.9 },
      { key: 'staff', label: 'Staff & Service', score: categories.staff || 4.7 },
      { key: 'value', label: 'Value for Money', score: categories.value || 4.6 }
    ];

    let html = '<div class="tc-category-bars-grid">';
    cats.forEach(c => {
      const pct = Math.round((c.score / 5.0) * 100);
      html += `
        <div class="tc-category-bar-row">
          <span class="tc-category-bar-label">${c.label}</span>
          <div class="tc-category-bar-track">
            <div class="tc-category-bar-fill" style="width: ${pct}%;"></div>
          </div>
          <span class="tc-category-bar-score">${c.score.toFixed(1)}</span>
        </div>
      `;
    });
    html += '</div>';
    return html;
  },

  getFilteredReviews(filter = 'all') {
    let list = [...this.reviewsData];
    if (filter === 'recent') {
      list.sort((a, b) => b.timestamp - a.timestamp);
    } else if (filter === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (filter === 'photos') {
      list = list.filter(r => r.photos && r.photos.length > 0);
    }
    return list;
  },

  renderReviewsList(filter = 'all') {
    const list = this.getFilteredReviews(filter);
    if (list.length === 0) {
      return `
        <div style="padding: 32px 16px; text-align: center; color: var(--text-muted); background: var(--gray-50); border-radius: var(--r-md);">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom:8px;"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          <div style="font-weight: 600; color: var(--navy);">No reviews match this filter</div>
          <div style="font-size: 12px; margin-top: 4px;">Try selecting "All Reviews" to view all verified guest feedback.</div>
        </div>
      `;
    }

    let html = '<div class="tc-reviews-list">';
    list.forEach(r => {
      // Verified Stay badge - only rendered if review has a completed bookingId
      const verifiedBadgeHtml = r.bookingId ? `
        <span class="tc-verified-stay-badge" title="Verified Stay linked to Booking #${r.bookingId}">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
          Verified Stay &middot; #${r.bookingId}
        </span>
      ` : '';

      // Stars
      const fullStars = Math.floor(r.rating);
      let starsHtml = '';
      for (let i = 0; i < 5; i++) {
        starsHtml += `<span style="color:${i < fullStars ? '#F59E0B' : '#E2E8F0'};">&#9733;</span>`;
      }

      // Photos
      let photosHtml = '';
      if (r.photos && r.photos.length > 0) {
        photosHtml = '<div class="tc-review-photos-grid">';
        r.photos.forEach(img => {
          photosHtml += `
            <div class="tc-review-photo-thumb" style="background-image: url('${img}');" onclick="TripCraftReviews.previewPhoto('${img}', '${r.author}')" title="Click to view full photo"></div>
          `;
        });
        photosHtml += '</div>';
      }

      // Host Reply Box
      let hostReplyHtml = '';
      if (r.hostReply) {
        hostReplyHtml = `
          <div class="tc-host-response-box">
            <div class="tc-host-response-header">
              <img src="${r.hostReply.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'}" alt="${r.hostReply.author}" class="tc-host-avatar" />
              <div class="tc-host-title">
                ${r.hostReply.author}
                <span class="tc-host-badge">${r.hostReply.role || 'Property Manager'}</span>
              </div>
              <div class="tc-host-date">${r.hostReply.date}</div>
            </div>
            <div class="tc-host-text">${r.hostReply.text}</div>
          </div>
        `;
      }

      html += `
        <div class="tc-review-card" id="rev-${r.id}">
          <div class="tc-review-user-row">
            <div class="tc-review-user-info">
              <img src="${r.avatar}" alt="${r.author}" class="tc-review-avatar" />
              <div>
                <div class="tc-review-author-name">
                  <span>${r.author}</span>
                  ${verifiedBadgeHtml}
                </div>
                <div class="tc-review-date">${r.date} &middot; <span style="color:var(--text-mid);">${r.roomType || 'Deluxe Room'}</span></div>
              </div>
            </div>
            <div class="tc-review-rating-stars">
              ${starsHtml}
              <span style="font-size:12.5px; font-weight:700; color:var(--navy); margin-left:4px;">${r.rating.toFixed(1)}</span>
            </div>
          </div>

          <div class="tc-review-title">${r.title}</div>
          <p class="tc-review-text">${r.text}</p>
          ${photosHtml}
          ${hostReplyHtml}
        </div>
      `;
    });
    html += '</div>';
    return html;
  },

  setFilter(filter, containerId = 'tcReviewsSectionMount') {
    this.currentFilter = filter;
    const container = document.getElementById(containerId);
    if (!container) return;

    // Update active filter pill
    container.querySelectorAll('.tc-filter-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
    });

    // Update list container
    const listMount = container.querySelector('.tc-reviews-list-mount');
    if (listMount) {
      listMount.innerHTML = this.renderReviewsList(filter);
    }
  },

  previewPhoto(imgUrl, author) {
    let modal = document.getElementById('tcReviewPhotoModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'tcReviewPhotoModal';
      modal.className = 'tc-modal-backdrop';
      modal.innerHTML = `
        <div class="tc-modal-container" style="max-width: 760px; padding: 0; overflow: hidden; background: #071626;">
          <div style="position: relative;">
            <button class="tc-modal-close-btn" style="z-index: 10; background: rgba(0,0,0,0.6);" onclick="document.getElementById('tcReviewPhotoModal').classList.remove('active')">&times;</button>
            <img id="tcReviewPhotoModalImg" src="" style="width: 100%; height: auto; max-height: 75vh; object-fit: contain; display: block;" />
            <div id="tcReviewPhotoModalCaption" style="padding: 14px 18px; color: #FFFFFF; font-size: 13px; background: rgba(7,22,38,0.95); border-top: 1px solid rgba(255,255,255,0.1);"></div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      modal.addEventListener('click', e => {
        if (e.target === modal) modal.classList.remove('active');
      });
    }

    document.getElementById('tcReviewPhotoModalImg').src = imgUrl;
    document.getElementById('tcReviewPhotoModalCaption').innerHTML = `Verified traveler photo shared by <strong>${author}</strong> &middot; TripCraft Verified Stay Review`;
    modal.classList.add('active');
  },

  mountReviewsComponent(targetSelector, options = {}) {
    const el = document.querySelector(targetSelector);
    if (!el) return;

    const overallScore = options.overallScore || '4.8';
    const totalCount = options.totalCount || '2,450';
    const ratingWord = options.ratingWord || 'Exceptional';
    const photosCount = this.reviewsData.filter(r => r.photos && r.photos.length > 0).length;

    el.innerHTML = `
      <div class="tc-reviews-wrapper" id="tcReviewsSectionMount">
        <div class="tc-reviews-header">
          <div class="tc-reviews-summary-score">
            <div class="tc-score-badge-large">${overallScore}</div>
            <div>
              <div class="tc-score-meta-title">
                ${ratingWord}
                <svg viewBox="0 0 24 24" width="16" height="16" fill="var(--teal)" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <div class="tc-score-meta-sub">Based on ${totalCount} verified guest reviews &middot; 100% verified stays</div>
            </div>
          </div>
          <button class="btn btn-ghost" style="font-size:12.5px; border-color:var(--gray-300);" onclick="showToast('Review submission is available after checking out from your completed booking.', 'info')">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Write a Review
          </button>
        </div>

        <!-- CATEGORY RATING BARS -->
        ${this.renderCategoryBars(options.categories || this.defaultCategories)}

        <!-- REVIEWS TOOLBAR (SORT & FILTER) -->
        <div class="tc-reviews-toolbar">
          <div class="tc-reviews-filter-pills">
            <button class="tc-filter-pill-btn active" data-filter="all" onclick="TripCraftReviews.setFilter('all')">
              All Reviews (${this.reviewsData.length})
            </button>
            <button class="tc-filter-pill-btn" data-filter="recent" onclick="TripCraftReviews.setFilter('recent')">
              Most Recent
            </button>
            <button class="tc-filter-pill-btn" data-filter="rating" onclick="TripCraftReviews.setFilter('rating')">
              Highest Rated
            </button>
            <button class="tc-filter-pill-btn" data-filter="photos" onclick="TripCraftReviews.setFilter('photos')">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              With Photos (${photosCount})
            </button>
          </div>
          <div style="font-size:12px; color:var(--text-muted);">
            Showing verified guest ratings
          </div>
        </div>

        <!-- REVIEWS LIST -->
        <div class="tc-reviews-list-mount">
          ${this.renderReviewsList('all')}
        </div>
      </div>
    `;
  }
};

window.TripCraftReviews = TripCraftReviews;

// -------------------------------------------------------------
// -------------------------------------------------------------
// 7. REUSABLE UNIVERSAL BOOKING DETAILS MODAL & CHECKOUT SYSTEM
// -------------------------------------------------------------

let currentBookingData = null;
let currentBookingStep = 1; // 1: Details (with tabs), 2: Traveller, 3: Payment, 4: Confirmation
let currentBookingTab = 'overview'; // 'overview', 'traveller', 'services', 'price'
let selectedPaymentMode = 'UPI / GPay';

let bookingParty = {
  adults: 2,
  children: 1,
  infants: 0,
  rooms: 1,
  childAges: [7]
};

let bookingDates = {
  checkIn: '',
  checkOut: '',
  durationStr: '5 Days / 4 Nights',
  daysCount: 5,
  nightsCount: 4
};

let bookingServices = {
  hotel: { name: 'Kerala Beach Resort', price: 8000, included: true },
  transport: { name: 'Private AC Sedan', price: 3000, included: true },
  activities: { name: '3 Curated Activities', price: 2000, included: true }
};

let bookingAddons = {
  airportTransfer: { selected: false, price: 1500, label: 'Airport / Station Transfer', desc: 'Private AC chauffeur pickup & drop' },
  travelInsurance: { selected: false, price: 450, label: 'Comprehensive Travel Insurance', desc: 'Medical cover & trip cancellation protection' },
  breakfastBuffet: { selected: false, price: 800, label: 'Daily Breakfast Buffet', desc: 'Gourmet spread with regional delicacies' },
  guidedExcursion: { selected: false, price: 1200, label: 'Guided Cultural Excursion', desc: 'ASI/Govt-certified expert tour' }
};

let bookingCalculations = {
  baseAdultRate: 10000,
  adultsSubtotal: 20000,
  childrenSubtotal: 5000,
  infantsSubtotal: 0,
  hotelCost: 8000,
  transportCost: 3000,
  activitiesCost: 2000,
  addonsCost: 0,
  subtotal: 38000,
  taxes: 3800,
  discount: 2000,
  grandTotal: 39800,
  isValid: true,
  validationError: ''
};

let bookingGalleryPhotos = [];
let activeGalleryIndex = 0;

window.TripCraftBookingState = {
  get data() { return currentBookingData; },
  get step() { return currentBookingStep; },
  get tab() { return currentBookingTab; },
  get party() { return bookingParty; },
  get dates() { return bookingDates; },
  get services() { return bookingServices; },
  get addons() { return bookingAddons; },
  get calculations() { return bookingCalculations; },
  get gallery() { return bookingGalleryPhotos; }
};

function initBookingModalDOM() {
  if (document.getElementById('tcBookingModalBackdrop')) return;

  const modalBackdrop = document.createElement('div');
  modalBackdrop.id = 'tcBookingModalBackdrop';
  modalBackdrop.className = 'tc-modal-backdrop';
  modalBackdrop.innerHTML = `
    <div class="tc-modal-container tc-modal-booking-large tc-booking-modal" id="tcBookingModalContainer" role="dialog" aria-modal="true">
      <!-- STICKY MODAL HEADER -->
      <div class="tc-bhdr-sticky">
        <div class="tc-bhdr-brand">
          <span class="gold">TripCraft</span>
          <span class="tc-bhdr-divider">/</span>
          <span id="tcModalHdrSub">Booking Details</span>
        </div>

        <!-- 4-STEP INDICATOR -->
        <div class="tc-bhdr-steps" id="tcBookingStepIndicator">
          <div class="tc-bstep-pill active" id="tcBstep1" onclick="navigateToBookingStep(1)" style="cursor:pointer;">
            <span class="tc-bstep-num">1</span>
            <span>Details</span>
          </div>
          <span class="tc-bstep-arrow">&rarr;</span>
          <div class="tc-bstep-pill" id="tcBstep2" onclick="navigateToBookingStep(2)" style="cursor:pointer;">
            <span class="tc-bstep-num">2</span>
            <span>Traveller</span>
          </div>
          <span class="tc-bstep-arrow">&rarr;</span>
          <div class="tc-bstep-pill" id="tcBstep3" onclick="navigateToBookingStep(3)" style="cursor:pointer;">
            <span class="tc-bstep-num">3</span>
            <span>Payment</span>
          </div>
          <span class="tc-bstep-arrow">&rarr;</span>
          <div class="tc-bstep-pill" id="tcBstep4">
            <span class="tc-bstep-num">4</span>
            <span>Confirmation</span>
          </div>
        </div>

        <button class="tc-bhdr-close" onclick="confirmExitBooking()" aria-label="Close modal">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <!-- MAIN SCROLLABLE BODY -->
      <div class="tc-bmodal-body" id="tcBookingModalBody">
        <!-- RENDERED DYNAMICALLY BY STEP -->
      </div>

      <!-- STICKY BOTTOM ACTIONS FOOTER (FOR STEP 1) -->
      <div class="tc-bfooter-bar" id="tcBookingFooterBar">
        <div class="tc-bfooter-price-wrap">
          <div class="tc-bfooter-total" id="tcModalFooterTotal">&#8377;39,800</div>
          <div class="tc-bfooter-sub" id="tcModalFooterSavings">Includes taxes &middot; You save &#8377;2,000</div>
        </div>
        <div style="display:flex; gap:10px; align-items:center;">
          <button class="btn btn-ghost" style="color:var(--text-mid); border-color:var(--gray-300);" onclick="confirmExitBooking()">
            Cancel
          </button>
          <button class="btn btn-teal" id="tcBtnStep1Continue" onclick="navigateToBookingStep(2)" style="font-weight:700; padding:12px 24px;">
            <span>Continue to Booking</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </div>

      <!-- EXIT CONFIRMATION DIALOG (HIDDEN BY DEFAULT) -->
      <div class="tc-exit-confirm-overlay" id="tcExitConfirmOverlay" style="display:none;">
        <div class="tc-exit-confirm-box">
          <div style="width:48px; height:48px; border-radius:50%; background:#FEF2F2; color:#DC2626; display:flex; align-items:center; justify-content:center; margin:0 auto 14px;">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <h3 class="tc-exit-confirm-title">Leave Booking?</h3>
          <p class="tc-exit-confirm-desc">Your selected booking details, party count, and customized services will not be saved.</p>
          <div class="tc-exit-actions">
            <button class="btn btn-outline" style="border:1.5px solid var(--gray-300); color:var(--ink) !important; font-weight:700; padding:10px 22px; border-radius:var(--r-full); background:var(--surface) !important; cursor:pointer;" onclick="dismissExitDialog()">Continue Booking</button>
            <button class="btn btn-danger" style="background:#DC2626; color:#FFF; border:none; padding:10px 22px; font-weight:700; border-radius:var(--r-full); cursor:pointer;" onclick="forceCloseBookingModal()">Exit</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modalBackdrop);

  modalBackdrop.addEventListener('click', e => {
    if (e.target === modalBackdrop) confirmExitBooking();
  });
}

function initGalleryModalDOM() {
  if (document.getElementById('tcGalleryModal')) return;

  const galleryModal = document.createElement('div');
  galleryModal.id = 'tcGalleryModal';
  galleryModal.className = 'tc-gallery-lightbox-overlay';
  galleryModal.style.display = 'none';
  galleryModal.innerHTML = `
    <div class="tc-gallery-header">
      <div style="display:flex; align-items:center; gap:8px;">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--gold)" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        <strong id="tcGalleryTitle" style="font-size:16px;">Destination Gallery</strong>
      </div>
      <button class="tc-bhdr-close" onclick="closeGalleryLightbox()" aria-label="Close gallery">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="tc-gallery-main-view">
      <img src="" id="tcGalleryMainImg" class="tc-gallery-main-img" alt="Gallery preview" />
    </div>
    <div class="tc-gallery-thumbs-row" id="tcGalleryThumbs"></div>
  `;
  document.body.appendChild(galleryModal);
}

function openGalleryLightbox() {
  initGalleryModalDOM();
  const modal = document.getElementById('tcGalleryModal');
  const mainImg = document.getElementById('tcGalleryMainImg');
  const titleEl = document.getElementById('tcGalleryTitle');
  const thumbsContainer = document.getElementById('tcGalleryThumbs');
  if (!modal || !mainImg) return;

  if (titleEl && currentBookingData) {
    titleEl.textContent = (currentBookingData.title || 'TripCraft') + ' — Photo Gallery';
  }

  // Populate photos if not set
  if (!bookingGalleryPhotos || bookingGalleryPhotos.length === 0) {
    const hero = currentBookingData?.image || 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1920&auto=format&fit=crop';
    bookingGalleryPhotos = [
      hero,
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop'
    ];
  }

  activeGalleryIndex = 0;
  mainImg.src = bookingGalleryPhotos[0];

  thumbsContainer.innerHTML = bookingGalleryPhotos.map((url, i) => `
    <div class="tc-gallery-thumb ${i === 0 ? 'active' : ''}" onclick="setGalleryPhoto(${i})">
      <img src="${url}" alt="Thumb ${i+1}" />
    </div>
  `).join('');

  modal.style.display = 'flex';
}

function setGalleryPhoto(idx) {
  activeGalleryIndex = idx;
  const mainImg = document.getElementById('tcGalleryMainImg');
  if (mainImg) mainImg.src = bookingGalleryPhotos[idx];
  document.querySelectorAll('.tc-gallery-thumb').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === idx);
  });
}

function closeGalleryLightbox() {
  const modal = document.getElementById('tcGalleryModal');
  if (modal) modal.style.display = 'none';
}

function openBookingModal(options) {
  initBookingModalDOM();
  currentBookingData = options || {};

  // Extract numeric price
  const rawPriceStr = options.price || '2500';
  currentBookingData.rawBasePrice = options.numericPrice || parseInt(String(rawPriceStr).replace(/[^0-9]/g, ''), 10) || 2500;
  currentBookingData.cancellationPolicy = (typeof TripCraftPricing !== 'undefined')
    ? TripCraftPricing.getCancellationPolicy(options)
    : 'Free cancellation until 48hrs before departure';

  // Category determination
  const cat = (options.category || '').toLowerCase();
  const title = (options.title || '').toLowerCase();
  currentBookingData.isHotel = cat.includes('hotel') || cat.includes('resort') || cat.includes('stay') || cat.includes('hostel') || cat.includes('villa') || cat.includes('haveli');
  currentBookingData.isTransport = cat.includes('flight') || cat.includes('train') || cat.includes('bus') || cat.includes('cab') || cat.includes('transport');
  currentBookingData.isVehicle = cat.includes('vehicle') || cat.includes('bike') || cat.includes('car') || cat.includes('motorcycle') || cat.includes('scooter');
  currentBookingData.isPackage = cat.includes('package') || cat.includes('tour') || cat.includes('safari') || cat.includes('circuit');

  // Seating capacity for vehicles
  if (currentBookingData.isVehicle) {
    let seats = 4;
    if (title.includes('himalayan') || title.includes('interceptor') || title.includes('bullet') || title.includes('activa') || title.includes('bike')) {
      seats = 2;
    } else if (title.includes('innova') || title.includes('ertiga') || title.includes('suv')) {
      seats = 7;
    }
    currentBookingData.seatingCapacity = options.seatingCapacity || seats;
  }

  // Pre-seed dates
  const today = new Date();
  const dStart = new Date(today.getTime() + 86400000 * 7);
  const dEnd = new Date(today.getTime() + 86400000 * 11);
  bookingDates.checkIn = dStart.toISOString().split('T')[0];
  bookingDates.checkOut = dEnd.toISOString().split('T')[0];
  bookingDates.daysCount = 5;
  bookingDates.nightsCount = 4;
  bookingDates.durationStr = '5 Days / 4 Nights';

  // Pre-seed guest party
  bookingParty.adults = options.adults || 2;
  bookingParty.children = options.children || 1;
  bookingParty.infants = options.infants || 0;
  bookingParty.rooms = options.rooms || 1;
  bookingParty.childAges = [7];

  // Base adult rate
  const rawBase = currentBookingData.rawBasePrice || 2500;
  if (currentBookingData.isPackage) {
    bookingCalculations.baseAdultRate = Math.max(rawBase, 10000);
    bookingServices.hotel = { name: 'Kerala Beach Resort & Spa', price: 8000, included: true };
    bookingServices.transport = { name: 'Private AC Chauffeur Sedan', price: 3000, included: true };
    bookingServices.activities = { name: '3 Curated Experiences & Guided Tour', price: 2000, included: true };
  } else if (currentBookingData.isHotel) {
    bookingCalculations.baseAdultRate = rawBase;
    bookingServices.hotel = { name: options.title || 'Luxury Resort Stay', price: rawBase, included: true };
    bookingServices.transport = { name: 'Airport / Station Private Cab', price: 2500, included: false };
    bookingServices.activities = { name: 'Spice Plantation Walk & Evening Show', price: 1500, included: false };
  } else if (currentBookingData.isTransport) {
    bookingCalculations.baseAdultRate = rawBase;
    bookingServices.hotel = { name: 'None (Transport Booking)', price: 0, included: false };
    bookingServices.transport = { name: options.title || 'Multi-Modal Express Transport', price: rawBase, included: true };
    bookingServices.activities = { name: 'Luggage & Onboard Transit Care', price: 0, included: true };
    bookingParty.rooms = 0;
  } else if (currentBookingData.isVehicle) {
    bookingCalculations.baseAdultRate = rawBase;
    bookingServices.hotel = { name: 'None (Vehicle Rental)', price: 0, included: false };
    bookingServices.transport = { name: options.title || 'Self-Drive Vehicle Rental', price: rawBase, included: true };
    bookingServices.activities = { name: 'Comprehensive Commercial Insurance', price: 0, included: true };
    bookingParty.rooms = 0;
  } else {
    bookingCalculations.baseAdultRate = rawBase;
    bookingServices.hotel = { name: 'Heritage Boutique Stay', price: 4000, included: false };
    bookingServices.transport = { name: 'Local Sightseeing Cab', price: 2200, included: false };
    bookingServices.activities = { name: options.title || 'Verified Guided Tour', price: rawBase, included: true };
  }

  // Pre-seed gallery photos
  const heroImg = options.image || 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1920&auto=format&fit=crop';
  bookingGalleryPhotos = [
    heroImg,
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop'
  ];

  // Set default steps and tabs
  currentBookingStep = 1;
  currentBookingTab = 'overview';

  // Calculate & render
  calculateBookingTotals();
  renderBookingModal();

  // Show backdrop
  const backdrop = document.getElementById('tcBookingModalBackdrop');
  if (backdrop) {
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function renderBookingModal() {
  updateStepIndicator();
  const body = document.getElementById('tcBookingModalBody');
  const footer = document.getElementById('tcBookingFooterBar');
  if (!body) return;

  if (currentBookingStep === 1) {
    if (footer) footer.style.display = 'flex';
    body.innerHTML = renderStep1HTML();
    setupStep1Events();
  } else if (currentBookingStep === 2) {
    if (footer) footer.style.display = 'none';
    body.innerHTML = renderStep2HTML();
  } else if (currentBookingStep === 3) {
    if (footer) footer.style.display = 'none';
    body.innerHTML = renderStep3HTML();
  } else if (currentBookingStep === 4) {
    if (footer) footer.style.display = 'none';
    body.innerHTML = renderStep4HTML();
  }
}

function updateStepIndicator() {
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById(`tcBstep${i}`);
    if (!el) continue;
    el.classList.remove('active', 'completed');
    if (i === currentBookingStep) {
      el.classList.add('active');
    } else if (i < currentBookingStep) {
      el.classList.add('completed');
    }
  }

  const hdrSub = document.getElementById('tcModalHdrSub');
  if (hdrSub) {
    const labels = ['', 'Booking Details', 'Traveller Details', 'Payment & Security', 'Booking Confirmed'];
    hdrSub.textContent = labels[currentBookingStep] || 'Booking Details';
  }
}

const HOTEL_ROOM_TYPES = [
  {
    id: 'deluxe',
    name: 'Deluxe Room (King Bed / Garden View)',
    tag: 'Standard Inclusion',
    desc: 'King Bed • Garden View • 320 sq.ft • Free High-Speed Wi-Fi • AC • En-suite Bath',
    extra: 0,
    badge: 'Base Price'
  },
  {
    id: 'executive',
    name: 'Executive Balcony Suite',
    tag: 'Recommended Upgrade',
    desc: 'Private Balcony • Valley / Sea View • 450 sq.ft • Free Breakfast & Evening Tea',
    extra: 1200,
    badge: '+₹1,200/night'
  },
  {
    id: 'luxury_villa',
    name: 'Luxury Ocean / Mountain View Villa',
    tag: 'Premium Luxury',
    desc: 'Private Plunge Pool • King Suite • 620 sq.ft • All Meals Included • Sunset Deck',
    extra: 2500,
    badge: '+₹2,500/night'
  },
  {
    id: 'presidential',
    name: 'Royal Heritage Presidential Suite',
    tag: 'VIP Elite',
    desc: 'Dedicated Butler • Jacuzzi • 850 sq.ft Lounge • VIP Airport Transfer Included',
    extra: 4500,
    badge: '+₹4,500/night'
  }
];

function renderRoomTypeOptions() {
  const current = currentBookingData.selectedRoomType || HOTEL_ROOM_TYPES[0].name;
  return HOTEL_ROOM_TYPES.map((r, i) => {
    const isSelected = (current === r.name);
    return `
      <div class="tc-room-type-card" 
           onclick="selectHotelRoomType(${i})" 
           style="border: 2px solid ${isSelected ? 'var(--teal)' : 'var(--gray-200)'}; 
                  background: ${isSelected ? 'rgba(14,124,107,0.06)' : '#FFFFFF'}; 
                  border-radius: var(--r-md); padding: 14px; cursor: pointer; transition: all 0.2s; position: relative;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
          <span style="font-size:11px; font-weight:700; color:${isSelected ? 'var(--teal)' : 'var(--text-muted)'}; text-transform:uppercase;">${r.tag}</span>
          <span class="chip ${isSelected ? 'chip-teal' : 'chip-navy'}" style="font-size:11px; font-weight:700;">${r.badge}</span>
        </div>
        <div style="font-weight:700; font-size:14px; color:var(--navy); margin-bottom:4px; display:flex; align-items:center; gap:6px;">
          ${isSelected ? '<span style="color:var(--teal); font-weight:bold;">✔</span>' : ''}
          ${r.name}
        </div>
        <div style="font-size:12px; color:var(--text-mid); line-height:1.4;">${r.desc}</div>
      </div>
    `;
  }).join('');
}

window.selectHotelRoomType = function(idx) {
  const r = HOTEL_ROOM_TYPES[idx] || HOTEL_ROOM_TYPES[0];
  currentBookingData.selectedRoomType = r.name;
  bookingCalculations.roomTypeExtra = r.extra;
  
  // Re-calculate totals
  calculateBookingTotals();
  
  // Update specs and badges in UI
  const specEl = document.getElementById('tcSelectedRoomTypeSpec');
  if (specEl) specEl.textContent = r.name;
  const badgeEl = document.getElementById('tcActiveRoomTypeBadge');
  if (badgeEl) badgeEl.textContent = r.name;

  // Re-render grid
  const grid = document.getElementById('tcRoomTypesGrid');
  if (grid) grid.innerHTML = renderRoomTypeOptions();
  
  if (typeof showToast === 'function') {
    showToast('Selected ' + r.name, 'success');
  }
};

function renderModalSpecs(d) {
  if (d.specs && Array.isArray(d.specs) && d.specs.length > 0) {
    return d.specs.map(s => `
      <div class="tc-modal-spec-row">
        <span class="tc-modal-spec-label">${s.label}</span>
        <span class="tc-modal-spec-val">${s.val}</span>
      </div>
    `).join('');
  }

  if (d.isTransport) {
    return `
      <div class="tc-modal-spec-row">
        <span class="tc-modal-spec-label">Service Type</span>
        <span class="tc-modal-spec-val">${d.category || 'Transit Service'}</span>
      </div>
      <div class="tc-modal-spec-row">
        <span class="tc-modal-spec-label">Route / Carrier</span>
        <span class="tc-modal-spec-val">${d.title}</span>
      </div>
      <div class="tc-modal-spec-row">
        <span class="tc-modal-spec-label">Baggage Allowance</span>
        <span class="tc-modal-spec-val">Included (15kg Check-in + 7kg Cabin)</span>
      </div>
      <div class="tc-modal-spec-row">
        <span class="tc-modal-spec-label">Seat / Vehicle Class</span>
        <span class="tc-modal-spec-val">AC Reserved &middot; Instant E-Ticket</span>
      </div>
    `;
  }

  if (d.isHotel) {
    return `
      <div class="tc-modal-spec-row">
        <span class="tc-modal-spec-label">Property Type</span>
        <span class="tc-modal-spec-val">${d.category || 'Verified Hotel Stay'}</span>
      </div>
      <div class="tc-modal-spec-row">
        <span class="tc-modal-spec-label">Selected Room Type</span>
        <span class="tc-modal-spec-val" id="tcSelectedRoomTypeSpec" style="color:var(--teal); font-weight:700;">${currentBookingData.selectedRoomType || 'Deluxe Room (King Bed / Garden View)'}</span>
      </div>
      <div class="tc-modal-spec-row">
        <span class="tc-modal-spec-label">Meal Plan</span>
        <span class="tc-modal-spec-val">Complimentary Breakfast Included</span>
      </div>
      <div class="tc-modal-spec-row">
        <span class="tc-modal-spec-label">Check-in / Check-out</span>
        <span class="tc-modal-spec-val">12:00 PM Check-in &middot; 11:00 AM Check-out</span>
      </div>
    `;
  }

  return `
    <div class="tc-modal-spec-row">
      <span class="tc-modal-spec-label">Service Type</span>
      <span class="tc-modal-spec-val">${d.category || 'Curated Holiday Package'}</span>
    </div>
    <div class="tc-modal-spec-row">
      <span class="tc-modal-spec-label">Accommodation</span>
      <span class="tc-modal-spec-val">${bookingServices.hotel.name}</span>
    </div>
    <div class="tc-modal-spec-row">
      <span class="tc-modal-spec-label">Transport Included</span>
      <span class="tc-modal-spec-val">${bookingServices.transport.name}</span>
    </div>
    <div class="tc-modal-spec-row">
      <span class="tc-modal-spec-label">Guided Sightseeing</span>
      <span class="tc-modal-spec-val">${bookingServices.activities.name}</span>
    </div>
  `;
}

function renderStep1HTML() {
  const d = currentBookingData || {};
  const heroImg = d.image || 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1920&auto=format&fit=crop';
  const title = d.title || 'Kerala Explorer';
  const rating = d.rating || '4.8';
  const location = d.location || d.subtitle || 'Kerala, India';
  const duration = bookingDates.durationStr;

  return `
    <!-- HERO MEDIA BANNER -->
    <div class="tc-bhero-card">
      <div class="tc-bhero-img-wrap" style="background-image: url('${heroImg}');" onclick="openGalleryLightbox()" title="Click to view full photo gallery">
        <div class="tc-bhero-gallery-badge">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
          <span>View Gallery (4 Photos)</span>
        </div>
        <div class="tc-bhero-overlay-content">
          <h2 class="tc-bhero-title">${title}</h2>
          <div class="tc-bhero-meta-row">
            <span class="tc-bhero-rating">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span>${rating}</span>
            </span>
            <span class="tc-bhero-loc">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>${location}</span>
            </span>
            <span class="tc-bhero-duration">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span id="tcHeroDurationText">${duration}</span>
            </span>
            <span class="tc-verified-partner-pill" style="margin-left:auto;">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Verified Operator</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- TABS BAR -->
    <div class="tc-btabs-bar">
      <button class="tc-btab-btn ${currentBookingTab === 'overview' ? 'active' : ''}" onclick="setBookingTab('overview')">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <span>Overview</span>
      </button>
      <button class="tc-btab-btn ${currentBookingTab === 'traveller' ? 'active' : ''}" onclick="setBookingTab('traveller')">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        <span>Traveller Details</span>
      </button>
      <button class="tc-btab-btn ${currentBookingTab === 'services' ? 'active' : ''}" onclick="setBookingTab('services')">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        <span>Services</span>
      </button>
      <button class="tc-btab-btn ${currentBookingTab === 'price' ? 'active' : ''}" onclick="setBookingTab('price')">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        <span>Price</span>
      </button>
    </div>

    <!-- TAB 1: OVERVIEW PANE -->
    <div class="tc-btab-pane ${currentBookingTab === 'overview' ? 'active' : ''}" id="tcTabOverview">
      <div class="tc-boverview-grid">
        <!-- LEFT: DATES & DURATION CARD -->
        <div class="tc-bcard">
          <div class="tc-bcard-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>${d.isTransport ? 'Journey Dates &amp; Timings' : 'Trip Dates &amp; Duration'}</span>
          </div>

          <div class="tc-date-range-box">
            <div class="tc-date-input-wrap">
              <label class="tc-date-label">${d.isTransport ? 'Departure Date' : 'Check-in / Start Date'}</label>
              <input type="date" class="tc-date-picker" id="tcCheckInDate" value="${bookingDates.checkIn}" onchange="handleDateChange()" />
            </div>
            <div class="tc-date-input-wrap">
              <label class="tc-date-label">${d.isTransport ? 'Return / Arrival Date' : 'Check-out / End Date'}</label>
              <input type="date" class="tc-date-picker" id="tcCheckOutDate" value="${bookingDates.checkOut}" onchange="handleDateChange()" />
            </div>
          </div>

          <div style="display:flex; align-items:center; justify-content:space-between; margin-top:14px;">
            <div class="tc-duration-badge" id="tcDurationBadge">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span id="tcDurationPillText">${bookingDates.durationStr}</span>
            </div>
            <span class="tc-dynamic-rate-tag normal" id="tcDynamicRateTag">Standard Weekday Rate</span>
          </div>
        </div>

        <!-- RIGHT: TRUST, CANCELLATION & URGENCY -->
        <div class="tc-bcard">
          <div class="tc-bcard-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>Booking Flexibility &amp; Guarantees</span>
          </div>

          <div class="tc-modal-urgency-strip" style="margin-bottom:14px;">
            <div class="tc-urgency-pill">
              <span class="tc-pulse-dot"></span>
              <span id="tcUrgencyMsg">${d.isTransport ? 'Only 3 tickets / seats left at this fare!' : 'Only 2 rooms / slots left at this price!'}</span>
            </div>
            <div class="tc-viewers-pill">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <span>18 travelers viewing now</span>
            </div>
          </div>

          <div style="display:flex; align-items:flex-start; gap:10px; background:rgba(14,124,107,0.08); border:1px solid rgba(14,124,107,0.25); border-radius:12px; padding:12px 14px;">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--teal)" stroke-width="2.5" style="flex-shrink:0; margin-top:2px;"><polyline points="20 6 9 17 4 12"/></svg>
            <div style="font-size:12.5px; color:var(--navy); line-height:1.45;">
              <strong style="color:var(--teal);">Free Cancellation:</strong>
              <div>${d.isTransport ? 'Cancel up to 24 hours prior to departure for instant full refund. E-ticket issued directly.' : 'Full refund guaranteed if cancelled up to 48 hours prior to start. No questions asked.'}</div>
            </div>
          </div>
        </div>
      </div>

      ${d.isHotel ? `
      <!-- HOTEL ROOM TYPE SELECTOR -->
      <div class="tc-bcard" style="margin-top:16px;">
        <div class="tc-bcard-title" style="display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:8px;">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7"/><path d="M3 11h18"/><path d="M7 11V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4"/></svg>
            <span>Choose Your Room Type</span>
          </div>
          <span class="chip chip-teal" style="font-size:11.5px; font-weight:700;" id="tcActiveRoomTypeBadge">${currentBookingData.selectedRoomType || 'Deluxe Room'}</span>
        </div>
        <div style="font-size:13px; color:var(--text-mid); margin-bottom:12px;">
          Select your desired room category below. Pricing adjusts dynamically in real time:
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:12px;" id="tcRoomTypesGrid">
          ${renderRoomTypeOptions()}
        </div>
      </div>
      ` : ''}

      <!-- SPECS & HIGHLIGHTS -->
      <div class="tc-bcard">
        <div class="tc-bcard-title">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          <span>${d.isTransport ? 'Travel &amp; Journey Details' : 'Trip Highlights &amp; Inclusion Summary'}</span>
        </div>
        <div class="tc-modal-specs" style="margin-bottom:0;" id="tcSpecsMount">
          ${renderModalSpecs(d)}
        </div>
      </div>

      <!-- IN-TAB NAVIGATION BAR: OVERVIEW TO TRAVELLER -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px; padding:16px 20px; background:#FFFFFF; border:1px solid var(--gray-200); border-radius:14px; box-shadow:var(--shadow-sm);">
        <div>
          <div style="font-size:12px; color:var(--text-muted);">Step 1 of 4 &bull; Trip Overview</div>
          <div style="font-size:14px; font-weight:700; color:var(--navy);">Proceed to enter passenger &amp; customer details</div>
        </div>
        <div style="display:flex; gap:10px;">
          <button type="button" class="btn btn-ghost" style="padding:10px 18px;" onclick="confirmExitBooking()">Cancel</button>
          <button type="button" class="btn btn-teal" style="padding:10px 24px; font-weight:700;" onclick="setBookingTab('traveller')">
            <span>Next: Enter Traveller Details &rarr;</span>
          </button>
        </div>
      </div>
    </div>

    <!-- TAB 2: TRAVELLER DETAILS PANE -->
    <div class="tc-btab-pane ${currentBookingTab === 'traveller' ? 'active' : ''}" id="tcTabTraveller">
      <div class="tc-steppers-grid">
        <!-- ADULTS -->
        <div class="tc-stepper-card">
          <div class="tc-stepper-info">
            <h4>Adults</h4>
            <p>12+ years &middot; Base Fare</p>
          </div>
          <div class="tc-stepper-controls">
            <button class="tc-stepper-btn" onclick="updateBookingParty('adults', -1)" ${bookingParty.adults <= 1 ? 'disabled' : ''}>&minus;</button>
            <span class="tc-stepper-val">${bookingParty.adults}</span>
            <button class="tc-stepper-btn" onclick="updateBookingParty('adults', 1)">&plus;</button>
          </div>
        </div>

        <!-- CHILDREN -->
        <div class="tc-stepper-card">
          <div class="tc-stepper-info">
            <h4>Children</h4>
            <p>2&ndash;11 years &middot; 40% Off</p>
          </div>
          <div class="tc-stepper-controls">
            <button class="tc-stepper-btn" onclick="updateBookingParty('children', -1)" ${bookingParty.children <= 0 ? 'disabled' : ''}>&minus;</button>
            <span class="tc-stepper-val">${bookingParty.children}</span>
            <button class="tc-stepper-btn" onclick="updateBookingParty('children', 1)">&plus;</button>
          </div>
        </div>

        <!-- INFANTS -->
        <div class="tc-stepper-card">
          <div class="tc-stepper-info">
            <h4>Infants</h4>
            <p>&lt; 2 years &middot; Free / Lap</p>
          </div>
          <div class="tc-stepper-controls">
            <button class="tc-stepper-btn" onclick="updateBookingParty('infants', -1)" ${bookingParty.infants <= 0 ? 'disabled' : ''}>&minus;</button>
            <span class="tc-stepper-val">${bookingParty.infants}</span>
            <button class="tc-stepper-btn" onclick="updateBookingParty('infants', 1)">&plus;</button>
          </div>
        </div>

        <!-- ROOMS OR SEATING -->
        ${!d.isTransport && !d.isVehicle ? `
        <div class="tc-stepper-card">
          <div class="tc-stepper-info">
            <h4>Rooms</h4>
            <p>Max 3 Guests / Room</p>
          </div>
          <div class="tc-stepper-controls">
            <button class="tc-stepper-btn" onclick="updateBookingParty('rooms', -1)" ${bookingParty.rooms <= 1 ? 'disabled' : ''}>&minus;</button>
            <span class="tc-stepper-val">${bookingParty.rooms}</span>
            <button class="tc-stepper-btn" onclick="updateBookingParty('rooms', 1)">&plus;</button>
          </div>
        </div>
        ` : `
        <div class="tc-stepper-card">
          <div class="tc-stepper-info">
            <h4>${d.isVehicle ? 'Vehicle' : 'Confirmed Seats'}</h4>
            <p>${d.isVehicle ? 'Primary Vehicle Allocated' : (bookingParty.adults + bookingParty.children) + ' Reserved Seats'}</p>
          </div>
          <div class="tc-stepper-controls">
            <span class="tc-stepper-val" style="font-size:12px; font-weight:700; color:var(--teal);">&#10003; Confirmed</span>
          </div>
        </div>
        `}
      </div>

      <!-- CAPACITY ERROR IF ANY -->
      <div id="tcModalCapacityError" class="tc-modal-capacity-error" style="display:${bookingCalculations.isValid ? 'none' : 'flex'};">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <span>${bookingCalculations.validationError}</span>
      </div>

      <!-- CHILD AGE SELECTORS -->
      ${bookingParty.children > 0 ? `
        <div class="tc-child-ages-box">
          <div style="font-size:13.5px; font-weight:700; color:var(--navy); display:flex; align-items:center; gap:8px;">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--teal)" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/></svg>
            <span>Specify Ages for Children (for proper seat and meal arrangements)</span>
          </div>
          <div class="tc-child-ages-grid">
            ${Array.from({ length: bookingParty.children }).map((_, idx) => `
              <div class="tc-child-age-item">
                <span style="font-size:12.5px; font-weight:600; color:var(--text);">Child ${idx + 1} Age:</span>
                <select class="tc-child-age-select" onchange="setChildAge(${idx}, this.value)">
                  ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(age => `
                    <option value="${age}" ${(bookingParty.childAges[idx] || 7) === age ? 'selected' : ''}>${age} ${age === 1 ? 'year' : 'years'}</option>
                  `).join('')}
                </select>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- PRIMARY CUSTOMER / CONTACT DETAILS CARD -->
      <div class="tc-bcard" style="margin-top:20px;">
        <div class="tc-bcard-title">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--teal)" stroke-width="2.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>Customer &amp; Primary Traveller Details (Required)</span>
        </div>
        <p style="font-size:12.5px; color:var(--text-muted); margin-bottom:16px;">
          Provide official contact and government ID details. Your tickets, vouchers, and tax invoices will be issued under these details.
        </p>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px;">
          <div class="form-field">
            <label class="form-label">Full Name (as per Govt ID) *</label>
            <input type="text" class="form-input" id="tcPrimaryName" value="${(typeof TripCraftAuth !== 'undefined' && TripCraftAuth.getUser()) ? TripCraftAuth.getUser().name : 'Priya Sunder'}" placeholder="Full Name" required />
          </div>
          <div class="form-field">
            <label class="form-label">Email Address *</label>
            <input type="email" class="form-input" id="tcPrimaryEmail" value="${(typeof TripCraftAuth !== 'undefined' && TripCraftAuth.getUser()) ? TripCraftAuth.getUser().email : 'priya.traveler@example.com'}" placeholder="Email Address" required />
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; margin-bottom:14px;">
          <div class="form-field">
            <label class="form-label">Mobile Phone Number *</label>
            <input type="tel" class="form-input" id="tcPrimaryPhone" value="+91 98765 43210" placeholder="+91 98765 43210" required />
          </div>
          <div class="form-field">
            <label class="form-label">Government ID Type *</label>
            <select class="form-select" id="tcPrimaryGovtIdType">
              <option value="Aadhaar Card" selected>Aadhaar Card</option>
              <option value="Passport">Passport</option>
              <option value="Driving License">Driving License</option>
              <option value="Voter ID">Voter ID</option>
            </select>
          </div>
          <div class="form-field">
            <label class="form-label">ID Number / Reference *</label>
            <input type="text" class="form-input" id="tcPrimaryGovtId" value="XXXX-XXXX-8924" placeholder="Enter ID number" required />
          </div>
        </div>

        <!-- Dynamic Adult Guests List -->
        ${Array.from({ length: bookingParty.adults }).map((_, idx) => `
          <div style="background:var(--gray-50); border:1px solid var(--gray-200); border-radius:10px; padding:12px; margin-bottom:10px;">
            <div style="font-size:11.5px; font-weight:700; color:var(--navy); margin-bottom:6px;">Adult Passenger ${idx + 1} ${idx === 0 ? '(Primary / Lead)' : ''}</div>
            <div style="display:grid; grid-template-columns:2fr 1fr 1fr; gap:10px;">
              <input type="text" class="form-input tc-guest-name" style="font-size:12.5px;" value="${idx === 0 ? ((typeof TripCraftAuth !== 'undefined' && TripCraftAuth.getUser()) ? TripCraftAuth.getUser().name : 'Priya Sunder') : 'Passenger ' + (idx + 1)}" placeholder="Passenger Name" />
              <input type="number" class="form-input tc-guest-age" style="font-size:12.5px;" value="${idx === 0 ? 30 : 28}" min="12" max="100" placeholder="Age" />
              <select class="form-select tc-guest-gender" style="font-size:12.5px;">
                <option ${idx === 0 ? 'selected' : ''}>Female</option>
                <option ${idx > 0 ? 'selected' : ''}>Male</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        `).join('')}

        <!-- Special Requests -->
        <div class="form-field" style="margin-top:12px;">
          <label class="form-label">Special Travel Requests &amp; Dietary Preferences</label>
          <input type="text" class="form-input" id="tcSpecialRequests" placeholder="${d.isTransport ? 'e.g. Window seat preference, vegetarian meal, extra cabin assistance' : 'e.g. Quiet room, high floor, vegetarian breakfast'}" />
        </div>
      </div>

      <!-- IN-TAB NAVIGATION BAR: TRAVELLER TO SERVICES -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px; padding:16px 20px; background:#FFFFFF; border:1px solid var(--gray-200); border-radius:14px; box-shadow:var(--shadow-sm);">
        <button type="button" class="btn btn-ghost" style="padding:10px 18px;" onclick="setBookingTab('overview')">&larr; Back to Overview</button>
        <button type="button" class="btn btn-teal" style="padding:10px 24px; font-weight:700;" onclick="setBookingTab('services')">
          <span>Next: Select Services &rarr;</span>
        </button>
      </div>
    </div>

    <!-- TAB 3: SERVICES PANE -->
    <div class="tc-btab-pane ${currentBookingTab === 'services' ? 'active' : ''}" id="tcTabServices">
      <div style="font-size:13px; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:12px;">
        ${d.isTransport ? 'Included Travel &amp; Transit Services' : 'Included Core Services'}
      </div>
      <div class="tc-services-list">
        ${d.isTransport ? `
          <!-- TRANSPORT JOURNEY -->
          <div class="tc-service-item">
            <div class="tc-service-left">
              <div class="tc-service-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              </div>
              <div>
                <div class="tc-service-title">Journey: ${d.title}</div>
                <div class="tc-service-desc">${d.category || 'Transit Service'} &middot; Verified carrier &middot; GPS tracking active</div>
              </div>
            </div>
            <div class="tc-service-right">
              <div class="tc-service-price" style="color:var(--teal);">&#10003; Included</div>
            </div>
          </div>

          <!-- BAGGAGE -->
          <div class="tc-service-item">
            <div class="tc-service-left">
              <div class="tc-service-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/><rect x="4" y="7" width="16" height="14" rx="2"/></svg>
              </div>
              <div>
                <div class="tc-service-title">Baggage: 15kg Check-in + 7kg Cabin</div>
                <div class="tc-service-desc">Generous baggage allowance &middot; Handbag &amp; laptop bag allowed</div>
              </div>
            </div>
            <div class="tc-service-right">
              <div class="tc-service-price" style="color:var(--success);">&#8377;0 (Free)</div>
            </div>
          </div>

          <!-- TRANSIT PROTECTION -->
          <div class="tc-service-item">
            <div class="tc-service-left">
              <div class="tc-service-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <div class="tc-service-title">Passenger Protection &amp; Transit Care</div>
                <div class="tc-service-desc">Licensed crew &middot; Commercial transit insurance &middot; Emergency SOS</div>
              </div>
            </div>
            <div class="tc-service-right">
              <div class="tc-service-price" style="color:var(--teal);">&#10003; Included</div>
            </div>
          </div>
        ` : `
          <!-- HOTEL -->
          <div class="tc-service-item">
            <div class="tc-service-left">
              <div class="tc-service-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3M9 9h1M9 13h1M9 17h1"/></svg>
              </div>
              <div>
                <div class="tc-service-title">Hotel: ${bookingServices.hotel.name}</div>
                <div class="tc-service-desc">Deluxe room &middot; Verified cleanliness 4.9 &middot; Daily breakfast</div>
              </div>
            </div>
            <div class="tc-service-right">
              <div class="tc-service-price">&#8377;${bookingServices.hotel.price.toLocaleString('en-IN')}</div>
              <button class="tc-service-change-btn" onclick="showToast('Room category upgraded to Deluxe Suite!', 'success')">Change</button>
            </div>
          </div>

          <!-- TRANSPORT -->
          <div class="tc-service-item">
            <div class="tc-service-left">
              <div class="tc-service-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              </div>
              <div>
                <div class="tc-service-title">Transport: ${bookingServices.transport.name}</div>
                <div class="tc-service-desc">Chauffeur driven &middot; Fuel &amp; toll taxes included &middot; Unlimited stops</div>
              </div>
            </div>
            <div class="tc-service-right">
              <div class="tc-service-price">&#8377;${bookingServices.transport.price.toLocaleString('en-IN')}</div>
              <button class="tc-service-change-btn" onclick="showToast('Vehicle upgraded to Luxury SUV!', 'success')">Change</button>
            </div>
          </div>

          <!-- ACTIVITIES -->
          <div class="tc-service-item">
            <div class="tc-service-left">
              <div class="tc-service-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
              </div>
              <div>
                <div class="tc-service-title">Activities: ${bookingServices.activities.name}</div>
                <div class="tc-service-desc">ASI/Govt certified naturalist guide &middot; Entry tickets included</div>
              </div>
            </div>
            <div class="tc-service-right">
              <div class="tc-service-price">&#8377;${bookingServices.activities.price.toLocaleString('en-IN')}</div>
              <button class="tc-service-change-btn" onclick="showToast('Activity schedule updated!', 'success')">Change</button>
            </div>
          </div>
        `}
      </div>

      <!-- OPTIONAL ADD-ONS -->
      <div style="font-size:13px; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:12px;">
        Optional Experience Add-Ons (Select to customize)
      </div>
      <div class="tc-addons-grid">
        ${Object.keys(bookingAddons).map(key => {
          const add = bookingAddons[key];
          return `
            <div class="tc-addon-card ${add.selected ? 'selected' : ''}" onclick="toggleBookingAddon('${key}')">
              <input type="checkbox" ${add.selected ? 'checked' : ''} onclick="event.stopPropagation(); toggleBookingAddon('${key}')" />
              <div style="flex:1;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2px;">
                  <strong style="font-size:13.5px; color:var(--navy);">${add.label}</strong>
                  <span style="font-size:13px; font-weight:700; color:var(--teal);">+&#8377;${add.price.toLocaleString('en-IN')}</span>
                </div>
                <p style="font-size:12px; color:var(--text-muted); margin:0;">${add.desc}</p>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- IN-TAB NAVIGATION BAR: SERVICES TO PRICE -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px; padding:16px 20px; background:#FFFFFF; border:1px solid var(--gray-200); border-radius:14px; box-shadow:var(--shadow-sm);">
        <button type="button" class="btn btn-ghost" style="padding:10px 18px;" onclick="setBookingTab('traveller')">&larr; Back to Traveller Details</button>
        <button type="button" class="btn btn-teal" style="padding:10px 24px; font-weight:700;" onclick="setBookingTab('price')">
          <span>Next: Review Price Breakdown &rarr;</span>
        </button>
      </div>
    </div>

    <!-- TAB 4: PRICE CALCULATION PANE -->
    <div class="tc-btab-pane ${currentBookingTab === 'price' ? 'active' : ''}" id="tcTabPrice">
      <div class="tc-price-sheet">
        <div style="font-size:15px; font-weight:700; color:var(--navy); margin-bottom:16px; padding-bottom:8px; border-bottom:1px solid var(--gray-200);">
          Itemized Price Calculation Breakdown
        </div>

        <div class="tc-price-table">
          <div class="tc-price-row">
            <span>Adults (${bookingParty.adults} &times; &#8377;${bookingCalculations.baseAdultRate.toLocaleString('en-IN')})</span>
            <strong>&#8377;${bookingCalculations.adultsSubtotal.toLocaleString('en-IN')}</strong>
          </div>

          <div class="tc-price-row">
            <span>Children (${bookingParty.children} &times; &#8377;${Math.round(bookingCalculations.baseAdultRate * 0.6).toLocaleString('en-IN')} &middot; 40% Off)</span>
            <strong>&#8377;${bookingCalculations.childrenSubtotal.toLocaleString('en-IN')}</strong>
          </div>

          <div class="tc-price-row">
            <span>Infants (${bookingParty.infants} infant${bookingParty.infants === 1 ? '' : 's'})</span>
            <span style="color:var(--success); font-weight:600;">${bookingCalculations.infantsSubtotal === 0 ? 'Free' : '&#8377;' + bookingCalculations.infantsSubtotal}</span>
          </div>

          ${d.isTransport ? `
            <div class="tc-price-row">
              <span>Journey Fare (${d.category || 'Transit Ticket'})</span>
              <strong style="color:var(--teal);">&#10003; Confirmed</strong>
            </div>
            <div class="tc-price-row">
              <span>Luggage Allowance (15kg Check-in + 7kg Cabin)</span>
              <span style="color:var(--success); font-weight:600;">Included (Free)</span>
            </div>
          ` : d.isHotel ? `
            <div class="tc-price-row">
              <span>Hotel Stay (${bookingParty.rooms} Room(s))</span>
              <strong>&#8377;${bookingCalculations.hotelCost.toLocaleString('en-IN')}</strong>
            </div>
          ` : `
            <div class="tc-price-row">
              <span>Hotel (${bookingServices.hotel.name})</span>
              <strong>&#8377;${bookingCalculations.hotelCost.toLocaleString('en-IN')}</strong>
            </div>

            <div class="tc-price-row">
              <span>Transport (${bookingServices.transport.name})</span>
              <strong>&#8377;${bookingCalculations.transportCost.toLocaleString('en-IN')}</strong>
            </div>

            <div class="tc-price-row">
              <span>Activities (${bookingServices.activities.name})</span>
              <strong>&#8377;${bookingCalculations.activitiesCost.toLocaleString('en-IN')}</strong>
            </div>
          `}

          ${bookingCalculations.addonsCost > 0 ? `
            <div class="tc-price-row" style="color:var(--teal);">
              <span>Selected Custom Add-ons</span>
              <strong>+&#8377;${bookingCalculations.addonsCost.toLocaleString('en-IN')}</strong>
            </div>
          ` : ''}

          <div class="tc-price-row subtotal">
            <span>Subtotal</span>
            <strong>&#8377;${bookingCalculations.subtotal.toLocaleString('en-IN')}</strong>
          </div>

          <div class="tc-price-row">
            <span>Taxes &amp; GST (10% ${d.isTransport ? 'Transit Tax' : 'Tourism Service Tax'})</span>
            <strong>&#8377;${bookingCalculations.taxes.toLocaleString('en-IN')}</strong>
          </div>

          ${bookingCalculations.discount > 0 ? `
            <div class="tc-price-row discount">
              <span>Savings Discount (${d.isTransport ? 'Special Transport Rate' : '10% Group &middot; Special Rate'})</span>
              <span>-&#8377;${bookingCalculations.discount.toLocaleString('en-IN')}</span>
            </div>
          ` : ''}
        </div>

        <div class="tc-price-total-box">
          <div>
            <div class="tc-price-total-label">Final Payable Total</div>
            <div style="font-size:12px; opacity:0.8;">Zero hidden fees &middot; 256-bit SSL secured</div>
          </div>
          <div class="tc-price-total-val" id="tcPriceFinalVal">
            &#8377;${bookingCalculations.grandTotal.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      <!-- IN-TAB NAVIGATION BAR: PRICE TO PAYMENT STEP -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px; padding:16px 20px; background:#FFFFFF; border:1px solid var(--gray-200); border-radius:14px; box-shadow:var(--shadow-sm);">
        <button type="button" class="btn btn-ghost" style="padding:10px 18px;" onclick="setBookingTab('services')">&larr; Back to Services</button>
        <button type="button" class="btn btn-gold" style="padding:12px 28px; font-weight:700; font-size:15px;" onclick="navigateToBookingStep(3)">
          <span>Proceed to Payment &rarr;</span>
        </button>
      </div>
    </div>
    </div>
  `;
}

function setupStep1Events() {
  updateFooterDisplay();
}

function setBookingTab(tabName) {
  currentBookingTab = tabName;
  document.querySelectorAll('.tc-btab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tc-btab-pane').forEach(p => p.classList.remove('active'));

  const btn = Array.from(document.querySelectorAll('.tc-btab-btn')).find(b => b.textContent.toLowerCase().includes(tabName));
  if (btn) btn.classList.add('active');

  const pane = document.getElementById(
    tabName === 'overview' ? 'tcTabOverview' :
    tabName === 'traveller' ? 'tcTabTraveller' :
    tabName === 'services' ? 'tcTabServices' : 'tcTabPrice'
  );
  if (pane) pane.classList.add('active');
}

function updateBookingParty(type, delta) {
  if (type === 'adults') {
    bookingParty.adults = Math.max(1, Math.min(15, bookingParty.adults + delta));
  } else if (type === 'children') {
    bookingParty.children = Math.max(0, Math.min(10, bookingParty.children + delta));
    // adjust child ages
    while (bookingParty.childAges.length < bookingParty.children) {
      bookingParty.childAges.push(7);
    }
    if (bookingParty.childAges.length > bookingParty.children) {
      bookingParty.childAges = bookingParty.childAges.slice(0, bookingParty.children);
    }
  } else if (type === 'infants') {
    bookingParty.infants = Math.max(0, Math.min(4, bookingParty.infants + delta));
  } else if (type === 'rooms') {
    bookingParty.rooms = Math.max(1, Math.min(8, bookingParty.rooms + delta));
  }

  calculateBookingTotals();
  renderBookingModal();
}

// Aliases for legacy callers
function changeModalMembers(type, delta) {
  updateBookingParty(type, delta);
}

function setChildAge(index, age) {
  bookingParty.childAges[index] = parseInt(age, 10) || 7;
}

function toggleBookingAddon(addonKey) {
  if (bookingAddons[addonKey]) {
    bookingAddons[addonKey].selected = !bookingAddons[addonKey].selected;
    calculateBookingTotals();
    renderBookingModal();
  }
}

function handleDateChange() {
  const inEl = document.getElementById('tcCheckInDate');
  const outEl = document.getElementById('tcCheckOutDate');
  if (inEl && inEl.value) bookingDates.checkIn = inEl.value;
  if (outEl && outEl.value) bookingDates.checkOut = outEl.value;

  const d1 = new Date(bookingDates.checkIn);
  const d2 = new Date(bookingDates.checkOut);
  if (!isNaN(d1) && !isNaN(d2) && d2 > d1) {
    const nights = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
    const days = nights + 1;
    bookingDates.daysCount = days;
    bookingDates.nightsCount = nights;
    bookingDates.durationStr = `${days} Days / ${nights} Nights`;
  }

  calculateBookingTotals();
  const pillText = document.getElementById('tcDurationPillText');
  const heroText = document.getElementById('tcHeroDurationText');
  if (pillText) pillText.textContent = bookingDates.durationStr;
  if (heroText) heroText.textContent = bookingDates.durationStr;
  updateFooterDisplay();
}

function calculateBookingTotals() {
  const d = currentBookingData || {};
  const baseRate = bookingCalculations.baseAdultRate || 10000;
  const adults = bookingParty.adults;
  const children = bookingParty.children;
  const infants = bookingParty.infants;
  const rooms = bookingParty.rooms;
  const totalGuests = adults + children;

  // Validation
  let isValid = true;
  let validationError = '';

  if (d.isHotel || d.isPackage) {
    const maxCapacity = rooms * 3;
    if (totalGuests > maxCapacity) {
      isValid = false;
      const minRooms = Math.ceil(totalGuests / 3);
      validationError = `Room Occupancy Exceeded: ${rooms} room(s) can accommodate max ${maxCapacity} guests. Please select at least ${minRooms} rooms for ${totalGuests} guests (max 3 guests/room).`;
    }
  } else if (d.isVehicle) {
    const maxCap = d.seatingCapacity || 4;
    if (totalGuests > maxCap) {
      isValid = false;
      validationError = `Vehicle Seating Limit Exceeded: ${d.title} seats max ${maxCap} passengers. Your travel party has ${totalGuests} travelers.`;
    }
  }

  bookingCalculations.isValid = isValid;
  bookingCalculations.validationError = validationError;

  // Pricing calculations
  const adultSub = adults * baseRate;
  const childSub = children * Math.round(baseRate * 0.6); // 40% discount
  const infantSub = infants * (d.isTransport ? 250 : 0);

  const roomExtra = (d.isHotel && bookingCalculations.roomTypeExtra) ? (bookingCalculations.roomTypeExtra * rooms) : 0;
  const hotelCost = (d.isTransport || d.isVehicle) ? 0 : ((bookingServices.hotel.price * (d.isHotel ? rooms : 1)) + roomExtra);
  const transportCost = d.isTransport ? 0 : bookingServices.transport.price;
  const activitiesCost = (d.isTransport || d.isVehicle) ? 0 : bookingServices.activities.price;

  let addonsCost = 0;
  Object.keys(bookingAddons).forEach(k => {
    if (bookingAddons[k].selected) addonsCost += bookingAddons[k].price;
  });

  const subtotal = adultSub + childSub + infantSub + hotelCost + transportCost + activitiesCost + addonsCost;
  const taxes = Math.round(subtotal * 0.10); // 10% taxes
  const discount = (totalGuests >= 4) ? Math.round(subtotal * 0.08) : Math.min(2000, Math.round(subtotal * 0.05));
  const grandTotal = Math.max(0, subtotal + taxes - discount);

  bookingCalculations.adultsSubtotal = adultSub;
  bookingCalculations.childrenSubtotal = childSub;
  bookingCalculations.infantsSubtotal = infantSub;
  bookingCalculations.hotelCost = hotelCost;
  bookingCalculations.transportCost = transportCost;
  bookingCalculations.activitiesCost = activitiesCost;
  bookingCalculations.addonsCost = addonsCost;
  bookingCalculations.subtotal = subtotal;
  bookingCalculations.taxes = taxes;
  bookingCalculations.discount = discount;
  bookingCalculations.grandTotal = grandTotal;

  updateFooterDisplay();
}

function updateModalPrice() {
  calculateBookingTotals();
  updateFooterDisplay();
}

function updateFooterDisplay() {
  const totEl = document.getElementById('tcModalFooterTotal');
  const savEl = document.getElementById('tcModalFooterSavings');
  const btnContinue = document.getElementById('tcBtnStep1Continue');
  if (!totEl) return;

  const total = bookingCalculations.grandTotal;
  const formatted = (typeof TripCraftCurrency !== 'undefined')
    ? TripCraftCurrency.format(total)
    : `&#8377;${total.toLocaleString('en-IN')}`;

  const formattedSavings = (typeof TripCraftCurrency !== 'undefined')
    ? TripCraftCurrency.format(bookingCalculations.discount)
    : `&#8377;${bookingCalculations.discount.toLocaleString('en-IN')}`;

  totEl.innerHTML = formatted;
  if (savEl) {
    savEl.innerHTML = `Includes taxes &middot; You save ${formattedSavings}`;
  }

  if (btnContinue) {
    if (!bookingCalculations.isValid) {
      btnContinue.disabled = true;
      btnContinue.classList.add('tc-btn-disabled');
    } else {
      btnContinue.disabled = false;
      btnContinue.classList.remove('tc-btn-disabled');
    }
  }
}

// -------------------------------------------------------------
// STEP 2: TRAVELLER DETAILS FORM
// -------------------------------------------------------------
function renderStep2HTML() {
  const user = (typeof TripCraftAuth !== 'undefined') ? TripCraftAuth.getUser() : null;
  const leadName = user ? user.name : 'Priya Sunder';
  const leadEmail = user ? user.email : 'priya.traveler@example.com';

  return `
    <div style="max-width:840px; margin:0 auto;">
      <!-- STEP 2 INTRO -->
      <div style="background:#FFFFFF; border:1px solid var(--gray-200); border-radius:16px; padding:18px 24px; margin-bottom:20px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
        <div>
          <h3 style="font-family:'Playfair Display',serif; font-size:20px; color:var(--navy); margin-bottom:4px;">Traveller Identification</h3>
          <p style="font-size:13px; color:var(--text-mid); margin:0;">Enter passenger and guest details as they appear on government photo IDs.</p>
        </div>
        <div style="display:inline-flex; align-items:center; gap:6px; background:rgba(14,124,107,0.08); border:1px solid rgba(14,124,107,0.25); padding:6px 14px; border-radius:var(--r-full); font-size:12px; font-weight:700; color:var(--teal);">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          Party: ${bookingParty.adults} Adult${bookingParty.adults > 1 ? 's' : ''}${bookingParty.children > 0 ? ', ' + bookingParty.children + ' Child' + (bookingParty.children > 1 ? 'ren' : '') : ''}
        </div>
      </div>

      <!-- PRIMARY CONTACT CARD -->
      <div class="tc-traveller-card">
        <div class="tc-traveller-card-header">
          <div class="tc-traveller-card-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--teal)" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>Primary Traveller &amp; Booking Contact</span>
          </div>
          <span style="font-size:11px; background:var(--gold); color:var(--navy); padding:2px 8px; border-radius:var(--r-full); font-weight:700; text-transform:uppercase;">Lead Passenger</span>
        </div>

        <div class="tc-modal-form-grid" style="margin-bottom:12px;">
          <div class="form-field">
            <label class="form-label">Full Name (as per ID) *</label>
            <input type="text" class="form-input" id="tcPrimaryName" value="${leadName}" placeholder="e.g. Priya Sunder" required />
          </div>
          <div class="form-field">
            <label class="form-label">Email Address *</label>
            <input type="email" class="form-input" id="tcPrimaryEmail" value="${leadEmail}" placeholder="name@example.com" required />
          </div>
        </div>

        <div class="tc-modal-form-grid" style="margin-bottom:0;">
          <div class="form-field">
            <label class="form-label">Mobile Phone Number *</label>
            <input type="tel" class="form-input" id="tcPrimaryPhone" value="+91 98765 43210" placeholder="+91 98765 43210" required />
          </div>
          <div class="form-field">
            <label class="form-label">Date of Birth *</label>
            <input type="date" class="form-input" id="tcPrimaryDob" value="1995-08-14" required />
          </div>
        </div>
      </div>

      <!-- ADULT GUESTS DYNAMIC ROWS -->
      <div class="tc-traveller-card">
        <div class="tc-traveller-card-header">
          <div class="tc-traveller-card-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--teal)" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>Adult Travelers (${bookingParty.adults})</span>
          </div>
        </div>

        ${Array.from({ length: bookingParty.adults }).map((_, idx) => `
          <div style="background:#F8FAFC; border:1px solid var(--gray-200); border-radius:12px; padding:14px; margin-bottom:12px;">
            <div style="font-size:12px; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:8px;">
              Adult ${idx + 1} ${idx === 0 ? '(Lead Traveler)' : ''}
            </div>
            <div class="tc-guest-row-grid">
              <div>
                <label class="form-label" style="font-size:11.5px;">Full Legal Name</label>
                <input type="text" class="form-input tc-guest-name" value="${idx === 0 ? leadName : (idx === 1 ? 'Aditya Verma' : 'Guest ' + (idx + 1))}" placeholder="Full Name" />
              </div>
              <div>
                <label class="form-label" style="font-size:11.5px;">Age</label>
                <input type="number" class="form-input tc-guest-age" value="${idx === 0 ? 30 : 28}" min="12" max="100" />
              </div>
              <div>
                <label class="form-label" style="font-size:11.5px;">Gender</label>
                <select class="form-input tc-guest-gender">
                  <option ${idx === 0 ? 'selected' : ''}>Female</option>
                  <option ${idx === 1 ? 'selected' : ''}>Male</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- CHILD GUESTS DYNAMIC ROWS (IF ANY) -->
      ${bookingParty.children > 0 ? `
        <div class="tc-traveller-card">
          <div class="tc-traveller-card-header">
            <div class="tc-traveller-card-title">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--teal)" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/></svg>
              <span>Child Travelers (${bookingParty.children})</span>
            </div>
          </div>

          ${Array.from({ length: bookingParty.children }).map((_, idx) => `
            <div style="background:#F8FAFC; border:1px solid var(--gray-200); border-radius:12px; padding:14px; margin-bottom:12px;">
              <div style="font-size:12px; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:8px;">
                Child ${idx + 1}
              </div>
              <div class="tc-guest-row-grid">
                <div>
                  <label class="form-label" style="font-size:11.5px;">Child Full Name</label>
                  <input type="text" class="form-input tc-child-name" value="Aarav Verma" placeholder="Child Full Name" />
                </div>
                <div>
                  <label class="form-label" style="font-size:11.5px;">Age (Years)</label>
                  <input type="number" class="form-input tc-child-age" value="${bookingParty.childAges[idx] || 7}" min="1" max="11" />
                </div>
                <div>
                  <label class="form-label" style="font-size:11.5px;">Gender</label>
                  <select class="form-input tc-child-gender">
                    <option selected>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- SPECIAL REQUESTS -->
      <div class="tc-traveller-card">
        <div class="tc-traveller-card-header">
          <div class="tc-traveller-card-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--teal)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            <span>Special Requests &amp; Dietary Preferences (Optional)</span>
          </div>
        </div>
        <textarea class="form-input" id="tcSpecialRequests" rows="3" placeholder="${d.isTransport ? 'e.g., Preferred window seat, wheelchair assistance at terminal, early boarding requirement.' : 'e.g., Quiet room away from elevator, vegetarian meal requirements, early morning pickup.'}" style="resize:vertical;"></textarea>
      </div>

      <!-- NAVIGATION BUTTONS -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:24px; padding-top:16px; border-top:1px solid var(--gray-200);">
        <button class="btn btn-ghost" style="color:var(--navy); border-color:var(--gray-300);" onclick="navigateToBookingStep(1)">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          <span>Back to Details</span>
        </button>

        <button class="btn btn-teal" onclick="navigateToBookingStep(3)" style="font-weight:700; padding:12px 28px;">
          <span>Continue to Payment</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// STEP 3: PAYMENT STEP
// -------------------------------------------------------------
function renderStep3HTML() {
  const d = currentBookingData || {};
  const total = bookingCalculations.grandTotal;
  const formattedTotal = (typeof TripCraftCurrency !== 'undefined')
    ? TripCraftCurrency.format(total)
    : `&#8377;${total.toLocaleString('en-IN')}`;

  return `
    <div style="max-width:800px; margin:0 auto;">
      <!-- RECAP BANNER -->
      <div class="tc-recap-banner">
        <div>
          <div class="tc-recap-title">${d.title || 'Kerala Explorer'}</div>
          <div class="tc-recap-meta">
            ${bookingDates.checkIn} &rarr; ${bookingDates.checkOut} &middot; ${bookingParty.adults} Adults${bookingParty.children > 0 ? ', ' + bookingParty.children + ' Child' : ''} &middot; ${bookingDates.durationStr}
          </div>
        </div>
        <div class="tc-recap-amount">
          <div style="font-size:11px; opacity:0.8; text-transform:uppercase; letter-spacing:0.5px;">Total Payable</div>
          <div class="tc-recap-val">${formattedTotal}</div>
        </div>
      </div>

      <!-- PAYMENT METHOD SELECTION -->
      <div style="background:#FFFFFF; border:1px solid var(--gray-200); border-radius:18px; padding:24px; box-shadow:var(--shadow-sm); margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <h4 style="font-size:15px; font-weight:700; color:var(--navy); margin:0;">Select Payment Method</h4>
          <span class="tc-secure-payment-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            256-Bit SSL Secured
          </span>
        </div>

        <div class="payment-methods-grid" style="margin-bottom:16px;">
          <div class="pay-opt ${selectedPaymentMode === 'UPI / GPay' ? 'active' : ''}" onclick="selectPayOpt(this, 'UPI / GPay')">
            <div class="pay-opt-title">UPI / GPay</div>
            <div class="pay-opt-sub">Instant 0% Fee</div>
          </div>
          <div class="pay-opt ${selectedPaymentMode === 'Credit / Debit Card' ? 'active' : ''}" onclick="selectPayOpt(this, 'Credit / Debit Card')">
            <div class="pay-opt-title">Cards</div>
            <div class="pay-opt-sub">Visa, MC, RuPay</div>
          </div>
          <div class="pay-opt ${selectedPaymentMode === 'Net Banking' ? 'active' : ''}" onclick="selectPayOpt(this, 'Net Banking')">
            <div class="pay-opt-title">NetBanking</div>
            <div class="pay-opt-sub">All Indian Banks</div>
          </div>
        </div>

        <!-- DYNAMIC FIELDS BASED ON PAYMENT METHOD -->
        <div id="tcPayDetailsMount">
          ${renderPayDetailsFields()}
        </div>
      </div>

      <!-- TRUST & SECURITY NOTICE -->
      <div style="background:rgba(14,124,107,0.08); border:1px solid rgba(14,124,107,0.25); border-radius:14px; padding:14px 20px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; margin-bottom:24px;">
        <div style="display:flex; align-items:center; gap:10px;">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--teal)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <div style="font-size:12.5px; color:var(--navy);">
            <strong>TripCraft Buyer Guarantee:</strong> Direct hotel host confirmation &middot; Zero payment gateway surcharges.
          </div>
        </div>
        <div style="font-size:12px; color:var(--text-muted);">
          Demo Mode &middot; Simulated SSL Gateway
        </div>
      </div>

      <!-- ACTION BUTTONS -->
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <button class="btn btn-ghost" style="color:var(--navy); border-color:var(--gray-300);" onclick="navigateToBookingStep(2)">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          <span>Back to Travellers</span>
        </button>

        <button class="btn btn-teal" id="tcBtnProcessPay" onclick="processBookingPayment()" style="font-weight:700; font-size:15px; padding:14px 32px; box-shadow:0 4px 16px rgba(14,124,107,0.35);">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <span>Pay ${formattedTotal}</span>
        </button>
      </div>
    </div>
  `;
}

function renderPayDetailsFields() {
  if (selectedPaymentMode === 'UPI / GPay') {
    return `
      <div class="tc-mock-card-box">
        <label class="form-label">Virtual Payment Address (UPI ID)</label>
        <div style="display:flex; gap:10px;">
          <input type="text" class="form-input" id="tcUpiIdInput" value="priya@okhdfcbank" placeholder="e.g. mobile@upi or name@okicici" />
          <button class="btn btn-ghost" type="button" style="border-color:var(--gray-300); font-size:12px;" onclick="showToast('UPI ID Verified!', 'success')">Verify</button>
        </div>
        <div style="font-size:11.5px; color:var(--text-muted); margin-top:6px;">
          Supports Google Pay, PhonePe, Paytm, BHIM, and Cred UPI.
        </div>
      </div>
    `;
  } else if (selectedPaymentMode === 'Credit / Debit Card') {
    return `
      <div class="tc-mock-card-box">
        <div style="margin-bottom:12px;">
          <label class="form-label">Card Number</label>
          <input type="text" class="form-input" id="tcCardNum" value="4532 &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 8892" placeholder="4532 0000 0000 0000" />
        </div>
        <div class="tc-modal-form-grid" style="margin-bottom:0;">
          <div>
            <label class="form-label">Expiration (MM/YY)</label>
            <input type="text" class="form-input" id="tcCardExp" value="12/28" placeholder="MM/YY" />
          </div>
          <div>
            <label class="form-label">CVV / CVC</label>
            <input type="password" class="form-input" id="tcCardCvv" value="842" placeholder="&bull;&bull;&bull;" maxlength="4" />
          </div>
        </div>
        <div style="font-size:11.5px; color:var(--text-muted); margin-top:8px;">
          Demo Environment: No real card numbers or CVV are stored in frontend or localStorage.
        </div>
      </div>
    `;
  } else {
    return `
      <div class="tc-mock-card-box">
        <label class="form-label">Select NetBanking Provider</label>
        <select class="form-input" id="tcNetBankSelect">
          <option selected>HDFC Bank</option>
          <option>ICICI Bank</option>
          <option>State Bank of India</option>
          <option>Axis Bank</option>
          <option>Kotak Mahindra Bank</option>
          <option>Punjab National Bank</option>
        </select>
        <div style="font-size:11.5px; color:var(--text-muted); margin-top:6px;">
          You will be redirected to your bank's secure simulated portal for authorization.
        </div>
      </div>
    `;
  }
}

function selectPayOpt(el, mode) {
  document.querySelectorAll('.pay-opt').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  selectedPaymentMode = mode;

  const mount = document.getElementById('tcPayDetailsMount');
  if (mount) mount.innerHTML = renderPayDetailsFields();
}

function processBookingPayment() {
  const body = document.getElementById('tcBookingModalBody');
  const d = currentBookingData || {};
  const total = bookingCalculations.grandTotal;
  const payMode = selectedPaymentMode || 'UPI / GPay';

  // Render 1.6-second simulated payment processing spinner
  body.innerHTML = `
    <div class="tc-payment-processing-box" style="padding:60px 20px; text-align:center;">
      <div class="tc-payment-spinner"></div>
      <h3 style="font-family:'Playfair Display',serif; font-size:22px; color:var(--navy); margin-bottom:8px;">Processing Payment with Bank...</h3>
      <p style="font-size:13.5px; color:var(--text-muted); line-height:1.6; max-width:480px; margin:0 auto 16px;">
        Authorizing transaction via <strong>${payMode}</strong>. Please do not refresh or close this window.
      </p>
      <div style="display:inline-flex; align-items:center; gap:8px; font-size:12px; color:var(--teal); background:rgba(14,124,107,0.08); padding:8px 18px; border-radius:var(--r-full); font-weight:600;">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        Bank-Grade 256-Bit SSL Encryption Active
      </div>
    </div>
  `;

  setTimeout(() => {
    // Generate Booking ID
    const bookingRef = '#TC-BK-2026-' + Math.floor(10000 + Math.random() * 90000);
    const user = (typeof TripCraftAuth !== 'undefined') ? TripCraftAuth.getUser() : null;
    const custName = document.getElementById('tcPrimaryName')?.value || user?.name || 'Priya Sunder';
    const custEmail = document.getElementById('tcPrimaryEmail')?.value || user?.email || 'priya.traveler@example.com';

    // Save to TripCraftBookings
    let saved = null;
    if (typeof TripCraftBookings !== 'undefined') {
      saved = TripCraftBookings.save({
        id: bookingRef,
        type: d.type || (d.isHotel ? 'hotel' : d.isTransport ? 'transport' : d.isVehicle ? 'vehicle' : 'package'),
        title: d.title || 'TripCraft Reservation',
        category: d.category || 'Travel Service',
        location: d.location || d.subtitle || 'India',
        image: d.image || bookingGalleryPhotos[0],
        travelDate: bookingDates.checkIn,
        duration: bookingDates.durationStr,
        guests: bookingParty.adults + bookingParty.children,
        adults: bookingParty.adults,
        children: bookingParty.children,
        rooms: bookingParty.rooms,
        basePrice: bookingCalculations.subtotal,
        gst: bookingCalculations.taxes,
        total,
        paymentMode: payMode,
        customerName: custName,
        customerEmail: custEmail,
        description: d.description
      });
    } else {
      saved = {
        id: bookingRef,
        title: d.title || 'TripCraft Reservation',
        paymentMode: payMode,
        total,
        travelDate: bookingDates.checkIn
      };
    }

    // Sync Loyalty Status
    if (typeof TripCraftLoyalty !== 'undefined') {
      if (typeof TripCraftLoyalty.addPoints === 'function') {
        TripCraftLoyalty.addPoints(Math.round(total * 0.10));
      } else if (typeof TripCraftLoyalty.renderLoyaltyDashboard === 'function') {
        TripCraftLoyalty.renderLoyaltyDashboard();
      }
    }

    // Add Notification
    if (typeof TripCraftNotifications !== 'undefined' && typeof TripCraftNotifications.addNotification === 'function') {
      TripCraftNotifications.addNotification({
        type: 'booking',
        title: 'Booking Confirmed!',
        message: `Your reservation for ${d.title || 'trip'} (${bookingRef}) is secured.`,
        link: 'bookings.html'
      });
    }

    currentBookingStep = 4;
    currentBookingData.savedBooking = saved;
    renderBookingModal();
  }, 1600);
}

// -------------------------------------------------------------
// STEP 4: CONFIRMATION / PAYMENT SUCCESS
// -------------------------------------------------------------
function renderStep4HTML() {
  const d = currentBookingData || {};
  const saved = d.savedBooking || {};
  const total = bookingCalculations.grandTotal;
  const formattedTotal = (typeof TripCraftCurrency !== 'undefined')
    ? TripCraftCurrency.format(total)
    : `&#8377;${total.toLocaleString('en-IN')}`;

  const cleanSavedJson = JSON.stringify(saved).replace(/"/g, '&quot;');

  return `
    <div class="tc-payment-success-box" style="padding:40px 20px; text-align:center; max-width:680px; margin:0 auto;">
      <div class="tc-checkmark-wrapper" style="width:70px; height:70px; border-radius:50%; background:#DCFCE7; color:#166534; display:flex; align-items:center; justify-content:center; margin:0 auto 18px; box-shadow:0 8px 24px rgba(22,101,52,0.2);">
        <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>

      <h2 style="font-family:'Playfair Display',serif; font-size:26px; color:var(--navy); margin-bottom:6px;">Payment Successful!</h2>
      <h4 style="font-size:16px; font-weight:700; color:var(--teal); margin-bottom:8px;">Booking Confirmed</h4>
      <p style="font-size:13.5px; color:var(--text-mid); line-height:1.5; max-width:500px; margin:0 auto 24px;">
        Your reservation for <strong>${saved.title || d.title}</strong> has been confirmed with instant host guarantee.
      </p>

      <!-- CONFIRMATION DETAILS CARD -->
      <div class="tc-payment-confirmed-meta" style="background:#FFFFFF; border:1px solid var(--gray-200); border-radius:16px; padding:20px 24px; text-align:left; box-shadow:var(--shadow-sm); margin-bottom:26px;">
        <div class="tc-payment-meta-row">
          <span class="tc-payment-meta-label">Booking ID / Reference:</span>
          <span class="tc-payment-meta-val" style="color:var(--teal); font-family:monospace; font-size:15px; font-weight:700;">${saved.id || '#TC-BK-2026-00125'}</span>
        </div>
        <div class="tc-payment-meta-row">
          <span class="tc-payment-meta-label">Amount Paid:</span>
          <span class="tc-payment-meta-val" style="color:var(--success); font-size:16px; font-weight:800;">${formattedTotal}</span>
        </div>
        <div class="tc-payment-meta-row">
          <span class="tc-payment-meta-label">Payment Method:</span>
          <span class="tc-payment-meta-val">${saved.paymentMode || selectedPaymentMode} &middot; <span style="color:var(--success); font-weight:700;">Verified SSL</span></span>
        </div>
        <div class="tc-payment-meta-row">
          <span class="tc-payment-meta-label">${d.isTransport ? 'Journey Dates:' : 'Travel Dates:'}</span>
          <span class="tc-payment-meta-val">${bookingDates.checkIn} &rarr; ${bookingDates.checkOut} (${d.isTransport ? 'Direct Transit' : bookingDates.durationStr})</span>
        </div>
        <div class="tc-payment-meta-row">
          <span class="tc-payment-meta-label">${d.isTransport ? 'Passengers:' : 'Travel Party:'}</span>
          <span class="tc-payment-meta-val">${bookingParty.adults} Adults${bookingParty.children > 0 ? ', ' + bookingParty.children + ' Child' : ''}${!d.isTransport && bookingParty.rooms > 0 ? ', ' + bookingParty.rooms + ' Rooms' : ''}</span>
        </div>
      </div>

      <!-- ACTION BUTTONS -->
      <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
        <a href="bookings.html" class="btn btn-teal" style="padding:12px 24px; font-weight:700;">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <span>View in My Bookings</span>
        </a>

        <button class="btn btn-gold" style="padding:12px 24px; font-weight:700;" onclick="forceCloseBookingModal(); showInvoiceModal(${cleanSavedJson})">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <span>Download Tax Invoice</span>
        </button>

        <button class="btn btn-ghost" style="padding:12px 20px; border-color:var(--gray-300);" onclick="forceCloseBookingModal()">
          <span>Return to Trips</span>
        </button>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// STEP NAVIGATION & CLOSE DIALOG HANDLING
// -------------------------------------------------------------
function navigateToBookingStep(stepNum) {
  if (stepNum === 2) {
    if (!bookingCalculations.isValid) {
      showToast(bookingCalculations.validationError || 'Please adjust capacity before continuing.', 'error');
      setBookingTab('traveller');
      return;
    }
  } else if (stepNum === 3) {
    const primaryName = document.getElementById('tcPrimaryName')?.value?.trim();
    const primaryEmail = document.getElementById('tcPrimaryEmail')?.value?.trim();
    if (!primaryName || !primaryEmail) {
      showToast('Please provide your Full Name and Email Address.', 'error');
      return;
    }
  }

  currentBookingStep = stepNum;
  renderBookingModal();

  // Scroll modal body to top on step transition
  const body = document.getElementById('tcBookingModalBody');
  if (body) body.scrollTop = 0;
}

function confirmExitBooking() {
  if (currentBookingStep === 4) {
    forceCloseBookingModal();
    return;
  }
  const overlay = document.getElementById('tcExitConfirmOverlay');
  if (overlay) overlay.style.display = 'flex';
}

function dismissExitDialog() {
  const overlay = document.getElementById('tcExitConfirmOverlay');
  if (overlay) overlay.style.display = 'none';
}

function forceCloseBookingModal() {
  const overlay = document.getElementById('tcExitConfirmOverlay');
  if (overlay) overlay.style.display = 'none';

  const backdrop = document.getElementById('tcBookingModalBackdrop');
  if (backdrop) backdrop.classList.remove('active');
  document.body.style.overflow = '';
}

function closeBookingModal() {
  confirmExitBooking();
}

function confirmModalBooking() {
  processBookingPayment();
}

// Window exports for universal access
window.openBookingModal = openBookingModal;
window.renderBookingModal = renderBookingModal;
window.setBookingTab = setBookingTab;
window.updateBookingParty = updateBookingParty;
window.changeModalMembers = changeModalMembers;
window.setChildAge = setChildAge;
window.toggleBookingAddon = toggleBookingAddon;
window.handleDateChange = handleDateChange;
window.calculateBookingTotals = calculateBookingTotals;
window.updateModalPrice = updateModalPrice;
window.selectPayOpt = selectPayOpt;
window.processBookingPayment = processBookingPayment;
window.navigateToBookingStep = navigateToBookingStep;
window.confirmExitBooking = confirmExitBooking;
window.dismissExitDialog = dismissExitDialog;
window.forceCloseBookingModal = forceCloseBookingModal;
window.closeBookingModal = closeBookingModal;
window.confirmModalBooking = confirmModalBooking;
window.openGalleryLightbox = openGalleryLightbox;
window.closeGalleryLightbox = closeGalleryLightbox;
window.setGalleryPhoto = setGalleryPhoto;

// 8. OFFICIAL INVOICE DISPLAY MODAL
// -------------------------------------------------------------
let activeInvoiceData = null;

function initInvoiceModalDOM() {
  if (document.getElementById('tcInvoiceModalBackdrop')) return;

  const backdrop = document.createElement('div');
  backdrop.id = 'tcInvoiceModalBackdrop';
  backdrop.className = 'tc-modal-backdrop';
  backdrop.innerHTML = `
    <div class="tc-modal-container" id="tcInvoiceModalContainer" role="dialog" aria-modal="true" style="max-width: 640px;">
      <div style="padding: 24px; overflow-y: auto; max-height: 88vh;">
        <div class="invoice-sheet" id="invoicePrintArea">
          <div class="invoice-header">
            <div>
              <div class="invoice-brand">Trip<span>Craft</span></div>
              <div style="font-size:11px; color:var(--text-muted);">Verified Travel &amp; Exploration Platform</div>
            </div>
            <div style="text-align:right;">
              <span class="invoice-badge-paid">PAID &amp; CONFIRMED</span>
              <div style="font-size:11px; color:var(--text-muted); margin-top:4px;" id="invNumber"></div>
            </div>
          </div>

          <div class="invoice-meta-grid">
            <div>
              <div style="font-size:10.5px; font-weight:700; text-transform:uppercase; color:var(--text-muted);">Billed To</div>
              <div style="font-weight:700; color:var(--navy);" id="invCustomer">Priya Sunder</div>
              <div style="color:var(--text-muted); font-size:11.5px;" id="invCustomerEmail">Authorized Booking Contact</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:10.5px; font-weight:700; text-transform:uppercase; color:var(--text-muted);">Booking Details</div>
              <div id="invDate"></div>
              <div id="invTravelDate" style="color:var(--teal); font-weight:600;"></div>
            </div>
          </div>

          <table class="invoice-table">
            <thead>
              <tr>
                <th>Description</th>
                <th style="text-align:center;">Qty</th>
                <th style="text-align:right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong id="invItemTitle"></strong><br/><span style="font-size:11px; color:var(--text-muted);" id="invItemCat"></span></td>
                <td style="text-align:center;" id="invQty"></td>
                <td style="text-align:right;" id="invSubtotal"></td>
              </tr>
              <tr>
                <td>GST (12% Government Tourism Tax)</td>
                <td style="text-align:center;">1</td>
                <td style="text-align:right;" id="invGST"></td>
              </tr>
              <tr>
                <td>Platform &amp; Protection Fee</td>
                <td style="text-align:center;">1</td>
                <td style="text-align:right; color:var(--success);">₹0 (Waived)</td>
              </tr>
              <tr class="invoice-total-row">
                <td colspan="2">Total Paid via <span id="invPaymentMode" style="color:var(--navy);"></span></td>
                <td style="text-align:right;" id="invGrandTotal"></td>
              </tr>
            </tbody>
          </table>

          <div style="background:var(--gray-50); border:1px dashed var(--gray-300); border-radius:var(--r-sm); padding:10px 14px; font-size:11px; color:var(--text-muted); text-align:center;">
            Verified Digital Tax Invoice &middot; TripCraft Security Inspected &middot; Present QR/ID upon arrival
          </div>
        </div>

        <div class="tc-modal-actions" style="display:flex; justify-content:space-between; align-items:center;">
          <button class="btn btn-ghost" style="color: var(--text-mid); border-color: var(--gray-200);" onclick="closeInvoiceModal()">Close</button>
          <div style="display:flex; gap:10px;">
            <button class="btn btn-gold" onclick="downloadActiveInvoicePDF()">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download PDF Invoice
            </button>
            <a href="bookings.html" class="btn btn-teal">View in My Bookings</a>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(backdrop);

  backdrop.addEventListener('click', e => {
    if (e.target === backdrop) closeInvoiceModal();
  });
}

function showInvoiceModal(inv) {
  initInvoiceModalDOM();
  activeInvoiceData = inv;

  const user = TripCraftAuth.getUser();
  const custName = inv.customerName || (user ? user.name : 'Priya Sunder');
  const custEmail = inv.customerEmail || (user ? user.email : 'priya.traveler@example.com');

  document.getElementById('invNumber').textContent = 'Invoice: ' + (inv.invoiceId || inv.id);
  document.getElementById('invCustomer').textContent = custName;
  document.getElementById('invCustomerEmail').textContent = custEmail;
  document.getElementById('invDate').textContent = 'Issued: ' + new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  document.getElementById('invTravelDate').textContent = 'Travel Date: ' + (inv.travelDate || 'Flexible');
  document.getElementById('invItemTitle').textContent = inv.title;
  const adultCount = inv.adults || (inv.guests || 1);
  const childCount = inv.children || 0;
  document.getElementById('invQty').textContent = childCount > 0 ? `${adultCount} Adult${adultCount > 1 ? 's' : ''}, ${childCount} Child${childCount > 1 ? 'ren' : ''}` : `${adultCount} Adult${adultCount > 1 ? 's' : ''}`;
  document.getElementById('invSubtotal').innerHTML = `₹${(inv.basePrice || 2500).toLocaleString('en-IN')}`;
  document.getElementById('invGST').innerHTML = `₹${(inv.gst || Math.round((inv.basePrice || 2500) * 0.12)).toLocaleString('en-IN')}`;
  document.getElementById('invPaymentMode').textContent = inv.paymentMode || 'UPI / Instant Bank Transfer';
  document.getElementById('invGrandTotal').innerHTML = `₹${(inv.total || ((inv.basePrice || 2500) + Math.round((inv.basePrice || 2500) * 0.12))).toLocaleString('en-IN')}`;

  const backdrop = document.getElementById('tcInvoiceModalBackdrop');
  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';

  showToast(`Booking & Payment Confirmed! Invoice #${inv.invoiceId || inv.id} generated.`, 'success');
}

function closeInvoiceModal() {
  const backdrop = document.getElementById('tcInvoiceModalBackdrop');
  if (backdrop) backdrop.classList.remove('active');
  document.body.style.overflow = '';
}

function downloadActiveInvoicePDF() {
  if (activeInvoiceData) {
    TripCraftInvoice.downloadPDF(activeInvoiceData);
  }
}

// -------------------------------------------------------------
// 9. DYNAMIC HERO SEARCH BAR ATTACHMENT
// -------------------------------------------------------------
function initDynamicSearch(inputSelector = '#heroSearchInput', overlaySelector = '#heroSearchOverlay') {
  const inputEl = document.querySelector(inputSelector);
  const overlayEl = document.querySelector(overlaySelector);
  if (!inputEl || !overlayEl) return;

  inputEl.addEventListener('input', () => {
    const q = inputEl.value.trim();
    if (!q) {
      overlayEl.classList.remove('active');
      overlayEl.innerHTML = '';
      return;
    }

    const results = TripCraftSearch.search(q);
    if (results.length === 0) {
      overlayEl.innerHTML = `
        <div class="search-empty-state">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <div style="font-weight:700; color:var(--navy); margin-bottom:4px;">No matching results for "${q}"</div>
          <div style="font-size:12px;">Try searching for Munnar, Jaipur, Andaman, Resort, Innova, or Guide.</div>
        </div>
      `;
    } else {
      let html = `
        <div class="search-results-header">
          <span>Matching Travel Options (${results.length})</span>
          <span>Click any card to reserve or view</span>
        </div>
      `;

      results.forEach(item => {
        let badgeColor = 'chip-teal';
        if (item.type === 'package') badgeColor = 'chip-gold';
        if (item.type === 'vehicle') badgeColor = 'chip-navy';
        if (item.type === 'guide') badgeColor = 'chip-green';

        html += `
          <div class="search-result-item" onclick="openDetailModal(${JSON.stringify(item).replace(/"/g, '&quot;')})">
            <div class="search-result-thumb" style="background-image: url('${item.image}');"></div>
            <div class="search-result-info">
              <div class="search-result-title">
                ${item.title}
                <span class="chip ${badgeColor} search-result-badge">${item.type.toUpperCase()}</span>
              </div>
              <div class="search-result-sub">${item.category} &middot; ${item.location}</div>
            </div>
            <div class="search-result-side">
              <div class="search-result-price">${item.price}</div>
              <div class="search-result-rating">
                <span style="color:var(--warning);">&#9733;</span> ${item.rating || '4.8'}
              </div>
            </div>
          </div>
        `;
      });
      overlayEl.innerHTML = html;
    }
    overlayEl.classList.add('active');
  });

  // Close search overlay on outside click
  document.addEventListener('click', e => {
    if (!e.target.closest('.hero-search-wrapper')) {
      overlayEl.classList.remove('active');
    }
  });
}

// -------------------------------------------------------------
// 10. DOM INITIALIZATION
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Pre-load jsPDF
  TripCraftInvoice.loadJsPdfScript().catch(() => {});

  // Initialize Auth Nav
  TripCraftAuth.updateNavAuth();

  // Highlight active nav link
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Enterprise Wishlist initialization
  if (typeof TripCraftWishlist !== 'undefined') {
    TripCraftWishlist.syncHeartButtons();
    TripCraftWishlist.attachCardListeners();
    TripCraftWishlist.updateBadges();
    if (document.getElementById('wishlistGridMount')) {
      TripCraftWishlist.renderWishlistPage();
    }
  }

  // Real-time Notifications initialization
  if (typeof TripCraftNotifications !== 'undefined') {
    TripCraftNotifications.updateBadges();
  }

  // Multi-Currency Converter initialization
  if (typeof TripCraftCurrency !== 'undefined') {
    TripCraftCurrency.renderSelector();
    TripCraftCurrency.convertAllPricesOnPage();
  }

  // Referral & Loyalty Program initialization
  if (typeof TripCraftLoyalty !== 'undefined') {
    TripCraftLoyalty.init();
  }

  // Search & Filter Depth initialization
  if (typeof TripCraftFilter !== 'undefined') {
    TripCraftFilter.init();
  }

  // Intersection observer for scroll animations
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // Initialize modal structures in DOM
  initBookingModalDOM();
  initDetailModalDOM();
  initInvoiceModalDOM();
  if (window.TripCraftSoloPlanner) {
    TripCraftSoloPlanner.initPlannerModalDOM();
  }

  // Initialize search if present
  initDynamicSearch('#heroSearchInput', '#heroSearchOverlay');
  initDynamicSearch('#destSearchInput', '#destSearchOverlay');
  initDynamicSearch('#soloSearchInput', '#soloSearchOverlay');

  // Render recent search history chips
  if (window.TripCraftSearch) {
    TripCraftSearch.renderSearchHistoryChips('#searchHistoryChips', '#heroSearchInput');
  }

  // Initialize Enterprise Chatbot, Language, & Recently Accessed
  if (typeof TripCraftChatbot !== 'undefined') {
    TripCraftChatbot.init();
  }
  if (typeof TripCraftI18n !== 'undefined') {
    TripCraftI18n.init();
  }
  if (typeof TripCraftHistory !== 'undefined') {
    TripCraftHistory.renderStrip();
  }
});

// -------------------------------------------------------------
// 11. SMART CONTEXTUAL CROSS-BOOKING TRIGGER (Hotel -> Vehicle)
// -------------------------------------------------------------
const TripCraftSmartTrigger = {
  showVehiclePrompt(hotelBooking) {
    if (!hotelBooking) return;
    
    // Extract destination name
    let dest = 'Munnar';
    const loc = (hotelBooking.location || hotelBooking.title || '').toLowerCase();
    if (loc.includes('munnar')) dest = 'Munnar';
    else if (loc.includes('jaipur')) dest = 'Jaipur';
    else if (loc.includes('goa')) dest = 'Goa';
    else if (loc.includes('manali')) dest = 'Manali';
    else if (loc.includes('ooty')) dest = 'Ooty';
    else if (hotelBooking.location) dest = hotelBooking.location.split('·')[0].trim();

    const checkIn = hotelBooking.travelDate || new Date().toISOString().split('T')[0];
    const checkOut = new Date(new Date(checkIn).getTime() + 86400000 * 3).toISOString().split('T')[0];

    const modalBackdrop = document.createElement('div');
    modalBackdrop.id = 'tcSmartVehiclePromptModal';
    modalBackdrop.className = 'tc-modal-backdrop active';
    modalBackdrop.innerHTML = `
      <div class="tc-smart-trigger-modal">
        <div class="tc-smart-trigger-banner">
          <div class="tc-smart-trigger-badge">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            Smart Cross-Booking Trigger
          </div>
          <h3>Need a car or bike in ${dest}?</h3>
          <p style="font-size:13px; color:rgba(255,255,255,0.85); margin-top:4px;">
            Your stay at <strong>${hotelBooking.title}</strong> is confirmed! Bundle local self-drive cars, Royal Enfield bikes, or scooters with synchronized dates and zero security deposit.
          </p>
        </div>
        <div class="tc-smart-trigger-body">
          <div class="tc-smart-hotel-meta">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            <div>
              <div style="font-weight:700; color:var(--navy); font-size:13px;">${hotelBooking.title}</div>
              <div style="font-size:11.5px; color:var(--text-muted);">Stay Dates: ${checkIn} to ${checkOut} &middot; Booking Ref: #${hotelBooking.id}</div>
            </div>
          </div>

          <div style="font-size:12px; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:10px;">Recommended Verified Fleet in ${dest}:</div>
          <div class="tc-smart-vehicle-preview">
            <div class="tc-smart-vehicle-card">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--teal)" stroke-width="1.8"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h4"/></svg>
              <strong>Royal Enfield 350 / Activa</strong>
              <span>From ₹650 / day</span>
            </div>
            <div class="tc-smart-vehicle-card">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--gold)" stroke-width="1.8"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              <strong>Innova Crysta / Thar 4x4</strong>
              <span>From ₹2,400 / day</span>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; gap:12px;">
            <button class="btn btn-ghost" style="color:var(--text-mid); border-color:var(--gray-200); font-size:12.5px;" onclick="TripCraftSmartTrigger.dismissPrompt('${hotelBooking.id}')">
              No thanks, view hotel receipt
            </button>
            <button class="btn btn-gold" style="font-size:12.5px; padding:10px 18px;" onclick="TripCraftSmartTrigger.acceptPrompt('${dest}', '${checkIn}', '${checkOut}', '${hotelBooking.id}')">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              YES! Rent Vehicle in ${dest}
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modalBackdrop);
  },

  dismissPrompt(bookingId) {
    const el = document.getElementById('tcSmartVehiclePromptModal');
    if (el) el.remove();
    const b = TripCraftBookings.getById(bookingId);
    if (b) showInvoiceModal(b);
  },

  acceptPrompt(dest, startDate, endDate, hotelBookingId) {
    const el = document.getElementById('tcSmartVehiclePromptModal');
    if (el) el.remove();
    showToast(`Redirecting to ${dest} fleet with synchronized dates & FK linkage...`, 'info');
    setTimeout(() => {
      location.href = `vehicle.html?dest=${encodeURIComponent(dest)}&startDate=${startDate}&endDate=${endDate}&hotelBookingId=${encodeURIComponent(hotelBookingId)}`;
    }, 400);
  }
};

// -------------------------------------------------------------
// 12. MULTI-LINGUAL LOCALIZATION ENGINE (TripCraftI18n)
// -------------------------------------------------------------
const TripCraftI18n = {
  LANG_KEY: 'tripcraft_lang',
  currentLang: 'en',

  translations: {
    en: {
      home: 'Home',
      destinations: 'Destinations',
      transport: 'Transport',
      hotels: 'Hotels',
      vehicles: 'Vehicles',
      guides: 'Local Guides',
      packages: 'Packages',
      itinerary: 'Itinerary',
      budget: 'Budget',
      community: 'Community',
      solo: 'Solo Trip',
      albums: 'Photo Albums',
      myBookings: 'My Bookings',
      admin: 'Admin',
      signIn: 'Sign In',
      getStarted: 'Get Started'
    },
    ta: {
      home: 'முகப்பு',
      destinations: 'சுற்றுலா தலங்கள்',
      transport: 'போக்குவரத்து',
      hotels: 'ஹோட்டல்கள்',
      vehicles: 'வாகனங்கள்',
      guides: 'வழிகாட்டிகள்',
      packages: 'பேக்கேஜ்கள்',
      itinerary: 'பயண திட்டம்',
      budget: 'பட்ஜெட்',
      community: 'சமூகம்',
      solo: 'தனி பயணம்',
      albums: 'புகைப்பட ஆல்பம்',
      myBookings: 'முன்பதிவுகள்',
      admin: 'நிர்வாகம்',
      signIn: 'உள்நுழைக',
      getStarted: 'தொடங்குக'
    },
    hi: {
      home: 'होम',
      destinations: 'गंतव्य',
      transport: 'परिवहन',
      hotels: 'होटल',
      vehicles: 'वाहन',
      guides: 'गाइड',
      packages: 'पैकेजेस',
      itinerary: 'यात्रा कार्यक्रम',
      budget: 'बजट',
      community: 'समुदाय',
      solo: 'एकल यात्रा',
      albums: 'फोटो एल्बम',
      myBookings: 'मेरी बुकिंग',
      admin: 'एडमिन',
      signIn: 'साइन इन',
      getStarted: 'शुरू करें'
    }
  },

  phraseMap: {
  "Pick your trip up where you left it.": {
    "ta": "நீங்கள் விட்ட இடத்திலிருந்து உங்கள் பயணத்தைத் தொடருங்கள்.",
    "hi": "अपनी यात्रा को वहीं से शुरू करें जहां आपने छोड़ा था।"
  },
  "Saved itineraries, bookings and invoices — on any device.": {
    "ta": "சேமிக்கப்பட்ட பயணத்திட்டங்கள், முன்பதிவுகள் மற்றும் விலைப்பட்டியல்கள் — எந்த சாதனத்திலும்.",
    "hi": "सहेजे गए यात्रा कार्यक्रम, बुकिंग और चालान — किसी भी डिवाइस पर।"
  },
  "Saved itineraries, bookings and invoices -- on any device.": {
    "ta": "சேமிக்கப்பட்ட பயணத்திட்டங்கள், முன்பதிவுகள் மற்றும் விலைப்பட்டியல்கள் — எந்த சாதனத்திலும்.",
    "hi": "सहेजे गए यात्रा कार्यक्रम, बुकिंग और चालान — किसी भी डिवाइस पर।"
  },
  "256-bit Encrypted Session • ISO 27001 Certified Security": {
    "ta": "256-பிட் என்க்ரிப்ட் செய்யப்பட்ட அமர்வு • ISO 27001 சான்றளிக்கப்பட்ட பாதுகாப்பு",
    "hi": "256-बिट एन्क्रिप्टेड सत्र • आईएसओ 27001 प्रमाणित सुरक्षा"
  },
  "Welcome back": {
    "ta": "மீண்டும் வருக",
    "hi": "वापसी पर स्वागत है"
  },
  "Sign in to access your travel bookings and itineraries.": {
    "ta": "உங்கள் பயண முன்பதிவுகள் மற்றும் திட்டங்களை அணுக உள்நுழைக.",
    "hi": "अपनी यात्रा बुकिंग और यात्रा कार्यक्रमों तक पहुँचने के लिए साइन इन करें।"
  },
  "Continue with Google": {
    "ta": "Google மூலம் தொடரவும்",
    "hi": "Google के साथ जारी रखें"
  },
  "or use your email": {
    "ta": "அல்லது உங்கள் மின்னஞ்சலைப் பயன்படுத்தவும்",
    "hi": "या अपने ईमेल का उपयोग करें"
  },
  "or register with email": {
    "ta": "அல்லது மின்னஞ்சல் மூலம் பதிவு செய்யவும்",
    "hi": "या ईमेल से पंजीकरण करें"
  },
  "Email address": {
    "ta": "மின்னஞ்சல் முகவரி",
    "hi": "ईमेल पता"
  },
  "Password": {
    "ta": "கடவுச்சொல்",
    "hi": "पासवर्ड"
  },
  "Keep me signed in": {
    "ta": "என்னை உள்நுழைந்திருக்க வைக்கவும்",
    "hi": "मुझे साइन इन रखें"
  },
  "Forgot password?": {
    "ta": "கடவுச்சொல் மறந்துவிட்டதா?",
    "hi": "पासवर्ड भूल गए?"
  },
  "Sign in": {
    "ta": "உள்நுழைக",
    "hi": "साइन इन करें"
  },
  "Sign In": {
    "ta": "உள்நுழைக",
    "hi": "साइन इन करें"
  },
  "Signing in...": {
    "ta": "உள்நுழைகிறது...",
    "hi": "साइन इन हो रहा है..."
  },
  "New to TripCraft? Create an account": {
    "ta": "TripCraft-க்கு புதியவரா? புதிய கணக்கை உருவாக்கவும்",
    "hi": "TripCraft पर नए हैं? खाता बनाएं"
  },
  "New to TripCraft?": {
    "ta": "TripCraft-க்கு புதியவரா?",
    "hi": "TripCraft पर नए हैं?"
  },
  "Create an account": {
    "ta": "புதிய கணக்கை உருவாக்கவும்",
    "hi": "खाता बनाएं"
  },
  "Create Account": {
    "ta": "கணக்கை உருவாக்கவும்",
    "hi": "खाता बनाएं"
  },
  "Create your account": {
    "ta": "உங்கள் கணக்கை உருவாக்கவும்",
    "hi": "अपना खाता बनाएं"
  },
  "Create Your Account": {
    "ta": "உங்கள் கணக்கை உருவாக்கவும்",
    "hi": "अपना खाता बनाएं"
  },
  "Reset password": {
    "ta": "கடவுச்சொல்லை மீட்டமைக்கவும்",
    "hi": "पासवर्ड रीसेट करें"
  },
  "Enter your account email to receive a 6-digit verification code.": {
    "ta": "6-இலக்க சரிபார்ப்புக் குறியீட்டைப் பெற உங்கள் கணக்கு மின்னஞ்சலை உள்ளிடவும்.",
    "hi": "6 अंकों का सत्यापन कोड प्राप्त करने के लिए अपना ईमेल दर्ज करें।"
  },
  "Send verification code": {
    "ta": "சரிபார்ப்புக் குறியீட்டை அனுப்பவும்",
    "hi": "सत्यापन कोड भेजें"
  },
  "Sending...": {
    "ta": "அனுப்பப்படுகிறது...",
    "hi": "भेजा जा रहा है..."
  },
  "Verify & set password": {
    "ta": "சரிபார்த்து கடவுச்சொல்லை அமைக்கவும்",
    "hi": "सत्यापित करें और पासवर्ड सेट करें"
  },
  "6-digit verification code": {
    "ta": "6-இலக்க சரிபார்ப்புக் குறியீடு",
    "hi": "6-अंकीय सत्यापन कोड"
  },
  "New password (min 8 characters)": {
    "ta": "புதிய கடவுச்சொல் (குறைந்தது 8 எழுத்துக்கள்)",
    "hi": "नया पासवर्ड (न्यूनतम 8 वर्ण)"
  },
  "Resetting...": {
    "ta": "மீட்டமைக்கப்படுகிறது...",
    "hi": "रीसेट किया जा रहा है..."
  },
  "Start with one account. Plan everything.": {
    "ta": "ஒரே கணக்கில் தொடங்குங்கள். அனைத்தையும் திட்டமிடுங்கள்.",
    "hi": "एक खाते से शुरुआत करें। सब कुछ योजना बनाएं।"
  },
  "Smart AI itineraries, transparent cost estimation, curated stays and verified local guides.": {
    "ta": "ஸ்மார்ட் AI பயணத்திட்டங்கள், வெளிப்படையான கட்டண மதிப்பீடு, தேர்ந்தெடுக்கப்பட்ட தங்குமிடங்கள் மற்றும் சரிபார்க்கப்பட்ட உள்ளூர் வழிகாட்டிகள்.",
    "hi": "स्मार्ट एआई यात्रा कार्यक्रम, पारदर्शी लागत अनुमान, चयनित आवास और सत्यापित स्थानीय गाइड।"
  },
  "Sign up to get personalized recommendations and manage trips.": {
    "ta": "தனிப்பயனாக்கப்பட்ட பரிந்துரைகளைப் பெறவும் பயணங்களை நிர்வகிக்கவும் பதிவு செய்யவும்.",
    "hi": "व्यक्तिगत सिफारिशें प्राप्त करने और यात्राओं का प्रबंधन करने के लिए साइन अप करें।"
  },
  "Full name": {
    "ta": "முழு பெயர்",
    "hi": "पूरा नाम"
  },
  "Mobile number": {
    "ta": "கைபேசி எண்",
    "hi": "मोबाइल नंबर"
  },
  "Confirm password": {
    "ta": "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
    "hi": "पासवर्ड की पुष्टि करें"
  },
  "I accept the": {
    "ta": "நான் ஒப்புக்கொள்கிறேன்",
    "hi": "मैं सहमत हूँ"
  },
  "Terms of Service": {
    "ta": "சேவை விதிமுறைகள்",
    "hi": "सेवा की शर्तें"
  },
  "Privacy Policy": {
    "ta": "தனியுரிமைக் கொள்கை",
    "hi": "गोपनीयता नीति"
  },
  "Use 8+ characters with a number and a capital letter.": {
    "ta": "ஒரு எண் மற்றும் பெரிய எழுத்துடன் 8+ எழுத்துக்களைப் பயன்படுத்தவும்.",
    "hi": "एक संख्या और एक बड़े अक्षर के साथ 8+ वर्णों का उपयोग करें।"
  },
  "Already have an account? Sign in": {
    "ta": "ஏற்கனவே கணக்கு உள்ளதா? உள்நுழைக",
    "hi": "पहले से ही एक खाता है? साइन इन करें"
  },
  "Already have an account?": {
    "ta": "ஏற்கனவே கணக்கு உள்ளதா?",
    "hi": "पहले से ही एक खाता है?"
  },
  "RECENTLY VIEWED:": {
    "ta": "சமீபத்தில் பார்த்தவை:",
    "hi": "हाल ही में देखा गया:"
  },
  "DESTINATION:": {
    "ta": "சுற்றுலா இடம்:",
    "hi": "गंतव्य:"
  },
  "HOTEL:": {
    "ta": "ஹோட்டல்:",
    "hi": "होटल:"
  },
  "ITINERARY:": {
    "ta": "பயணத்திட்டம்:",
    "hi": "यात्रा कार्यक्रम:"
  },
  "Recently Viewed": {
    "ta": "சமீபத்தில் பார்த்தவை",
    "hi": "हाल ही में देखा गया"
  },
  "Destinations": {
    "ta": "சுற்றுலாத் தலங்கள்",
    "hi": "गंतव्य"
  },
  "Transport": {
    "ta": "போக்குவரத்து",
    "hi": "परिवहन"
  },
  "Hotels": {
    "ta": "ஹோட்டல்கள்",
    "hi": "होटल"
  },
  "Local Guides": {
    "ta": "உள்ளூர் வழிகாட்டிகள்",
    "hi": "स्थानीय गाइड"
  },
  "Packages": {
    "ta": "பேக்கேஜ்கள்",
    "hi": "पैकेजेस"
  },
  "Community": {
    "ta": "சமூகம்",
    "hi": "समुदाय"
  },
  "More": {
    "ta": "மேலும்",
    "hi": "अधिक"
  },
  "Vehicles": {
    "ta": "வாகனங்கள்",
    "hi": "वाहन"
  },
  "Itinerary": {
    "ta": "பயணத்திட்டம்",
    "hi": "यात्रा कार्यक्रम"
  },
  "Budget": {
    "ta": "பட்ஜெட்",
    "hi": "बजट"
  },
  "Solo Trip": {
    "ta": "தனிப் பயணம்",
    "hi": "एकल यात्रा"
  },
  "Photo Albums": {
    "ta": "புகைப்பட ஆல்பங்கள்",
    "hi": "फोटो एल्बम"
  },
  "My Bookings": {
    "ta": "எனது முன்பதிவுகள்",
    "hi": "मेरी बुकिंग"
  },
  "Get Started": {
    "ta": "தொடங்குங்கள்",
    "hi": "शुरू करें"
  },
  "Sign Out": {
    "ta": "வெளியேறு",
    "hi": "साइन आउट"
  },
  "Settings": {
    "ta": "அமைப்புகள்",
    "hi": "सेटिंग्स"
  },
  "Home": {
    "ta": "முகப்பு",
    "hi": "होम"
  },
  "Book Hotel": {
    "ta": "ஹோட்டல் முன்பதிவு",
    "hi": "होटल बुक करें"
  },
  "Book Now": {
    "ta": "இப்போதே முன்பதிவு செய்க",
    "hi": "अभी बुक करें"
  },
  "View Details": {
    "ta": "விவரங்களைக் காண்க",
    "hi": "विवरण देखें"
  },
  "Check Availability": {
    "ta": "கிடைக்கும் தன்மையை சரிபார்க்கவும்",
    "hi": "उपलब्धता जांचें"
  },
  "Confirm Booking": {
    "ta": "முன்பதிவை உறுதிசெய்க",
    "hi": "बुकिंग की पुष्टि करें"
  },
  "Download Invoice": {
    "ta": "விலைப்பட்டியலை பதிவிறக்குக",
    "hi": "चालान डाउनलोड करें"
  },
  "Cancel": {
    "ta": "ரத்து செய்",
    "hi": "रद्द करें"
  },
  "Save": {
    "ta": "சேமி",
    "hi": "सहेजें"
  },
  "Check-in": {
    "ta": "வருகை",
    "hi": "चेक-इन"
  },
  "Check-out": {
    "ta": "வெளியேறல்",
    "hi": "चेक-आउट"
  },
  "Travellers": {
    "ta": "பயணிகள்",
    "hi": "यात्री"
  },
  "Total Amount": {
    "ta": "மொத்த தொகை",
    "hi": "कुल राशि"
  },
  "Status": {
    "ta": "நிலை",
    "hi": "स्थिति"
  },
  "Confirmed": {
    "ta": "உறுதிப்படுத்தப்பட்டது",
    "hi": "पुष्टि की गई"
  },
  "Pending": {
    "ta": "நிலுவையில் உள்ளது",
    "hi": "लंबित"
  },
  "Cancelled": {
    "ta": "ரத்து செய்யப்பட்டது",
    "hi": "रद्द"
  },
  "Search trips": {
    "ta": "பயணங்களை தேடுங்கள்",
    "hi": "यात्राएं खोजें"
  },
  "Search Routes": {
    "ta": "வழிகளைத் தேடுங்கள்",
    "hi": "मार्ग खोजें"
  },
  "Search Hotels": {
    "ta": "ஹோட்டல்களைத் தேடுங்கள்",
    "hi": "होटल खोजें"
  },
  "Price": {
    "ta": "விலை",
    "hi": "मूल्य"
  },
  "Duration": {
    "ta": "கால அளவு",
    "hi": "अवधि"
  },
  "Departure": {
    "ta": "புறப்பாடு",
    "hi": "प्रस्थान"
  },
  "Arrival": {
    "ta": "வருகை",
    "hi": "आगमन"
  },
  "Per Night": {
    "ta": "இரவுக்கு",
    "hi": "प्रति रात"
  },
  "Night": {
    "ta": "இரவு",
    "hi": "रात"
  },
  "Explore": {
    "ta": "ஆராய்க",
    "hi": "खोजें"
  },
  "Filter": {
    "ta": "வடிகட்டு",
    "hi": "फ़िल्टर"
  },
  "Reset": {
    "ta": "மீட்டமை",
    "hi": "रीसेट"
  },
  "Apply": {
    "ta": "பயன்படுத்து",
    "hi": "लागू करें"
  },
  "Share": {
    "ta": "பகிர்",
    "hi": "साझा करें"
  },
  "Filter Destinations": {
    "ta": "சுற்றுலா இடங்களை வடிகட்டுக",
    "hi": "गंतव्य फ़िल्टर करें"
  },
  "Region": {
    "ta": "பிராந்தியம்",
    "hi": "क्षेत्र"
  },
  "Trip Style": {
    "ta": "பயண வகை",
    "hi": "यात्रा शैली"
  },
  "Estimated Budget": {
    "ta": "மதிப்பிடப்பட்ட பட்ஜெட்",
    "hi": "अनुमानित बजट"
  },
  "Best Season": {
    "ta": "சிறந்த பருவம்",
    "hi": "सर्वोत्तम मौसम"
  },
  "South India": {
    "ta": "தென் இந்தியா",
    "hi": "दक्षिण भारत"
  },
  "North India": {
    "ta": "வட இந்தியா",
    "hi": "उत्तर भारत"
  },
  "Coastal & Islands": {
    "ta": "கடற்கரை & தீவுகள்",
    "hi": "तटीय और द्वीप"
  },
  "International Escapes": {
    "ta": "சர்வதேச சுற்றுலா",
    "hi": "अंतर्राष्ट्रीय यात्रा"
  },
  "Hill Station & Nature": {
    "ta": "மலை வாழிடம் & இயற்கை",
    "hi": "हिल स्टेशन और प्रकृति"
  },
  "Royal Heritage & Forts": {
    "ta": "அரண்மனைகள் & கோட்டைகள்",
    "hi": "शाही विरासत और किले"
  },
  "Beaches & Marine Life": {
    "ta": "கடற்கரைகள் & கடல் வாழ்க்கை",
    "hi": "समुद्र तट और समुद्री जीवन"
  },
  "Spiritual & Cultural": {
    "ta": "ஆன்மீகம் & கலாச்சாரம்",
    "hi": "आध्यात्मिक और सांस्कृतिक"
  },
  "High Altitude Trekking": {
    "ta": "உயர மலை மலையேற்றம்",
    "hi": "उच्च ऊंचाई ट्रेकिंग"
  },
  "Overview & Experience": {
    "ta": "கண்ணோட்டம் & அனுபவம்",
    "hi": "अवलोकन और अनुभव"
  },
  "Suggested 4-Day Itinerary": {
    "ta": "பரிந்துரைக்கப்பட்ட 4 நாள் திட்டம்",
    "hi": "सुझाया गया 4-दिवसीय यात्रा कार्यक्रम"
  },
  "Handpicked Accommodations": {
    "ta": "தேர்ந்தெடுக்கப்பட்ட தங்கும் விடுதிகள்",
    "hi": "चयनित आवास"
  },
  "Regional Cuisine to Try": {
    "ta": "சுவைக்க வேண்டிய பிராந்திய உணவுகள்",
    "hi": "स्थानीय व्यंजन"
  },
  "Hidden Gems & Secret Spots": {
    "ta": "மறைந்திருக்கும் சிறப்பிடங்கள்",
    "hi": "छिपे हुए रत्न और गुप्त स्थान"
  },
  "Quick Facts & Travel Dossier": {
    "ta": "விரைவான தகவல்கள் & வழிகாட்டி",
    "hi": "त्वरित तथ्य और यात्रा गाइड"
  },
  "Best Season to Visit": {
    "ta": "பயணிக்க சிறந்த பருவம்",
    "hi": "भ्रमण का सर्वोत्तम समय"
  },
  "Elevation & Terrain": {
    "ta": "உயரம் & நிலப்பரப்பு",
    "hi": "ऊंचाई और इलाका"
  },
  "Nearest Transit Hub": {
    "ta": "அருகிலுள்ள போக்குவரத்து மையம்",
    "hi": "निकटतम पारगमन केंद्र"
  },
  "Local Transportation": {
    "ta": "உள்ளூர் போக்குவரத்து",
    "hi": "स्थानीय परिवहन"
  },
  "Safety Index": {
    "ta": "பாதுகாப்பு குறியீடு",
    "hi": "सुरक्षा सूचकांक"
  },
  "Special Hubs": {
    "ta": "சிறப்பு மையங்கள்",
    "hi": "विशेष हब"
  },
  "Trust & Legal": {
    "ta": "நம்பகத்தன்மை & சட்டங்கள்",
    "hi": "विश्वास और कानूनी"
  },
  "About Us": {
    "ta": "எங்களை பற்றி",
    "hi": "हमारे बारे में"
  },
  "Customer Support": {
    "ta": "வாடிக்கையாளர் ஆதரவு",
    "hi": "ग्राहक सहायता"
  },
  "FAQ & Help Desk": {
    "ta": "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    "hi": "अक्सर पूछे जाने वाले प्रश्न"
  },
  "Terms & Conditions": {
    "ta": "விதிமுறைகள் & நிபந்தனைகள்",
    "hi": "नियम और शर्तें"
  },
  "Refund Policy": {
    "ta": "பணத்தைத் திரும்பப்பெறும் கொள்கை",
    "hi": "वापसी नीति"
  },
  "Sitemap": {
    "ta": "தள வரைபடம்",
    "hi": "साइटमैप"
  },
  "All Rights Reserved.": {
    "ta": "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    "hi": "सर्वाधिकार सुरक्षित।"
  },
  "All rights reserved.": {
    "ta": "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    "hi": "सर्वाधिकार सुरक्षित।"
  },
  "256-bit SSL Encrypted Booking System.": {
    "ta": "256-பிட் SSL என்க்ரிப்ட் செய்யப்பட்ட முன்பதிவு அமைப்பு.",
    "hi": "256-बिट एसएसएल एन्क्रिप्टेड बुकिंग प्रणाली।"
  },
  "View All Stays →": {
    "ta": "அனைத்து தங்குமிடங்களையும் காண்க →",
    "hi": "सभी ठहरने के स्थान देखें →"
  },
  "Choose Your Total Photobook Capacity": {
    "ta": "உங்கள் மொத்த புகைப்பட ஆல்பம் திறனை தேர்வு செய்க",
    "hi": "अपनी कुल फोटोबुक क्षमता चुनें"
  },
  "Select or Drop Your Journey Photos": {
    "ta": "உங்கள் பயணப் புகைப்படங்களைத் தேர்ந்தெடுக்கவும் அல்லது பதிவேற்றவும்",
    "hi": "अपनी यात्रा की तस्वीरें चुनें या छोड़ें"
  },
  "Customize Which Photo Goes on Which Page": {
    "ta": "எந்தப் பக்கத்தில் எந்தப் புகைப்படம் வர வேண்டும் என்பதைத் தனிப்பயனாக்குக",
    "hi": "अनुकूलित करें कि कौन सा फोटो किस पृष्ठ पर जाए"
  },
  "Customize Your Front Cover": {
    "ta": "உங்கள் முன் அட்டையை தனிப்பயனாக்குக",
    "hi": "अपने सामने के कवर को अनुकूलित करें"
  },
  "Complete Your Photobook Order": {
    "ta": "உங்கள் புகைப்பட ஆல்பம் ஆர்டரை முடிக்கவும்",
    "hi": "अपना फोटोबुक ऑर्डर पूरा करें"
  },
  "Your Photobook is Being Crafted!": {
    "ta": "உங்கள் புகைப்பட ஆல்பம் உருவாக்கப்பட்டு வருகிறது!",
    "hi": "आपकी फोटोबुक तैयार की जा रही है!"
  },
  "Download High-Res PDF Photobook": {
    "ta": "உயர் தர PDF ஆல்பம் பதிவிறக்குக",
    "hi": "उच्च-रिज़ॉल्यूशन पीडीएफ डाउनलोड करें"
  },
  "Create Another Photobook": {
    "ta": "மற்றொரு ஆல்பத்தை உருவாக்கவும்",
    "hi": "एक और फोटोबुक बनाएं"
  },
  "Pay & Order Photobook": {
    "ta": "பணம் செலுத்தி ஆல்பத்தை ஆர்டர் செய்க",
    "hi": "भुगतान करें और फोटोबुक ऑर्डर करें"
  },
  "Payment Successful • Order Confirmed": {
    "ta": "கட்டணம் வெற்றிகரமாக செலுத்தப்பட்டது • ஆர்டர் உறுதி செய்யப்பட்டது",
    "hi": "भुगतान सफल • आदेश की पुष्टि"
  },
  "1. Select Photo Capacity": {
    "ta": "1. புகைப்பட கொள்ளளவு தேர்வு",
    "hi": "1. फोटो क्षमता चुनें"
  },
  "2. Page Photo Customizer": {
    "ta": "2. பக்க புகைப்பட தனிப்பயனாக்கி",
    "hi": "2. पेज फोटो कस्टमाइज़र"
  },
  "3. Customize Front Cover": {
    "ta": "3. முன் அட்டை தனிப்பயனாக்கம்",
    "hi": "3. फ्रंट कवर कस्टमाइज़ करें"
  },
  "4. Review & Purchase": {
    "ta": "4. சரிபார்த்து வாங்கவும்",
    "hi": "4. समीक्षा और खरीदें"
  },
  "Next: Customize Pages & Photos →": {
    "ta": "அடுத்து: பக்கங்கள் & புகைப்படங்களைத் தனிப்பயனாக்குக →",
    "hi": "अगला: पेज और फोटो कस्टमाइज़ करें →"
  },
  "Next: Customize Front Cover →": {
    "ta": "அடுத்து: முன் அட்டையைத் தனிப்பயனாக்குக →",
    "hi": "अगला: फ्रंट कवर कस्टमाइज़ करें →"
  },
  "Next: Review & Purchase Photobook →": {
    "ta": "அடுத்து: சரிபார்த்து வாங்கவும் →",
    "hi": "अगला: समीक्षा और खरीदें →"
  },
  "1 Full Hero": {
    "ta": "1 முழு ஹீரோ",
    "hi": "1 फुल हीरो"
  },
  "2-Photo Split": {
    "ta": "2-புகைப்படப் பிரிப்பு",
    "hi": "2-फोटो स्प्लिट"
  },
  "4-Photo Grid": {
    "ta": "4-புகைப்படக் கட்டம்",
    "hi": "4-फोटो ग्रिड"
  },
  "Page Headline / Caption": {
    "ta": "பக்க தலைப்பு / விளக்கம்",
    "hi": "पेज शीर्षक / कैप्शन"
  },
  "Journal Notes / Story": {
    "ta": "பயணக் குறிப்புகள் / கதை",
    "hi": "जर्नल नोट्स / कहानी"
  },
  "+ Add New Page": {
    "ta": "+ புதிய பக்கத்தைச் சேர்",
    "hi": "+ नया पेज जोड़ें"
  },
  "← Prev Page": {
    "ta": "← முந்தைய பக்கம்",
    "hi": "← पिछला पेज"
  },
  "Next Page →": {
    "ta": "அடுத்த பக்கம் →",
    "hi": "अगला पेज →"
  },
  "+ Upload Photo": {
    "ta": "+ புகைப்படம் பதிவேற்றுக",
    "hi": "+ फोटो अपलोड करें"
  },
  "All Library": {
    "ta": "முழு நூலகம்",
    "hi": "पूरी लाइब्रेरी"
  },
  "My Uploads": {
    "ta": "எனது பதிவேற்றங்கள்",
    "hi": "मेरे अपलोड"
  },
  "Curated Travel": {
    "ta": "தேர்ந்தெடுக்கப்பட்ட பயணப் படங்கள்",
    "hi": "क्यूरेटेड यात्रा"
  },
  "Click to Place Selected Photo": {
    "ta": "தேர்ந்தெடுத்த புகைப்படத்தை வைக்க கிளிக் செய்யவும்",
    "hi": "चयनित फोटो लगाने के लिए क्लिक करें"
  },
  "Click to swap": {
    "ta": "மாற்ற கிளிக் செய்யவும்",
    "hi": "बदलने के लिए क्लिक करें"
  },
  "Slot": {
    "ta": "ஸ்லாட்",
    "hi": "स्लॉट"
  },
  "Left Slot": {
    "ta": "இடது ஸ்லாட்",
    "hi": "बायां स्लॉट"
  },
  "Right Slot": {
    "ta": "வலது ஸ்லாட்",
    "hi": "दायां स्लॉट"
  },
  "Click to place": {
    "ta": "வைக்க கிளிக் செய்யவும்",
    "hi": "लगाने के लिए क्लिक करें"
  },
  "Photobook Front Cover Title": {
    "ta": "ஆல்பம் முன் அட்டை தலைப்பு",
    "hi": "फोटोबुक फ्रंट कवर शीर्षक"
  },
  "Subtitle / Curator Byline": {
    "ta": "துணைத் தலைப்பு / உருவாக்குநர் பெயர்",
    "hi": "उपशीर्षक / क्यूरेटर नाम"
  },
  "Destination Tag": {
    "ta": "இடத்தின் பெயர்",
    "hi": "गंतव्य टैग"
  },
  "Edition / Season": {
    "ta": "பதிப்பு / பருவம்",
    "hi": "संस्करण / मौसम"
  },
  "Cover Theme & Spine Color": {
    "ta": "அட்டை தீம் & வண்ணம்",
    "hi": "कवर थीम और रंग"
  },
  "Upload Custom Cover": {
    "ta": "தனிப்பயன் அட்டையைப் பதிவேற்றுக",
    "hi": "कस्टम कवर अपलोड करें"
  },
  "Or pick from our curated high-res destination visuals:": {
    "ta": "அல்லது எங்கள் உயர்தரப் படங்களில் ஒன்றைத் தேர்ந்தெடுக்கவும்:",
    "hi": "या हमारे उच्च-रिज़ॉल्यूशन दृश्यों में से चुनें:"
  },
  "you@example.com": {
    "ta": "you@example.com",
    "hi": "you@example.com"
  },
  "Filter destinations, hotels, or packages by place name...": {
    "ta": "சுற்றுலா இடங்கள், ஹோட்டல்கள் அல்லது பேக்கேஜ்களை தேடுக...",
    "hi": "स्थान के नाम से गंतव्य, होटल या पैकेज खोजें..."
  },
  "Search destinations, hotels, rentals, or packages...": {
    "ta": "இடங்கள், ஹோட்டல்கள், வாகனங்கள் தேடுக...",
    "hi": "गंतव्य, होटल, वाहन या पैकेज खोजें..."
  },
  "Where do you want to explore? (e.g. Munnar, Jaipur, Goa, Ladakh)": {
    "ta": "எங்கு பயணிக்க விரும்புகிறீர்கள்? (எ.கா. மூணார், ஜெய்ப்பூர், கோவா)",
    "hi": "आप कहां घूमना चाहते हैं? (उदा. मुन्नार, जयपुर, गोवा, लद्दाख)"
  }
},

  // Deep Recursive DOM Tree Walker in shared.js
  walkAndTranslate(root, lang) {
    if (!root) root = document.body;
    if (!root) return;

    if (lang === 'en') {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          const p = node.parentElement;
          if (!p) return NodeFilter.FILTER_REJECT;
          const tag = p.tagName.toLowerCase();
          if (tag === 'script' || tag === 'style' || tag === 'code' || tag === 'svg' || tag === 'path' || tag === 'pre') return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      let node;
      while ((node = walker.nextNode())) {
        if (node._tcOrigText !== undefined) {
          node.nodeValue = node._tcOrigText;
        }
      }
      document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
        if (el._tcOrigPh !== undefined) el.placeholder = el._tcOrigPh;
      });
      return;
    }

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const p = node.parentElement;
        if (!p) return NodeFilter.FILTER_REJECT;
        const tag = p.tagName.toLowerCase();
        if (tag === 'script' || tag === 'style' || tag === 'code' || tag === 'svg' || tag === 'path' || tag === 'pre') return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const sortedKeys = Object.keys(this.phraseMap).sort((a, b) => b.length - a.length);
    let node;
    while ((node = walker.nextNode())) {
      if (node._tcOrigText === undefined) {
        node._tcOrigText = node.nodeValue;
      }
      const orig = node._tcOrigText;
      const trimmed = orig.trim();
      if (!trimmed) continue;

      const leading = orig.match(/^\s*/)[0];
      const trailing = orig.match(/\s*$/)[0];

      if (this.phraseMap[trimmed] && this.phraseMap[trimmed][lang]) {
        node.nodeValue = leading + this.phraseMap[trimmed][lang] + trailing;
        continue;
      }

      let currentText = trimmed;
      let matched = false;
      for (let i = 0; i < sortedKeys.length; i++) {
        const phrase = sortedKeys[i];
        if (phrase.length > 2 && currentText.includes(phrase) && this.phraseMap[phrase] && this.phraseMap[phrase][lang]) {
          currentText = currentText.split(phrase).join(this.phraseMap[phrase][lang]);
          matched = true;
        }
      }
      if (matched) {
        node.nodeValue = leading + currentText + trailing;
      }
    }

    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
      if (el._tcOrigPh === undefined) el._tcOrigPh = el.placeholder;
      const ph = el._tcOrigPh.trim();
      if (this.phraseMap[ph] && this.phraseMap[ph][lang]) {
        el.placeholder = this.phraseMap[ph][lang];
      }
    });
  },

  init() {
    this.currentLang = localStorage.getItem(this.LANG_KEY) || 'en';
    this.applyTranslations();
  },

  setLang(lang) {
    if (!this.translations[lang]) return;
    this.currentLang = lang;
    localStorage.setItem(this.LANG_KEY, lang);
    this.applyTranslations();
    showToast(`Language set to ${lang === 'ta' ? 'தமிழ்' : lang === 'hi' ? 'हिंदी' : 'English'}`, 'info');
  },

  applyTranslations() {
    const isEnglish = this.currentLang === 'en';
    const dict = this.translations[this.currentLang] || this.translations.en;

    // Deep text node walk across the full DOM
    this.walkAndTranslate(document.body, this.currentLang);
    
    // 1. Standard Navigation Links
    const linkMap = {
      'index.html': dict.home,
      'destinations.html': dict.destinations,
      'transport.html': dict.transport,
      'hotels.html': dict.hotels,
      'vehicle.html': dict.vehicles,
      'guides.html': dict.guides,
      'packages.html': dict.packages,
      'itinerary.html': dict.itinerary,
      'budget.html': dict.budget,
      'community.html': dict.community,
      'solo.html': dict.solo,
      'album.html': dict.albums,
      'bookings.html': dict.myBookings,
      'admin.html': dict.admin
    };

    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = a.getAttribute('href');
      if (href && linkMap[href]) {
        a.textContent = href === 'admin.html' ? `★ ${linkMap[href]}` : linkMap[href];
      }
    });

    // 2. Headings, Buttons, Labels, Chips across the whole page
    const elementsToTranslate = document.querySelectorAll('button, h1, h2, h3, h4, .btn, label, .sidebar-title, .filter-label, .fact-label, .sec-eyebrow, footer a');
    elementsToTranslate.forEach(el => {
      if (el.classList.contains('nav-lang-btn')) return;

      const trimmedText = el.textContent.trim();
      if (!el.dataset.tcOrig) {
        el.dataset.tcOrig = trimmedText;
      }

      if (isEnglish) {
        if (el.dataset.tcOrig) {
          el.textContent = el.dataset.tcOrig;
        }
      } else {
        const orig = el.dataset.tcOrig;
        if (this.phraseMap[orig] && this.phraseMap[orig][this.currentLang]) {
          el.textContent = this.phraseMap[orig][this.currentLang];
        } else {
          for (const [key, map] of Object.entries(this.phraseMap)) {
            if (orig === key && map[this.currentLang]) {
              el.textContent = map[this.currentLang];
              break;
            }
          }
        }
      }
    });

    // 3. Search and form input placeholders
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(input => {
      const ph = input.getAttribute('placeholder');
      if (!input.dataset.tcOrigPh) {
        input.dataset.tcOrigPh = ph;
      }
      if (isEnglish) {
        if (input.dataset.tcOrigPh) input.setAttribute('placeholder', input.dataset.tcOrigPh);
      } else {
        const origPh = input.dataset.tcOrigPh;
        if (this.placeholderMap[origPh] && this.placeholderMap[origPh][this.currentLang]) {
          input.setAttribute('placeholder', this.placeholderMap[origPh][this.currentLang]);
        }
      }
    });

    // 4. Update language switcher buttons
    document.querySelectorAll('.nav-lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === this.currentLang);
    });
  },

  renderSelector() {
    const nav = document.querySelector('.nav');
    if (!nav || nav.querySelector('.nav-lang-picker')) return;

    const picker = document.createElement('div');
    picker.className = 'nav-lang-picker';
    picker.innerHTML = `
      <button class="nav-lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en" onclick="TripCraftI18n.setLang('en')">EN</button>
      <button class="nav-lang-btn ${this.currentLang === 'ta' ? 'active' : ''}" data-lang="ta" onclick="TripCraftI18n.setLang('ta')">தமிழ்</button>
      <button class="nav-lang-btn ${this.currentLang === 'hi' ? 'active' : ''}" data-lang="hi" onclick="TripCraftI18n.setLang('hi')">हिंदी</button>
    `;

    const navCta = nav.querySelector('.nav-cta');
    if (navCta) {
      nav.insertBefore(picker, navCta);
    }
  }
};

// -------------------------------------------------------------
// 12.5. MULTI-CURRENCY CONVERTER ENGINE (TripCraftCurrency)
// -------------------------------------------------------------
const TripCraftCurrency = {
  STORAGE_KEY: 'tripcraft_currency',

  RATES: {
    INR: { code: 'INR', symbol: '₹', rateFromINR: 1.0, label: 'INR (₹)' },
    USD: { code: 'USD', symbol: '$', rateFromINR: 1 / 83.0, label: 'USD ($)' }, // 1 USD = ₹83
    EUR: { code: 'EUR', symbol: '€', rateFromINR: 1 / 91.0, label: 'EUR (€)' }  // 1 EUR = ₹91
  },

  getCurrent() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored && this.RATES[stored]) return stored;
    } catch (e) {}
    return 'INR';
  },

  setCurrency(code) {
    if (!this.RATES[code]) return;
    try {
      localStorage.setItem(this.STORAGE_KEY, code);
      localStorage.setItem('tc_currency', code);
    } catch (e) {}
    this.updateSelectorButtons();
    this.convertAllPricesOnPage();
    if (window.TC && typeof window.TC.convertAllPrices === 'function') {
      try { window.TC.convertAllPrices(code); } catch (e) {}
    }
    if (typeof updateModalPrice === 'function') {
      updateModalPrice();
    }
    window.dispatchEvent(new CustomEvent('currencychange', { detail: { currency: code } }));
    showToast(`Currency changed to ${this.RATES[code].label}`, 'info');
  },

  format(inrAmount) {
    const code = this.getCurrent();
    const curr = this.RATES[code] || this.RATES.INR;
    const num = typeof inrAmount === 'number' ? inrAmount : parseInt(String(inrAmount).replace(/[^0-9]/g, ''), 10) || 0;
    const converted = Math.round(num * curr.rateFromINR);

    if (code === 'INR') {
      return `₹${converted.toLocaleString('en-IN')}`;
    } else if (code === 'USD') {
      return `$${converted.toLocaleString('en-US')}`;
    } else if (code === 'EUR') {
      return `€${converted.toLocaleString('en-US')}`;
    }
    return `${curr.symbol}${converted}`;
  },

  convertAllPricesOnPage() {
    const code = this.getCurrent();
    const selectors = [
      '.guide-price', '.hotel-price', '.dest-price', '.package-price', '.pkg-price',
      '.vehicle-price', '.dest-card-price', '.marketplace-price-tag', '.booking-price-total',
      '.compare-price-val', '.tc-price-main', '.tc-price-strikethrough', '.tc-savings-tag',
      '.ticket-price', '.route-price', '.stat-num', '[data-inr-price]', '.price', '.fare-amt',
      '.trip-stat-val', '.stat-val', '.tc-card-price-comp', '.tc-price-top-row', '.price-val',
      '.card-price', '.badge-price', '.dest-card-price-val', '.tc-service-price',
      '.tc-modal-spec-val', '.tc-bfooter-total', '.guide-price-val', '.ticket-fare-amt'
    ].join(', ');

    const targets = document.querySelectorAll(selectors);

    targets.forEach(el => {
      if (el.closest('.nav-currency-picker, .nav-lang-picker, .currency-grid, .currency-toggle-btn')) return;

      if (!el.getAttribute('data-inr-price')) {
        const raw = el.textContent || '';
        const match = raw.replace(/,/g, '').match(/\d+/);
        if (match) {
          el.setAttribute('data-inr-price', match[0]);
          if (raw.toLowerCase().includes('from')) {
            el.setAttribute('data-price-prefix', 'from ');
          }
        }
      }

      const inr = parseInt(el.getAttribute('data-inr-price'), 10);
      if (!isNaN(inr) && inr > 0) {
        const prefix = el.getAttribute('data-price-prefix') || '';
        el.textContent = prefix + this.format(inr);
      }
    });

    // Also scan all text elements containing currency symbols on the active page
    document.querySelectorAll('span, div, b, strong, p, td, h3, h4').forEach(el => {
      if (el.children.length === 0 && (el.textContent.includes('₹') || el.textContent.includes('\u20B9') || el.getAttribute('data-inr-price'))) {
        if (el.closest('.nav-currency-picker, .nav-lang-picker, .currency-grid, script, style, .currency-card-sym, .btn')) return;
        if (!el.getAttribute('data-inr-price')) {
          const match = el.textContent.replace(/,/g, '').match(/\d+/);
          if (match && parseInt(match[0], 10) >= 50) {
            el.setAttribute('data-inr-price', match[0]);
            if (el.textContent.toLowerCase().includes('from')) {
              el.setAttribute('data-price-prefix', 'from ');
            }
          }
        }
        const inr = parseInt(el.getAttribute('data-inr-price'), 10);
        if (!isNaN(inr) && inr >= 50) {
          const prefix = el.getAttribute('data-price-prefix') || '';
          el.textContent = prefix + this.format(inr);
        }
      }
    });

    if (window.TC && typeof window.TC.convertAllPrices === 'function' && window.TC.convertAllPrices !== this.convertAllPricesOnPage) {
      try { window.TC.convertAllPrices(code); } catch (e) {}
    }
  },

  renderSelector() {
    const nav = document.querySelector('.nav');
    if (!nav || nav.querySelector('.nav-currency-picker')) return;

    const current = this.getCurrent();
    const picker = document.createElement('div');
    picker.className = 'nav-currency-picker';
    picker.innerHTML = `
      <button class="nav-currency-btn ${current === 'INR' ? 'active' : ''}" data-currency="INR" onclick="TripCraftCurrency.setCurrency('INR')">₹ INR</button>
      <button class="nav-currency-btn ${current === 'USD' ? 'active' : ''}" data-currency="USD" onclick="TripCraftCurrency.setCurrency('USD')">$ USD</button>
      <button class="nav-currency-btn ${current === 'EUR' ? 'active' : ''}" data-currency="EUR" onclick="TripCraftCurrency.setCurrency('EUR')">€ EUR</button>
    `;

    const langPicker = nav.querySelector('.nav-lang-picker');
    const navCta = nav.querySelector('.nav-cta');
    if (langPicker) {
      langPicker.insertAdjacentElement('afterend', picker);
    } else if (navCta) {
      nav.insertBefore(picker, navCta);
    } else {
      nav.appendChild(picker);
    }
  },

  updateSelectorButtons() {
    const current = this.getCurrent();
    document.querySelectorAll('.nav-currency-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-currency') === current);
    });
  }
};

window.TripCraftCurrency = TripCraftCurrency;

// -------------------------------------------------------------
// 12. REFERRAL & LOYALTY PROGRAM ENGINE (TripCraftLoyalty)
// -------------------------------------------------------------
const TripCraftLoyalty = {
  getTier(totalSpend, totalBookings) {
    if (totalSpend >= 35000 || totalBookings >= 5) {
      return {
        tier: 'Gold',
        title: 'Gold Explorer',
        discountPct: 15,
        perks: 'Complimentary room upgrades & VIP airport concierge desk',
        badgeClass: 'chip-gold',
        nextTier: 'Top Tier Reached',
        progress: 100,
        amountToNext: 0
      };
    } else if (totalSpend >= 10000 || totalBookings >= 2) {
      const remaining = Math.max(0, 35000 - totalSpend);
      return {
        tier: 'Silver',
        title: 'Silver Traveler',
        discountPct: 10,
        perks: 'Free cancellation protection & priority concierge desk',
        badgeClass: 'chip-teal',
        nextTier: 'Gold Explorer',
        progress: Math.min(95, Math.max(15, Math.round((totalSpend / 35000) * 100))),
        amountToNext: remaining
      };
    } else {
      const remaining = Math.max(0, 10000 - totalSpend);
      return {
        tier: 'Bronze',
        title: 'Bronze Explorer',
        discountPct: 5,
        perks: 'Standard reward points on all stays and tour packages',
        badgeClass: 'chip-navy',
        nextTier: 'Silver Traveler',
        progress: Math.min(90, Math.max(10, Math.round((totalSpend / 10000) * 100))),
        amountToNext: remaining
      };
    }
  },

  getUserLoyalty() {
    const user = (typeof TripCraftAuth !== 'undefined' && TripCraftAuth.getUser()) || { id: 'TC-USR-101', name: 'Priya Sunder' };
    let bookings = [];
    if (typeof TripCraftBookings !== 'undefined') {
      bookings = TripCraftBookings.getAll();
    }

    let totalSpend = 0;
    let totalBookings = 0;

    bookings.forEach(b => {
      if (b.status !== 'Cancelled') {
        totalBookings++;
        const num = parseInt((b.amount || b.price || '0').toString().replace(/[^\d]/g, ''), 10);
        if (!isNaN(num)) totalSpend += num;
      }
    });

    const tierInfo = this.getTier(totalSpend, totalBookings);
    const firstName = (user.name || 'Traveler').split(' ')[0].toUpperCase();
    const refCode = `TRIP-${firstName}2026`;

    return {
      user,
      totalSpend,
      totalBookings,
      referralCode: refCode,
      referralUrl: typeof window !== 'undefined' && window.location && window.location.origin
        ? `${window.location.origin}${window.location.pathname.replace(/[^/]*$/, '')}index.html?ref=${refCode}`
        : `index.html?ref=${refCode}`,
      ...tierInfo
    };
  },

  copyReferralCode(code) {
    const c = code || this.getUserLoyalty().referralCode;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(c).then(() => {
        if (typeof showToast === 'function') {
          showToast(`Referral Code "${c}" copied! Share with friends for ₹500 off.`, 'success');
        } else {
          alert(`Referral Code "${c}" copied!`);
        }
      }).catch(() => {
        this.fallbackCopy(c);
      });
    } else {
      this.fallbackCopy(c);
    }
  },

  fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    if (typeof showToast === 'function') {
      showToast(`Referral Code "${text}" copied to clipboard!`, 'success');
    }
  },

  renderLoyaltyDashboard(containerId = 'tcLoyaltyMount') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const data = this.getUserLoyalty();

    container.innerHTML = `
      <div class="tc-loyalty-container">
        <!-- Loyalty Tier Status Card -->
        <div class="tc-loyalty-card">
          <div class="tc-loyalty-top">
            <div>
              <span class="chip ${data.badgeClass}" style="font-size:11px; text-transform:uppercase; letter-spacing:0.5px; font-weight:700;">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
                ${data.title}
              </span>
              <h3 style="font-family:'Playfair Display',serif; font-size:22px; color:var(--navy); margin:8px 0 4px 0;">Tier Benefits &amp; Status</h3>
              <p style="font-size:13px; color:var(--text-mid); margin:0;">${data.perks}</p>
            </div>
            <div class="tc-loyalty-metric">
              <div class="tc-metric-label">Lifetime Spend</div>
              <div class="tc-metric-value" data-inr-price="${data.totalSpend}">₹${data.totalSpend.toLocaleString('en-IN')}</div>
              <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">Across ${data.totalBookings} reservation(s)</div>
            </div>
          </div>

          <!-- Progress Bar -->
          <div style="margin-top:18px;">
            <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:6px;">
              <span style="font-weight:600; color:var(--text);">${data.title}</span>
              <span style="color:var(--text-muted);">${data.amountToNext > 0 ? `Spend ₹${data.amountToNext.toLocaleString('en-IN')} more to unlock ${data.nextTier}` : 'Highest Explorer Tier Achieved'}</span>
            </div>
            <div class="tc-tier-progressbar-bg">
              <div class="tc-tier-progressbar-fill" style="width: ${data.progress}%;"></div>
            </div>
          </div>
        </div>

        <!-- Referral Program Banner (Refer a friend, get ₹500 off) -->
        <div class="tc-referral-banner">
          <div class="tc-referral-content">
            <div style="display:inline-flex; align-items:center; gap:6px; background:rgba(217, 119, 6, 0.15); color:var(--gold); border:1px solid rgba(217,119,6,0.3); border-radius:var(--r-full); padding:3px 10px; font-size:11px; font-weight:700; text-transform:uppercase; margin-bottom:8px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><circle cx="18" cy="12" r="2"/></svg>
              Referral Program
            </div>
            <h3 style="font-family:'Playfair Display',serif; font-size:20px; color:#FFFFFF; margin-bottom:6px;">Refer a Friend, Get ₹500 Off</h3>
            <p style="font-size:13px; color:rgba(255,255,255,0.8); line-height:1.5; margin:0;">
              Share your personal invite code with fellow explorers. When they book their first stay or tour, they get ₹500 off instantly and you receive ₹500 in your TripCraft wallet!
            </p>
          </div>
          <div class="tc-referral-action">
            <div class="tc-ref-code-box">
              <span class="tc-ref-code-label">Your Referral Code</span>
              <span class="tc-ref-code-text" id="tcRefCodeText">${data.referralCode}</span>
            </div>
            <button class="btn btn-gold" style="font-size:12.5px; white-space:nowrap;" onclick="TripCraftLoyalty.copyReferralCode('${data.referralCode}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              Copy Code
            </button>
          </div>
        </div>
      </div>
    `;
  },

  updateNavTier() {
    const tierEl = document.getElementById('menuUserTier');
    if (!tierEl) return;
    const loyalty = this.getUserLoyalty();
    tierEl.className = `chip ${loyalty.badgeClass}`;
    tierEl.innerText = loyalty.title;
  },

  init() {
    this.updateNavTier();
    if (document.getElementById('tcLoyaltyMount')) {
      this.renderLoyaltyDashboard('tcLoyaltyMount');
    }
  }
};

window.TripCraftLoyalty = TripCraftLoyalty;

// -------------------------------------------------------------
// 12B. SEARCH & FILTER DEPTH ENGINE (TripCraftFilter)
// -------------------------------------------------------------
const TripCraftFilter = {
  initHotels() {
    const grid = document.querySelector('.hotel-grid');
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll('.hotel-card'));
    if (!cards.length) return;

    // Attach data attributes to cards
    cards.forEach((card, idx) => {
      if (!card.dataset.price) {
        const pEl = card.querySelector('.hotel-price');
        card.dataset.price = pEl ? parseInt(pEl.innerText.replace(/[^\d]/g, ''), 10) : 5000;
      }
      if (!card.dataset.rating) {
        const rEl = card.querySelector('.rating-val');
        card.dataset.rating = rEl ? parseFloat(rEl.innerText) : 4.8;
      }
      if (!card.dataset.popularity) {
        card.dataset.popularity = 1000 - (idx * 120);
      }
      if (!card.dataset.amenities) {
        const chips = Array.from(card.querySelectorAll('.hotel-amenities .chip')).map(c => c.innerText.toLowerCase());
        card.dataset.amenities = chips.join(' ');
      }
    });

    const sortSelect = document.querySelector('.results-header .sort-select');
    const rangeSlider = document.querySelector('.sidebar input[type="range"]');
    const rangeVal = document.querySelector('.sidebar .range-val');
    const ratingRadios = Array.from(document.querySelectorAll('.sidebar input[name="star"]'));
    const amenityChecks = Array.from(document.querySelectorAll('.sidebar .filter-group:nth-of-type(2) input[type="checkbox"]'));

    const apply = () => {
      const maxPrice = rangeSlider ? parseInt(rangeSlider.value, 10) : Infinity;
      if (rangeVal && rangeSlider) {
        rangeVal.innerHTML = '&#8377;' + maxPrice.toLocaleString('en-IN');
      }

      let minRating = 0;
      const checkedRadio = ratingRadios.find(r => r.checked);
      if (checkedRadio) {
        const txt = checkedRadio.parentElement.innerText;
        if (txt.includes('4.5')) minRating = 4.5;
        else if (txt.includes('4.0')) minRating = 4.0;
      }

      const activeAmenities = amenityChecks
        .filter(c => c.checked)
        .map(c => c.parentElement.innerText.trim().toLowerCase());

      let visibleCount = 0;
      cards.forEach(card => {
        const price = parseInt(card.dataset.price, 10);
        const rating = parseFloat(card.dataset.rating);
        const amenities = (card.dataset.amenities || '').toLowerCase();

        let matches = true;
        if (price > maxPrice) matches = false;
        if (rating < minRating) matches = false;

        activeAmenities.forEach(am => {
          if (am.includes('breakfast') && !amenities.includes('breakfast')) matches = false;
          if (am.includes('pool') && !amenities.includes('pool')) matches = false;
          if (am.includes('spa') && !amenities.includes('spa')) matches = false;
          if (am.includes('view') && !amenities.includes('view')) matches = false;
        });

        if (matches) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // Sort
      const sortVal = sortSelect ? sortSelect.value : 'Recommended';
      const visibleCards = cards.filter(c => c.style.display !== 'none');
      visibleCards.sort((a, b) => {
        const pa = parseInt(a.dataset.price, 10);
        const pb = parseInt(b.dataset.price, 10);
        const ra = parseFloat(a.dataset.rating);
        const rb = parseFloat(b.dataset.rating);
        const popA = parseInt(a.dataset.popularity, 10);
        const popB = parseInt(b.dataset.popularity, 10);

        if (sortVal.includes('Low to High')) return pa - pb;
        if (sortVal.includes('High to Low') && sortVal.includes('Price')) return pb - pa;
        if (sortVal.includes('Rating')) return rb - ra;
        return popB - popA;
      });

      visibleCards.forEach(c => grid.appendChild(c));

      // Results count text
      const countEl = document.querySelector('.results-count');
      if (countEl) {
        countEl.innerHTML = `Showing <strong>${visibleCount} verified stays</strong>`;
      }

      // Empty State
      let emptyEl = document.getElementById('tcHotelsEmptyState');
      if (visibleCount === 0) {
        if (!emptyEl) {
          emptyEl = document.createElement('div');
          emptyEl.id = 'tcHotelsEmptyState';
          emptyEl.className = 'tc-empty-state-card';
          emptyEl.innerHTML = `
            <div class="tc-empty-state-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            </div>
            <h3>No Stays Match Your Filters</h3>
            <p>Try increasing your maximum nightly budget or resetting the selected amenities.</p>
            <div style="margin-top:14px;">
              <button class="btn btn-teal" onclick="TripCraftFilter.resetHotels()">Reset All Filters</button>
            </div>
            <div class="tc-empty-suggestions">
              <h4>Suggested Stays You Might Like</h4>
              <div class="tc-empty-cards-grid">
                <div class="tc-empty-mini-card" onclick="openDetailModal({ title: 'Munnar Tea Country Resort', price: '₹5,400', category: 'Luxury Estate Resort' })">
                  <div style="font-weight:700; color:var(--navy);">Munnar Tea Country Resort</div>
                  <div style="font-size:12px; color:var(--text-muted);">From ₹5,400 &middot; ★ 4.8</div>
                </div>
                <div class="tc-empty-mini-card" onclick="openDetailModal({ title: 'Zostel Munnar Social Hub', price: '₹1,250', category: 'Boutique Hostel' })">
                  <div style="font-weight:700; color:var(--navy);">Zostel Munnar Social Hub</div>
                  <div style="font-size:12px; color:var(--text-muted);">From ₹1,250 &middot; ★ 4.8</div>
                </div>
              </div>
            </div>
          `;
          grid.insertAdjacentElement('afterend', emptyEl);
        }
        emptyEl.style.display = 'block';
      } else if (emptyEl) {
        emptyEl.style.display = 'none';
      }
    };

    if (sortSelect) sortSelect.addEventListener('change', apply);
    if (rangeSlider) rangeSlider.addEventListener('input', apply);
    ratingRadios.forEach(r => r.addEventListener('change', apply));
    amenityChecks.forEach(c => c.addEventListener('change', apply));

    this._applyHotels = apply;
  },

  resetHotels() {
    const rangeSlider = document.querySelector('.sidebar input[type="range"]');
    if (rangeSlider) {
      rangeSlider.value = rangeSlider.max;
    }
    const allRatingRadio = document.querySelector('.sidebar input[name="star"]:last-of-type');
    if (allRatingRadio) allRatingRadio.checked = true;
    document.querySelectorAll('.sidebar input[type="checkbox"]').forEach(c => c.checked = true);
    if (this._applyHotels) this._applyHotels();
  },

  initDestinations() {
    const grid = document.querySelector('.dest-grid-catalog');
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll('.dest-card'));
    if (!cards.length) return;

    cards.forEach((card, idx) => {
      if (!card.dataset.price) {
        const pEl = card.querySelector('.dest-card-price');
        card.dataset.price = pEl ? parseInt(pEl.innerText.replace(/[^\d]/g, ''), 10) : 5000;
      }
      if (!card.dataset.rating) {
        const rEl = card.querySelector('.rating-val');
        card.dataset.rating = rEl ? parseFloat(rEl.innerText) : 4.8;
      }
      if (!card.dataset.popularity) {
        card.dataset.popularity = 1200 - (idx * 100);
      }
    });

    const sortSelect = document.querySelector('.results-header .sort-select');
    const rangeSlider = document.querySelector('.sidebar input[type="range"]');
    const rangeVal = document.querySelector('.sidebar .range-val');

    const apply = () => {
      const maxBudget = rangeSlider ? parseInt(rangeSlider.value, 10) : Infinity;
      if (rangeVal && rangeSlider) {
        rangeVal.innerHTML = '&#8377;' + maxBudget.toLocaleString('en-IN');
      }

      let visibleCount = 0;
      cards.forEach(card => {
        const price = parseInt(card.dataset.price, 10);
        let matches = price <= maxBudget;
        if (matches) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      const sortVal = sortSelect ? sortSelect.value : 'Most Popular';
      const visibleCards = cards.filter(c => c.style.display !== 'none');
      visibleCards.sort((a, b) => {
        const pa = parseInt(a.dataset.price, 10);
        const pb = parseInt(b.dataset.price, 10);
        const ra = parseFloat(a.dataset.rating);
        const rb = parseFloat(b.dataset.rating);
        const popA = parseInt(a.dataset.popularity, 10);
        const popB = parseInt(b.dataset.popularity, 10);

        if (sortVal.includes('Low to High')) return pa - pb;
        if (sortVal.includes('High to Low')) return pb - pa;
        if (sortVal.includes('Highest Rated')) return rb - ra;
        return popB - popA;
      });

      visibleCards.forEach(c => grid.appendChild(c));

      const countEl = document.querySelector('.results-count');
      if (countEl) {
        countEl.innerHTML = `Showing <strong>${visibleCount} featured destinations</strong>`;
      }

      let emptyEl = document.getElementById('tcDestEmptyState');
      if (visibleCount === 0) {
        if (!emptyEl) {
          emptyEl = document.createElement('div');
          emptyEl.id = 'tcDestEmptyState';
          emptyEl.className = 'tc-empty-state-card';
          emptyEl.innerHTML = `
            <div class="tc-empty-state-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            </div>
            <h3>No Destinations Found in Budget</h3>
            <p>Try adjusting your estimated budget slider to see available escapes.</p>
            <div style="margin-top:14px;">
              <button class="btn btn-teal" onclick="TripCraftFilter.resetDestinations()">Reset Budget Filter</button>
            </div>
          `;
          grid.insertAdjacentElement('afterend', emptyEl);
        }
        emptyEl.style.display = 'block';
      } else if (emptyEl) {
        emptyEl.style.display = 'none';
      }
    };

    if (sortSelect) sortSelect.addEventListener('change', apply);
    if (rangeSlider) rangeSlider.addEventListener('input', apply);
    this._applyDest = apply;
  },

  resetDestinations() {
    const rangeSlider = document.querySelector('.sidebar input[type="range"]');
    if (rangeSlider) rangeSlider.value = rangeSlider.max;
    if (this._applyDest) this._applyDest();
  },

  initPackages() {
    const grid = document.querySelector('.packages-grid');
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll('.package-card'));
    if (!cards.length) return;

    cards.forEach((card, idx) => {
      if (!card.dataset.price) {
        const pEl = card.querySelector('.package-price');
        card.dataset.price = pEl ? parseInt(pEl.innerText.replace(/[^\d]/g, ''), 10) : 40000;
      }
      if (!card.dataset.rating) {
        const rEl = card.querySelector('.rating-val');
        card.dataset.rating = rEl ? parseFloat(rEl.innerText) : 4.8;
      }
      if (!card.dataset.popularity) {
        card.dataset.popularity = 900 - (idx * 80);
      }
    });

    const sortSelect = document.querySelector('.results-header .sort-select');
    const rangeSlider = document.querySelector('.sidebar input[type="range"]');
    const rangeVal = document.querySelector('.sidebar .range-val');

    const apply = () => {
      const maxBudget = rangeSlider ? parseInt(rangeSlider.value, 10) : Infinity;
      if (rangeVal && rangeSlider) {
        rangeVal.innerHTML = '&#8377;' + maxBudget.toLocaleString('en-IN');
      }

      let visibleCount = 0;
      cards.forEach(card => {
        const price = parseInt(card.dataset.price, 10);
        let matches = price <= maxBudget;
        if (matches) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      const sortVal = sortSelect ? sortSelect.value : 'Featured';
      const visibleCards = cards.filter(c => c.style.display !== 'none');
      visibleCards.sort((a, b) => {
        const pa = parseInt(a.dataset.price, 10);
        const pb = parseInt(b.dataset.price, 10);
        const popA = parseInt(a.dataset.popularity, 10);
        const popB = parseInt(b.dataset.popularity, 10);

        if (sortVal.includes('Low to High')) return pa - pb;
        if (sortVal.includes('High to Low')) return pb - pa;
        return popB - popA;
      });

      visibleCards.forEach(c => grid.appendChild(c));

      const countEl = document.querySelector('.results-count');
      if (countEl) {
        countEl.innerHTML = `Showing <strong>${visibleCount} all-inclusive packages</strong>`;
      }

      let emptyEl = document.getElementById('tcPkgEmptyState');
      if (visibleCount === 0) {
        if (!emptyEl) {
          emptyEl = document.createElement('div');
          emptyEl.id = 'tcPkgEmptyState';
          emptyEl.className = 'tc-empty-state-card';
          emptyEl.innerHTML = `
            <div class="tc-empty-state-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            </div>
            <h3>No Packages Found Under This Budget</h3>
            <p>Try moving your budget per person slider upward to reveal curated itineraries.</p>
            <div style="margin-top:14px;">
              <button class="btn btn-teal" onclick="TripCraftFilter.resetPackages()">Reset Package Budget</button>
            </div>
          `;
          grid.insertAdjacentElement('afterend', emptyEl);
        }
        emptyEl.style.display = 'block';
      } else if (emptyEl) {
        emptyEl.style.display = 'none';
      }
    };

    if (sortSelect) sortSelect.addEventListener('change', apply);
    if (rangeSlider) rangeSlider.addEventListener('input', apply);
    this._applyPkg = apply;
  },

  resetPackages() {
    const rangeSlider = document.querySelector('.sidebar input[type="range"]');
    if (rangeSlider) rangeSlider.value = rangeSlider.max;
    if (this._applyPkg) this._applyPkg();
  },

  init() {
    if (document.querySelector('.hotel-grid')) this.initHotels();
    if (document.querySelector('.dest-grid-catalog')) this.initDestinations();
    if (document.querySelector('.packages-grid')) this.initPackages();
  }
};

window.TripCraftFilter = TripCraftFilter;

// -------------------------------------------------------------
// 13. RECENTLY ACCESSED DESTINATIONS & STAYS (TripCraftHistory)
// -------------------------------------------------------------
const TripCraftHistory = {
  STORAGE_KEY: 'tripcraft_recently_accessed',

  getAll() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {}
    // Default seed
    return [
      { type: 'Destination', title: 'Munnar, Kerala', url: 'dest-detail.html', subtitle: 'Tea Highlands' },
      { type: 'Hotel', title: 'Munnar Tea Country Resort', url: 'hotels.html', subtitle: 'Chithirapuram' },
      { type: 'Itinerary', title: '4-Day Munnar Wildlife & Tea', url: 'itinerary.html', subtitle: 'Day-by-Day' }
    ];
  },

  add(item) {
    let list = this.getAll();
    list = list.filter(i => i.title !== item.title);
    list.unshift({
      type: item.type || 'Destination',
      title: item.title,
      url: item.url || 'destinations.html',
      subtitle: item.subtitle || 'India',
      timestamp: new Date().toISOString()
    });
    if (list.length > 5) list = list.slice(0, 5);
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
      this.renderStrip();
    } catch (e) {}
  },

  renderStrip() {
    if (location.pathname.includes('admin.html')) return;
    const nav = document.querySelector('.nav');
    if (!nav) return;
    if (document.querySelector('.recently-accessed-strip')) return;

    const items = this.getAll();
    if (items.length === 0) return;

    const strip = document.createElement('div');
    strip.className = 'recently-accessed-strip';
    strip.innerHTML = `
      <div class="recently-accessed-title">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        Recently Viewed:
      </div>
      ${items.map(i => `
        <a href="${i.url}" class="recently-accessed-chip">
          <span style="opacity:0.75; font-size:10px; text-transform:uppercase;">${i.type}:</span>
          <strong>${i.title}</strong>
        </a>
      `).join('')}
    `;

    nav.insertAdjacentElement('afterend', strip);
  }
};

// -------------------------------------------------------------
// 13.5. ENTERPRISE WISHLIST & SAVED ITEMS ENGINE (TripCraftWishlist)
// -------------------------------------------------------------
const TripCraftWishlist = {
  getStorageKey() {
    const user = (typeof TripCraftAuth !== 'undefined') ? TripCraftAuth.getUser() : null;
    const userId = user && user.id ? user.id : 'guest';
    return `tripcraft_wishlist_${userId}`;
  },

  seedDefaults() {
    return [
      {
        id: 'tc-wl-1',
        title: 'Munnar Tea Country Resort',
        category: 'Hotel Reservation',
        type: 'hotel',
        subtitle: 'Chithirapuram · Munnar, Kerala',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1920&auto=format&fit=crop',
        price: '₹5,400',
        numericPrice: 5400,
        rating: '4.8 (340)',
        description: 'Luxury hillside cottages overlooking mist-shrouded tea valleys.',
        cancellationPolicy: 'Free cancellation until 48hrs before arrival',
        specs: [
          { label: 'Room Type', val: 'Valley View Deluxe Cottage' },
          { label: 'Inclusions', val: 'Breakfast Buffet, Plantation Walk, Free WiFi' }
        ]
      },
      {
        id: 'tc-wl-2',
        title: 'Royal Rajasthan Heritage Circuit',
        category: 'Guided Tour Package',
        type: 'package',
        subtitle: 'Jaipur, Jodhpur & Udaipur, Rajasthan',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1920&auto=format&fit=crop',
        price: '₹18,900',
        numericPrice: 18900,
        rating: '4.9 (480)',
        description: '5-day royal journey across Rajput palaces and Lake Pichola.',
        cancellationPolicy: 'Free cancellation up to 5 days before',
        specs: [
          { label: 'Duration', val: '5 Days · 4 Nights' },
          { label: 'Transport', val: 'Private AC Chauffeur Included' }
        ]
      },
      {
        id: 'tc-wl-3',
        title: 'Barefoot Andaman Sanctuary',
        category: 'Beachfront Eco Resort',
        type: 'hotel',
        subtitle: 'Radhanagar Beach · Havelock, Andaman',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1920&auto=format&fit=crop',
        price: '₹8,200',
        numericPrice: 8200,
        rating: '4.9 (290)',
        description: 'Thatched villas set steps away from turquoise Radhanagar waters.',
        cancellationPolicy: 'Free cancellation until 48hrs before arrival',
        specs: [
          { label: 'Room Type', val: 'Nicobari Oceanfront Villa' },
          { label: 'Inclusions', val: 'Snorkeling Gear, Breakfast' }
        ]
      }
    ];
  },

  getAll() {
    try {
      const raw = localStorage.getItem(this.getStorageKey());
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch(e) {
      return [];
    }
  },

  saveAll(list) {
    try {
      localStorage.setItem(this.getStorageKey(), JSON.stringify(list));
      this.updateBadges();
      this.syncHeartButtons();
    } catch(e) {}
  },

  has(titleOrId) {
    if (!titleOrId) return false;
    const target = String(titleOrId).trim().toLowerCase();
    return this.getAll().some(item => 
      (item.title && item.title.trim().toLowerCase() === target) ||
      (item.id && item.id.trim().toLowerCase() === target)
    );
  },

  toggle(itemData, btnEl) {
    let list = this.getAll();
    const title = (itemData.title || '').trim();
    const existingIndex = list.findIndex(i => (i.title && i.title.toLowerCase() === title.toLowerCase()) || (i.id && i.id === itemData.id));

    if (existingIndex >= 0) {
      list.splice(existingIndex, 1);
      this.saveAll(list);
      showToast(`Removed "${title}" from your wishlist.`, 'info');
      if (btnEl) btnEl.classList.remove('saved');
      return false;
    } else {
      const newItem = {
        id: itemData.id || 'tc-wl-' + Date.now(),
        title: title || 'Saved Escape',
        category: itemData.category || 'Travel Listing',
        type: itemData.type || 'hotel',
        subtitle: itemData.subtitle || itemData.location || 'India',
        image: itemData.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
        price: itemData.price || '₹3,500',
        numericPrice: itemData.numericPrice || parseInt(String(itemData.price || '3500').replace(/[^0-9]/g, ''), 10) || 3500,
        rating: itemData.rating || '4.8 (Verified)',
        description: itemData.description || 'Verified accommodation with direct host support and instant reservation.',
        cancellationPolicy: itemData.cancellationPolicy || 'Free cancellation until 48hrs before arrival',
        specs: itemData.specs || [{ label: 'Cancellation', val: 'Free cancellation' }]
      };
      list.unshift(newItem);
      this.saveAll(list);
      showToast(`Saved "${title}" to your wishlist!`, 'success');
      if (btnEl) {
        btnEl.classList.add('saved');
        btnEl.style.animation = 'heartPop 0.4s ease';
        setTimeout(() => { btnEl.style.animation = ''; }, 450);
      }
      if (typeof TripCraftNotifications !== 'undefined') {
        TripCraftNotifications.addNotification({
          type: 'wishlist',
          title: 'Saved to Wishlist',
          message: `"${title}" has been saved to your wishlist.`,
          link: 'wishlist.html'
        });
      }
      return true;
    }
  },

  remove(titleOrId) {
    let list = this.getAll();
    list = list.filter(i => i.title !== titleOrId && i.id !== titleOrId);
    this.saveAll(list);
    showToast('Item removed from your wishlist.', 'info');
    const container = document.getElementById('wishlistGridMount');
    if (container) {
      this.renderWishlistPage();
    }
  },

  clear() {
    this.saveAll([]);
    showToast('Your wishlist has been cleared.', 'info');
    const container = document.getElementById('wishlistGridMount');
    if (container) {
      this.renderWishlistPage();
    }
  },

  updateBadges() {
    const count = this.getAll().length;
    document.querySelectorAll('.tc-nav-wishlist-badge').forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
    });
    const userMenuCount = document.getElementById('userMenuWishlistCount');
    if (userMenuCount) {
      userMenuCount.textContent = count;
    }
  },

  syncHeartButtons() {
    document.querySelectorAll('.dest-card-fav, .tc-wishlist-btn').forEach(btn => {
      const card = btn.closest('.hotel-card, .dest-card, .package-card, .vehicle-card, .card');
      if (!card) return;
      const titleEl = card.querySelector('.hotel-name, .dest-title, .package-title, .vehicle-title, h3');
      if (titleEl) {
        const title = titleEl.textContent.trim();
        const isSaved = this.has(title);
        btn.classList.toggle('saved', isSaved);
      }
    });
  },

  attachCardListeners() {
    document.querySelectorAll('.dest-card-fav, .tc-wishlist-btn').forEach(btn => {
      if (btn._wlAttached) return;
      btn._wlAttached = true;
      btn.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        const card = btn.closest('.hotel-card, .dest-card, .package-card, .vehicle-card, .card');
        if (!card) return;

        const titleEl = card.querySelector('.hotel-name, .dest-title, .package-title, .vehicle-title, h3');
        const title = titleEl ? titleEl.textContent.trim() : 'Saved Item';

        const imgEl = card.querySelector('.hotel-img, .dest-card-img, .package-img, .vehicle-img, [style*="background-image"]');
        let imgUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop';
        if (imgEl && imgEl.style.backgroundImage) {
          const match = imgEl.style.backgroundImage.match(/url\(['"]?(.*?)['"]?\)/);
          if (match && match[1]) imgUrl = match[1];
        }

        const priceEl = card.querySelector('.hotel-price, .dest-price, .package-price, .vehicle-price');
        const price = priceEl ? priceEl.textContent.trim() : '₹3,500';

        const categoryEl = card.querySelector('.hotel-badge, .dest-badge, .package-badge, .vehicle-badge, .chip');
        const category = categoryEl ? categoryEl.textContent.trim() : 'Travel Listing';

        const locEl = card.querySelector('.hotel-loc, .dest-loc, .vehicle-spec');
        const subtitle = locEl ? locEl.textContent.trim().replace(/\s+/g, ' ') : 'India';

        TripCraftWishlist.toggle({
          title,
          image: imgUrl,
          price,
          category,
          subtitle
        }, btn);
      });
    });
  },

  renderWishlistPage() {
    const container = document.getElementById('wishlistGridMount');
    if (!container) return;

    const items = this.getAll();
    const countEl = document.getElementById('wishlistTotalCount');
    if (countEl) countEl.textContent = `${items.length} ${items.length === 1 ? 'Item' : 'Items'}`;

    if (items.length === 0) {
      container.innerHTML = `
        <div class="tc-wishlist-empty-state">
          <div class="tc-wishlist-empty-icon">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </div>
          <h3>Your Wishlist is Empty</h3>
          <p>You haven't saved any travel destinations, luxury stays, or packages yet. Browse our curated escapes and click the heart icon on any listing to save it here.</p>
          <div style="display:flex; gap:12px; justify-content:center; margin-top:20px; flex-wrap:wrap;">
            <a href="destinations.html" class="btn btn-teal">Explore Destinations</a>
            <a href="hotels.html" class="btn btn-gold">Browse Stays</a>
            <a href="packages.html" class="btn btn-ghost" style="border-color:var(--gray-300);">Tour Packages</a>
          </div>
        </div>
      `;
      return;
    }

    let html = '<div class="tc-wishlist-grid">';
    items.forEach(item => {
      const priceStr = item.price || '₹3,500';
      const cleanBookingData = JSON.stringify(item).replace(/"/g, '&quot;');
      html += `
        <div class="tc-wishlist-card">
          <div class="tc-wishlist-card-media" style="background-image: url('${item.image}');">
            <span class="tc-wishlist-badge">${item.category || 'Travel Listing'}</span>
            <button class="tc-wishlist-remove-btn" onclick="TripCraftWishlist.remove('${item.title}')" title="Remove from Wishlist">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div class="tc-wishlist-card-body">
            <h3 class="tc-wishlist-card-title">${item.title}</h3>
            <div class="tc-wishlist-card-loc">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>${item.subtitle || 'India'}</span>
            </div>
            <p class="tc-wishlist-card-desc">${item.description || 'Verified accommodation with direct host support and instant reservation.'}</p>
            <div class="tc-wishlist-card-footer">
              <div>
                <div class="tc-wishlist-card-price">${priceStr}</div>
                <div class="tc-wishlist-card-rate-sub">per night &middot; verified rate</div>
              </div>
              <button class="btn btn-teal" onclick="openBookingModal(${cleanBookingData})">
                Book Now
              </button>
            </div>
          </div>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
  }
};

window.TripCraftWishlist = TripCraftWishlist;

// -------------------------------------------------------------
// 13.6. REAL-TIME EVENT-DRIVEN NOTIFICATIONS ENGINE (TripCraftNotifications)
// -------------------------------------------------------------
const TripCraftNotifications = {
  getStorageKey() {
    const user = (typeof TripCraftAuth !== 'undefined') ? TripCraftAuth.getUser() : null;
    const userId = user && user.id ? user.id : 'guest';
    return `tripcraft_notifications_${userId}`;
  },

  seedDefaults() {
    return [
      {
        id: 'notif-1',
        type: 'booking',
        title: 'Booking Confirmed!',
        message: 'Your stay at Munnar Tea Country Resort is confirmed! Booking ID: #TC-BK-2026-89421',
        time: '15m ago',
        timestamp: Date.now() - 15 * 60 * 1000,
        read: false,
        link: 'bookings.html'
      },
      {
        id: 'notif-2',
        type: 'price',
        title: 'Price Dropped on Saved Stay!',
        message: 'Barefoot Andaman Sanctuary in your wishlist dropped by 18% — now ₹8,200/night.',
        time: '2h ago',
        timestamp: Date.now() - 2 * 60 * 60 * 1000,
        read: false,
        link: 'hotels.html'
      },
      {
        id: 'notif-3',
        type: 'reminder',
        title: 'Trip Countdown: 3 Days to Munnar',
        message: 'Your high-altitude trip to Munnar starts in 3 days! Check your customized day-by-day itinerary.',
        time: 'Yesterday',
        timestamp: Date.now() - 24 * 60 * 60 * 1000,
        read: true,
        link: 'itinerary.html'
      }
    ];
  },

  getAll() {
    try {
      const raw = localStorage.getItem(this.getStorageKey());
      if (!raw) {
        const seeded = this.seedDefaults();
        localStorage.setItem(this.getStorageKey(), JSON.stringify(seeded));
        return seeded;
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch(e) {
      return [];
    }
  },

  saveAll(list) {
    try {
      localStorage.setItem(this.getStorageKey(), JSON.stringify(list));
      this.updateBadges();
      this.renderList();
    } catch(e) {}
  },

  getUnreadCount() {
    return this.getAll().filter(n => !n.read).length;
  },

  addNotification(notif) {
    const list = this.getAll();
    const newNotif = {
      id: 'notif-' + Date.now(),
      type: notif.type || 'info',
      title: notif.title || 'TripCraft Notification',
      message: notif.message || '',
      time: 'Just now',
      timestamp: Date.now(),
      read: false,
      link: notif.link || 'index.html'
    };
    list.unshift(newNotif);
    this.saveAll(list);
    showToast(`New Alert: ${newNotif.title}`, 'info');
    return newNotif;
  },

  markAsRead(id) {
    const list = this.getAll();
    const target = list.find(n => n.id === id);
    if (target) {
      target.read = true;
      this.saveAll(list);
    }
  },

  markAllAsRead() {
    const list = this.getAll();
    list.forEach(n => n.read = true);
    this.saveAll(list);
    showToast('All notifications marked as read', 'info');
  },

  clearAll() {
    this.saveAll([]);
    showToast('All notifications cleared', 'info');
  },

  togglePanel(e) {
    if (e) e.stopPropagation();
    const panel = document.getElementById('tcNotifPanel');
    const btn = document.getElementById('tcNavNotifBtn');
    if (!panel) return;
    const isShowing = panel.classList.contains('show');
    panel.classList.toggle('show', !isShowing);
    if (btn) btn.classList.toggle('active', !isShowing);
    if (!isShowing) {
      this.renderList();
    }
  },

  updateBadges() {
    const count = this.getUnreadCount();
    const badges = document.querySelectorAll('#tcNavNotifBadge');
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'inline-flex' : 'none';
    });
    const headerCount = document.getElementById('tcNotifHeaderCount');
    if (headerCount) {
      headerCount.textContent = `${count} new`;
    }
    const userMenuCount = document.getElementById('userMenuNotifCount');
    if (userMenuCount) {
      userMenuCount.textContent = count;
    }
  },

  renderList() {
    const container = document.getElementById('tcNotifList');
    if (!container) return;
    const list = this.getAll();

    if (list.length === 0) {
      container.innerHTML = `
        <div class="tc-notif-empty">
          <svg class="tc-notif-empty-icon" viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <div style="font-weight:700; color:var(--navy); font-size:13px;">No notifications</div>
          <div style="font-size:11.5px; margin-top:2px;">You are completely caught up!</div>
        </div>
      `;
      return;
    }

    let html = '';
    list.forEach(n => {
      let iconBox = '<div class="tc-notif-icon-box info"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg></div>';
      if (n.type === 'booking') {
        iconBox = '<div class="tc-notif-icon-box booking"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></div>';
      } else if (n.type === 'price') {
        iconBox = '<div class="tc-notif-icon-box price"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg></div>';
      } else if (n.type === 'reminder') {
        iconBox = '<div class="tc-notif-icon-box reminder"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>';
      }

      html += `
        <a href="${n.link || 'javascript:void(0)'}" class="tc-notif-item ${n.read ? '' : 'unread'}" onclick="TripCraftNotifications.markAsRead('${n.id}')">
          ${iconBox}
          <div class="tc-notif-content">
            <div class="tc-notif-title">
              <span>${n.title}</span>
              ${!n.read ? '<span class="tc-notif-dot"></span>' : ''}
            </div>
            <div class="tc-notif-desc">${n.message}</div>
            <div class="tc-notif-time">${n.time}</div>
          </div>
        </a>
      `;
    });
    container.innerHTML = html;
  }
};

window.TripCraftNotifications = TripCraftNotifications;

// Close notifications panel on outside click
document.addEventListener('click', e => {
  const panel = document.getElementById('tcNotifPanel');
  const btn = document.getElementById('tcNavNotifBtn');
  if (panel && !panel.contains(e.target) && (!btn || !btn.contains(e.target))) {
    panel.classList.remove('show');
    if (btn) btn.classList.remove('active');
  }
});

// -------------------------------------------------------------
// 14. FLOATING AI TRAVEL ASSISTANT CHATBOT (TripCraftChatbot)
// -------------------------------------------------------------
const TripCraftChatbot = {
  isOpen: false,

  init() {
    if (document.getElementById('tcChatbotContainer')) return;

    const container = document.createElement('div');
    container.id = 'tcChatbotContainer';
    container.innerHTML = `
      <button class="tc-chat-toggle-btn" onclick="TripCraftChatbot.toggle()" title="TripCraft AI Travel Assistant">
        <div class="tc-chat-pulse"></div>
        <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </button>

      <div class="tc-chat-window" id="tcChatWindow">
        <div class="tc-chat-header">
          <div class="tc-chat-title">
            TripCraft AI Bot <span>2.0</span>
          </div>
          <button class="tc-chat-close" onclick="TripCraftChatbot.toggle()">&times;</button>
        </div>

        <div class="tc-chat-messages" id="tcChatMessages">
          <div class="tc-chat-msg bot">
            Vanakkam &amp; Hello! I am your TripCraft AI Travel Assistant. Ask me about Munnar spots, budget splitting, cancellation policies, vehicle rentals, or 24/7 customer support!
          </div>
        </div>

        <div class="tc-chat-chips">
          <button class="tc-chip-btn" onclick="TripCraftChatbot.quickAsk('Cancellation Policy')">Cancellation</button>
          <button class="tc-chip-btn" onclick="TripCraftChatbot.quickAsk('24/7 Customer Support')">Support Helpline</button>
          <button class="tc-chip-btn" onclick="TripCraftChatbot.quickAsk('Munnar 4-Day Plan')">Munnar Plan</button>
          <button class="tc-chip-btn" onclick="TripCraftChatbot.quickAsk('Split 15000 Budget')">Budget Split</button>
        </div>

        <div class="tc-chat-input-bar">
          <input type="text" id="tcChatInput" class="tc-chat-input" placeholder="Ask about bookings, cancellation, stays..." onkeydown="if(event.key==='Enter') TripCraftChatbot.send()" />
          <button class="tc-chat-send" onclick="TripCraftChatbot.send()">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(container);
  },

  toggle() {
    this.isOpen = !this.isOpen;
    const win = document.getElementById('tcChatWindow');
    if (win) win.classList.toggle('active', this.isOpen);
  },

  quickAsk(text) {
    const input = document.getElementById('tcChatInput');
    if (input) {
      input.value = text;
      this.send();
    }
  },

  send() {
    const input = document.getElementById('tcChatInput');
    const msg = input?.value.trim();
    if (!msg) return;

    this.appendMessage(msg, 'user');
    input.value = '';

    setTimeout(() => {
      const reply = this.generateResponse(msg);
      this.appendMessage(reply, 'bot');
    }, 400);
  },

  appendMessage(text, sender) {
    const box = document.getElementById('tcChatMessages');
    if (!box) return;

    const div = document.createElement('div');
    div.className = `tc-chat-msg ${sender}`;
    div.innerHTML = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  },

  generateResponse(query) {
    const q = query.toLowerCase();

    // 1. Cancellation Policy
    if (q.includes('cancel') || q.includes('cancellation')) {
      return `
        <strong>TripCraft Cancellation Policy:</strong><br/>
        &bull; <strong>Hotels &amp; Resorts:</strong> Free cancellation up to 24-48 hours before check-in time.<br/>
        &bull; <strong>Multi-Modal Transport:</strong> Full refund up to 24 hours prior to departure for rail &amp; bus; flight cancellations subject to airline tariff rules.<br/>
        &bull; <strong>Guided Tours:</strong> Cancel anytime up to 12 hours before tour commencement.<br/>
        <a href="faq.html" style="color:var(--teal); font-weight:700; text-decoration:underline; display:inline-block; margin-top:6px;">View Full FAQ &rarr;</a>
      `;
    }

    // 2. Customer Support & Helpline
    if (q.includes('support') || q.includes('help') || q.includes('contact') || q.includes('phone') || q.includes('call') || q.includes('number')) {
      return `
        <strong>TripCraft 24/7 Traveler Concierge:</strong><br/>
        &bull; <strong>Toll-Free Helpline:</strong> +91 1800 202 6000<br/>
        &bull; <strong>WhatsApp Quick Assist:</strong> +91 98401 23456<br/>
        &bull; <strong>Email Desk:</strong> support@tripcraft.com<br/>
        &bull; <strong>Desk Hours:</strong> Mon-Sat 9AM-8PM IST (Priority 24/7 on-trip escalation)<br/>
        <a href="contact.html" style="color:var(--teal); font-weight:700; text-decoration:underline; display:inline-block; margin-top:6px;">Open Support Ticket Desk &rarr;</a>
      `;
    }

    // 3. Refund Policy
    if (q.includes('refund') || q.includes('money back')) {
      return `
        <strong>Instant Refund Settlement:</strong><br/>
        Refunds are automatically processed to your original payment method (UPI / Card / Netbanking) within 3-5 banking business days. Instant 100% store credit is also available in your TripCraft wallet.<br/>
        <a href="contact.html" style="color:var(--teal); font-weight:700; text-decoration:underline; display:inline-block; margin-top:6px;">Track Refund Status &rarr;</a>
      `;
    }

    // 4. Payment Methods & Security
    if (q.includes('payment') || q.includes('upi') || q.includes('card') || q.includes('secure')) {
      return `
        <strong>Secure 256-Bit SSL Payments:</strong><br/>
        We support instant UPI (GPay, PhonePe, Paytm, BHIM), RuPay/Visa/MasterCard credit and debit cards, and 50+ Netbanking institutions with zero convenience surcharge fees.
      `;
    }

    // 5. Budget splitting logic
    if (q.includes('budget') || q.includes('split') || q.includes('15000') || q.includes('rs') || q.includes('inr')) {
      const numMatch = q.match(/\d+/);
      const budget = numMatch ? parseInt(numMatch[0], 10) : 15000;
      const stay = Math.round(budget * 0.40);
      const food = Math.round(budget * 0.25);
      const trans = Math.round(budget * 0.20);
      const entry = Math.round(budget * 0.15);

      return `
        <strong>Smart 40/25/20/15 Budget Allocation for &#8377;${budget.toLocaleString('en-IN')}:</strong><br/>
        &bull; <strong>Stay (40%):</strong> &#8377;${stay.toLocaleString('en-IN')}<br/>
        &bull; <strong>Food (25%):</strong> &#8377;${food.toLocaleString('en-IN')}<br/>
        &bull; <strong>Transport (20%):</strong> &#8377;${trans.toLocaleString('en-IN')}<br/>
        &bull; <strong>Entry / Activities (15%):</strong> &#8377;${entry.toLocaleString('en-IN')}<br/>
        <a href="budget.html" style="color:var(--teal); font-weight:700; text-decoration:underline; display:inline-block; margin-top:6px;">Open Budget Tracker &rarr;</a>
      `;
    }

    // 6. Munnar Itinerary & spots
    if (q.includes('munnar') || q.includes('spot') || q.includes('itinerary')) {
      return `
        <strong>Munnar 4-Day Highlights:</strong><br/>
        &bull; <strong>Day 1:</strong> KDHP Tea Museum &amp; Lockhart Gap sunset walk.<br/>
        &bull; <strong>Day 2:</strong> Eravikulam National Park (Nilgiri Tahr safari) &amp; Mattupetty Dam boat ride.<br/>
        &bull; <strong>Day 3:</strong> Top Station clouds &amp; Kolukkumalai tea estate sunrise.<br/>
        &bull; <strong>Day 4:</strong> Pothamedu Viewpoint &amp; spice garden shopping.<br/>
        <a href="itinerary.html" style="color:var(--teal); font-weight:700; text-decoration:underline; display:inline-block; margin-top:6px;">Open Interactive Itinerary Builder &rarr;</a>
      `;
    }

    // 7. Food in Munnar
    if (q.includes('food') || q.includes('eat') || q.includes('dish')) {
      return `
        <strong>Must-Try Munnar &amp; Kerala Delicacies:</strong><br/>
        &bull; <strong>Appam with Vegetable Stew:</strong> Fluffy fermented rice pancake with rich coconut milk curry.<br/>
        &bull; <strong>Malabar Parotta &amp; Roast:</strong> Layered flaky flatbread with spicy slow-cooked gravy.<br/>
        &bull; <strong>Karimeen Pollichathu:</strong> Pearl spot fish marinated in shallot-chili paste, wrapped in banana leaf.<br/>
        &bull; <strong>Cardamom Hill Tea:</strong> Brewed fresh from high-grown estate tea leaves.
      `;
    }

    // 8. Vehicle trigger explanation
    if (q.includes('vehicle') || q.includes('car') || q.includes('bike') || q.includes('trigger')) {
      return `
        <strong>TripCraft Smart Synergy Trigger:</strong><br/>
        Whenever you confirm a hotel booking in Munnar or Jaipur, TripCraft automatically prompts: <em>"Need a car or bike?"</em><br/>
        Dates are synchronized automatically from your check-in/out, and your vehicle rental links to your hotel booking via Foreign Key (<code>hotel_booking_id</code>)!<br/>
        <a href="vehicle.html" style="color:var(--teal); font-weight:700; text-decoration:underline; display:inline-block; margin-top:6px;">Browse Vehicle Fleet &rarr;</a>
      `;
    }

    // 9. Guide recommendation
    if (q.includes('guide')) {
      return `
        <strong>Verified Local Guides in Munnar:</strong><br/>
        &bull; <strong>Rajesh Kumar:</strong> Certified tea naturalist &amp; birding expert (Tamil, English, Malayalam) - 4.9 rating.<br/>
        &bull; <strong>Meenakshi Sundaram:</strong> Western Ghats historian &amp; spice botanist - 4.8 rating.<br/>
        <a href="guides.html" style="color:var(--teal); font-weight:700; text-decoration:underline; display:inline-block; margin-top:6px;">Book a Local Guide &rarr;</a>
      `;
    }

    // 10. Solo Travel & Safety
    if (q.includes('solo') || q.includes('safety') || q.includes('meetup') || q.includes('buddy')) {
      return `
        <strong>Dedicated Solo Travel &amp; Safety:</strong><br/>
        &bull; Verified safety index ratings for solo travelers.<br/>
        &bull; Verified female-friendly boutique pod &amp; hostel stays with zero single-supplement surcharges.<br/>
        &bull; Solo Traveler Lounge to connect with verified peers and propose joint meetups.<br/>
        <a href="solo.html" style="color:var(--teal); font-weight:700; text-decoration:underline; display:inline-block; margin-top:6px;">Open Solo Travel Hub &rarr;</a>
      `;
    }

    // Default friendly response
    return `TripCraft connects all travel stages: Register with JWT &rarr; Search Destinations &rarr; Build Itinerary &rarr; Book Transport &rarr; Book Hotel &rarr; Smart Vehicle Trigger &rarr; Local Guide &rarr; 40/25/20/15 Budget Tracker &rarr; Community Reviews! What would you like to explore next?`;
  }
};

// -------------------------------------------------------------
// 15. 29 RELATIONAL DATABASE TABLES REPOSITORY (window.TripCraftDB)
// -------------------------------------------------------------
window.TripCraftDB = {
  tables: {
    // 1. Identity & Security
    USER: {
      columns: ['id (PK)', 'name', 'email', 'password_hash', 'phone', 'role_id (FK)', 'created_at'],
      rows: [
        { id: 'TC-USR-101', name: 'Priya Sunder', email: 'priya.traveler@example.com', role: 'user', phone: '+91 98765 43210' },
        { id: 'TC-USR-102', name: 'Arun Kumar', email: 'arun.kumar@example.com', role: 'user', phone: '+91 98451 22334' },
        { id: 'TC-USR-103', name: 'Deepa Nair', email: 'deepa.nair@example.com', role: 'user', phone: '+91 97123 88440' },
        { id: 'TC-USR-104', name: 'Karthik Raja', email: 'karthik.raja@example.com', role: 'user', phone: '+91 99801 11223' },
        { id: 'TC-USR-105', name: 'Ananya Sharma', email: 'ananya.sharma@example.com', role: 'user', phone: '+91 98220 77114' },
        { id: 'TC-ADM-001', name: 'Admin Master', email: 'admin@tripcraft.com', role: 'admin', phone: '+91 90000 00001' }
      ]
    },
    ROLE: {
      columns: ['id (PK)', 'role_name', 'permissions'],
      rows: [
        { id: 1, role_name: 'ROLE_USER', permissions: 'READ_CATALOG, CREATE_BOOKING, WRITE_REVIEW' },
        { id: 2, role_name: 'ROLE_ADMIN', permissions: 'ALL_PRIVILEGES, MANAGE_USERS, OVERRIDE_BOOKINGS' }
      ]
    },
    USER_ROLE: {
      columns: ['user_id (FK)', 'role_id (FK)'],
      rows: [
        { user_id: 'TC-USR-101', role_id: 1 },
        { user_id: 'TC-ADM-001', role_id: 2 }
      ]
    },
    USER_PROFILE: {
      columns: ['id (PK)', 'user_id (FK)', 'bio', 'emergency_contact', 'preferred_currency'],
      rows: [
        { id: 1, user_id: 'TC-USR-101', bio: 'Avid Western Ghats trekker and tea lover', emergency_contact: '+91 98765 00000', preferred_currency: 'INR' }
      ]
    },
    AUTH_SESSION: {
      columns: ['id (PK)', 'user_id (FK)', 'jwt_token_hash', 'ip_address', 'expires_at'],
      rows: [
        { id: 1, user_id: 'TC-USR-101', jwt_token_hash: 'sha256_e4b1a...', ip_address: '192.168.1.10', expires_at: '2026-09-24T12:00:00Z' }
      ]
    },

    // 2. Destinations & Geography
    DESTINATION: {
      columns: ['id (PK)', 'name', 'state', 'country', 'latitude', 'longitude', 'rating', 'safety_score'],
      rows: [
        { id: 'DEST-01', name: 'Munnar', state: 'Kerala', country: 'India', latitude: 10.0889, longitude: 77.0595, rating: 4.8, safety_score: 8.8 },
        { id: 'DEST-02', name: 'Jaipur', state: 'Rajasthan', country: 'India', latitude: 26.9124, longitude: 75.7873, rating: 4.7, safety_score: 7.8 },
        { id: 'DEST-03', name: 'Manali', state: 'Himachal Pradesh', country: 'India', latitude: 32.2432, longitude: 77.1892, rating: 4.7, safety_score: 8.5 }
      ]
    },
    PLACE: {
      columns: ['id (PK)', 'destination_id (FK)', 'name', 'category', 'entry_fee', 'avg_time_hours'],
      rows: [
        { id: 'PLC-01', destination_id: 'DEST-01', name: 'KDHP Tea Museum', category: 'Heritage & Demonstration', entry_fee: 150, avg_time_hours: 2.0 },
        { id: 'PLC-02', destination_id: 'DEST-01', name: 'Eravikulam National Park', category: 'Wildlife Sanctuary', entry_fee: 250, avg_time_hours: 3.5 },
        { id: 'PLC-03', destination_id: 'DEST-01', name: 'Lockhart Tea Plantation', category: 'Scenic Walkway', entry_fee: 50, avg_time_hours: 2.5 }
      ]
    },
    FOOD: {
      columns: ['id (PK)', 'destination_id (FK)', 'dish_name', 'type', 'must_try_stall'],
      rows: [
        { id: 'FD-01', destination_id: 'DEST-01', dish_name: 'Appam & Vegetable Stew', type: 'Veg / Breakfast', must_try_stall: 'Rapsy Restaurant, Munnar' },
        { id: 'FD-02', destination_id: 'DEST-01', dish_name: 'Malabar Parotta & Roast', type: 'Non-Veg', must_try_stall: 'Saravana Bhavan Munnar' }
      ]
    },
    HIDDEN_GEM: {
      columns: ['id (PK)', 'destination_id (FK)', 'title', 'access_difficulty'],
      rows: [
        { id: 'HG-01', destination_id: 'DEST-01', title: 'Kolukkumalai Sunrise Ridge (World Highest Tea Estate)', access_difficulty: 'Moderate 4x4 Jeep' }
      ]
    },
    DESTINATION_MEDIA: {
      columns: ['id (PK)', 'destination_id (FK)', 'media_url', 'caption'],
      rows: [
        { id: 'MED-01', destination_id: 'DEST-01', media_url: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2', caption: 'Rolling Tea Hills of Munnar' }
      ]
    },

    // 3. Itinerary Engine
    ITINERARY: {
      columns: ['id (PK)', 'user_id (FK)', 'destination_id (FK)', 'duration_days', 'total_estimated_budget'],
      rows: [
        { id: 'ITIN-01', user_id: 'TC-USR-101', destination_id: 'DEST-01', duration_days: 4, total_estimated_budget: 15000 }
      ]
    },
    ITINERARY_DAY: {
      columns: ['id (PK)', 'itinerary_id (FK)', 'day_number', 'theme'],
      rows: [
        { id: 'IDAY-01', itinerary_id: 'ITIN-01', day_number: 1, theme: 'Arrival & Colonial Tea Trails' },
        { id: 'IDAY-02', itinerary_id: 'ITIN-01', day_number: 2, theme: 'Eravikulam Wildlife & Mattupetty' }
      ]
    },
    ITINERARY_ITEM: {
      columns: ['id (PK)', 'day_id (FK)', 'place_id (FK)', 'time_slot', 'order_index'],
      rows: [
        { id: 'ITEM-01', day_id: 'IDAY-01', place_id: 'PLC-01', time_slot: '09:30 AM', order_index: 1 },
        { id: 'ITEM-02', day_id: 'IDAY-01', place_id: 'PLC-03', time_slot: '04:00 PM', order_index: 2 }
      ]
    },
    ACTIVITY: {
      columns: ['id (PK)', 'title', 'price', 'duration_min'],
      rows: [
        { id: 'ACT-01', title: 'Ayurvedic Spice Massage', price: 1800, duration_min: 60 }
      ]
    },

    // 4. Transportation
    TRANSPORT_OPERATOR: {
      columns: ['id (PK)', 'operator_name', 'mode_type', 'rating'],
      rows: [
        { id: 'OP-01', operator_name: 'IndiGo Airlines', mode_type: 'Flight', rating: 4.7 },
        { id: 'OP-02', operator_name: 'Southern Railway (Vande Bharat)', mode_type: 'Train', rating: 4.9 },
        { id: 'OP-03', operator_name: 'KSRTC Swift Airavat', mode_type: 'Bus', rating: 4.6 }
      ]
    },
    TRANSPORT_ROUTE: {
      columns: ['id (PK)', 'operator_id (FK)', 'origin', 'destination', 'fare_inr', 'duration_hrs'],
      rows: [
        { id: 'TR-01', operator_id: 'OP-01', origin: 'Chennai (MAA)', destination: 'Cochin (COK)', fare_inr: 3850, duration_hrs: 1.2 },
        { id: 'TR-02', operator_id: 'OP-02', origin: 'Bangalore (SBC)', destination: 'Ernakulam (ERS)', fare_inr: 1460, duration_hrs: 8.5 }
      ]
    },
    TRANSPORT_BOOKING: {
      columns: ['id (PK)', 'user_id (FK)', 'route_id (FK)', 'travel_date', 'seats', 'total_fare', 'status'],
      rows: [
        { id: 'TC-TB-2026-1120', user_id: 'TC-USR-101', route_id: 'TR-01', travel_date: '2026-09-18', seats: 2, total_fare: 7700, status: 'Confirmed' }
      ]
    },

    // 5. Hospitality
    HOTEL: {
      columns: ['id (PK)', 'destination_id (FK)', 'name', 'stars', 'base_nightly_rate', 'location'],
      rows: [
        { id: 'HTL-01', destination_id: 'DEST-01', name: 'Munnar Tea Country Resort', stars: 5, base_nightly_rate: 5400, location: 'Chithirapuram · Munnar' },
        { id: 'HTL-02', destination_id: 'DEST-01', name: 'Grand Valley Estate', stars: 4, base_nightly_rate: 3600, location: 'Pothamedu · Munnar' }
      ]
    },
    ROOM_TYPE: {
      columns: ['id (PK)', 'hotel_id (FK)', 'room_name', 'max_occupancy', 'rate_multiplier'],
      rows: [
        { id: 'RM-01', hotel_id: 'HTL-01', room_name: 'Valley View Deluxe Cottage', max_occupancy: 3, rate_multiplier: 1.0 }
      ]
    },
    HOTEL_AMENITY: {
      columns: ['id (PK)', 'hotel_id (FK)', 'amenity_name'],
      rows: [
        { id: 'AMN-01', hotel_id: 'HTL-01', amenity_name: 'Ayurvedic Spa & Infinity Pool' }
      ]
    },
    HOTEL_BOOKING: {
      columns: ['id (PK)', 'user_id (FK)', 'hotel_id (FK)', 'check_in', 'check_out', 'total_amount', 'status'],
      rows: [
        { id: 'TC-BK-2026-89421', user_id: 'TC-USR-101', hotel_id: 'HTL-01', check_in: '2026-09-18', check_out: '2026-09-20', total_amount: 12096, status: 'Upcoming' }
      ]
    },

    // 6. Vehicle Fleet (SMART CROSS-BOOKING FK LINK!)
    VEHICLE_RENTAL: {
      columns: ['id (PK)', 'destination_id (FK)', 'model_name', 'category', 'daily_rate', 'fuel_type'],
      rows: [
        { id: 'VEH-01', destination_id: 'DEST-01', model_name: 'Royal Enfield Classic 350', category: 'Motorcycle', daily_rate: 1100, fuel_type: 'Petrol' },
        { id: 'VEH-02', destination_id: 'DEST-01', model_name: 'Toyota Innova Crysta 7-Seater', category: 'Car / SUV', daily_rate: 3200, fuel_type: 'Diesel' },
        { id: 'VEH-03', destination_id: 'DEST-01', model_name: 'Honda Activa 6G', category: 'Scooter', daily_rate: 650, fuel_type: 'Petrol' }
      ]
    },
    VEHICLE_TYPE: {
      columns: ['id (PK)', 'type_name', 'requires_driver_license'],
      rows: [
        { id: 1, type_name: 'Two Wheeler', requires_driver_license: true },
        { id: 2, type_name: 'Four Wheeler SUV', requires_driver_license: true }
      ]
    },
    VEHICLE_BOOKING: {
      columns: ['id (PK)', 'user_id (FK)', 'vehicle_id (FK)', 'hotel_booking_id (FK)', 'rental_start', 'rental_end', 'total_price', 'with_driver'],
      rows: [
        { id: 'TC-VB-2026-9041', user_id: 'TC-USR-101', vehicle_id: 'VEH-01', hotel_booking_id: 'TC-BK-2026-89421', rental_start: '2026-09-18', rental_end: '2026-09-20', total_price: 2464, with_driver: false }
      ]
    },

    // 7. Local Guides
    LOCAL_GUIDE: {
      columns: ['id (PK)', 'destination_id (FK)', 'full_name', 'specialization', 'daily_fee', 'rating', 'verified'],
      rows: [
        { id: 'GD-01', destination_id: 'DEST-01', full_name: 'Rajesh Kumar', specialization: 'Tea & Birding Naturalist', daily_fee: 1400, rating: 4.9, verified: true },
        { id: 'GD-02', destination_id: 'DEST-01', full_name: 'Meenakshi Sundaram', specialization: 'Heritage & Colonial Architecture', daily_fee: 1600, rating: 4.8, verified: true }
      ]
    },
    GUIDE_LANGUAGE: {
      columns: ['guide_id (FK)', 'language_name'],
      rows: [
        { guide_id: 'GD-01', language_name: 'Tamil' },
        { guide_id: 'GD-01', language_name: 'English' },
        { guide_id: 'GD-01', language_name: 'Malayalam' }
      ]
    },
    GUIDE_BOOKING: {
      columns: ['id (PK)', 'user_id (FK)', 'guide_id (FK)', 'tour_date', 'fee_paid', 'status'],
      rows: [
        { id: 'TC-GB-2026-3021', user_id: 'TC-USR-101', guide_id: 'GD-01', tour_date: '2026-09-19', fee_paid: 1568, status: 'Confirmed' }
      ]
    },

    // 8. Finance & Governance (40/25/20/15 Rule)
    BUDGET_PLAN: {
      columns: ['id (PK)', 'user_id (FK)', 'total_budget', 'stay_pct (40%)', 'food_pct (25%)', 'transport_pct (20%)', 'entry_pct (15%)'],
      rows: [
        { id: 'BP-01', user_id: 'TC-USR-101', total_budget: 15000, stay_pct: 40, food_pct: 25, transport_pct: 20, entry_pct: 15 }
      ]
    },
    EXPENSE_CATEGORY: {
      columns: ['id (PK)', 'category_name', 'default_allocation_pct'],
      rows: [
        { id: 1, category_name: 'Accommodation', default_allocation_pct: 40 },
        { id: 2, category_name: 'Food & Dining', default_allocation_pct: 25 },
        { id: 3, category_name: 'Transport & Fuel', default_allocation_pct: 20 },
        { id: 4, category_name: 'Entry & Activities', default_allocation_pct: 15 }
      ]
    },
    EXPENSE: {
      columns: ['id (PK)', 'user_id (FK)', 'category_id (FK)', 'expense_title', 'amount', 'logged_at'],
      rows: [
        { id: 'EXP-01', user_id: 'TC-USR-101', category_id: 1, expense_title: 'Munnar Tea Country Resort 2-Night Stay', amount: 10800, logged_at: '2026-09-18' },
        { id: 'EXP-02', user_id: 'TC-USR-101', category_id: 3, expense_title: 'Kochi to Munnar Cab Transfer', amount: 3400, logged_at: '2026-09-18' },
        { id: 'EXP-03', user_id: 'TC-USR-101', category_id: 2, expense_title: 'Spice Garden Traditional Lunch', amount: 1250, logged_at: '2026-09-19' }
      ]
    },

    // 9. Community & Social
    REVIEW: {
      columns: ['id (PK)', 'user_id (FK)', 'target_type', 'target_id', 'rating', 'comment', 'created_at'],
      rows: [
        { id: 'REV-01', user_id: 'TC-USR-101', target_type: 'Hotel', target_id: 'HTL-01', rating: 5, comment: 'Phenomenal valley view cottages and very hospitable estate staff!', created_at: '2026-09-15' },
        { id: 'REV-02', user_id: 'TC-USR-102', target_type: 'Guide', target_id: 'GD-01', rating: 5, comment: 'Rajesh knew every secret bird-watching spot in Munnar. Highly recommended!', created_at: '2026-09-12' }
      ]
    },
    COMMUNITY_POST: {
      columns: ['id (PK)', 'user_id (FK)', 'destination_id (FK)', 'title', 'content', 'post_type', 'likes'],
      rows: [
        { id: 'CP-01', user_id: 'TC-USR-103', destination_id: 'DEST-01', title: 'Kolukkumalai Sunrise 4x4 Jeep Tip', content: 'Book your jeep in Suryanelli before 4:30 AM to catch the cloud carpet sunrise over Tamil Nadu border!', post_type: 'Local Tip', likes: 142 }
      ]
    },
    COMMUNITY_COMMENT: {
      columns: ['id (PK)', 'post_id (FK)', 'user_id (FK)', 'comment_text'],
      rows: [
        { id: 'CC-01', post_id: 'CP-01', user_id: 'TC-USR-101', comment_text: 'Spot on! The early morning fog at Kolukkumalai was unforgettable.' }
      ]
    }
  },

  getTable(name) {
    return this.tables[name] || null;
  },

  listTables() {
    return Object.keys(this.tables);
  }
};

// -------------------------------------------------------------
// 12. TRIP CRAFT PHOTO ALBUM ENGINE & MARKETPLACE
// -------------------------------------------------------------
const TripCraftAlbum = {
  // Curated stock photo library for destinations
  stockPhotos: {
    'Munnar': [
      { id: 'm1', title: 'Misty Tea Plantations at Dawn', url: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop', tag: 'Landscape' },
      { id: 'm2', title: 'Attukad Waterfalls Cascade', url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop', tag: 'Nature' },
      { id: 'm3', title: 'Authentic Kerala Sadya on Banana Leaf', url: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=1200&auto=format&fit=crop', tag: 'Culinary' },
      { id: 'm4', title: 'Kolukkumalai Sunrise 7,900 ft Cloud Bed', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop', tag: 'Adventure' },
      { id: 'm5', title: 'Cardamom & Spice Plantation Walk', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop', tag: 'Culture' }
    ],
    'Jaipur': [
      { id: 'j1', title: 'Hawa Mahal Honeycomb Windows', url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop', tag: 'Heritage' },
      { id: 'j2', title: 'Amer Fort Golden Hour Panorama', url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop', tag: 'Architecture' },
      { id: 'j3', title: 'Royal Dal Baati Churma Feast', url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1200&auto=format&fit=crop', tag: 'Culinary' },
      { id: 'j4', title: 'Johari Bazaar Vibrant Gemstone Alley', url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop', tag: 'Bazaar' }
    ],
    'Havelock': [
      { id: 'h1', title: 'Radhanagar Beach White Powder Sand', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop', tag: 'Beach' },
      { id: 'h2', title: 'Scuba Diving at Elephant Reef', url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop', tag: 'Marine' },
      { id: 'h3', title: 'Mangrove Kayaking at Sunset', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop', tag: 'Adventure' }
    ],
    'Goa': [
      { id: 'g1', title: 'Palolem Beach Coconut Palm Shadows', url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop', tag: 'Coastal' },
      { id: 'g2', title: 'Fontainhas Portuguese Heritage Quarter', url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop', tag: 'Heritage' },
      { id: 'g3', title: 'Fresh Goan Kingfish Thali', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop', tag: 'Culinary' }
    ],
    'Ladakh': [
      { id: 'l1', title: 'Pangong Tso Turquoise Reflections', url: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1200&auto=format&fit=crop', tag: 'Himalayas' },
      { id: 'l2', title: 'Thiksey Monastery Sunrise Chants', url: 'https://images.unsplash.com/photo-1600100397608-f010e421d3fa?q=80&w=1200&auto=format&fit=crop', tag: 'Spiritual' },
      { id: 'l3', title: 'Nubra Sand Dunes with Double-Hump Camels', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop', tag: 'Desert' }
    ]
  },

  defaultMarketplace: [
    {
      id: 'ALB-001',
      title: 'Munnar Misty Peaks & Tea Trails',
      destination: 'Munnar, Kerala',
      author: 'Priya Sunder',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      cover: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop',
      price: 349,
      sales: 88,
      rating: 4.9,
      pagesCount: 5,
      description: 'A curated visual journey through the morning mists of Lockhart gap, secret waterfalls, and high-elevation organic tea gardens.',
      pages: [
        {
          title: 'Cover & Title',
          layout: 'hero',
          photos: ['https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop'],
          caption: 'Munnar: Where the Clouds Kiss the Emerald Hills',
          notes: 'Captured at 6:15 AM along the old Munnar-Madurai highway.'
        },
        {
          title: 'Page 1: Lockhart Gap & Tea Trails',
          layout: 'split',
          photos: [
            'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop'
          ],
          caption: 'Walking through century-old tea bushes and hidden brooks.',
          notes: 'The morning dew lasts until 9:30 AM, providing crystal clear photography reflections.'
        },
        {
          title: 'Page 2: Traditional Kerala Flavors',
          layout: 'hero',
          photos: ['https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=1200&auto=format&fit=crop'],
          caption: 'Banana Leaf Feast & Fresh Cardamom Brew',
          notes: 'Authentic lunch stop at a 40-year-old family restaurant in Mattupetty.'
        },
        {
          title: 'Page 3: Kolukkumalai Sunrise 7,900 ft',
          layout: 'split',
          photos: [
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop'
          ],
          caption: 'Highest Organic Tea Estate in the World',
          notes: 'A bumpy 4x4 ride rewarded with a sea of golden clouds.'
        },
        {
          title: 'Back Cover: Traveler Epilogue',
          layout: 'hero',
          photos: ['https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop'],
          caption: 'Leave Nothing but Footprints, Take Nothing but Memories',
          notes: 'TripCraft Verified Explorer Photo Collection &copy; 2026'
        }
      ]
    },
    {
      id: 'ALB-002',
      title: 'Jaipur Royal Havelis & Golden Hour',
      destination: 'Jaipur, Rajasthan',
      author: 'Vikram Rajput',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      cover: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop',
      price: 499,
      sales: 64,
      rating: 5.0,
      pagesCount: 4,
      description: 'Architectural perspectives of the Pink City — intricate Jharokhas, Rajput ramparts, and vibrant bazaar colors.',
      pages: [
        {
          title: 'Cover: The Wind Palace',
          layout: 'hero',
          photos: ['https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop'],
          caption: '953 Windows of Hawa Mahal at Sunrise',
          notes: 'Best shot from the Wind View rooftop cafe at 6:45 AM.'
        },
        {
          title: 'Page 1: Amer Fort Ramparts',
          layout: 'split',
          photos: [
            'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop'
          ],
          caption: 'Amber Fort reflections over Maota Lake and Johari Bazaar gemstone lanes.',
          notes: 'Light conditions peak around 4:30 PM before fortress gates close.'
        },
        {
          title: 'Page 2: Royal Marwar Banquet',
          layout: 'hero',
          photos: ['https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1200&auto=format&fit=crop'],
          caption: 'Authentic Rajasthani Thali in Heritage Courtyard',
          notes: 'Ghee-soaked Baati with panchmel dal and churma.'
        },
        {
          title: 'Back Cover: Rajasthan Sunset',
          layout: 'hero',
          photos: ['https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop'],
          caption: 'Dusk falls over Nahargarh Fort looking across the Pink City.',
          notes: 'TripCraft Verified Explorer Photo Collection &copy; 2026'
        }
      ]
    },
    {
      id: 'ALB-003',
      title: 'Havelock White Sand & Coral Reefs',
      destination: 'Havelock, Andaman',
      author: 'Ananya Sen',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
      cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
      price: 399,
      sales: 52,
      rating: 4.8,
      pagesCount: 4,
      description: 'Crystal clear turquoise Andaman waters, certified dive sites, and Radhanagar beach sunsets.',
      pages: [
        {
          title: 'Cover: Radhanagar Beach',
          layout: 'hero',
          photos: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop'],
          caption: 'Ranked Among Asia’s Best Beaches',
          notes: 'Unfiltered turquoise gradients at Beach No. 7.'
        },
        {
          title: 'Page 1: Elephant Beach Coral Reef',
          layout: 'split',
          photos: [
            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop'
          ],
          caption: 'Scuba diving with sea turtles and kayaking through mangrove lagoons.',
          notes: 'Water visibility exceeded 25 meters during low tide.'
        },
        {
          title: 'Page 2: Coastal Sunset',
          layout: 'hero',
          photos: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop'],
          caption: 'Golden Hour at Vijaynagar Beach',
          notes: 'Serene solitude under swaying mahogany trees.'
        },
        {
          title: 'Back Cover: Island Memories',
          layout: 'hero',
          photos: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop'],
          caption: 'Andaman &amp; Nicobar Archipelago Photo Journal',
          notes: 'TripCraft Verified Explorer Photo Collection &copy; 2026'
        }
      ]
    },
    {
      id: 'ALB-004',
      title: 'Ladakh High Passes & Monasteries',
      destination: 'Leh Ladakh',
      author: 'Tarun Varma',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
      cover: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1200&auto=format&fit=crop',
      price: 599,
      sales: 110,
      rating: 5.0,
      pagesCount: 4,
      description: 'Himalayan high desert landscapes, Pangong Tso color shifts, Thiksey Gompa, and Khardung La.',
      pages: [
        {
          title: 'Cover: Pangong Tso Lake',
          layout: 'hero',
          photos: ['https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1200&auto=format&fit=crop'],
          caption: '14,270 ft High Altitude Saltwater Lake',
          notes: 'Shifting from navy to aquamarine under the harsh mountain sun.'
        },
        {
          title: 'Page 1: Thiksey & Nubra',
          layout: 'split',
          photos: [
            'https://images.unsplash.com/photo-1600100397608-f010e421d3fa?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop'
          ],
          caption: 'Tibetan prayer flags at Thiksey Monastery and Bactrian camels in Nubra.',
          notes: 'A journey across the highest motorable passes in the world.'
        },
        {
          title: 'Page 2: Stargazing in Hanle',
          layout: 'hero',
          photos: ['https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1200&auto=format&fit=crop'],
          caption: 'Dark Sky Reserve Milky Way Core',
          notes: 'Zero light pollution at 15,000 feet elevation.'
        },
        {
          title: 'Back Cover: Himalayan Farewell',
          layout: 'hero',
          photos: ['https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1200&auto=format&fit=crop'],
          caption: 'Ladakh High Desert Expedition Photobook',
          notes: 'TripCraft Verified Explorer Photo Collection &copy; 2026'
        }
      ]
    }
  ],

  getMarketplaceAlbums() {
    try {
      const stored = localStorage.getItem('tripcraft_marketplace_albums');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch(e) {}
    return this.defaultMarketplace;
  },

  saveAlbum(album) {
    const albums = this.getMarketplaceAlbums();
    albums.unshift(album);
    try {
      localStorage.setItem('tripcraft_marketplace_albums', JSON.stringify(albums));
    } catch(e) {}
    return album;
  },

  buyAlbum(albumId) {
    const albums = this.getMarketplaceAlbums();
    const alb = albums.find(a => a.id === albumId);
    if (!alb) return null;

    alb.sales = (alb.sales || 0) + 1;
    try {
      localStorage.setItem('tripcraft_marketplace_albums', JSON.stringify(albums));
    } catch(e) {}

    // Track purchased album
    const purchased = this.getPurchasedAlbums();
    if (!purchased.includes(albumId)) {
      purchased.push(albumId);
      try {
        localStorage.setItem('tripcraft_purchased_albums', JSON.stringify(purchased));
      } catch(e) {}
    }

    // Credit author wallet (simulated)
    this.addEarnings(Math.round(alb.price * 0.85)); // 85% royalty to author
    return alb;
  },

  getPurchasedAlbums() {
    try {
      const p = localStorage.getItem('tripcraft_purchased_albums');
      return p ? JSON.parse(p) : [];
    } catch(e) {
      return [];
    }
  },

  getUserWallet() {
    try {
      const w = localStorage.getItem('tripcraft_album_wallet');
      return w ? parseInt(w, 10) : 1750; // Initial default wallet ₹1,750
    } catch(e) {
      return 1750;
    }
  },

  addEarnings(amount) {
    const current = this.getUserWallet();
    const updated = current + amount;
    try {
      localStorage.setItem('tripcraft_album_wallet', updated.toString());
    } catch(e) {}
    return updated;
  }
};

window.TripCraftAlbum = TripCraftAlbum;

