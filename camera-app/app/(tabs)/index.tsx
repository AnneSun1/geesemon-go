// import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { CameraView,Camera, CameraType, useCameraPermissions } from 'expo-camera';
// import { useState, useRef, useEffect } from 'react';
// import { captureScreen, captureRef } from "react-native-view-shot";

// export default function HomeScreen() {
//   const [facing, setFacing] = useState<CameraType>('back');
//   const [permission, requestPermission] = useCameraPermissions();
//   const [type, setType] = useState(Camera.Constants.Type.back);
//   const imageRef = useRef<View>(null);

//   // useEffect(() => {
//   //   (async () => {
//   //     const { status } = await Camera.requestCameraPermissionsAsync();
//   //     requestPermission(status === "granted");
//   //   })();
//   // }, []);

//   if (!permission) {
//     // Camera permissions are still loading.
//     return <View />;
//   }

//   if (!permission.granted) {
//     // Camera permissions are not granted yet.
//     return (
//       <View style={styles.container}>
//         <Text style={styles.message}>We need your permission to show the camera</Text>
//         <Button onPress={requestPermission} title="grant permission" />
//       </View>
//     );
//   }

//   function toggleCameraFacing() {
//     setFacing(current => (current === 'back' ? 'front' : 'back'));
//   }

//   const onSaveImageAsync = async () => {
//     try {
//       const localUri = await captureRef(imageRef, {
//         height: 440,
//         quality: 1,
//       });

//       if (localUri) {
//         alert('Saved!');
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   return (
//       <View style={styles.container}>
//          <View style={styles.buttonContainer}>
//             {/* <TouchableOpacity style={styles.button} onPress={onSaveImageAsync}> */}
//               <Text style={styles.text}>Take photo</Text>
//             {/* </TouchableOpacity> */}
//           </View>
//       <View ref={imageRef} collapsable={false}>
//         <CameraView style={styles.camera} facing={facing}>
//         </CameraView>
//     </View>
//   </View>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   message: {
//     textAlign: 'center',
//     paddingBottom: 10,
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: 'transparent',
//     margin: 64,
//   },
//   button: {
//     flex: 1,
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'black',
//   },
// });
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const modes = ['Document', 'Video', 'Photo', 'Portrait', 'Night'];

export default function CameraScreen() {
  const [selectedMode, setSelectedMode] = useState('Photo');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Camera Viewfinder */}
      <View style={styles.viewfinder}>
        
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
        <TouchableOpacity style={styles.thumbnailButton}>
          <View style={styles.thumbnail} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.captureButton}>
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.flipButton}>
          <View style={styles.flipButtonIcon} />
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
    borderRadius: 20,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    backgroundColor: '#444',
    borderRadius: 20,
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
});