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
  KeyboardAvoidingView,
  Platform
} from 'react-native';

import api from '../../../services/api';
import { stylesRigD } from './stylesRigD';

const RegistrarDesemSrc = ({ navigation, route }: any) => {
  const { alunoId, nomeAluno } = route.params || {};

  const [mediaNotas, setMediaNotas] = useState('');
  const [frequencias, setFrequencias] = useState('');
  const [qtdReprovacao, setQtdReprovacao] = useState('');
  const [participacaoAtvd, setParticipacaoAtvd] = useState('');
  const [anoSemestre, setAnoSemestre] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSalvar = async () => {
    // Validação básica
    if (!mediaNotas || !frequencias || !qtdReprovacao || !participacaoAtvd || !anoSemestre) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os dados acadêmicos.');
      return;
    }

    setCarregando(true);

    try {
  
      await api.post('/desempenho', {
        tbIdAluno: alunoId,
        mediaNotas: parseFloat(mediaNotas.replace(',', '.')),
        frequencias: parseFloat(frequencias.replace(',', '.')),
        qtdReprovacao: parseInt(qtdReprovacao),
        participacaoAtvd: parseInt(participacaoAtvd), // Mantido como INT conforme seu novo padrão
        anoSemestre
      });

      Alert.alert(
        'Sucesso',
        `Dados de ${nomeAluno} registrados!`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );

    } catch (error) {
      console.log("Erro ao salvar desempenho:", error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={stylesRigD.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={stylesRigD.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={stylesRigD.formContainer}>
            <Text style={stylesRigD.title}>Lançar Desempenho</Text>
            <Text style={stylesRigD.subtitle}>Histórico Acadêmico</Text>

            <View style={stylesRigD.formGroup}>
              <Text style={stylesRigD.label}>Aluno Selecionado</Text>
              <TextInput
                style={[stylesRigD.input, { backgroundColor: '#f0f0f0', color: '#666' }]}
                value={nomeAluno}
                editable={false}
              />
            </View>

            <View style={stylesRigD.formGroup}>
              <Text style={stylesRigD.label}>Média Final</Text>
              <TextInput
                style={stylesRigD.input}
                placeholder="Ex: 8.5"
                keyboardType="decimal-pad"
                value={mediaNotas}
                onChangeText={setMediaNotas}
              />
            </View>

            <View style={stylesRigD.formGroup}>
              <Text style={stylesRigD.label}>Frequência (%)</Text>
              <TextInput
                style={stylesRigD.input}
                placeholder="Ex: 95"
                keyboardType="numeric"
                value={frequencias}
                onChangeText={setFrequencias}
              />
            </View>

            <View style={stylesRigD.formGroup}>
              <Text style={stylesRigD.label}>Quantidade de Reprovações</Text>
              <TextInput
                style={stylesRigD.input}
                placeholder="0"
                keyboardType="numeric"
                value={qtdReprovacao}
                onChangeText={setQtdReprovacao}
              />
            </View>

            <View style={stylesRigD.formGroup}>
              <Text style={stylesRigD.label}>Nível de Participação (1 a 5)</Text>
              <TextInput
                style={stylesRigD.input}
                placeholder="5"
                keyboardType="numeric"
                value={participacaoAtvd}
                onChangeText={setParticipacaoAtvd}
                maxLength={1}
              />
            </View>

            <View style={stylesRigD.formGroup}>
              <Text style={stylesRigD.label}>Ano e Semestre</Text>
              <TextInput
                style={stylesRigD.input}
                placeholder="Ex: 2026.1"
                value={anoSemestre}
                onChangeText={setAnoSemestre}
                autoCapitalize="characters"
              />
            </View>

            <View style={stylesRigD.btnArea}>
              <TouchableOpacity
                style={stylesRigD.btnSalvar}
                onPress={handleSalvar}
                disabled={carregando}
              >
                {carregando ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={stylesRigD.btnText}>Confirmar Registro</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={stylesRigD.btnCancelar}
                onPress={() => navigation.goBack()}
              >
                <Text style={[stylesRigD.btnText, { color: '#666' }]}>Voltar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegistrarDesemSrc;