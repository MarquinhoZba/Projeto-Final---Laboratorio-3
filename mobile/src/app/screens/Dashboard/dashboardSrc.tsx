import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Animated,
  Pressable,
  Dimensions,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootStackParamList } from '../../../../App';
import api from '../../../services/api';
import { stylesDash } from './stylesDash';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

const { width } = Dimensions.get('window');

interface AlunoRisco {
  nome: string;
  curso: string;
  periodo: string;
  nivelRisco: 'ALTO' | 'MEDIO' | 'BAIXO';
}

interface DashboardData {
  totalAlunos: number;
  alunosRiscoAlto: number;
  totalModelos: number;
  totalPredicoes: number;
  riscoBaixo: number;
  riscoMedio: number;
  riscoAlto: number;
  nomeGestor: string;
  alunosRecentes: AlunoRisco[];
}

const getInitials = (nome: string): string => {
  if (!nome || nome.trim() === '') return '??';
  const partes = nome.trim().split(/\s+/);
  if (partes.length === 1) return partes[0].charAt(0).toUpperCase();
  return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase();
};

const getRiscoConfig = (nivel: string) => {
  switch (nivel) {
    case 'ALTO':  return { label: 'Alto',  bg: '#fde8e8', text: '#E74C3C', avatarBg: '#fde8e8', avatarText: '#E74C3C' };
    case 'MEDIO': return { label: 'Médio', bg: '#fef3e2', text: '#F39C12', avatarBg: '#fef3e2', avatarText: '#F39C12' };
    default:      return { label: 'Baixo', bg: '#e1f5ee', text: '#0F6E56', avatarBg: '#e1f5ee', avatarText: '#1D9E75' };
  }
};

const MENU_ITEMS = [
  { title: 'Lista de Alunos',   icon: 'users',      iconBg: '#e1f5ee', iconColor: '#1D9E75', route: 'ListaAlunos' },
  { title: 'Realizar Predição', icon: 'brain',      iconBg: '#eeecfd', iconColor: '#6C5CE7', route: 'Predicao'   },
  { title: 'Desempenho',        icon: 'chart-line', iconBg: '#e6f0fb', iconColor: '#185FA5', route: 'Desempenho' },
  { title: 'Relatórios',        icon: 'file-alt',   iconBg: '#fef3e2', iconColor: '#F39C12', route: 'Relatorios' },
  { title: 'Configurar Modelo', icon: 'cog',        iconBg: '#f0f0f0', iconColor: '#34495E', route: 'Modelo'     },
  { title: 'Logs de Acesso',    icon: 'history',    iconBg: '#f5f5f5', iconColor: '#5F5E5A', route: 'LogAcessos' },
] as const;

const StatCard = ({ value, label, icon, accentColor, iconBg, iconColor }: any) => (
  <View style={[stylesDash.statCard, { borderTopColor: accentColor }]}>
    <View style={[stylesDash.statIconBox, { backgroundColor: iconBg }]}>
      <FontAwesome5 name={icon} size={14} color={iconColor} />
    </View>
    <Text style={stylesDash.statValue}>{value ?? 0}</Text>
    <Text style={stylesDash.statLabel}>{label}</Text>
  </View>
);

const RiskBar = ({ label, value, total, color }: { label: string; value: number; total: number; color: string }) => {
  const pct = total > 0 ? (value / total) * 100 : 0;
  return (
    <View style={stylesDash.riskRow}>
      <Text style={stylesDash.riskLabel}>{label}</Text>
      <View style={stylesDash.riskTrack}>
        <View style={[stylesDash.riskFill, { width: `${pct}%` as any, backgroundColor: color }]} />
      </View>
      <Text style={[stylesDash.riskCount, { color }]}>{value}</Text>
    </View>
  );
};

