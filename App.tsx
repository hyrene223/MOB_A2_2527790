
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import type { Portfolio } from './src/types/Portfolio';
import {
  defaultPortfolio,
  loadPortfolio,
  savePortfolio,
} from './src/storage/portfolioStorage';
import { persistProfilePhoto } from './src/storage/profilePhotoStorage';

export default function App() {
  const [portfolio, setPortfolio] =
    useState<Portfolio>(defaultPortfolio);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [saving, setSaving] = useState(false);
  const [photoBusy, setPhotoBusy] = useState(false);

  useEffect(() => {
    async function initialize() {
      try {
        const saved = await loadPortfolio();
        setPortfolio(saved);
      } catch {
        Alert.alert('Loading problem', 'Your default profile will be shown.');
      } finally {
        setLoading(false);
      }
    }

    initialize();
  }, []);

  function updateField<K extends keyof Portfolio>(
    field: K,
    value: Portfolio[K]
  ) {
    setPortfolio((current) => ({ ...current, [field]: value }));
  }

  async function choosePhoto(source: 'camera' | 'gallery') {
    if (photoBusy) return;

    setPhotoBusy(true);

    try {
      let result: ImagePicker.ImagePickerResult;

      if (source === 'camera') {
        const permission =
          await ImagePicker.requestCameraPermissionsAsync();

        if (!permission.granted) {
          Alert.alert(
            'Camera permission needed',
            'Allow camera access in order to take your profile photo.'
          );
          return;
        }

        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      } else {
        const permission =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
          Alert.alert(
            'Gallery permission needed',
            'Allow photo access in order to select a profile picture.'
          );
          return;
        }

        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      }

      if (result.canceled || !result.assets?.[0]?.uri) return;

      const savedPhoto = await persistProfilePhoto(result.assets[0].uri);
      const updatedPortfolio = {
        ...portfolio,
        profileImage: savedPhoto,
      };

      await savePortfolio(updatedPortfolio);
      setPortfolio(updatedPortfolio);

      Alert.alert(
        'Photo saved',
        'Your profile photo has been saved on this device.'
      );
    } catch (error) {
      console.error('Profile photo error:', error);
      Alert.alert(
        'Photo problem',
        'The photo could not be saved. Please try again.'
      );
    } finally {
      setPhotoBusy(false);
    }
  }

  function addSkill() {
    const skill = newSkill.trim();

    if (!skill) {
      Alert.alert('Missing skill', 'Please enter a skill.');
      return;
    }

    if (
      portfolio.skills.some(
        (item) => item.toLowerCase() === skill.toLowerCase()
      )
    ) {
      Alert.alert('Already added', 'That skill is already listed.');
      return;
    }

    updateField('skills', [...portfolio.skills, skill]);
    setNewSkill('');
  }

  function removeSkill(skill: string) {
    updateField(
      'skills',
      portfolio.skills.filter((item) => item !== skill)
    );
  }

  async function handleSave() {
    if (
      !portfolio.fullName.trim() ||
      !portfolio.nickname.trim() ||
      !portfolio.introduction.trim() ||
      !portfolio.education.trim()
    ) {
      Alert.alert(
        'Required information',
        'Complete your name, nickname, introduction, and education.'
      );
      return;
    }

    if (portfolio.skills.length < 5) {
      Alert.alert(
        'Add more skills',
        'Please add at least five genuine skills before saving.'
      );
      return;
    }

    setSaving(true);

    try {
      const updatedPortfolio = {
        ...portfolio,
        fullName: portfolio.fullName.trim(),
        nickname: portfolio.nickname.trim(),
        introduction: portfolio.introduction.trim(),
        education: portfolio.education.trim(),
        skills: portfolio.skills.map((skill) => skill.trim()),
      };

      await savePortfolio(updatedPortfolio);
      setPortfolio(updatedPortfolio);
      setEditing(false);

      Alert.alert('Saved', 'Your portfolio has been saved on this device.');
    } catch {
      Alert.alert('Save failed', 'Please try saving your portfolio again.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#008080" />
        <Text style={styles.description}>Loading your portfolio...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            {portfolio.profileImage ? (
              <Image
                source={{ uri: portfolio.profileImage }}
                style={styles.avatarImage}
              />
            ) : (
              <Text style={styles.avatarText}>
                {portfolio.fullName
                  .split(' ')
                  .filter(Boolean)
                  .map((part) => part[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </Text>
            )}
          </View>

          <Text style={styles.greeting}>WELCOME TO MY PORTFOLIO</Text>
          <Text style={styles.name}>{portfolio.fullName}</Text>
          <Text style={styles.nickname}>{portfolio.nickname}</Text>
          <Text style={styles.intro}>{portfolio.introduction}</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>Software Engineering Student</Text>
          </View>

          <View style={styles.photoActions}>
            <TouchableOpacity
              style={styles.photoButton}
              onPress={() => choosePhoto('gallery')}
              disabled={photoBusy}
            >
              <Text style={styles.photoButtonText}>
                {photoBusy ? 'Please wait...' : 'Choose from Gallery'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.photoButton}
              onPress={() => choosePhoto('camera')}
              disabled={photoBusy}
            >
              <Text style={styles.photoButtonText}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setEditing((current) => !current)}
        >
          <Text style={styles.editButtonText}>
            {editing ? 'Close Editor' : 'Edit My Portfolio'}
          </Text>
        </TouchableOpacity>

        {editing && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Edit Profile</Text>

            <Text style={styles.label}>Full name *</Text>
            <TextInput
              style={styles.input}
              value={portfolio.fullName}
              onChangeText={(value) => updateField('fullName', value)}
              placeholder="Enter your full name"
            />

            <Text style={styles.label}>Nickname *</Text>
            <TextInput
              style={styles.input}
              value={portfolio.nickname}
              onChangeText={(value) => updateField('nickname', value)}
              placeholder="Enter your nickname"
            />

            <Text style={styles.label}>Introduction *</Text>
            <TextInput
              style={[styles.input, styles.multiline]}
              value={portfolio.introduction}
              onChangeText={(value) => updateField('introduction', value)}
              multiline
              placeholder="Introduce yourself"
            />

            <Text style={styles.label}>Education *</Text>
            <TextInput
              style={styles.input}
              value={portfolio.education}
              onChangeText={(value) => updateField('education', value)}
              placeholder="Enter your education"
            />

            <Text style={styles.label}>Add a genuine skill</Text>
            <TextInput
              style={styles.input}
              value={newSkill}
              onChangeText={setNewSkill}
              placeholder="Enter a skill"
              onSubmitEditing={addSkill}
              returnKeyType="done"
            />

            <TouchableOpacity style={styles.secondaryButton} onPress={addSkill}>
              <Text style={styles.secondaryButtonText}>Add Skill</Text>
            </TouchableOpacity>

            <Text style={styles.note}>
              Listed skills: {portfolio.skills.length}. At least five are
              required.
            </Text>

            {portfolio.skills.map((skill) => (
              <View key={skill} style={styles.skillRow}>
                <Text style={styles.skillRowText}>{skill}</Text>
                <TouchableOpacity onPress={() => removeSkill(skill)}>
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              style={[styles.saveButton, saving && styles.disabledButton]}
              onPress={handleSave}
              disabled={saving}
            >
              <Text style={styles.saveButtonText}>
                {saving ? 'Saving...' : 'Save Changes'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>About Me</Text>
          <Text style={styles.description}>{portfolio.introduction}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>My Education</Text>
          <Text style={styles.itemTitle}>{portfolio.education}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>My Skills</Text>
          {portfolio.skills.map((skill) => (
            <View key={skill} style={styles.skill}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>

       
<View style={styles.card}>
  <Text style={styles.cardTitle}>My Projects</Text>

  <View style={styles.projectCard}>
    <Text style={styles.itemTitle}>1. Musanze Safe Market</Text>
    <Text style={styles.projectTech}>
      React Native • Expo • TypeScript
    </Text>
    <Text style={styles.description}>
      A mobile application designed to support market inspections
      and the recording of inspection information.
    </Text>
    <Text style={styles.featureTitle}>Key features</Text>
    <Text style={styles.description}>
      • Create new inspection records{"\n"}
      • Record vendor and stall information{"\n"}
      • Capture photographic evidence{"\n"}
      • View saved inspection records
    </Text>
  </View>

  <View style={styles.projectCard}>
    <Text style={styles.itemTitle}>2. School Management System</Text>
    <Text style={styles.projectTech}>
      Java • Swing • JDBC • MySQL
    </Text>
    <Text style={styles.description}>
      A desktop application developed to help manage student
      information and academic records through a graphical interface.
    </Text>
    <Text style={styles.featureTitle}>Key features</Text>
    <Text style={styles.description}>
      • User login and registration{"\n"}
      • Student record management{"\n"}
      • Marks entry and grade calculation{"\n"}
      • Student results and reports
    </Text>
  </View>
</View>

        <Text style={styles.footer}>HYRENE • PERSONAL PORTFOLIO</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F7F7' },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  content: { padding: 20, paddingBottom: 35 },
  header: {
    alignItems: 'center',
    backgroundColor: '#008080',
    paddingVertical: 32,
    paddingHorizontal: 18,
    borderRadius: 22,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    overflow: 'hidden',
  },
  avatarImage: { width: '100%', height: '100%' },
  avatarText: { color: '#008080', fontSize: 30, fontWeight: 'bold' },
  greeting: {
    color: '#D9FFFF',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 10,
    textAlign: 'center',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 29,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nickname: {
    color: '#D9FFFF',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginTop: 5,
  },
  intro: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 14,
    textAlign: 'center',
  },
  badge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginTop: 18,
  },
  badgeText: { color: '#008080', fontWeight: 'bold', fontSize: 12 },
  photoActions: { width: '100%', gap: 10, marginTop: 18 },
  photoButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  photoButtonText: { color: '#006666', fontWeight: 'bold' },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E1EBEB',
  },
  cardTitle: {
    color: '#008080',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  itemTitle: {
    color: '#243838',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  description: { color: '#607070', fontSize: 14, lineHeight: 22 },
  skill: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0F2F1',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 9,
    marginBottom: 8,
  },
  skillText: { color: '#006666', fontWeight: 'bold' },
  note: { color: '#778888', fontSize: 12, lineHeight: 18, marginVertical: 10 },
  editButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#008080',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 18,
  },
  editButtonText: { color: '#008080', fontWeight: 'bold', fontSize: 15 },
  label: {
    color: '#243838',
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D5E1E1',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    color: '#243838',
    fontSize: 14,
  },
  multiline: { minHeight: 80, textAlignVertical: 'top' },
  secondaryButton: {
    backgroundColor: '#E0F2F1',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  secondaryButtonText: { color: '#006666', fontWeight: 'bold' },
  skillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F7F7',
    padding: 12,
    borderRadius: 10,
    marginTop: 7,
  },
  skillRowText: { color: '#243838', flex: 1 },
  removeText: { color: '#B42318', fontWeight: 'bold', marginLeft: 10 },
  saveButton: {
    backgroundColor: '#008080',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: { opacity: 0.6 },
  saveButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 15 },
  footer: {
    color: '#008080',
    textAlign: 'center',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 8,
  },
});