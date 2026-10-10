const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../models/prismaClient');
const { JWT_SECRET } = require('../middleware/auth');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() }
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid password. Please check your credentials.' });
    }

    // Touch updated_at
    await prisma.user.update({
      where: { id: user.id },
      data: { updated_at: new Date() }
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role, language: user.language },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        language: user.language,
        phone: user.phone
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, language } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required' });
    }

    const existing = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() }
    });

    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = 'usr_' + Date.now();

    const newUser = await prisma.user.create({
      data: {
        id: userId,
        name,
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        role: 'user',
        language: language || 'en',
        phone: phone || null,
        is_active: true
      }
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role, language: newUser.language },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        language: newUser.language,
        phone: newUser.phone
      }
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ success: false, message: 'Registration failed', error: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        language: true,
        phone: true,
        travel_style: true,
        allow_discovery: true,
        bio: true,
        created_at: true
      }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch user', error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, language, avatar, travelStyle, allowDiscovery, bio } = req.body;

    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(name && { name }),
        ...(phone !== undefined && { phone }),
        ...(language && { language }),
        ...(avatar !== undefined && { avatar }),
        ...(travelStyle && { travel_style: travelStyle }),
        ...(allowDiscovery !== undefined && { allow_discovery: allowDiscovery }),
        ...(bio !== undefined && { bio })
      }
    });

    return res.json({ success: true, message: 'Profile updated successfully', user: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Update failed', error: err.message });
  }
};
