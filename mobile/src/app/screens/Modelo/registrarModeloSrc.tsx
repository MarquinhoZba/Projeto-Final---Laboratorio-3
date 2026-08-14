import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import api from '../../../services/api';
import { stylesRegM } from './stylesRegM';

const RegistrarModeloSrc = ({ navigation }: any) => {
  const [algoritmo, setAlgoritmo] = useState('');
  const [dataTreinamento, setDataTreinamento] = useState(new Date().toISOString().split('T')[0]); // Inicia com a data de hoje
  const [acuracia, setAcuracia] = useState('');
  const [descricao, setDescricao] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSalvarModelo = async () => {
    
    if (!algoritmo || !dataTreinamento || !acuracia || !descricao) {
      Alert.alert('Campos Obrigatórios', 'Por favor, descreva todos os parâmetros do modelo técnico.');
      return;
    }

    const valorAcuracia = parseFloat(acuracia.replace(',', '.'));
    if (valorAcuracia > 100 || valorAcuracia < 0) {
      Alert.alert('Erro de Dados', 'A acurácia deve estar entre 0 e 100%.');
      return;
    }

    setCarregando(true);

    try {
      
      await api.post('/modelos', {
        algoritmo,
        dataTreinamento,
        acuracia: valorAcuracia,
        descricao,
      });

      Alert.alert(
        'Inteligência Atualizada',
        'O novo modelo foi registrado e já pode ser utilizado para predições.',
        [{ text: 'Entendido', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Falha na Conexão', 'Não foi possível registrar o modelo no servidor.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={stylesRegM.container}>
      <StatusBar barStyle="dark-content" />

      <View style={[stylesRegM.blob, stylesRegM.blob1]} />
      <View style={[stylesRegM.blob, stylesRegM.blob2]} />

      <ScrollView
        contentContainerStyle={stylesRegM.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={stylesRegM.glassContainer}>
          <LinearGradient
            colors={['#1D9E75', '#0F6E56']}
            style={stylesRegM.iconWrap}
          >
            <FontAwesome5 name="microchip" size={22} color="#fff" />
          </LinearGradient>

          <Text style={stylesRegM.title}>Novo Algoritmo</Text>
          <Text style={stylesRegM.subtitle}>
            Insira os metadados do modelo de Machine Learning treinado.
          </Text>

          <View style={stylesRegM.inputGroup}>
            <Text style={stylesRegM.label}>NOME DO ALGORITMO</Text>
            <View style={stylesRegM.inputWrap}>
              <FontAwesome5 name="robot" size={14} color="#1D9E75" style={stylesRegM.fieldIcon} />
              <TextInput
                style={stylesRegM.input}
                placeholder="Ex: XGBoost / Random Forest"
                placeholderTextColor="#999"
                value={algoritmo}
                onChangeText={setAlgoritmo}
              />
            </View>
          </View>

          <View style={stylesRegM.inputGroup}>
            <Text style={stylesRegM.label}>DATA DO TREINAMENTO (AAAA-MM-DD)</Text>
            <View style={stylesRegM.inputWrap}>
              <FontAwesome5 name="calendar-check" size={14} color="#1D9E75" style={stylesRegM.fieldIcon} />
              <TextInput
                style={stylesRegM.input}
                placeholder="Ex: 2026-05-11"
                placeholderTextColor="#999"
                value={dataTreinamento}
                onChangeText={setDataTreinamento}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={stylesRegM.inputGroup}>
            <Text style={stylesRegM.label}>ACURÁCIA OBTIDA (%)</Text>
            <View style={stylesRegM.inputWrap}>
              <FontAwesome5 name="percentage" size={14} color="#1D9E75" style={stylesRegM.fieldIcon} />
              <TextInput
                style={stylesRegM.input}
                placeholder="Ex: 94.5"
                placeholderTextColor="#999"
                keyboardType="decimal-pad"
                value={acuracia}
                onChangeText={setAcuracia}
              />
            </View>
          </View>

          
          <View style={stylesRegM.inputGroup}>
            <Text style={stylesRegM.label}>DETALHES TÉCNICOS</Text>
            <View style={stylesRegM.inputWrap}>
              <FontAwesome5 name="align-left" size={14} color="#1D9E75" style={stylesRegM.fieldIcon} />
              <TextInput
                style={[stylesRegM.input, stylesRegM.textArea]}
                placeholder="Descreva as variáveis principais ou o dataset utilizado..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                value={descricao}
                onChangeText={setDescricao}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSalvarModelo}
            disabled={carregando}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#1D9E75', '#0F6E56']}
              style={stylesRegM.btn}
            >
              {carregando ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <FontAwesome5 name="save" size={16} color="#fff" style={{ marginRight: 10 }} />
                  <Text style={stylesRegM.btnText}>SALVAR CONFIGURAÇÕES</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesRegM.btnVoltar}
            onPress={() => navigation.goBack()}
          >
            <Text style={stylesRegM.btnVoltarText}>Descartar Alterações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrarModeloSrc;