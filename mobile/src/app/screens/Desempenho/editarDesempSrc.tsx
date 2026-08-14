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
import { stylesEditarD } from './stylesEditarD';

const EditarDesemSrc = ({ navigation, route }: any) => {
  
  const { desempenho } = route.params || {};

  const [mediaNotas, setMediaNotas] = useState(desempenho?.mediaNotas?.toString() || '');
  const [frequencias, setFrequencias] = useState(desempenho?.frequencias?.toString() || '');
  const [qtdReprovacao, setQtdReprovacao] = useState(desempenho?.qtdReprovacao?.toString() || '');
  const [participacaoAtvd, setParticipacaoAtvd] = useState(desempenho?.participacaoAtvd?.toString() || '');
  const [anoSemestre, setAnoSemestre] = useState(desempenho?.anoSemestre || '');
  const [carregando, setCarregando] = useState(false);

  const handleSalvar = async () => {
    if (!mediaNotas || !frequencias || !qtdReprovacao || !participacaoAtvd || !anoSemestre) {
      Alert.alert('Campos vazios', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setCarregando(true);

    try {
      await api.put(`/desempenho/${desempenho.idDesempenho}`, {
        tbIdAluno: desempenho.tbIdAluno, // Mantemos o ID original do aluno
        mediaNotas: parseFloat(mediaNotas.replace(',', '.')),
        frequencias: parseFloat(frequencias.replace(',', '.')),
        qtdReprovacao: parseInt(qtdReprovacao),
        participacaoAtvd: parseInt(participacaoAtvd),
        anoSemestre
      });

      Alert.alert(
        'Atualizado',
        'Os dados acadêmicos foram atualizados com sucesso!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao atualizar os dados no servidor.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={stylesEditarD.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={stylesEditarD.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={stylesEditarD.desempenhoContainer}>
            <Text style={stylesEditarD.title}>Editar Registro</Text>
            <Text style={stylesEditarD.subtitle}>Ajuste as informações acadêmicas abaixo</Text>

            <View style={stylesEditarD.formGroup}>
              <Text style={stylesEditarD.label}>Aluno</Text>
              <TextInput
                style={[stylesEditarD.input, { backgroundColor: '#F0F2F3', color: '#666' }]}
                value={desempenho?.nomeAluno || `ID: ${desempenho?.tbIdAluno}`}
                editable={false}
              />
            </View>

            <View style={stylesEditarD.formGroup}>
              <Text style={stylesEditarD.label}>Média de Notas</Text>
              <TextInput
                style={stylesEditarD.input}
                value={mediaNotas}
                onChangeText={setMediaNotas}
                keyboardType="decimal-pad"
                placeholder="0.0"
              />
            </View>

            <View style={stylesEditarD.formGroup}>
              <Text style={stylesEditarD.label}>Frequência (%)</Text>
              <TextInput
                style={stylesEditarD.input}
                value={frequencias}
                onChangeText={setFrequencias}
                keyboardType="numeric"
                placeholder="0"
              />
            </View>

            <View style={stylesEditarD.formGroup}>
              <Text style={stylesEditarD.label}>Quantidade de Reprovações</Text>
              <TextInput
                style={stylesEditarD.input}
                value={qtdReprovacao}
                onChangeText={setQtdReprovacao}
                keyboardType="numeric"
              />
            </View>

            <View style={stylesEditarD.formGroup}>
              <Text style={stylesEditarD.label}>Participação (1 a 5)</Text>
              <TextInput
                style={stylesEditarD.input}
                value={participacaoAtvd}
                onChangeText={setParticipacaoAtvd}
                keyboardType="numeric"
                maxLength={1}
              />
            </View>

            <View style={stylesEditarD.formGroup}>
              <Text style={stylesEditarD.label}>Ano / Semestre</Text>
              <TextInput
                style={stylesEditarD.input}
                value={anoSemestre}
                onChangeText={setAnoSemestre}
                autoCapitalize="characters"
              />
            </View>

            <View style={stylesEditarD.formAcoes}>
              <TouchableOpacity
                style={stylesEditarD.btnSalvar}
                onPress={handleSalvar}
                disabled={carregando}
              >
                {carregando ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={stylesEditarD.btnText}>Salvar Alterações</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={stylesEditarD.btnVoltar}
                onPress={() => navigation.goBack()}
              >
                <Text style={stylesEditarD.btnVoltarText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditarDesemSrc;