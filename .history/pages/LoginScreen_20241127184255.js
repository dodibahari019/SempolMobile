import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Keyboard, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Svg, { Path } from 'react-native-svg';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://192.168.1.8/SempolMobileApp/sempolAPI/login.php', { email, password });

      if (response.data.token) {
        // Simpan token ke AsyncStorage (jika diperlukan) dan navigasi ke Dashboard
        navigation.navigate('Dashboard');
      } else {
        setErrorMessage(response.data.message || "Login failed.");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {!keyboardVisible && (
        <View style={styles.logoContainer}>
          <Svg height="" viewBox="0 0 1440 320" style={styles.svg}>
            <Path fill="black" d="M0,224L48,234.7C96,245,192,267,288,240C384,213,480,139,576,122.7C672,107,768,149,864,192C960,235,1056,277,1152,282.7C1248,288,1344,256,1392,240L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
          </Svg>
          <Image source={require('../files/sempolAyam.png')} style={styles.logo} />
        </View>
      )}
      <View style={styles.body}>
        <View style={styles.loginTitleContainer}>
          <Text style={styles.loginTitle}>Login</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="envelope" size={24} color="#000" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={33} color="#000" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
            
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Icon name={passwordVisible ? "eye" : "eye-slash"} size={24} color="#000" style={styles.icon} />
          </TouchableOpacity>
        </View>

        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

        {loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.footerContainer}>
        <Svg height="" width="100%" viewBox="0 0 1440 320" style={styles.svgbuttom}>
          <Path fill="black" d="M0,64L40,80C80,96,160,128,240,133.3C320,139,400,117,480,112C560,107,640,117,720,138.7C800,160,880,192,960,186.7C1040,181,1120,139,1200,117.3C1280,96,1360,96,1400,96L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z" />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  logoContainer: {
    backgroundColor: 'black',
    padding: 80,
    alignItems: 'center',
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    position: 'relative',
  },
  svg: {
    height: 610,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  svgbuttom: {
    height: 105,
    position: 'absolute',
    top: -70,
    left: 0,
    right: 0,
    bottom: 0,
  },
  logo: {
    width: 280,
    height: 120,
    resizeMode: 'contain',
    position: 'relative',
    zIndex: 1,
  },
  body: {
    padding: 30,
  },
  loginTitleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  loginTitle: {
    position: 'absolute',
    fontSize: 60,
    fontWeight: 'bold',
    bottom: 15,
  },
  line: {
    height: 2,
    width: '41%',
    backgroundColor: 'black',
    marginTop: -23,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 16,
  },
  icon: {
    marginRight: 20,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 1,
    backgroundColor: '#fff',
    borderWidth: 0,
  },
  forgotPassword: {
    color: '#4A90E2',
    textAlign: 'right',
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: 'black',
    elevation: 6,
    padding: 15,
    alignItems: 'center',
    borderRadius: 25,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  footerContainer: {
    backgroundColor: 'black',
  },
});

export default LoginScreen;
