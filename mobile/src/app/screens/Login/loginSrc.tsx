import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from 'mobile/../../App';
import api from '../../../services/api';
import { stylesLog } from './stylesLog';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginSrc = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    setCarregando(true);
    try {
      const response = await api.post('/gestor/login', { email, senha });

      if (response.data) {
        
        const nomeGestor = response.data.nomeGestor || '';
        const idGestor   = response.data.idGestor?.toString() || '';

        if (nomeGestor) await AsyncStorage.setItem('nomeGestor', nomeGestor);
        if (idGestor)   await AsyncStorage.setItem('idGestor', idGestor);

        navigation.replace('Dashboard');
      }
    } catch (error: any) {
      const msg = error.response?.data?.mensagem || 'E-mail ou senha inválidos';
      Alert.alert('Falha no Login', msg);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={stylesLog.container}>
      <View style={[stylesLog.blob, stylesLog.blob1]} />
      <View style={[stylesLog.blob, stylesLog.blob2]} />
      <View style={[stylesLog.blob, stylesLog.blob3]} />

      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={stylesLog.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={stylesLog.card}>
            <LinearGradient colors={['#1D9E75', '#0F6E56']} style={stylesLog.iconWrap}>
              <FontAwesome5 name="chart-line" size={24} color="white" />
            </LinearGradient>

            <Text style={stylesLog.title}>SistemaPEE</Text>
            <Text style={stylesLog.subtitle}>Faça login para continuar</Text>

            <View style={stylesLog.inputGroup}>
              <Text style={stylesLog.label}>E-MAIL</Text>
              <View style={stylesLog.inputWrap}>
                <FontAwesome5 name="envelope" size={14} color="#9FE1CB" style={stylesLog.fieldIcon} />
                <TextInput
                  style={stylesLog.input}
                  placeholder="seu@email.com"
                  placeholderTextColor="#A0A0A0"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                />
              </View>
            </View>

            <View style={stylesLog.inputGroup}>
              <Text style={stylesLog.label}>SENHA</Text>
              <View style={stylesLog.inputWrap}>
                <FontAwesome5 name="lock" size={14} color="#9FE1CB" style={stylesLog.fieldIcon} />
                <TextInput
                  style={stylesLog.input}
                  placeholder="••••••••"
                  placeholderTextColor="#A0A0A0"
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry={!mostrarSenha}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />
                <TouchableOpacity
                  style={stylesLog.eyeBtn}
                  onPress={() => setMostrarSenha(!mostrarSenha)}
                >
                  <FontAwesome5
                    name={mostrarSenha ? 'eye-slash' : 'eye'}
                    size={16}
                    color="#9FE1CB"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={stylesLog.esqueceu}
              onPress={() => navigation.navigate('EsqueceuSenha')}
            >
              <Text style={stylesLog.esqueceuText}>Esqueceu a senha?</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={handleLogin} disabled={carregando}>
              <LinearGradient colors={['#1D9E75', '#0F6E56']} style={stylesLog.btn}>
                <Text style={stylesLog.btnText}>
                  {carregando ? 'CARREGANDO...' : 'ENTRAR'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginSrc;