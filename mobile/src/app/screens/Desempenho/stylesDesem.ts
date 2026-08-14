import { StyleSheet } from 'react-native';

// Cores para os Avatares (Gera um visual colorido e organizado na lista)
const AVATAR_CORES = ['#1D9E75', '#af52de', '#ff9500', '#007aff', '#ff3b30', '#5ac8fa'];

export const getAvatarCor = (nome: string): string =>
  AVATAR_CORES[nome.charCodeAt(0) % AVATAR_CORES.length];

export const getIniciais = (nome: string): string =>
  nome
    .split(' ')
    .filter(part => part.length > 0)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

export const getStatusDesempenho = (media: number, frequencia: number) => {
  if (media >= 7 && frequencia >= 75) {
    return { label: 'Bom', cor: '#1D9E75', bg: '#1D9E7515', textCor: '#0F6E56' };
  } else if (media >= 5 && frequencia >= 60) {
    return { label: 'Atenção', cor: '#ff9500', bg: '#ff950015', textCor: '#c07000' };
  } else {
    return { label: 'Crítico', cor: '#ff3b30', bg: '#ff3b3015', textCor: '#c0392b' };
  }
};

export const stylesDesem = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8FAFB' },
  centralize: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFB' },
  loadingText: { fontSize: 14, color: '#666', marginTop: 12, fontWeight: '500' },

  // Header e Busca
  topbar: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  titulo: { fontSize: 20, fontWeight: '800', color: '#1A1A1A' },
  subtitulo: { fontSize: 13, color: '#8E8E93', marginTop: 1 },
  
  btnHeaderNovo: {
    backgroundColor: '#1D9E75',
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  searchSection: {
    backgroundColor: '#fff',
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F3F4',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 44,
    gap: 10,
  },
  searchInput: { flex: 1, fontSize: 15, color: '#1c1c1e' },

  // Lista
  lista: { padding: 16, paddingBottom: 30 },
  vazio: { alignItems: 'center', justifyContent: 'center', marginTop: 60, opacity: 0.6 },
  vazioText: { fontSize: 16, fontWeight: '700', color: '#444', marginTop: 15 },
  vazioSub: { fontSize: 14, color: '#888', textAlign: 'center', marginTop: 5, paddingHorizontal: 40 },

  // Card de Aluno
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 18, 
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E6E9EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 16, fontWeight: '800' },
  cardInfo: { flex: 1 },
  cardNome: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
  cardSemestre: { fontSize: 13, color: '#8E8E93', fontWeight: '500' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },

  divisor: { height: 1, backgroundColor: '#F0F2F3', marginHorizontal: 16 },

  // Estatísticas Centrais
  statsRow: { flexDirection: 'row', paddingVertical: 15 },
  stat: { flex: 1, alignItems: 'center' },
  statLabel: { fontSize: 10, color: '#8E8E93', textTransform: 'uppercase', fontWeight: '700', letterSpacing: 0.5 },
  statValor: { fontSize: 18, fontWeight: '800', color: '#1c1c1e', marginTop: 3 },
  statSep: { width: 1, backgroundColor: '#F0F2F3', height: '60%', alignSelf: 'center' },

  // Barra de Progresso (Frequência)
  barWrap: { paddingHorizontal: 16, paddingBottom: 16 },
  barHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  barLabel: { fontSize: 12, color: '#666', fontWeight: '600' },
  barPercent: { fontSize: 12, color: '#1A1A1A', fontWeight: '800' },
  barBg: { backgroundColor: '#F0F2F3', borderRadius: 10, height: 8, overflow: 'hidden' },
  barFill: { height: 8, borderRadius: 10 },

  // Ações do Card
  cardActions: { 
    flexDirection: 'row', 
    borderTopWidth: 1, 
    borderTopColor: '#F0F2F3',
    backgroundColor: '#FAFBFC',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  btnActionEdit: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 12,
    gap: 8,
  },
  btnActionDel: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 12,
    gap: 8,
    borderLeftWidth: 1,
    borderLeftColor: '#F0F2F3',
  },
  btnActionTextEdit: { fontSize: 13, fontWeight: '700', color: '#ff9500' },
  btnActionTextDel: { fontSize: 13, fontWeight: '700', color: '#ff3b30' },

  // Modal
  modal: { flex: 1, backgroundColor: '#F8FAFB' },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitulo: { fontSize: 17, fontWeight: '700', color: '#1A1A1A' },
  modalFechar: { fontSize: 15, color: '#ff3b30', fontWeight: '600' },
  modalSalvar: { fontSize: 15, color: '#1D9E75', fontWeight: '800' },
  modalBody: { padding: 20 },

  // Formulário no Modal
  formGrupo: { marginBottom: 20 },
  labelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  formLabel: { fontSize: 12, fontWeight: '700', color: '#666', textTransform: 'uppercase' },
  formInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1A1A1A',
    borderWidth: 1.5,
    borderColor: '#E6E9EB',
  },
});