import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  RefreshControl
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import api from '../../../services/api';
import { stylesMod } from './stylesMod';

interface Modelo {
  idModelo: number;
  algoritmo: string;
  acuracia: number;
  descricao: string;
  dataTreinamento?: string;
}

export default function ModeloSrc({ navigation }: any) {
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    carregarModelos();
  }, []);

  const carregarModelos = async () => {
    try {
      const response = await api.get('/modelos');
      setModelos(response.data);
    } catch (error) {
      console.error('Erro ao carregar modelos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    carregarModelos();
  };

  const formatarData = (data?: string) => {
    if (!data) return '';
    const d = new Date(data);
    return d.toLocaleDateString('pt-BR');
  };

  const renderModelo = ({ item }: { item: Modelo }) => (
    <View style={stylesMod.card}>
      <View style={stylesMod.cardHeader}>
        <LinearGradient
          colors={['#1D9E75', '#0F6E56']}
          style={stylesMod.iconContainer}
        >
          <FontAwesome5 name="brain" size={18} color="#fff" />
        </LinearGradient>

        <View style={stylesMod.headerText}>
          <Text style={stylesMod.algoritmo}>{item.algoritmo}</Text>
          <Text style={stylesMod.id}>Versão do Modelo #{item.idModelo}</Text>
        </View>
      </View>

      <View style={stylesMod.infoArea}>
        <View style={stylesMod.metricsRow}>
          <View style={stylesMod.badge}>
            <FontAwesome5 name="bullseye" size={12} color="#1D9E75" style={{ marginRight: 6 }} />
            <Text style={stylesMod.badgeText}>
              {item.acuracia}% Acurácia
            </Text>
          </View>
          
          {item.dataTreinamento && (
            <Text style={stylesMod.dataText}>
              Treinado em: {formatarData(item.dataTreinamento)}
            </Text>
          )}
        </View>

        <Text style={stylesMod.descricao}>{item.descricao}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={stylesMod.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={[stylesMod.blob, stylesMod.blob1]} />
      <View style={[stylesMod.blob, stylesMod.blob2]} />

      <View style={stylesMod.header}>
        <TouchableOpacity
          style={stylesMod.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={18} color="#0F2D1F" />
        </TouchableOpacity>

        <View>
          <Text style={stylesMod.title}>Modelos</Text>
          <Text style={stylesMod.subtitle}>Configurações Preditivas</Text>
        </View>
      </View>

      {loading ? (
        <View style={stylesMod.loadingArea}>
          <ActivityIndicator size="large" color="#1D9E75" />
          <Text style={stylesMod.loadingText}>Analisando algoritmos...</Text>
        </View>
      ) : (
        <FlatList
          data={modelos}
          keyExtractor={(item) => item.idModelo.toString()}
          renderItem={renderModelo}
          contentContainerStyle={stylesMod.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#1D9E75']} />
          }
          ListHeaderComponent={() => (
            <Text style={stylesMod.introText}>
              Abaixo estão os modelos de Machine Learning treinados para identificar o risco de evasão.
            </Text>
          )}
          ListEmptyComponent={
            <View style={stylesMod.emptyContainer}>
              <FontAwesome5 name="robot" size={40} color="#ccc" />
              <Text style={stylesMod.emptyText}>Nenhum modelo ativo.</Text>
            </View>
          }
        />
      )}

      <TouchableOpacity
  style={stylesMod.fab}
  onPress={() => navigation.navigate('RegistrarModelo')} 
  activeOpacity={0.8}
>
  <LinearGradient
    colors={['#1D9E75', '#0F6E56']}
    style={stylesMod.fabGradient}
  >
    <FontAwesome5 name="plus" size={20} color="#fff" />
    </LinearGradient>
  </TouchableOpacity>
    </SafeAreaView>
  );
}