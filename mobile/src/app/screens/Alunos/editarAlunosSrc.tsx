import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import api from '../../../services/api';
import { stylesEditarA } from './stylesEditarA';


const TURNO = ['Matutino', 'Vespertino', 'Noturno'];
const SEXO = ['Masculino', 'Feminino'];
const SITUACAO = ['Ativo', 'Trancado', 'Evadido'];
const MOTIVO_EVASAO = [
  'Não se aplica',
  'Ser aprovado em outro curso / instituição',
  'Mudança de Cidade ou Estado',
  'Horário de trabalho não conciliar com o curso',
  'Maternidade ou Paternidade',
  'Despesas',
  'Condições de saúde',
];
const QUESTAO1 = [
  'Não se aplica',
  'Falta de transporte público',
  'Segurança',
  'Falta de Auxílio Estudantil',
  'Distância de casa ao Campus',
  'Horários das aulas',
];
const QUESTAO2 = [
  'Não se aplica',
  'Desemprego',
  'Ausência de contribuição financeira familiar',
  'Necessidade de Trabalho',
];
const QUESTAO3 = [
  'Não se aplica',
  'Problema de saúde com o estudante',
  'Problema de saúde com familiares do estudante',
  'Ausência serviço médico',
  'Ausência serviço psicológico',
];
const QUESTAO4 = [
  'Não se aplica',
  'Falta de conhecimentos da etapa anterior de ensino',
  'Transtornos — instituição sem profissionais de apoio',
  'Falta de monitorias e nivelamento',
  'Falta de acompanhamento pedagógico',
];
const QUESTAO5 = [
  'Não se aplica',
  'Falta de referência familiar',
  'Não sabe qual área tem interesse',
  'Falta de identificação com o curso',
  'Falta de projetos institucionais',
  'Estrutura institucional precária',
  'Falta de aulas práticas e visitas técnicas',
  'Situações de violência no instituto',
];


const SectionTitle = ({ icon, label }: { icon: string; label: string }) => (
  <View style={stylesEditarA.sectionTitle}>
    <FontAwesome5 name={icon} size={13} color="#1D9E75" />
    <Text style={stylesEditarA.sectionTitleText}>{label}</Text>
  </View>
);

const Campo = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <View style={stylesEditarA.campo}>
    <Text style={stylesEditarA.label}>{label}</Text>
    {children}
  </View>
);

const InputText = ({ value, onChangeText, keyboardType = 'default', icon, editable = true }: any) => (
  <View style={[stylesEditarA.inputWrap, !editable && { backgroundColor: '#f5f5f5', borderColor: '#e0e0e0' }]}>
    <FontAwesome5 name={icon} size={13} color={editable ? "#9FE1CB" : "#ccc"} style={stylesEditarA.fieldIcon} />
    <TextInput
      style={[stylesEditarA.input, !editable && { color: '#999' }]}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      editable={editable}
      placeholderTextColor="#9FE1CB"
    />
  </View>
);

