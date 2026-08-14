import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage'; // ✅ NOVO
import api from '../../../services/api'; // ✅ NOVO
import { stylesGest } from './stylesGest';

export default function DadosGestoresSrc({ navigation }: any) {

  const [gestor, setGestor] = useState({
    nome: '',
    cargo: '',
    email: '',
  });
  const [carregando, setCarregando] = useState(true);

  const carregarDados = async () => {
    try {
      
      const nomeSalvo  = await AsyncStorage.getItem('nomeGestor');
      const idSalvo    = await AsyncStorage.getItem('idGestor');

      if (nomeSalvo) {
        setGestor(prev => ({ ...prev, nome: nomeSalvo }));
      }

      if (idSalvo) {
        const response = await api.get(`/gestor/${idSalvo}`);
        const dados = response.data;

        setGestor({
          nome:  dados.nomeGestor || nomeSalvo || '',
          cargo: dados.cargo      || '',
          email: dados.email      || '',
        });

        
        if (dados.nomeGestor) {
          await AsyncStorage.setItem('nomeGestor', dados.nomeGestor);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados do gestor:', error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const gerarIniciais = (nome: string) => {
    if (!nome || nome.trim() === '') return '?';
    const partes = nome.trim().split(/\s+/);
    let iniciais = partes[0][0];
    if (partes.length > 1) iniciais += partes[partes.length - 1][0];
    return iniciais.toUpperCase();
  };

  if (carregando) {
    return (
      <SafeAreaView style={[stylesGest.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#1D9E75" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={stylesGest.container}>
      <StatusBar barStyle="dark-content" />

      <View style={[stylesGest.blob, stylesGest.blob1]} />
      <View style={[stylesGest.blob, stylesGest.blob2]} />
      <View style={[stylesGest.blob, stylesGest.blob3]} />

      <View style={stylesGest.card}>
        <LinearGradient colors={['#1D9E75', '#0F6E56']} style={stylesGest.iconWrap}>
          <FontAwesome5 name="user-shield" size={22} color="#fff" />
        </LinearGradient>

        <Text style={stylesGest.title}>Meus Dados</Text>
        <Text style={stylesGest.subtitle}>Perfil dos Gestor(a)</Text>

        <View style={stylesGest.avatar}>
          <LinearGradient
            colors={['#f0f0f0', '#e0e0e0']}
            style={{ width: '100%', height: '100%', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={stylesGest.avatarText}>
              {gerarIniciais(gestor.nome)}
            </Text>
          </LinearGradient>
        </View>

        <View style={stylesGest.divider} />

        <View style={stylesGest.infoCard}>
          <View style={stylesGest.iconBox}>
            <FontAwesome5 name="id-card" size={16} color="#1D9E75" />
          </View>
          <View>
            <Text style={stylesGest.label}>NOME COMPLETO</Text>
            <Text style={stylesGest.value}>{gestor.nome || '—'}</Text>
          </View>
        </View>

        <View style={stylesGest.infoCard}>
          <View style={stylesGest.iconBox}>
            <FontAwesome5 name="envelope" size={16} color="#1D9E75" />
          </View>
          <View>
            <Text style={stylesGest.label}>E-MAIL INSTITUCIONAL</Text>
            <Text style={stylesGest.value}>{gestor.email || '—'}</Text>
          </View>
        </View>

        
        <View style={stylesGest.infoCard}>
          <View style={stylesGest.iconBox}>
            <FontAwesome5 name="briefcase" size={16} color="#1D9E75" />
          </View>
          <View>
            <Text style={stylesGest.label}>CARGO / FUNÇÃO</Text>
            <Text style={stylesGest.value}>{gestor.cargo || '—'}</Text>
          </View>
        </View>

        <View style={stylesGest.divider} />

        <TouchableOpacity
          style={stylesGest.btnVoltar}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <FontAwesome5 name="arrow-left" size={14} color="#1D9E75" style={{ marginRight: 8 }} />
          <Text style={stylesGest.btnText}>Voltar ao Início</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}