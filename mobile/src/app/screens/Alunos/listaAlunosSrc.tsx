import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import api from '../../../services/api';
import { stylesAlun } from './stylesAlun';

type Situacao = 'Ativo' | 'Trancado' | 'Evadido' | '';

interface Aluno {
  idAluno: number;
  nomeAluno: string;
  matricula: string;
  curso: string;
  turno: string;
  idade: number;
  sexo: string;
  semestreAtual: number;
  situacao: Situacao;
  questao1: string;
  questao2: string;
  questao3: string;
  questao4: string;
  questao5: string;
  motivoEvasao: string;
}

const getInitials = (nome: string): string => {
  if (!nome) return '?';
  const partes = nome.trim().split(' ');
  if (partes.length === 1) return partes[0].charAt(0).toUpperCase();
  return partes[0].charAt(0).toUpperCase() + partes[partes.length - 1].charAt(0).toUpperCase();
};

const getSituacaoStyle = (situacao: string) => {
  
  switch (situacao?.toLowerCase()) {
    case 'ativo':    return { label: 'Ativo', bg: '#e1f5ee', text: '#0F6E56' };
    case 'trancado': return { label: 'Trancado', bg: '#fef3e2', text: '#854F0B' };
    case 'evadido':  return { label: 'Evadido', bg: '#fde8e8', text: '#A32D2D' };
    default:         return { label: situacao || 'N/A', bg: '#f0f0f0', text: '#5F5E5A' };
  }
};

const SITUACOES: { label: string; value: Situacao }[] = [
  { label: 'Todas', value: '' },
  { label: 'Ativo', value: 'Ativo' },
  { label: 'Trancado', value: 'Trancado' },
  { label: 'Evadido', value: 'Evadido' },
];

const ListaAlunosSrc = ({ navigation }: any) => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [busca, setBusca] = useState('');
  const [situacaoFiltro, setSituacaoFiltro] = useState<Situacao>('');
  const [carregando, setCarregando] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);
  const [modalVisivel, setModalVisivel] = useState(false);

  const buscarAlunos = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setCarregando(true);
    try {
      // Rota /alunos definida no seu index.js do backend
      const response = await api.get('/alunos');
      setAlunos(response.data);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      Alert.alert('Erro', 'Não foi possível carregar a lista de alunos do servidor.');
    } finally {
      setCarregando(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    
    const unsubscribe = navigation.addListener('focus', () => {
      buscarAlunos();
    });
    return unsubscribe;
  }, [navigation]);

  const alunosFiltrados = alunos.filter((a) => {
    const buscaOk = (a.nomeAluno?.toLowerCase() || "").includes(busca.toLowerCase()) ||
                    (a.matricula?.toLowerCase() || "").includes(busca.toLowerCase());
    const situacaoOk = situacaoFiltro === '' || a.situacao === situacaoFiltro;
    return buscaOk && situacaoOk;
  });

  const confirmarExclusao = (aluno: Aluno) => {
    Alert.alert(
      'Excluir Aluno',
      `Deseja realmente excluir ${aluno.nomeAluno}? Esta ação não pode ser desfeita.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              
              await api.delete(`/alunos/${aluno.idAluno}`);
              Alert.alert('Sucesso', 'Aluno removido com sucesso.');
              setAlunos((prev) => prev.filter((a) => a.idAluno !== aluno.idAluno));
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o aluno. Verifique se há dependências.');
            }
          },
        },
      ]
    );
  };

  const abrirModal = (aluno: Aluno) => {
    setAlunoSelecionado(aluno);
    setModalVisivel(true);
  };

  const renderItem = ({ item }: { item: Aluno }) => {
    const sit = getSituacaoStyle(item.situacao);
    const initials = getInitials(item.nomeAluno);

    return (
      <View style={stylesAlun.card}>
        <View style={stylesAlun.cardLeft}>
          <View style={stylesAlun.avatar}>
            <Text style={stylesAlun.avatarText}>{initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={stylesAlun.cardNome} numberOfLines={1}>{item.nomeAluno}</Text>
            <Text style={stylesAlun.cardSub}>{item.curso} • {item.turno}</Text>
            <Text style={stylesAlun.cardMatricula}>Mat: {item.matricula}</Text>
          </View>
        </View>

        <View style={stylesAlun.cardRight}>
          <View style={[stylesAlun.badgeSit, { backgroundColor: sit.bg }]}>
            <Text style={[stylesAlun.badgeSitText, { color: sit.text }]}>{sit.label}</Text>
          </View>
          <View style={stylesAlun.acoes}>
            <TouchableOpacity style={stylesAlun.btnAcao} onPress={() => abrirModal(item)}>
              <FontAwesome5 name="eye" size={13} color="#185FA5" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[stylesAlun.btnAcao, { backgroundColor: '#e1f5ee' }]} 
              onPress={() => navigation.navigate('EditarAlunos', { alunoId: item.idAluno })}
            >
              <FontAwesome5 name="edit" size={13} color="#0F6E56" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[stylesAlun.btnAcao, { backgroundColor: '#fde8e8' }]} 
              onPress={() => confirmarExclusao(item)}
            >
              <FontAwesome5 name="trash" size={13} color="#A32D2D" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const ModalDetalhes = () => {
    if (!alunoSelecionado) return null;
    const sit = getSituacaoStyle(alunoSelecionado.situacao);

    const Campo = ({ label, valor }: { label: string; valor: string | number }) => (
      <View style={stylesAlun.modalCampo}>
        <Text style={stylesAlun.modalLabel}>{label}</Text>
        <Text style={stylesAlun.modalValor}>{valor || '—'}</Text>
      </View>
    );

    return (
      <Modal visible={modalVisivel} animationType="fade" transparent onRequestClose={() => setModalVisivel(false)}>
        <View style={stylesAlun.modalOverlay}>
          <View style={stylesAlun.modalBox}>
            <View style={stylesAlun.modalHeader}>
              <View style={stylesAlun.modalAvatar}>
                <Text style={stylesAlun.modalAvatarText}>{getInitials(alunoSelecionado.nomeAluno)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={stylesAlun.modalNome}>{alunoSelecionado.nomeAluno}</Text>
                <Text style={stylesAlun.modalCursoSub}>{alunoSelecionado.curso}</Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisivel(false)} style={stylesAlun.btnFechar}>
                <FontAwesome5 name="times" size={16} color="#5A7D6C" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={[stylesAlun.badgeSit, { backgroundColor: sit.bg, alignSelf: 'flex-start', marginBottom: 14 }]}>
                <Text style={[stylesAlun.badgeSitText, { color: sit.text }]}>{sit.label}</Text>
              </View>

              <View style={stylesAlun.modalGrade}>
                <Campo label="Matrícula" valor={alunoSelecionado.matricula} />
                <Campo label="Turno" valor={alunoSelecionado.turno} />
                <Campo label="Idade" valor={alunoSelecionado.idade} />
                <Campo label="Sexo" valor={alunoSelecionado.sexo} />
                <Campo label="Semestre" valor={`${alunoSelecionado.semestreAtual}º`} />
              </View>

              <View style={stylesAlun.perguntaBox}>
                <Text style={stylesAlun.perguntaTitulo}>Questionário Socioeconômico</Text>
                <Text style={stylesAlun.perguntaLabel}>1. Acesso e Mobilidade:</Text>
                <Text style={stylesAlun.perguntaValor}>{alunoSelecionado.questao1}</Text>
                
                <Text style={stylesAlun.perguntaLabel}>2. Trabalho e Renda:</Text>
                <Text style={stylesAlun.perguntaValor}>{alunoSelecionado.questao2}</Text>

                <Text style={stylesAlun.perguntaLabel}>3. Condição de Saúde:</Text>
                <Text style={stylesAlun.perguntaValor}>{alunoSelecionado.questao3}</Text>

                <Text style={stylesAlun.perguntaLabel}>4. Dificuldades de Aprendizagem:</Text>
                <Text style={stylesAlun.perguntaValor}>{alunoSelecionado.questao4}</Text>

                <Text style={stylesAlun.perguntaLabel}>5. Motivação com o Curso:</Text>
                <Text style={stylesAlun.perguntaValor}>{alunoSelecionado.questao5}</Text>
              </View>

              {alunoSelecionado.motivoEvasao ? (
                <View style={stylesAlun.motivoBox}>
                  <Text style={stylesAlun.motivoLabel}>Motivo de Evasão</Text>
                  <Text style={stylesAlun.motivoValor}>{alunoSelecionado.motivoEvasao}</Text>
                </View>
              ) : null}

              <TouchableOpacity
                style={stylesAlun.btnModalEditar}
                onPress={() => {
                  setModalVisivel(false);
                  navigation.navigate('EditarAlunos', { alunoId: alunoSelecionado.idAluno });
                }}
              >
                <FontAwesome5 name="edit" size={14} color="#fff" />
                <Text style={stylesAlun.btnModalEditarText}>Editar Dados</Text>
              </TouchableOpacity>
              <View style={{ height: 20 }} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={stylesAlun.container}>
      <View style={stylesAlun.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={stylesAlun.headerBtn}>
          <FontAwesome5 name="arrow-left" size={17} color="#0F6E56" />
        </TouchableOpacity>
        <Text style={stylesAlun.headerTitle}>Alunos Cadastrados</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CadastroAluno')} style={[stylesAlun.headerBtn, { backgroundColor: '#1D9E75' }]}>
          <FontAwesome5 name="plus" size={15} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={stylesAlun.searchWrap}>
        <FontAwesome5 name="search" size={13} color="#9FE1CB" style={{ marginRight: 8 }} />
        <TextInput
          style={stylesAlun.searchInput}
          placeholder="Nome ou matrícula..."
          placeholderTextColor="#9FE1CB"
          value={busca}
          onChangeText={setBusca}
        />
        {busca.length > 0 && (
          <TouchableOpacity onPress={() => setBusca('')}>
            <FontAwesome5 name="times-circle" size={14} color="#9FE1CB" />
          </TouchableOpacity>
        )}
      </View>

      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={stylesAlun.filtrosWrap}>
          {SITUACOES.map((s) => (
            <TouchableOpacity
              key={s.value}
              style={[stylesAlun.filtroPill, situacaoFiltro === s.value && stylesAlun.filtroPillAtivo]}
              onPress={() => setSituacaoFiltro(s.value)}
            >
              <Text style={[stylesAlun.filtroPillText, situacaoFiltro === s.value && stylesAlun.filtroPillTextAtivo]}>
                {s.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Text style={stylesAlun.contador}>
        {alunosFiltrados.length} aluno(s) listado(s)
      </Text>

      {carregando ? (
        <ActivityIndicator size="large" color="#1D9E75" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={alunosFiltrados}
          keyExtractor={(item) => item.idAluno.toString()}
          renderItem={renderItem}
          contentContainerStyle={stylesAlun.listPadding}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => buscarAlunos(true)} colors={['#1D9E75']} />
          }
          ListEmptyComponent={
            <View style={stylesAlun.emptyWrap}>
              <FontAwesome5 name="user-slash" size={36} color="#9FE1CB" />
              <Text style={stylesAlun.emptyText}>Nenhum registro encontrado.</Text>
            </View>
          }
        />
      )}

      <ModalDetalhes />
    </SafeAreaView>
  );
};

export default ListaAlunosSrc;