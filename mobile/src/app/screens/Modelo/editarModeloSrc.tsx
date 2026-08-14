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
import { stylesEditarM } from './stylesEditarM';

const EditarModeloSrc = ({ navigation, route }: any) => {
  const { modeloId, dadosIniciais } = route.params || {};

  const [algoritmo] = useState(dadosIniciais?.algoritmo || '');
  const [dataTreinamento] = useState(dadosIniciais?.dataTreinamento || '');
  
  const [acuracia, setAcuracia] = useState(dadosIniciais?.acuracia?.toString() || '');
  const [descricao, setDescricao] = useState(dadosIniciais?.descricao || '');
  
  const [carregando, setCarregando] = useState(false);

  const handleAtualizarModelo = async () => {
    if (!acuracia || !descricao) {
      Alert.alert('Campos Necessários', 'A acurácia e a descrição técnica são obrigatórias.');
      return;
    }

    const valorAcuracia = parseFloat(acuracia.replace(',', '.'));
    if (isNaN(valorAcuracia) || valorAcuracia > 100 || valorAcuracia < 0) {
      Alert.alert('Valor Inválido', 'A acurácia deve ser um número entre 0 e 100.');
      return;
    }

    setCarregando(true);

    try {
      
      await api.put(`/modelos/${modeloId}`, {
        acuracia: valorAcuracia,
        descricao,
      });

      Alert.alert(
        'Sucesso',
        'As métricas do modelo foram atualizadas.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar as alterações no servidor.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={stylesEditarM.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={[stylesEditarM.blob, stylesEditarM.blob1]} />
      <View style={[stylesEditarM.blob, stylesEditarM.blob2]} />

      <ScrollView 
        contentContainerStyle={stylesEditarM.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={stylesEditarM.glassContainer}>
          <LinearGradient
            colors={['#1D9E75', '#0F6E56']}
            style={stylesEditarM.iconWrap}
          >
            <FontAwesome5 name="edit" size={20} color="white" />
          </LinearGradient>

          <Text style={stylesEditarM.title}>Ajustar Métricas</Text>
          <Text style={stylesEditarM.subtitle}>
            Edite a acurácia e a descrição do modelo #{modeloId}.
          </Text>

          <View style={stylesEditarM.inputGroup}>
            <Text style={stylesEditarM.label}>ALGORITMO (NÃO EDITÁVEL)</Text>
            <View style={[stylesEditarM.inputWrap, { backgroundColor: '#f0f0f0', borderColor: '#ddd' }]}>
              <FontAwesome5 name="lock" size={12} color="#bbb" style={stylesEditarM.fieldIcon} />
              <TextInput
                style={[stylesEditarM.input, { color: '#888' }]}
                value={algoritmo}
                editable={false}
              />
            </View>
          </View>

          <View style={stylesEditarM.inputGroup}>
            <Text style={stylesEditarM.label}>DATA DE ORIGEM</Text>
            <View style={[stylesEditarM.inputWrap, { backgroundColor: '#f0f0f0', borderColor: '#ddd' }]}>
              <FontAwesome5 name="calendar-alt" size={12} color="#bbb" style={stylesEditarM.fieldIcon} />
              <TextInput
                style={[stylesEditarM.input, { color: '#888' }]}
                value={dataTreinamento}
                editable={false}
              />
            </View>
          </View>

          
          <View style={stylesEditarM.inputGroup}>
            <Text style={stylesEditarM.label}>ACURÁCIA ATUAL (%)</Text>
            <View style={stylesEditarM.inputWrap}>
              <FontAwesome5 name="chart-line" size={14} color="#1D9E75" style={stylesEditarM.fieldIcon} />
              <TextInput
                style={stylesEditarM.input}
                placeholder="Ex: 98.5"
                keyboardType="decimal-pad"
                value={acuracia}
                onChangeText={setAcuracia}
              />
            </View>
          </View>

          <View style={stylesEditarM.inputGroup}>
            <Text style={stylesEditarM.label}>NOTAS TÉCNICAS</Text>
            <View style={[stylesEditarM.inputWrap, { minHeight: 100, alignItems: 'flex-start', paddingTop: 12 }]}>
              <FontAwesome5 name="align-left" size={14} color="#1D9E75" style={stylesEditarM.fieldIcon} />
              <TextInput
                style={[stylesEditarM.input, { textAlignVertical: 'top' }]}
                placeholder="Descreva as mudanças ou observações..."
                value={descricao}
                onChangeText={setDescricao}
                multiline
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={handleAtualizarModelo}
            disabled={carregando}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#1D9E75', '#0F6E56']}
              style={stylesEditarM.btn}
            >
              {carregando ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={stylesEditarM.btnText}>CONFIRMAR ALTERAÇÕES</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={stylesEditarM.btnVoltar}
          >
            <Text style={stylesEditarM.btnVoltarText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditarModeloSrc;