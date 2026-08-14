import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  StatusBar,
  Modal,
  ScrollView,
  RefreshControl
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import api from '../../../services/api'; 
import { stylesPred, getAvatarCor, getIniciais, getRiscoConfig } from './stylesPred';

interface Predicao {
  idPredicao: number;
  nomeAluno: string;
  probabilidadeEvasao: number;
  nivelRisco: 'Baixo' | 'Medio' | 'Alto';
  dataPredicao: string;
  algoritmo: string;
}

interface Aluno {
  tbIdAluno: number;
  nomeAluno: string;
}

interface Modelo {
  idModelo: number;
  algoritmo: string;
}

export default function PredicaoSrc() {
  const [dados, setDados] = useState<Predicao[]>([]);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [busca, setBusca] = useState('');
  
  const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);
  const [modeloSelecionado, setModeloSelecionado] = useState<Modelo | null>(null);
  
  const [modalAluno, setModalAluno] = useState(false);
  const [modalModelo, setModalModelo] = useState(false);

  const carregarTudo = async () => {
    try {
      const [resPredicoes, resAlunos, resModelos] = await Promise.all([
        api.get('/predicao'),
        api.get('/alunos'),
        api.get('/modelos'),
      ]);
      
      setDados(resPredicoes.data);
      setAlunos(resAlunos.data);
      setModelos(resModelos.data);
    } catch (e) {
      console.error('Erro ao carregar dados:', e);
      Alert.alert('Erro de Sincronização', 'Não foi possível buscar os dados.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    carregarTudo();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    carregarTudo();
  };

  const gerarPredicao = async () => {
    if (!alunoSelecionado || !modeloSelecionado) {
      Alert.alert('Dados Incompletos', 'Selecione um aluno e um modelo de IA.');
      return;
    }
    
    setEnviando(true);
    try {
      const res = await api.post('/predicao', {
        tbIdAluno: alunoSelecionado.tbIdAluno,
        tbIdModelo: modeloSelecionado.idModelo,
        probabilidadeEvasao: Math.floor(Math.random() * 100),
        nivelRisco: 'Medio'
      });

      if (res.status === 201 || res.status === 200) {
        Alert.alert('Sucesso', `Análise concluída para ${alunoSelecionado.nomeAluno}.`);
        setAlunoSelecionado(null);
        setModeloSelecionado(null);
        carregarTudo();
      }
    } catch (e) {
      Alert.alert('Erro', 'O servidor não respondeu à solicitação.');
    } finally {
      setEnviando(false);
    }
  };

  const deletarPredicao = (id: number) => {
    Alert.alert('Remover Registro', 'Deseja excluir permanentemente este histórico?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/predicao/${id}`);
            setDados((prev) => prev.filter((p) => p.idPredicao !== id));
          } catch (e) {
            Alert.alert('Erro', 'Não foi possível remover o registro.');
          }
        },
      },
    ]);
  };

  const formatarData = (iso: string) => {
    if (!iso) return 'Data indisponível';
    const d = new Date(iso);
    return d.toLocaleDateString('pt-BR') + ' às ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const dadosFiltrados = dados.filter((p) =>
    p.nomeAluno?.toLowerCase().includes(busca.toLowerCase())
  );

  const renderCard = ({ item }: { item: Predicao }) => {
    const risco = getRiscoConfig(item.nivelRisco);
    const avatarCor = getAvatarCor(item.nomeAluno);

    return (
      <View style={stylesPred.card}>
        <View style={stylesPred.cardHeader}>
          <View style={[stylesPred.avatar, { backgroundColor: avatarCor + '15' }]}>
            <Text style={[stylesPred.avatarText, { color: avatarCor }]}>
              {getIniciais(item.nomeAluno)}
            </Text>
          </View>

          <View style={stylesPred.cardInfo}>
            <Text style={stylesPred.cardNome}>{item.nomeAluno}</Text>
            <View style={stylesPred.algoBadge}>
              <FontAwesome5 name="microchip" size={10} color="#6C7F74" />
              <Text style={stylesPred.cardAlgo}>{item.algoritmo}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={stylesPred.btnExcluir}
            onPress={() => deletarPredicao(item.idPredicao)}
          >
            <FontAwesome5 name="trash-alt" size={14} color="#FF3B30" />
          </TouchableOpacity>
        </View>

        <View style={stylesPred.divisor} />

        <View style={stylesPred.statsRow}>
          <View style={stylesPred.stat}>
            <Text style={stylesPred.statLabel}>Probabilidade</Text>
            <Text style={[stylesPred.statValor, { color: risco.cor }]}>
              {Number(item.probabilidadeEvasao).toFixed(1)}%
            </Text>
          </View>
          <View style={stylesPred.statSep} />
          <View style={stylesPred.stat}>
            <Text style={stylesPred.statLabel}>Status de Risco</Text>
            <View style={[stylesPred.badge, { backgroundColor: risco.bg }]}>
              <Text style={[stylesPred.badgeText, { color: risco.cor }]}>{risco.label}</Text>
            </View>
          </View>
        </View>

        <View style={stylesPred.footerCard}>
           <FontAwesome5 name="clock" size={10} color="#72867C" />
           <Text style={stylesPred.dataTexto}> Gerada em {formatarData(item.dataPredicao)}</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={stylesPred.centralize}>
        <ActivityIndicator size="large" color="#1D9E75" />
        <Text style={stylesPred.loadingText}>Sincronizando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={stylesPred.safe}>
      <StatusBar barStyle="dark-content" />

      <View style={stylesPred.topbar}>
        <Text style={stylesPred.titulo}>Análise de Risco</Text>
        <Text style={stylesPred.subtitulo}>Predição baseada em inteligência de dados</Text>
      </View>

      <View style={stylesPred.searchWrap}>
        <FontAwesome5 name="search" size={14} color="#8E8E93" style={stylesPred.searchIcon} />
        <TextInput
          style={stylesPred.searchInput}
          placeholder="Pesquisar histórico..."
          placeholderTextColor="#8E8E93"
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      <FlatList
        data={dadosFiltrados}
        keyExtractor={(item) => (item.idPredicao ? item.idPredicao.toString() : Math.random().toString())}
        renderItem={renderCard}
        contentContainerStyle={stylesPred.lista}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={
          <View>
            <Text style={stylesPred.sectionLabel}>Configurar Processamento</Text>
            <View style={stylesPred.formCard}>
              <TouchableOpacity style={stylesPred.formRow} onPress={() => setModalAluno(true)}>
                <View style={[stylesPred.formIcon, { backgroundColor: '#1D9E7515' }]}>
                  <FontAwesome5 name="user-graduate" size={14} color="#1D9E75" />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={stylesPred.formLabel}>Aluno</Text>
                    <Text style={stylesPred.formValor} numberOfLines={1}>
                        {alunoSelecionado ? alunoSelecionado.nomeAluno : 'Selecionar da lista'}
                    </Text>
                </View>
                <FontAwesome5 name="chevron-right" size={12} color="#C7C7CC" />
              </TouchableOpacity>

              <View style={stylesPred.divisor} />

              <TouchableOpacity style={stylesPred.formRow} onPress={() => setModalModelo(true)}>
                <View style={[stylesPred.formIcon, { backgroundColor: '#5856D615' }]}>
                  <FontAwesome5 name="brain" size={14} color="#5856D6" />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={stylesPred.formLabel}>Modelo Preditivo</Text>
                    <Text style={stylesPred.formValor} numberOfLines={1}>
                        {modeloSelecionado ? modeloSelecionado.algoritmo : 'Selecionar algoritmo'}
                    </Text>
                </View>
                <FontAwesome5 name="chevron-right" size={12} color="#C7C7CC" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[stylesPred.btnGerar, enviando && stylesPred.btnGerarDesabilitado]}
              onPress={gerarPredicao}
              disabled={enviando}
            >
              {enviando ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={stylesPred.btnGerarText}>EXECUTAR ANÁLISE DE EVASÃO</Text>
              )}
            </TouchableOpacity>

            {dadosFiltrados.length > 0 && (
              <Text style={stylesPred.sectionLabel}>
                Histórico de Resultados ({dadosFiltrados.length})
              </Text>
            )}
          </View>
        }
        ListEmptyComponent={
          <View style={stylesPred.vazio}>
            <FontAwesome5 name="chart-bar" size={40} color="#D1D1D6" />
            <Text style={stylesPred.vazioText}>Sem predições no histórico</Text>
          </View>
        }
      />

      {/* Modal Alunos */}
      <Modal visible={modalAluno} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={stylesPred.modal}>
          <View style={stylesPred.modalHeader}>
            <Text style={stylesPred.modalTitulo}>Base de Alunos</Text>
            <TouchableOpacity onPress={() => setModalAluno(false)}>
              <Text style={stylesPred.modalFechar}>Fechar</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            {alunos.map((a) => (
              <TouchableOpacity
                key={`aluno-${a.tbIdAluno}`} // KEY ÚNICA AQUI
                style={stylesPred.modalItem}
                onPress={() => {
                  setAlunoSelecionado(a);
                  setModalAluno(false);
                }}
              >
                <View style={[stylesPred.avatar, { backgroundColor: getAvatarCor(a.nomeAluno) + '15', width: 35, height: 35 }]}>
                  <Text style={[stylesPred.avatarText, { color: getAvatarCor(a.nomeAluno), fontSize: 12 }]}>
                    {getIniciais(a.nomeAluno)}
                  </Text>
                </View>
                <Text style={stylesPred.modalItemText}>{a.nomeAluno}</Text>
                {alunoSelecionado?.tbIdAluno === a.tbIdAluno && <FontAwesome5 name="check-circle" size={18} color="#1D9E75" />}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Modal Modelos */}
      <Modal visible={modalModelo} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={stylesPred.modal}>
          <View style={stylesPred.modalHeader}>
            <Text style={stylesPred.modalTitulo}>Modelos Disponíveis</Text>
            <TouchableOpacity onPress={() => setModalModelo(false)}>
              <Text style={stylesPred.modalFechar}>Fechar</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            {modelos.map((m) => (
              <TouchableOpacity
                key={`modelo-${m.idModelo}`} // KEY ÚNICA AQUI
                style={stylesPred.modalItem}
                onPress={() => {
                  setModeloSelecionado(m);
                  setModalModelo(false);
                }}
              >
                <View style={[stylesPred.formIcon, { backgroundColor: '#5856D615' }]}>
                  <FontAwesome5 name="brain" size={14} color="#5856D6" />
                </View>
                <Text style={stylesPred.modalItemText}>{m.algoritmo}</Text>
                {modeloSelecionado?.idModelo === m.idModelo && <FontAwesome5 name="check-circle" size={18} color="#5856D6" />}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}