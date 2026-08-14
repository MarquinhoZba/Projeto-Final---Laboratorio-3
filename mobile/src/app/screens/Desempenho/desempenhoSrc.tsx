import React, { useEffect, useState, useCallback } from 'react';
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
  RefreshControl,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import api from '../../../services/api'; // Usando sua instância centralizada do Axios
import { stylesDesem, getAvatarCor, getIniciais, getStatusDesempenho } from './stylesDesem';

interface Desempenho {
  idDesempenho: number;
  nomeAluno: string;
  mediaNotas: number;
  frequencias: number;
  qtdReprovacao: number;
  participacaoAtvd: string;
  anoSemestre: string;
}

interface FormData {
  nomeAluno: string;
  mediaNotas: string;
  frequencias: string;
  qtdReprovacao: string;
  participacaoAtvd: string;
  anoSemestre: string;
}

const FORM_VAZIO: FormData = {
  nomeAluno: '',
  mediaNotas: '',
  frequencias: '',
  qtdReprovacao: '',
  participacaoAtvd: '',
  anoSemestre: '',
};

const CAMPOS = [
  { label: 'Aluno(a)', key: 'nomeAluno', placeholder: 'Nome completo', keyboard: 'default', icon: 'user' },
  { label: 'Média das notas', key: 'mediaNotas', placeholder: 'Ex: 8.5', keyboard: 'decimal-pad', icon: 'star' },
  { label: 'Frequência (%)', key: 'frequencias', placeholder: 'Ex: 95', keyboard: 'decimal-pad', icon: 'percentage' },
  { label: 'Qtd. de reprovações', key: 'qtdReprovacao', placeholder: 'Ex: 0', keyboard: 'numeric', icon: 'exclamation-circle' },
  { label: 'Participação', key: 'participacaoAtvd', placeholder: 'Ex: Alta, Média ou Baixa', keyboard: 'default', icon: 'comments' },
  { label: 'Ano / Semestre', key: 'anoSemestre', placeholder: 'Ex: 2026/1', keyboard: 'default', icon: 'calendar-alt' },
];