const SelectPicker = ({
  opcoes,
  valor,
  onSelect,
  icon,
}: {
  opcoes: string[];
  valor: string;
  onSelect: (v: string) => void;
  icon: string;
}) => {
  const [aberto, setAberto] = useState(false);
  return (
    <View>
      <TouchableOpacity
        style={stylesEditarA.inputWrap}
        onPress={() => setAberto(!aberto)}
        activeOpacity={0.8}
      >
        <FontAwesome5 name={icon} size={13} color="#9FE1CB" style={stylesEditarA.fieldIcon} />
        <Text style={[stylesEditarA.selectText, !valor && { color: '#9FE1CB' }]}>
          {valor || 'Selecione'}
        </Text>
        <FontAwesome5 name={aberto ? 'chevron-up' : 'chevron-down'} size={11} color="#9FE1CB" />
      </TouchableOpacity>
      {aberto && (
        <View style={stylesEditarA.dropdown}>
          {opcoes.map((op) => (
            <TouchableOpacity
              key={op}
              style={[stylesEditarA.dropdownItem, valor === op && stylesEditarA.dropdownItemAtivo]}
              onPress={() => { onSelect(op); setAberto(false); }}
            >
              <Text style={[stylesEditarA.dropdownText, valor === op && stylesEditarA.dropdownTextAtivo]} numberOfLines={2}>
                {op}
              </Text>
              {valor === op && <FontAwesome5 name="check" size={11} color="#1D9E75" />}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};


export default function EditarAlunosSrc({ route, navigation }: any) {
  const { alunoId } = route.params;
  const [salvando, setSalvando] = useState(false);
  const [carregando, setCarregando] = useState(true);


  const [nomeAluno, setNomeAluno] = useState('');
  const [matricula, setMatricula] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('');
  const [curso, setCurso] = useState('');
  const [turno, setTurno] = useState('');
  const [semestreAtual, setSemestreAtual] = useState('');
  const [situacao, setSituacao] = useState('');
  const [motivoEvasao, setMotivoEvasao] = useState('');
  const [questao1, setQuestao1] = useState('');
  const [questao2, setQuestao2] = useState('');
  const [questao3, setQuestao3] = useState('');
  const [questao4, setQuestao4] = useState('');
  const [questao5, setQuestao5] = useState('');

  useEffect(() => {
    const carregarAluno = async () => {
      try {
        const response = await api.get(`/alunos/${alunoId}`);
        const a = response.data;
        
        setNomeAluno(a.nomeAluno || '');
        setMatricula(a.matricula || '');
        setIdade(a.idade ? String(a.idade) : '');
        setSexo(a.sexo || '');
        setCurso(a.curso || '');
        setTurno(a.turno || '');
        setSemestreAtual(a.semestreAtual ? String(a.semestreAtual) : '');
        setSituacao(a.situacao || '');
        setMotivoEvasao(a.motivoEvasao || 'Não se aplica');
        setQuestao1(a.questao1 || 'Não se aplica');
        setQuestao2(a.questao2 || 'Não se aplica');
        setQuestao3(a.questao3 || 'Não se aplica');
        setQuestao4(a.questao4 || 'Não se aplica');
        setQuestao5(a.questao5 || 'Não se aplica');
      } catch (error) {
        Alert.alert('Erro', 'Dados do aluno não encontrados.');
        navigation.goBack();
      } finally {
        setCarregando(false);
      }
    };
    carregarAluno();
  }, [alunoId]);

  const salvar = async () => {
    if (!nomeAluno || !curso || !turno || !semestreAtual || !situacao) {
      Alert.alert('Atenção', 'Nome, Curso, Turno, Semestre e Situação são obrigatórios.');
      return;
    }

    setSalvando(true);
    try {
      await api.put(`/alunos/${alunoId}`, {
        nomeAluno,
        matricula, // Enviado mas geralmente imutável no banco
        idade: parseInt(idade) || 0,
        sexo,
        curso,
        turno,
        semestreAtual: parseInt(semestreAtual) || 1,
        situacao,
        motivoEvasao,
        questao1,
        questao2,
        questao3,
        questao4,
        questao5,
      });

      Alert.alert('Atualizado', 'Os dados foram salvos com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível atualizar o registro.');
    } finally {
      setSalvando(false);
    }
  };

  if (carregando) {
    return (
      <SafeAreaView style={stylesEditarA.loadingContainer}>
        <ActivityIndicator size="large" color="#1D9E75" />
        <Text style={stylesEditarA.loadingText}>Recuperando informações...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={stylesEditarA.container}>
      <View style={stylesEditarA.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={stylesEditarA.headerBtn}>
          <FontAwesome5 name="arrow-left" size={17} color="#0F6E56" />
        </TouchableOpacity>
        <Text style={stylesEditarA.headerTitle}>Atualizar Cadastro</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={stylesEditarA.scroll} showsVerticalScrollIndicator={false}>

        <View style={stylesEditarA.formHeader}>
          <View style={stylesEditarA.iconWrap}>
            <FontAwesome5 name="user-check" size={20} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={stylesEditarA.formHeaderTitle} numberOfLines={1}>{nomeAluno}</Text>
            <Text style={stylesEditarA.formHeaderSub}>RA: {matricula}</Text>
          </View>
        </View>

        <SectionTitle icon="user-circle" label="Dados do Estudante" />

        <Campo label="Nome Completo">
          <InputText icon="user" value={nomeAluno} onChangeText={setNomeAluno} />
        </Campo>

        <Campo label="Matrícula (Não editável)">
          <InputText icon="lock" value={matricula} editable={false} />
        </Campo>

        <View style={stylesEditarA.row}>
          <View style={{ flex: 1 }}>
            <Campo label="Idade">
              <InputText icon="calendar-alt" value={idade} onChangeText={setIdade} keyboardType="numeric" />
            </Campo>
          </View>
          <View style={{ flex: 1 }}>
            <Campo label="Sexo">
              <SelectPicker icon="venus-mars" opcoes={SEXO} valor={sexo} onSelect={setSexo} />
            </Campo>
          </View>
        </View>

        <SectionTitle icon="university" label="Vida Acadêmica" />

        <Campo label="Curso">
          <InputText icon="graduation-cap" value={curso} onChangeText={setCurso} />
        </Campo>

        <View style={stylesEditarA.row}>
          <View style={{ flex: 1 }}>
            <Campo label="Turno">
              <SelectPicker icon="sun" opcoes={TURNO} valor={turno} onSelect={setTurno} />
            </Campo>
          </View>
          <View style={{ flex: 1 }}>
            <Campo label="Semestre">
              <InputText icon="layer-group" value={semestreAtual} onChangeText={setSemestreAtual} keyboardType="numeric" />
            </Campo>
          </View>
        </View>

        <Campo label="Situação Atual">
          <SelectPicker icon="info-circle" opcoes={SITUACAO} valor={situacao} onSelect={setSituacao} />
        </Campo>

        <Campo label="Principal Motivo de Risco de Evasão">
          <SelectPicker icon="exclamation-circle" opcoes={MOTIVO_EVASAO} valor={motivoEvasao} onSelect={setMotivoEvasao} />
        </Campo>

        <SectionTitle icon="clipboard-list" label="Questionário de Risco" />

        <Campo label="Acesso e Mobilidade ao Campus">
          <SelectPicker icon="car" opcoes={QUESTAO1} valor={questao1} onSelect={setQuestao1} />
        </Campo>

        <Campo label="Trabalho e Renda Familiar">
          <SelectPicker icon="wallet" opcoes={QUESTAO2} valor={questao2} onSelect={setQuestao2} />
        </Campo>

        <Campo label="Saúde (Estudante/Família)">
          <SelectPicker icon="heartbeat" opcoes={QUESTAO3} valor={questao3} onSelect={setQuestao3} />
        </Campo>

        <Campo label="Dificuldades de Aprendizagem">
          <SelectPicker icon="book-open" opcoes={QUESTAO4} valor={questao4} onSelect={setQuestao4} />
        </Campo>

        <Campo label="Motivação/Identificação com o Curso">
          <SelectPicker icon="smile" opcoes={QUESTAO5} valor={questao5} onSelect={setQuestao5} />
        </Campo>

        <TouchableOpacity
          style={[stylesEditarA.btnSalvar, salvando && { opacity: 0.7 }]}
          onPress={salvar}
          activeOpacity={0.8}
          disabled={salvando}
        >
          {salvando ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <FontAwesome5 name="check" size={15} color="#fff" />
              <Text style={stylesEditarA.btnSalvarText}>Atualizar Registro</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={stylesEditarA.btnVoltar}
          onPress={() => navigation.goBack()}
        >
          <Text style={stylesEditarA.btnVoltarText}>Cancelar Alterações</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}