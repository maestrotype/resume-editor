const path = require('path');
const fs = require('fs').promises;

class FileService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.uploadsDir = path.join(process.cwd(), 'uploads');
    this.avatarsDir = path.join(this.uploadsDir, 'avatars');
  }

  // Generates avatar filename with timestamp
  generateAvatarFilename(originalFilename) {
    return `avatar-${Date.now()}${path.extname(originalFilename)}`;
  }

  // Checks if file is an image
  isImageFile(mimetype) {
    return mimetype.startsWith('image/');
  }

  // Returns absolute path for saving avatar
  getAvatarSavePath(filename) {
    return path.join(this.avatarsDir, filename);
  }

  // Returns relative path for storing in DB
  getAvatarDbPath(filename) {
    return `/api/uploads/avatars/${filename}`;
  }

  async saveFile(file) {
    try {
      const relativePath = path.relative(this.uploadsDir, file.path);
      const publicUrl = `${this.baseUrl}/uploads/${relativePath}`;
      
      return {
        path: file.path,
        relativePath,
        publicUrl
      };
    } catch (error) {
      throw new Error(`File save error: ${error.message}`);
    }
  }

  async deleteFile(relativePath) {
    try {
      const fullPath = path.join(this.uploadsDir, relativePath.replace(/^uploads\//, ''));
      await fs.unlink(fullPath);
    } catch (error) {
      throw new Error(`File deletion error: ${error.message}`);
    }
  }

  getPublicUrl(relativePath) {
    if (!relativePath) return null;
    if (relativePath.startsWith('http')) return relativePath;
    
    // Remove /api prefix if exists
    const cleanPath = relativePath.replace(/^\/api\//, '');
    return `${this.baseUrl}/${cleanPath}`;
  }
}

module.exports = new FileService(process.env.API_URL || 'http://localhost:4000'); 