const DashboardSrc = ({ navigation }: Props) => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuAberto, setMenuAberto] = useState(false);
  const [nomeGestor, setNomeGestor] = useState<string>('');

  const slideAnim = useRef(new Animated.Value(-width)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  const carregarNomeLocal = async () => {
    try {
      const nomeSalvo = await AsyncStorage.getItem('nomeGestor');
      if (nomeSalvo && nomeSalvo.trim() !== '') {
        setNomeGestor(nomeSalvo);
      }
    } catch (e) {
      console.warn('AsyncStorage read error:', e);
    }
  };

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const idGestor = await AsyncStorage.getItem('idGestor');

      const response = await api.get('/dashboard', {
        params: { idGestor } // ✅ envia ?idGestor=1
      });

      const dashData: DashboardData = response.data;

      if (dashData.nomeGestor?.trim()) {
        setNomeGestor(dashData.nomeGestor);
        await AsyncStorage.setItem('nomeGestor', dashData.nomeGestor);
      }

      setData(dashData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      Alert.alert('Erro de Sincronia', 'Não foi possível buscar os dados do gestor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarNomeLocal();
    fetchDashboard();
  }, []);

  const abrirMenu = () => {
    setMenuAberto(true);
    Animated.parallel([
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, bounciness: 0 }),
      Animated.timing(overlayAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
    ]).start();
  };

  const fecharMenu = () => {
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: -width, duration: 220, useNativeDriver: true }),
      Animated.timing(overlayAnim, { toValue: 0, duration: 220, useNativeDriver: true }),
    ]).start(() => setMenuAberto(false));
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('nomeGestor');
      await AsyncStorage.removeItem('idGestor');
    } catch (e) {
      console.warn('Erro ao limpar AsyncStorage:', e);
    }
    navigation.replace('Login');
  };

  if (loading || !data) {
    return (
      <SafeAreaView style={stylesDash.loadingContainer}>
        <ActivityIndicator size="large" color="#1D9E75" />
        <Text style={stylesDash.loadingText}>Carregando painel...</Text>
      </SafeAreaView>
    );
  }

  const nomeExibido  = nomeGestor || 'Usuário';
  const primeiroNome = nomeExibido.split(' ')[0];
  const initials     = getInitials(nomeExibido);
  const valorRiscoAlto = data.alunosRiscoAlto ?? 0;
  const totalRisco     = (data.riscoBaixo ?? 0) + (data.riscoMedio ?? 0) + valorRiscoAlto;

  return (
    <SafeAreaView style={stylesDash.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      {menuAberto && (
        <Animated.View style={[stylesDash.overlay, { opacity: overlayAnim }]}>
          <Pressable style={{ flex: 1 }} onPress={fecharMenu} />
        </Animated.View>
      )}

      <Animated.View style={[stylesDash.drawer, { transform: [{ translateX: slideAnim }] }]}>
        <LinearGradient colors={['#1D9E75', '#0F6E56']} style={stylesDash.drawerHeader}>
          <View style={stylesDash.drawerAvatar}>
            <Text style={stylesDash.drawerAvatarText}>{initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={stylesDash.drawerNome} numberOfLines={1}>{nomeExibido}</Text>
            <Text style={stylesDash.drawerSubtitle}>Gestor Conectado</Text>
          </View>
        </LinearGradient>

        <ScrollView style={stylesDash.drawerScroll} showsVerticalScrollIndicator={false}>
          <Text style={stylesDash.drawerSectionLabel}>NAVEGAÇÃO</Text>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.route}
              style={stylesDash.drawerItem}
              onPress={() => navigation.navigate(item.route as any)}
            >
              <View style={[stylesDash.drawerItemIcon, { backgroundColor: item.iconBg }]}>
                <FontAwesome5 name={item.icon} size={16} color={item.iconColor} />
              </View>
              <Text style={stylesDash.drawerItemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
          <View style={stylesDash.drawerDivider} />
          <TouchableOpacity style={stylesDash.drawerItem} onPress={handleLogout}>
            <View style={[stylesDash.drawerItemIcon, { backgroundColor: '#fde8e8' }]}>
              <FontAwesome5 name="sign-out-alt" size={16} color="#E74C3C" />
            </View>
            <Text style={[stylesDash.drawerItemTitle, { color: '#E74C3C' }]}>Sair</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>

      <View style={stylesDash.topbar}>
        <TouchableOpacity onPress={abrirMenu} style={stylesDash.hamburgerBtn}>
          <View style={stylesDash.hamburgerLine} />
          <View style={[stylesDash.hamburgerLine, { width: 18 }]} />
          <View style={stylesDash.hamburgerLine} />
        </TouchableOpacity>
        <Text style={stylesDash.topbarTitle}>SistemaPEE</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Gestores')}>
          <LinearGradient colors={['#1D9E75', '#0F6E56']} style={stylesDash.avatarGradient}>
            <Text style={stylesDash.avatarInitials}>{initials}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={stylesDash.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={stylesDash.greetingRow}>
          <Text style={stylesDash.welcome}>Olá, {primeiroNome}! 👋</Text>
          <Text style={stylesDash.subtitle}>Painel Geral de Controle</Text>
        </View>

        <View style={stylesDash.statsGrid}>
          <StatCard value={data.totalAlunos}   label="Total Alunos"   icon="user-graduate"        accentColor="#1D9E75" iconBg="#e1f5ee" iconColor="#1D9E75" />
          <StatCard value={valorRiscoAlto}      label="Risco Alto"     icon="exclamation-triangle"  accentColor="#E74C3C" iconBg="#fde8e8" iconColor="#E74C3C" />
          <StatCard value={data.totalModelos}   label="Modelos Ativos" icon="brain"                accentColor="#6C5CE7" iconBg="#eeecfd" iconColor="#6C5CE7" />
          <StatCard value={data.totalPredicoes} label="Predições"      icon="chart-line"            accentColor="#F39C12" iconBg="#fef3e2" iconColor="#F39C12" />
        </View>

        <View style={stylesDash.sectionCard}>
          <Text style={stylesDash.sectionCardTitle}>Distribuição de Risco de Evasão</Text>
          <RiskBar label="Alto"  value={valorRiscoAlto}       total={totalRisco} color="#E74C3C" />
          <RiskBar label="Médio" value={data.riscoMedio ?? 0} total={totalRisco} color="#F39C12" />
          <RiskBar label="Baixo" value={data.riscoBaixo ?? 0} total={totalRisco} color="#1D9E75" />
        </View>

        {data.alunosRecentes && data.alunosRecentes.length > 0 && (
          <View style={stylesDash.sectionCard}>
            <Text style={stylesDash.sectionCardTitle}>Ações Recomendadas</Text>
            {data.alunosRecentes.map((aluno, i) => {
              const cfg = getRiscoConfig(aluno.nivelRisco);
              return (
                <View key={i} style={stylesDash.alunoRow}>
                  <View style={[stylesDash.alunoAvatar, { backgroundColor: cfg.avatarBg }]}>
                    <Text style={{ color: cfg.avatarText, fontWeight: '700', fontSize: 12 }}>
                      {getInitials(aluno.nome)}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={stylesDash.alunoNome}>{aluno.nome}</Text>
                    <Text style={{ fontSize: 11, color: '#888' }}>{aluno.curso} · {aluno.periodo}</Text>
                  </View>
                  <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, backgroundColor: cfg.bg }}>
                    <Text style={{ fontSize: 11, color: cfg.text, fontWeight: '600' }}>{cfg.label}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardSrc;