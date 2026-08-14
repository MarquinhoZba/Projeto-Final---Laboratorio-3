import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  Linking, 
  StatusBar,
} from 'react-native';

import { stylesRel } from './stylesRel';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import api from '../../../services/api';

const RelatorioPDFsrc = () => {
  const [gerando, setGerando] = useState<string | null>(null);

  const handleGerarRelatorio = async (tipo: string) => {
    try {
      setGerando(tipo);
      let endpoint = '';

      switch (tipo) {
        case 'evasao':
          endpoint = '/relatorios/pdf';
          break;
        case 'desempenho':
          endpoint = '/relatorios/excel';
          break;
        case 'logs':
          endpoint = '/logs'; 
          break;
        default:
          Alert.alert('Erro', 'Tipo de relatório inválido.');
          return;
      }

      const url = `${api.defaults.baseURL}${endpoint}`;
      
      await Linking.openURL(url);
      
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível processar o download do relatório.');
    } finally {
      setGerando(null);
    }
  };

  return (
    <SafeAreaView style={stylesRel.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={stylesRel.header}>
          <Text style={stylesRel.title}>Exportação</Text>
          <Text style={stylesRel.subtitle}>Gere documentos oficiais e auditorias</Text>
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          
          <TouchableOpacity 
            style={stylesRel.cardExport} 
            onPress={() => handleGerarRelatorio('evasao')}
            disabled={!!gerando}
          >
            <LinearGradient
              colors={['#FF5F6D', '#FFC371']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={stylesRel.gradientIcon}
            >
              <FontAwesome5 name="file-pdf" size={22} color="#FFF" />
            </LinearGradient>
            
            <View style={stylesRel.exportInfo}>
              <Text style={stylesRel.exportTitleText}>Relatório de Evasão</Text>
              <Text style={stylesRel.exportDesc}>Lista de alunos com risco alto (PDF)</Text>
            </View>

            {gerando === 'evasao' ? (
              <ActivityIndicator color="#FF5F6D" />
            ) : (
              <FontAwesome5 name="chevron-right" size={14} color="#CCC" />
            )}
          </TouchableOpacity>

          
          <TouchableOpacity 
            style={stylesRel.cardExport} 
            onPress={() => handleGerarRelatorio('desempenho')}
            disabled={!!gerando}
          >
            <LinearGradient
              colors={['#11998e', '#38ef7d']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={stylesRel.gradientIcon}
            >
              <FontAwesome5 name="file-excel" size={22} color="#FFF" />
            </LinearGradient>
            
            <View style={stylesRel.exportInfo}>
              <Text style={stylesRel.exportTitleText}>Dados Acadêmicos</Text>
              <Text style={stylesRel.exportDesc}>Planilha detalhada de notas (XLSX)</Text>
            </View>

            {gerando === 'desempenho' ? (
              <ActivityIndicator color="#11998e" />
            ) : (
              <FontAwesome5 name="chevron-right" size={14} color="#CCC" />
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={stylesRel.cardExport} 
            onPress={() => handleGerarRelatorio('logs')}
            disabled={!!gerando}
          >
            <LinearGradient
              colors={['#4568DC', '#B06AB3']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={stylesRel.gradientIcon}
            >
              <FontAwesome5 name="history" size={22} color="#FFF" />
            </LinearGradient>
            
            <View style={stylesRel.exportInfo}>
              <Text style={stylesRel.exportTitleText}>Logs de Auditoria</Text>
              <Text style={stylesRel.exportDesc}>Histórico de acessos e predições</Text>
            </View>

            {gerando === 'logs' ? (
              <ActivityIndicator color="#4568DC" />
            ) : (
              <FontAwesome5 name="chevron-right" size={14} color="#CCC" />
            )}
          </TouchableOpacity>

        </View>

        <View style={stylesRel.warningBox}>
          <FontAwesome5 name="info-circle" size={16} color="#856404" />
          <Text style={stylesRel.warningText}>
            Os relatórios são gerados em tempo real com base nos dados mais recentes do servidor.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RelatorioPDFsrc;