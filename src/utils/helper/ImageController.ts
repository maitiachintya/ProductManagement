import { Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

// Define the callback type for image responses
type ImageCallback = {
  uri: string;
  path: {
    name: string;
    type: string;
    uri: string;
  } | null;
};

// Define the input props type for the camera function
type ImagePickerProps = {
  isCrop?: boolean;
  callback: (res: ImageCallback) => void;
  size?: {
    width?: number;
    height?: number;
  };
  cropperCircleOverlay?: boolean;
};

type PickerImage = {
  path: string;
  mime: string;
};

// Utility function to format the image object
const formatImage = (image: PickerImage): ImageCallback['path'] => {
  const { path, mime } = image;

  const fileName = path.split('/').pop() || 'unknown';
  return {
    name: fileName,
    type: mime,
    uri: Platform.OS === 'android' ? path : path.replace('file://', ''),
  };
};

// Function to pick an image from the gallery
export const getImageFromGallery = async ({
  isCrop = false,
  callback,
  size = { width: 400, height: 400 },
  cropperCircleOverlay = false,
}: ImagePickerProps): Promise<void> => {
  try {
    const image = await ImagePicker.openPicker({
      width: size.width,
      height: size.height,
      cropping: isCrop,
      mediaType: 'photo',
      cropperCircleOverlay: cropperCircleOverlay,
    });

    callback({
      uri: image.path,
      path: formatImage(image),
    });
  } catch (error) {
    console.error('Gallery Error:', error);
    callback({
      uri: '',
      path: null,
    });
  }
};

// Function to capture an image using the camera
export const getImageFromCamera = async ({
  isCrop = false,
  callback,
  size = { width: 400, height: 400 },
  cropperCircleOverlay = false,
}: ImagePickerProps): Promise<void> => {
  try {
    const image = await ImagePicker.openCamera({
      width: size.width,
      height: size.height,
      cropping: isCrop,
      mediaType: 'photo',
      cropperCircleOverlay: cropperCircleOverlay,
    });

    callback({
      uri: image.path,
      path: formatImage(image),
    });
  } catch (error) {
    console.log('Camera Error:', error);
    callback({
      uri: '',
      path: null,
    });
  }
};
