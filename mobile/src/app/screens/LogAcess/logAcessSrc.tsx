import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  RefreshControl
} from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import api from '../../../services/api';
import { stylesAcess } from './stylesAcess';

interface LogEntry {
  id: number | string; 
  usuario: string;     
  dataAcesso: string;  
  status: string;      
}

const LogAcessSrc = ({ navigation }: any) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);

  useEffect(() => {
    carregarLogs();
  }, []);

  const carregarLogs = async () => {
    try {
      
      const response = await api.get('/logs/recentes'); 
      
      setLogs(response.data || []); 
    } catch (error) {
      console.error("Erro ao buscar logs:", error);
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  };

  const onRefresh = () => {
    setAtualizando(true);
    carregarLogs();
  };

  const formatarData = (data: string) => {
    if (!data) return "Data indisponível";
    const d = new Date(data);
    return d.toLocaleDateString('pt-BR') + ' às ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const renderItem = ({ item }: { item: LogEntry }) => (
    <View style={stylesAcess.logCard}>
      <View style={[stylesAcess.iconArea, { backgroundColor: '#1D9E7515' }]}>
        <FontAwesome5 name="history" size={16} color="#1D9E75" />
      </View>

      <View style={stylesAcess.logInfo}>
        <View style={stylesAcess.logHeaderRow}>
          {/* Usando os nomes que vêm do Controller */}
          <Text style={stylesAcess.usuario}>{item.usuario || 'Usuário'}</Text>
          <Text style={stylesAcess.data}>{formatarData(item.dataAcesso)}</Text>
        </View>

        <View style={stylesAcess.acaoBadge}>
          <Text style={stylesAcess.acaoText}>{item.status || 'Acesso'}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={stylesAcess.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={stylesAcess.main}>
        <View style={stylesAcess.logHeader}>
          <View>
            <Text style={stylesAcess.title}>Logs de Acesso</Text>
            <Text style={stylesAcess.subtitle}>Histórico de atividades do sistema</Text>
          </View>
          <View style={stylesAcess.iconCircle}>
             <FontAwesome5 name="shield-alt" size={22} color="#1D9E75" />
          </View>
        </View>

        {carregando ? (
          <View style={stylesAcess.loadingContainer}>
            <ActivityIndicator size="large" color="#1D9E75" />
            <Text style={stylesAcess.loadingText}>Sincronizando registros...</Text>
          </View>
        ) : (
          <FlatList
            data={logs}
            
            keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={stylesAcess.listaContent}
            refreshControl={
              <RefreshControl refreshing={atualizando} onRefresh={onRefresh} colors={['#1D9E75']} />
            }
            ListEmptyComponent={
              <View style={stylesAcess.vazioContainer}>
                <FontAwesome5 name="folder-open" size={40} color="#ccc" />
                <Text style={stylesAcess.semRegistro}>Nenhuma atividade registrada.</Text>
              </View>
            }
          />
        )}

        <View style={stylesAcess.footer}>
          <TouchableOpacity
            style={stylesAcess.btnVoltar}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <FontAwesome5 name="chevron-left" size={14} color="#666" style={{ marginRight: 8 }} />
            <Text style={stylesAcess.btnText}>Voltar ao Painel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LogAcessSrc;