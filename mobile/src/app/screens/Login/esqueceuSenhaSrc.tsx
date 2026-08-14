import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  Alert,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; 
import api from '../../../services/api';
import { stylesEsq } from './stylesEsq';

const { width } = Dimensions.get('window');

const EsqueceuSenhaSrc = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleRecuperar = async () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, informe seu e-mail.");
      return;
    }

    setCarregando(true);
    try {
      await api.post('/gestores/recuperar-senha', { email });
      Alert.alert("Sucesso", "Instruções enviadas para o seu e-mail.", [
        { text: "OK", onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível processar a solicitação.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={stylesEsq.container}>
      {/* Blobs conforme seu CSS (Cores: #9FE1CB, #CECBF6, #B5D4F4) */}
      <View style={[stylesEsq.blob, stylesEsq.blob1]} />
      <View style={[stylesEsq.blob, stylesEsq.blob2]} />
      <View style={[stylesEsq.blob, stylesEsq.blob3]} />

      <View style={stylesEsq.glassContainer}>
        <LinearGradient
          colors={['#1D9E75', '#0F6E56']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={stylesEsq.iconWrap}
        >
          <FontAwesome5 name="paper-plane" size={20} color="white" />
        </LinearGradient>

        <Text style={stylesEsq.title}>Recuperar Senha</Text>
        <Text style={stylesEsq.subtitle}>
          Informe seu e-mail e enviaremos as instruções de recuperação
        </Text>

        <View style={stylesEsq.inputGroup}>
          <Text style={stylesEsq.label}>E-MAIL</Text>
          <View style={stylesEsq.inputWrap}>
            <FontAwesome5 name="envelope" size={14} color="#9FE1CB" style={stylesEsq.fieldIcon} />
            <TextInput
              style={stylesEsq.input}
              placeholder="seu@email.com"
              placeholderTextColor="#A0A0A0"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <TouchableOpacity onPress={handleRecuperar} disabled={carregando}>
          <LinearGradient
            colors={['#1D9E75', '#0F6E56']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={stylesEsq.btn}
          >
            {carregando ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <FontAwesome5 name="paper-plane" size={16} color="#fff" />
                <Text style={stylesEsq.btnText}>ENVIAR NOVA SENHA</Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={stylesEsq.btnVoltar}
        >
          <Text style={stylesEsq.btnVoltarText}>← Voltar ao login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


export default EsqueceuSenhaSrc;