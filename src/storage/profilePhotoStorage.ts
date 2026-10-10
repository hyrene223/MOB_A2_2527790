
import * as FileSystem from 'expo-file-system/legacy';

export async function persistProfilePhoto(
  sourceUri: string
): Promise<string> {
  const directory = FileSystem.documentDirectory;

  if (!directory) {
    throw new Error('The app document directory is unavailable.');
  }

  const photoDirectory = `${directory}profile-photos/`;

  await FileSystem.makeDirectoryAsync(photoDirectory, {
    intermediates: true,
  });

  const extensionMatch = sourceUri.match(/\.(jpg|jpeg|png|webp)(?:\?.*)?$/i);
  const extension = extensionMatch
    ? extensionMatch[1].toLowerCase()
    : 'jpg';

  const destination = `${photoDirectory}profile-${Date.now()}.${extension}`;

  await FileSystem.copyAsync({
    from: sourceUri,
    to: destination,
  });

  return destination;
}