export default function DesempenhoSrc() {
  const [lista, setLista] = useState<Desempenho[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState<Desempenho | null>(null);
  const [form, setForm] = useState<FormData>(FORM_VAZIO);

  const carregarDesempenho = async () => {
    try {
      const res = await api.get('/desempenho');
      setLista(res.data);
    } catch (e) {
      console.error('Erro ao carregar desempenho:', e);
      Alert.alert('Erro', 'Não foi possível sincronizar os dados de desempenho.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { carregarDesempenho(); }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    carregarDesempenho();
  }, []);

  const abrirFormNovo = () => {
    setEditando(null);
    setForm(FORM_VAZIO);
    setModalAberto(true);
  };

  const abrirFormEditar = (item: Desempenho) => {
    setEditando(item);
    setForm({
      nomeAluno: item.nomeAluno,
      mediaNotas: String(item.mediaNotas),
      frequencias: String(item.frequencias),
      qtdReprovacao: String(item.qtdReprovacao),
      participacaoAtvd: item.participacaoAtvd,
      anoSemestre: item.anoSemestre,
    });
    setModalAberto(true);
  };

  const salvar = async () => {
    if (!form.nomeAluno || !form.mediaNotas || !form.frequencias) {
      Alert.alert('Campos Obrigatórios', 'Nome, média e frequência são fundamentais para a análise.');
      return;
    }
    
    setEnviando(true);
    try {
      const payload = {
        nomeAluno: form.nomeAluno,
        mediaNotas: parseFloat(form.mediaNotas.replace(',', '.')),
        frequencias: parseFloat(form.frequencias.replace(',', '.')),
        qtdReprovacao: parseInt(form.qtdReprovacao || '0'),
        participacaoAtvd: form.participacaoAtvd || 'Média',
        anoSemestre: form.anoSemestre,
      };

      if (editando) {
        await api.put(`/desempenho/${editando.idDesempenho}`, payload);
        Alert.alert('Sucesso', 'Registro de desempenho atualizado.');
      } else {
        await api.post('/desempenho', payload);
        Alert.alert('Sucesso', 'Novo desempenho registrado.');
      }

      setModalAberto(false);
      carregarDesempenho();
    } catch (e) {
      Alert.alert('Erro', 'Falha ao salvar. Verifique se o aluno está cadastrado.');
    } finally {
      setEnviando(false);
    }
  };

  const deletar = (id: number) => {
    Alert.alert('Confirmar Exclusão', 'Deseja remover este registro do histórico?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover', style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/desempenho/${id}`);
            setLista((prev) => prev.filter((d) => d.idDesempenho !== id));
          } catch (e) {
            Alert.alert('Erro', 'Não foi possível excluir o registro.');
          }
        },
      },
    ]);
  };

  const listaFiltrada = lista.filter((d) =>
    d.nomeAluno.toLowerCase().includes(busca.toLowerCase())
  );

  const renderCard = ({ item }: { item: Desempenho }) => {
    const status = getStatusDesempenho(item.mediaNotas, item.frequencias);
    const avatarCor = getAvatarCor(item.nomeAluno);
    const pctFreq = Math.min(item.frequencias, 100);

    return (
      <View style={stylesDesem.card}>
        <View style={stylesDesem.cardTop}>
          <View style={[stylesDesem.avatar, { backgroundColor: avatarCor + '22' }]}>
            <Text style={[stylesDesem.avatarText, { color: avatarCor }]}>
              {getIniciais(item.nomeAluno)}
            </Text>
          </View>
          <View style={stylesDesem.cardInfo}>
            <Text style={stylesDesem.cardNome} numberOfLines={1}>{item.nomeAluno}</Text>
            <Text style={stylesDesem.cardSemestre}>{item.anoSemestre}</Text>
          </View>
          <View style={[stylesDesem.badge, { backgroundColor: status.bg }]}>
            <Text style={[stylesDesem.badgeText, { color: status.textCor }]}>{status.label}</Text>
          </View>
        </View>

        <View style={stylesDesem.divisor} />

        <View style={stylesDesem.statsRow}>
          <View style={stylesDesem.stat}>
            <Text style={stylesDesem.statLabel}>Média</Text>
            <Text style={[stylesDesem.statValor, { color: status.cor }]}>
              {Number(item.mediaNotas).toFixed(1)}
            </Text>
          </View>
          <View style={stylesDesem.statSep} />
          <View style={stylesDesem.stat}>
            <Text style={stylesDesem.statLabel}>Frequência</Text>
            <Text style={[stylesDesem.statValor, { color: status.cor }]}>
              {Number(item.frequencias).toFixed(0)}%
            </Text>
          </View>
          <View style={stylesDesem.statSep} />
          <View style={stylesDesem.stat}>
            <Text style={stylesDesem.statLabel}>Reprovações</Text>
            <Text style={[stylesDesem.statValor, { color: item.qtdReprovacao > 0 ? '#ff3b30' : '#1c1c1e' }]}>
              {item.qtdReprovacao}
            </Text>
          </View>
        </View>

        <View style={stylesDesem.barWrap}>
          <View style={stylesDesem.barHeader}>
            <Text style={stylesDesem.barLabel}>Assiduidade</Text>
            <Text style={stylesDesem.barPercent}>{pctFreq}%</Text>
          </View>
          <View style={stylesDesem.barBg}>
            <View style={[stylesDesem.barFill, { width: `${pctFreq}%` as any, backgroundColor: status.cor }]} />
          </View>
        </View>

        <View style={stylesDesem.cardActions}>
          <TouchableOpacity style={stylesDesem.btnActionEdit} onPress={() => abrirFormEditar(item)}>
            <FontAwesome5 name="edit" size={12} color="#ff9500" />
            <Text style={stylesDesem.btnActionTextEdit}>Editar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={stylesDesem.btnActionDel} onPress={() => deletar(item.idDesempenho)}>
            <FontAwesome5 name="trash-alt" size={12} color="#ff3b30" />
            <Text style={stylesDesem.btnActionTextDel}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={stylesDesem.centralize}>
        <ActivityIndicator size="large" color="#1D9E75" />
        <Text style={stylesDesem.loadingText}>Sincronizando histórico...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={stylesDesem.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={stylesDesem.topbar}>
        <View>
          <Text style={stylesDesem.titulo}>Desempenho</Text>
          <Text style={stylesDesem.subtitulo}>Acompanhamento Acadêmico</Text>
        </View>
        <TouchableOpacity style={stylesDesem.btnHeaderNovo} onPress={abrirFormNovo}>
           <FontAwesome5 name="plus" size={14} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={stylesDesem.searchSection}>
        <View style={stylesDesem.searchWrap}>
          <FontAwesome5 name="search" size={14} color="#8e8e93" />
          <TextInput
            style={stylesDesem.searchInput}
            placeholder="Filtrar por nome do aluno..."
            placeholderTextColor="#8e8e93"
            value={busca}
            onChangeText={setBusca}
          />
        </View>
      </View>

      <FlatList
        data={listaFiltrada}
        keyExtractor={(item) => item.idDesempenho.toString()}
        renderItem={renderCard}
        contentContainerStyle={stylesDesem.lista}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#1D9E75"]} />
        }
        ListEmptyComponent={
          <View style={stylesDesem.vazio}>
            <FontAwesome5 name="folder-open" size={40} color="#ccc" />
            <Text style={stylesDesem.vazioText}>Nenhum registro encontrado</Text>
            <Text style={stylesDesem.vazioSub}>Toque no "+" para adicionar dados de um aluno.</Text>
          </View>
        }
      />

      <Modal visible={modalAberto} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={stylesDesem.modal}>
          <View style={stylesDesem.modalHeader}>
            <TouchableOpacity onPress={() => setModalAberto(false)}>
              <Text style={stylesDesem.modalFechar}>Cancelar</Text>
            </TouchableOpacity>
            <Text style={stylesDesem.modalTitulo}>
              {editando ? 'Atualizar Dados' : 'Novo Registro'}
            </Text>
            <TouchableOpacity onPress={salvar} disabled={enviando}>
              {enviando ? <ActivityIndicator size="small" color="#1D9E75" /> : <Text style={stylesDesem.modalSalvar}>Salvar</Text>}
            </TouchableOpacity>
          </View>

          <ScrollView style={stylesDesem.modalBody} showsVerticalScrollIndicator={false}>
            {CAMPOS.map((campo) => (
              <View key={campo.key} style={stylesDesem.formGrupo}>
                <View style={stylesDesem.labelRow}>
                  <FontAwesome5 name={campo.icon} size={12} color="#1D9E75" style={{ marginRight: 6 }} />
                  <Text style={stylesDesem.formLabel}>{campo.label}</Text>
                </View>
                <TextInput
                  style={stylesDesem.formInput}
                  placeholder={campo.placeholder}
                  placeholderTextColor="#8e8e93"
                  value={form[campo.key as keyof FormData]}
                  onChangeText={(v) => setForm((prev) => ({ ...prev, [campo.key]: v }))}
                  keyboardType={campo.keyboard as any}
                  autoCapitalize={campo.key === 'nomeAluno' ? 'words' : 'none'}
                />
              </View>
            ))}
            <View style={{ height: 40 }} />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}