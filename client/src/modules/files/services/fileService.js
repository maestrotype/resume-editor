const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';
const BASE_URL = API_URL.replace('/api', '');

class FileService {
    // Upload avatar and get server response
    async uploadAvatar(file) {
        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const response = await fetch(`${API_URL}/upload/avatar`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Avatar upload failed');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Avatar upload error:', error);
            throw error;
        }
    }

    // Get public URL for avatar
    getAvatarUrl(avatarPath) {
        if (!avatarPath) return null;
        
        // If it's already a full URL or base64, return as is
        if (avatarPath.startsWith('http') || avatarPath.startsWith('data:')) {
            return avatarPath;
        }

        // If path starts with /api, remove it as BASE_URL already has the correct prefix
        const cleanPath = avatarPath.replace(/^\/api/, '');
        return `${BASE_URL}${cleanPath}`;
    }

    // Convert file to base64 for preview
    async fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
}

export default new FileService(); 