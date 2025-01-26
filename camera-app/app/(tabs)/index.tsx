import { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Button
} from 'react-native';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
const modes = ['Document', 'Video', 'Photo', 'Portrait', 'Night'];
import PhotoPreviewSection from '@/components/PhotoPreviewSection';
import { AntDesign } from '@expo/vector-icons';

export default function CameraScreen() {
  const [selectedMode, setSelectedMode] = useState('Photo');
 const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<any>(null);
  const cameraRef = useRef<CameraView | null>(null);
  
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleTakePhoto =  async () => {
    if (cameraRef.current) {
        const options = {
            quality: 1,
            base64: true,
            exif: false,
        };
        const takedPhoto = await cameraRef.current.takePictureAsync(options);

        setPhoto(takedPhoto);
    }
  }; 

  const handleRetakePhoto = () => setPhoto(null);

  if (photo) return <PhotoPreviewSection photo={photo} handleRetakePhoto={handleRetakePhoto} />

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Camera Viewfinder */}
      <View style={styles.viewfinder}>
      <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <AntDesign name='retweet' size={44} color='black' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <AntDesign name='camera' size={44} color='black' />
          </TouchableOpacity>
        </View> */}
      </CameraView>
    </View>
        <View style={styles.focusFrame}>
          <View style={[styles.frameLine, styles.frameLineTop]} />
          <View style={[styles.frameLine, styles.frameLineRight]} />
          <View style={[styles.frameLine, styles.frameLineBottom]} />
          <View style={[styles.frameLine, styles.frameLineLeft]} />
        </View>
      </View>

      {/* Mode Selector */}
      <View style={styles.modeSelector}>
        {modes.map((mode) => (
          <TouchableOpacity
            key={mode}
            onPress={() => setSelectedMode(mode)}
            style={styles.modeButton}
          >
            <Text
              style={[
                styles.modeText,
                selectedMode === mode && styles.selectedModeText,
              ]}
            >
              {mode}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Controls */}
      <View style={styles.controls}>
        
        <TouchableOpacity style={styles.flipButton}>
          <View style={styles.thumbnailButton} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.captureButton} onPress={handleTakePhoto}>
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.thumbnailButton} onPress={toggleCameraFacing}>
        <AntDesign name='retweet' size={44} color='white' />
        </TouchableOpacity>
      
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  viewfinder: {
    flex: 1,
    position: 'relative',
  },
  preview: {
    flex: 1,
  },
  focusFrame: {
    position: 'absolute',
    top: '40%',
    left: '25%',
    width: '50%',
    height: '20%',
  },
  frameLine: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  frameLineTop: {
    top: 0,
    left: 0,
    width: 20,
    height: 2,
  },
  frameLineRight: {
    top: 0,
    right: 0,
    width: 2,
    height: 20,
  },
  frameLineBottom: {
    bottom: 0,
    right: 0,
    width: 20,
    height: 2,
  },
  frameLineLeft: {
    bottom: 0,
    left: 0,
    width: 2,
    height: 20,
  },
  modeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modeButton: {
    padding: 8,
  },
  modeText: {
    color: '#666',
    fontSize: 14,
  },
  selectedModeText: {
    color: '#FFD700',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  thumbnailButton: {
    width: 40,
    height: 40,
    // borderRadius: 20,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    backgroundColor: '#444',
    // borderRadius: 20,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: '#FFF',
    padding: 3,
  },
  captureButtonInner: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 35,
  },
  flipButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipButtonIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

