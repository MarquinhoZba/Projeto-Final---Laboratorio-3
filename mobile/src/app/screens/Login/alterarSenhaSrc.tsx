import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import api from '../../../services/api';
import { stylesAlt } from './stylesAlt';

const AlterarSenhaSrc = ({ navigation, route }: any) => {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleAlterar = async () => {
    if (!novaSenha || !confirmarSenha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    setCarregando(true);
    try {
      
      await api.post('/gestores/alterar-senha', { 
        novaSenha 
      });
      
      Alert.alert("Sucesso", "Senha alterada com sucesso!", [
        { text: "Fazer Login", onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível alterar a senha.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={stylesAlt.container}>
      {/* Blobs Identidade Visual SistemaPEE */}
      <View style={[stylesAlt.blob, stylesAlt.blob1]} />
      <View style={[stylesAlt.blob, stylesAlt.blob2]} />
      <View style={[stylesAlt.blob, stylesAlt.blob3]} />

      <View style={stylesAlt.glassContainer}>
        <LinearGradient
          colors={['#1D9E75', '#0F6E56']}
          style={stylesAlt.iconWrap}
        >
          <FontAwesome5 name="key" size={20} color="white" />
        </LinearGradient>

        <Text style={stylesAlt.title}>Nova Senha</Text>
        <Text style={stylesAlt.subtitle}>
          Crie uma senha forte para garantir a segurança dos dados dos alunos.
        </Text>

        <View style={stylesAlt.inputGroup}>
          <Text style={stylesAlt.label}>NOVA SENHA</Text>
          <View style={stylesAlt.inputWrap}>
            <FontAwesome5 name="lock" size={14} color="#9FE1CB" style={stylesAlt.fieldIcon} />
            <TextInput
              style={stylesAlt.input}
              placeholder="••••••••"
              secureTextEntry={!mostrarSenha}
              value={novaSenha}
              onChangeText={setNovaSenha}
            />
            <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
              <FontAwesome5 name={mostrarSenha ? "eye-slash" : "eye"} size={14} color="#3B6D50" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={stylesAlt.inputGroup}>
          <Text style={stylesAlt.label}>CONFIRMAR SENHA</Text>
          <View style={stylesAlt.inputWrap}>
            <FontAwesome5 name="check-circle" size={14} color="#9FE1CB" style={stylesAlt.fieldIcon} />
            <TextInput
              style={stylesAlt.input}
              placeholder="••••••••"
              secureTextEntry={!mostrarSenha}
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />
          </View>
        </View>

        <TouchableOpacity onPress={handleAlterar} disabled={carregando}>
          <LinearGradient
            colors={['#1D9E75', '#0F6E56']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={stylesAlt.btn}
          >
            {carregando ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={stylesAlt.btnText}>ATUALIZAR SENHA</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={stylesAlt.btnVoltar}
        >
          <Text style={stylesAlt.btnVoltarText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


export default AlterarSenhaSrc;