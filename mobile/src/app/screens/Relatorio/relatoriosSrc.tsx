import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StatusBar,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import api from '../../../services/api'; // Centralizando via Axios
import { stylesRel } from './stylesRel';

interface Relatorio {
  nomeAluno: string;
  matricula: string;
  curso: string;
  anoSemestre: string;
  mediaNotas: number;
  frequencias: number;
  qtdReprovacao: number;
  participacaoAtvd: number;
  probabilidadeEvasao: number;
  nivelRisco: 'Baixo' | 'Medio' | 'Alto';
  situacao: 'Ativo' | 'Trancado' | 'Evadido';
}

export default function RelatoriosSrc() {
  
  const [dados, setDados] = useState<Relatorio[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');
  const [riscoFiltro, setRiscoFiltro] = useState('');

  useEffect(() => {
    carregarRelatorios();
  }, []);

  const carregarRelatorios = async () => {
    try {
      const response = await api.get('/relatorios');
      
      setDados(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro de Conexão', 'Não foi possível carregar a base de relatórios.');
      setDados([]); 
    } finally {
      setLoading(false);
    }
  };

  const exportarPDF = async () => {
    const url = `${api.defaults.baseURL}/relatorios/pdf`;
    Linking.openURL(url);
  };

  const exportarExcel = async () => {
    const url = `${api.defaults.baseURL}/relatorios/excel`;
    Linking.openURL(url);
  };

  const getRiscoColor = (risco: string) => {
    switch (risco) {
      case 'Alto': return '#DC2626';
      case 'Medio': return '#F59E0B';
      default: return '#16A34A';
    }
  };

  const getSituacaoColor = (situacao: string) => {
    switch (situacao) {
      case 'Evadido': return '#DC2626';
      case 'Trancado': return '#6B7280';
      default: return '#2563EB';
    }
  };

  
  const dadosFiltrados = dados?.filter((item) => {
    const correspondeNome = item.nomeAluno?.toLowerCase().includes(busca.toLowerCase());
    const correspondeRisco = riscoFiltro === '' || item.nivelRisco === riscoFiltro;
    return correspondeNome && correspondeRisco;
  }) || [];

  if (loading) {
    return (
      <SafeAreaView style={stylesRel.loadingContainer}>
        <ActivityIndicator size="large" color="#1D9E75" />
        <Text style={stylesRel.loadingText}>Compilando dados acadêmicos...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={stylesRel.container}>
      <StatusBar barStyle="dark-content" />

      <View style={stylesRel.header}>
        <Text style={stylesRel.title}>Relatórios</Text>
        <Text style={stylesRel.subtitle}>Gestão de desempenho e evasão</Text>
      </View>

      <View style={stylesRel.searchContainer}>
        <FontAwesome5 name="search" size={14} color="#999" />
        <TextInput
          style={stylesRel.input}
          placeholder="Filtrar por nome do aluno..."
          placeholderTextColor="#999"
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      <View style={stylesRel.filterRow}>
        {['', 'Baixo', 'Medio', 'Alto'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              stylesRel.filterButton,
              riscoFiltro === item && stylesRel.filterButtonActive,
            ]}
            onPress={() => setRiscoFiltro(item)}
          >
            <Text style={[
              stylesRel.filterText,
              riscoFiltro === item && stylesRel.filterTextActive,
            ]}>
              {item === '' ? 'Todos' : item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={dadosFiltrados}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={stylesRel.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#999' }}>
            Nenhum registro encontrado.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={stylesRel.card}>
            <View style={stylesRel.cardHeader}>
              <View style={{ flex: 1 }}>
                <Text style={stylesRel.nome}>{item.nomeAluno}</Text>
                <Text style={stylesRel.curso}>{item.curso}</Text>
              </View>

              <View style={[stylesRel.badge, { backgroundColor: getRiscoColor(item.nivelRisco) + '15' }]}>
                <Text style={[stylesRel.badgeText, { color: getRiscoColor(item.nivelRisco) }]}>
                  RISCO {item.nivelRisco?.toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={stylesRel.gridInfo}>
              <View style={stylesRel.infoItem}>
                <Text style={stylesRel.infoLabel}>Matrícula</Text>
                <Text style={stylesRel.infoValue}>{item.matricula}</Text>
              </View>
              <View style={stylesRel.infoItem}>
                <Text style={stylesRel.infoLabel}>Média Geral</Text>
                <Text style={stylesRel.infoValue}>
                  
                  {Number(item.mediaNotas || 0).toFixed(1)}
                </Text>
              </View>
              <View style={stylesRel.infoItem}>
                <Text style={stylesRel.infoLabel}>Frequência</Text>
                <Text style={stylesRel.infoValue}>{item.frequencias}%</Text>
              </View>
            </View>

            <View style={stylesRel.divisor} />

            <View style={stylesRel.footer}>
              <View style={[stylesRel.situacaoBadge, { backgroundColor: getSituacaoColor(item.situacao) + '15' }]}>
                <View style={[stylesRel.dot, { backgroundColor: getSituacaoColor(item.situacao) }]} />
                <Text style={[stylesRel.situacaoText, { color: getSituacaoColor(item.situacao) }]}>
                  {item.situacao}
                </Text>
              </View>

              <View style={stylesRel.probContainer}>
                <Text style={stylesRel.probLabel}>Evasão: </Text>
                <Text style={[stylesRel.probValue, { color: getRiscoColor(item.nivelRisco) }]}>
                  {item.probabilidadeEvasao}%
                </Text>
              </View>
            </View>
          </View>
        )}
      />

      <View style={stylesRel.buttonArea}>
        <Text style={stylesRel.exportTitle}>Exportar listagem filtrada:</Text>
        <View style={stylesRel.exportActions}>
          <TouchableOpacity style={stylesRel.pdfBtn} onPress={exportarPDF}>
            <FontAwesome5 name="file-pdf" size={16} color="#FFF" />
            <Text style={stylesRel.btnText}>PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity style={stylesRel.excelBtn} onPress={exportarExcel}>
            <FontAwesome5 name="file-excel" size={16} color="#FFF" />
            <Text style={stylesRel.btnText}>EXCEL</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}