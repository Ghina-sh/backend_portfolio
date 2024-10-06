import {
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';

// Pipe for images (1MB max)
export const parseImageFilePipe = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 1000000 }), // 1MB max for images
    new FileTypeValidator({ fileType: 'image/*' }), // Accept only images
  ],
  fileIsRequired: false,
});

// Pipe for files (2MB max)
export const parseDocumentFilePipe = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 2000000 }), // 2MB max for documents
    new FileTypeValidator({ fileType: 'application/pdf' }), // Accept only PDFs
  ],
  fileIsRequired: false,
});
