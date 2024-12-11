export const getFileTypeIcon = (type: string) => {
  switch (type) {
    case 'documents':
      return 'file-text';
    case 'audio':
      return 'headphones';
    case 'image':
      return 'image';
    case 'video':
      return 'video';
    default:
      return 'file';
  }
};

export const getFileSize = (bytes: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
};

export const getFileExtension = (filename: string): string => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};