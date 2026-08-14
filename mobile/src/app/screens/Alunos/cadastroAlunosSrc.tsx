import React, { useState } from 'react';
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
import { stylesCad } from './stylesCad';

interface Props {
  navigation: any;
}


const SEXO = ['Masculino', 'Feminino'];
const TURNO = ['Matutino', 'Vespertino', 'Noturno'];
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
  <View style={stylesCad.sectionTitle}>
    <FontAwesome5 name={icon} size={13} color="#1D9E75" />
    <Text style={stylesCad.sectionTitleText}>{label}</Text>
  </View>
);

const Campo = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <View style={stylesCad.campo}>
    <Text style={stylesCad.label}>
      {label}{required && <Text style={stylesCad.req}> *</Text>}
    </Text>
    {children}
  </View>
);

const InputText = ({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  icon,
}: any) => (
  <View style={stylesCad.inputWrap}>
    <FontAwesome5 name={icon} size={13} color="#9FE1CB" style={stylesCad.fieldIcon} />
    <TextInput
      style={stylesCad.input}
      placeholder={placeholder}
      placeholderTextColor="#9FE1CB"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  </View>
);

const SelectPicker = ({
  opcoes,
  valor,
  onSelect,
  icon,
  placeholder = 'Selecione',
}: {
  opcoes: string[];
  valor: string;
  onSelect: (v: string) => void;
  icon: string;
  placeholder?: string;
}) => {
  const [aberto, setAberto] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={stylesCad.inputWrap}
        onPress={() => setAberto(!aberto)}
        activeOpacity={0.8}
      >
        <FontAwesome5 name={icon} size={13} color="#9FE1CB" style={stylesCad.fieldIcon} />
        <Text style={[stylesCad.selectText, !valor && { color: '#9FE1CB' }]}>
          {valor || placeholder}
        </Text>
        <FontAwesome5
          name={aberto ? 'chevron-up' : 'chevron-down'}
          size={11}
          color="#9FE1CB"
        />
      </TouchableOpacity>

      {aberto && (
        <View style={stylesCad.dropdown}>
          {opcoes.map((op) => (
            <TouchableOpacity
              key={op}
              style={[stylesCad.dropdownItem, valor === op && stylesCad.dropdownItemAtivo]}
              onPress={() => {
                onSelect(op);
                setAberto(false);
              }}
            >
              <Text style={[stylesCad.dropdownText, valor === op && stylesCad.dropdownTextAtivo]}>
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


export default function CadastroAlunosSrc({ navigation }: Props) {
  const [salvando, setSalvando] = useState(false);

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

  const salvar = async () => {
    // Validação de campos obrigatórios
    if (!nomeAluno || !matricula || !idade || !sexo || !curso || !turno || !semestreAtual || !situacao || !questao1 || !questao2 || !questao3 || !questao4 || !questao5) {
      Alert.alert('Campos pendentes', 'Por favor, preencha todos os campos obrigatórios marcados com *.');
      return;
    }

    setSalvando(true);
    try {
      // Envio para a API conforme definido no seu backend (alunoRoutes.js)
      await api.post('/alunos', {
        nomeAluno,
        matricula,
        idade: parseInt(idade),
        sexo,
        curso,
        turno,
        semestreAtual: parseInt(semestreAtual),
        situacao,
        motivoEvasao: motivoEvasao || 'Não se aplica',
        questao1,
        questao2,
        questao3,
        questao4,
        questao5,
      });

      Alert.alert('Sucesso', `${nomeAluno} foi cadastrado com sucesso!`, [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      Alert.alert('Erro no Cadastro', 'Ocorreu um erro ao salvar o aluno. Verifique sua conexão ou se a matrícula já existe.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <SafeAreaView style={stylesCad.container}>
      {/* Header */}
      <View style={stylesCad.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={stylesCad.headerBtn}>
          <FontAwesome5 name="arrow-left" size={17} color="#0F6E56" />
        </TouchableOpacity>
        <Text style={stylesCad.headerTitle}>Novo Registro</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={stylesCad.scroll} showsVerticalScrollIndicator={false}>

        <View style={stylesCad.formHeader}>
          <View style={stylesCad.iconWrap}>
            <FontAwesome5 name="user-plus" size={22} color="#fff" />
          </View>
          <View>
            <Text style={stylesCad.formHeaderTitle}>Cadastrar Estudante</Text>
            <Text style={stylesCad.formHeaderSub}>Monitoramento Preventivo de Evasão</Text>
          </View>
        </View>

        {/* ── Dados Pessoais ── */}
        <SectionTitle icon="id-card" label="Dados Pessoais" />

        <Campo label="Nome Completo" required>
          <InputText icon="user" placeholder="Ex: João da Silva" value={nomeAluno} onChangeText={setNomeAluno} />
        </Campo>

        <View style={stylesCad.row}>
          <View style={{ flex: 1 }}>
            <Campo label="Matrícula" required>
              <InputText icon="hashtag" placeholder="ID Acadêmico" value={matricula} onChangeText={setMatricula} keyboardType="numeric" />
            </Campo>
          </View>
          <View style={{ flex: 1 }}>
            <Campo label="Idade" required>
              <InputText icon="calendar-alt" placeholder="Ex: 20" value={idade} onChangeText={setIdade} keyboardType="numeric" />
            </Campo>
          </View>
        </View>

        <Campo label="Sexo" required>
          <SelectPicker icon="venus-mars" opcoes={SEXO} valor={sexo} onSelect={setSexo} />
        </Campo>

        {/* ── Dados Acadêmicos ── */}
        <SectionTitle icon="university" label="Dados Institucionais" />

        <Campo label="Curso" required>
          <InputText icon="book-reader" placeholder="Ex: Ciência da Computação" value={curso} onChangeText={setCurso} />
        </Campo>

        <View style={stylesCad.row}>
          <View style={{ flex: 1 }}>
            <Campo label="Turno" required>
              <SelectPicker icon="sun" opcoes={TURNO} valor={turno} onSelect={setTurno} />
            </Campo>
          </View>
          <View style={{ flex: 1 }}>
            <Campo label="Semestre" required>
              <InputText icon="list-ol" placeholder="Ex: 1" value={semestreAtual} onChangeText={setSemestreAtual} keyboardType="numeric" />
            </Campo>
          </View>
        </View>

        <Campo label="Situação Acadêmica" required>
          <SelectPicker icon="info-circle" opcoes={SITUACAO} valor={situacao} onSelect={setSituacao} />
        </Campo>

        <Campo label="Motivo que poderia levar à evasão">
          <SelectPicker icon="exclamation-circle" opcoes={MOTIVO_EVASAO} valor={motivoEvasao} onSelect={setMotivoEvasao} />
        </Campo>

        {/* ── Fatores de Risco ── */}
        <SectionTitle icon="diagnoses" label="Análise Socioeconômica (Risco)" />

        <Campo label="Acesso e Mobilidade (Deslocamento)" required>
          <SelectPicker icon="route" opcoes={QUESTAO1} valor={questao1} onSelect={setQuestao1} />
        </Campo>

        <Campo label="Condição de Trabalho e Renda" required>
          <SelectPicker icon="money-bill-wave" opcoes={QUESTAO2} valor={questao2} onSelect={setQuestao2} />
        </Campo>

        <Campo label="Condição de Saúde" required>
          <SelectPicker icon="stethoscope" opcoes={QUESTAO3} valor={questao3} onSelect={setQuestao3} />
        </Campo>

        <Campo label="Dificuldades de Aprendizagem" required>
          <SelectPicker icon="brain" opcoes={QUESTAO4} valor={questao4} onSelect={setQuestao4} />
        </Campo>

        <Campo label="Motivação com o Curso Atual" required>
          <SelectPicker icon="grin-stars" opcoes={QUESTAO5} valor={questao5} onSelect={setQuestao5} />
        </Campo>

        {/* Botão de Envio */}
        <TouchableOpacity
          style={[stylesCad.btnSubmit, salvando && { opacity: 0.7 }]}
          onPress={salvar}
          activeOpacity={0.8}
          disabled={salvando}
        >
          {salvando ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <FontAwesome5 name="check-circle" size={16} color="#fff" />
              <Text style={stylesCad.btnSubmitText}>Finalizar Cadastro</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}