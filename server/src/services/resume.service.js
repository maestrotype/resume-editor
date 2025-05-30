const Resume = require('../../models/resume.model');
const { NotFoundError, FileUploadError } = require('../utils/errors');

class ResumeService {
    constructor(fileService) {
        this.fileService = fileService;
    }

    async createResume(data, file) {
        try {
            let fileData = null;
            if (file) {
                fileData = await this.fileService.saveFile(file);
            }

            const newResume = new Resume({
                ...data,
                filePath: fileData?.relativePath
            });

            await newResume.save();
            return {
                ...newResume.toObject(),
                fileUrl: fileData?.publicUrl
            };
        } catch (error) {
            throw new FileUploadError(`Resume creation failed: ${error.message}`);
        }
    }

    async updateResume(id, data, file) {
        try {
            const resume = await Resume.findById(id);
            if (!resume) {
                throw new NotFoundError('Resume');
            }

            let fileData = null;
            if (file) {
                // Delete old file if exists
                if (resume.filePath) {
                    await this.fileService.deleteFile(resume.filePath);
                }
                fileData = await this.fileService.saveFile(file);
            }

            const updatedResume = await Resume.findByIdAndUpdate(
                id,
                { 
                    ...data,
                    ...(fileData && { filePath: fileData.relativePath })
                },
                { new: true }
            );

            return {
                ...updatedResume.toObject(),
                fileUrl: fileData ? fileData.publicUrl : this.fileService.getPublicUrl(updatedResume.filePath)
            };
        } catch (error) {
            if (error instanceof NotFoundError) throw error;
            throw new FileUploadError(`Resume update failed: ${error.message}`);
        }
    }

    async deleteResume(id) {
        try {
            const resume = await Resume.findById(id);
            if (!resume) {
                throw new NotFoundError('Resume');
            }

            if (resume.filePath) {
                await this.fileService.deleteFile(resume.filePath);
            }

            await Resume.findByIdAndDelete(id);
        } catch (error) {
            if (error instanceof NotFoundError) throw error;
            throw new Error(`Resume deletion failed: ${error.message}`);
        }
    }

    async getResume(id) {
        try {
            const resume = await Resume.findById(id);
            if (!resume) {
                throw new NotFoundError('Resume');
            }

            return {
                ...resume.toObject(),
                fileUrl: this.fileService.getPublicUrl(resume.filePath)
            };
        } catch (error) {
            if (error instanceof NotFoundError) throw error;
            throw new Error(`Resume fetch failed: ${error.message}`);
        }
    }

    async getAllResumes() {
        try {
            const resumes = await Resume.find().sort({ createdAt: -1 });
            return resumes.map(resume => ({
                ...resume.toObject(),
                fileUrl: this.fileService.getPublicUrl(resume.filePath)
            }));
        } catch (error) {
            throw new Error(`Resumes fetch failed: ${error.message}`);
        }
    }
}

module.exports = ResumeService; 