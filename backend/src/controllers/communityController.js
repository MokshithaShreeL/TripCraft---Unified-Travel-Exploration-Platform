const pool = require('../config/database');

exports.getPosts = async (req, res) => {
  try {
    const { postType, destination } = req.query;
    let sql = 'SELECT * FROM community_posts WHERE 1=1';
    const params = [];

    if (postType && postType !== 'all') {
      sql += ' AND post_type = ?';
      params.push(postType);
    }
    if (destination && destination !== 'All') {
      sql += ' AND destination = ?';
      params.push(destination);
    }

    sql += ' ORDER BY created_at DESC';
    const [rows] = await pool.query(sql, params);
    return res.json({ success: true, count: rows.length, posts: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch community posts' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content, postType, destination } = req.body;
    const id = 'post_' + Date.now();

    await pool.query(`
      INSERT INTO community_posts (id, user_id, author_name, author_avatar, post_type, destination, title, content, likes_count, comments_count, is_trending, verified_traveller)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, 0, false, true)
    `, [id, req.user.id, req.user.name, req.user.avatar || null, postType || 'tip', destination || 'General', title, content]);

    return res.status(201).json({ success: true, message: 'Post shared successfully', postId: id });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to create post' });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('UPDATE community_posts SET likes_count = likes_count + 1 WHERE id = ?', [id]);
    return res.json({ success: true, message: 'Post liked' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to like post' });
  }
};
