import { useState, useEffect } from 'react';
import api from '../utils/api';

export function useRecent() {
  const [recentItems, setRecentItems] = useState([]);

  useEffect(() => {
    async function loadRecent() {
      const res = await api.get('/recent');
      if (res && res.success && res.recent) {
        setRecentItems(res.recent);
      } else {
        try {
          const local = localStorage.getItem('tripcraft_recent');
          if (local) setRecentItems(JSON.parse(local));
        } catch {}
      }
    }
    loadRecent();
  }, []);

  const addRecent = async (item) => {
    if (!item) return;
    const newItem = {
      itemType: item.type || 'destination',
      itemId: item.id,
      itemTitle: item.name || item.title,
      itemImage: item.image || item.heroImage || item.hero_image,
      accessed_at: new Date().toISOString()
    };

    setRecentItems((prev) => {
      const filtered = prev.filter((p) => p.itemId !== newItem.itemId);
      const updated = [newItem, ...filtered].slice(0, 5);
      localStorage.setItem('tripcraft_recent', JSON.stringify(updated));
      return updated;
    });

    api.post('/recent', newItem).catch(() => {});
  };

  return { recentItems, addRecent };
}

export default useRecent;
